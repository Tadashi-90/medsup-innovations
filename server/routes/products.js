const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const database = require('../database/postgres');
const { authenticateToken, authorizeRoles, optionalAuth } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/products';
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

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

// POST /api/products/upload/:id - Upload product image
router.post('/upload/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Update product with image path
    const imagePath = `/uploads/products/${req.file.filename}`;
    const query = 'UPDATE products SET image_url = $1 WHERE id = $2 RETURNING *';
    const result = await database.query(query, [imagePath, id]);
    
    if (result.rows.length === 0) {
      // Delete uploaded file if product not found
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ 
      message: 'Image uploaded successfully',
      image_url: imagePath,
      product: result.rows[0]
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    // Clean up uploaded file on error
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting uploaded file:', unlinkError);
      }
    }
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    
    // Extract all possible fields from request body
    const {
      name, description, category, subcategory, sku, manufacturer, model_number,
      unit_price, cost_price, unit_of_measure, reorder_point, reorder_quantity,
      lead_time_days, regulatory_approval, shelf_life_months, weight_kg,
      dimensions_cm, barcode, storage_requirements, lot_tracking_required,
      expiry_tracking_required, temperature_controlled, hazardous_material,
      is_active, storage_temperature_min, storage_temperature_max, qr_code
    } = req.body;

    const productData = {
      name, description, category, subcategory, sku, manufacturer, model_number,
      unit_price, cost_price, unit_of_measure, reorder_point, reorder_quantity,
      lead_time_days, regulatory_approval, shelf_life_months, weight_kg,
      dimensions_cm, barcode, storage_requirements, lot_tracking_required,
      expiry_tracking_required, temperature_controlled, hazardous_material,
      is_active, storage_temperature_min, storage_temperature_max, qr_code
    };

    // Handle image upload if provided
    if (req.file) {
      productData.image_url = `/uploads/products/${req.file.filename}`;
    }

    const product = await database.updateProduct(id, productData);
    
    if (!product) {
      // Delete uploaded file if product not found
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ 
      message: 'Product updated successfully',
      product 
    });
  } catch (error) {
    console.error('Error updating product:', error);
    // Clean up uploaded file on error
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting uploaded file:', unlinkError);
      }
    }
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