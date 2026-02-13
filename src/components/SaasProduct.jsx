import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Data for our single product
const relyceAiProduct = {
  title: "Relyce AI",
  subtitle: "Revolutionizing Workflows with Intelligent Automation",
  description: "Relyce AI is a state-of-the-art platform that leverages artificial intelligence to automate complex tasks, analyze data with incredible precision, and provide actionable insights. Enhance your team's productivity and drive smarter business decisions with our powerful, intuitive AI solution.",
  cta: "Experience the future of AI",
//   tools: ["Python", "TensorFlow", "PyTorch", "LangChain", "Vector Databases", "Cloud Integration"]
};


const ProductSection = () => {
  const container = useRef(null);
  const leftColumn = useRef(null);
  const rightColumn = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // --- DESKTOP ANIMATION (2-column grid reveal) ---
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=1500'
        }
      });

      tl.from(leftColumn.current, {
        xPercent: -100,
        opacity: 0,
        ease: 'power2.inOut'
      });
      
      tl.from(rightColumn.current, {
        x: '-25vw',
        scale: 1.5, // Reduced scale for better visual
        ease: 'power2.inOut'
      }, "<");

    });

    // --- MOBILE ANIMATION (Simple stack and slide-in) ---
    mm.add("(max-width: 767px)", () => {
      // Product Card (leftColumn) will slide in as you scroll
      gsap.from(leftColumn.current, {
        opacity: 0,
        xPercent: -100,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftColumn.current,
          start: 'top bottom', // Start animating when top of element hits bottom of viewport
          end: 'bottom center', // End when bottom of element hits center
          toggleActions: 'play none none reverse'
        }
      });
    });


    return () => {
      mm.revert();
    }
  }, { scope: container });

  return (
    <div id="our-product" ref={container} className="bg-neo-green min-h-screen md:overflow-hidden border-b-4 border-black relative pb-20 md:pb-0">
      {/* On mobile: grid-cols-1 renders items in DOM order (Text then Product) */}
      {/* On desktop: grid-cols-2 with order classes to swap them visually */}
      <div className="min-h-screen md:h-full grid grid-cols-1 md:grid-cols-2 items-center">
        
        {/* Right Column: Title and Description - FIRST in DOM for mobile order */}
        {/* 'md:order-last' pushes this to the right side ONLY on desktop screens */}
        <div ref={rightColumn} className="flex justify-center items-center text-center px-8 pt-24 md:pt-0 md:text-left md:order-last">
            <div className="max-w-md bg-white p-8 border-4 border-black shadow-hard-xl rotate-2">
                <h2 className="text-4xl lg:text-6xl font-black uppercase text-black mb-4">Our Product</h2>
                <p className="mt-4 text-xl text-gray-800 font-mono font-bold leading-relaxed">
                    Scroll to discover our flagship solution, designed to elevate your business to the next level.
                </p> 
            </div>
        </div>

        {/* Left Column: Product Card - SECOND in DOM for mobile order */}
        {/* 'md:order-first' pushes this to the left side ONLY on desktop screens */}
        <div ref={leftColumn} className="flex justify-center items-center px-4 py-12 pb-32 md:py-0 md:px-8 md:order-first">
            <div className="max-w-xl w-full">
              <div className="bg-white rounded-none border-4 border-black p-8 lg:p-10 flex flex-col justify-between text-left shadow-hard-xl hover:translate-x-1 hover:translate-y-1 hover:shadow-hard transition-all duration-300">
                <div>
                  <h3 className="text-4xl lg:text-5xl font-black text-black mb-2 uppercase">{relyceAiProduct.title}</h3>
                  <h4 className="text-xl lg:text-2xl text-neo-purple font-black mb-4 border-b-4 border-black inline-block pb-2">{relyceAiProduct.subtitle}</h4>
                  <p className="text-gray-800 font-mono font-bold leading-relaxed mb-6">{relyceAiProduct.description}</p>
                  <a href="https://relyceai.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-black text-white font-black uppercase px-6 py-3 border-2 border-transparent hover:bg-white hover:text-black hover:border-black hover:shadow-hard transition-all">
                    {relyceAiProduct.cta}
                  </a>
                </div>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductSection;