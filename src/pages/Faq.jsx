import React, { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

// --- Accordion Item ---
const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.to(el, {
        height: el.scrollHeight,
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => { el.style.height = "auto"; },
      });
    } else {
      gsap.to(el, { height: 0, duration: 0.4, ease: "power3.inOut" });
    }
  }, [isOpen]);

  return (
    <div style={{
      position: 'relative',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    }}>
      <button
        onClick={onClick}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', textAlign: 'left',
          padding: 'clamp(1.2rem, 2vw, 1.5rem) 0',
          backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
        }}
      >
        <span style={{
          fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', fontWeight: 400,
          color: isOpen ? '#e8e4df' : 'rgba(255, 255, 255, 0.55)',
          transition: 'color 0.3s ease',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '-0.01em',
        }}>
          {question}
        </span>
        <span style={{
          fontSize: '1.2rem', color: isOpen ? '#D4A853' : 'rgba(255, 255, 255, 0.15)',
          transition: 'all 0.4s ease',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          display: 'inline-block', flexShrink: 0, marginLeft: '1.5rem',
          fontWeight: 300,
        }}>
          +
        </span>
      </button>

      <div ref={contentRef} style={{ overflow: 'hidden', height: 0 }}>
        <div style={{
          paddingBottom: 'clamp(1.2rem, 2vw, 1.5rem)',
          paddingRight: '2rem',
          fontSize: '0.84rem', lineHeight: 1.7,
          color: 'rgba(255, 255, 255, 0.35)',
          fontFamily: "'Inter', sans-serif",
        }}>
          {answer}
        </div>
      </div>
    </div>
  );
};

// --- Main FAQ ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = useMemo(
    () => [
      {
        category: "About Relyce Infotech",
        questions: [
          { question: "What does Relyce Infotech do?", answer: "We are a full-service IT consulting company providing comprehensive technology solutions. We specialize in website development, mobile app development (iOS & Android), e commerce solutions, and reliable technical and non technical support for businesses of all sizes." },
          { question: "What types of businesses do you work with?", answer: "We proudly serve a diverse range of businesses  from startups and small businesses to mid sized enterprises. We have extensive experience working with clients in retail, healthcare, education, and finance." },
          { question: "Why should I choose Relyce Infotech?", answer: "We differentiate ourselves through our commitment to personalized service, deep technical expertise, and a focus on ROI. We're not just about fixing problems; we're about building lasting partnerships and helping you grow." },
          { question: "Where are you located?", answer: "We are located in Chennai, Tamil Nadu, India. However, we primarily work remotely, allowing us to serve clients globally." },
        ],
      },
      {
        category: "Website Development",
        questions: [
          {
            question: "What types of websites do you build?",
            answer: (
              <ul style={{ paddingLeft: '1.2rem', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '0.4rem' }}><strong style={{ color: 'rgba(255,255,255,0.5)' }}>Static Websites</strong> — Simple, informational websites.</li>
                <li style={{ marginBottom: '0.4rem' }}><strong style={{ color: 'rgba(255,255,255,0.5)' }}>Dynamic Websites</strong> — Content-rich sites with user interaction.</li>
                <li style={{ marginBottom: '0.4rem' }}><strong style={{ color: 'rgba(255,255,255,0.5)' }}>Responsive Websites</strong> — Sites that adapt to all devices.</li>
                <li><strong style={{ color: 'rgba(255,255,255,0.5)' }}>CMS-Based Websites</strong> — Built on platforms like WordPress.</li>
              </ul>
            ),
          },
          { question: "What's the typical website development timeline?", answer: "A simple website might take 2-4 weeks, while a more complex site could take 6-12 weeks or longer. We provide detailed timelines after the initial consultation." },
          { question: "Do you handle website hosting and domain registration?", answer: "Yes, we can manage your hosting and domain registration, or we can integrate with your existing providers." },
          { question: "What is SEO, and do you offer SEO services?", answer: "SEO (Search Engine Optimization) is improving your site's visibility on search engines. We offer SEO consulting and implementation to help you rank higher." },
        ],
      },
      {
        category: "App Development",
        questions: [
          { question: "What platforms do you develop apps for?", answer: "We develop native applications for both iOS and Android, and can also discuss cross-platform options like React Native or Flutter." },
          { question: "How much does it cost to develop a mobile app?", answer: "App development costs vary widely based on complexity. We provide custom quotes after an initial consultation and project scoping." },
          { question: "Do you provide app maintenance and support?", answer: "Yes, we offer ongoing app maintenance and support services, including bug fixes, updates, and feature enhancements." },
        ],
      },
      {
        category: "E-commerce Solutions",
        questions: [
          { question: "What e-commerce platforms do you work with?", answer: "We have extensive experience with Shopify, WooCommerce, Magento, and BigCommerce. We can also build custom solutions." },
          { question: "Do you handle payment gateway integration?", answer: "Yes, we integrate secure payment gateways like Stripe, PayPal, and Authorize.net into your e-commerce store." },
        ],
      },
      {
        category: "Technical & Non-Technical Support",
        questions: [
          {
            question: "What types of technical support do you offer?",
            answer: (
              <ul style={{ paddingLeft: '1.2rem', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '0.4rem' }}>Help Desk Support</li>
                <li style={{ marginBottom: '0.4rem' }}>Network Troubleshooting</li>
                <li style={{ marginBottom: '0.4rem' }}>Server Management</li>
                <li>Cybersecurity Services</li>
              </ul>
            ),
          },
          { question: "What does 'non-technical support' mean?", answer: "This includes assistance with business process optimization, staff training, project management, and strategic technology planning." },
          { question: "Do you offer managed services?", answer: "Yes, we offer comprehensive managed services packages to handle your IT infrastructure and support needs proactively." },
        ],
      },
    ],
    []
  );

  return (
    <div style={{ backgroundColor: '#0a0a0a', fontFamily: "'Inter', 'Outfit', sans-serif" }}>

      {/* Hero */}
      <div style={{
        padding: 'clamp(8rem, 15vw, 14rem) 0 clamp(4rem, 7vw, 6rem)',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}>
          <span style={{
            fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
            display: 'block', marginBottom: 'clamp(1.2rem, 2vw, 2rem)',
            fontFamily: "'Inter', monospace",
          }}>
            FAQ
          </span>

          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 200,
            color: '#e8e4df', letterSpacing: '-0.04em', lineHeight: 1.02,
            margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
          }}>
            Questions
            <br />
            <span style={{ color: '#D4A853' }}>&amp; answers</span>
          </h1>

          <div style={{
            marginTop: 'clamp(2rem, 3vw, 3rem)',
            width: '100%', height: '1px',
            background: 'linear-gradient(90deg, rgba(212, 168, 83, 0.25), rgba(255,255,255,0.04) 60%, transparent)',
          }} />

          <p style={{
            fontSize: '0.82rem', lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.3)', fontWeight: 400,
            margin: 'clamp(1rem, 2vw, 1.5rem) 0 0 0', maxWidth: '420px',
          }}>
            Can't find what you're looking for?{" "}
            <span
              onClick={() => navigate('/contactus')}
              style={{ color: '#D4A853', cursor: 'pointer', borderBottom: '1px solid rgba(212,168,83,0.3)' }}
            >
              Reach out to us
            </span>
          </p>
        </div>
      </div>

      {/* FAQ Sections */}
      <div style={{ paddingBottom: 'clamp(5rem, 10vw, 8rem)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}>
          {faqData.map((category, catIndex) => (
            <div key={catIndex} style={{ marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
              {/* Category header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
              }}>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'rgba(212, 168, 83, 0.6)',
                  fontFamily: "'Inter', monospace",
                }}>
                  {String(catIndex + 1).padStart(2, '0')}
                </span>
                <span style={{ width: '20px', height: '1px', backgroundColor: 'rgba(212, 168, 83, 0.25)' }} />
                <h3 style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', fontWeight: 500,
                  color: '#e8e4df', margin: 0, letterSpacing: '-0.02em',
                }}>
                  {category.category}
                </h3>
              </div>

              {/* Questions */}
              {category.questions.map((item, qIndex) => {
                const globalIndex = catIndex * 100 + qIndex;
                return (
                  <AccordionItem
                    key={globalIndex}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndex === globalIndex}
                    onClick={() => handleToggle(globalIndex)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
