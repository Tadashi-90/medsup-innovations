import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Package, Filter } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  sku: string;
  manufacturer: string;
  unit_price: number;
  unit_of_measure: string;
  regulatory_info: string;
  storage_requirements: string;
  shelf_life_months: number;
  current_stock?: number;
  minimum_stock?: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for demo
  useEffect(() => {
    setTimeout(() => {
      setProducts([
        {
          id: 1,
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
          shelf_life_months: 60,
          current_stock: 150,
          minimum_stock: 50
        },
        {
          id: 2,
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
          shelf_life_months: 36,
          current_stock: 75,
          minimum_stock: 20
        },
        {
          id: 3,
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
          shelf_life_months: 120,
          current_stock: 25,
          minimum_stock: 10
        },
        {
          id: 4,
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
          shelf_life_months: 60,
          current_stock: 200,
          minimum_stock: 100
        },
        {
          id: 5,
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
          shelf_life_months: 60,
          current_stock: 80,
          minimum_stock: 30
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ['Personal Protective Equipment', 'Laboratory Consumables', 'Medical Devices'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (current: number = 0, minimum: number = 0) => {
    if (current <= minimum) return { status: 'Low Stock', color: 'text-red-600 bg-red-50' };
    if (current <= minimum * 1.5) return { status: 'Medium Stock', color: 'text-yellow-600 bg-yellow-50' };
    return { status: 'Good Stock', color: 'text-green-600 bg-green-50' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6 space-y-8">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-purple-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Products Catalog
            </h1>
            <p className="text-gray-600 mt-2">Manage your medical supplies and laboratory consumables</p>
          </div>
          <button
            onClick={() => alert('Add Product functionality coming soon!')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-purple-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-purple-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <span className="text-sm text-purple-600 font-medium">
              {filteredProducts.length} of {products.length} products
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.current_stock, product.minimum_stock);
          return (
            <div key={product.id} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-purple-600 font-medium">{product.sku}</p>
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

              <p className="text-sm text-gray-600 mb-3">{product.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Manufacturer:</span>
                  <span className="font-medium">{product.manufacturer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-medium">£{product.unit_price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Unit:</span>
                  <span className="font-medium">{product.unit_of_measure}</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-500">Stock: </span>
                  <span className="font-semibold text-gray-900">{product.current_stock || 0}</span>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}>
                  {stockStatus.status}
                </span>
              </div>

              {/* Regulatory Info */}
              <div className="mt-4 pt-4 border-t border-purple-100">
                <p className="text-xs text-purple-600 font-medium">{product.regulatory_info}</p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-12 border border-purple-100 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-purple-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Products;