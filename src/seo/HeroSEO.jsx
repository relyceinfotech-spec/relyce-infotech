import React from "react";
import { Helmet } from "react-helmet";

const HeroSEO = () => {
  return (
    <Helmet>
      {/* Title & Meta */}
      <title>Relyce Infotech | IT Solutions, Web & App Development</title>
      <meta
        name="description"
        content="Relyce Infotech offers IT consulting, web development, app development, e-commerce solutions, and managed services to help businesses grow with technology."
      />
      <meta
        name="keywords"
        content="Relyce Infotech, IT solutions, web development, app development, e-commerce, IT support, Chennai IT company"
      />
      <meta name="author" content="Relyce Infotech" />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content="Relyce Infotech | IT Solutions Partner" />
      <meta
        property="og:description"
        content="Your trusted IT partner for web, mobile apps, and business technology solutions."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.relyceinfotech.com" />
      <meta
        property="og:image"
        content="https://www.relyceinfotech.com/og-image.jpg"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Relyce Infotech | IT Solutions Partner" />
      <meta
        name="twitter:description"
        content="Web & app development, IT consulting, and e-commerce solutions."
      />
      <meta
        name="twitter:image"
        content="https://www.relyceinfotech.com/og-image.jpg"
      />

      {/* Schema.org JSON-LD for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Relyce Infotech",
          url: "https://www.relyceinfotech.com",
          logo: "https://www.relyceinfotech.com/logo.png",
          sameAs: [
            "https://www.facebook.com/relyceinfotech",
            "https://www.linkedin.com/company/relyceinfotech",
            "https://twitter.com/relyceinfotech"
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-9876543210",
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: "en"
          }
        })}
      </script>
    </Helmet>
  );
};

export default HeroSEO;
