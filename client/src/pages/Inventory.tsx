import React, { useState, useEffect } from 'react';
import { AlertTriangle, Package, TrendingDown, TrendingUp, Plus, Minus, Search, Filter } from 'lucide-react';

interface InventoryItem {
  id: number;
  product_id: number;
  product_name: string;
  sku: string;
  category: string;
  current_stock: number;
  minimum_stock: number;
  maximum_stock: number;
  unit_of_measure: string;
  location: string;
  last_updated: string;
  unit_price: number;
  total_value: number;
}

interface StockMovement {
  id: number;
  product_name: string;
  type: 'in' | 'out';
  quantity: number;
  reason: string;
  date: string;
  user: string;
}

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'movements'>('overview');

  // Mock data for demo
  useEffect(() => {
    setTimeout(() => {
      setInventory([
        {
          id: 1,
          product_id: 1,
          product_name: 'Disposable Nitrile Gloves',
          sku: 'PPE-GLV-001',
          category: 'Personal Protective Equipment',
          current_stock: 150,
          minimum_stock: 50,
          maximum_stock: 500,
          unit_of_measure: 'Box of 100',
          location: 'Warehouse A - Shelf 1',
          last_updated: '2024-01-15T10:30:00Z',
          unit_price: 12.99,
          total_value: 1948.50
        },
        {
          id: 2,
          product_id: 2,
          product_name: 'Sterile Petri Dishes',
          sku: 'LAB-PET-001',
          category: 'Laboratory Consumables',
          current_stock: 75,
          minimum_stock: 20,
          maximum_stock: 200,
          unit_of_measure: 'Pack of 20',
          location: 'Lab Storage - Cabinet B',
          last_updated: '2024-01-14T14:20:00Z',
          unit_price: 45.50,
          total_value: 3412.50
        },
        {
          id: 3,
          product_id: 3,
          product_name: 'Digital Thermometer',
          sku: 'MED-THM-001',
          category: 'Medical Devices',
          current_stock: 8,
          minimum_stock: 10,
          maximum_stock: 50,
          unit_of_measure: 'Each',
          location: 'Medical Equipment Room',
          last_updated: '2024-01-13T09:15:00Z',
          unit_price: 89.99,
          total_value: 719.92
        },
        {
          id: 4,
          product_id: 4,
          product_name: 'Micropipette Tips',
          sku: 'LAB-TIP-001',
          category: 'Laboratory Consumables',
          current_stock: 200,
          minimum_stock: 100,
          maximum_stock: 1000,
          unit_of_measure: 'Box of 1000',
          location: 'Lab Storage - Cabinet A',
          last_updated: '2024-01-15T16:45:00Z',
          unit_price: 28.75,
          total_value: 5750.00
        },
        {
          id: 5,
          product_id: 5,
          product_name: 'Surgical Face Masks',
          sku: 'PPE-MSK-001',
          category: 'Personal Protective Equipment',
          current_stock: 25,
          minimum_stock: 30,
          maximum_stock: 300,
          unit_of_measure: 'Box of 50',
          location: 'Warehouse A - Shelf 2',
          last_updated: '2024-01-12T11:30:00Z',
          unit_price: 15.99,
          total_value: 399.75
        }
      ]);

      setMovements([
        {
          id: 1,
          product_name: 'Disposable Nitrile Gloves',
          type: 'in',
          quantity: 50,
          reason: 'New stock delivery',
          date: '2024-01-15T10:30:00Z',
          user: 'John Smith'
        },
        {
          id: 2,
          product_name: 'Digital Thermometer',
          type: 'out',
          quantity: 2,
          reason: 'Customer order fulfillment',
          date: '2024-01-14T15:20:00Z',
          user: 'Sarah Johnson'
        },
        {
          id: 3,
          product_name: 'Surgical Face Masks',
          type: 'out',
          quantity: 10,
          reason: 'Internal use',
          date: '2024-01-13T09:45:00Z',
          user: 'Mike Wilson'
        },
        {
          id: 4,
          product_name: 'Micropipette Tips',
          type: 'in',
          quantity: 100,
          reason: 'Stock replenishment',
          date: '2024-01-12T14:15:00Z',
          user: 'Emily Davis'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getStockStatus = (current: number, minimum: number, maximum: number) => {
    if (current <= minimum) return { status: 'Critical', color: 'text-red-600 bg-red-50', icon: AlertTriangle };
    if (current <= minimum * 1.5) return { status: 'Low', color: 'text-yellow-600 bg-yellow-50', icon: TrendingDown };
    if (current >= maximum * 0.9) return { status: 'High', color: 'text-blue-600 bg-blue-50', icon: TrendingUp };
    return { status: 'Normal', color: 'text-green-600 bg-green-50', icon: Package };
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!filterStatus) return matchesSearch;
    
    const status = getStockStatus(item.current_stock, item.minimum_stock, item.maximum_stock).status;
    return matchesSearch && status.toLowerCase() === filterStatus.toLowerCase();
  });

  const totalValue = inventory.reduce((sum, item) => sum + item.total_value, 0);
  const lowStockItems = inventory.filter(item => item.current_stock <= item.minimum_stock).length;
  const criticalItems = inventory.filter(item => item.current_stock <= item.minimum_stock * 0.5).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Track stock levels and manage inventory operations</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
            </div>
            <Package className="w-8 h-8 text-medical-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">£{totalValue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">{criticalItems}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-medical-500 text-medical-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Inventory Overview
          </button>
          <button
            onClick={() => setActiveTab('movements')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'movements'
                ? 'border-medical-500 text-medical-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Stock Movements
          </button>
        </nav>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Filters */}
          <div className="card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    <option value="critical">Critical</option>
                    <option value="low">Low Stock</option>
                    <option value="normal">Normal</option>
                    <option value="high">High Stock</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.map((item) => {
                    const stockStatus = getStockStatus(item.current_stock, item.minimum_stock, item.maximum_stock);
                    const StatusIcon = stockStatus.icon;
                    
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.product_name}</div>
                            <div className="text-sm text-gray-500">{item.sku}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.current_stock} {item.unit_of_measure}
                          </div>
                          <div className="text-sm text-gray-500">
                            Min: {item.minimum_stock} | Max: {item.maximum_stock}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {stockStatus.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          £{item.total_value.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-green-600 hover:text-green-900 flex items-center">
                              <Plus className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 flex items-center">
                              <Minus className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'movements' && (
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Stock Movements</h3>
          <div className="space-y-4">
            {movements.map((movement) => (
              <div key={movement.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    movement.type === 'in' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {movement.type === 'in' ? (
                      <Plus className="w-5 h-5 text-green-600" />
                    ) : (
                      <Minus className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{movement.product_name}</p>
                    <p className="text-sm text-gray-500">{movement.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${movement.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                    {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(movement.date).toLocaleDateString()} by {movement.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;