import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const IntroOverlay = ({ children, onComplete }) => {
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const textRef = useRef(null);
  const hintRef = useRef(null);
  const completedRef = useRef(false);

  // Auto-scroll logic and initial setup
  useEffect(() => {
    // Ensure we start at the top
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
        // If user hasn't scrolled much after 2 seconds, auto-scroll to reveal content
        if (window.scrollY < 50) {
            gsap.to(window, { 
                scrollTo: { y: window.innerHeight }, // Scroll exactly one screen height
                duration: 2.0, 
                ease: "power2.inOut"
            });
        }
    }, 2000);

    return () => {
        gsap.killTweensOf(window); // Stop auto-scroll on unmount
        clearTimeout(timer);
    };
  }, []);


  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%", // Scroll distance matches viewport height
        scrub: 1, // Smooth interaction
        pin: true,
        onUpdate: (self) => {
            // Trigger completion slightly before the absolute end to ensure it catches
            // and unmounts, preventing "scrolling back up" to the overlay.
            if (self.progress > 0.98 && !completedRef.current && onComplete) {
                completedRef.current = true;
                gsap.killTweensOf(window); // Ensure auto-scroll stops
                onComplete(); 
            }
        }
      }
    });

    // Animate scale. With mix-blend-multiply (Black BG, White Text):
    // Black (0) covers content. White (1) reveals content.
    // As text scales up, the White shape expands, revealing more content.
    tl.to(textRef.current, {
      scale: 100, 
      ease: "power1.inIn",
      transformOrigin: "center center",
    })
    .to(maskRef.current, {
        autoAlpha: 0, // Fade out the mask layer at the end
        duration: 0.1
    });
    
    // Fade out hint
    gsap.to(hintRef.current, {
        opacity: 0,
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=200",
            scrub: true
        }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Underlying Content (Hero) */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {children}
      </div>

      {/* Mask Layer - Black BG with White Text (Multiply) */}
      <div ref={maskRef} className="absolute inset-0 z-[100] bg-black mix-blend-multiply flex items-center justify-center pointer-events-none">
        <h1 ref={textRef} className="text-white font-display font-black text-9xl uppercase tracking-tighter select-none whitespace-nowrap">
          RELYCE
        </h1>
      </div>

      {/* Scroll Hint */}
      <div ref={hintRef} className="absolute inset-0 z-[101] flex items-end justify-center pb-12 pointer-events-none">
        <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white font-mono font-bold text-sm uppercase tracking-widest">Scroll to Explore</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </div>
      </div>
    </div>
  );
};

export default IntroOverlay;
