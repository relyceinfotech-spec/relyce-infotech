import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Service data
const servicesData = [
  {
    number: "01",
    title: "Web\nDevelopment",
    description: "Responsive, scalable, and SEO friendly websites tailored to your brand. From landing pages to complex platforms   built with modern frameworks.",
    tools: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
    accent: "rgba(212, 168, 83, 0.6)",
  },
  {
    number: "02",
    title: "App\nDevelopment",
    description: "Native and cross platform mobile applications that engage users and drive growth. Fast, reliable, and beautiful on any screen.",
    tools: ["React Native", "Swift", "Kotlin", "Firebase", "Flutter"],
    accent: "rgba(180, 140, 80, 0.6)",
  },
  {
    number: "03",
    title: "Digital\nMarketing",
    description: "Data driven strategies to boost your online presence. SEO, PPC, social media, and content   maximizing your ROI across all channels.",
    tools: ["Google Analytics", "SEMrush", "Meta Ads", "HubSpot"],
    accent: "rgba(200, 160, 90, 0.5)",
  },
  {
    number: "04",
    title: "Software\nDevelopment",
    description: "Custom software to automate processes and improve efficiency. Enterprise systems and specialized tools   robust and scalable.",
    tools: ["Python", "Java", "Docker", "C#", "AWS"],
    accent: "rgba(212, 168, 83, 0.5)",
  },
  {
    number: "05",
    title: "UI/UX\nDesign",
    description: "User-centric designs that delight and convert. We research your users deeply and deliver interfaces that truly resonate." ,
    tools: ["Figma", "Adobe XD", "Sketch", "InVision", "Miro"],
    accent: "rgba(190, 150, 70, 0.5)",
  },
  {
    number: "06",
    title: "E commerce\nSolutions",
    description: "Feature rich online stores with seamless shopping experiences. Secure payments, inventory management, and end to end solutions.",
    tools: ["Shopify", "WooCommerce", "Magento", "Stripe"],
    accent: "rgba(212, 168, 83, 0.5)",
  },
  {
    number: "07",
    title: "SaaS\nSolutions",
    description: "Scalable cloud based software tailored to your business. Subscription models, integrations, and growth driven strategies.",
    tools: ["SaaS Strategy", "APIs", "Cloud-Native", "Data Security"],
    accent: "rgba(200, 155, 75, 0.5)",
  },
  {
    number: "08",
    title: "IT\nConsulting",
    description: "Strategic technology guidance to navigate digital transformation. Roadmaps, architecture, and the right investments for your future.",
    tools: ["IT Strategy", "System Integration", "Cloud Consulting", "Risk Assessment"],
    accent: "rgba(180, 145, 80, 0.5)",
  },
];

/* ============================================
   DESKTOP: Horizontal Scroll Pinned Card
   ============================================ */
const HorizontalCard = ({ service, index, total }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="h-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flexShrink: 0,
        width: '420px',
        height: '480px',
        position: 'relative',
        borderRadius: '20px',
        border: `1px solid ${isHovered ? 'rgba(212, 168, 83, 0.25)' : 'rgba(255, 255, 255, 0.05)'}`,
        background: isHovered
          ? 'linear-gradient(165deg, rgba(30, 25, 18, 0.9), rgba(12, 12, 12, 0.95))'
          : 'linear-gradient(165deg, rgba(18, 18, 18, 0.8), rgba(10, 10, 10, 0.9))',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(2rem, 3vw, 2.5rem)',
      }}
    >
      {/* Giant background number */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-10px',
        fontSize: '11rem',
        fontWeight: 800,
        fontFamily: "'Inter', sans-serif",
        lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: isHovered ? '1.5px rgba(212, 168, 83, 0.12)' : '1px rgba(255, 255, 255, 0.03)',
        pointerEvents: 'none',
        userSelect: 'none',
        transition: 'all 0.6s ease',
      }}>
        {service.number}
      </div>

      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '15%',
        right: '15%',
        height: '1px',
        background: isHovered
          ? `linear-gradient(90deg, transparent, ${service.accent}, transparent)`
          : 'transparent',
        transition: 'all 0.5s ease',
      }} />

      {/* Corner accent dot */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: isHovered ? '#D4A853' : 'rgba(255, 255, 255, 0.08)',
        boxShadow: isHovered ? '0 0 12px rgba(212, 168, 83, 0.4)' : 'none',
        transition: 'all 0.5s ease',
      }} />

      {/* Top: Number + Title */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <span style={{
          fontFamily: "'Inter', monospace",
          fontSize: '0.7rem',
          fontWeight: 600,
          color: isHovered ? '#D4A853' : 'rgba(255, 255, 255, 0.15)',
          letterSpacing: '0.08em',
          display: 'block',
          marginBottom: '1.2rem',
          transition: 'color 0.4s ease',
        }}>
          {service.number}
        </span>

        <h3 style={{
          fontSize: 'clamp(1.8rem, 2.5vw, 2.2rem)',
          fontWeight: 400,
          color: isHovered ? '#ffffff' : '#e8e4df',
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          transition: 'color 0.4s ease',
          whiteSpace: 'pre-line',
        }}>
          {service.title}
        </h3>
      </div>

      {/* Middle: Description (fades in on hover) */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
      }}>
        <p style={{
          fontSize: '0.85rem',
          lineHeight: 1.75,
          color: isHovered ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)',
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          transition: 'color 0.5s ease',
        }}>
          {service.description}
        </p>
      </div>

      {/* Bottom: Tools */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4rem',
      }}>
        {service.tools.map((tool, i) => (
          <span
            key={tool}
            style={{
              padding: '0.3rem 0.75rem',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: isHovered ? 'rgba(212, 168, 83, 0.9)' : 'rgba(255, 255, 255, 0.2)',
              border: `1px solid ${isHovered ? 'rgba(212, 168, 83, 0.25)' : 'rgba(255, 255, 255, 0.06)'}`,
              borderRadius: '50px',
              fontFamily: "'Inter', sans-serif",
              transition: `all 0.4s ease ${i * 0.04}s`,
              backgroundColor: isHovered ? 'rgba(212, 168, 83, 0.05)' : 'transparent',
            }}
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Ambient radial glow */}
      <div style={{
        position: 'absolute',
        bottom: '-40%',
        left: '-20%',
        width: '160%',
        height: '80%',
        background: isHovered
          ? `radial-gradient(ellipse at center, ${service.accent.replace('0.6', '0.06').replace('0.5', '0.05')} 0%, transparent 60%)`
          : 'transparent',
        pointerEvents: 'none',
        transition: 'all 0.6s ease',
      }} />
    </div>
  );
};

/* ============================================
   MOBILE ROW COMPONENT (<768px)
   ============================================ */
const MobileServiceRow = ({ service, index }) => {
  return (
    <div
      className="service-row"
      style={{
        position: 'relative',
        padding: '1.8rem 0',
        cursor: 'default',
      }}
    >
      <div className="row-border-top" style={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '1px',
        width: '0%',
        backgroundColor: '#D4A853',
        transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }} />

      <div className="row-border-bottom" style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '1px',
        width: '0%',
        backgroundColor: '#D4A853',
        transition: 'width 1.4s 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }} />

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      }} />

      <span className="row-number" style={{
        fontFamily: "'Inter', monospace",
        fontSize: '0.7rem',
        fontWeight: 500,
        color: 'rgba(255, 255, 255, 0.2)',
        letterSpacing: '0.05em',
        display: 'block',
        marginBottom: '0.5rem',
        transition: 'color 0.5s ease',
      }}>
        {service.number}
      </span>

      <h3 style={{
        fontSize: '1.3rem',
        fontWeight: 500,
        color: '#e8e4df',
        margin: '0 0 0.6rem 0',
        fontFamily: "'Inter', sans-serif",
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      }}>
        {service.title.replace('\n', ' ')}
      </h3>

      <p style={{
        fontSize: '0.82rem',
        lineHeight: 1.65,
        color: 'rgba(255, 255, 255, 0.35)',
        margin: '0 0 1rem 0',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
      }}>
        {service.description}
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4rem',
      }}>
        {service.tools.map((tool) => (
          <span
            key={tool}
            style={{
              padding: '0.25rem 0.7rem',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: 'rgba(212, 168, 83, 0.8)',
              border: '1px solid rgba(212, 168, 83, 0.2)',
              borderRadius: '50px',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ============================================
   MAIN COMPONENT
   ============================================ */
const ServicesSection = () => {
  const container = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Title animations
    gsap.from('.services-title', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
    });

    gsap.from('.services-subtitle', {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
    });

    // Desktop: Horizontal scroll pin
    mm.add("(min-width: 769px)", () => {
      const track = trackRef.current;
      if (!track) return;

      const cards = track.querySelectorAll('.h-card');
      const totalScrollWidth = track.scrollWidth - window.innerWidth + 200;

      // Pin the section and scroll horizontally
      gsap.to(track, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: '.h-scroll-section',
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Stagger card entrance
      cards.forEach((card, i) => {
        gsap.from(card, {
          scale: 0.9,
          opacity: 0,
          rotateY: -5,
          duration: 0.6,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.getById?.('hScroll'),
            start: 'left 90%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Progress bar animation
      gsap.to('.h-progress-fill', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.h-scroll-section',
          start: 'top top',
          end: () => `+=${totalScrollWidth}`,
          scrub: true,
        },
      });
    });

    // Mobile animations
    mm.add("(max-width: 768px)", () => {
      gsap.utils.toArray('.service-row').forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleClass: 'row-active',
        });
      });
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <div ref={container} style={{
      backgroundColor: '#0a0a0a',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Section Header — outside the pinned area */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem) clamp(2rem, 4vw, 3rem)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          <span style={{
            width: '40px',
            height: '1px',
            backgroundColor: '#D4A853',
            display: 'inline-block',
          }} />
          <span className="services-subtitle" style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#D4A853',
          }}>
            What We Do
          </span>
        </div>
        <h2 className="services-title" style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 300,
          color: '#e8e4df',
          margin: 0,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}>
          Services built for
          <br />
          <span style={{ color: 'rgba(255,255,255, 0.4)' }}>scale & precision</span>
        </h2>
      </div>

      {/* DESKTOP: Horizontal scroll pinned section */}
      <div className="h-scroll-section desktop-only" style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="h-track"
          style={{
            display: 'flex',
            gap: '2rem',
            paddingLeft: 'clamp(1.5rem, 4vw, 4rem)',
            paddingRight: '8rem',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {servicesData.map((service, index) => (
            <HorizontalCard
              key={service.number}
              service={service}
              index={index}
              total={servicesData.length}
            />
          ))}
        </div>

        {/* Scroll progress bar */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: 'clamp(1.5rem, 4vw, 4rem)',
          right: 'clamp(1.5rem, 4vw, 4rem)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.25)',
            fontFamily: "'Inter', monospace",
            flexShrink: 0,
          }}>
            Scroll
          </span>
          <div style={{
            flex: 1,
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}>
            <div className="h-progress-fill" style={{
              height: '100%',
              width: '0%',
              background: 'linear-gradient(90deg, #D4A853, rgba(212, 168, 83, 0.3))',
              borderRadius: '1px',
            }} />
          </div>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            color: 'rgba(255, 255, 255, 0.15)',
            fontFamily: "'Inter', monospace",
            flexShrink: 0,
          }}>
            {String(servicesData.length).padStart(2, '0')}
          </span>
        </div>

        {/* Left fade edge */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '60px',
          height: '100%',
          background: 'linear-gradient(90deg, #0a0a0a, transparent)',
          pointerEvents: 'none',
          zIndex: 5,
        }} />

        {/* Right fade edge */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100%',
          background: 'linear-gradient(270deg, #0a0a0a, transparent)',
          pointerEvents: 'none',
          zIndex: 5,
        }} />
      </div>

      {/* MOBILE: Vertical rows */}
      <div className="mobile-only" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 4vw, 4rem) clamp(4rem, 8vw, 8rem)',
      }}>
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}>
          {servicesData.map((service, index) => (
            <MobileServiceRow key={service.number} service={service} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        .desktop-only { display: flex !important; }
        .mobile-only { display: none !important; }

        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }

          .service-row.row-active .row-border-top {
            width: 100% !important;
          }
          .service-row.row-active .row-border-bottom {
            width: 100% !important;
          }
          .service-row.row-active .row-number {
            color: #D4A853 !important;
          }
        }

        /* Smooth card hover */
        .h-card:hover {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 80px rgba(212, 168, 83, 0.04);
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;
