-- Medsup Innovations Seed Data
-- Comprehensive seed data for medical supplies management system

-- Clear existing data (in correct order to respect foreign keys)
DELETE FROM audit_log;
DELETE FROM purchase_order_items;
DELETE FROM purchase_orders;
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM inventory;
DELETE FROM product_suppliers;
DELETE FROM products;
DELETE FROM suppliers;
DELETE FROM customers;
DELETE FROM users;

-- Insert Users (for authentication and system tracking)
INSERT INTO users (id, email, password_hash, first_name, last_name, role, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@medsup.co.uk', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqQqQqQqQqQqQq', 'Sarah', 'Johnson', 'admin', true),
('550e8400-e29b-41d4-a716-446655440002', 'manager@medsup.co.uk', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqQqQqQqQqQqQq', 'Michael', 'Thompson', 'manager', true),
('550e8400-e29b-41d4-a716-446655440003', 'sales@medsup.co.uk', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqQqQqQqQqQqQq', 'Emma', 'Davis', 'sales', true),
('550e8400-e29b-41d4-a716-446655440004', 'inventory@medsup.co.uk', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqQqQqQqQqQqQq', 'James', 'Wilson', 'inventory', true),
('550e8400-e29b-41d4-a716-446655440005', 'viewer@medsup.co.uk', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqQqQqQqQqQqQq', 'Lisa', 'Brown', 'viewer', true);

-- Insert Suppliers
INSERT INTO suppliers (id, name, contact_person, email, phone, website, address, city, state_province, postal_code, country, payment_terms, credit_rating, is_active) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'MedTech Solutions Ltd', 'Dr. Robert Clarke', 'sales@medtechsolutions.co.uk', '+44 20 7946 0958', 'www.medtechsolutions.co.uk', '45 Harley Street', 'London', 'England', 'W1G 8QQ', 'United Kingdom', 30, 9, true),
('660e8400-e29b-41d4-a716-446655440002', 'Global Medical Supplies', 'Jennifer Martinez', 'orders@globalmedsupplies.com', '+44 161 496 0123', 'www.globalmedsupplies.com', '123 Industrial Estate', 'Manchester', 'England', 'M1 4ET', 'United Kingdom', 45, 8, true),
('660e8400-e29b-41d4-a716-446655440003', 'BioLab Equipment Co', 'Dr. Ahmed Hassan', 'procurement@biolabequip.co.uk', '+44 131 556 2345', 'www.biolabequip.co.uk', '78 Science Park Way', 'Edinburgh', 'Scotland', 'EH9 3JF', 'United Kingdom', 30, 9, true),
('660e8400-e29b-41d4-a716-446655440004', 'Pharma Direct UK', 'Catherine O''Brien', 'sales@pharmadirect.co.uk', '+44 29 2087 4321', 'www.pharmadirect.co.uk', '56 Cardiff Business Park', 'Cardiff', 'Wales', 'CF14 5GL', 'United Kingdom', 60, 7, true),
('660e8400-e29b-41d4-a716-446655440005', 'SafetyFirst Medical', 'Mark Thompson', 'info@safetyfirstmed.co.uk', '+44 121 496 7890', 'www.safetyfirstmed.co.uk', '234 Birmingham Road', 'Birmingham', 'England', 'B15 2TT', 'United Kingdom', 30, 8, true);

-- Insert Products (Medical Supplies)
INSERT INTO products (id, name, description, category, subcategory, sku, manufacturer, model_number, unit_price, cost_price, unit_of_measure, regulatory_approval, lot_tracking_required, expiry_tracking_required, temperature_controlled, storage_temperature_min, storage_temperature_max, storage_requirements, shelf_life_months, hazardous_material, reorder_point, reorder_quantity, lead_time_days, is_active, weight_kg, dimensions_cm, barcode) VALUES

-- Medical Devices
('770e8400-e29b-41d4-a716-446655440001', 'Digital Blood Pressure Monitor', 'Automatic digital blood pressure monitor with large LCD display and memory function', 'medical_devices', 'Monitoring Equipment', 'MED-BP-001', 'Omron Healthcare', 'HEM-7156T', 89.99, 65.00, 'each', 'CE, FDA', false, false, false, null, null, 'Store in dry place at room temperature', 60, false, 15, 50, 7, true, 0.8, '15x12x8', '1234567890123'),

('770e8400-e29b-41d4-a716-446655440002', 'Pulse Oximeter', 'Fingertip pulse oximeter with OLED display for SpO2 and pulse rate monitoring', 'medical_devices', 'Monitoring Equipment', 'MED-OX-002', 'Masimo', 'MightySat Rx', 245.00, 180.00, 'each', 'CE, FDA', false, false, false, null, null, 'Store at room temperature', 36, false, 20, 25, 14, true, 0.2, '8x5x3', '1234567890124'),

('770e8400-e29b-41d4-a716-446655440003', 'Digital Thermometer', 'Fast-reading digital thermometer with flexible tip and fever alarm', 'medical_devices', 'Diagnostic Tools', 'MED-TH-003', 'Braun', 'ThermoScan 7', 45.99, 32.00, 'each', 'CE, FDA', false, false, false, null, null, 'Store at room temperature', 24, false, 30, 100, 5, true, 0.1, '12x3x2', '1234567890125'),

-- Laboratory Equipment
('770e8400-e29b-41d4-a716-446655440004', 'Centrifuge Machine', 'High-speed laboratory centrifuge with digital display and safety lock', 'laboratory_equipment', 'Processing Equipment', 'LAB-CF-004', 'Eppendorf', 'Centrifuge 5424R', 2850.00, 2100.00, 'each', 'CE', false, false, false, null, null, 'Clean, dry environment', 120, false, 2, 5, 21, true, 25.5, '35x40x30', '1234567890126'),

('770e8400-e29b-41d4-a716-446655440005', 'Microscope', 'Binocular compound microscope with LED illumination and 4x objectives', 'laboratory_equipment', 'Optical Equipment', 'LAB-MC-005', 'Olympus', 'CX23', 1250.00, 920.00, 'each', 'CE', false, false, false, null, null, 'Dust-free environment', 60, false, 3, 8, 14, true, 8.2, '25x35x40', '1234567890127'),

-- Consumables
('770e8400-e29b-41d4-a716-446655440006', 'Disposable Syringes 10ml', 'Sterile disposable syringes with Luer lock, 10ml capacity', 'consumables', 'Injection Equipment', 'CON-SY-006', 'BD Medical', 'BD-10ML-LL', 0.85, 0.62, 'each', 'CE, FDA', true, true, false, null, null, 'Store in original packaging', 60, false, 500, 2000, 3, true, 0.015, '15x2x2', '1234567890128'),

('770e8400-e29b-41d4-a716-446655440007', 'Nitrile Examination Gloves', 'Powder-free nitrile examination gloves, medium size, blue', 'consumables', 'Personal Protection', 'CON-GL-007', 'Ansell', 'TouchNTuff 92-600', 0.12, 0.08, 'each', 'CE, FDA', true, false, false, null, null, 'Store in cool, dry place', 36, false, 1000, 5000, 2, true, 0.005, '24x12x1', '1234567890129'),

('770e8400-e29b-41d4-a716-446655440008', 'Surgical Masks', 'Type IIR surgical masks with ear loops, fluid resistant', 'consumables', 'Personal Protection', 'CON-SM-008', '3M Health Care', '1818', 0.25, 0.18, 'each', 'CE, FDA', true, false, false, null, null, 'Store in dry conditions', 36, false, 2000, 10000, 1, true, 0.003, '17.5x9.5x0.1', '1234567890130'),

-- Pharmaceuticals
('770e8400-e29b-41d4-a716-446655440009', 'Paracetamol 500mg Tablets', 'Paracetamol tablets for pain relief and fever reduction', 'pharmaceuticals', 'Analgesics', 'PHA-PA-009', 'GSK', 'Panadol', 8.99, 6.50, 'pack of 100', 'MHRA', true, true, true, 15.0, 25.0, 'Store below 25°C in dry place', 36, false, 50, 200, 7, true, 0.1, '10x6x3', '1234567890131'),

('770e8400-e29b-41d4-a716-446655440010', 'Ibuprofen 400mg Tablets', 'Anti-inflammatory pain relief tablets', 'pharmaceuticals', 'Anti-inflammatories', 'PHA-IB-010', 'Reckitt Benckiser', 'Nurofen', 12.49, 9.20, 'pack of 84', 'MHRA', true, true, true, 15.0, 25.0, 'Store below 25°C', 24, false, 40, 150, 7, true, 0.08, '9x5x3', '1234567890132'),

-- Safety Equipment
('770e8400-e29b-41d4-a716-446655440011', 'Safety Goggles', 'Anti-fog safety goggles with adjustable strap', 'safety_equipment', 'Eye Protection', 'SAF-SG-011', 'Uvex', 'Ultrasonic', 15.99, 11.50, 'each', 'CE', false, false, false, null, null, 'Store away from direct sunlight', 60, false, 25, 100, 5, true, 0.15, '18x8x6', '1234567890133'),

('770e8400-e29b-41d4-a716-446655440012', 'First Aid Kit', 'Comprehensive workplace first aid kit with HSE approved contents', 'safety_equipment', 'Emergency Equipment', 'SAF-FK-012', 'Reliance Medical', 'Motokit', 45.00, 32.00, 'each', 'HSE', false, true, false, null, null, 'Store in cool, dry place', 60, false, 10, 25, 7, true, 1.2, '30x20x10', '1234567890134'),

-- Diagnostic Tools
('770e8400-e29b-41d4-a716-446655440013', 'Stethoscope', 'Dual-head stethoscope with tunable diaphragm', 'diagnostic_tools', 'Examination Tools', 'DIA-ST-013', '3M Littmann', 'Classic III', 185.00, 135.00, 'each', 'CE', false, false, false, null, null, 'Clean after each use', 120, false, 8, 20, 10, true, 0.18, '70x25x5', '1234567890135'),

('770e8400-e29b-41d4-a716-446655440014', 'Otoscope', 'LED otoscope with magnifying lens and specula set', 'diagnostic_tools', 'Examination Tools', 'DIA-OT-014', 'Welch Allyn', 'MacroView', 425.00, 310.00, 'each', 'CE, FDA', false, false, false, null, null, 'Store in protective case', 60, false, 5, 15, 14, true, 0.3, '20x8x8', '1234567890136'),

('770e8400-e29b-41d4-a716-446655440015', 'Blood Glucose Test Strips', 'Glucose test strips for blood glucose monitoring', 'diagnostic_tools', 'Testing Supplies', 'DIA-BG-015', 'Abbott', 'FreeStyle Lite', 35.99, 26.00, 'pack of 50', 'CE, FDA', true, true, true, 2.0, 30.0, 'Store in original vial, keep dry', 18, false, 100, 500, 3, true, 0.05, '8x5x2', '1234567890137');

-- Insert Product-Supplier relationships
INSERT INTO product_suppliers (product_id, supplier_id, supplier_sku, supplier_price, minimum_order_quantity, lead_time_days, is_preferred) VALUES
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'MTS-BP-001', 65.00, 10, 7, true),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', 'MTS-OX-002', 180.00, 5, 14, true),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', 'GMS-TH-003', 32.00, 25, 5, true),
('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440003', 'BLE-CF-004', 2100.00, 1, 21, true),
('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440003', 'BLE-MC-005', 920.00, 1, 14, true),
('770e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440002', 'GMS-SY-006', 0.62, 500, 3, true),
('770e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440005', 'SFM-GL-007', 0.08, 1000, 2, true),
('770e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440005', 'SFM-SM-008', 0.18, 2000, 1, true),
('770e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440004', 'PD-PA-009', 6.50, 50, 7, true),
('770e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440004', 'PD-IB-010', 9.20, 40, 7, true),
('770e8400-e29b-41d4-a716-446655440011', '660e8400-e29b-41d4-a716-446655440005', 'SFM-SG-011', 11.50, 25, 5, true),
('770e8400-e29b-41d4-a716-446655440012', '660e8400-e29b-41d4-a716-446655440005', 'SFM-FK-012', 32.00, 10, 7, true),
('770e8400-e29b-41d4-a716-446655440013', '660e8400-e29b-41d4-a716-446655440001', 'MTS-ST-013', 135.00, 5, 10, true),
('770e8400-e29b-41d4-a716-446655440014', '660e8400-e29b-41d4-a716-446655440001', 'MTS-OT-014', 310.00, 2, 14, true),
('770e8400-e29b-41d4-a716-446655440015', '660e8400-e29b-41d4-a716-446655440004', 'PD-BG-015', 26.00, 50, 3, true);

-- Insert Customers
INSERT INTO customers (id, name, type, contact_person, email, phone, billing_address, shipping_address, city, state_province, postal_code, country, tax_number, payment_terms, credit_limit, discount_percentage, is_active, preferred_delivery_method) VALUES
('880e8400-e29b-41d4-a716-446655440001', 'Royal London Hospital', 'hospital', 'Dr. Patricia Williams', 'procurement@rlh.nhs.uk', '+44 20 7377 7000', 'Whitechapel Road', 'Whitechapel Road', 'London', 'England', 'E1 1BB', 'United Kingdom', 'GB123456789', 30, 50000.00, 5.0, true, 'Next Day Delivery'),

('880e8400-e29b-41d4-a716-446655440002', 'Manchester Medical Centre', 'clinic', 'Dr. James Anderson', 'admin@manchestermedical.co.uk', '+44 161 276 1234', '123 Oxford Road', '123 Oxford Road', 'Manchester', 'England', 'M13 9PL', 'United Kingdom', 'GB987654321', 30, 25000.00, 3.0, true, 'Standard Delivery'),

('880e8400-e29b-41d4-a716-446655440003', 'BioResearch Labs Ltd', 'laboratory', 'Prof. Sarah Mitchell', 'purchasing@bioresearch.co.uk', '+44 131 650 1000', '78 George Square', '78 George Square', 'Edinburgh', 'Scotland', 'EH8 9JZ', 'United Kingdom', 'GB456789123', 45, 75000.00, 7.5, true, 'Express Delivery'),

('880e8400-e29b-41d4-a716-446655440004', 'Cardiff University Research', 'research', 'Dr. Michael Roberts', 'procurement@cardiff.ac.uk', '+44 29 2087 4816', 'Park Place', 'Park Place', 'Cardiff', 'Wales', 'CF10 3AT', 'United Kingdom', 'GB789123456', 60, 40000.00, 10.0, true, 'Standard Delivery'),

('880e8400-e29b-41d4-a716-446655440005', 'Boots Pharmacy Chain', 'pharmacy', 'Lisa Thompson', 'supply.chain@boots.co.uk', '+44 115 950 6111', 'Thane Road', 'Thane Road', 'Nottingham', 'England', 'NG90 1BS', 'United Kingdom', 'GB321654987', 30, 100000.00, 12.0, true, 'Bulk Delivery'),

('880e8400-e29b-41d4-a716-446655440006', 'NHS Greater Glasgow', 'government', 'Dr. Robert MacLeod', 'procurement@ggc.scot.nhs.uk', '+44 141 201 4444', '1 Smithhills Street', '1 Smithhills Street', 'Glasgow', 'Scotland', 'G31 2ER', 'United Kingdom', 'GB654987321', 45, 200000.00, 8.0, true, 'Scheduled Delivery'),

('880e8400-e29b-41d4-a716-446655440007', 'Birmingham Children''s Hospital', 'hospital', 'Dr. Angela Foster', 'supplies@bch.nhs.uk', '+44 121 333 9999', 'Steelhouse Lane', 'Steelhouse Lane', 'Birmingham', 'England', 'B4 6NH', 'United Kingdom', 'GB147258369', 30, 60000.00, 4.0, true, 'Next Day Delivery'),

('880e8400-e29b-41d4-a716-446655440008', 'Oxford Diagnostic Centre', 'clinic', 'Dr. Thomas Clarke', 'admin@oxforddiagnostic.co.uk', '+44 1865 123456', '45 Headington Road', '45 Headington Road', 'Oxford', 'England', 'OX3 9DU', 'United Kingdom', 'GB963852741', 30, 30000.00, 2.5, true, 'Express Delivery');

-- Insert Inventory
INSERT INTO inventory (id, product_id, location, current_stock, reserved_stock, batch_number, lot_number, manufacture_date, expiry_date, quality_status, unit_cost, supplier_id, received_date, last_counted_date, last_counted_by) VALUES
-- Medical Devices
('990e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'Main Warehouse', 45, 5, 'BP2024001', 'LOT240101', '2024-01-15', '2029-01-15', 'good', 65.00, '660e8400-e29b-41d4-a716-446655440001', '2024-02-01', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

('990e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', 'Main Warehouse', 18, 2, 'OX2024001', 'LOT240102', '2024-02-10', '2027-02-10', 'good', 180.00, '660e8400-e29b-41d4-a716-446655440001', '2024-02-15', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

('990e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', 'Main Warehouse', 85, 10, 'TH2024001', 'LOT240103', '2024-03-01', '2026-03-01', 'good', 32.00, '660e8400-e29b-41d4-a716-446655440002', '2024-03-10', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

-- Laboratory Equipment
('990e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440004', 'Main Warehouse', 3, 1, 'CF2024001', 'LOT240104', '2024-01-20', '2034-01-20', 'good', 2100.00, '660e8400-e29b-41d4-a716-446655440003', '2024-02-05', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

('990e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440005', 'Main Warehouse', 6, 1, 'MC2024001', 'LOT240105', '2024-02-15', '2029-02-15', 'good', 920.00, '660e8400-e29b-41d4-a716-446655440003', '2024-03-01', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

-- Consumables
('990e8400-e29b-41d4-a716-446655440006', '770e8400-e29b-41d4-a716-446655440006', 'Main Warehouse', 1850, 150, 'SY2024001', 'LOT240106', '2024-03-10', '2029-03-10', 'good', 0.62, '660e8400-e29b-41d4-a716-446655440002', '2024-03-15', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

('990e8400-e29b-41d4-a716-446655440007', '770e8400-e29b-41d4-a716-446655440007', 'Main Warehouse', 4200, 300, 'GL2024001', 'LOT240107', '2024-02-20', '2027-02-20', 'good', 0.08, '660e8400-e29b-41d4-a716-446655440005', '2024-03-01', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

('990e8400-e29b-41d4-a716-446655440008', '770e8400-e29b-41d4-a716-446655440008', 'Main Warehouse', 8500, 500, 'SM2024001', 'LOT240108', '2024-01-25', '2027-01-25', 'good', 0.18, '660e8400-e29b-41d4-a716-446655440005', '2024-02-10', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

-- Pharmaceuticals
('990e8400-e29b-41d4-a716-446655440009', '770e8400-e29b-41d4-a716-446655440009', 'Temperature Controlled', 180, 20, 'PA2024001', 'LOT240109', '2024-01-10', '2027-01-10', 'good', 6.50, '660e8400-e29b-41d4-a716-446655440004', '2024-01-20', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

('990e8400-e29b-41d4-a716-446655440010', '770e8400-e29b-41d4-a716-446655440010', 'Temperature Controlled', 125, 15, 'IB2024001', 'LOT240110', '2024-02-05', '2026-02-05', 'good', 9.20, '660e8400-e29b-41d4-a716-446655440004', '2024-02-15', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

-- Safety Equipment
('990e8400-e29b-41d4-a716-446655440011', '770e8400-e29b-41d4-a716-446655440011', 'Main Warehouse', 75, 10, 'SG2024001', 'LOT240111', '2024-03-01', '2029-03-01', 'good', 11.50, '660e8400-e29b-41d4-a716-446655440005', '2024-03-10', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

('990e8400-e29b-41d4-a716-446655440012', '770e8400-e29b-41d4-a716-446655440012', 'Main Warehouse', 22, 3, 'FK2024001', 'LOT240112', '2024-02-10', '2029-02-10', 'good', 32.00, '660e8400-e29b-41d4-a716-446655440005', '2024-02-20', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

-- Diagnostic Tools
('990e8400-e29b-41d4-a716-446655440013', '770e8400-e29b-41d4-a716-446655440013', 'Main Warehouse', 12, 2, 'ST2024001', 'LOT240113', '2024-01-30', '2034-01-30', 'good', 135.00, '660e8400-e29b-41d4-a716-446655440001', '2024-02-10', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

('990e8400-e29b-41d4-a716-446655440014', '770e8400-e29b-41d4-a716-446655440014', 'Main Warehouse', 8, 1, 'OT2024001', 'LOT240114', '2024-02-25', '2029-02-25', 'good', 310.00, '660e8400-e29b-41d4-a716-446655440001', '2024-03-05', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004'),

('990e8400-e29b-41d4-a716-446655440015', '770e8400-e29b-41d4-a716-446655440015', 'Temperature Controlled', 450, 50, 'BG2024001', 'LOT240115', '2024-03-15', '2025-09-15', 'good', 26.00, '660e8400-e29b-41d4-a716-446655440004', '2024-03-20', '2024-09-15', '550e8400-e29b-41d4-a716-446655440004');

-- Insert Sample Orders
INSERT INTO orders (id, order_number, customer_id, order_date, required_date, status, payment_status, subtotal, tax_amount, shipping_cost, total_amount, shipping_address, shipping_method, notes, created_by, assigned_to) VALUES
('aa0e8400-e29b-41d4-a716-446655440001', 'ORD-2024-001', '880e8400-e29b-41d4-a716-446655440001', '2024-09-15', '2024-09-20', 'confirmed', 'paid', 2850.00, 570.00, 25.00, 3445.00, 'Whitechapel Road, London E1 1BB', 'Next Day Delivery', 'Urgent order for ICU equipment', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003'),

('aa0e8400-e29b-41d4-a716-446655440002', 'ORD-2024-002', '880e8400-e29b-41d4-a716-446655440002', '2024-09-16', '2024-09-25', 'processing', 'pending', 1250.00, 250.00, 15.00, 1515.00, '123 Oxford Road, Manchester M13 9PL', 'Standard Delivery', 'Monthly supply order', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003'),

('aa0e8400-e29b-41d4-a716-446655440003', 'ORD-2024-003', '880e8400-e29b-41d4-a716-446655440003', '2024-09-17', '2024-09-30', 'pending', 'pending', 5200.00, 1040.00, 50.00, 6290.00, '78 George Square, Edinburgh EH8 9JZ', 'Express Delivery', 'Research equipment for new project', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003'),

('aa0e8400-e29b-41d4-a716-446655440004', 'ORD-2024-004', '880e8400-e29b-41d4-a716-446655440005', '2024-09-18', '2024-09-22', 'shipped', 'paid', 850.00, 170.00, 20.00, 1040.00, 'Thane Road, Nottingham NG90 1BS', 'Bulk Delivery', 'Pharmacy chain restocking', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003');

-- Insert Order Items
INSERT INTO order_items (id, order_id, product_id, quantity, unit_price, discount_percentage, quantity_shipped, notes) VALUES
-- Order 1 items (Royal London Hospital)
('bb0e8400-e29b-41d4-a716-446655440001', 'aa0e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440004', 1, 2850.00, 5.0, 1, 'Centrifuge for emergency lab'),

-- Order 2 items (Manchester Medical Centre)
('bb0e8400-e29b-41d4-a716-446655440002', 'aa0e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440005', 1, 1250.00, 3.0, 0, 'Microscope for clinic'),

-- Order 3 items (BioResearch Labs)
('bb0e8400-e29b-41d4-a716-446655440003', 'aa0e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440004', 2, 2850.00, 7.5, 0, 'Two centrifuges for research'),

-- Order 4 items (Boots Pharmacy)
('bb0e8400-e29b-41d4-a716-446655440004', 'aa0e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440009', 50, 8.99, 12.0, 50, 'Paracetamol bulk order'),
('bb0e8400-e29b-41d4-a716-446655440005', 'aa0e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440010', 30, 12.49, 12.0, 30, 'Ibuprofen bulk order');