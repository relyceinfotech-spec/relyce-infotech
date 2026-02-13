import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Header from './components/Header'
// import Cursor from "./components/CustomCursor"
import Hero from '../components/HeroSection'
import Features from '../components/Features'
import Client from '../components/Client'
import Services from '../pages/Services'
import ChooseUs from '../components/Chooseus'
import Product from '../components/SaasProduct'
import Marquee from '../components/Marquee'
// import Footer from "../components/Footer"
import "../index.css"

import IntroOverlay from '../components/IntroOverlay'

// ... (keep generic imports)

const Home = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Disable browser scroll restoration to handle it manually
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll reset when intro finishes and unmounts
  useLayoutEffect(() => {
    if (!showIntro) {
        // Force scroll to top immediately before paint
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        
        // Backup reset to handle any frame delays from GSAP cleanup
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);
    }
  }, [showIntro]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  /* 
    GSAP Fade-in Animation 
    Replaces the CSS 'animate-fade-in' to ensure we can clear the 'transform' property 
    after the animation completes. This is CRITICAL because a persistent transform 
    creates a new stacking context that breaks 'position: fixed' in child elements 
    (like pinned ScrollTriggers).
  */
  useGSAP(() => {
    // Only animate if NOT showing intro (or after it finishes)
    if (!showIntro) {
        gsap.fromTo(".home-container", 
            { 
                opacity: 0, 
                y: 20 
            }, 
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                ease: "power2.out",
                clearProps: "transform", // CRITICAL: Removes transform to restore fixed positioning context
                onComplete: () => {
                  ScrollTrigger.refresh(); // Ensure pin positions are recalculated after transform removal
                }
            }
        );
    }
  }, [showIntro]);
  
  return (
    <div className="home-container"> 

      
      {/* <Header/> */}
      
      {/* Intro Overlay wraps Hero on first visit */}
      {showIntro ? (
        <IntroOverlay onComplete={handleIntroComplete}>
            <Hero />
        </IntroOverlay>
      ) : (
        <Hero />
      )}
      
      <Marquee />
      <Features/>
      <Client/>
      <Services/>
      <ChooseUs/>
      <Product/>
      {/* Footer is already rendered in App.jsx */}
      {/* <Cursor/> */}
    </div>
  )
}

export default Home

