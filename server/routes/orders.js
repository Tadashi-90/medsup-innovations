const express = require('express');
const router = express.Router();
const database = require('../database/database');
const db = database.getDb();

// GET /api/orders - Get all orders
router.get('/', (req, res) => {
  const { status, customer_id, limit = 50, offset = 0 } = req.query;
  
  let query = `
    SELECT o.*, c.name as customer_name, c.type as customer_type
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    WHERE 1=1
  `;
  const params = [];

  if (status) {
    query += ' AND o.status = ?';
    params.push(status);
  }

  if (customer_id) {
    query += ' AND o.customer_id = ?';
    params.push(customer_id);
  }

  query += ' ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }
    res.json(rows);
  });
});

// GET /api/orders/:id - Get single order with items
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const orderQuery = `
    SELECT o.*, c.name as customer_name, c.email as customer_email, 
           c.address, c.city, c.postal_code, c.country
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    WHERE o.id = ?
  `;

  db.get(orderQuery, [id], (err, order) => {
    if (err) {
      console.error('Error fetching order:', err);
      return res.status(500).json({ error: 'Failed to fetch order' });
    }
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Get order items
    const itemsQuery = `
      SELECT oi.*, p.name as product_name, p.sku, p.unit_of_measure
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `;

    db.all(itemsQuery, [id], (err, items) => {
      if (err) {
        console.error('Error fetching order items:', err);
        return res.status(500).json({ error: 'Failed to fetch order items' });
      }

      order.items = items;
      res.json(order);
    });
  });
});

// POST /api/orders - Create new order
router.post('/', (req, res) => {
  const { customer_id, required_date, notes, items } = req.body;

  if (!customer_id || !items || items.length === 0) {
    return res.status(400).json({ error: 'Customer ID and items are required' });
  }

  // Generate order number
  const orderNumber = `ORD-${Date.now()}`;
  const orderDate = new Date().toISOString().split('T')[0];

  // Calculate total amount
  let totalAmount = 0;
  items.forEach(item => {
    totalAmount += item.quantity * item.unit_price;
  });

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    // Insert order
    const orderQuery = `
      INSERT INTO orders (order_number, customer_id, order_date, required_date, total_amount, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `;

    db.run(orderQuery, [orderNumber, customer_id, orderDate, required_date, totalAmount, notes], function(err) {
      if (err) {
        console.error('Error creating order:', err);
        db.run('ROLLBACK');
        return res.status(500).json({ error: 'Failed to create order' });
      }

      const orderId = this.lastID;

      // Insert order items
      const itemQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
        VALUES (?, ?, ?, ?, ?)
      `;

      let itemsInserted = 0;
      let hasError = false;

      items.forEach(item => {
        const totalPrice = item.quantity * item.unit_price;
        
        db.run(itemQuery, [orderId, item.product_id, item.quantity, item.unit_price, totalPrice], function(err) {
          if (err && !hasError) {
            console.error('Error creating order item:', err);
            hasError = true;
            db.run('ROLLBACK');
            return res.status(500).json({ error: 'Failed to create order items' });
          }

          itemsInserted++;
          if (itemsInserted === items.length && !hasError) {
            db.run('COMMIT');
            res.status(201).json({ 
              id: orderId, 
              order_number: orderNumber,
              message: 'Order created successfully' 
            });
          }
        });
      });
    });
  });
});

// PUT /api/orders/:id/status - Update order status
router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const query = 'UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';

  db.run(query, [status, id], function(err) {
    if (err) {
      console.error('Error updating order status:', err);
      return res.status(500).json({ error: 'Failed to update order status' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order status updated successfully' });
  });
});

module.exports = router;