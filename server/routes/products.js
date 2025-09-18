const express = require('express');
const router = express.Router();
const database = require('../database/database');
const db = database.getDb();

// GET /api/products - Get all products with optional filtering
router.get('/', (req, res) => {
  const { category, search, limit = 50, offset = 0 } = req.query;
  
  let query = `
    SELECT p.*, i.current_stock, i.minimum_stock, i.location
    FROM products p
    LEFT JOIN inventory i ON p.id = i.product_id
    WHERE 1=1
  `;
  const params = [];

  if (category) {
    query += ' AND p.category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (p.name LIKE ? OR p.description LIKE ? OR p.sku LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  query += ' ORDER BY p.name LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json(rows);
  });
});

// GET /api/products/:id - Get single product
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const query = `
    SELECT p.*, i.current_stock, i.minimum_stock, i.maximum_stock, 
           i.location, i.batch_number, i.expiry_date, s.name as supplier_name
    FROM products p
    LEFT JOIN inventory i ON p.id = i.product_id
    LEFT JOIN suppliers s ON i.supplier_id = s.id
    WHERE p.id = ?
  `;

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(row);
  });
});

// POST /api/products - Create new product
router.post('/', (req, res) => {
  const {
    name, description, category, subcategory, sku, manufacturer,
    unit_price, unit_of_measure, regulatory_info, storage_requirements, shelf_life_months
  } = req.body;

  if (!name || !category || !sku || !unit_price || !unit_of_measure) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO products (name, description, category, subcategory, sku, manufacturer, unit_price, unit_of_measure, regulatory_info, storage_requirements, shelf_life_months)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [
    name, description, category, subcategory, sku, manufacturer,
    unit_price, unit_of_measure, regulatory_info, storage_requirements, shelf_life_months
  ], function(err) {
    if (err) {
      console.error('Error creating product:', err);
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'SKU already exists' });
      }
      return res.status(500).json({ error: 'Failed to create product' });
    }
    res.status(201).json({ id: this.lastID, message: 'Product created successfully' });
  });
});

// PUT /api/products/:id - Update product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    name, description, category, subcategory, sku, manufacturer,
    unit_price, unit_of_measure, regulatory_info, storage_requirements, shelf_life_months
  } = req.body;

  const query = `
    UPDATE products 
    SET name = ?, description = ?, category = ?, subcategory = ?, sku = ?, 
        manufacturer = ?, unit_price = ?, unit_of_measure = ?, regulatory_info = ?, 
        storage_requirements = ?, shelf_life_months = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [
    name, description, category, subcategory, sku, manufacturer,
    unit_price, unit_of_measure, regulatory_info, storage_requirements, shelf_life_months, id
  ], function(err) {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ error: 'Failed to update product' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully' });
  });
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ error: 'Failed to delete product' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

// GET /api/products/categories - Get all categories
router.get('/meta/categories', (req, res) => {
  const query = 'SELECT DISTINCT category FROM products ORDER BY category';
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    res.json(rows.map(row => row.category));
  });
});

module.exports = router;