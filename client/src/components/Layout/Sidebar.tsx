import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users,
  BarChart3,
  LogOut
} from 'lucide-react';

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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-xl">
          <img 
            src="/logo.png" 
            alt="MedSup Innovations Ltd" 
            style={{ width: '150px', height: '90px', objectFit: 'contain' }}
          />
        </div>
        <span className="sidebar-brand-text">Medsup Innovations</span>
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

      <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        <button
          onClick={handleLogout}
          className="sidebar-nav-link"
          style={{ 
            width: '100%', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            color: 'var(--danger-color)'
          }}
        >
          <LogOut className="sidebar-nav-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;