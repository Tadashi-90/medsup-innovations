import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Users,
  Building,
  Globe,
  MessageSquare,
  HelpCircle,
  Plus,
  Minus,
  Shield,
  Truck,
  CreditCard,
  Award,
  Zap
} from 'lucide-react';
// Using equipment.jpg from public folder

// FAQ Item Component
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-900">{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-purple-600 flex-shrink-0" />
        ) : (
          <Plus className="w-5 h-5 text-purple-600 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white border-t border-gray-200">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', company: '', phone: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+260764323211"],
      description: "Available for inquiries and orders"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["medsupinnovations@gmail.com"],
      description: "We respond promptly to all inquiries"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["Shop No 8426, along Solwezi-Chingola Road (T5)", "Mitech Market, Solwezi, North Western Province"],
      description: "Visit our location in Solwezi"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
      description: "Contact us during business hours"
    }
  ];

  const departments = [
    { icon: Users, name: "Sales & Partnerships", email: "medsupinnovations@gmail.com" },
    { icon: Building, name: "Customer Support", email: "medsupinnovations@gmail.com" },
    { icon: Globe, name: "International", email: "medsupinnovations@gmail.com" },
    { icon: MessageSquare, name: "Media & Press", email: "medsupinnovations@gmail.com" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Navigation */}
      <Navigation variant="landing" />

      {/* Hero Section */}
      <section className="page-hero" style={{ backgroundImage: 'url(/equipment.jpg)' }}>
        <div className="page-hero-content">
          <div className="page-hero-badge">
            GET IN TOUCH
          </div>
          <h1 className="page-hero-title">
            Contact Us
          </h1>
          <p className="page-hero-subtitle">
            Ready to transform your healthcare supply management? Our team of experts is here to help you 
            find the perfect solutions for your organization's needs.
          </p>
          <div className="page-hero-icon">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100 text-center">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-2xl w-fit mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-700 mb-1">{detail}</p>
                  ))}
                  <p className="text-sm text-gray-500 mt-2">{info.description}</p>
                </div>
              );
            })}
          </div>

          {/* Main Contact Section */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-4 sm:p-8 border border-purple-100 max-w-sm sm:max-w-none mx-auto lg:mx-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-green-800 font-semibold">Message sent successfully!</p>
                    <p className="text-green-600 text-sm">We'll get back to you within 2 hours.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Partnerships</option>
                    <option value="support">Customer Support</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/50 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Department Contacts */}
            <div className="space-y-6 max-w-xs sm:max-w-none mx-auto lg:mx-0">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-3 sm:p-8 border border-purple-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Department Contacts</h2>
                <div className="space-y-4">
                  {departments.map((dept, index) => {
                    const Icon = dept.icon;
                    return (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-purple-100">
                        <div className="bg-purple-100 p-3 rounded-xl">
                          <Icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                          <a href={`mailto:${dept.email}`} className="text-purple-600 hover:text-purple-700 text-sm">
                            {dept.email}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl shadow-lg p-3 sm:p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
                <p className="text-purple-100 mb-6">
                  For urgent medical supply needs or emergency support, our team is available 24/7.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-purple-200" />
                    <span className="font-semibold">Emergency Hotline: +1 (555) 911-HELP</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-purple-200" />
                    <span className="font-semibold">urgent@medsupinnovations.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              <HelpCircle className="w-4 h-4 mr-2" />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Got Questions? We've Got Answers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about our medical supplies, ordering process, 
              and services. Can't find what you're looking for? Contact our expert team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* FAQ Categories */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  Product & Quality
                </h3>
                <div className="space-y-4">
                  <FAQItem 
                    question="Are all your medical supplies certified and compliant?"
                    answer="Yes, all our products meet international quality standards including FDA, CE, and ISO certifications. We work exclusively with verified manufacturers and conduct rigorous quality checks."
                  />
                  <FAQItem 
                    question="Do you offer product warranties?"
                    answer="We provide comprehensive warranties on all equipment ranging from 1-5 years depending on the product category. Consumables come with quality guarantees and easy return policies."
                  />
                  <FAQItem 
                    question="Can I request product samples before bulk ordering?"
                    answer="Absolutely! We offer sample programs for most products to ensure they meet your specific requirements before you commit to larger orders."
                  />
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  Shipping & Delivery
                </h3>
                <div className="space-y-4">
                  <FAQItem 
                    question="What are your delivery timeframes?"
                    answer="Standard delivery is 2-5 business days. Emergency orders can be delivered within 24 hours. We offer real-time tracking for all shipments."
                  />
                  <FAQItem 
                    question="Do you handle temperature-sensitive products?"
                    answer="Yes, we have specialized cold-chain logistics for temperature-sensitive medical supplies with continuous monitoring and documentation."
                  />
                </div>
              </div>
            </div>

            {/* More FAQ Categories */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  Ordering & Payment
                </h3>
                <div className="space-y-4">
                  <FAQItem 
                    question="What payment methods do you accept?"
                    answer="We accept all major credit cards, bank transfers, purchase orders, and offer flexible payment terms for established healthcare facilities."
                  />
                  <FAQItem 
                    question="Can I set up automated recurring orders?"
                    answer="Yes! Our smart ordering system can automatically reorder your regular supplies based on usage patterns and inventory levels."
                  />
                  <FAQItem 
                    question="Do you offer volume discounts?"
                    answer="We provide competitive volume pricing and special rates for long-term partnerships. Contact our sales team for custom pricing."
                  />
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mr-3">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  Support & Service
                </h3>
                <div className="space-y-4">
                  <FAQItem 
                    question="Do you provide training on medical equipment?"
                    answer="Yes, we offer comprehensive training programs, user manuals, and ongoing technical support for all equipment purchases."
                  />
                  <FAQItem 
                    question="What if I need emergency supplies outside business hours?"
                    answer="Our 24/7 emergency hotline ensures you can reach us anytime for urgent medical supply needs with rapid response protocols."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FAQ CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">Still Have Questions?</h3>
              </div>
              <p className="text-purple-100 mb-6 text-lg">
                Our expert team is ready to provide personalized answers and solutions for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors inline-flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;