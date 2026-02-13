import React from "react";
import { Helmet } from "react-helmet";

const FAQSEO = () => {
  const faqData = [
    {
      question: "What does Relyce Infotech do?",
      answer:
        "We are a full-service IT consulting company providing comprehensive technology solutions. We specialize in website development, mobile app development (iOS & Android), e-commerce solutions, and reliable technical and non-technical support for businesses of all sizes."
    },
    {
      question: "What types of businesses do you work with?",
      answer:
        "We proudly serve a diverse range of businesses – from startups and small businesses to mid-sized enterprises. We have extensive experience working with clients in retail, healthcare, education, and finance."
    },
    {
      question: "Why should I choose Relyce Infotech?",
      answer:
        "We differentiate ourselves through our commitment to personalized service, deep technical expertise, and a focus on ROI. Clear communication and transparency are key."
    },
    {
      question: "Where are you located?",
      answer:
        "We are located in Chennai, Tamilnadu, India. We also serve clients globally remotely."
    },
    // Add more FAQ objects similarly...
  ];

  const structuredFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredFAQ)}
      </script>
    </Helmet>
  );
};

export default FAQSEO;
