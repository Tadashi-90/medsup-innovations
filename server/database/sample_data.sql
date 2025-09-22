-- Sample data for Medsup Innovations PostgreSQL Database
-- This file contains realistic sample data for testing and development

-- Insert sample users
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('admin@medsup.com', '$2b$10$example_hash_admin', 'John', 'Smith', 'admin'),
('manager@medsup.com', '$2b$10$example_hash_manager', 'Sarah', 'Johnson', 'manager'),
('sales@medsup.com', '$2b$10$example_hash_sales', 'Mike', 'Davis', 'sales'),
('inventory@medsup.com', '$2b$10$example_hash_inventory', 'Emma', 'Wilson', 'inventory');

-- Insert sample suppliers
INSERT INTO suppliers (name, contact_person, email, phone, address, city, country, is_active) VALUES
('MedTech Solutions Ltd', 'David Brown', 'david@medtech.co.uk', '+44 20 7123 4567', '123 Medical Street', 'London', 'United Kingdom', true),
('Global Medical Supplies', 'Lisa Chen', 'lisa@globalmed.com', '+44 161 234 5678', '456 Healthcare Ave', 'Manchester', 'United Kingdom', true),
('BioLab Equipment Co', 'Robert Taylor', 'robert@biolab.co.uk', '+44 121 345 6789', '789 Laboratory Road', 'Birmingham', 'United Kingdom', true),
('Surgical Instruments UK', 'Amanda White', 'amanda@surgical.co.uk', '+44 113 456 7890', '321 Surgery Lane', 'Leeds', 'United Kingdom', true);

-- Insert sample products
INSERT INTO products (name, description, category, sku, manufacturer, unit_price, cost_price, unit_of_measure, regulatory_approval, reorder_point, reorder_quantity) VALUES
('Digital Blood Pressure Monitor', 'Automatic digital blood pressure monitor with large LCD display', 'medical_devices', 'BP-001', 'Omron Healthcare', 89.99, 65.00, 'each', 'CE Marked', 10, 25),
('Disposable Syringes 10ml', 'Sterile disposable syringes with Luer lock', 'consumables', 'SYR-10ML', 'BD Medical', 0.45, 0.28, 'each', 'CE Marked', 500, 1000),
('Surgical Gloves Nitrile (Box of 100)', 'Powder-free nitrile examination gloves', 'safety_equipment', 'GLV-NIT-100', 'Ansell', 12.99, 8.50, 'box', 'CE Marked', 50, 100),
('Stethoscope Cardiology', 'High-quality cardiology stethoscope', 'diagnostic_tools', 'STETH-001', 'Littmann', 189.99, 135.00, 'each', 'CE Marked', 5, 15),
('Thermometer Digital', 'Fast-reading digital thermometer', 'diagnostic_tools', 'THERM-001', 'Braun', 24.99, 16.00, 'each', 'CE Marked', 20, 50),
('Bandages Elastic 10cm', 'Elastic bandages for wound care', 'consumables', 'BAND-10CM', 'Smith & Nephew', 3.99, 2.50, 'each', 'CE Marked', 100, 200),
('Wheelchair Standard', 'Standard manual wheelchair', 'medical_devices', 'WC-STD-001', 'Drive Medical', 299.99, 220.00, 'each', 'CE Marked', 3, 10),
('Oxygen Mask Adult', 'Adult oxygen mask with tubing', 'consumables', 'OXY-MASK-A', 'Intersurgical', 8.99, 5.50, 'each', 'CE Marked', 25, 50);

-- Insert sample customers
INSERT INTO customers (name, type, contact_person, email, phone, city, country, payment_terms, is_active) VALUES
('Royal London Hospital', 'hospital', 'Dr. James Wilson', 'procurement@rlh.nhs.uk', '+44 20 7377 7000', 'London', 'United Kingdom', 30, true),
('Manchester Medical Centre', 'clinic', 'Nurse Mary Thompson', 'orders@manchestermed.co.uk', '+44 161 276 1234', 'Manchester', 'United Kingdom', 30, true),
('Birmingham Research Lab', 'laboratory', 'Prof. Alan Roberts', 'purchasing@birmlab.ac.uk', '+44 121 414 3344', 'Birmingham', 'United Kingdom', 45, true),
('Leeds Community Pharmacy', 'pharmacy', 'Pharmacist Susan Green', 'orders@leedspharm.co.uk', '+44 113 243 1234', 'Leeds', 'United Kingdom', 15, true),
('NHS Trust Yorkshire', 'government', 'Procurement Manager Tom Brown', 'procurement@yorkshire.nhs.uk', '+44 114 271 7000', 'Sheffield', 'United Kingdom', 60, true);

-- Link products with suppliers
INSERT INTO product_suppliers (product_id, supplier_id, supplier_sku, supplier_price, minimum_order_quantity, is_preferred) VALUES
((SELECT id FROM products WHERE sku = 'BP-001'), (SELECT id FROM suppliers WHERE name = 'MedTech Solutions Ltd'), 'MT-BP001', 65.00, 5, true),
((SELECT id FROM products WHERE sku = 'SYR-10ML'), (SELECT id FROM suppliers WHERE name = 'Global Medical Supplies'), 'GMS-SYR10', 0.28, 100, true),
((SELECT id FROM products WHERE sku = 'GLV-NIT-100'), (SELECT id FROM suppliers WHERE name = 'Global Medical Supplies'), 'GMS-GLV100', 8.50, 10, true),
((SELECT id FROM products WHERE sku = 'STETH-001'), (SELECT id FROM suppliers WHERE name = 'MedTech Solutions Ltd'), 'MT-STETH01', 135.00, 2, true),
((SELECT id FROM products WHERE sku = 'THERM-001'), (SELECT id FROM suppliers WHERE name = 'MedTech Solutions Ltd'), 'MT-THERM01', 16.00, 10, true),
((SELECT id FROM products WHERE sku = 'BAND-10CM'), (SELECT id FROM suppliers WHERE name = 'Surgical Instruments UK'), 'SI-BAND10', 2.50, 50, true),
((SELECT id FROM products WHERE sku = 'WC-STD-001'), (SELECT id FROM suppliers WHERE name = 'MedTech Solutions Ltd'), 'MT-WC001', 220.00, 1, true),
((SELECT id FROM products WHERE sku = 'OXY-MASK-A'), (SELECT id FROM suppliers WHERE name = 'Global Medical Supplies'), 'GMS-OXY01', 5.50, 25, true);

-- Insert sample inventory
INSERT INTO inventory (product_id, current_stock, location, batch_number, unit_cost, supplier_id) VALUES
((SELECT id FROM products WHERE sku = 'BP-001'), 15, 'Main Warehouse', 'BP2024001', 65.00, (SELECT id FROM suppliers WHERE name = 'MedTech Solutions Ltd')),
((SELECT id FROM products WHERE sku = 'SYR-10ML'), 2500, 'Main Warehouse', 'SYR2024001', 0.28, (SELECT id FROM suppliers WHERE name = 'Global Medical Supplies')),
((SELECT id FROM products WHERE sku = 'GLV-NIT-100'), 75, 'Main Warehouse', 'GLV2024001', 8.50, (SELECT id FROM suppliers WHERE name = 'Global Medical Supplies')),
((SELECT id FROM products WHERE sku = 'STETH-001'), 8, 'Main Warehouse', 'ST2024001', 135.00, (SELECT id FROM suppliers WHERE name = 'MedTech Solutions Ltd')),
((SELECT id FROM products WHERE sku = 'THERM-001'), 35, 'Main Warehouse', 'TH2024001', 16.00, (SELECT id FROM suppliers WHERE name = 'MedTech Solutions Ltd')),
((SELECT id FROM products WHERE sku = 'BAND-10CM'), 150, 'Main Warehouse', 'BD2024001', 2.50, (SELECT id FROM suppliers WHERE name = 'Surgical Instruments UK')),
((SELECT id FROM products WHERE sku = 'WC-STD-001'), 5, 'Main Warehouse', 'WC2024001', 220.00, (SELECT id FROM suppliers WHERE name = 'MedTech Solutions Ltd')),
((SELECT id FROM products WHERE sku = 'OXY-MASK-A'), 40, 'Main Warehouse', 'OX2024001', 5.50, (SELECT id FROM suppliers WHERE name = 'Global Medical Supplies'));

-- Insert sample orders
INSERT INTO orders (order_number, customer_id, order_date, status, subtotal, tax_amount, total_amount, created_by) VALUES
('ORD-2024-001', (SELECT id FROM customers WHERE name = 'Royal London Hospital'), '2024-01-15', 'delivered', 450.00, 90.00, 540.00, (SELECT id FROM users WHERE email = 'sales@medsup.com')),
('ORD-2024-002', (SELECT id FROM customers WHERE name = 'Manchester Medical Centre'), '2024-01-18', 'shipped', 125.50, 25.10, 150.60, (SELECT id FROM users WHERE email = 'sales@medsup.com')),
('ORD-2024-003', (SELECT id FROM customers WHERE name = 'Birmingham Research Lab'), '2024-01-20', 'processing', 89.99, 18.00, 107.99, (SELECT id FROM users WHERE email = 'sales@medsup.com'));

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
((SELECT id FROM orders WHERE order_number = 'ORD-2024-001'), (SELECT id FROM products WHERE sku = 'SYR-10ML'), 1000, 0.45),
((SELECT id FROM orders WHERE order_number = 'ORD-2024-002'), (SELECT id FROM products WHERE sku = 'GLV-NIT-100'), 5, 12.99),
((SELECT id FROM orders WHERE order_number = 'ORD-2024-002'), (SELECT id FROM products WHERE sku = 'THERM-001'), 2, 24.99),
((SELECT id FROM orders WHERE order_number = 'ORD-2024-003'), (SELECT id FROM products WHERE sku = 'BP-001'), 1, 89.99);

-- Insert sample purchase orders
INSERT INTO purchase_orders (po_number, supplier_id, order_date, status, subtotal, tax_amount, total_amount, created_by) VALUES
('PO-2024-001', (SELECT id FROM suppliers WHERE name = 'Global Medical Supplies'), '2024-01-10', 'received', 1000.00, 200.00, 1200.00, (SELECT id FROM users WHERE email = 'inventory@medsup.com')),
('PO-2024-002', (SELECT id FROM suppliers WHERE name = 'MedTech Solutions Ltd'), '2024-01-12', 'pending', 2500.00, 500.00, 3000.00, (SELECT id FROM users WHERE email = 'inventory@medsup.com'));

-- Insert sample purchase order items
INSERT INTO purchase_order_items (purchase_order_id, product_id, quantity_ordered, quantity_received, unit_cost) VALUES
((SELECT id FROM purchase_orders WHERE po_number = 'PO-2024-001'), (SELECT id FROM products WHERE sku = 'SYR-10ML'), 2000, 2000, 0.28),
((SELECT id FROM purchase_orders WHERE po_number = 'PO-2024-001'), (SELECT id FROM products WHERE sku = 'GLV-NIT-100'), 50, 50, 8.50),
((SELECT id FROM purchase_orders WHERE po_number = 'PO-2024-002'), (SELECT id FROM products WHERE sku = 'BP-001'), 20, 0, 65.00),
((SELECT id FROM purchase_orders WHERE po_number = 'PO-2024-002'), (SELECT id FROM products WHERE sku = 'STETH-001'), 10, 0, 135.00);