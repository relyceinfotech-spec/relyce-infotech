import React, { useState, useEffect, useLayoutEffect } from 'react'
// import Header from './components/Header'
// import Cursor from "./components/CustomCursor"
import Hero from '../components/HeroSection'
import Features from '../components/Features'
import Client from '../components/Client'
import Services from '../pages/Services'
import ChooseUs from '../components/Chooseus'
import Product from '../components/SaasProduct'
import Marquee from '../components/Marquee'
// import Footer from "./components/Footer"
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

  return (
    <div className="animate-fade-in">

      
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
      {/* <Footer/> */}
      {/* <Cursor/> */}
    </div>
  )
}

export default Home

