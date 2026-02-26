import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// --- Loading Modal ---
const LoadingModal = () => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 50,
    backgroundColor: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <div style={{
      backgroundColor: 'rgba(20,20,20,0.9)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px', padding: '2.5rem',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
    }}>
      <div style={{
        width: '48px', height: '48px',
        border: '3px solid rgba(255,255,255,0.08)',
        borderTopColor: '#D4A853',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontWeight: 500 }}>
        Submitting...
      </span>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// --- Validation Schema ---
const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  contactMethod: z.enum(["Email", "Phone", "WhatsApp"], {
    errorMap: () => ({ message: "Please select a contact method" }),
  }),
  projectDetails: z.string().min(10, "Please provide at least 10 characters"),
  requirements: z.string().min(10, "Please provide at least 10 characters"),
});

// --- Input Style Helper ---
const inputStyle = {
  width: '100%',
  padding: '0.75rem 0',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#e8e4df',
  fontSize: '0.88rem',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
  transition: 'border-color 0.3s ease',
};

const labelStyle = {
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255, 255, 255, 0.3)',
  display: 'block',
  marginBottom: '0.3rem',
  fontFamily: "'Inter', monospace",
};

const errorStyle = {
  color: '#D4A853',
  fontSize: '0.7rem',
  marginTop: '0.3rem',
};

// --- Main Component ---
const ContactForm = () => {
  const container = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useGSAP(() => {
    gsap.from('.cf-label', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.cf-headline', { y: 60, opacity: 0, duration: 1, delay: 0.15, ease: 'power3.out' });
    gsap.from('.cf-form', { y: 40, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' });
  }, { scope: container });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setResult("");

    try {
      const userRef = await addDoc(collection(db, "users"), {
        fullName: data.fullName,
        email: data.email,
        lastSubmissionAt: new Date().toISOString()
      });

      await addDoc(collection(userRef, "contact"), {
        ...data,
        submittedAt: new Date().toISOString()
      });

      setResult("Submitted successfully. We'll be in touch soon.");
      reset();
    } catch (error) {
      console.error("Submission Error:", error);
      setResult("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={container} style={{ backgroundColor: '#0a0a0a', fontFamily: "'Inter', 'Outfit', sans-serif" }}>
      {isSubmitting && <LoadingModal />}

      {/* ===== HERO + FORM ===== */}
      <div style={{
        padding: 'clamp(8rem, 15vw, 12rem) 0 clamp(5rem, 10vw, 8rem)',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}>

          {/* Header */}
          <span className="cf-label" style={{
            fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
            display: 'block', marginBottom: 'clamp(1.2rem, 2vw, 2rem)',
            fontFamily: "'Inter', monospace",
          }}>
            Contact Form
          </span>

          <h1 className="cf-headline" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300,
            color: '#e8e4df', letterSpacing: '-0.03em', lineHeight: 1.1,
            margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
          }}>
            Tell us about
            <br />
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>your project</span>
          </h1>

          <p style={{
            fontSize: '0.82rem', lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.3)', fontWeight: 400,
            margin: '0 0 clamp(2.5rem, 4vw, 4rem) 0', maxWidth: '450px',
          }}>
            Share your details and we'll get back within 24 hours.
          </p>

          {/* Accent line */}
          <div style={{
            width: '100%', height: '1px', marginBottom: 'clamp(2rem, 3vw, 3rem)',
            background: 'linear-gradient(90deg, rgba(212, 168, 83, 0.25), rgba(255,255,255,0.04) 60%, transparent)',
          }} />

          {/* Form */}
          <form className="cf-form" onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Row: Name + Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  {...register("fullName")}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                />
                {errors.fullName && <p style={errorStyle}>{errors.fullName.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input
                  {...register("email")}
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                />
                {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
              </div>
            </div>

            {/* Row: Company + Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              <div>
                <label style={labelStyle}>Company *</label>
                <input
                  {...register("company")}
                  placeholder="Your company"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                />
                {errors.company && <p style={errorStyle}>{errors.company.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Phone *</label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+91 98765 43210"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                />
                {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
              </div>
            </div>

            {/* Contact Method */}
            <div>
              <label style={labelStyle}>Preferred Contact *</label>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.6rem' }}>
                {["Email", "Phone", "WhatsApp"].map(method => (
                  <label key={method} style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)',
                    cursor: 'pointer',
                  }}>
                    <input
                      type="radio"
                      value={method}
                      {...register("contactMethod")}
                      style={{ accentColor: '#D4A853' }}
                    />
                    {method}
                  </label>
                ))}
              </div>
              {errors.contactMethod && <p style={errorStyle}>{errors.contactMethod.message}</p>}
            </div>

            {/* Project Details */}
            <div>
              <label style={labelStyle}>Project Details *</label>
              <textarea
                {...register("projectDetails")}
                placeholder="Tell us about your project — goals, tech stack, timeline..."
                rows={4}
                style={{
                  ...inputStyle,
                  resize: 'none',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
              />
              {errors.projectDetails && <p style={errorStyle}>{errors.projectDetails.message}</p>}
            </div>

            {/* Requirements */}
            <div>
              <label style={labelStyle}>Additional Requirements *</label>
              <textarea
                {...register("requirements")}
                placeholder="Budget range, deadlines, or anything else..."
                rows={3}
                style={{
                  ...inputStyle,
                  resize: 'none',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
              />
              {errors.requirements && <p style={errorStyle}>{errors.requirements.message}</p>}
            </div>

            {/* Result */}
            {result && (
              <p style={{
                fontSize: '0.82rem', fontWeight: 500, textAlign: 'center',
                color: result.includes('success') ? '#D4A853' : 'rgba(255,180,180,0.8)',
              }}>
                {result}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: '0.6rem', padding: '0.85rem 2rem',
                borderRadius: '50px',
                border: '1px solid rgba(212, 168, 83, 0.4)',
                backgroundColor: 'transparent', color: '#D4A853',
                fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em',
                textTransform: 'uppercase', cursor: 'pointer',
                transition: 'all 0.3s ease', fontFamily: "'Inter', sans-serif",
                width: '100%',
                opacity: isSubmitting ? 0.6 : 1,
              }}
              onMouseEnter={e => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = 'rgba(212, 168, 83, 0.1)';
                  e.target.style.borderColor = 'rgba(212, 168, 83, 0.6)';
                }
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = 'rgba(212, 168, 83, 0.4)';
              }}
            >
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                backgroundColor: '#D4A853', display: 'inline-block',
              }} />
              Submit Inquiry
              <span style={{ fontSize: '0.75rem' }}>↗</span>
            </button>
          </form>
        </div>

        {/* Responsive */}
        <style>{`
          @media (max-width: 640px) {
            .cf-form [style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
          input::placeholder, textarea::placeholder {
            color: rgba(255, 255, 255, 0.15);
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ContactForm;
