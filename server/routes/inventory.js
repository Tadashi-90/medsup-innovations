const express = require('express');
const router = express.Router();
const database = require('../database/database');
const db = database.getDb();

// GET /api/inventory - Get inventory overview
router.get('/', (req, res) => {
  const { low_stock, expiring_soon } = req.query;
  
  let query = `
    SELECT i.*, p.name, p.sku, p.category, p.unit_of_measure, s.name as supplier_name
    FROM inventory i
    JOIN products p ON i.product_id = p.id
    LEFT JOIN suppliers s ON i.supplier_id = s.id
    WHERE 1=1
  `;
  const params = [];

  if (low_stock === 'true') {
    query += ' AND i.current_stock <= i.minimum_stock';
  }

  if (expiring_soon === 'true') {
    query += ' AND i.expiry_date <= date("now", "+3 months")';
  }

  query += ' ORDER BY p.name';

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error fetching inventory:', err);
      return res.status(500).json({ error: 'Failed to fetch inventory' });
    }
    res.json(rows);
  });
});

// GET /api/inventory/alerts - Get inventory alerts
router.get('/alerts', (req, res) => {
  const alertsQuery = `
    SELECT 
      'low_stock' as alert_type,
      p.name as product_name,
      p.sku,
      i.current_stock,
      i.minimum_stock,
      i.location,
      'Stock level below minimum threshold' as message
    FROM inventory i
    JOIN products p ON i.product_id = p.id
    WHERE i.current_stock <= i.minimum_stock
    
    UNION ALL
    
    SELECT 
      'expiring_soon' as alert_type,
      p.name as product_name,
      p.sku,
      i.current_stock,
      i.minimum_stock,
      i.location,
      'Product expires within 3 months' as message
    FROM inventory i
    JOIN products p ON i.product_id = p.id
    WHERE i.expiry_date <= date("now", "+3 months")
    
    ORDER BY alert_type, product_name
  `;

  db.all(alertsQuery, [], (err, rows) => {
    if (err) {
      console.error('Error fetching alerts:', err);
      return res.status(500).json({ error: 'Failed to fetch alerts' });
    }
    res.json(rows);
  });
});

// GET /api/inventory/stats - Get inventory statistics
router.get('/stats', (req, res) => {
  const statsQuery = `
    SELECT 
      COUNT(*) as total_products,
      SUM(CASE WHEN current_stock <= minimum_stock THEN 1 ELSE 0 END) as low_stock_count,
      SUM(CASE WHEN expiry_date <= date("now", "+3 months") THEN 1 ELSE 0 END) as expiring_soon_count,
      SUM(current_stock * (SELECT unit_price FROM products WHERE id = inventory.product_id)) as total_inventory_value
    FROM inventory
  `;

  db.get(statsQuery, [], (err, row) => {
    if (err) {
      console.error('Error fetching inventory stats:', err);
      return res.status(500).json({ error: 'Failed to fetch inventory statistics' });
    }
    res.json(row);
  });
});

// PUT /api/inventory/:id/stock - Update stock level
router.put('/:id/stock', (req, res) => {
  const { id } = req.params;
  const { current_stock, adjustment_reason } = req.body;

  if (current_stock === undefined || current_stock < 0) {
    return res.status(400).json({ error: 'Invalid stock level' });
  }

  const query = `
    UPDATE inventory 
    SET current_stock = ?, last_updated = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [current_stock, id], function(err) {
    if (err) {
      console.error('Error updating stock:', err);
      return res.status(500).json({ error: 'Failed to update stock level' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json({ message: 'Stock level updated successfully' });
  });
});

// POST /api/inventory - Add new inventory item
router.post('/', (req, res) => {
  const {
    product_id, current_stock, minimum_stock, maximum_stock,
    location, batch_number, expiry_date, supplier_id
  } = req.body;

  if (!product_id || current_stock === undefined || !minimum_stock) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO inventory (product_id, current_stock, minimum_stock, maximum_stock, location, batch_number, expiry_date, supplier_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [
    product_id, current_stock, minimum_stock, maximum_stock,
    location, batch_number, expiry_date, supplier_id
  ], function(err) {
    if (err) {
      console.error('Error creating inventory item:', err);
      return res.status(500).json({ error: 'Failed to create inventory item' });
    }
    res.status(201).json({ id: this.lastID, message: 'Inventory item created successfully' });
  });
});

// PUT /api/inventory/:id - Update inventory item
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    current_stock, minimum_stock, maximum_stock,
    location, batch_number, expiry_date, supplier_id
  } = req.body;

  const query = `
    UPDATE inventory 
    SET current_stock = ?, minimum_stock = ?, maximum_stock = ?, 
        location = ?, batch_number = ?, expiry_date = ?, supplier_id = ?,
        last_updated = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [
    current_stock, minimum_stock, maximum_stock,
    location, batch_number, expiry_date, supplier_id, id
  ], function(err) {
    if (err) {
      console.error('Error updating inventory:', err);
      return res.status(500).json({ error: 'Failed to update inventory item' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json({ message: 'Inventory item updated successfully' });
  });
});

// DELETE /api/inventory/:id - Delete inventory item
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM inventory WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Error deleting inventory item:', err);
      return res.status(500).json({ error: 'Failed to delete inventory item' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json({ message: 'Inventory item deleted successfully' });
  });
});

module.exports = router;