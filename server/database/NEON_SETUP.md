# Neon PostgreSQL Database Setup Guide

This guide will help you set up your Medsup Innovations database on Neon, a serverless PostgreSQL platform.

## 🚀 Quick Start

### 1. Create a Neon Account and Database

1. Go to [Neon.tech](https://neon.tech) and sign up for a free account
2. Create a new project called "Medsup Innovations"
3. Choose your preferred region (closest to your users)
4. Copy the connection string provided

### 2. Install Dependencies

```bash
cd server
npm install
```

This will install the new `pg` (PostgreSQL) dependency along with existing packages.

### 3. Configure Environment Variables

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Edit `.env` and update the `DATABASE_URL` with your Neon connection string:
```env
DATABASE_URL=postgresql://username:password@ep-example-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 4. Set Up Database Schema

Run the setup script to create all tables and indexes:
```bash
npm run db:setup
```

Or manually using psql:
```bash
psql $DATABASE_URL -f database/schema.sql
```

### 5. Add Sample Data (Optional)

To populate your database with sample data for testing:
```bash
npm run db:sample
```

Or manually:
```bash
psql $DATABASE_URL -f database/sample_data.sql
```

### 6. Migrate Existing SQLite Data (Optional)

If you have existing data in SQLite that you want to migrate:
```bash
npm run db:migrate
```

## 📋 Database Schema Overview

### Core Tables

- **users** - System users with role-based access
- **products** - Medical supplies and equipment catalog
- **customers** - Hospitals, clinics, labs, pharmacies
- **suppliers** - Product suppliers and vendors
- **inventory** - Stock levels, batches, expiry tracking
- **orders** - Customer orders with full lifecycle
- **order_items** - Individual items within orders
- **purchase_orders** - Orders to suppliers
- **purchase_order_items** - Items in purchase orders
- **audit_log** - Change tracking for compliance

### Key Features

✅ **UUID Primary Keys** - Better for distributed systems
✅ **ENUM Types** - Data integrity for status fields
✅ **Automatic Timestamps** - Created/updated tracking
✅ **Computed Columns** - Available stock calculation
✅ **Foreign Key Constraints** - Data consistency
✅ **Indexes** - Optimized query performance
✅ **Audit Trail** - Complete change history

### Medical Industry Specific Features

- **Regulatory Approval Tracking** (FDA, CE marks)
- **Batch/Lot Number Management**
- **Expiry Date Monitoring**
- **Temperature Control Requirements**
- **Hazardous Material Flagging**
- **Serial Number Tracking**
- **Quality Status Management**

## 🔧 Backend Integration

### Update Your Server Code

Replace SQLite imports with PostgreSQL:

```javascript
// Old SQLite import
// const database = require('./database/database');

// New PostgreSQL import
const database = require('./database/postgres');
```

### Available Methods

The PostgreSQL database class provides these methods:

#### Products
- `getAllProducts()` - Get all active products with inventory
- `getProductById(id)` - Get single product details
- `createProduct(productData)` - Add new product
- `updateProduct(id, productData)` - Update product

#### Customers
- `getAllCustomers()` - Get all active customers
- `getCustomerById(id)` - Get customer details
- `createCustomer(customerData)` - Add new customer

#### Orders
- `getAllOrders()` - Get orders with customer info
- `getOrderById(id)` - Get order with items
- `createOrder(orderData)` - Create order with items

#### Inventory
- `getInventoryLevels()` - Get stock levels and alerts
- `updateInventory(productId, quantity, operation)` - Adjust stock

#### Analytics
- `getDashboardStats()` - Get key metrics for dashboard

## 🔒 Security Features

- **SSL/TLS Encryption** - All connections encrypted
- **Connection Pooling** - Efficient resource usage
- **Prepared Statements** - SQL injection protection
- **Role-Based Access** - User permission system
- **Audit Logging** - Complete change tracking

## 📊 Performance Optimizations

- **Indexes** on frequently queried columns
- **Connection Pooling** for concurrent requests
- **Computed Columns** for real-time calculations
- **Efficient Joins** for related data
- **Pagination Support** for large datasets

## 🚨 Monitoring and Alerts

### Low Stock Alerts
Products with stock below reorder point are flagged in:
- Dashboard statistics
- Inventory levels query
- Automated reports

### Expiry Tracking
Monitor products approaching expiry dates:
```sql
SELECT * FROM inventory 
WHERE expiry_date <= CURRENT_DATE + INTERVAL '30 days'
AND expiry_date > CURRENT_DATE;
```

## 🔄 Backup and Recovery

Neon provides:
- **Automatic Backups** - Point-in-time recovery
- **Branch Creation** - Database branching for testing
- **High Availability** - 99.9% uptime SLA

## 📈 Scaling Considerations

### Neon Scaling Features
- **Autoscaling** - Automatic compute scaling
- **Read Replicas** - Scale read operations
- **Connection Pooling** - Handle concurrent users
- **Storage Scaling** - Automatic storage expansion

### Application Scaling
- Use connection pooling (already configured)
- Implement caching for frequently accessed data
- Consider read replicas for reporting
- Monitor query performance

## 🛠️ Troubleshooting

### Common Issues

1. **Connection Timeout**
   - Check your DATABASE_URL format
   - Ensure SSL is enabled (`sslmode=require`)
   - Verify network connectivity

2. **Permission Errors**
   - Ensure your Neon user has proper permissions
   - Check if tables exist (`npm run db:setup`)

3. **Migration Issues**
   - Verify SQLite database exists
   - Check data format compatibility
   - Review migration logs

### Getting Help

- Check Neon documentation: https://neon.tech/docs
- Review PostgreSQL docs: https://www.postgresql.org/docs/
- Monitor application logs for detailed error messages

## 🎯 Next Steps

1. **Test the Connection** - Verify database connectivity
2. **Update Routes** - Modify API endpoints to use new database
3. **Test Functionality** - Verify all CRUD operations work
4. **Deploy** - Update production environment variables
5. **Monitor** - Set up logging and monitoring

## 📝 Environment Variables Reference

```env
# Required
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Optional
PORT=5000
NODE_ENV=production
JWT_SECRET=your-secret-key
CORS_ORIGIN=https://your-frontend-domain.com
```

Your Medsup Innovations database is now ready for production use with Neon PostgreSQL! 🎉