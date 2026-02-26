import { useEffect } from 'react';

/**
 * Lightweight SEO component — sets page title, meta description,
 * and injects JSON-LD structured data into <head>.
 * No external dependencies needed.
 *
 * Usage:
 *   <PageSEO
 *     title="About Us | Relyce Infotech"
 *     description="Learn about Relyce Infotech..."
 *     canonical="https://relyceinfotech.com/relyce"
 *     jsonLd={[{ "@type": "Organization", ... }]}
 *   />
 */
const PageSEO = ({ title, description, canonical, jsonLd }) => {
  useEffect(() => {
    // Title
    if (title) document.title = title;

    // Meta description
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', description);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        meta.setAttribute('content', description);
        document.head.appendChild(meta);
      }
    }

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (link) {
        link.setAttribute('href', canonical);
      } else {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', canonical);
        document.head.appendChild(link);
      }
    }

    // JSON-LD structured data
    let scriptEl = null;
    if (jsonLd && jsonLd.length > 0) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": jsonLd,
      });
      document.head.appendChild(scriptEl);
    }

    // Cleanup on unmount — restore defaults
    return () => {
      document.title = 'Relyce Infotech | Next-Gen Consulting & AI Solutions | Scale Smarter';
      if (scriptEl) scriptEl.remove();
    };
  }, [title, description, canonical, jsonLd]);

  return null;
};

export default PageSEO;
