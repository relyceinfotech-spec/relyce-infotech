import React from 'react';
import { Link } from 'react-router-dom';

const footerColumns = [
  {
    title: "SERVICES",
    links: [
      { label: "Web Development", href: "#" },
      { label: "Mobile Apps", href: "#" },
      { label: "Cloud Solutions", href: "#" },
      { label: "Digital Marketing", href: "#" },
      { label: "UI/UX Design", href: "#" },
    ],
  },
  {
    title: "PRODUCTS",
    links: [
      { label: "Relyce AI", href: "#" },
      { label: "SaaS Solutions", href: "#" },
      { label: "E-commerce", href: "#" },
      { label: "Custom Software", href: "#" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About Us", href: "/relyce" },
      { label: "Our Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "/contactus" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Blog", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Portfolio", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* LAYER 1: Top — Dark, link columns */}
      <div style={{
        backgroundColor: '#0a0a0a',
        padding: 'clamp(4rem, 8vw, 7rem) 0 clamp(3rem, 5vw, 5rem)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}>
          <div className="footer-links-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(2rem, 4vw, 4rem)',
          }}>
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 style={{
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  color: 'rgba(255, 255, 255, 0.3)',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                }}>
                  {col.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map((link) => (
                    <li key={link.label} style={{ marginBottom: '0.8rem' }}>
                      <Link
                        to={link.href}
                        style={{
                          color: 'rgba(255, 255, 255, 0.65)',
                          textDecoration: 'none',
                          fontSize: '0.88rem',
                          fontWeight: 400,
                          transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={e => e.target.style.color = '#ffffff'}
                        onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.65)'}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LAYER 2: Middle — starts warm gradient transition */}
      <div style={{
        background: 'linear-gradient(180deg, #0d0d0d 0%, #0f0e0c 50%, #14120e 100%)',
        padding: 'clamp(3rem, 5vw, 5rem) 0',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}>
          {/* Contact row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2.5rem',
            marginBottom: 'clamp(2.5rem, 4vw, 4rem)',
          }}>
            <a href="tel:+919787963935" style={{
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#D4A853'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +91 9787963935
            </a>
            <a href="mailto:relyceinfotech@gmail.com" style={{
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#D4A853'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              relyceinfotech@gmail.com
            </a>
            <span style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Chennai, Tamilnadu, India
            </span>
          </div>

          {/* Copyright */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '1.5rem',
          }}>
            <span style={{
              color: 'rgba(255, 255, 255, 0.2)',
              fontSize: '0.75rem',
              fontWeight: 400,
            }}>
              © 2024–2026 Relyce Infotech. All rights reserved.
            </span>
            <span style={{
              color: 'rgba(255, 255, 255, 0.12)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Relyce Infotech
            </span>
          </div>
        </div>
      </div>

      {/* LAYER 3: Bottom — very gradual warm amber fade */}
      <div style={{
        height: 'clamp(200px, 30vw, 350px)',
        background: 'linear-gradient(180deg, #14120e 0%, #1a150d 15%, #201a0f 30%, #2a2012 45%, #352813 55%, #443115 68%, #553a14 80%, #6a4815 90%, #7a5518 100%)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '60%',
          background: 'radial-gradient(ellipse at center bottom, rgba(180, 120, 30, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 400px) {
          .footer-links-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
