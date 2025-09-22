const { Pool } = require('pg');
require('dotenv').config();

class PostgresDatabase {
    constructor() {
        // Neon database configuration
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            },
            // Connection pool settings optimized for Neon
            max: 10, // Maximum number of clients in the pool
            idleTimeoutMillis: 60000, // Close idle clients after 60 seconds
            connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection could not be established
            query_timeout: 30000, // Query timeout
            statement_timeout: 30000, // Statement timeout
        });

        // Handle pool errors
        this.pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        });

        this.initializeDatabase();
    }

    async initializeDatabase() {
        try {
            console.log('Connecting to PostgreSQL database...');
            
            // Test the connection
            const client = await this.pool.connect();
            console.log('✅ Successfully connected to PostgreSQL database');
            
            // Check if tables exist
            const result = await client.query(`
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' AND table_name = 'products'
            `);
            
            if (result.rows.length === 0) {
                console.log('📋 Database tables not found. Please run the schema.sql file to create tables.');
                console.log('💡 You can do this by running: psql -d your_database_url -f server/database/schema.sql');
            } else {
                console.log('✅ Database tables found and ready');
            }
            
            client.release();
        } catch (error) {
            console.error('❌ Error connecting to PostgreSQL database:', error.message);
            console.log('🔧 Please check your DATABASE_URL environment variable');
            throw error;
        }
    }

    // Get a client from the pool
    async getClient() {
        return await this.pool.connect();
    }

    // Execute a query with automatic client management
    async query(text, params) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(text, params);
            return result;
        } finally {
            client.release();
        }
    }

    // Transaction helper
    async transaction(callback) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    // Product methods
    async getAllProducts() {
        const query = `
            SELECT p.*, 
                   i.current_stock, 
                   i.available_stock,
                   i.location,
                   s.name as supplier_name
            FROM products p
            LEFT JOIN inventory i ON p.id = i.product_id
            LEFT JOIN product_suppliers ps ON p.id = ps.product_id AND ps.is_preferred = true
            LEFT JOIN suppliers s ON ps.supplier_id = s.id
            WHERE p.is_active = true
            ORDER BY p.name
        `;
        const result = await this.query(query);
        return result.rows;
    }

    async getProductById(id) {
        const query = `
            SELECT p.*, 
                   i.current_stock, 
                   i.available_stock,
                   i.reserved_stock,
                   i.location,
                   i.batch_number,
                   i.expiry_date
            FROM products p
            LEFT JOIN inventory i ON p.id = i.product_id
            WHERE p.id = $1 AND p.is_active = true
        `;
        const result = await this.query(query, [id]);
        return result.rows[0];
    }

    async createProduct(productData) {
        const {
            name, description, category, sku, manufacturer, 
            unit_price, cost_price, unit_of_measure, reorder_point, reorder_quantity
        } = productData;

        const query = `
            INSERT INTO products (name, description, category, sku, manufacturer, unit_price, cost_price, unit_of_measure, reorder_point, reorder_quantity)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;
        const values = [name, description, category, sku, manufacturer, unit_price, cost_price, unit_of_measure, reorder_point, reorder_quantity];
        const result = await this.query(query, values);
        return result.rows[0];
    }

    async updateProduct(id, productData) {
        const fields = [];
        const values = [];
        let paramCount = 1;

        Object.keys(productData).forEach(key => {
            if (productData[key] !== undefined) {
                fields.push(`${key} = $${paramCount}`);
                values.push(productData[key]);
                paramCount++;
            }
        });

        if (fields.length === 0) {
            throw new Error('No fields to update');
        }

        fields.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);

        const query = `
            UPDATE products 
            SET ${fields.join(', ')}
            WHERE id = $${paramCount}
            RETURNING *
        `;

        const result = await this.query(query, values);
        return result.rows[0];
    }

    // Customer methods
    async getAllCustomers() {
        const query = `
            SELECT * FROM customers 
            WHERE is_active = true 
            ORDER BY name
        `;
        const result = await this.query(query);
        return result.rows;
    }

    async getCustomerById(id) {
        const query = `SELECT * FROM customers WHERE id = $1 AND is_active = true`;
        const result = await this.query(query, [id]);
        return result.rows[0];
    }

    async getCustomers(filters = {}) {
        const { type, status = 'active', search } = filters;
        let query = `SELECT * FROM customers`;
        const params = [];
        let paramCount = 1;
        const conditions = [];

        // Handle status filter - map to is_active boolean
        if (status === 'active') {
            conditions.push('is_active = true');
        } else if (status === 'inactive') {
            conditions.push('is_active = false');
        }
        // If status is 'all', don't add any condition

        if (type) {
            conditions.push(`type = $${paramCount}`);
            params.push(type);
            paramCount++;
        }

        if (search) {
            conditions.push(`(name ILIKE $${paramCount} OR email ILIKE $${paramCount} OR contact_person ILIKE $${paramCount})`);
            const searchTerm = `%${search}%`;
            params.push(searchTerm);
            paramCount++;
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        query += ` ORDER BY name`;
        const result = await this.query(query, params);
        return result.rows;
    }

    async createCustomer(customerData) {
        const {
            name, type, contact_person, email, phone, 
            billing_address, shipping_address, city, payment_terms
        } = customerData;

        const query = `
            INSERT INTO customers (name, type, contact_person, email, phone, billing_address, shipping_address, city, payment_terms)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;
        const values = [name, type, contact_person, email, phone, billing_address, shipping_address, city, payment_terms];
        const result = await this.query(query, values);
        return result.rows[0];
    }

    async updateCustomer(id, customerData) {
        const {
            name, type, contact_person, email, phone, 
            address, city, postal_code, country, tax_number, 
            payment_terms, credit_limit, status
        } = customerData;

        const query = `
            UPDATE customers 
            SET name = $1, type = $2, contact_person = $3, email = $4, phone = $5,
                address = $6, city = $7, postal_code = $8, country = $9, tax_number = $10,
                payment_terms = $11, credit_limit = $12, status = $13, updated_at = CURRENT_TIMESTAMP
            WHERE id = $14 AND is_active = true
            RETURNING *
        `;
        const values = [name, type, contact_person, email, phone, address, city, postal_code, 
                       country, tax_number, payment_terms, credit_limit, status, id];
        const result = await this.query(query, values);
        return result.rows[0];
    }

    async deleteCustomer(id) {
        const query = `
            UPDATE customers 
            SET is_active = false, updated_at = CURRENT_TIMESTAMP
            WHERE id = $1 AND is_active = true
            RETURNING id
        `;
        const result = await this.query(query, [id]);
        return result.rows.length > 0;
    }

    // Order methods
    async getAllOrders() {
        const query = `
            SELECT o.*, c.name as customer_name, c.type as customer_type
            FROM orders o
            JOIN customers c ON o.customer_id = c.id
            ORDER BY o.order_date DESC
        `;
        const result = await this.query(query);
        return result.rows;
    }

    async getOrderById(id) {
        const query = `
            SELECT o.*, c.name as customer_name, c.type as customer_type,
                   json_agg(
                       json_build_object(
                           'id', oi.id,
                           'product_id', oi.product_id,
                           'product_name', p.name,
                           'quantity', oi.quantity,
                           'unit_price', oi.unit_price,
                           'line_total', oi.line_total
                       )
                   ) as items
            FROM orders o
            JOIN customers c ON o.customer_id = c.id
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.id
            WHERE o.id = $1
            GROUP BY o.id, c.name, c.type
        `;
        const result = await this.query(query, [id]);
        return result.rows[0];
    }

    async createOrder(orderData) {
        return await this.transaction(async (client) => {
            // Generate order number
            const orderNumberResult = await client.query(
                "SELECT 'ORD-' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-' || LPAD((SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 10) AS INTEGER)), 0) + 1 FROM orders WHERE order_number LIKE 'ORD-' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-%')::text, 3, '0') as order_number"
            );
            const orderNumber = orderNumberResult.rows[0].order_number;

            // Create order
            const orderQuery = `
                INSERT INTO orders (order_number, customer_id, subtotal, tax_amount, total_amount, status)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
            `;
            const orderResult = await client.query(orderQuery, [
                orderNumber, orderData.customer_id, orderData.subtotal, 
                orderData.tax_amount, orderData.total_amount, 'pending'
            ]);
            const order = orderResult.rows[0];

            // Create order items
            for (const item of orderData.items) {
                await client.query(`
                    INSERT INTO order_items (order_id, product_id, quantity, unit_price)
                    VALUES ($1, $2, $3, $4)
                `, [order.id, item.product_id, item.quantity, item.unit_price]);

                // Reserve inventory
                await client.query(`
                    UPDATE inventory 
                    SET reserved_stock = reserved_stock + $1
                    WHERE product_id = $2
                `, [item.quantity, item.product_id]);
            }

            return order;
        });
    }

    async updateOrder(id, orderData) {
        return await this.transaction(async (client) => {
            // Update order
            const orderQuery = `
                UPDATE orders 
                SET customer_id = $1, required_date = $2, notes = $3, updated_at = CURRENT_TIMESTAMP
                WHERE id = $4
                RETURNING *
            `;
            const orderResult = await client.query(orderQuery, [
                orderData.customer_id, orderData.required_date, orderData.notes, id
            ]);
            
            if (orderResult.rows.length === 0) {
                return null;
            }
            
            const order = orderResult.rows[0];

            // If items are provided, update them
            if (orderData.items) {
                // Remove existing order items and unreserve inventory
                const existingItems = await client.query(
                    'SELECT product_id, quantity FROM order_items WHERE order_id = $1', [id]
                );
                
                for (const item of existingItems.rows) {
                    await client.query(`
                        UPDATE inventory 
                        SET reserved_stock = reserved_stock - $1
                        WHERE product_id = $2
                    `, [item.quantity, item.product_id]);
                }
                
                await client.query('DELETE FROM order_items WHERE order_id = $1', [id]);

                // Add new order items and reserve inventory
                for (const item of orderData.items) {
                    await client.query(`
                        INSERT INTO order_items (order_id, product_id, quantity, unit_price)
                        VALUES ($1, $2, $3, $4)
                    `, [order.id, item.product_id, item.quantity, item.unit_price]);

                    await client.query(`
                        UPDATE inventory 
                        SET reserved_stock = reserved_stock + $1
                        WHERE product_id = $2
                    `, [item.quantity, item.product_id]);
                }
            }

            return order;
        });
    }

    async updateOrderStatus(id, status) {
        const query = `
            UPDATE orders 
            SET status = $1, updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING *
        `;
        const result = await this.query(query, [status, id]);
        return result.rows[0];
    }

    async deleteOrder(id) {
        return await this.transaction(async (client) => {
            // Get order items to unreserve inventory
            const orderItems = await client.query(
                'SELECT product_id, quantity FROM order_items WHERE order_id = $1', [id]
            );
            
            // Unreserve inventory
            for (const item of orderItems.rows) {
                await client.query(`
                    UPDATE inventory 
                    SET reserved_stock = reserved_stock - $1
                    WHERE product_id = $2
                `, [item.quantity, item.product_id]);
            }
            
            // Delete order items
            await client.query('DELETE FROM order_items WHERE order_id = $1', [id]);
            
            // Delete order
            const result = await client.query('DELETE FROM orders WHERE id = $1 RETURNING id', [id]);
            return result.rows.length > 0;
        });
    }

    // Inventory methods
    async getInventoryLevels() {
        const query = `
            SELECT p.name, p.sku, i.current_stock, i.available_stock, 
                   i.reserved_stock, p.reorder_point, i.location,
                   CASE 
                       WHEN i.available_stock <= p.reorder_point THEN 'low'
                       WHEN i.available_stock = 0 THEN 'out_of_stock'
                       ELSE 'normal'
                   END as stock_status
            FROM products p
            LEFT JOIN inventory i ON p.id = i.product_id
            WHERE p.is_active = true
            ORDER BY stock_status DESC, p.name
        `;
        const result = await this.query(query);
        return result.rows;
    }

    async updateInventory(productId, quantity, operation = 'add') {
        const operator = operation === 'add' ? '+' : '-';
        const query = `
            UPDATE inventory 
            SET current_stock = current_stock ${operator} $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE product_id = $2
            RETURNING *
        `;
        const result = await this.query(query, [Math.abs(quantity), productId]);
        return result.rows[0];
    }

    async getInventory(filters = {}) {
        let query = `
            SELECT i.*, p.name as product_name, p.sku, p.category,
                   s.name as supplier_name,
                   CASE 
                       WHEN i.current_stock <= p.reorder_point THEN 'low'
                       WHEN i.current_stock = 0 THEN 'out_of_stock'
                       ELSE 'normal'
                   END as stock_status
            FROM inventory i
            JOIN products p ON i.product_id = p.id
            LEFT JOIN suppliers s ON i.supplier_id = s.id
            WHERE p.is_active = true
        `;
        const params = [];
        let paramCount = 0;

        if (filters.category) {
            paramCount++;
            query += ` AND p.category = $${paramCount}`;
            params.push(filters.category);
        }

        if (filters.status) {
            if (filters.status === 'low') {
                query += ` AND i.current_stock <= p.reorder_point`;
            } else if (filters.status === 'out_of_stock') {
                query += ` AND i.current_stock = 0`;
            }
        }

        if (filters.search) {
            paramCount++;
            query += ` AND (p.name ILIKE $${paramCount} OR p.sku ILIKE $${paramCount})`;
            params.push(`%${filters.search}%`);
        }

        query += ` ORDER BY p.name`;

        const result = await this.query(query, params);
        return result.rows;
    }

    async getInventoryAlerts() {
        const query = `
            SELECT p.name, p.sku, i.current_stock, p.reorder_point,
                   i.location, i.expiry_date,
                   CASE 
                       WHEN i.current_stock <= p.reorder_point THEN 'low_stock'
                       WHEN i.current_stock = 0 THEN 'out_of_stock'
                       WHEN i.expiry_date <= CURRENT_DATE + INTERVAL '30 days' THEN 'expiring_soon'
                   END as alert_type
            FROM inventory i
            JOIN products p ON i.product_id = p.id
            WHERE p.is_active = true 
            AND (i.current_stock <= p.reorder_point 
                 OR i.expiry_date <= CURRENT_DATE + INTERVAL '30 days')
            ORDER BY alert_type, p.name
        `;
        const result = await this.query(query);
        return result.rows;
    }

    async getInventoryStats() {
        const stats = {};

        // Total items
        const totalResult = await this.query(`
            SELECT COUNT(*) as count FROM inventory i
            JOIN products p ON i.product_id = p.id
            WHERE p.is_active = true
        `);
        stats.total_items = parseInt(totalResult.rows[0].count);

        // Low stock items
        const lowStockResult = await this.query(`
            SELECT COUNT(*) as count FROM inventory i
            JOIN products p ON i.product_id = p.id
            WHERE p.is_active = true AND i.current_stock <= p.reorder_point
        `);
        stats.low_stock_items = parseInt(lowStockResult.rows[0].count);

        // Out of stock items
        const outOfStockResult = await this.query(`
            SELECT COUNT(*) as count FROM inventory i
            JOIN products p ON i.product_id = p.id
            WHERE p.is_active = true AND i.current_stock = 0
        `);
        stats.out_of_stock_items = parseInt(outOfStockResult.rows[0].count);

        // Total value
        const valueResult = await this.query(`
            SELECT SUM(i.current_stock * p.price) as total_value
            FROM inventory i
            JOIN products p ON i.product_id = p.id
            WHERE p.is_active = true
        `);
        stats.total_value = parseFloat(valueResult.rows[0].total_value) || 0;

        return stats;
    }

    async createInventoryItem(inventoryData) {
        const {
            product_id, current_stock, minimum_stock, maximum_stock,
            location, batch_number, expiry_date, supplier_id
        } = inventoryData;

        const query = `
            INSERT INTO inventory (
                product_id, current_stock, available_stock, reserved_stock,
                minimum_stock, maximum_stock, location, batch_number,
                expiry_date, supplier_id, created_at, updated_at
            ) VALUES ($1, $2, $2, 0, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING *
        `;

        const result = await this.query(query, [
            product_id, current_stock, minimum_stock, maximum_stock,
            location, batch_number, expiry_date, supplier_id
        ]);

        return result.rows[0];
    }

    async updateInventoryItem(id, inventoryData) {
        const {
            current_stock, minimum_stock, maximum_stock,
            location, batch_number, expiry_date, supplier_id
        } = inventoryData;

        const query = `
            UPDATE inventory 
            SET current_stock = $2,
                available_stock = $2,
                minimum_stock = $3,
                maximum_stock = $4,
                location = $5,
                batch_number = $6,
                expiry_date = $7,
                supplier_id = $8,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING *
        `;

        const result = await this.query(query, [
            id, current_stock, minimum_stock, maximum_stock,
            location, batch_number, expiry_date, supplier_id
        ]);

        return result.rows[0];
    }

    async deleteInventoryItem(id) {
        const query = 'DELETE FROM inventory WHERE id = $1 RETURNING id';
        const result = await this.query(query, [id]);
        return result.rows.length > 0;
    }

    // Supplier methods
    async getAllSuppliers() {
        const query = `SELECT * FROM suppliers WHERE is_active = true ORDER BY name`;
        const result = await this.query(query);
        return result.rows;
    }

    // Dashboard/Analytics methods
    async getDashboardStats() {
        const stats = {};

        // Total products
        const productsResult = await this.query('SELECT COUNT(*) as count FROM products WHERE is_active = true');
        stats.total_products = parseInt(productsResult.rows[0].count);

        // Total customers
        const customersResult = await this.query('SELECT COUNT(*) as count FROM customers WHERE is_active = true');
        stats.total_customers = parseInt(customersResult.rows[0].count);

        // Pending orders
        const ordersResult = await this.query("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'");
        stats.pending_orders = parseInt(ordersResult.rows[0].count);

        // Low stock items
        const lowStockResult = await this.query(`
            SELECT COUNT(*) as count 
            FROM products p 
            JOIN inventory i ON p.id = i.product_id 
            WHERE i.available_stock <= p.reorder_point AND p.is_active = true
        `);
        stats.low_stock_items = parseInt(lowStockResult.rows[0].count);

        // Recent orders value
        const recentOrdersResult = await this.query(`
            SELECT COALESCE(SUM(total_amount), 0) as total 
            FROM orders 
            WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'
        `);
        stats.monthly_sales = parseFloat(recentOrdersResult.rows[0].total);

        return stats;
    }

    // Close the database connection pool
    async close() {
        await this.pool.end();
        console.log('Database connection pool closed');
    }
}

// Create and export a single instance
const database = new PostgresDatabase();

module.exports = database;