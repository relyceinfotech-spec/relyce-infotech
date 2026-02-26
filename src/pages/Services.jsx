import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import PageSEO from '../components/PageSEO';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const servicesData = [
  {
    number: "01",
    title: "Web\nDevelopment",
    description: "Responsive, scalable, and SEO friendly websites tailored to your brand. From landing pages to complex platforms  built with modern frameworks that convert visitors into loyal customers.",
    tools: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
    stat: "20+",
    statLabel: "Sites Delivered",
  },
  {
    number: "02",
    title: "App\nDevelopment",
    description: "Native and cross platform mobile applications that engage users and drive growth. Fast, reliable, and beautiful on every screen  Android and iOS, one codebase.",
    tools: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    stat: "15+",
    statLabel: "Apps Launched",
  },
  {
    number: "03",
    title: "UI/UX\nDesign",
    description: "We research your users deeply and craft visually stunning interfaces that delight and convert. Aesthetics meet functionality in every pixel we design.",
    tools: ["Figma", "Adobe XD", "Sketch", "InVision", "Miro"],
    stat: "100%",
    statLabel: "Client Satisfaction",
  },
  {
    number: "04",
    title: "Software\nDevelopment",
    description: "Custom enterprise grade software to automate processes and improve efficiency. Robust, scalable systems tailored to your specific operational needs.",
    tools: ["Python", "Java", "C#", "Docker", "AWS"],
    stat: "24/7",
    statLabel: "Support Available",
  },
  {
    number: "05",
    title: "Digital\nMarketing",
    description: "Data driven strategies to boost your online presence. SEO, paid advertising, social media, and content  maximizing your ROI across every channel.",
    tools: ["Google Analytics", "SEMrush", "Meta Ads", "HubSpot"],
    stat: "3x",
    statLabel: "Avg. ROI Growth",
  },
  {
    number: "06",
    title: "E-commerce\nSolutions",
    description: "Feature rich online stores with seamless shopping experiences, secure payments, inventory management, and end to end solutions built to sell.",
    tools: ["Shopify", "WooCommerce", "Stripe", "PayPal"],
    stat: "10+",
    statLabel: "Stores Built",
  },
  {
    number: "07",
    title: "IT\nConsulting",
    description: "Strategic technology guidance to navigate digital transformation. Roadmaps, architecture planning, and the right investments for long term growth.",
    tools: ["IT Strategy", "Cloud Consulting", "System Integration", "Risk Assessment"],
    stat: "20+",
    statLabel: "Clients Advised",
  },
];

/* ============================================
   INDIVIDUAL SERVICE SHOWCASE SECTION
   Full-width, alternating layout
   ============================================ */
const ServiceShowcase = ({ service, index, isReversed }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="svc-showcase"
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
      }}
    >
      {/* Divider line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, rgba(212, 168, 83, 0.15), rgba(255,255,255,0.03) 60%, transparent)',
      }} />

      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 clamp(1.5rem, 4vw, 4rem)',
      }}>
        {/* Main layout: number column + content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isReversed ? '1fr auto' : 'auto 1fr',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'start',
        }}>

          {/* LEFT: Large number (or RIGHT if reversed) */}
          {!isReversed && (
            <div className="svc-number" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(5rem, 12vw, 9rem)',
              fontWeight: 100,
              color: 'rgba(212, 168, 83, 0.08)',
              lineHeight: 0.85,
              letterSpacing: '-0.06em',
              userSelect: 'none',
              minWidth: 'clamp(80px, 15vw, 140px)',
            }}>
              {service.number}
            </div>
          )}

          {/* Content area */}
          <div>
            {/* Title */}
            <h2 className="svc-title" style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 300,
              color: '#e8e4df',
              margin: '0 0 clamp(1.2rem, 2vw, 2rem) 0',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              whiteSpace: 'pre-line',
            }}>
              {service.title}
            </h2>

            {/* Description */}
            <p className="svc-desc" style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
              lineHeight: 1.75,
              color: 'rgba(255, 255, 255, 0.38)',
              margin: '0 0 clamp(1.5rem, 2.5vw, 2rem) 0',
              maxWidth: '520px',
              fontWeight: 400,
            }}>
              {service.description}
            </p>

            {/* Bottom row: tools + stat */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}>
              {/* Tools */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', maxWidth: '400px' }}>
                {service.tools.map(tool => (
                  <span key={tool} style={{
                    padding: '0.22rem 0.65rem',
                    fontSize: '0.66rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    color: 'rgba(212, 168, 83, 0.7)',
                    border: '1px solid rgba(212, 168, 83, 0.18)',
                    borderRadius: '50px',
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {tool}
                  </span>
                ))}
              </div>

              {/* Stat */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: 500,
                  color: '#e8e4df',
                  display: 'block',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {service.stat}
                </span>
                <span style={{
                  fontSize: '0.68rem',
                  color: 'rgba(255, 255, 255, 0.25)',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  {service.statLabel}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Large number (when reversed) */}
          {isReversed && (
            <div className="svc-number" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(5rem, 12vw, 9rem)',
              fontWeight: 100,
              color: 'rgba(212, 168, 83, 0.08)',
              lineHeight: 0.85,
              letterSpacing: '-0.06em',
              userSelect: 'none',
              textAlign: 'right',
              minWidth: 'clamp(80px, 15vw, 140px)',
            }}>
              {service.number}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================
   MAIN SERVICES PAGE
   ============================================ */
const ServicesPage = () => {
  const container = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    // Hero
    gsap.from('.svc-label', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.svc-hero', start: 'top 80%' },
    });
    gsap.from('.svc-headline', {
      y: 60, opacity: 0, duration: 1, delay: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.svc-hero', start: 'top 80%' },
    });
    gsap.from('.svc-sub-text', {
      y: 30, opacity: 0, duration: 0.8, delay: 0.35, ease: 'power3.out',
      scrollTrigger: { trigger: '.svc-hero', start: 'top 80%' },
    });

    // Each showcase section
    gsap.utils.toArray('.svc-showcase').forEach((el) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
      });

      const num = el.querySelector('.svc-number');
      const title = el.querySelector('.svc-title');
      const desc = el.querySelector('.svc-desc');

      if (num) tl.from(num, { x: -40, opacity: 0, duration: 0.8, ease: 'power3.out' });
      if (title) tl.from(title, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
      if (desc) tl.from(desc, { y: 25, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');
    });

    // CTA
    gsap.from('.svc-cta', {
      y: 40, opacity: 0, duration: 0.8,
      scrollTrigger: { trigger: '.svc-cta', start: 'top 85%' },
    });
  }, { scope: container });

  return (
    <div ref={container} style={{ backgroundColor: '#0a0a0a', fontFamily: "'Inter', 'Outfit', sans-serif" }}>
      <PageSEO
        title="Our Services — Relyce Infotech | Web, App, AI, Marketing & IT Consulting"
        description="Explore Relyce Infotech's full range of services: web development, app development, UI/UX design, software development, digital marketing, e-commerce solutions, and IT consulting. Tailored for startups and SMEs."
        canonical="https://relyceinfotech.com/services"
        jsonLd={[{
          '@type': 'ItemList',
          'name': 'Relyce Infotech Services',
          'itemListElement': servicesData.map((s, i) => ({
            '@type': 'ListItem',
            'position': i + 1,
            'name': s.title.replace('\n', ' '),
            'description': s.description,
          })),
        }]}
      />

      {/* ===== HERO ===== */}
      <div className="svc-hero" style={{
        padding: 'clamp(8rem, 15vw, 14rem) 0 clamp(4rem, 7vw, 6rem)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}>

          {/* Split layout: heading left, count right */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'end',
          }}>

            {/* Left: heading group */}
            <div>
              <span className="svc-label" style={{
                fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
                display: 'block', marginBottom: 'clamp(1.2rem, 2vw, 2rem)',
                fontFamily: "'Inter', monospace",
              }}>
                What we do best
              </span>

              <h1 className="svc-headline" style={{
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 200,
                color: '#e8e4df', letterSpacing: '-0.04em', lineHeight: 1.02,
                margin: 0,
              }}>
                Strategy.
                <br />
                Design.
                <br />
                <span style={{ color: '#D4A853' }}>Code.</span>
              </h1>
            </div>

            {/* Right: service count + tagline, hidden on mobile */}
            <div className="svc-hero-right" style={{ textAlign: 'right', paddingBottom: '0.3rem' }}>
              <span className="svc-sub-text" style={{
                fontSize: 'clamp(4rem, 8vw, 6rem)', fontWeight: 100,
                color: 'rgba(255, 255, 255, 0.06)',
                lineHeight: 1, display: 'block',
                letterSpacing: '-0.05em',
                fontFamily: "'Inter', sans-serif",
              }}>
                07
              </span>
              <span style={{
                fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(212, 168, 83, 0.5)',
                fontFamily: "'Inter', monospace",
              }}>
                Services
              </span>
            </div>
          </div>

          {/* Accent line */}
          <div style={{
            marginTop: 'clamp(2.5rem, 4vw, 4rem)',
            width: '100%', height: '1px',
            background: 'linear-gradient(90deg, rgba(212, 168, 83, 0.25), rgba(255,255,255,0.04) 60%, transparent)',
          }} />

          {/* Subtle description below the line */}
          <p style={{
            fontSize: '0.82rem', lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.3)',
            fontWeight: 400, margin: 'clamp(1.2rem, 2vw, 1.8rem) 0 0 0',
            maxWidth: '420px',
          }}>
            End-to-end technology services  from the first wireframe to production deployment and beyond.
          </p>
        </div>

        {/* Responsive: stack on mobile */}
        <style>{`
          @media (max-width: 640px) {
            .svc-hero [style*="grid-template-columns: 1fr auto"] {
              grid-template-columns: 1fr !important;
            }
            .svc-hero-right {
              text-align: left !important;
              margin-top: -0.5rem;
            }
          }
        `}</style>
      </div>

      {/* ===== SERVICE SHOWCASES ===== */}
      {servicesData.map((service, i) => (
        <ServiceShowcase
          key={service.number}
          service={service}
          index={i}
          isReversed={i % 2 !== 0}
        />
      ))}

      {/* ===== CTA ===== */}
      <div className="svc-cta" style={{
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        textAlign: 'center', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.15), transparent)',
        }} />

        <div style={{
          position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: '500px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(212, 168, 83, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300,
            color: '#e8e4df', letterSpacing: '-0.03em', lineHeight: 1.15,
            margin: '0 0 1.5rem 0',
          }}>
            Have a project
            <br />
            in mind?
          </h2>
          <p style={{
            fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.35)',
            margin: '0 0 2.5rem 0', fontWeight: 400,
          }}>
            Tell us about your idea and let's build something remarkable together.
          </p>
          <button
            onClick={() => navigate('/contactus')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.7rem 1.6rem', borderRadius: '50px',
              border: '1px solid rgba(212, 168, 83, 0.3)',
              backgroundColor: 'transparent', color: '#D4A853',
              fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'pointer',
              transition: 'all 0.3s ease', fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = 'rgba(212, 168, 83, 0.1)';
              e.target.style.borderColor = 'rgba(212, 168, 83, 0.5)';
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = 'rgba(212, 168, 83, 0.3)';
            }}
          >
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              backgroundColor: '#D4A853', display: 'inline-block',
            }} />
            Start Your Project
            <span style={{ fontSize: '0.75rem' }}>↗</span>
          </button>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .svc-showcase [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          .svc-number {
            font-size: clamp(4rem, 15vw, 6rem) !important;
            text-align: left !important;
            margin-bottom: -1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;
