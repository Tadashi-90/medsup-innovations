const express = require('express');
const router = express.Router();
const database = require('../database/postgres');

// GET /api/inventory - Get inventory overview
router.get('/', async (req, res) => {
  try {
    const { low_stock, expiring_soon } = req.query;
    const filters = { low_stock, expiring_soon };
    
    const inventory = await database.getInventory(filters);
    res.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// GET /api/inventory/alerts - Get inventory alerts
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await database.getInventoryAlerts();
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// GET /api/inventory/stats - Get inventory statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await database.getInventoryStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching inventory stats:', error);
    res.status(500).json({ error: 'Failed to fetch inventory statistics' });
  }
});

// PUT /api/inventory/:id/stock - Update stock level
router.put('/:id/stock', async (req, res) => {
  try {
    const { id } = req.params;
    const { current_stock, adjustment_reason } = req.body;

    if (current_stock === undefined || current_stock < 0) {
      return res.status(400).json({ error: 'Invalid stock level' });
    }

    const inventory = await database.updateInventoryStock(id, current_stock);
    
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    
    res.json({ 
      message: 'Stock level updated successfully',
      inventory 
    });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ error: 'Failed to update stock level' });
  }
});

// POST /api/inventory - Add new inventory item
router.post('/', async (req, res) => {
  try {
    const {
      product_id, current_stock, minimum_stock, maximum_stock,
      location, batch_number, expiry_date, supplier_id
    } = req.body;

    if (!product_id || current_stock === undefined || !minimum_stock) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const inventoryData = {
      product_id, current_stock, minimum_stock, maximum_stock,
      location, batch_number, expiry_date, supplier_id
    };

    const inventory = await database.createInventoryItem(inventoryData);
    res.status(201).json({ 
      id: inventory.id, 
      message: 'Inventory item created successfully',
      inventory 
    });
  } catch (error) {
    console.error('Error creating inventory item:', error);
    res.status(500).json({ error: 'Failed to create inventory item' });
  }
});

// PUT /api/inventory/:id - Update inventory item
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      current_stock, minimum_stock, maximum_stock,
      location, batch_number, expiry_date, supplier_id
    } = req.body;

    const updateData = {
      current_stock, minimum_stock, maximum_stock,
      location, batch_number, expiry_date, supplier_id
    };

    const inventory = await database.updateInventoryItem(id, updateData);
    
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    
    res.json({ 
      message: 'Inventory item updated successfully',
      inventory 
    });
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
});

// DELETE /api/inventory/:id - Delete inventory item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await database.deleteInventoryItem(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    res.status(500).json({ error: 'Failed to delete inventory item' });
  }
});

module.exports = router;