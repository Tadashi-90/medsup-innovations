import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Menu, X } from 'lucide-react';

interface NavigationProps {
  variant?: 'landing' | 'standard';
}

const Navigation: React.FC<NavigationProps> = ({ variant = 'standard' }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'Company Profile' },
    { path: '/services', label: 'Products' },
    { path: '/contact', label: 'Get in Touch' },
    { path: '/articles', label: 'Insights' }
  ];

  if (variant === 'landing') {
    return (
      <nav className="athena-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon">
              <img 
                src="/logo.png" 
                alt="MedSup Innovations Ltd" 
                style={{ width: '150px', height: '100px', objectFit: 'contain' }}
              />
            </div>
            <span className="brand-text">Medsup Innovations</span>
          </div>
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/login" className="nav-cta-btn">Login</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu md:hidden">
            <div className="mobile-menu-content">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/login" 
                className="mobile-nav-cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    );
  }

  // Standard navigation for other pages
  return (
    <nav className="standard-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <img 
                 src="/logo.png" 
                 alt="MedSup Innovations Ltd" 
                 style={{ width: '150px', height: '100px', objectFit: 'contain' }}
               />
            </div>
            <span className="text-xl font-bold text-white">Medsup Innovations</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`transition-colors ${
                  isActive(link.path) 
                    ? 'text-white font-medium' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/login" 
              className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu md:hidden">
            <div className="mobile-menu-content">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`mobile-nav-link ${
                    isActive(link.path) 
                      ? 'text-white font-medium' 
                      : 'text-white/80 hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/login" 
                className="mobile-nav-cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;