import React, { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";

// --- SVG Icon Components ---
const ProjectIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const SatisfactionIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095a2 2 0 00-1.736.97L7.455 8.194A2 2 0 007 9.508V20" />
  </svg>
);

const SupportIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const TeamIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

// --- Stat Orb Component ---
const StatOrb = ({ icon, value, suffix, label, delay }) => {
  return (
    <div style={{
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '220px',
      padding: '2.5rem 1.5rem',
      position: 'relative',
    }}>
      {/* Glowing ring */}
      <div style={{
        position: 'absolute',
        inset: '10px',
        borderRadius: '20px',
        border: '1px solid rgba(212, 168, 83, 0.1)',
        background: 'radial-gradient(ellipse at center, rgba(212, 168, 83, 0.03) 0%, transparent 70%)',
        transition: 'all 0.5s ease',
        pointerEvents: 'none',
      }} />

      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '30%',
        right: '30%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.25), transparent)',
      }} />

      {/* Icon */}
      <div style={{
        color: 'rgba(212, 168, 83, 0.5)',
        marginBottom: '1rem',
      }}>
        {icon}
      </div>

      {/* Value */}
      <p
        className="stat-number"
        data-label={label}
        style={{
          fontSize: 'clamp(2.2rem, 4vw, 3rem)',
          fontWeight: 600,
          color: '#e8e4df',
          margin: '0 0 0.4rem 0',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        {typeof value === "number" ? `0${suffix}` : value}
      </p>

      {/* Label */}
      <p style={{
        fontSize: '0.75rem',
        lineHeight: 1.5,
        color: 'rgba(255, 255, 255, 0.35)',
        margin: 0,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        textAlign: 'center',
        letterSpacing: '0.03em',
      }}>
        {label}
      </p>
    </div>
  );
};

// --- Separator Dot ---
const SepDot = () => (
  <div style={{
    flexShrink: 0,
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: 'rgba(212, 168, 83, 0.3)',
    margin: '0 1rem',
  }} />
);

// --- Main Component ---
const StatsSection = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const stats = useMemo(
    () => [
      { value: 20, suffix: "+", label: "Projects Completed", icon: <ProjectIcon /> },
      { value: 100, suffix: "%", label: "Client Satisfaction", icon: <SatisfactionIcon /> },
      { value: "24/7", suffix: "", label: "Support Available", icon: <SupportIcon /> },
      { value: 20, suffix: "+", label: "Expert Team Members", icon: <TeamIcon /> },
    ],
    []
  );

  // Number counting animation
  useEffect(() => {
    const elements = containerRef.current.querySelectorAll(".stat-number");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elem = entry.target;
            const targetStat = stats.find((stat) => stat.label === elem.dataset.label);

            if (targetStat && typeof targetStat.value === "number") {
              let counter = { val: 0 };
              gsap.to(counter, {
                val: targetStat.value,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                  elem.textContent = Math.round(counter.val) + targetStat.suffix;
                },
              });
            }
            observer.unobserve(elem);
          }
        });
      },
      { threshold: 0.5 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [stats]);

  // Infinite marquee animation
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate the width of one set of items (half the track) for perfect loop
    const children = track.children;
    let halfWidth = 0;
    for (let i = 0; i < children.length / 2; i++) {
      halfWidth += children[i].offsetWidth;
    }

    const tween = gsap.to(track, {
      x: -halfWidth,
      duration: 25,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % halfWidth)
      }
    });

    // Pause on hover
    const onEnter = () => gsap.to(tween, { timeScale: 0, duration: 0.5 });
    const onLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });
    
    const container = containerRef.current;
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      tween.kill();
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Duplicate items for seamless loop
  const marqueeItems = [...stats, ...stats, ...stats];

  return (
    <div ref={containerRef} style={{
      backgroundColor: '#0a0a0a',
      padding: 'clamp(3rem, 6vw, 5rem) 0',
      overflow: 'hidden',
      position: 'relative',
      cursor: 'default',
    }}>
      {/* Top thin gradient line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '5%',
        right: '5%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.12), transparent)',
      }} />

      {/* Section label */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto 2rem',
        padding: '0 clamp(1.5rem, 4vw, 4rem)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <span style={{
          width: '30px',
          height: '1px',
          backgroundColor: '#D4A853',
          display: 'inline-block',
        }} />
        <span style={{
          fontSize: '0.7rem',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(212, 168, 83, 0.6)',
          fontFamily: "'Inter', sans-serif",
        }}>
          In Numbers
        </span>
      </div>

      {/* Marquee track */}
      <div ref={trackRef} style={{
        display: 'flex',
        alignItems: 'center',
        width: 'max-content',
      }}>
        {marqueeItems.map((stat, index) => (
          <React.Fragment key={index}>
            <StatOrb
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.15}
            />
            <SepDot />
          </React.Fragment>
        ))}
      </div>

      {/* Left fade */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '120px',
        height: '100%',
        background: 'linear-gradient(90deg, #0a0a0a, transparent)',
        pointerEvents: 'none',
        zIndex: 5,
      }} />

      {/* Right fade */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '120px',
        height: '100%',
        background: 'linear-gradient(270deg, #0a0a0a, transparent)',
        pointerEvents: 'none',
        zIndex: 5,
      }} />

      {/* Bottom thin gradient line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '5%',
        right: '5%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.12), transparent)',
      }} />
    </div>
  );
};

export default StatsSection;
