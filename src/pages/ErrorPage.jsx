import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle ambient glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(212, 168, 83, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Large faded 404 */}
      <span style={{
        fontSize: 'clamp(8rem, 25vw, 16rem)',
        fontWeight: 100,
        color: 'rgba(212, 168, 83, 0.06)',
        lineHeight: 0.85,
        letterSpacing: '-0.06em',
        userSelect: 'none',
        position: 'absolute',
        fontFamily: "'Inter', sans-serif",
      }}>
        404
      </span>

      {/* Content */}
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 300,
          color: '#e8e4df',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          margin: '0 0 1rem 0',
        }}>
          Page not
          <br />
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>found</span>
        </h1>

        <p style={{
          fontSize: '0.85rem',
          lineHeight: 1.7,
          color: 'rgba(255, 255, 255, 0.3)',
          margin: '0 0 2.5rem 0',
          maxWidth: '350px',
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate('/')}
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
          Go Home
          <span style={{ fontSize: '0.75rem' }}>↗</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
