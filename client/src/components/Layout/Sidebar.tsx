import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  LogOut,
  ArrowLeft 
} from 'lucide-react';
import logo from '../../assets/logo.png';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      description: 'Overview & Analytics'
    },
    {
      name: 'Products',
      path: '/products',
      icon: Package,
      description: 'Medical Supplies Catalog'
    },
    {
      name: 'Orders',
      path: '/orders',
      icon: ShoppingCart,
      description: 'Order Processing'
    },
    {
      name: 'Customers',
      path: '/customers',
      icon: Users,
      description: 'Customer Management'
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: BarChart3,
      description: 'Analytics & Reports'
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl w-full flex justify-center">
          <img 
            src={logo} 
            alt="MedSup Innovations Ltd" 
            style={{ width: '120px', height: '60px', objectFit: 'contain' }}
          />
        </div>
      </div>
      
      <nav>
        <ul className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path} className="sidebar-nav-item">
                <Link
                  to={item.path}
                  className={`sidebar-nav-link ${active ? 'active' : ''}`}
                >
                  <Icon className="sidebar-nav-icon" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <a 
          href="/"
          className="back-to-site-btn"
        >
          <ArrowLeft size={20} />
          Back to Site
        </a>
        <button 
          onClick={handleLogout}
          className="logout-btn"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;