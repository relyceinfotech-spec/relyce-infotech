import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useNavigate } from "react-router-dom";
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
// NOTE: Make sure you have a rocket image at this path in your project
import Rocket from "../assets/rocket1.png"; 

// Register the GSAP plugins
gsap.registerPlugin(useGSAP, MotionPathPlugin);

const HeroSection = () => {
  const container = useRef(null);
  const textContainerRef = useRef(null);
  const arrowPathRef = useRef(null);
  const arrowheadRef = useRef(null);
  const rocketRef = useRef(null);
  
  const words = ["RELYCE", "INFOTECH"];

  // useGSAP hook for all our animations
  useGSAP(() => {
    // --- SETUP ---
    if (!rocketRef.current) return;
    gsap.set([arrowPathRef.current, arrowheadRef.current], { opacity: 0 });
    gsap.set(rocketRef.current, { x: window.innerWidth, y: window.innerHeight, rotation: -135 });

    // --- MAIN TIMELINE (RUNS ONLY ONCE) ---
    const mainTl = gsap.timeline({ delay: 0.5 });
    
    // 1. Animate ALL letters from left in one continuous wave
    mainTl.from('.char', { xPercent: -110, opacity: 0, stagger: 0.1, duration: 1, ease: 'power4.out' });

    // 2. Cohesive 3-Letter Wave Animation
    const allChars = gsap.utils.toArray('.char');
    const springSpeed = 0.15;
    const effectDuration = 0.85;
    const springTl = gsap.timeline();

    allChars.forEach((char, index) => {
      const charTl = gsap.timeline();
      // Changed colors to NeoBrutalist black/dark for light theme
      charTl.to(char, { color: '#121212', y: -50, rotationZ: 180, ease: 'circ.in', duration: effectDuration / 2 })
            .to(char, { color: '#121212', y: 0, rotationZ: 360, ease: 'circ.out', duration: effectDuration / 2 })
            .set(char, { rotationZ: 0 });
      springTl.add(charTl, index * springSpeed);
    });
    mainTl.add(springTl, "+=0.5");

    // 3. Second reveal animation (up and down)
    mainTl.from('.char', {
        y: (i) => (i % 2 === 0 ? 100 : -100),
        ease: 'power3.out',
        duration: 1,
        stagger: {
            each: 0.04,
            from: 'start',
        },
    }, "+=0.5");

    // Buttons Fade-in Animation removed to resolve visibility issues

    // --- LOOPING ARROW TIMELINE ---
    const loopTl = gsap.timeline({ delay: 8.0, repeat: -1, repeatDelay: 1 });
    const arrowPath = arrowPathRef.current;
    const arrowhead = arrowheadRef.current;
    if (arrowPath && arrowhead) {
      const length = arrowPath.getTotalLength();
      loopTl.set(arrowPath, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
      loopTl.set(arrowhead, { opacity: 1 });
      loopTl.to(arrowPath, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' });
      loopTl.to(arrowhead, { motionPath: { path: arrowPath, align: arrowPath, autoRotate: true, alignOrigin: [0.5, 0.5] }, duration: 1.5, ease: 'power1.inOut' }, "<");
      loopTl.set(arrowhead, { opacity: 0 }, "+=0.5");
      loopTl.to(arrowPath, { strokeDashoffset: length, duration: 1.7, ease: 'power2.inOut' });
      loopTl.set(arrowPath, { opacity: 0 });
    }

    // --- ROCKET INTERACTIVITY & MOVEMENT ---
    let rocketAnimation;

    const moveRocketRandomly = () => {
      if (rocketAnimation) rocketAnimation.kill();
      rocketAnimation = gsap.timeline({ 
          onComplete: moveRocketRandomly, 
      });
      const segments = gsap.utils.random(2, 4);
      for (let i = 0; i < segments; i++) {
          rocketAnimation.to(rocketRef.current, { x: gsap.utils.random(0, window.innerWidth * 0.9), y: gsap.utils.random(0, window.innerHeight * 0.9), rotation: gsap.utils.random(-180, 180), duration: gsap.utils.random(1.5, 3), ease: 'sine.inOut' });
      }
    };
    
    gsap.delayedCall(0.5, moveRocketRandomly);

    // --- MOUSE-MOVE PARALLAX & INTERACTIVITY ---
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 100;
      const yPercent = (clientY / window.innerHeight - 0.5) * 100;
      gsap.to(textContainerRef.current, { x: -xPercent * 0.1, y: -yPercent * 0.1, rotateX: -yPercent * 0.05, rotateY: xPercent * 0.05, duration: 0.8, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Interactive Text on Hover
    allChars.forEach(char => {
        char.addEventListener('mouseenter', () => {
            gsap.to(char, { y: -10, scale: 1.1, color: '#FF70A6', duration: 0.3, ease: 'power2.out' });
        });
        char.addEventListener('mouseleave', () => {
            gsap.to(char, { y: 0, scale: 1, color: '#121212', duration: 0.3, ease: 'elastic.out(1, 0.75)' });
        });
    });

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };

  }, { scope: container });
  
  const navigate = useNavigate();

  const handleScrollToProduct = () => {
      const productSection = document.getElementById('our-product');
      if (productSection) {
          productSection.scrollIntoView({ behavior: 'smooth' });
      }
  };
  
  return (
    <div
      ref={container}
      className="relative h-screen w-full flex flex-col justify-center items-center bg-neo-white font-bold text-neo-black overflow-hidden pt-20 md:pt-0"
      style={{
          perspective: '1000px',
          backgroundImage: `
              radial-gradient(#000 1px, transparent 1px),
              linear-gradient(to right, #e5e5e5 1px, transparent 1px),
              linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 100px 100px, 100px 100px'
      }}
    >
      {/* Decorative Floating Elements (from NeoBrutalist Reference) */}
      <div className="absolute top-1/3 left-[10%] w-16 h-16 bg-neo-blue border-4 border-black shadow-hard animate-bounce hidden lg:block rotate-12 z-0"></div>
      <div className="absolute bottom-1/3 right-[10%] w-24 h-24 bg-neo-pink rounded-full border-4 border-black shadow-hard hidden lg:block animate-pulse z-0"></div>
      <div className="absolute top-20 right-20 text-9xl opacity-5 font-black select-none pointer-events-none z-0">TECH</div>
      
      {/* status badge */}
      <div className="relative z-10 mb-8 transform -rotate-2">
           <div className="inline-flex items-center bg-white border-2 border-black px-4 py-1 shadow-hard">
                <span className="w-3 h-3 bg-neo-green rounded-full border border-black mr-2 animate-pulse"></span>
                <span className="font-mono font-bold text-sm tracking-widest">SYSTEM STATUS: ONLINE</span>
           </div>
      </div>

      {/* Rocket Image */}
      <img 
        ref={rocketRef}
        src={Rocket} 
        alt="Rocket"
        className="absolute w-24 h-auto top-0 left-0 pointer-events-auto cursor-pointer select-none z-20"
      />

      {/* SVG Container */}
      <svg className="absolute w-full h-full top-0 left-0 pointer-events-none z-10" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet">
        <path ref={arrowPathRef} d="M 380,480 C -150,550 250,850 710,900" stroke="#121212" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path ref={arrowheadRef} d="M -15,0 L 15,0 L 0,20 Z" fill="#FF8C00" />
      </svg>
      
      <div ref={textContainerRef} className="text-center select-none z-10" style={{ transformStyle: 'preserve-3d' }}>
        {words.map((word, wordIndex) => (
          <div key={wordIndex} className="py-2 overflow-hidden">
            <h1 className="flex justify-center uppercase tracking-tighter leading-none text-[clamp(3.5rem,8vw,13rem)] font-display text-stroke-black">
              {word.split('').map((char, charIndex) => (
                <span key={charIndex} className={`char word-${wordIndex}-char inline-block text-neo-black`}>
                  {char}
                </span>
              ))}
            </h1>
          </div>
        ))}
        {/* Added tagline for more content */}
         <p className="mt-6 font-mono text-xl sm:text-2xl bg-neo-yellow border-2 border-black inline-block px-4 py-2 shadow-hard transform rotate-1">
             Building Digital Experiences That Matter.
         </p>
      </div>

      <div className="mt-16 flex flex-col sm:flex-row gap-8 z-20">
        <button className="hero-button group relative overflow-hidden bg-neo-green text-black border-2 border-black shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all px-12 py-5 font-black text-2xl uppercase font-mono">
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-0 mix-blend-overlay"></div>
        </button>
        <button
          onClick={handleScrollToProduct}
          className="hero-button group relative overflow-hidden bg-white text-black border-2 border-black shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all px-12 py-5 font-black text-2xl uppercase font-mono"
        >
          <span className="relative z-10">Our Products</span>
          <div className="absolute inset-0 bg-neo-pink transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-0"></div>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
