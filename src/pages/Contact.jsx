import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import PageSEO from '../components/PageSEO';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Contact = () => {
  const container = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    // Hero
    gsap.from('.ct-label', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.ct-headline', { y: 60, opacity: 0, duration: 1, delay: 0.15, ease: 'power3.out' });
    gsap.from('.ct-sub', { y: 30, opacity: 0, duration: 0.8, delay: 0.35, ease: 'power3.out' });

    // Cards
    gsap.utils.toArray('.ct-card').forEach((el, i) => {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 0.7, delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      });
    });

    // Info section
    gsap.from('.ct-info', {
      y: 40, opacity: 0, duration: 0.8,
      scrollTrigger: { trigger: '.ct-info', start: 'top 85%' },
    });
  }, { scope: container });

  return (
    <div ref={container} style={{ backgroundColor: '#0a0a0a', fontFamily: "'Inter', 'Outfit', sans-serif" }}>
      <PageSEO
        title="Contact Us — Relyce Infotech | Get a Free Consultation"
        description="Get in touch with Relyce Infotech for a free project consultation. Reach us at +91 9787963935 or relyceinfotech@gmail.com. Based in Chennai, India — serving clients worldwide."
        canonical="https://relyceinfotech.com/contactus"
        jsonLd={[{
          '@type': 'ContactPage',
          'name': 'Contact Relyce Infotech',
          'description': 'Get in touch with Relyce Infotech for IT consulting, web development, app development, and AI solutions.',
          'url': 'https://relyceinfotech.com/contactus',
        }]}
      />

      {/* ===== HERO ===== */}
      <div style={{
        padding: 'clamp(8rem, 15vw, 14rem) 0 clamp(4rem, 7vw, 6rem)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'end',
          }}>
            <div>
              <span className="ct-label" style={{
                fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
                display: 'block', marginBottom: 'clamp(1.2rem, 2vw, 2rem)',
                fontFamily: "'Inter', monospace",
              }}>
                Get in touch
              </span>

              <h1 className="ct-headline" style={{
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 200,
                color: '#e8e4df', letterSpacing: '-0.04em', lineHeight: 1.02,
                margin: 0,
              }}>
                Let's
                <br />
                <span style={{ color: '#D4A853' }}>talk.</span>
              </h1>
            </div>

            <div className="ct-hero-right" style={{ textAlign: 'right', paddingBottom: '0.3rem' }}>
              <span className="ct-sub" style={{
                fontSize: 'clamp(4rem, 8vw, 6rem)', fontWeight: 100,
                color: 'rgba(255, 255, 255, 0.06)',
                lineHeight: 1, display: 'block',
                letterSpacing: '-0.05em',
                fontFamily: "'Inter', sans-serif",
              }}>
                ↗
              </span>
            </div>
          </div>

          <div style={{
            marginTop: 'clamp(2.5rem, 4vw, 4rem)',
            width: '100%', height: '1px',
            background: 'linear-gradient(90deg, rgba(212, 168, 83, 0.25), rgba(255,255,255,0.04) 60%, transparent)',
          }} />

          <p style={{
            fontSize: '0.82rem', lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.3)', fontWeight: 400,
            margin: 'clamp(1.2rem, 2vw, 1.8rem) 0 0 0', maxWidth: '420px',
          }}>
            Whether you have a project idea, a question, or just want to explore possibilities — we're ready.
          </p>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .ct-hero-right { display: none !important; }
          }
        `}</style>
      </div>

      {/* ===== WHAT WE OFFER — Editorial Layout ===== */}
      <div style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.15), transparent)',
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}>
          <div className="ct-offer-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'start',
          }}>
            {/* Left: Label + heading */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ width: '40px', height: '1px', backgroundColor: '#D4A853', display: 'inline-block' }} />
                <span style={{
                  fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: '#D4A853',
                }}>
                  What We Offer
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300,
                color: '#e8e4df', margin: '0 0 1.2rem 0',
                letterSpacing: '-0.03em', lineHeight: 1.1,
              }}>
                Start here,
                <br />
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>go anywhere</span>
              </h2>
              <p style={{
                fontSize: '0.85rem', lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.3)', margin: 0,
                maxWidth: '360px',
              }}>
                Whether you're starting fresh or scaling up — we have a path for you.
              </p>
            </div>

            {/* Right: Stacked cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                {
                  num: "01", title: "Free Consultation",
                  desc: "Expert advice on your project with zero obligations. Let's explore what's possible.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  ),
                },
                {
                  num: "02", title: "Project Discussion",
                  desc: "Have a specific idea? We'll map out scope, timeline, and the right tech stack.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  ),
                },
                {
                  num: "03", title: "Ongoing Support",
                  desc: "Already a client? We're here for maintenance, upgrades, and scaling.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="ct-card"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.2rem',
                    padding: '1.4rem 1.5rem',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    backgroundColor: 'rgba(255, 255, 255, 0.015)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(212, 168, 83, 0.25)';
                    e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.04)';
                    e.currentTarget.style.transform = 'translateX(6px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.015)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {/* Icon container */}
                  <div style={{
                    flexShrink: 0,
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    color: 'rgba(212, 168, 83, 0.6)',
                  }}>
                    {card.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      marginBottom: '0.4rem',
                    }}>
                      <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 500,
                        color: 'rgba(212, 168, 83, 0.4)',
                        letterSpacing: '0.05em',
                        fontFamily: "'Inter', monospace",
                      }}>
                        {card.num}
                      </span>
                      <h3 style={{
                        fontSize: '0.95rem', fontWeight: 500,
                        color: '#e8e4df', margin: 0,
                        letterSpacing: '-0.02em',
                      }}>
                        {card.title}
                      </h3>
                    </div>
                    <p style={{
                      fontSize: '0.8rem', lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.3)', margin: 0,
                    }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .ct-offer-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
          }
        `}</style>
      </div>

      {/* ===== DIRECT CONTACT ===== */}
      <div className="ct-info" style={{ padding: 'clamp(5rem, 10vw, 8rem) 0', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.15), transparent)',
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'start',
          }}>
            {/* Left: info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ width: '40px', height: '1px', backgroundColor: '#D4A853', display: 'inline-block' }} />
                <span style={{
                  fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: '#D4A853',
                }}>
                  Reach Us
                </span>
              </div>

              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300,
                color: '#e8e4df', margin: '0 0 clamp(2rem, 3vw, 3rem) 0',
                letterSpacing: '-0.03em', lineHeight: 1.1,
              }}>
                Direct
                <br />
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>contact</span>
              </h2>

              {/* Contact details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <a href="tel:+919787963935" style={{
                  color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                  fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.8rem',
                  transition: 'color 0.3s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#D4A853'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +91 9787963935
                </a>
                <a href="mailto:relyceinfotech@gmail.com" style={{
                  color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                  fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.8rem',
                  transition: 'color 0.3s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#D4A853'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  relyceinfotech@gmail.com
                </a>
                <span style={{
                  color: 'rgba(255,255,255,0.35)', fontSize: '0.88rem',
                  display: 'flex', alignItems: 'center', gap: '0.8rem',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Chennai, Tamil Nadu, India
                </span>
              </div>
            </div>

            {/* Right: CTA to form */}
            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              alignItems: 'flex-start', paddingTop: 'clamp(2rem, 4vw, 4rem)',
            }}>
              <p style={{
                fontSize: '0.88rem', lineHeight: 1.75,
                color: 'rgba(255, 255, 255, 0.35)', margin: '0 0 2rem 0',
                maxWidth: '400px',
              }}>
                Ready to start? Fill out our project form and we'll get back to you within 24 hours 
                to discuss scope, timeline, and next steps.
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
                Start a Project
                <span style={{ fontSize: '0.75rem' }}>↗</span>
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .ct-info [style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 640px) {
            [style*="grid-template-columns: repeat(3"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Contact;
