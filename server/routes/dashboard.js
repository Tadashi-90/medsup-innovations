const express = require('express');
const router = express.Router();
const database = require('../database/postgres');

// GET /api/dashboard - Get dashboard overview data
router.get('/', async (req, res) => {
  try {
    const dashboardData = await database.getDashboardStats();
    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// GET /api/dashboard/alerts - Get all system alerts
router.get('/alerts', async (req, res) => {
  try {
    const alertsQuery = `
      SELECT 
        'low_stock' as type,
        'warning' as severity,
        p.name || ' is running low (Stock: ' || i.current_stock || ', Min: ' || i.reorder_point || ')' as message,
        i.location,
        NOW() as timestamp
      FROM inventory i
      JOIN products p ON i.product_id = p.id
      WHERE i.current_stock <= i.reorder_point
      
      UNION ALL
      
      SELECT 
        'expiring_soon' as type,
        'info' as severity,
        p.name || ' expires on ' || i.expiry_date::text as message,
        i.location,
        NOW() as timestamp
      FROM inventory i
      JOIN products p ON i.product_id = p.id
      WHERE i.expiry_date <= CURRENT_DATE + INTERVAL '3 months'
      
      UNION ALL
      
      SELECT 
        'pending_orders' as type,
        'info' as severity,
        'Order #' || o.order_number || ' from ' || c.name || ' is pending' as message,
        '' as location,
        o.created_at as timestamp
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE o.status = 'pending' AND o.created_at >= CURRENT_DATE - INTERVAL '7 days'
      
      ORDER BY timestamp DESC
      LIMIT 20
    `;

    const result = await database.query(alertsQuery);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

module.exports = router;