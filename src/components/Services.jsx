import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Data for our services
const servicesData = [
  {
    title: "Web Development",
    subtitle: "Crafting Stunning Websites That Convert Visitors Into Customers",
    description: "Unlock your business potential with our cutting edge web development services. We build responsive, scalable, and SEO friendly websites tailored to your brand’s unique identity. Whether you need a simple landing page or a complex e-commerce platform, our expert developers craft solutions that deliver seamless user experiences across all devices.",
    cta: "Ready to build your dream website? Contact us now!",
    tools: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB", "REST APIs"]
  },
  {
    title: "App Development",
    subtitle: "Building Intuitive Mobile Apps for iOS and Android",
    description: "From concept to launch, we create mobile applications that engage users and drive growth. Our team specializes in native and cross-platform development, ensuring your app is fast, reliable, and looks great on any screen. Let's turn your app idea into a reality.",
    cta: "Have an app idea? Let's talk!",
    tools: ["React Native", "Swift", "Kotlin", "Firebase", "Flutter"]
  },
  {
    title: "Digital Marketing",
    subtitle: "Driving Growth with Data-Driven Marketing Strategies",
    description: "Reach your target audience and boost your online presence with our comprehensive digital marketing services. We specialize in SEO, PPC, social media marketing, and content strategy to help you achieve your business goals and maximize your ROI.",
    cta: "Ready to grow your audience? Get in touch!",
    tools: ["Google Analytics", "SEMrush", "Meta Ads", "HubSpot", "SEO Tools"]
  },
  {
    title: "Software Development",
    subtitle: "Custom Software Solutions to Streamline Your Operations",
    description: "We design and build custom software tailored to your specific business needs. Our solutions help automate processes, improve efficiency, and provide you with a competitive edge. From enterprise systems to specialized tools, we deliver robust and scalable software.",
    cta: "Need a custom solution? Contact us!",
    tools: ["Python", "Java", "Docker", "C#", "AWS"]
  },
  {
    title: "UI/UX Design",
    subtitle: "Creating User-Centric Designs That Delight and Convert",
    description: "Good design is good business. Our UI/UX experts focus on creating intuitive, beautiful, and user-friendly interfaces that enhance user satisfaction and drive conversions. We conduct thorough research to understand your users and deliver designs that truly resonate.",
    cta: "Want to improve your user experience? Let's chat!",
    tools: ["Figma", "Adobe XD", "Sketch", "InVision", "Miro"]
  },
  {
    title: "E-commerce Solutions",
    subtitle: "Building Powerful Online Stores That Drive Sales",
    description: "We create feature rich ecommerce platforms that provide a seamless shopping experience for your customers. From secure payment gateways to inventory management, we provide end-to-end solutions to help you succeed in the competitive online market.",
    cta: "Ready to start selling online? Contact us!",
    tools: ["Shopify", "WooCommerce", "Magento", "BigCommerce", "Stripe"]
  },
  {
    "title": "SaaS Solutions",
    "subtitle": "Empowering Businesses with Scalable Software as a Service",
    "description": "Our SaaS consulting services help you adopt, optimize, and scale cloud based software solutions tailored to your business needs. From subscription models to integrations, we guide you in choosing the right SaaS platforms and strategies that drive growth and efficiency.",
    "cta": "Looking to scale with SaaS? Let’s get started!",
    "tools": [
      "SaaS Strategy",
      "Subscription Management",
      "Integration & APIs",
      "Data Security & Compliance",
      "SaaS Migration",
      "Performance Optimization",
      "Cloud-Native Applications"
    ]
  },
  {
    title: "IT Consulting",
    subtitle: "Expert Guidance to Navigate Your Digital Transformation",
    description: "Our IT consulting services provide you with strategic advice to leverage technology for your business growth. We help you with technology roadmaps, system architecture, and digital strategy to ensure you are making the right investments for your future.",
    cta: "Need strategic IT advice? We can help!",
    tools: ["IT Strategy", "Risk Assessment", "System Integration", "Project Management", "Compliance", "Cloud Consulting", "Cloud Strategy"]
  }
];

const ServicesSection = () => {
  const container = useRef(null);
  const horizontalTrack = useRef(null);

  useGSAP(() => {
    // Using matchMedia for responsive animations
    let mm = gsap.matchMedia();

    // Desktop animation (screens wider than 768px)
    mm.add("(min-width: 768px)", () => {
      const track = horizontalTrack.current;

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        }
      });

      return () => {
        tween.kill();
        ScrollTrigger.getById('services-scroll')?.kill();
      }
    });

    // Mobile animation (alternating slide-in for each card)
    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray('.service-card').forEach((card, index) => {
        const direction = index % 2 === 0 ? -100 : 100; // Alternate between left (-100) and right (100)
        gsap.from(card, {
          opacity: 0,
          x: direction,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 95%', // FIX: Animation starts when the top of the card is 95% down the screen (very early)
            end: 'bottom 5%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    }
  }, { scope: container });

  return (
    // The container is now responsive. On desktop it will be pinned, on mobile it will scroll normally.
    <div ref={container} className="bg-neo-blue md:h-screen md:overflow-hidden border-t-4 border-black border-b-4">
      {/* The track is a flex container. On desktop it's horizontal, on mobile it's a vertical grid. */}
      <div ref={horizontalTrack} className="md:flex md:h-screen md:items-center">

        {/* Title Card */}
        <div className="flex-shrink-0 w-full md:w-screen h-auto md:h-screen flex flex-col justify-center text-center px-8 py-24 md:py-8 bg-neo-blue">
          <h2 className="text-6xl lg:text-9xl font-black uppercase text-white text-stroke-black drop-shadow-[6px_6px_0_rgba(0,0,0,1)]">Our<br/>Services</h2>
          <p className="mt-8 text-xl text-neo-black font-mono font-bold bg-white border-4 border-black p-4 inline-block shadow-hard max-w-2xl mx-auto transform rotate-1">
            Scroll to explore our comprehensive solutions on desktop, or view our services below on mobile.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:flex gap-8 md:gap-0 px-8 pb-24 md:pb-0 md:px-0 bg-neo-blue">
          {servicesData.map((service, index) => (
            <div key={service.title} className="service-card md:flex-shrink-0 md:w-[80vw] lg:md:w-[60vw] xl:w-[45vw] md:h-auto flex flex-col justify-center md:p-8">
              <div className={`w-full h-full rounded-none border-4 border-black p-8 lg:p-12 flex flex-col justify-between text-left hover:shadow-hard-xl transition-all duration-300 ${index % 2 === 0 ? 'bg-white shadow-hard rotate-1' : 'bg-neo-yellow shadow-hard-lg -rotate-1'}`}>
                <div>
                  <h3 className="text-3xl lg:text-4xl font-black text-black mb-4 uppercase">{service.title}</h3>
                  <h4 className="text-lg lg:text-xl text-black font-bold font-mono mb-6 border-b-4 border-black pb-2 inline-block">{service.subtitle}</h4>
                  <p className="text-gray-900 font-medium leading-relaxed mb-6 font-mono">{service.description}</p>
                  <p className="text-black font-black uppercase tracking-wider bg-neo-green inline-block px-2 border-2 border-black">{service.cta}</p>
                </div>
                <div className="mt-8">
                  <h5 className="text-black font-black mb-3 box-border border-b-2 border-black inline-block">TOOLS_&_TECH:</h5>
                  <div className="flex flex-wrap gap-2">
                    {service.tools.map(tool => (
                      <span key={tool} className="bg-black text-white text-xs font-bold font-mono px-3 py-1 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
