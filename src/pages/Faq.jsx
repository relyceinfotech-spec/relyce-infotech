import React, { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";

// --- Accordion Item ---
const AccordionItem = ({ question, answer, isOpen, onClick, index }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.to(el, {
        height: el.scrollHeight,
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => {
          el.style.height = "auto"; // natural expand
        },
      });
    } else {
      gsap.to(el, {
        height: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  // Alternating colors for open state or just generic hover
  const colors = ['bg-neo-yellow', 'bg-neo-pink', 'bg-neo-green', 'bg-neo-purple', 'bg-neo-blue'];
  const activeColor = colors[index % colors.length];

  return (
    <div className={`mb-4 border-4 border-black shadow-hard transition-all duration-300 ${isOpen ? 'translate-x-[4px] translate-y-[4px] shadow-none ' + activeColor : 'bg-white hover:-translate-y-1 hover:shadow-hard-lg'}`}>
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-6 px-6 focus:outline-none"
      >
        <span className={`text-xl font-black uppercase ${isOpen ? 'text-black' : 'text-black'}`}>{question}</span>
        <div className="flex-shrink-0 ml-4 border-2 border-black bg-white p-1">
          <svg
            className={`w-6 h-6 text-black transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            {isOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            )}
           
          </svg>
        </div>
      </button>

      <div ref={contentRef} className="overflow-hidden bg-white border-t-2 border-black" style={{ height: 0 }}>
        <div className="p-6 text-black font-mono font-bold leading-relaxed border-l-4 border-black bg-gray-50 m-2">
          {answer}
        </div>
      </div>
    </div>
  );
};

// --- Main FAQ ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = useMemo(
    () => [
      {
        category: "About Relyce",
        questions: [
          {
            question: "What does Relyce Infotech do?",
            answer:
              "We are a full-service IT consulting company providing comprehensive technology solutions. We specialize in website development, mobile app development (iOS & Android), e-commerce solutions, and reliable technical and non-technical support for businesses of all sizes.",
          },
          {
            question: "What types of businesses do you work with?",
            answer:
              "We proudly serve a diverse range of businesses – from startups and small businesses to mid-sized enterprises. We have extensive experience working with clients in retail, healthcare, education, and finance.",
          },
          {
            question: "Why should I choose Relyce Infotech?",
            answer:
              "We differentiate ourselves through our commitment to personalized service, deep technical expertise, and a focus on ROI. We’re not just about fixing problems; we're about building lasting partnerships and helping you grow.",
          },
          {
            question: "Where are you located?",
            answer:
              "We are located in Chennai, Tamilnadu, India. However, we primarily work remotely, allowing us to serve clients globally.",
          },
        ],
      },
      {
        category: "Web Development",
        questions: [
          {
            question: "What types of websites do you build?",
            answer: (
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Static Websites:</strong> Simple, informational websites.</li>
                <li><strong>Dynamic Websites:</strong> Content-rich sites with user interaction.</li>
                <li><strong>Responsive Websites:</strong> Sites that adapt to all devices.</li>
                <li><strong>CMS-Based Websites:</strong> Built on platforms like WordPress.</li>
              </ul>
            ),
          },
          {
            question: "What’s the typical website development timeline?",
            answer:
              "A simple website might take 2-4 weeks, while a more complex site could take 6-12 weeks or longer. We provide detailed timelines after the initial consultation.",
          },
          {
            question: "Do you handle website hosting and domain registration?",
            answer:
              "Yes, we can manage your hosting and domain registration, or we can integrate with your existing providers.",
          },
          {
            question: "What is SEO, and do you offer SEO services?",
            answer:
              "SEO (Search Engine Optimization) is improving your site's visibility on search engines. We offer SEO consulting and implementation to help you rank higher.",
          },
        ],
      },
      {
        category: "App Development",
        questions: [
          {
            question: "What platforms do you develop apps for?",
            answer:
              "We develop native applications for both iOS and Android, and can also discuss cross-platform options like React Native or Flutter.",
          },
          {
            question: "How much does it cost to develop a mobile app?",
            answer:
              "App development costs vary widely based on complexity. We provide custom quotes after an initial consultation and project scoping.",
          },
          {
            question: "Do you provide app maintenance and support?",
            answer:
              "Yes, we offer ongoing app maintenance and support services, including bug fixes, updates, and feature enhancements.",
          },
        ],
      },
      {
        category: "E-commerce",
        questions: [
          {
            question: "What e-commerce platforms do you work with?",
            answer:
              "We have extensive experience with Shopify, WooCommerce, Magento, and BigCommerce. We can also build custom solutions.",
          },
          {
            question: "Do you handle payment gateway integration?",
            answer:
              "Yes, we integrate secure payment gateways like Stripe, PayPal, and Authorize.net into your e-commerce store.",
          },
        ],
      },
      {
        category: "Support Services",
        questions: [
          {
            question: "What types of technical support do you offer?",
            answer: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Help Desk Support</li>
                <li>Network Troubleshooting</li>
                <li>Server Management</li>
                <li>Cybersecurity Services</li>
              </ul>
            ),
          },
          {
            question: "What does 'non-technical support' mean?",
            answer:
              "This includes assistance with business process optimization, staff training, project management, and strategic technology planning.",
          },
          {
            question: "Do you offer managed services?",
            answer:
              "Yes, we offer comprehensive managed services packages to handle your IT infrastructure and support needs proactively.",
          },
        ],
      },
    ],
    []
  );

  return (
    <div className="bg-neo-yellow py-20 sm:py-28 border-b-4 border-black min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight text-white text-stroke-black sm:text-6xl uppercase drop-shadow-[5px_5px_0_rgba(0,0,0,1)]">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-xl leading-8 text-black font-mono font-bold bg-white inline-block px-4 py-2 border-4 border-black shadow-hard transform rotate-1">
            Can’t find the answer you’re looking for? Reach out to us.
          </p>
        </div>

        <div className="mt-8 space-y-16">
          {faqData.map((category, catIndex) => (
            <div key={catIndex} className="relative">
                <div className="absolute -top-6 -left-4 bg-black text-white px-4 py-1 text-lg font-black uppercase transform -rotate-2 z-10 border-2 border-white shadow-hard-sm">
                    {category.category}
                </div>
              <div className="bg-white p-8 pt-10 border-4 border-black shadow-hard-xl">
                  {category.questions.map((item, qIndex) => {
                    const globalIndex = catIndex * 100 + qIndex;
                    return (
                      <AccordionItem
                        key={globalIndex}
                        index={globalIndex}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openIndex === globalIndex}
                        onClick={() => handleToggle(globalIndex)}
                      />
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
