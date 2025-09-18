const express = require('express');
const router = express.Router();
const database = require('../database/database');
const db = database.getDb();

// GET /api/customers - Get all customers
router.get('/', (req, res) => {
  const { type, status = 'active', search } = req.query;
  
  let query = 'SELECT * FROM customers WHERE status = ?';
  const params = [status];

  if (type) {
    query += ' AND type = ?';
    params.push(type);
  }

  if (search) {
    query += ' AND (name LIKE ? OR contact_person LIKE ? OR email LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  query += ' ORDER BY name';

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error fetching customers:', err);
      return res.status(500).json({ error: 'Failed to fetch customers' });
    }
    res.json(rows);
  });
});

// GET /api/customers/:id - Get single customer
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM customers WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching customer:', err);
      return res.status(500).json({ error: 'Failed to fetch customer' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(row);
  });
});

// POST /api/customers - Create new customer
router.post('/', (req, res) => {
  const {
    name, type, contact_person, email, phone, address, city, postal_code,
    country, tax_number, payment_terms, credit_limit
  } = req.body;

  if (!name || !type) {
    return res.status(400).json({ error: 'Name and type are required' });
  }

  const query = `
    INSERT INTO customers (name, type, contact_person, email, phone, address, city, postal_code, country, tax_number, payment_terms, credit_limit)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [
    name, type, contact_person, email, phone, address, city, postal_code,
    country || 'UK', tax_number, payment_terms || 30, credit_limit
  ], function(err) {
    if (err) {
      console.error('Error creating customer:', err);
      return res.status(500).json({ error: 'Failed to create customer' });
    }
    res.status(201).json({ id: this.lastID, message: 'Customer created successfully' });
  });
});

// PUT /api/customers/:id - Update customer
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    name, type, contact_person, email, phone, address, city, postal_code,
    country, tax_number, payment_terms, credit_limit, status
  } = req.body;

  const query = `
    UPDATE customers 
    SET name = ?, type = ?, contact_person = ?, email = ?, phone = ?, 
        address = ?, city = ?, postal_code = ?, country = ?, tax_number = ?, 
        payment_terms = ?, credit_limit = ?, status = ?
    WHERE id = ?
  `;

  db.run(query, [
    name, type, contact_person, email, phone, address, city, postal_code,
    country, tax_number, payment_terms, credit_limit, status, id
  ], function(err) {
    if (err) {
      console.error('Error updating customer:', err);
      return res.status(500).json({ error: 'Failed to update customer' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer updated successfully' });
  });
});

module.exports = router;