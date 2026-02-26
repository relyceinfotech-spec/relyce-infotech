import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { db, storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { Helmet } from "react-helmet";

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
        Uploading...
      </span>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const domainOptions = [
  "Web Development", "App Development", "Software Development", "Cloud Computing",
  "Digital Marketing & Graphic Design", "Data Analysis", "AI Engineer",
];

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  fullName: z.string().min(1, "Full name is required"),
  college: z.string().min(1, "College name is required"),
  phone: z.string().min(10, "Phone number is required"),
  contactMethod: z.enum(["Email", "Phone", "WhatsApp"], {
    errorMap: () => ({ message: "Select a contact method" }),
  }),
  domain: z.string().min(1, "Select a preferred domain"),
  linkedin: z.string().url("Enter a valid LinkedIn URL").min(1, "LinkedIn URL is required"),
  aboutYou: z.string().min(10, "Please tell us about yourself (min 10 characters)"),
  whyInternship: z.string().min(10, "Please explain why you want this internship (min 10 characters)"),
});

// --- Shared Styles ---
const inputStyle = {
  width: '100%', padding: '0.75rem 0',
  backgroundColor: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#e8e4df', fontSize: '0.88rem',
  fontFamily: "'Inter', sans-serif", outline: 'none',
  transition: 'border-color 0.3s ease',
};

const labelStyle = {
  fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.3)',
  display: 'block', marginBottom: '0.3rem',
  fontFamily: "'Inter', monospace",
};

const errorStyle = { color: '#D4A853', fontSize: '0.7rem', marginTop: '0.3rem' };

const Internship = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (!file) { setResult("Please upload your resume (PDF only)"); return; }
    if (file.type !== "application/pdf") { setResult("Only PDF files are accepted."); return; }
    if (file.size > 5 * 1024 * 1024) { setResult("Max file size is 5MB."); return; }

    setIsSubmitting(true);
    setResult("");

    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const storageRef = ref(storage, `resumes/${Date.now()}_${safeName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const resumePath = snapshot.ref.fullPath;

      const userRef = await addDoc(collection(db, "users"), {
        fullName: data.fullName, email: data.email,
        lastSubmissionAt: new Date().toISOString()
      });

      await addDoc(collection(userRef, "internship"), {
        ...data, resumePath, submittedAt: new Date().toISOString(),
      });

      setResult("Application submitted successfully.");
      reset();
      setFile(null);
      const el = document.getElementById('resume-upload');
      if (el) el.value = null;
    } catch (err) {
      console.error("Submission Error:", err);
      setResult("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', fontFamily: "'Inter', 'Outfit', sans-serif" }}>
      <Helmet>
        <title>Internship Application | Relyce Infotech</title>
        <meta name="description" content="Apply for an internship at Relyce Infotech and kickstart your career in tech." />
      </Helmet>

      {isSubmitting && <LoadingModal />}

      <div style={{
        padding: 'clamp(8rem, 15vw, 12rem) 0 clamp(5rem, 10vw, 8rem)',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}>

          {/* Header */}
          <span style={{
            fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
            display: 'block', marginBottom: 'clamp(1.2rem, 2vw, 2rem)',
            fontFamily: "'Inter', monospace",
          }}>
            Careers
          </span>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300,
            color: '#e8e4df', letterSpacing: '-0.03em', lineHeight: 1.1,
            margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
          }}>
            Apply for an
            <br />
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>internship</span>
          </h1>

          <p style={{
            fontSize: '0.82rem', lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.3)', fontWeight: 400,
            margin: '0 0 clamp(2.5rem, 4vw, 4rem) 0', maxWidth: '450px',
          }}>
            Join our team and kickstart your career in tech.
          </p>

          <div style={{
            width: '100%', height: '1px', marginBottom: 'clamp(2rem, 3vw, 3rem)',
            background: 'linear-gradient(90deg, rgba(212, 168, 83, 0.25), rgba(255,255,255,0.04) 60%, transparent)',
          }} />

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Row: Name + Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input {...register("fullName")} placeholder="Your name" style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'} />
                {errors.fullName && <p style={errorStyle}>{errors.fullName.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input {...register("email")} placeholder="your@email.com" style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'} />
                {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
              </div>
            </div>

            {/* Row: College + Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              <div>
                <label style={labelStyle}>College / Institute *</label>
                <input {...register("college")} placeholder="Your college" style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'} />
                {errors.college && <p style={errorStyle}>{errors.college.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Phone *</label>
                <input {...register("phone")} type="tel" placeholder="+91 98765 43210" style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'} />
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
                    fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', cursor: 'pointer',
                  }}>
                    <input type="radio" value={method} {...register("contactMethod")} style={{ accentColor: '#D4A853' }} />
                    {method}
                  </label>
                ))}
              </div>
              {errors.contactMethod && <p style={errorStyle}>{errors.contactMethod.message}</p>}
            </div>

            {/* Domain */}
            <div>
              <label style={labelStyle}>Preferred Domain *</label>
              <select {...register("domain")} style={{
                ...inputStyle,
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23D4A853' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0 center',
                cursor: 'pointer',
              }}
                onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
              >
                <option value="" style={{ backgroundColor: '#0a0a0a' }}>-- Select a Domain --</option>
                {domainOptions.map(d => (
                  <option key={d} value={d} style={{ backgroundColor: '#0a0a0a' }}>{d}</option>
                ))}
              </select>
              {errors.domain && <p style={errorStyle}>{errors.domain.message}</p>}
            </div>

            {/* LinkedIn */}
            <div>
              <label style={labelStyle}>LinkedIn Profile *</label>
              <input {...register("linkedin")} placeholder="https://linkedin.com/in/..." style={inputStyle}
                onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'} />
              {errors.linkedin && <p style={errorStyle}>{errors.linkedin.message}</p>}
            </div>

            {/* About You */}
            <div>
              <label style={labelStyle}>Tell us about yourself *</label>
              <textarea {...register("aboutYou")} placeholder="Skills, experience, interests..." rows={3}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'} />
              {errors.aboutYou && <p style={errorStyle}>{errors.aboutYou.message}</p>}
            </div>

            {/* Why Internship */}
            <div>
              <label style={labelStyle}>Why this internship? *</label>
              <textarea {...register("whyInternship")} placeholder="What excites you about this opportunity..." rows={3}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => e.target.style.borderBottomColor = '#D4A853'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'} />
              {errors.whyInternship && <p style={errorStyle}>{errors.whyInternship.message}</p>}
            </div>

            {/* Resume Upload */}
            <div>
              <label style={labelStyle}>Resume (PDF only) *</label>
              <div style={{
                marginTop: '0.5rem', padding: '1rem',
                border: '1px dashed rgba(255, 255, 255, 0.1)',
                borderRadius: '8px', textAlign: 'center',
                transition: 'border-color 0.3s ease',
              }}>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{
                    fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
                {file && (
                  <p style={{ fontSize: '0.72rem', color: 'rgba(212,168,83,0.7)', marginTop: '0.5rem' }}>
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div style={{
              textAlign: 'center', paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            }}>
              <p style={{
                fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(212, 168, 83, 0.6)',
                marginBottom: '0.6rem',
              }}>
                Follow us for updates
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                {[
                  { name: "LinkedIn", url: "https://www.linkedin.com/company/relyce-infotech/" },
                  { name: "Instagram", url: "https://www.instagram.com/relyce_infotech/" },
                  { name: "WhatsApp", url: "https://chat.whatsapp.com/Faseq5B8hWgAjDdDpmhntt" },
                ].map(link => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                    style={{
                      fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)',
                      textDecoration: 'none', transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={e => e.target.style.color = '#D4A853'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
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
            <button type="submit" disabled={isSubmitting} style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.6rem', padding: '0.85rem 2rem', borderRadius: '50px',
              border: '1px solid rgba(212, 168, 83, 0.4)',
              backgroundColor: 'transparent', color: '#D4A853',
              fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'pointer',
              transition: 'all 0.3s ease', fontFamily: "'Inter', sans-serif",
              width: '100%', opacity: isSubmitting ? 0.6 : 1,
            }}
              onMouseEnter={e => { if (!isSubmitting) { e.target.style.backgroundColor = 'rgba(212, 168, 83, 0.1)'; e.target.style.borderColor = 'rgba(212, 168, 83, 0.6)'; } }}
              onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.borderColor = 'rgba(212, 168, 83, 0.4)'; }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D4A853', display: 'inline-block' }} />
              Submit Application
              <span style={{ fontSize: '0.75rem' }}>↗</span>
            </button>
          </form>
        </div>

        <style>{`
          @media (max-width: 640px) {
            form [style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
          input::placeholder, textarea::placeholder {
            color: rgba(255, 255, 255, 0.15);
            font-family: 'Inter', sans-serif;
          }
          select option { background-color: #0a0a0a; color: #e8e4df; }
        `}</style>
      </div>
    </div>
  );
};

export default Internship;
