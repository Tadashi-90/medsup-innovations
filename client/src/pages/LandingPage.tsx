import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { MedicalAnimationsSection } from '../components/MedicalAnimations';
import OrderingForm from '../components/OrderingForm';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  Package, 
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  Award,
  Activity,
  Heart,
  Stethoscope,
  Truck,
  ShoppingCart,
  Eye
} from 'lucide-react';
import Footer from '../components/Footer';
import doctorGivingMedicine from '../assets/doctor-giving-medicine.png';
import onlineHealthcare from '../assets/online-healthcare.png';
import heroScreenshot from '../assets/hero-screenshot.png';

const LandingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [orderingForm, setOrderingForm] = useState({
    isOpen: false,
    productName: '',
    productPrice: '',
    productImage: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleOrderClick = (productName: string, productPrice: string, productImage: string) => {
    setOrderingForm({
      isOpen: true,
      productName,
      productPrice,
      productImage
    });
  };

  const closeOrderingForm = () => {
    setOrderingForm({
      isOpen: false,
      productName: '',
      productPrice: '',
      productImage: ''
    });
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <Navigation variant="landing" />

      {/* Hero Section */}
      <section className="athena-hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                MEDICAL SUPPLIES & LABORATORY CONSUMABLES
              </div>
              <h1 className="hero-title">
                Your trusted partner for quality medical supplies with{' '}
                <span className="hero-highlight">Medsup Innovations</span>
              </h1>
              <p className="hero-subtitle">
                Medsup Innovations Ltd is a Zambian company based in Solwezi, North Western Province. Established on December 22, 2022, we specialize in providing high-quality medical supplies, including instruments, protective clothing, laboratory consumables and reagents etc.
              </p>
            </div>
            <div className="hero-image">
              <div className="hero-screenshot">
                <img 
                  src={heroScreenshot} 
                  alt="Medsup Innovations Platform Screenshot" 
                  className="hero-screenshot-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Animations Section */}
      <MedicalAnimationsSection />

      {/* Specialty Selection Section */}
      <section className="specialty-section">
        <div className="specialty-container">
          <div className="specialty-header">
            <div className="specialty-badge">PRODUCT CATEGORIES</div>
            <h2>Explore our comprehensive range of medical supplies</h2>
            <p className="specialty-subtitle">
              Browse our extensive catalog of medical equipment, laboratory consumables, and healthcare products designed to meet your facility's specific requirements.
            </p>
          </div>
          <div className="specialty-buttons">
            <button className="specialty-btn">
              <div className="specialty-btn-icon">
                <Stethoscope />
              </div>
              <span className="specialty-btn-text">Diagnostic Equipment</span>
            </button>
            <button className="specialty-btn">
              <div className="specialty-btn-icon">
                <Activity />
              </div>
              <span className="specialty-btn-text">Laboratory Consumables</span>
            </button>
            <button className="specialty-btn">
              <div className="specialty-btn-icon">
                <Heart />
              </div>
              <span className="specialty-btn-text">Surgical Supplies</span>
            </button>
            <button className="specialty-btn">
              <div className="specialty-btn-icon">
                <Shield />
              </div>
              <span className="specialty-btn-text">Protective Equipment</span>
            </button>
            <button className="specialty-btn">
              <div className="specialty-btn-icon">
                <Users />
              </div>
              <span className="specialty-btn-text">Hospitals & Health Systems</span>
            </button>
            <button className="specialty-btn">
              <div className="specialty-btn-icon">
                <Package />
              </div>
              <span className="specialty-btn-text">Other Specialties</span>
            </button>
          </div>
        </div>
      </section>

      {/* Medical Consultation Illustration Section */}
      <section className="illustration-section">
        <div className="container">
          <div className="illustration-content">
            <div className="illustration-image">
              <img 
                src={doctorGivingMedicine} 
                alt="Medical Consultation and Treatment" 
                className="illustration-img"
              />
            </div>
            <div className="illustration-text">
              <h2 className="illustration-title">Premium Medical Supplies</h2>
              <p className="illustration-description">
                Supplying healthcare facilities with top-quality medical equipment, laboratory consumables, and essential healthcare products from trusted manufacturers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">300+</div>
              <div className="stat-label">Healthcare Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">Medical Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">12+</div>
              <div className="stat-label">Years Supplying</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98.5%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Discover our most popular medical supplies and equipment</p>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image-full">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center" 
                  alt="Digital Thermometer" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="product-content">
                <h3 className="product-title">Digital Thermometers</h3>
                <p className="product-description">Accurate and fast digital thermometers for precise temperature readings. Perfect for medical professionals and home use.</p>
                <div className="product-pricing">
                  <span className="current-price">£22.49</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="buy-btn"
                    onClick={() => handleOrderClick(
                      'Digital Thermometers', 
                      '£22.49', 
                      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center'
                    )}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
            
            <div className="product-card">
              <div className="product-image-full">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&crop=center" 
                  alt="Professional Stethoscope" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="product-content">
                <h3 className="product-title">Professional Stethoscopes</h3>
                <p className="product-description">High-quality stethoscopes with superior acoustic performance. Essential diagnostic tools for healthcare professionals.</p>
                <div className="product-pricing">
                  <span className="current-price">£112.49</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="buy-btn"
                    onClick={() => handleOrderClick(
                      'Professional Stethoscopes', 
                      '£112.49', 
                      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&crop=center'
                    )}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
            
            <div className="product-card">
              <div className="product-image-full">
                <img 
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop&crop=center" 
                  alt="Protective Equipment" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="product-content">
                <h3 className="product-title">Protective Equipment</h3>
                <p className="product-description">Complete range of protective equipment including masks, gloves, and safety gear. Ensuring maximum protection for healthcare workers.</p>
                <div className="product-pricing">
                  <span className="current-price">£9.74</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="buy-btn"
                    onClick={() => handleOrderClick(
                      'Protective Equipment', 
                      '£9.74', 
                      'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop&crop=center'
                    )}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
            
            <div className="product-card">
              <div className="product-image-full">
                <img 
                  src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop&crop=center" 
                  alt="Monitoring Equipment" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="product-content">
                <h3 className="product-title">Monitoring Devices</h3>
                <p className="product-description">Advanced patient monitoring systems for continuous health tracking. Real-time data collection and analysis for better patient care.</p>
                <div className="product-pricing">
                  <span className="current-price">£224.99</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="buy-btn"
                    onClick={() => handleOrderClick(
                      'Monitoring Devices', 
                      '£224.99', 
                      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop&crop=center'
                    )}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="products-cta">
            <p>Explore our complete catalog of medical supplies and equipment</p>
            <Link to="/services" className="btn-primary">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon" />
                ))}
              </div>
              <p>"Medsup Innovations has been our trusted partner for medical supplies. Their quality and reliability are unmatched."</p>
              <div className="testimonial-author">
                <strong>Dr. Sarah Johnson</strong>
                <span>Chief Medical Officer, City General Hospital</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon" />
                ))}
              </div>
              <p>"Excellent service and fast delivery. They understand the urgency of healthcare supply needs."</p>
              <div className="testimonial-author">
                <strong>Michael Chen</strong>
                <span>Laboratory Director, Regional Medical Center</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Healthcare Solutions Illustration Section */}
      <section className="illustration-section illustration-section-reverse">
        <div className="container">
          <div className="illustration-content">
            <div className="illustration-text">
              <h2 className="illustration-title">Digital Supply Management</h2>
              <p className="illustration-description">
                Streamline your medical supply ordering and inventory management with our innovative digital platform featuring real-time stock tracking, automated reordering, and mobile accessibility.
              </p>
            </div>
            <div className="illustration-image">
              <img 
                src={onlineHealthcare} 
                alt="Digital Healthcare Solutions" 
                className="illustration-img"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Ordering Form Modal */}
      <OrderingForm
        isOpen={orderingForm.isOpen}
        onClose={closeOrderingForm}
        productName={orderingForm.productName}
        productPrice={orderingForm.productPrice}
        productImage={orderingForm.productImage}
      />
    </div>
  );
};

export default LandingPage;