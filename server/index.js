const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
// Configure CORS: allow specific origins via env or reflect request origin in development
- const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true;
- app.use(cors({
-   origin: allowedOrigins,
-   credentials: true,
-   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
-   allowedHeaders: ['Content-Type', 'Authorization'],
- }));
- // Explicitly handle preflight requests
- app.options('*', cors({
-   origin: allowedOrigins,
-   credentials: true,
-   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
-   allowedHeaders: ['Content-Type', 'Authorization'],
- }));
+ const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map(s => s.trim()) : [];
+ const corsOptions = {
+   origin: (origin, callback) => {
+     // Allow non-browser requests (no origin header)
+     if (!origin) return callback(null, true);
+     try {
+       const hostname = new URL(origin).hostname;
+       // Allow explicit origins and any Vercel preview domains
+       if (allowedOrigins.includes(origin) || hostname.endsWith('.vercel.app')) {
+         return callback(null, true);
+       }
+     } catch (_) {
+       if (allowedOrigins.includes(origin)) {
+         return callback(null, true);
+       }
+     }
+     return callback(new Error('Not allowed by CORS'));
+   },
+   credentials: true,
+   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
+   allowedHeaders: ['Content-Type', 'Authorization'],
+ };
+ app.use(cors(corsOptions));
+ // Explicitly handle preflight requests
+ app.options('*', cors(corsOptions));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Medsup Innovation Ltd API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Medsup Innovation Ltd API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});