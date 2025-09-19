import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Heart, Users, Award, Shield, Target, ArrowRight, Stethoscope } from 'lucide-react';
// Using equipment.jpg from public folder

const AboutUs: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description: "We source only the highest quality medical supplies and equipment from trusted manufacturers worldwide."
    },
    {
      icon: Shield,
      title: "Reliability & Safety",
      description: "Our products meet the strictest safety standards and regulatory requirements for healthcare use."
    },
    {
      icon: Users,
      title: "Customer Partnership",
      description: "We build lasting relationships with healthcare facilities, understanding their unique supply needs."
    },
    {
      icon: Target,
      title: "Competitive Value",
      description: "We provide premium medical supplies at competitive prices with exceptional service and support."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Executive Officer",
      description: "20+ years in healthcare management and medical supply chain optimization. Led digital transformation initiatives at three major healthcare systems.",
      expertise: ["Healthcare Strategy", "Digital Transformation", "Operations Excellence"],
      education: "MD, Harvard Medical School | MBA, Wharton",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      description: "Expert in healthcare technology solutions and digital transformation. Former lead architect at major healthcare tech companies.",
      expertise: ["Healthcare IT", "Cloud Architecture", "AI/ML Solutions"],
      education: "MS Computer Science, Stanford | BS Engineering, MIT",
      avatar: "MC"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Chief Medical Officer",
      description: "Board-certified physician with extensive experience in clinical operations. Published researcher in healthcare quality improvement.",
      expertise: ["Clinical Excellence", "Quality Assurance", "Regulatory Compliance"],
      education: "MD, Johns Hopkins | Residency, Mayo Clinic",
      avatar: "ER"
    },
    {
      name: "David Thompson",
      role: "Chief Operations Officer",
      description: "Supply chain expert with focus on healthcare logistics and efficiency. Optimized operations for 200+ healthcare facilities.",
      expertise: ["Supply Chain", "Logistics", "Process Optimization"],
      education: "MBA Operations, Kellogg | BS Industrial Engineering",
      avatar: "DT"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Navigation */}
      <Navigation variant="landing" />

      {/* Hero Section */}
      <section className="page-hero" style={{ backgroundImage: 'url(/equipment.jpg)' }}>
        <div className="page-hero-content">
          <h1 className="page-hero-title">
            About Medsup Innovations
          </h1>
          <p className="page-hero-subtitle">
            Medsup Innovations Ltd is a Zambian company based in Solwezi, North Western Province. 
            Established on December 22, 2022, we specialize in providing high-quality medical supplies, 
            including instruments, protective clothing, laboratory consumables and reagents etc.
          </p>
          <div className="page-hero-icon">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              <Target className="w-4 h-4 mr-2" />
              OUR PURPOSE & DIRECTION
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Driving Healthcare Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our mission and vision guide every decision we make, ensuring we deliver exceptional value 
              to healthcare facilities and ultimately improve patient outcomes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mt-2"></div>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  To provide healthcare facilities across Zambia and the region with the highest quality medical supplies, 
                  including instruments, protective clothing, laboratory consumables and reagents. Since our establishment 
                  in December 2022, we've been committed to being your trusted partner in delivering exceptional healthcare 
                  through reliable access to premium medical supplies.
                </p>
                <div className="flex items-center text-purple-600 font-semibold">
                  <Heart className="w-5 h-5 mr-2" />
                  Empowering Healthcare Excellence
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-800 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 transform rotate-1 group-hover:rotate-2 transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full mt-2"></div>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Our vision is to be the number one supplier of choice for medical and non-medical supplies. 
                  We intend to grow the value of our business by supplying quality and affordable products 
                  with persistence and timeliness.
                </p>
                <div className="flex items-center text-indigo-600 font-semibold">
                  <Award className="w-5 h-5 mr-2" />
                  Leading Healthcare Innovation
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Impact Stats */}
          <div className="mt-16 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Our Impact in Numbers</h4>
              <p className="text-gray-600">Measurable results from our mission-driven approach</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Healthcare Partners Served</div>
              </div>
              <div className="group">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">99.9%</div>
                <div className="text-gray-600 font-medium">Customer Satisfaction Rate</div>
              </div>
              <div className="group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
                <div className="text-gray-600 font-medium">Lives Impacted Through Care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              <Users className="w-4 h-4 mr-2" />
              LEADERSHIP TEAM
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Meet Our Visionary Leaders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our leadership team combines decades of healthcare expertise with cutting-edge technology vision 
              to drive innovation in medical supply management.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                {/* Header with Avatar and Basic Info */}
                <div className="flex items-start space-x-6 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {member.avatar}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-purple-600 font-semibold text-lg mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.education}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-6">{member.description}</p>

                {/* Expertise Tags */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Core Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Indicator */}
                <div className="mt-6 pt-6 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-purple-600 text-sm font-medium">
                    <Heart className="w-4 h-4 mr-2" />
                    Dedicated to Healthcare Excellence
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-purple-200">Healthcare Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-purple-200">Products Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-purple-200">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-purple-200">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Partner with Us?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of healthcare facilities who trust Medsup Innovations for their medical supply needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center justify-center"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/services" 
              className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;