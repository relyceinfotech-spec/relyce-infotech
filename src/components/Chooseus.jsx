import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const featuresData = [
  {
    number: "01",
    title: "Comprehensive Support",
    description: "From the initial spark of an idea to a successful product launch and beyond, we provide continuous, end to end support to ensure your project thrives.",
  },
  {
    number: "02",
    title: "Affordable Solutions",
    description: "We believe in empowering new businesses. Our services are strategically priced to be cost effective for startups and SMEs without compromising on quality.",
  },
  {
    number: "03",
    title: "Experienced Team",
    description: "Our team consists of skilled professionals with years of industry experience, all dedicated to applying their expertise to deliver exceptional results.",
  },
  {
    number: "04",
    title: "Client Centric Approach",
    description: "Your success is our primary goal. We take the time to deeply understand your specific business needs to ensure our solutions are perfectly aligned with your vision.",
  },
];

const WhyChooseUs = () => {
  const container = useRef(null);

  useGSAP(() => {
    // Header
    gsap.from('.choose-subtitle', {
      y: 30, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: container.current, start: 'top 80%' },
    });
    gsap.from('.choose-title', {
      y: 50, opacity: 0, duration: 1, delay: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: container.current, start: 'top 80%' },
    });

    // Each feature row
    gsap.utils.toArray('.choose-feature').forEach((el, i) => {
      const number = el.querySelector('.feature-number');
      const title = el.querySelector('.feature-title');
      const desc = el.querySelector('.feature-desc');
      const line = el.querySelector('.feature-line');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(number, { x: -40, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from(title, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from(desc, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .from(line, { scaleX: 0, duration: 1, ease: 'power3.out' }, '-=0.6');
    });
  }, { scope: container });

  return (
    <div
      ref={container}
      style={{
        backgroundColor: '#0a0a0a',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 4vw, 4rem)',
      }}>
        {/* Section Header */}
        <div style={{ marginBottom: 'clamp(4rem, 7vw, 7rem)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{
              width: '40px', height: '1px',
              backgroundColor: '#D4A853', display: 'inline-block',
            }} />
            <span className="choose-subtitle" style={{
              fontSize: '0.75rem', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#D4A853',
            }}>
              Why Choose Us
            </span>
          </div>
          <h2 className="choose-title" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300, color: '#e8e4df',
            margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>
            Your success is
            <br />
            <span style={{ color: 'rgba(255,255,255, 0.4)' }}>our mission</span>
          </h2>
        </div>

        {/* Feature Rows — no boxes, editorial layout */}
        <div>
          {featuresData.map((feature, index) => (
            <div
              key={feature.number}
              className="choose-feature"
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 'clamp(1.5rem, 4vw, 4rem)',
                alignItems: 'start',
                paddingBottom: 'clamp(2.5rem, 4vw, 4rem)',
                paddingTop: index === 0 ? 0 : 'clamp(2.5rem, 4vw, 4rem)',
                position: 'relative',
              }}
            >
              {/* Large number */}
              <span className="feature-number" style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                fontWeight: 200,
                color: 'rgba(212, 168, 83, 0.15)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                minWidth: 'clamp(60px, 10vw, 100px)',
                userSelect: 'none',
              }}>
                {feature.number}
              </span>

              {/* Content */}
              <div style={{ paddingTop: '0.5rem' }}>
                <h3 className="feature-title" style={{
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                  fontWeight: 400,
                  color: '#e8e4df',
                  margin: '0 0 0.8rem 0',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}>
                  {feature.title}
                </h3>
                <p className="feature-desc" style={{
                  fontSize: 'clamp(0.82rem, 1.2vw, 0.9rem)',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.35)',
                  margin: 0,
                  maxWidth: '550px',
                  fontWeight: 400,
                }}>
                  {feature.description}
                </p>
              </div>

              {/* Bottom divider line — animates once via GSAP on scroll */}
              {index < featuresData.length - 1 && (
                <div className="feature-line" style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(212, 168, 83, 0.3), rgba(255,255,255,0.05) 70%, transparent)',
                  transformOrigin: 'left center',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
