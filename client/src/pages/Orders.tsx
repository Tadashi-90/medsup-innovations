import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Package, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';
import OrderEditModal from '../components/OrderEditModal';

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  order_date: string;
  delivery_date?: string;
  total_amount: number;
  items_count: number;
  shipping_address: string;
  items?: OrderItem[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSelectedOrder, setEditSelectedOrder] = useState<Order | null>(null);

  // Mock data for demo
  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: 1,
          order_number: 'ORD-2024-001',
          customer_name: 'St. Mary\'s Hospital',
          customer_email: 'procurement@stmarys.nhs.uk',
          status: 'processing',
          order_date: '2024-01-15T09:30:00Z',
          delivery_date: '2024-01-18T00:00:00Z',
          total_amount: 1250.75,
          items_count: 3,
          shipping_address: '123 Hospital Road, London, SW1A 1AA',
          items: [
            { id: 1, product_name: 'Disposable Nitrile Gloves', quantity: 50, unit_price: 12.99, total_price: 649.50 },
            { id: 2, product_name: 'Surgical Face Masks', quantity: 20, unit_price: 15.99, total_price: 319.80 },
            { id: 3, product_name: 'Digital Thermometer', quantity: 3, unit_price: 89.99, total_price: 269.97 }
          ]
        },
        {
          id: 2,
          order_number: 'ORD-2024-002',
          customer_name: 'Cambridge Research Lab',
          customer_email: 'orders@cambridgelab.ac.uk',
          status: 'shipped',
          order_date: '2024-01-14T14:20:00Z',
          delivery_date: '2024-01-17T00:00:00Z',
          total_amount: 2150.25,
          items_count: 4,
          shipping_address: '456 Science Park, Cambridge, CB4 0WS',
          items: [
            { id: 4, product_name: 'Sterile Petri Dishes', quantity: 25, unit_price: 45.50, total_price: 1137.50 },
            { id: 5, product_name: 'Micropipette Tips', quantity: 30, unit_price: 28.75, total_price: 862.50 },
            { id: 6, product_name: 'Laboratory Gloves', quantity: 10, unit_price: 15.02, total_price: 150.25 }
          ]
        },
        {
          id: 3,
          order_number: 'ORD-2024-003',
          customer_name: 'Royal London Hospital',
          customer_email: 'supplies@royallondon.nhs.uk',
          status: 'delivered',
          order_date: '2024-01-12T11:15:00Z',
          delivery_date: '2024-01-15T00:00:00Z',
          total_amount: 875.50,
          items_count: 2,
          shipping_address: '789 Whitechapel Road, London, E1 1BB',
          items: [
            { id: 7, product_name: 'Surgical Face Masks', quantity: 30, unit_price: 15.99, total_price: 479.70 },
            { id: 8, product_name: 'Hand Sanitizer', quantity: 20, unit_price: 19.79, total_price: 395.80 }
          ]
        },
        {
          id: 4,
          order_number: 'ORD-2024-004',
          customer_name: 'Oxford Medical Center',
          customer_email: 'procurement@oxfordmed.co.uk',
          status: 'pending',
          order_date: '2024-01-16T16:45:00Z',
          total_amount: 3250.00,
          items_count: 5,
          shipping_address: '321 Oxford Street, Oxford, OX1 2JD',
          items: [
            { id: 9, product_name: 'Digital Thermometer', quantity: 10, unit_price: 89.99, total_price: 899.90 },
            { id: 10, product_name: 'Disposable Nitrile Gloves', quantity: 100, unit_price: 12.99, total_price: 1299.00 },
            { id: 11, product_name: 'Sterile Petri Dishes', quantity: 25, unit_price: 45.50, total_price: 1137.50 }
          ]
        },
        {
          id: 5,
          order_number: 'ORD-2024-005',
          customer_name: 'Edinburgh University Lab',
          customer_email: 'lab.supplies@ed.ac.uk',
          status: 'cancelled',
          order_date: '2024-01-10T08:30:00Z',
          total_amount: 450.75,
          items_count: 2,
          shipping_address: '654 University Avenue, Edinburgh, EH8 9YL',
          items: [
            { id: 12, product_name: 'Micropipette Tips', quantity: 10, unit_price: 28.75, total_price: 287.50 },
            { id: 13, product_name: 'Laboratory Gloves', quantity: 15, unit_price: 10.88, total_price: 163.25 }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'text-yellow-600 bg-yellow-50', icon: Clock, label: 'Pending' };
      case 'processing':
        return { color: 'text-blue-600 bg-blue-50', icon: Package, label: 'Processing' };
      case 'shipped':
        return { color: 'text-purple-600 bg-purple-50', icon: Package, label: 'Shipped' };
      case 'delivered':
        return { color: 'text-green-600 bg-green-50', icon: CheckCircle, label: 'Delivered' };
      case 'cancelled':
        return { color: 'text-red-600 bg-red-50', icon: XCircle, label: 'Cancelled' };
      default:
        return { color: 'text-gray-600 bg-gray-50', icon: Clock, label: 'Unknown' };
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  };

  const totalRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, order) => sum + order.total_amount, 0);

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleEditOrder = (order: Order) => {
    setEditSelectedOrder(order);
    setEditModalOpen(true);
  };

  const handleSaveOrder = (updatedOrder: Order) => {
    setOrders(prev => prev.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    ));
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditSelectedOrder(null);
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Orders</h1>
            <p className="text-purple-600 mt-2">Manage customer orders and track deliveries</p>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Order</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white/70 backdrop-blur-sm border border-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-yellow-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Processing</p>
              <p className="text-2xl font-bold text-blue-600">{orderStats.processing}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Shipped</p>
              <p className="text-2xl font-bold text-purple-600">{orderStats.shipped}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Revenue</p>
              <p className="text-2xl font-bold text-green-600">£{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-medical-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <span className="text-sm text-gray-500">
              {filteredOrders.length} of {orders.length} orders
            </span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.order_number}</div>
                        {order.delivery_date && (
                          <div className="text-sm text-gray-500">
                            Due: {new Date(order.delivery_date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customer_name}</div>
                        <div className="text-sm text-gray-500">{order.customer_email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.items_count} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      £{order.total_amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => viewOrderDetails(order)}
                          className="text-medical-600 hover:text-medical-900 flex items-center"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditOrder(order)}
                          className="text-gray-600 hover:text-gray-900 flex items-center"
                          title="Edit Order"
                        >
                          <Edit className="w-4 h-4" />
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

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order Number</p>
                    <p className="text-sm text-gray-900">{selectedOrder.order_number}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusConfig(selectedOrder.status).color}`}>
                      {getStatusConfig(selectedOrder.status).label}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Customer</p>
                    <p className="text-sm text-gray-900">{selectedOrder.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order Date</p>
                    <p className="text-sm text-gray-900">{new Date(selectedOrder.order_date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Shipping Address</p>
                  <p className="text-sm text-gray-900">{selectedOrder.shipping_address}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Order Items</p>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.items?.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-2 text-sm text-gray-900">{item.product_name}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">£{item.unit_price}</td>
                            <td className="px-4 py-2 text-sm font-medium text-gray-900">£{item.total_price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">Total Amount:</span>
                    <span className="text-lg font-bold text-gray-900">£{selectedOrder.total_amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;