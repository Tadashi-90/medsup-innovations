import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Users, Mail, Phone, MapPin, Package, Calendar } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  organization_type: string;
  address: string;
  city: string;
  postal_code: string;
  contact_person: string;
  registration_date: string;
  total_orders: number;
  total_spent: number;
  last_order_date?: string;
  status: 'active' | 'inactive';
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data for demo
  useEffect(() => {
    setTimeout(() => {
      setCustomers([
        {
          id: 1,
          name: 'St. Mary\'s Hospital',
          email: 'procurement@stmarys.nhs.uk',
          phone: '+44 20 7946 0958',
          organization_type: 'Hospital',
          address: '123 Hospital Road',
          city: 'London',
          postal_code: 'SW1A 1AA',
          contact_person: 'Dr. Sarah Johnson',
          registration_date: '2023-06-15T00:00:00Z',
          total_orders: 15,
          total_spent: 18750.50,
          last_order_date: '2024-01-15T09:30:00Z',
          status: 'active'
        },
        {
          id: 2,
          name: 'Cambridge Research Lab',
          email: 'orders@cambridgelab.ac.uk',
          phone: '+44 1223 334455',
          organization_type: 'Research Laboratory',
          address: '456 Science Park',
          city: 'Cambridge',
          postal_code: 'CB4 0WS',
          contact_person: 'Prof. Michael Chen',
          registration_date: '2023-08-22T00:00:00Z',
          total_orders: 28,
          total_spent: 45200.75,
          last_order_date: '2024-01-14T14:20:00Z',
          status: 'active'
        },
        {
          id: 3,
          name: 'Royal London Hospital',
          email: 'supplies@royallondon.nhs.uk',
          phone: '+44 20 7377 7000',
          organization_type: 'Hospital',
          address: '789 Whitechapel Road',
          city: 'London',
          postal_code: 'E1 1BB',
          contact_person: 'Ms. Emma Wilson',
          registration_date: '2023-04-10T00:00:00Z',
          total_orders: 22,
          total_spent: 32150.25,
          last_order_date: '2024-01-12T11:15:00Z',
          status: 'active'
        },
        {
          id: 4,
          name: 'Oxford Medical Center',
          email: 'procurement@oxfordmed.co.uk',
          phone: '+44 1865 741741',
          organization_type: 'Medical Center',
          address: '321 Oxford Street',
          city: 'Oxford',
          postal_code: 'OX1 2JD',
          contact_person: 'Dr. James Thompson',
          registration_date: '2023-09-05T00:00:00Z',
          total_orders: 8,
          total_spent: 12500.00,
          last_order_date: '2024-01-16T16:45:00Z',
          status: 'active'
        },
        {
          id: 5,
          name: 'Edinburgh University Lab',
          email: 'lab.supplies@ed.ac.uk',
          phone: '+44 131 650 1000',
          organization_type: 'University Laboratory',
          address: '654 University Avenue',
          city: 'Edinburgh',
          postal_code: 'EH8 9YL',
          contact_person: 'Dr. Lisa Anderson',
          registration_date: '2023-11-18T00:00:00Z',
          total_orders: 5,
          total_spent: 7850.30,
          last_order_date: '2024-01-10T08:30:00Z',
          status: 'active'
        },
        {
          id: 6,
          name: 'Manchester General Hospital',
          email: 'supplies@manchester.nhs.uk',
          phone: '+44 161 276 1234',
          organization_type: 'Hospital',
          address: '987 Hospital Lane',
          city: 'Manchester',
          postal_code: 'M13 9WL',
          contact_person: 'Mr. David Brown',
          registration_date: '2023-03-20T00:00:00Z',
          total_orders: 3,
          total_spent: 4200.00,
          last_order_date: '2023-12-15T10:00:00Z',
          status: 'inactive'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const organizationTypes = ['Hospital', 'Research Laboratory', 'Medical Center', 'University Laboratory', 'Clinic'];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contact_person.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || customer.organization_type === typeFilter;
    return matchesSearch && matchesType;
  });

  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    totalRevenue: customers.reduce((sum, customer) => sum + customer.total_spent, 0),
    averageOrderValue: customers.reduce((sum, customer) => sum + customer.total_spent, 0) / 
                      customers.reduce((sum, customer) => sum + customer.total_orders, 0)
  };

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 30000) return { tier: 'Premium', color: 'text-purple-600 bg-purple-50' };
    if (totalSpent >= 15000) return { tier: 'Gold', color: 'text-yellow-600 bg-yellow-50' };
    if (totalSpent >= 5000) return { tier: 'Silver', color: 'text-gray-600 bg-gray-50' };
    return { tier: 'Bronze', color: 'text-orange-600 bg-orange-50' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 backdrop-blur-sm border border-purple-100 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Customers</h1>
            <p className="text-purple-600 mt-2">Manage customer relationships and track order history</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white/70 backdrop-blur-sm border border-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{customerStats.total}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{customerStats.active}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-red-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Inactive</p>
              <p className="text-2xl font-bold text-red-600">{customerStats.inactive}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">£{customerStats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">£{customerStats.averageOrderValue.toFixed(0)}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-sm border border-purple-100 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-purple-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            >
              <option value="">All Types</option>
              {organizationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <span className="text-sm text-purple-600 font-medium">
              {filteredCustomers.length} of {customers.length} customers
            </span>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => {
          const tier = getCustomerTier(customer.total_spent);
          return (
            <div key={customer.id} className="bg-white/70 backdrop-blur-sm border border-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-purple-600">{customer.organization_type}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button className="p-2 text-purple-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-purple-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Customer Tier */}
              <div className="mb-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tier.color}`}>
                  {tier.tier} Customer
                </span>
              </div>

              {/* Contact Information */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{customer.city}, {customer.postal_code}</span>
                </div>
              </div>

              {/* Contact Person */}
              <div className="mb-4">
                <p className="text-sm text-gray-500">Contact Person:</p>
                <p className="text-sm font-medium text-gray-900">{customer.contact_person}</p>
              </div>

              {/* Order Statistics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-lg font-semibold text-gray-900">{customer.total_orders}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-lg font-semibold text-gray-900">£{customer.total_spent.toLocaleString()}</p>
                </div>
              </div>

              {/* Last Order & Registration */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                {customer.last_order_date && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Order:</span>
                    <span className="text-gray-900">{new Date(customer.last_order_date).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Member Since:</span>
                  <span className="text-gray-900">{new Date(customer.registration_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className={`font-medium ${customer.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="bg-white/70 backdrop-blur-sm border border-purple-100 rounded-xl p-12 shadow-lg text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No customers found</h3>
          <p className="text-purple-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Add Customer Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Customer</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="text-center py-8">
                <p className="text-gray-500">Customer form would be implemented here</p>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="mt-4 btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;