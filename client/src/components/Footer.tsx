import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, ArrowRight, Activity, TrendingUp, Users } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="modern-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-section footer-brand-section">
            <div className="footer-brand">
              <Heart className="brand-icon" />
              <span className="brand-text">Medsup Innovations</span>
            </div>
            <p className="footer-description">
              Leading provider of innovative medical supplies and solutions, 
              committed to advancing healthcare through quality products and 
              exceptional service.
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>info@medsupinnovations.com</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>123 Medical Plaza, Healthcare District</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-list">
              <li><Link to="/services">Medical Supplies</Link></li>
              <li><Link to="/services">Laboratory Consumables</Link></li>
              <li><Link to="/services">Medical Solutions</Link></li>
              <li><Link to="/services">Equipment Maintenance</Link></li>
              <li><Link to="/services">Healthcare Consulting</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Company</h3>
            <ul className="footer-list">
              <li><Link to="/about">About Us</Link></li>
              <li><a href="#careers">Careers</a></li>
              <li><Link to="/articles">News & Updates</Link></li>
              <li><a href="#partnerships">Partnerships</a></li>
              <li><Link to="/login">Dashboard</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-list">
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#documentation">Documentation</a></li>
              <li><a href="#warranty">Warranty</a></li>
              <li><a href="#returns">Returns & Exchanges</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Connect</h3>
            <p className="newsletter-text">
              Stay updated with the latest medical innovations and industry insights.
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">
                <ArrowRight className="newsletter-icon" />
              </button>
            </div>
            <div className="social-links">
              <a href="https://linkedin.com/company/medsup-innovations" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Activity className="social-icon" />
              </a>
              <a href="https://twitter.com/medsupinnovations" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <TrendingUp className="social-icon" />
              </a>
              <a href="https://facebook.com/medsupinnovations" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Users className="social-icon" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; 2024 Medsup Innovations. All rights reserved.</p>
              <p className="footer-developer">
                Developed and maintained by <span className="developer-name">Great Expectations</span>
              </p>
            </div>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;