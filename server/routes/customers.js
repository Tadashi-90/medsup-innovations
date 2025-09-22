const express = require('express');
const router = express.Router();
const database = require('../database/postgres');

// GET /api/customers - Get all customers
router.get('/', async (req, res) => {
  try {
    const { type, status = 'active', search } = req.query;
    const customers = await database.getCustomers({ type, status, search });
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// GET /api/customers/:id - Get single customer
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await database.getCustomerById(id);
    
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

// POST /api/customers - Create new customer
router.post('/', async (req, res) => {
  try {
    const {
      name, type, contact_person, email, phone, address, city, postal_code,
      country, tax_number, payment_terms, credit_limit
    } = req.body;

    if (!name || !type) {
      return res.status(400).json({ error: 'Name and type are required' });
    }

    const customerData = {
      name, type, contact_person, email, phone, address, city, postal_code,
      country: country || 'UK', tax_number, payment_terms: payment_terms || 30, credit_limit
    };

    const customer = await database.createCustomer(customerData);
    res.status(201).json({ 
      id: customer.id, 
      message: 'Customer created successfully',
      customer 
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

// PUT /api/customers/:id - Update customer
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, type, contact_person, email, phone, address, city, postal_code,
      country, tax_number, payment_terms, credit_limit, status
    } = req.body;

    const customerData = {
      name, type, contact_person, email, phone, address, city, postal_code,
      country, tax_number, payment_terms, credit_limit, status
    };

    const customer = await database.updateCustomer(id, customerData);
    
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    res.json({ 
      message: 'Customer updated successfully',
      customer 
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

// DELETE /api/customers/:id - Delete customer
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const success = await database.deleteCustomer(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

module.exports = router;