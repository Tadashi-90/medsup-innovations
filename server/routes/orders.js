const express = require('express');
const router = express.Router();
const database = require('../database/postgres');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// GET /api/orders - Get all orders (requires authentication)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, customer_id, limit = 50, offset = 0 } = req.query;
    const orders = await database.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id - Get single order with items (requires authentication)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await database.getOrderById(id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// POST /api/orders - Create new order (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { customer_id, required_date, notes, items } = req.body;

    if (!customer_id || !items || items.length === 0) {
      return res.status(400).json({ error: 'Customer ID and items are required' });
    }

    const orderData = {
      customer_id,
      required_date,
      notes,
      items
    };

    const order = await database.createOrder(orderData);
    res.status(201).json({ 
      id: order.id, 
      order_number: order.order_number,
      message: 'Order created successfully',
      order 
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// PUT /api/orders/:id/status - Update order status (admin only)
router.put('/:id/status', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await database.updateOrderStatus(id, status);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ 
      message: 'Order status updated successfully',
      order 
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// PUT /api/orders/:id - Update order (requires authentication)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_id, required_date, notes, items } = req.body;

    const orderData = {
      customer_id,
      required_date,
      notes,
      items
    };

    const order = await database.updateOrder(id, orderData);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ 
      message: 'Order updated successfully',
      order 
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// DELETE /api/orders/:id - Delete order (admin only)
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const success = await database.deleteOrder(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router;