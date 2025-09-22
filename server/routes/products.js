const express = require('express');
const router = express.Router();
const database = require('../database/postgres');
const { authenticateToken, authorizeRoles, optionalAuth } = require('../middleware/auth');

// GET /api/products - Get all products with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 50, offset = 0 } = req.query;
    
    let query = `
      SELECT p.*, i.current_stock, i.available_stock, i.location, s.name as supplier_name
      FROM products p
      LEFT JOIN inventory i ON p.id = i.product_id
      LEFT JOIN product_suppliers ps ON p.id = ps.product_id AND ps.is_preferred = true
      LEFT JOIN suppliers s ON ps.supplier_id = s.id
      WHERE p.is_active = true
    `;
    const params = [];
    let paramCount = 1;

    if (category) {
      query += ` AND p.category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (search) {
      query += ` AND (p.name ILIKE $${paramCount} OR p.description ILIKE $${paramCount + 1} OR p.sku ILIKE $${paramCount + 2})`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
      paramCount += 3;
    }

    query += ` ORDER BY p.name LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit), parseInt(offset));

    const result = await database.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await database.getProductById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products - Create new product
router.post('/', async (req, res) => {
  try {
    const {
      name, description, category, sku, manufacturer,
      unit_price, cost_price, unit_of_measure, reorder_point, reorder_quantity
    } = req.body;

    if (!name || !category || !sku || !unit_price || !unit_of_measure) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const productData = {
      name, description, category, sku, manufacturer,
      unit_price, cost_price, unit_of_measure, reorder_point, reorder_quantity
    };

    const product = await database.createProduct(productData);
    res.status(201).json({ 
      id: product.id, 
      message: 'Product created successfully',
      product 
    });
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.message.includes('duplicate key')) {
      return res.status(400).json({ error: 'SKU already exists' });
    }
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, description, category, sku, manufacturer,
      unit_price, cost_price, unit_of_measure, reorder_point, reorder_quantity
    } = req.body;

    const productData = {
      name, description, category, sku, manufacturer,
      unit_price, cost_price, unit_of_measure, reorder_point, reorder_quantity
    };

    const product = await database.updateProduct(id, productData);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ 
      message: 'Product updated successfully',
      product 
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const success = await database.deleteProduct(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// GET /api/products/categories - Get all categories
router.get('/meta/categories', async (req, res) => {
  try {
    const query = 'SELECT DISTINCT category FROM products WHERE is_active = true ORDER BY category';
    const result = await database.query(query);
    res.json(result.rows.map(row => row.category));
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;