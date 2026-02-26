import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'center center',
  wordAnimationEnd = 'center center',
  highlightWords = []
}) => {
  const containerRef = useRef(null);
  const triggersRef = useRef([]);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;

      // Check if this word (stripped of punctuation for matching) is a highlight word
      const isHighlight = highlightWords.some(hw =>
        word === hw || word.replace(/[.,!?;:]/g, '') === hw.replace(/[.,!?;:]/g, '')
      );

      return (
        <span
          className={`inline-block word${isHighlight ? ' highlight-word' : ''}`}
          key={index}
        >
          {word}
        </span>
      );
    });
  }, [children, highlightWords]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const myTriggers = [];

    // Use transform instead of rotate for GPU acceleration
    const rotTween = gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true
        }
      }
    );
    if (rotTween.scrollTrigger) myTriggers.push(rotTween.scrollTrigger);

    const wordElements = el.querySelectorAll('.word');

    // Force GPU layer promotion on each word for smoother compositing
    wordElements.forEach(word => {
      word.style.willChange = 'opacity, transform';
      word.style.transform = 'translateZ(0)';
      word.style.backfaceVisibility = 'hidden';
    });

    const opacityTween = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true
        }
      }
    );
    if (opacityTween.scrollTrigger) myTriggers.push(opacityTween.scrollTrigger);

    // Use opacity-based fade instead of expensive CSS filter: blur()
    // Blur filters force full repaint on every scroll frame — very laggy
    // Instead, we scale the words slightly for a similar "coming into focus" effect
    if (enableBlur) {
      const scaleTween = gsap.fromTo(
        wordElements,
        { scale: 0.97, y: 4 },
        {
          ease: 'none',
          scale: 1,
          y: 0,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true
          }
        }
      );
      if (scaleTween.scrollTrigger) myTriggers.push(scaleTween.scrollTrigger);
    }

    // Animate highlight words with a warm amber glow when they scroll into full view
    const highlightElements = el.querySelectorAll('.highlight-word');
    if (highlightElements.length > 0) {
      const hlTween = gsap.fromTo(
        highlightElements,
        { color: '#e8e4df' },
        {
          color: '#D4A853',
          textShadow: '0 0 20px rgba(212, 168, 83, 0.3), 0 0 40px rgba(212, 168, 83, 0.1)',
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top center+=10%',
            end: 'bottom center',
            scrub: true
          }
        }
      );
      if (hlTween.scrollTrigger) myTriggers.push(hlTween.scrollTrigger);
    }

    triggersRef.current = myTriggers;

    return () => {
      myTriggers.forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, highlightWords]);

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
