import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Lightning Fast",
    desc: "Instant AI responses with sub second latency",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: "Smart Automation",
    desc: "Automate repetitive tasks with intelligent workflows",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Deep Analytics",
    desc: "Actionable insights from complex data patterns",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Enterprise Security",
    desc: "Bank grade encryption and data protection",
  },
];

// Feature card component
const FeatureCard = ({ feature, index, isHovered, onHover, onLeave }) => {
  return (
    <div
      className="product-feature-card"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1.2rem 1.4rem',
        borderRadius: '14px',
        border: `1px solid ${isHovered ? 'rgba(212, 168, 83, 0.25)' : 'rgba(255, 255, 255, 0.04)'}`,
        backgroundColor: isHovered ? 'rgba(212, 168, 83, 0.04)' : 'rgba(255, 255, 255, 0.015)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
        cursor: 'default',
      }}
    >
      {/* Icon circle */}
      <div style={{
        flexShrink: 0,
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isHovered ? 'rgba(212, 168, 83, 0.1)' : 'rgba(255, 255, 255, 0.03)',
        color: isHovered ? '#D4A853' : 'rgba(255, 255, 255, 0.35)',
        border: `1px solid ${isHovered ? 'rgba(212, 168, 83, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
        transition: 'all 0.4s ease',
      }}>
        {feature.icon}
      </div>

      {/* Text */}
      <div>
        <h4 style={{
          fontSize: '0.9rem',
          fontWeight: 500,
          color: isHovered ? '#ffffff' : '#e8e4df',
          margin: '0 0 0.3rem 0',
          fontFamily: "'Inter', sans-serif",
          transition: 'color 0.3s ease',
        }}>
          {feature.title}
        </h4>
        <p style={{
          fontSize: '0.78rem',
          lineHeight: 1.5,
          color: isHovered ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.25)',
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          transition: 'color 0.3s ease',
        }}>
          {feature.desc}
        </p>
      </div>
    </div>
  );
};

const ProductSection = () => {
  const container = useRef(null);
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  useGSAP(() => {
    // Label
    gsap.from('.product-label', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: container.current, start: 'top 75%' },
    });

    // Title words stagger
    gsap.utils.toArray('.product-word').forEach((word, i) => {
      gsap.from(word, {
        y: 80, opacity: 0,
        duration: 1,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: container.current, start: 'top 70%' },
      });
    });

    // Description
    gsap.from('.product-desc', {
      y: 40, opacity: 0, duration: 1, delay: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: container.current, start: 'top 70%' },
    });

    // CTA
    gsap.from('.product-cta', {
      y: 30, opacity: 0, duration: 0.8, delay: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: container.current, start: 'top 70%' },
    });

    // Decorative line
    gsap.from('.product-line', {
      scaleX: 0, duration: 1.5, delay: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: container.current, start: 'top 70%' },
    });

    // Feature cards stagger
    gsap.utils.toArray('.product-feature-card').forEach((card, i) => {
      gsap.from(card, {
        x: 60, opacity: 0,
        duration: 0.8,
        delay: 0.8 + i * 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: container.current, start: 'top 65%' },
      });
    });
  }, { scope: container });

  return (
    <div
      ref={container}
      style={{
        backgroundColor: '#0a0a0a',
        padding: 'clamp(6rem, 12vw, 12rem) 0',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow — left side */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 168, 83, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Subtle radial glow — right side for cards */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 168, 83, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 4vw, 4rem)',
        position: 'relative',
      }}>
        {/* Label */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: 'clamp(2rem, 4vw, 4rem)',
        }}>
          <span style={{
            width: '40px', height: '1px',
            backgroundColor: '#D4A853', display: 'inline-block',
          }} />
          <span className="product-label" style={{
            fontSize: '0.75rem', fontWeight: 500,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#D4A853',
          }}>
            Our Product
          </span>
        </div>

        {/* Large Title — word by word */}
        <div style={{
          marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
          overflow: 'hidden',
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 200,
            color: '#e8e4df',
            margin: 0,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
          }}>
            {['Relyce', 'AI'].map((word, i) => (
              <span
                key={i}
                className="product-word"
                style={{
                  display: 'inline-block',
                  marginRight: '0.3em',
                  ...(i === 1 ? { color: '#D4A853' } : {}),
                }}
              >
                {word}
              </span>
            ))}
          </h2>
          <h3 style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.3)',
            margin: 'clamp(0.5rem, 1vw, 1rem) 0 0 0',
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
          }}>
            <span className="product-word" style={{ display: 'inline-block' }}>
              Revolutionizing workflows with intelligent automation
            </span>
          </h3>
        </div>

        {/* Decorative line */}
        <div className="product-line" style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, rgba(212, 168, 83, 0.3), rgba(255,255,255,0.03) 80%, transparent)',
          transformOrigin: 'left center',
          marginBottom: 'clamp(2.5rem, 4vw, 4rem)',
        }} />

        {/* Split layout: Description left, Feature cards right */}
        <div className="product-content-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(3rem, 5vw, 5rem)',
          alignItems: 'start',
        }}>
          {/* Left: Description + CTA */}
          <div>
            <p className="product-desc" style={{
              fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
              lineHeight: 1.8,
              color: 'rgba(255, 255, 255, 0.4)',
              margin: '0 0 clamp(2rem, 3vw, 3rem) 0',
              fontWeight: 400,
            }}>
              Relyce AI is a state of the art platform that leverages artificial intelligence
              to automate complex tasks, analyze data with incredible precision, and provide
              actionable insights. Enhance your team's productivity and drive smarter business
              decisions with our powerful, intuitive AI solution.
            </p>

            {/* CTA with animated border */}
            <div className="product-cta" style={{ position: 'relative', display: 'inline-block' }}>
              <button
                onClick={() => navigate('/contactus')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.8rem 1.8rem',
                  borderRadius: '50px',
                  border: '1px solid rgba(212, 168, 83, 0.3)',
                  backgroundColor: 'transparent',
                  color: '#D4A853',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  fontFamily: "'Inter', sans-serif",
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(212, 168, 83, 0.5)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 168, 83, 0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(212, 168, 83, 0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{
                  width: '6px', height: '6px',
                  borderRadius: '50%', backgroundColor: '#D4A853',
                  display: 'inline-block',
                }} />
                Experience Relyce AI
                <span style={{ fontSize: '0.75rem' }}>↗</span>
              </button>
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
          }}>
            {features.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={i}
                isHovered={hoveredCard === i}
                onHover={() => setHoveredCard(i)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .product-content-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductSection;