import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import OrderingForm from '../components/OrderingForm';
import { 
  ArrowLeft,
  Heart,
  Package,
  Stethoscope,
  Shield,
  Truck,
  Users,
  CheckCircle,
  Activity,
  Microscope,
  Pill,
  Monitor,
  Clock,
  Award,
  TrendingUp,
  ShoppingCart,
  Eye,
  Star
} from 'lucide-react';
import Footer from '../components/Footer';
// Using equipment.jpg from public folder

const Services: React.FC = () => {
  const [orderingForm, setOrderingForm] = useState({
    isOpen: false,
    productName: '',
    productPrice: '',
    productImage: ''
  });

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

  const services = [
    {
      icon: Package,
      title: "Medical Supplies",
      description: "Comprehensive range of medical supplies for healthcare facilities",
      features: [
        "Surgical Instruments",
        "Disposable Medical Devices", 
        "Patient Care Equipment",
        "Emergency Medical Supplies",
        "Infection Control Products"
      ]
    },
    {
      icon: Microscope,
      title: "Laboratory Solutions",
      description: "Complete laboratory consumables and equipment solutions",
      features: [
        "Laboratory Reagents",
        "Testing Kits & Assays",
        "Lab Equipment & Instruments", 
        "Quality Control Materials",
        "Sample Collection Supplies"
      ]
    },
    {
      icon: Monitor,
      title: "Healthcare Technology",
      description: "Advanced healthcare technology and digital solutions",
      features: [
        "Patient Monitoring Systems",
        "Diagnostic Equipment",
        "Healthcare Software",
        "Telemedicine Solutions",
        "Data Analytics Platforms"
      ]
    },
    {
      icon: Pill,
      title: "Pharmaceutical Products",
      description: "Quality pharmaceutical products and medication management",
      features: [
        "Prescription Medications",
        "Over-the-Counter Products",
        "Specialty Pharmaceuticals",
        "Medication Storage Solutions",
        "Pharmacy Automation"
      ]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "All products meet international quality standards and regulatory requirements"
    },
    {
      icon: Truck,
      title: "Reliable Delivery",
      description: "Fast and secure delivery with real-time tracking and temperature control"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated customer support team with deep healthcare industry knowledge"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock support for urgent medical supply needs"
    },
    {
      icon: Award,
      title: "Certified Excellence",
      description: "ISO certified processes and award-winning service quality"
    },
    {
      icon: TrendingUp,
      title: "Cost Optimization",
      description: "Competitive pricing with volume discounts and cost-saving programs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Navigation */}
      <Navigation variant="landing" />

      {/* Hero Section */}
      <section className="page-hero" style={{ backgroundImage: 'url(/equipment.jpg)' }}>
        <div className="page-hero-content">
          <div className="page-hero-badge">
            COMPREHENSIVE HEALTHCARE SOLUTIONS
          </div>
          <h1 className="page-hero-title">
            Products & Services
          </h1>
          <p className="page-hero-subtitle">
            Discover our comprehensive range of medical supplies, laboratory solutions, and healthcare technologies 
            designed to support healthcare providers in delivering exceptional patient care.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="page-hero-icon">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="page-hero-icon">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-8 border border-purple-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-2xl">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Our Product Range</h2>
          <p className="section-subtitle">Explore our comprehensive catalog of medical supplies and equipment</p>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image-full">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center" 
                  alt="Digital Thermometers"
                />
              </div>
              <div className="product-content">
                <h3 className="product-title">Digital Thermometers</h3>
                <p className="product-description">
                  Accurate and fast digital thermometers for precise temperature readings. Perfect for medical professionals and home use.
                </p>
                <div className="product-pricing">
                  <span className="current-price">£29.99</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="buy-btn"
                    onClick={() => handleOrderClick('Digital Thermometers', '£29.99', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center')}
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
                  alt="Professional Stethoscopes"
                />
              </div>
              <div className="product-content">
                <h3 className="product-title">Professional Stethoscopes</h3>
                <p className="product-description">
                  High-quality stethoscopes with superior acoustic performance. Essential diagnostic tools for healthcare professionals.
                </p>
                <div className="product-pricing">
                  <span className="current-price">£149.99</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="buy-btn"
                    onClick={() => handleOrderClick('Professional Stethoscopes', '£149.99', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&crop=center')}
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
                />
              </div>
              <div className="product-content">
                <h3 className="product-title">Protective Equipment</h3>
                <p className="product-description">
                  Complete range of protective equipment including masks, gloves, and safety gear. Ensuring maximum protection for healthcare workers.
                </p>
                <div className="product-pricing">
                  <span className="current-price">£12.99</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="buy-btn"
                    onClick={() => handleOrderClick('Protective Equipment', '£12.99', 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop&crop=center')}
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
                  alt="Monitoring Devices"
                />
              </div>
              <div className="product-content">
                <h3 className="product-title">Monitoring Devices</h3>
                <p className="product-description">
                  Advanced patient monitoring systems for continuous health tracking. Real-time data collection and analysis for better patient care.
                </p>
                <div className="product-pricing">
                  <span className="current-price">£299.99</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="buy-btn"
                    onClick={() => handleOrderClick('Monitoring Devices', '£299.99', 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop&crop=center')}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
            
            <div className="product-card">
              <div className="product-image-full">
                <img 
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=250&fit=crop&crop=center" 
                  alt="Laboratory Equipment"
                />
              </div>
              <div className="product-content">
                <h3 className="product-title">Laboratory Equipment</h3>
                <p className="product-description">
                  Professional laboratory equipment for accurate testing and analysis. High-precision instruments for research and diagnostics.
                </p>
                <div className="product-pricing">
                  <span className="current-price">£199.99</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="buy-btn"
                    onClick={() => handleOrderClick('Laboratory Equipment', '£199.99', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=250&fit=crop&crop=center')}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
            
            <div className="product-card">
              <div className="product-image-full">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center" 
                  alt="Diagnostic Equipment"
                />
              </div>
              <div className="product-content">
                <h3 className="product-title">Diagnostic Equipment</h3>
                <p className="product-description">
                  State-of-the-art diagnostic equipment for comprehensive medical examinations. Advanced technology for precise medical assessments.
                </p>
                <div className="product-pricing">
                  <span className="current-price">£599.99</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="buy-btn"
                    onClick={() => handleOrderClick('Diagnostic Equipment', '£599.99', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center')}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="products-cta">
            <p>Need something specific? Browse our complete catalog or contact our team for custom solutions</p>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
              <Link to="/login" className="btn-primary">
                Browse Full Catalog <ArrowLeft size={20} style={{transform: 'rotate(180deg)'}} />
              </Link>
              <Link to="/#contact" className="btn-secondary">
                Contact Sales Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Healthcare Organizations</h2>
          <p className="text-lg text-gray-600 mb-12">
            We're proud to partner with hospitals, clinics, and laboratories worldwide
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {/* Johnson & Johnson */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 w-full h-24 flex items-center justify-center">
              <svg viewBox="0 0 200 60" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
                <text x="100" y="35" textAnchor="middle" className="fill-red-600 font-bold text-lg">J&J</text>
                <text x="100" y="50" textAnchor="middle" className="fill-gray-600 font-medium text-xs">Johnson & Johnson</text>
              </svg>
            </div>

            {/* Pfizer */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 w-full h-24 flex items-center justify-center">
              <svg viewBox="0 0 200 60" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
                <circle cx="40" cy="30" r="15" className="fill-blue-600"/>
                <path d="M35 25 L40 30 L45 25 M40 30 L40 35" stroke="white" strokeWidth="2" fill="none"/>
                <text x="120" y="35" textAnchor="middle" className="fill-blue-600 font-bold text-lg">Pfizer</text>
              </svg>
            </div>

            {/* Medtronic */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 w-full h-24 flex items-center justify-center">
              <svg viewBox="0 0 200 60" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
                <rect x="20" y="20" width="30" height="20" rx="5" className="fill-blue-700"/>
                <circle cx="35" cy="30" r="3" className="fill-white"/>
                <text x="120" y="35" textAnchor="middle" className="fill-blue-700 font-bold text-lg">Medtronic</text>
              </svg>
            </div>

            {/* Abbott */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 w-full h-24 flex items-center justify-center">
              <svg viewBox="0 0 200 60" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
                <path d="M20 40 Q35 15 50 40" stroke="#0066cc" strokeWidth="3" fill="none"/>
                <text x="120" y="35" textAnchor="middle" className="fill-blue-600 font-bold text-lg">Abbott</text>
              </svg>
            </div>

            {/* Siemens Healthineers */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 w-full h-24 flex items-center justify-center">
              <svg viewBox="0 0 200 60" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
                <circle cx="25" cy="25" r="3" className="fill-teal-600"/>
                <circle cx="35" cy="25" r="3" className="fill-orange-500"/>
                <circle cx="45" cy="25" r="3" className="fill-teal-600"/>
                <text x="100" y="30" textAnchor="middle" className="fill-teal-600 font-bold text-sm">SIEMENS</text>
                <text x="100" y="45" textAnchor="middle" className="fill-orange-500 font-medium text-sm">Healthineers</text>
              </svg>
            </div>

            {/* GE Healthcare */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 w-full h-24 flex items-center justify-center">
              <svg viewBox="0 0 200 60" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
                <circle cx="35" cy="30" r="15" className="fill-blue-600"/>
                <text x="35" y="35" textAnchor="middle" className="fill-white font-bold text-lg">GE</text>
                <text x="120" y="35" textAnchor="middle" className="fill-blue-600 font-bold text-lg">Healthcare</text>
              </svg>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 italic">
              "Medsup Innovations consistently delivers quality products with exceptional service. 
              Their reliability has made them our preferred supplier for critical medical supplies."
            </p>
            <p className="text-gray-500 mt-2 font-medium">
              - Dr. Sarah Mitchell, Chief Medical Officer, Regional Medical Center
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-12 border border-purple-100">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact our team to learn more about how our products and services can support your healthcare facility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login"
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-200"
              >
                Access Dashboard
              </Link>
              <Link 
                to="/#contact"
                className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-200"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default Services;