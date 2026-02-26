import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Cursor from "./components/CustomCursor.jsx"; 
import Home from "./pages/Home.jsx"; // directly import Home for instant render
import ScrollToTop from "./components/ScrollToTop.jsx";

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh] bg-[#0a0a0a]">
    <div className="w-8 h-8 border-2 border-[#D4A853] border-t-transparent rounded-full animate-spin opacity-50"></div>
  </div>
);

// SEO components
import HeroSEO from "./seo/HeroSEO.jsx";
import FAQSEO from "./seo/FAQSEO.jsx";

// Lazy load other pages
const About = lazy(() => import("./pages/About.jsx"));
const Faq = lazy(() => import("./pages/Faq.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const ContactForm = lazy(() => import("./pages/ContactForm.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const Internship = lazy(() => import("./pages/InteshipForm.jsx"));
const Relyce = lazy(() => import("./pages/Relyce.jsx"));
const Error = lazy(() => import("./pages/ErrorPage.jsx"));

const App = () => {
  return (
    <>
      <Header />
      <ScrollToTop />

      <Routes>
          {/* Home page renders instantly with SEO */}
          <Route 
            path="/" 
            element={
              <>
                <HeroSEO />
                <Home />
              </>
            } 
          />
          <Route 
            path="/home" 
            element={
              <>
                <HeroSEO />
                <Home />
              </>
            } 
          />

          {/* Legacy/Indexed path redirects */}
          <Route path="/en/*" element={<Navigate to="/" replace />} />
          <Route path="/hi/*" element={<Navigate to="/" replace />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />

          {/* About page */}
          <Route 
            path="/about" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <About />
              </Suspense>
            } 
          />

          {/* FAQ page with SEO */}
          <Route 
            path="/faq" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <>
                  <FAQSEO />
                  <Faq />
                </>
              </Suspense>
            } 
          />

          {/* Contact */}
          <Route 
            path="/contact" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Contact />
              </Suspense>
            } 
          />

          {/* Services */}
          <Route 
            path="/services" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Services />
              </Suspense>
            } 
          />

          {/* Contact Form */}
          <Route 
            path="/contactus" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ContactForm />
              </Suspense>
            } 
          />

          {/* Internship */}
          <Route 
            path="/internship" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Internship />
              </Suspense>
            } 
          />

          {/* Relyce Admin */}
          <Route 
            path="/relyce" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Relyce />
              </Suspense>
            } 
          />

          {/* 404 Page */}
          <Route 
            path="*" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Error />
              </Suspense>
            } 
          />
      </Routes>

      <Footer />
      <Cursor />
    </>
  );
};

export default App;
