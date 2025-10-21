import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Package, Filter } from 'lucide-react';
import ProductEditModal from '../components/ProductEditModal';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  sku: string;
  manufacturer: string;
  model_number: string;
  unit_price: string;
  cost_price: string;
  unit_of_measure: string;
  regulatory_approval: string;
  lot_tracking_required: boolean;
  expiry_tracking_required: boolean;
  temperature_controlled: boolean;
  storage_temperature_min: string | null;
  storage_temperature_max: string | null;
  storage_requirements: string;
  shelf_life_months: number;
  hazardous_material: boolean;
  reorder_point: number;
  reorder_quantity: number;
  lead_time_days: number;
  is_active: boolean;
  weight_kg: string;
  dimensions_cm: string;
  barcode: string;
  qr_code: string | null;
  image_url?: string;
  created_at: string;
  updated_at: string;
  current_stock: number;
  available_stock: number;
  location: string;
  supplier_name: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // You could set an error state here if needed
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['consumables', 'diagnostic_tools', 'laboratory_equipment', 'medical_devices', 'pharmaceuticals', 'safety_equipment'];

  const formatCategoryName = (category: string) => {
    return category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (product.manufacturer && product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (current: number = 0, minimum: number = 0) => {
    if (current <= minimum) return { status: 'Low Stock', color: 'text-red-600 bg-red-50' };
    if (current <= minimum * 1.5) return { status: 'Medium Stock', color: 'text-yellow-600 bg-yellow-50' };
    return { status: 'Good Stock', color: 'text-green-600 bg-green-50' };
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
    setEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedProduct(null);
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
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{formatCategoryName(category)}</option>
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
          const stockStatus = getStockStatus(product.current_stock, product.reorder_point);
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
                  <span className="font-medium">{formatCategoryName(product.category)}</span>
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
                <p className="text-xs text-purple-600 font-medium">{product.regulatory_approval}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                  title="Edit Product"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
                      alert('Delete functionality coming soon!');
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Delete Product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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

      {/* Edit Modal */}
      {selectedProduct && (
        <ProductEditModal
          product={selectedProduct}
          isOpen={editModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default Products;