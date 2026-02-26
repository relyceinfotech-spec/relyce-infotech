import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import GhostCursor from './GhostCursor';

const HeroSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const lineVariants = {
    hidden: { 
      y: 80, 
      opacity: 0,
      clipPath: 'inset(100% 0% 0% 0%)'
    },
    visible: { 
      y: 0, 
      opacity: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const fadeUpVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        delay: 1.2
      }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        delay: 1.5
      }
    }
  };

  const bottomVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        delay: 1.8
      }
    }
  };

  return (
    <div className="hero-section" style={{
      position: 'relative',
      height: '100vh',
      width: '100%',
      backgroundColor: '#0a0a0a',
      overflow: 'hidden',
      fontFamily: "'Inter', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",

    }}>
      {/* GhostCursor Background Effect - direct child so parent = hero div */}
      <GhostCursor
        color="#D4A853"
        brightness={1.2}
        edgeIntensity={0}
        trailLength={50}
        inertia={0.5}
        grainIntensity={0.05}
        bloomStrength={0.08}
        bloomRadius={1}
        bloomThreshold={0.025}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      {/* Subtle grain overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 70% 30%, rgba(212, 168, 83, 0.04) 0%, transparent 60%)',
      }} />

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(2rem, 6vw, 8rem)',
        maxWidth: '1400px',
        pointerEvents: 'none',
      }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Main Heading */}
          <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            <motion.div variants={lineVariants} style={{ overflow: 'hidden' }}>
              <h1 style={{
                fontSize: 'clamp(3rem, 7.5vw, 7rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: '#e8e4df',
                letterSpacing: '-0.03em',
                margin: 0,
                fontFamily: "'Inter', sans-serif",
              }}>
                Unlock Potential
              </h1>
            </motion.div>
            
            <motion.div variants={lineVariants} style={{ overflow: 'hidden' }}>
              <h1 style={{
                fontSize: 'clamp(3rem, 7.5vw, 7rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: '#e8e4df',
                letterSpacing: '-0.03em',
                margin: 0,
                fontFamily: "'Inter', sans-serif",
              }}>
                Delivering Results
              </h1>
            </motion.div>
          </div>

          {/* Badge / CTA pill */}
          <motion.div variants={badgeVariants}>
            <button
              onClick={() => navigate("/contactus")}
              style={{
                pointerEvents: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 1.4rem',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: '#e8e4df',
                fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: "'Inter', sans-serif",
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.35)';
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#D4A853',
                display: 'inline-block',
              }} />
              Get Started With Relyce
              <span style={{ fontSize: '0.75rem', marginLeft: '0.2rem' }}>↗</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        variants={bottomVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(2rem, 6vw, 8rem)',
          pointerEvents: 'none',
        }}
      >
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '1.4rem',
          }}
        >
          ↓
        </motion.div>

        {/* Brand name center */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{
            padding: '0.4rem 1rem',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '6px',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            fontWeight: 500,
            fontFamily: "'Inter', monospace",
          }}>
            relyceInfotech
          </span>
        </div>

        {/* Documentation / Contact link */}
        <button
          onClick={() => navigate("/contactus")}
          style={{
            pointerEvents: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.55rem 1.2rem',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={e => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.target.style.color = 'rgba(255, 255, 255, 0.9)';
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.target.style.color = 'rgba(255, 255, 255, 0.6)';
          }}
        >
          Contact Us
          <span style={{ fontSize: '0.7rem' }}>↗</span>
        </button>
      </motion.div>

      {/* CSS for font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;500;600&display=swap');
        
        .ghost-cursor {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
