import React from 'react';

// Animated Heartbeat Component
export const AnimatedHeartbeat: React.FC = () => {
  return (
    <div className="medical-animation-container">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="animated-heartbeat"
      >
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#be185d" />
          </linearGradient>
        </defs>
        <path
          d="M60 25c-8-15-30-15-30 5 0 10 15 20 30 35 15-15 30-25 30-35 0-20-22-20-30-5z"
          fill="url(#heartGradient)"
          className="heartbeat-path"
        />
        <circle cx="60" cy="60" r="45" fill="none" stroke="#e11d48" strokeWidth="2" opacity="0.3" className="pulse-ring" />
      </svg>
    </div>
  );
};

// Animated Stethoscope Component
export const AnimatedStethoscope: React.FC = () => {
  return (
    <div className="medical-animation-container">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="animated-stethoscope"
      >
        <defs>
          <linearGradient id="stethGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#5b21b6" />
          </linearGradient>
        </defs>
        {/* Stethoscope tube */}
        <path
          d="M30 20 Q40 30 50 40 Q60 50 70 40 Q80 30 90 20"
          fill="none"
          stroke="url(#stethGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className="steth-tube"
        />
        {/* Earpieces */}
        <circle cx="25" cy="15" r="6" fill="url(#stethGradient)" className="steth-ear left-ear" />
        <circle cx="95" cy="15" r="6" fill="url(#stethGradient)" className="steth-ear right-ear" />
        {/* Chest piece */}
        <circle cx="60" cy="80" r="20" fill="url(#stethGradient)" className="steth-chest" />
        <circle cx="60" cy="80" r="12" fill="none" stroke="white" strokeWidth="2" />
        {/* Connecting tube */}
        <path
          d="M60 60 Q60 70 60 60"
          fill="none"
          stroke="url(#stethGradient)"
          strokeWidth="4"
          className="steth-connect"
        />
      </svg>
    </div>
  );
};

// Animated DNA Helix Component
export const AnimatedDNA: React.FC = () => {
  return (
    <div className="medical-animation-container">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="animated-dna"
      >
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        {/* DNA Strands */}
        <path
          d="M30 20 Q45 40 30 60 Q45 80 30 100"
          fill="none"
          stroke="url(#dnaGradient)"
          strokeWidth="3"
          className="dna-strand left-strand"
        />
        <path
          d="M90 20 Q75 40 90 60 Q75 80 90 100"
          fill="none"
          stroke="url(#dnaGradient)"
          strokeWidth="3"
          className="dna-strand right-strand"
        />
        {/* Base pairs */}
        <line x1="35" y1="30" x2="85" y2="30" stroke="url(#dnaGradient)" strokeWidth="2" className="base-pair bp1" />
        <line x1="40" y1="45" x2="80" y2="45" stroke="url(#dnaGradient)" strokeWidth="2" className="base-pair bp2" />
        <line x1="35" y1="60" x2="85" y2="60" stroke="url(#dnaGradient)" strokeWidth="2" className="base-pair bp3" />
        <line x1="40" y1="75" x2="80" y2="75" stroke="url(#dnaGradient)" strokeWidth="2" className="base-pair bp4" />
        <line x1="35" y1="90" x2="85" y2="90" stroke="url(#dnaGradient)" strokeWidth="2" className="base-pair bp5" />
      </svg>
    </div>
  );
};

// Animated Medical Cross Component
export const AnimatedMedicalCross: React.FC = () => {
  return (
    <div className="medical-animation-container">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="animated-medical-cross"
      >
        <defs>
          <linearGradient id="crossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>
        {/* Medical Cross */}
        <rect x="50" y="20" width="20" height="80" fill="url(#crossGradient)" className="cross-vertical" />
        <rect x="20" y="50" width="80" height="20" fill="url(#crossGradient)" className="cross-horizontal" />
        {/* Glow effect */}
        <rect x="50" y="20" width="20" height="80" fill="none" stroke="#dc2626" strokeWidth="2" opacity="0.5" className="cross-glow" />
        <rect x="20" y="50" width="80" height="20" fill="none" stroke="#dc2626" strokeWidth="2" opacity="0.5" className="cross-glow" />
      </svg>
    </div>
  );
};

// Main Medical Animations Section Component
export const MedicalAnimationsSection: React.FC = () => {
  return (
    <section className="medical-animations-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Healthcare Providers Trust Medsup Innovations</h2>
          <p className="section-subtitle">Empowering healthcare excellence through innovative supply chain solutions</p>
        </div>
        <div className="medical-animations-grid">
          <div className="animation-item">
            <AnimatedHeartbeat />
            <h3>Patient-Centered Focus</h3>
            <p>Medsup ensures your medical supplies arrive on time, every time, so you can focus on delivering exceptional patient care without supply chain worries.</p>
          </div>
          <div className="animation-item">
            <AnimatedStethoscope />
            <h3>Clinical Excellence</h3>
            <p>From surgical instruments to diagnostic equipment, Medsup provides healthcare professionals with premium medical supplies that meet the highest quality standards.</p>
          </div>
          <div className="animation-item">
            <AnimatedDNA />
            <h3>Innovation-Driven</h3>
            <p>Medsup leverages cutting-edge technology and data analytics to optimize your inventory management and streamline your healthcare operations.</p>
          </div>
          <div className="animation-item">
            <AnimatedMedicalCross />
            <h3>Emergency Readiness</h3>
            <p>With Medsup's rapid response capabilities and emergency supply protocols, your facility is always prepared for critical care situations and urgent medical needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};