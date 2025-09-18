const express = require('express');
const router = express.Router();
const database = require('../database/database');
const db = database.getDb();

// GET /api/dashboard - Get dashboard overview data
router.get('/', (req, res) => {
  const dashboardData = {};

  // Get key metrics
  const metricsQuery = `
    SELECT 
      (SELECT COUNT(*) FROM products) as total_products,
      (SELECT COUNT(*) FROM customers WHERE status = 'active') as active_customers,
      (SELECT COUNT(*) FROM orders WHERE status IN ('pending', 'confirmed')) as pending_orders,
      (SELECT COUNT(*) FROM inventory WHERE current_stock <= minimum_stock) as low_stock_alerts,
      (SELECT COUNT(*) FROM inventory WHERE expiry_date <= date("now", "+3 months")) as expiring_soon_alerts,
      (SELECT SUM(current_stock * (SELECT unit_price FROM products WHERE id = inventory.product_id)) FROM inventory) as total_inventory_value
  `;

  db.get(metricsQuery, [], (err, metrics) => {
    if (err) {
      console.error('Error fetching dashboard metrics:', err);
      return res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }

    dashboardData.metrics = metrics;

    // Get recent orders
    const recentOrdersQuery = `
      SELECT o.id, o.order_number, o.order_date, o.status, o.total_amount, c.name as customer_name
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      ORDER BY o.created_at DESC
      LIMIT 5
    `;

    db.all(recentOrdersQuery, [], (err, recentOrders) => {
      if (err) {
        console.error('Error fetching recent orders:', err);
        return res.status(500).json({ error: 'Failed to fetch recent orders' });
      }

      dashboardData.recentOrders = recentOrders;

      // Get low stock items
      const lowStockQuery = `
        SELECT p.name, p.sku, i.current_stock, i.minimum_stock, i.location
        FROM inventory i
        JOIN products p ON i.product_id = p.id
        WHERE i.current_stock <= i.minimum_stock
        ORDER BY (i.current_stock - i.minimum_stock) ASC
        LIMIT 5
      `;

      db.all(lowStockQuery, [], (err, lowStockItems) => {
        if (err) {
          console.error('Error fetching low stock items:', err);
          return res.status(500).json({ error: 'Failed to fetch low stock items' });
        }

        dashboardData.lowStockItems = lowStockItems;

        // Get top selling categories (mock data for now)
        const categoryStatsQuery = `
          SELECT p.category, COUNT(*) as product_count, SUM(i.current_stock) as total_stock
          FROM products p
          LEFT JOIN inventory i ON p.id = i.product_id
          GROUP BY p.category
          ORDER BY product_count DESC
        `;

        db.all(categoryStatsQuery, [], (err, categoryStats) => {
          if (err) {
            console.error('Error fetching category stats:', err);
            return res.status(500).json({ error: 'Failed to fetch category statistics' });
          }

          dashboardData.categoryStats = categoryStats;

          // Get monthly sales trend (mock data for demo)
          const monthlySales = [
            { month: 'Jan', sales: 45000, orders: 120 },
            { month: 'Feb', sales: 52000, orders: 135 },
            { month: 'Mar', sales: 48000, orders: 128 },
            { month: 'Apr', sales: 61000, orders: 156 },
            { month: 'May', sales: 55000, orders: 142 },
            { month: 'Jun', sales: 67000, orders: 178 }
          ];

          dashboardData.monthlySales = monthlySales;

          res.json(dashboardData);
        });
      });
    });
  });
});

// GET /api/dashboard/alerts - Get all system alerts
router.get('/alerts', (req, res) => {
  const alertsQuery = `
    SELECT 
      'low_stock' as type,
      'warning' as severity,
      p.name || ' is running low (Stock: ' || i.current_stock || ', Min: ' || i.minimum_stock || ')' as message,
      i.location,
      datetime('now') as timestamp
    FROM inventory i
    JOIN products p ON i.product_id = p.id
    WHERE i.current_stock <= i.minimum_stock
    
    UNION ALL
    
    SELECT 
      'expiring_soon' as type,
      'info' as severity,
      p.name || ' expires on ' || i.expiry_date as message,
      i.location,
      datetime('now') as timestamp
    FROM inventory i
    JOIN products p ON i.product_id = p.id
    WHERE i.expiry_date <= date("now", "+3 months")
    
    UNION ALL
    
    SELECT 
      'pending_orders' as type,
      'info' as severity,
      'Order #' || o.order_number || ' from ' || c.name || ' is pending' as message,
      '' as location,
      o.created_at as timestamp
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    WHERE o.status = 'pending' AND date(o.created_at) >= date('now', '-7 days')
    
    ORDER BY timestamp DESC
    LIMIT 20
  `;

  db.all(alertsQuery, [], (err, alerts) => {
    if (err) {
      console.error('Error fetching alerts:', err);
      return res.status(500).json({ error: 'Failed to fetch alerts' });
    }
    res.json(alerts);
  });
});

module.exports = router;