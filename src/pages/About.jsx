import React, { useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import PageSEO from '../components/PageSEO';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const teamMembers = [
  { name: "UKENTHIRAN A", role: "Founder & CEO", initial: "U" },
  { name: "TAMIZHARUVI P", role: "CTO", initial: "T" },
  { name: "DHARSHAN L", role: "COO", initial: "D" },
  { name: "GOHULAKANNAN K", role: "CMO", initial: "G" },
  { name: "KARTHIBAN R", role: "CPO", initial: "K" },
  { name: "NAVEENKUMAR S", role: "Lead AI Engineer", initial: "N" },
  { name: "VETRI VIVIAN J", role: "Full Stack Developer", initial: "V" },
  { name: "VISHAL T", role: "Full Stack Developer", initial: "V" },
];

const timelineData = [
  { date: "Sep 2024", title: "The Genesis", description: "Founded with a vision to bridge the gap between ideas and technology, starting with a small team of passionate developers." },
  { date: "Dec 2024", title: "First Major Delivery", description: "Successfully delivered a large scale e commerce platform, proving our capability in complex, high stakes development." },
  { date: "Jan 2025", title: "Team Expansion", description: "Grew our team and expanded services to include mobile app development, AI engineering, and cloud solutions." },
  { date: "Sep 2025", title: "AI Innovation", description: "Launched our proprietary AI driven analytics tool, helping businesses make smarter, data backed decisions at scale." },
];

const processSteps = [
  { number: "01", title: "Discover", description: "Deep dive into your vision, goals, and market landscape to define the perfect strategy." },
  { number: "02", title: "Design", description: "Craft intuitive interfaces and robust architecture that align with your brand identity." },
  { number: "03", title: "Develop", description: "Build scalable, production ready solutions with clean code and modern best practices." },
  { number: "04", title: "Deploy", description: "Launch with confidence  seamless deployment, monitoring, and ongoing support." },
];

const values = [
  { title: "Innovation First", description: "We explore emerging technologies relentlessly to keep you ahead of the curve." },
  { title: "Client Centric", description: "Your success drives every decision. We tailor solutions to your unique challenges." },
  { title: "Uncompromising Quality", description: "Excellence isn't negotiable. Every line of code, every pixel, is crafted with care." },
];

const About = () => {
  const container = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    // Hero section
    gsap.from('.about-label', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-hero', start: 'top 80%' },
    });
    gsap.from('.about-headline', {
      y: 60, opacity: 0, duration: 1, delay: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-hero', start: 'top 80%' },
    });
    gsap.from('.about-sub', {
      y: 30, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-hero', start: 'top 80%' },
    });

    // Values
    gsap.utils.toArray('.value-item').forEach((el, i) => {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 0.8, delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      });
    });

    // Timeline
    gsap.utils.toArray('.tl-item').forEach((el, i) => {
      gsap.from(el, {
        x: i % 2 === 0 ? -60 : 60, opacity: 0, duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });

    // Timeline line grow
    gsap.from('.tl-line', {
      scaleY: 0, transformOrigin: 'top center', ease: 'none',
      scrollTrigger: { trigger: '.journey-section', start: 'top 60%', end: 'bottom 70%', scrub: true },
    });

    // Process steps
    gsap.utils.toArray('.process-step').forEach((el, i) => {
      gsap.from(el, {
        y: 50, opacity: 0, duration: 0.8, delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      });
    });

    // Team section
    gsap.from('.team-label', {
      y: 30, opacity: 0, duration: 0.8,
      scrollTrigger: { trigger: '.team-section', start: 'top 80%' },
    });
    gsap.from('.team-title', {
      y: 50, opacity: 0, duration: 1, delay: 0.15,
      scrollTrigger: { trigger: '.team-section', start: 'top 80%' },
    });
    gsap.utils.toArray('.team-member').forEach((el, i) => {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 0.7, delay: i * 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.team-grid', start: 'top 88%' },
      });
    });
  }, { scope: container });

  // JSON-LD structured data for SEO
  const aboutJsonLd = useMemo(() => [
    {
      "@type": "AboutPage",
      "name": "About Relyce Infotech",
      "description": "Relyce Infotech is a technology company founded in 2024 in Chennai, India. We specialize in web development, app development, AI solutions, digital marketing, and IT consulting for startups and SMEs.",
      "url": "https://relyceinfotech.com/relyce",
      "mainEntity": {
        "@type": "Organization",
        "name": "Relyce Infotech",
        "url": "https://relyceinfotech.com",
        "foundingDate": "2024-09",
        "foundingLocation": "Chennai, Tamil Nadu, India",
        "numberOfEmployees": { "@type": "QuantitativeValue", "value": 20 },
      },
    },
    // Individual Person schemas — so Google can answer "Who is the CTO/CEO/COO of Relyce Infotech?"
    ...teamMembers.map((member) => ({
      "@type": "Person",
      "name": member.name.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' '),
      "jobTitle": member.role,
      "worksFor": {
        "@type": "Organization",
        "name": "Relyce Infotech",
        "url": "https://relyceinfotech.com",
      },
    })),
  ], []);

  return (
    <div ref={container} style={{ backgroundColor: '#0a0a0a', fontFamily: "'Inter', 'Outfit', sans-serif" }}>
      <PageSEO
        title="About Us — Relyce Infotech | Our Team, Mission & Journey"
        description="Meet the team behind Relyce Infotech. Founded in 2024 in Chennai, our team of engineers, designers, and strategists build premium digital products. Learn about our CEO, CTO, COO, and the entire team."
        canonical="https://relyceinfotech.com/relyce"
        jsonLd={aboutJsonLd}
      />

      {/* ===== HERO ===== */}
      <div className="about-hero" style={{
        padding: 'clamp(8rem, 15vw, 14rem) 0 clamp(4rem, 7vw, 6rem)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}>

          {/* Split layout: heading left, since badge right */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'end',
          }}>

            {/* Left: heading group */}
            <div>
              <span className="about-label" style={{
                fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
                display: 'block', marginBottom: 'clamp(1.2rem, 2vw, 2rem)',
                fontFamily: "'Inter', monospace",
              }}>
                Who we are
              </span>

              <h1 className="about-headline" style={{
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 200,
                color: '#e8e4df', letterSpacing: '-0.04em', lineHeight: 1.02,
                margin: 0,
              }}>
                Think.
                <br />
                Build.
                <br />
                <span style={{ color: '#D4A853' }}>Ship.</span>
              </h1>
            </div>

            {/* Right: founded year + tagline */}
            <div className="about-hero-right" style={{ textAlign: 'right', paddingBottom: '0.3rem' }}>
              <span className="about-sub" style={{
                fontSize: 'clamp(4rem, 8vw, 6rem)', fontWeight: 100,
                color: 'rgba(255, 255, 255, 0.06)',
                lineHeight: 1, display: 'block',
                letterSpacing: '-0.05em',
                fontFamily: "'Inter', sans-serif",
              }}>
                '24
              </span>
              <span style={{
                fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(212, 168, 83, 0.5)',
                fontFamily: "'Inter', monospace",
              }}>
                Founded
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
            maxWidth: '450px',
          }}>
            A team of engineers, designers, and strategists turning bold ideas into digital products that perform.
          </p>
        </div>

        {/* Responsive */}
        <style>{`
          @media (max-width: 640px) {
            .about-hero [style*="grid-template-columns: 1fr auto"] {
              grid-template-columns: 1fr !important;
            }
            .about-hero-right {
              text-align: left !important;
              margin-top: -0.5rem;
            }
          }
        `}</style>
      </div>

      {/* ===== VALUES ===== */}
      <div style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.15), transparent)',
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(2rem, 4vw, 4rem)',
          }}>
            {values.map((val, i) => (
              <div key={i} className="value-item" style={{
                paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              }}>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.05em',
                  color: '#D4A853', display: 'block', marginBottom: '0.8rem',
                  fontFamily: "'Inter', monospace",
                }}>
                  0{i + 1}
                </span>
                <h3 style={{
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', fontWeight: 500,
                  color: '#e8e4df', margin: '0 0 0.6rem 0',
                  letterSpacing: '-0.02em',
                }}>
                  {val.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem', lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.35)', margin: 0, fontWeight: 400,
                }}>
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Responsive: stack on mobile */}
        <style>{`
          @media (max-width: 640px) {
            .value-item { grid-column: span 3 !important; }
          }
        `}</style>
      </div>

      {/* ===== OUR JOURNEY (TIMELINE) ===== */}
      <div className="journey-section" style={{
        padding: 'clamp(5rem, 10vw, 9rem) 0', position: 'relative',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}>
          {/* Section header */}
          <div style={{ marginBottom: 'clamp(4rem, 6vw, 6rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ width: '40px', height: '1px', backgroundColor: '#D4A853', display: 'inline-block' }} />
              <span style={{
                fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: '#D4A853',
              }}>
                Our Journey
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300,
              color: '#e8e4df', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1,
            }}>
              From vision to
              <br />
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>reality</span>
            </h2>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            {/* Vertical line */}
            <div className="tl-line" style={{
              position: 'absolute', left: '3px', top: 0, bottom: 0,
              width: '1px',
              background: 'linear-gradient(180deg, rgba(212, 168, 83, 0.4), rgba(212, 168, 83, 0.05))',
            }} />

            {timelineData.map((item, i) => (
              <div key={i} className="tl-item" style={{
                position: 'relative', paddingBottom: i < timelineData.length - 1 ? 'clamp(3rem, 5vw, 4.5rem)' : 0,
                paddingLeft: 'clamp(1.5rem, 3vw, 2.5rem)',
              }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: '-4px', top: '6px',
                  width: '9px', height: '9px', borderRadius: '50%',
                  backgroundColor: '#D4A853',
                  boxShadow: '0 0 12px rgba(212, 168, 83, 0.3)',
                }} />

                <span style={{
                  fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'rgba(212, 168, 83, 0.7)',
                  display: 'block', marginBottom: '0.5rem',
                  fontFamily: "'Inter', monospace",
                }}>
                  {item.date}
                </span>
                <h3 style={{
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 500,
                  color: '#e8e4df', margin: '0 0 0.5rem 0',
                  letterSpacing: '-0.02em',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem', lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.35)', margin: 0, maxWidth: '500px',
                  fontWeight: 400,
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== OUR PROCESS — Horizontal Step Flow ===== */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) 0', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.15), transparent)',
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}>
          {/* Section header */}
          <div style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ width: '40px', height: '1px', backgroundColor: '#D4A853', display: 'inline-block' }} />
              <span style={{
                fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: '#D4A853',
              }}>
                Our Process
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300,
              color: '#e8e4df', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1,
            }}>
              Ideas to impact,
              <br />
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>in four steps</span>
            </h2>
          </div>

          {/* Horizontal flow */}
          <div className="process-flow" style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 0,
            position: 'relative',
          }}>
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="process-step"
                style={{
                  flex: 1,
                  position: 'relative',
                  paddingRight: i < processSteps.length - 1 ? '2rem' : 0,
                }}
              >
                {/* Step dot */}
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: '2px solid rgba(212, 168, 83, 0.5)',
                  backgroundColor: '#0a0a0a',
                  position: 'relative',
                  zIndex: 2,
                  marginBottom: '1.5rem',
                }} />

                {/* Connecting line to next step */}
                {i < processSteps.length - 1 && (
                  <div className="process-connector" style={{
                    position: 'absolute',
                    top: '5px',
                    left: '12px',
                    right: '0',
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(212, 168, 83, 0.35), rgba(212, 168, 83, 0.08))',
                    transformOrigin: 'left center',
                    zIndex: 1,
                  }} />
                )}

                {/* Number */}
                <span style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 200,
                  color: 'rgba(212, 168, 83, 0.12)', display: 'block',
                  lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '0.8rem',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {step.number}
                </span>

                {/* Title */}
                <h3 style={{
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', fontWeight: 500,
                  color: '#e8e4df', margin: '0 0 0.6rem 0',
                  letterSpacing: '-0.02em',
                }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.82rem', lineHeight: 1.65,
                  color: 'rgba(255, 255, 255, 0.3)', margin: 0, fontWeight: 400,
                  maxWidth: '240px',
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Responsive */}
          <style>{`
            @media (max-width: 768px) {
              .process-flow {
                flex-direction: column !important;
                gap: 0 !important;
              }
              .process-step {
                padding-right: 0 !important;
                padding-left: 2rem !important;
                padding-bottom: 2.5rem !important;
              }
              .process-step:last-child {
                padding-bottom: 0 !important;
              }
              .process-connector {
                top: 12px !important;
                left: 5px !important;
                right: auto !important;
                width: 1px !important;
                height: calc(100% + 0.5rem) !important;
                background: linear-gradient(180deg, rgba(212, 168, 83, 0.35), rgba(212, 168, 83, 0.08)) !important;
              }
              .process-step > div:first-child {
                position: absolute !important;
                left: 0 !important;
              }
            }
          `}</style>
        </div>
      </div>

      {/* ===== TEAM — Interactive Cards ===== */}
      <div className="team-section" style={{ padding: 'clamp(5rem, 10vw, 9rem) 0', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.15), transparent)',
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}>
          {/* Section header */}
          <div style={{ marginBottom: 'clamp(4rem, 6vw, 6rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ width: '40px', height: '1px', backgroundColor: '#D4A853', display: 'inline-block' }} />
              <span className="team-label" style={{
                fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: '#D4A853',
              }}>
                Our Team
              </span>
            </div>
            <h2 className="team-title" style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300,
              color: '#e8e4df', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1,
            }}>
              The minds behind
              <br />
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>the craft</span>
            </h2>
          </div>

          {/* Team grid — interactive cards */}
          <div className="team-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(0.8rem, 1.5vw, 1.2rem)',
          }}>
            {teamMembers.map((member, i) => {
              const TeamCard = () => {
                const [hovered, setHovered] = React.useState(false);
                return (
                  <div
                    className="team-member"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                      position: 'relative',
                      borderRadius: '16px',
                      border: `1px solid ${hovered ? 'rgba(212, 168, 83, 0.25)' : 'rgba(255, 255, 255, 0.05)'}`,
                      backgroundColor: hovered ? 'rgba(20, 18, 14, 0.9)' : 'rgba(255, 255, 255, 0.015)',
                      padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                      cursor: 'default',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                      overflow: 'hidden',
                      minHeight: '180px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Top amber glow */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '20%',
                      right: '20%',
                      height: '1px',
                      background: hovered
                        ? 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.4), transparent)'
                        : 'transparent',
                      transition: 'all 0.5s ease',
                    }} />

                    {/* Large initial */}
                    <div style={{
                      fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                      fontWeight: 200,
                      color: hovered ? 'rgba(212, 168, 83, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      transition: 'color 0.4s ease',
                      marginBottom: '1rem',
                    }}>
                      {member.initial}
                    </div>

                    {/* Name + Role */}
                    <div>
                      <h3 style={{
                        fontSize: 'clamp(0.72rem, 1vw, 0.82rem)',
                        fontWeight: 600,
                        color: hovered ? '#ffffff' : '#e8e4df',
                        margin: '0 0 0.3rem 0',
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                        lineHeight: 1.3,
                        transition: 'color 0.3s ease',
                      }}>
                        {member.name}
                      </h3>
                      <p style={{
                        fontSize: '0.7rem',
                        color: hovered ? '#D4A853' : 'rgba(212, 168, 83, 0.5)',
                        margin: 0,
                        fontWeight: 500,
                        letterSpacing: '0.04em',
                        transition: 'color 0.3s ease',
                      }}>
                        {member.role}
                      </p>
                    </div>

                    {/* Bottom ambient glow */}
                    <div style={{
                      position: 'absolute',
                      bottom: '-30%',
                      left: '10%',
                      right: '10%',
                      height: '60%',
                      background: hovered
                        ? 'radial-gradient(ellipse at center, rgba(212, 168, 83, 0.04) 0%, transparent 70%)'
                        : 'transparent',
                      pointerEvents: 'none',
                      transition: 'all 0.5s ease',
                    }} />
                  </div>
                );
              };
              return <TeamCard key={member.name} />;
            })}
          </div>

          {/* Responsive */}
          <style>{`
            @media (max-width: 768px) {
              .team-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: 400px) {
              .team-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </div>
      </div>

      {/* ===== CTA SECTION ===== */}
      <div style={{
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        position: 'relative',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.15), transparent)',
        }} />

        {/* Subtle ambient glow */}
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
            Ready to build
            <br />
            something great?
          </h2>
          <p style={{
            fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.35)',
            margin: '0 0 2.5rem 0', fontWeight: 400,
          }}>
            Let's turn your vision into reality. Get in touch and let's start the conversation.
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
            Get In Touch
            <span style={{ fontSize: '0.75rem' }}>↗</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default About;
