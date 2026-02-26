import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Cursor from "./components/CustomCursor.jsx"; 
import Home from "./pages/Home.jsx"; // directly import Home for instant render

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

          {/* About page */}
          <Route 
            path="/about" 
            element={
              <Suspense fallback={<Home />}>
                <About />
              </Suspense>
            } 
          />

          {/* FAQ page with SEO */}
          <Route 
            path="/faq" 
            element={
              <Suspense fallback={<Home />}>
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
              <Suspense fallback={<Home />}>
                <Contact />
              </Suspense>
            } 
          />

          {/* Services */}
          <Route 
            path="/services" 
            element={
              <Suspense fallback={<Home />}>
                <Services />
              </Suspense>
            } 
          />

          {/* Contact Form */}
          <Route 
            path="/contactus" 
            element={
              <Suspense fallback={<Home />}>
                <ContactForm />
              </Suspense>
            } 
          />

          {/* Internship */}
          <Route 
            path="/internship" 
            element={
              <Suspense fallback={<Home />}>
                <Internship />
              </Suspense>
            } 
          />

          {/* Relyce Admin */}
          <Route 
            path="/relyce" 
            element={
              <Suspense fallback={<Home />}>
                <Relyce />
              </Suspense>
            } 
          />

          {/* 404 Page */}
          <Route 
            path="*" 
            element={
              <Suspense fallback={<Home />}>
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
