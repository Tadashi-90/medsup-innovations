const database = require('../database/database');
const db = database.getDb();

// Sample medical supplies and laboratory consumables data
const sampleProducts = [
  {
    name: 'Disposable Nitrile Gloves',
    description: 'Powder-free, latex-free examination gloves',
    category: 'Personal Protective Equipment',
    subcategory: 'Gloves',
    sku: 'PPE-GLV-001',
    manufacturer: 'MedSafe Ltd',
    unit_price: 12.99,
    unit_of_measure: 'Box of 100',
    regulatory_info: 'CE Marked, FDA Approved',
    storage_requirements: 'Store in cool, dry place',
    shelf_life_months: 60
  },
  {
    name: 'Sterile Petri Dishes',
    description: '90mm sterile polystyrene petri dishes',
    category: 'Laboratory Consumables',
    subcategory: 'Culture Dishes',
    sku: 'LAB-PET-001',
    manufacturer: 'LabTech Solutions',
    unit_price: 45.50,
    unit_of_measure: 'Pack of 20',
    regulatory_info: 'Sterile, Gamma Irradiated',
    storage_requirements: 'Store at room temperature',
    shelf_life_months: 36
  },
  {
    name: 'Digital Thermometer',
    description: 'Non-contact infrared thermometer',
    category: 'Medical Devices',
    subcategory: 'Diagnostic Equipment',
    sku: 'MED-THM-001',
    manufacturer: 'TempCheck Pro',
    unit_price: 89.99,
    unit_of_measure: 'Each',
    regulatory_info: 'CE Marked, Medical Device Class IIa',
    storage_requirements: 'Store at 10-40°C',
    shelf_life_months: 120
  },
  {
    name: 'Micropipette Tips',
    description: '1000μL sterile pipette tips',
    category: 'Laboratory Consumables',
    subcategory: 'Pipetting',
    sku: 'LAB-TIP-001',
    manufacturer: 'PrecisionLab',
    unit_price: 28.75,
    unit_of_measure: 'Box of 1000',
    regulatory_info: 'DNase/RNase Free, Sterile',
    storage_requirements: 'Store in original packaging',
    shelf_life_months: 60
  },
  {
    name: 'Surgical Face Masks',
    description: 'Type IIR surgical masks with ear loops',
    category: 'Personal Protective Equipment',
    subcategory: 'Face Protection',
    sku: 'PPE-MSK-001',
    manufacturer: 'SafeGuard Medical',
    unit_price: 15.99,
    unit_of_measure: 'Box of 50',
    regulatory_info: 'CE Marked, EN 14683:2019',
    storage_requirements: 'Store in dry conditions',
    shelf_life_months: 60
  },
  {
    name: 'Blood Collection Tubes',
    description: 'EDTA tubes for blood collection',
    category: 'Laboratory Consumables',
    subcategory: 'Sample Collection',
    sku: 'LAB-BCT-001',
    manufacturer: 'BloodTech Systems',
    unit_price: 32.50,
    unit_of_measure: 'Pack of 100',
    regulatory_info: 'CE Marked, ISO 13485',
    storage_requirements: 'Store at 4-25°C',
    shelf_life_months: 24
  }
];

const sampleCustomers = [
  {
    name: 'Royal London Hospital',
    type: 'hospital',
    contact_person: 'Dr. Sarah Johnson',
    email: 'procurement@rlh.nhs.uk',
    phone: '+44 20 7377 7000',
    address: 'Whitechapel Road',
    city: 'London',
    postal_code: 'E1 1BB',
    country: 'UK',
    credit_limit: 50000.00
  },
  {
    name: 'Cambridge Research Labs',
    type: 'laboratory',
    contact_person: 'Prof. Michael Chen',
    email: 'supplies@cambridgeresearch.ac.uk',
    phone: '+44 1223 334455',
    address: 'Science Park Road',
    city: 'Cambridge',
    postal_code: 'CB4 0GA',
    country: 'UK',
    credit_limit: 25000.00
  },
  {
    name: 'City Medical Clinic',
    type: 'clinic',
    contact_person: 'Dr. Emma Williams',
    email: 'admin@citymedical.co.uk',
    phone: '+44 161 234 5678',
    address: 'High Street',
    city: 'Manchester',
    postal_code: 'M1 2AB',
    country: 'UK',
    credit_limit: 10000.00
  }
];

const sampleSuppliers = [
  {
    name: 'MedSafe Ltd',
    contact_person: 'John Smith',
    email: 'sales@medsafe.co.uk',
    phone: '+44 20 1234 5678',
    address: 'Industrial Estate',
    city: 'Birmingham',
    postal_code: 'B12 3CD',
    country: 'UK'
  },
  {
    name: 'LabTech Solutions',
    contact_person: 'Lisa Brown',
    email: 'orders@labtech.co.uk',
    phone: '+44 113 987 6543',
    address: 'Technology Park',
    city: 'Leeds',
    postal_code: 'LS2 4EF',
    country: 'UK'
  }
];

function insertSampleData() {
  console.log('🌱 Inserting sample data...');

  // Insert products
  const productStmt = db.prepare(`
    INSERT INTO products (name, description, category, subcategory, sku, manufacturer, unit_price, unit_of_measure, regulatory_info, storage_requirements, shelf_life_months)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  sampleProducts.forEach(product => {
    productStmt.run([
      product.name, product.description, product.category, product.subcategory,
      product.sku, product.manufacturer, product.unit_price, product.unit_of_measure,
      product.regulatory_info, product.storage_requirements, product.shelf_life_months
    ]);
  });
  productStmt.finalize();

  // Insert customers
  const customerStmt = db.prepare(`
    INSERT INTO customers (name, type, contact_person, email, phone, address, city, postal_code, country, credit_limit)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  sampleCustomers.forEach(customer => {
    customerStmt.run([
      customer.name, customer.type, customer.contact_person, customer.email,
      customer.phone, customer.address, customer.city, customer.postal_code,
      customer.country, customer.credit_limit
    ]);
  });
  customerStmt.finalize();

  // Insert suppliers
  const supplierStmt = db.prepare(`
    INSERT INTO suppliers (name, contact_person, email, phone, address, city, postal_code, country)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  sampleSuppliers.forEach(supplier => {
    supplierStmt.run([
      supplier.name, supplier.contact_person, supplier.email, supplier.phone,
      supplier.address, supplier.city, supplier.postal_code, supplier.country
    ]);
  });
  supplierStmt.finalize();

  // Insert sample inventory
  const inventoryStmt = db.prepare(`
    INSERT INTO inventory (product_id, current_stock, minimum_stock, maximum_stock, location, batch_number, expiry_date, supplier_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const inventoryData = [
    [1, 150, 50, 500, 'Warehouse A-1', 'GLV2024001', '2026-12-31', 1],
    [2, 75, 20, 200, 'Warehouse B-2', 'PET2024001', '2027-06-30', 2],
    [3, 25, 10, 100, 'Warehouse A-3', 'THM2024001', '2034-01-31', 1],
    [4, 200, 100, 1000, 'Warehouse B-1', 'TIP2024001', '2029-12-31', 2],
    [5, 80, 30, 300, 'Warehouse A-2', 'MSK2024001', '2029-12-31', 1],
    [6, 45, 25, 150, 'Warehouse B-3', 'BCT2024001', '2026-03-31', 2]
  ];

  inventoryData.forEach(item => {
    inventoryStmt.run(item);
  });
  inventoryStmt.finalize();

  console.log('✅ Sample data inserted successfully!');
  console.log('📊 Database ready for demo');
}

// Run the initialization
setTimeout(() => {
  insertSampleData();
  setTimeout(() => {
    database.close();
  }, 1000);
}, 1000);