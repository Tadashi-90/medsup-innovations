const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');
require('dotenv').config();

class DatabaseMigration {
    constructor() {
        // SQLite database path
        this.sqliteDbPath = path.join(__dirname, 'database.db');
        
        // PostgreSQL connection
        this.pgPool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }

    async migrateSQLiteToPostgreSQL() {
        console.log('🚀 Starting migration from SQLite to PostgreSQL...');

        try {
            // Check if SQLite database exists
            if (!fs.existsSync(this.sqliteDbPath)) {
                console.log('⚠️  SQLite database not found. Skipping data migration.');
                console.log('📋 You can still use the schema.sql and sample_data.sql files to set up your database.');
                return;
            }

            // Connect to SQLite
            const sqliteDb = new sqlite3.Database(this.sqliteDbPath);
            console.log('✅ Connected to SQLite database');

            // Connect to PostgreSQL
            const pgClient = await this.pgPool.connect();
            console.log('✅ Connected to PostgreSQL database');

            // Migrate data
            await this.migrateProducts(sqliteDb, pgClient);
            await this.migrateCustomers(sqliteDb, pgClient);
            await this.migrateSuppliers(sqliteDb, pgClient);
            await this.migrateInventory(sqliteDb, pgClient);
            await this.migrateOrders(sqliteDb, pgClient);
            await this.migrateOrderItems(sqliteDb, pgClient);

            // Close connections
            sqliteDb.close();
            pgClient.release();

            console.log('🎉 Migration completed successfully!');

        } catch (error) {
            console.error('❌ Migration failed:', error);
            throw error;
        }
    }

    async migrateProducts(sqliteDb, pgClient) {
        console.log('📦 Migrating products...');

        return new Promise((resolve, reject) => {
            sqliteDb.all('SELECT * FROM products', async (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                try {
                    for (const row of rows) {
                        await pgClient.query(`
                            INSERT INTO products (name, description, category, sku, unit_price, unit_of_measure, reorder_point, reorder_quantity, is_active)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                            ON CONFLICT (sku) DO UPDATE SET
                                name = EXCLUDED.name,
                                description = EXCLUDED.description,
                                unit_price = EXCLUDED.unit_price
                        `, [
                            row.name,
                            row.description,
                            this.mapCategory(row.category),
                            row.sku || `SKU-${row.id}`,
                            row.price || 0,
                            'each',
                            row.reorder_point || 10,
                            row.reorder_quantity || 50,
                            true
                        ]);
                    }
                    console.log(`✅ Migrated ${rows.length} products`);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    async migrateCustomers(sqliteDb, pgClient) {
        console.log('👥 Migrating customers...');

        return new Promise((resolve, reject) => {
            sqliteDb.all('SELECT * FROM customers', async (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                try {
                    for (const row of rows) {
                        await pgClient.query(`
                            INSERT INTO customers (name, type, contact_person, email, phone, billing_address, payment_terms, is_active)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                            ON CONFLICT DO NOTHING
                        `, [
                            row.name,
                            this.mapCustomerType(row.type),
                            row.contact_person,
                            row.email,
                            row.phone,
                            row.address,
                            30,
                            true
                        ]);
                    }
                    console.log(`✅ Migrated ${rows.length} customers`);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    async migrateSuppliers(sqliteDb, pgClient) {
        console.log('🏭 Migrating suppliers...');

        return new Promise((resolve, reject) => {
            sqliteDb.all('SELECT * FROM suppliers', async (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                try {
                    for (const row of rows) {
                        await pgClient.query(`
                            INSERT INTO suppliers (name, contact_person, email, phone, address, payment_terms, is_active)
                            VALUES ($1, $2, $3, $4, $5, $6, $7)
                            ON CONFLICT DO NOTHING
                        `, [
                            row.name,
                            row.contact_person,
                            row.email,
                            row.phone,
                            row.address,
                            30,
                            row.status === 'active'
                        ]);
                    }
                    console.log(`✅ Migrated ${rows.length} suppliers`);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    async migrateInventory(sqliteDb, pgClient) {
        console.log('📊 Migrating inventory...');

        return new Promise((resolve, reject) => {
            sqliteDb.all(`
                SELECT i.*, p.sku 
                FROM inventory i 
                JOIN products p ON i.product_id = p.id
            `, async (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                try {
                    for (const row of rows) {
                        // Get the PostgreSQL product ID by SKU
                        const productResult = await pgClient.query(
                            'SELECT id FROM products WHERE sku = $1',
                            [row.sku || `SKU-${row.product_id}`]
                        );

                        if (productResult.rows.length > 0) {
                            await pgClient.query(`
                                INSERT INTO inventory (product_id, current_stock, location, unit_cost)
                                VALUES ($1, $2, $3, $4)
                                ON CONFLICT DO NOTHING
                            `, [
                                productResult.rows[0].id,
                                row.current_stock || 0,
                                'Main Warehouse',
                                0
                            ]);
                        }
                    }
                    console.log(`✅ Migrated ${rows.length} inventory records`);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    async migrateOrders(sqliteDb, pgClient) {
        console.log('📋 Migrating orders...');

        return new Promise((resolve, reject) => {
            sqliteDb.all(`
                SELECT o.*, c.name as customer_name 
                FROM orders o 
                JOIN customers c ON o.customer_id = c.id
            `, async (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                try {
                    for (const row of rows) {
                        // Get the PostgreSQL customer ID by name
                        const customerResult = await pgClient.query(
                            'SELECT id FROM customers WHERE name = $1',
                            [row.customer_name]
                        );

                        if (customerResult.rows.length > 0) {
                            await pgClient.query(`
                                INSERT INTO orders (order_number, customer_id, order_date, status, total_amount, subtotal, tax_amount)
                                VALUES ($1, $2, $3, $4, $5, $6, $7)
                                ON CONFLICT (order_number) DO NOTHING
                            `, [
                                row.order_number,
                                customerResult.rows[0].id,
                                row.order_date || new Date().toISOString().split('T')[0],
                                this.mapOrderStatus(row.status),
                                row.total_amount || 0,
                                row.total_amount || 0,
                                0
                            ]);
                        }
                    }
                    console.log(`✅ Migrated ${rows.length} orders`);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    async migrateOrderItems(sqliteDb, pgClient) {
        console.log('📝 Migrating order items...');

        return new Promise((resolve, reject) => {
            sqliteDb.all(`
                SELECT oi.*, o.order_number, p.sku 
                FROM order_items oi 
                JOIN orders o ON oi.order_id = o.id 
                JOIN products p ON oi.product_id = p.id
            `, async (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                try {
                    for (const row of rows) {
                        // Get PostgreSQL order and product IDs
                        const orderResult = await pgClient.query(
                            'SELECT id FROM orders WHERE order_number = $1',
                            [row.order_number]
                        );
                        const productResult = await pgClient.query(
                            'SELECT id FROM products WHERE sku = $1',
                            [row.sku || `SKU-${row.product_id}`]
                        );

                        if (orderResult.rows.length > 0 && productResult.rows.length > 0) {
                            await pgClient.query(`
                                INSERT INTO order_items (order_id, product_id, quantity, unit_price)
                                VALUES ($1, $2, $3, $4)
                                ON CONFLICT DO NOTHING
                            `, [
                                orderResult.rows[0].id,
                                productResult.rows[0].id,
                                row.quantity || 1,
                                row.unit_price || 0
                            ]);
                        }
                    }
                    console.log(`✅ Migrated ${rows.length} order items`);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    // Helper methods to map old values to new enum types
    mapCategory(category) {
        const categoryMap = {
            'medical_devices': 'medical_devices',
            'laboratory_equipment': 'laboratory_equipment',
            'consumables': 'consumables',
            'pharmaceuticals': 'pharmaceuticals',
            'safety_equipment': 'safety_equipment',
            'diagnostic_tools': 'diagnostic_tools'
        };
        return categoryMap[category] || 'consumables';
    }

    mapCustomerType(type) {
        const typeMap = {
            'hospital': 'hospital',
            'clinic': 'clinic',
            'laboratory': 'laboratory',
            'research': 'research',
            'pharmacy': 'pharmacy',
            'government': 'government'
        };
        return typeMap[type] || 'clinic';
    }

    mapOrderStatus(status) {
        const statusMap = {
            'pending': 'pending',
            'confirmed': 'confirmed',
            'processing': 'processing',
            'shipped': 'shipped',
            'delivered': 'delivered',
            'cancelled': 'cancelled'
        };
        return statusMap[status] || 'pending';
    }

    async setupDatabase() {
        console.log('🔧 Setting up PostgreSQL database...');

        try {
            const client = await this.pgPool.connect();

            // Read and execute schema
            const schemaPath = path.join(__dirname, 'schema.sql');
            if (fs.existsSync(schemaPath)) {
                const schema = fs.readFileSync(schemaPath, 'utf8');
                await client.query(schema);
                console.log('✅ Database schema created');
            }

            client.release();
        } catch (error) {
            console.error('❌ Error setting up database:', error);
            throw error;
        }
    }

    async close() {
        await this.pgPool.end();
    }
}

// CLI interface
if (require.main === module) {
    const migration = new DatabaseMigration();
    
    const command = process.argv[2];
    
    if (command === 'setup') {
        migration.setupDatabase()
            .then(() => {
                console.log('🎉 Database setup completed!');
                process.exit(0);
            })
            .catch((error) => {
                console.error('❌ Setup failed:', error);
                process.exit(1);
            });
    } else if (command === 'migrate') {
        migration.migrateSQLiteToPostgreSQL()
            .then(() => {
                console.log('🎉 Migration completed!');
                process.exit(0);
            })
            .catch((error) => {
                console.error('❌ Migration failed:', error);
                process.exit(1);
            });
    } else {
        console.log(`
Usage:
  node migrate.js setup   - Create database schema
  node migrate.js migrate - Migrate data from SQLite to PostgreSQL
        `);
    }
}

module.exports = DatabaseMigration;