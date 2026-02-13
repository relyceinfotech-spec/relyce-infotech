import React, { useRef, useEffect } from 'react';
// GSAP is expected to be available globally

// --- Icon Components ---
const InnovationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);
const ClientCentricIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const QualityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
);
const DiscoverIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const DesignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const DevelopIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const DeployIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;


// --- Main About Component ---
const About = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (window.gsap) {
            const gsap = window.gsap;
            const { ScrollTrigger } = gsap;
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                // --- Section 1: Intro Animations ---
                const introTl = gsap.timeline({ scrollTrigger: { trigger: ".intro-section", start: 'top 80%', toggleActions: 'play none none reverse' } });
                
                const headline = document.querySelector('.main-headline');
                if (headline) {
                    const words = headline.innerText.split(' ');
                    headline.innerHTML = words.map(word => `<span class="inline-block overflow-hidden"><span class="inline-block -translate-y-full">${word}</span></span>`).join(' ');
                    introTl.to(".main-headline span span", { y: 0, stagger: 0.05, duration: 0.8, ease: 'power3.out' });
                }
                
                introTl.from(".intro-content", { opacity: 0, y: 30, duration: 1, ease: 'power3.out' }, "-=0.6")
                       .from(".intro-right", { opacity: 0, x: 100, duration: 1, ease: 'power3.out' }, "-=0.8");
                
                gsap.to(".intro-image", { y: "-=20", duration: 2, ease: "sine.inOut", repeat: -1, yoyo: true });

                // --- Section 2: Timeline Animations ---
                const timelineLine = document.querySelector('.timeline-line');
                if(timelineLine) {
                    gsap.from(timelineLine, {
                        scaleY: 0,
                        transformOrigin: 'top center',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '.story-section',
                            start: 'top 50%',
                            end: 'bottom 70%',
                            scrub: true
                        }
                    });
                }

                const timelineRows = gsap.utils.toArray('.timeline-row');
                timelineRows.forEach(row => {
                    const content = row.querySelector('.timeline-item-content');
                    // Check if the row has the 'md:flex-row-reverse' class for desktop layout
                    const isReversed = row.classList.contains('md:flex-row-reverse');
                    
                    // On mobile, isReversed is always false, so all items will animate from the left.
                    // On desktop, it will alternate based on the class.
                    gsap.from(content, {
                        opacity: 0,
                        x: isReversed ? 100 : -100, // Animate from right (100) or left (-100)
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                });

                // --- Section 3: Process Card Animations ---
                gsap.from(".process-card", {
                    scrollTrigger: { trigger: ".process-section", start: "top 80%", toggleActions: "play none none reverse" },
                    opacity: 0, y: 60, scale: 0.95, duration: 0.8, stagger: 0.2, ease: "power2.out",
                });
                
                const cards = gsap.utils.toArray('.process-card');
                cards.forEach(card => {
                    card.addEventListener('mousemove', (e) => {
                        const { left, top, width, height } = card.getBoundingClientRect();
                        const x = e.clientX - left - width / 2;
                        const y = e.clientY - top - height / 2;
                        gsap.to(card, { rotationY: (x / width) * 20, rotationX: -(y / height) * 20, transformPerspective: 500, ease: 'power1.out', duration: 0.5 });
                    });
                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5, ease: 'power1.out' });
                    });
                });

                // --- Section 4: Team Animations ---
                gsap.from(".team-card", {
                    scrollTrigger: { trigger: ".team-section", start: "top 80%", toggleActions: "play none none reverse" },
                    opacity: 0, scale: 0.8, y: 50, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)",
                });

            }, containerRef);

            return () => ctx.revert();
        }
    }, []);

    const teamMembers = [
        { name: "UKENTHIRAN A", role: "Founder & CEO", img: "https://placehold.co/400x400/FBFF48/000000?text=U" },
        { name: "TAMIZHARUVI P", role: "CTO", img: "https://placehold.co/400x400/FF70A6/000000?text=T" },
        { name: "DHARSHAN L", role: "COO", img: "https://placehold.co/400x400/48E5C2/000000?text=D" },
        { name: "GOHULAKANNAN K", role: "CMO", img: "https://placehold.co/400x400/3D348B/FFFFFF?text=G" },
        { name: "KARTHIBAN R", role: "CPO", img: "https://placehold.co/400x400/FF9B71/000000?text=K" },
        { name: "NAVEENKUMAR S", role: "Lead AI Engineer", img: "https://placehold.co/400x400/F3C178/000000?text=N" },
        { name: "KEERTHANA S", role: "AI Engineer", img: "https://placehold.co/400x400/E899DC/000000?text=K" },
        { name: "VETRI VIVIAN J", role: "Full Stack Developer", img: "https://placehold.co/400x400/38B0DE/000000?text=V" },
        { name: "VISHAL T", role: "Full Stack Developer", img: "https://placehold.co/400x400/A0DDFF/000000?text=V" },
    ];
    
    const firstRowTeam = teamMembers.slice(0, 5);
    const secondRowTeam = teamMembers.slice(5);

    const timelineData = [
        { year: "15-SEP-2024", title: "The Genesis", description: "Relyce Infotech was founded with a vision to bridge the gap between ideas and technology, starting with a small team of passionate developers." },
        { year: "10-DEC-2024", title: "First Major Project", description: "Successfully delivered a large-scale e-commerce platform, marking our entry into complex, high-stakes development." },
        { year: "03-JAN-2025", title: "Team Expansion", description: "Our team grew, expanding our services to include mobile app development and cloud solutions." },
        { year: "15-SEP-2025", title: "Innovation Milestone", description: "Launched our first proprietary AI-driven analytics tool, helping businesses make smarter, data-backed decisions." },
    ];

    return (
        <div ref={containerRef} className="bg-neo-white text-black font-sans">
            
            {/* --- Section 1: Introduction --- */}
            <div className="intro-section py-24 sm:py-32 overflow-hidden border-b-4 border-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10 items-center">
                        <div className="intro-left">
                            <h2 className="text-xl font-bold font-mono tracking-wider text-neo-purple uppercase bg-white border-2 border-black inline-block px-2 mb-4 shadow-hard-sm transform rotate-1">About Relyce Infotech</h2>
                            <p className="main-headline mt-2 text-5xl font-black tracking-tight sm:text-6xl text-black leading-none">
                                Crafting the Future of <span className="text-stroke-black text-transparent">Digital Innovation</span>
                            </p>
                            <div className="intro-content">
                                <p className="mt-6 text-xl leading-8 text-gray-800 font-medium border-l-4 border-neo-purple pl-6">
                                    Relyce Infotech is a forward-thinking technology partner dedicated to transforming your ideas into powerful digital realities. We blend creative design with robust engineering to deliver solutions that not only meet but exceed expectations.
                                </p>
                                <div className="mt-10 space-y-8">
                                    <div className="flex items-start gap-x-4">
                                        <div className="flex-shrink-0 pt-1 bg-neo-yellow border-2 border-black p-2 shadow-hard-sm"><InnovationIcon /></div>
                                        <div><h3 className="text-xl font-black uppercase text-black">Innovation at Core</h3><p className="mt-1 text-gray-800 font-mono font-bold">We constantly explore emerging technologies to bring you the most advanced solutions.</p></div>
                                    </div>
                                    <div className="flex items-start gap-x-4">
                                        <div className="flex-shrink-0 pt-1 bg-neo-pink border-2 border-black p-2 shadow-hard-sm"><ClientCentricIcon /></div>
                                        <div><h3 className="text-xl font-black uppercase text-black">Client-Centric Approach</h3><p className="mt-1 text-gray-800 font-mono font-bold">Your success is our priority. We work collaboratively to deliver tailored results.</p></div>
                                    </div>
                                    <div className="flex items-start gap-x-4">
                                        <div className="flex-shrink-0 pt-1 bg-neo-green border-2 border-black p-2 shadow-hard-sm"><QualityIcon /></div>
                                        <div><h3 className="text-xl font-black uppercase text-black">Uncompromising Quality</h3><p className="mt-1 text-gray-800 font-mono font-bold">We are committed to excellence and the highest standards of quality and performance.</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="intro-right flex items-center justify-center">
                            <img src="https://placehold.co/600x700/FFFFFF/000000?text=Relyce%5CnInnovation" alt="About Relyce Infotech" className="intro-image w-full max-w-sm lg:max-w-none border-4 border-black shadow-hard-xl rounded-none transform rotate-2 hover:rotate-0 transition-all duration-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Section 2: Our Story (Timeline) --- */}
            <div className="story-section py-20 sm:py-28 bg-neo-yellow border-b-4 border-black overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-black tracking-tight sm:text-5xl uppercase text-black">Our Journey</h2>
                    <p className="mt-4 text-xl text-black font-mono font-bold">From a humble beginning to a leader in tech innovation.</p>
                    <div className="mt-20 max-w-4xl mx-auto relative">
                        <div className="timeline-line absolute top-2 left-4 md:left-1/2 w-1 h-full bg-black"></div>
                        {timelineData.map((item, index) => (
                            <div key={index} className={`timeline-row relative mb-12 flex w-full items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                <div className="hidden md:block w-1/2"></div>
                                <div className="w-full md:w-1/2 md:px-8">
                                    <div className="timeline-item-content bg-white border-4 border-black shadow-hard p-6 text-left ml-10 md:ml-0 hover:-translate-y-1 transition-all">
                                        <div className={`absolute top-1 w-6 h-6 bg-neo-pink border-2 border-black rounded-none -left-[4px] md:hidden ${index % 2 === 0 ? 'md:left-[-1.5rem]' : 'md:right-[-1.5rem]'}`}></div>
                                        <div className="font-bold text-neo-purple mb-2 font-mono bg-neo-white inline-block px-1 border border-black">{item.year}</div>
                                        <h3 className="text-2xl font-black text-black uppercase">{item.title}</h3>
                                        <p className="mt-2 text-gray-800 font-bold">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- Section 3: Our Work Process --- */}
            <div className="process-section py-20 sm:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-black tracking-tight sm:text-5xl uppercase text-black">How We Bring Ideas to Life</h2>
                    <p className="mt-4 text-xl text-gray-800 font-mono font-bold">A streamlined process to ensure quality and efficiency from start to finish.</p>
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="process-card bg-neo-white p-8 border-4 border-black shadow-hard flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="bg-neo-yellow border-2 border-black p-3 mb-4 rounded-full"><DiscoverIcon /></div>
                            <h3 className="mt-4 text-2xl font-black uppercase">1. Discover</h3>
                            <p className="mt-2 text-gray-800 font-bold">We start by understanding your vision, goals, and challenges.</p>
                        </div>
                        <div className="process-card bg-neo-white p-8 border-4 border-black shadow-hard flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                             <div className="bg-neo-pink border-2 border-black p-3 mb-4 rounded-full"><DesignIcon /></div>
                            <h3 className="mt-4 text-2xl font-black uppercase">2. Design</h3>
                            <p className="mt-2 text-gray-800 font-bold">We craft intuitive UI/UX designs and robust architecture.</p>
                        </div>
                        <div className="process-card bg-neo-white p-8 border-4 border-black shadow-hard flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                             <div className="bg-neo-green border-2 border-black p-3 mb-4 rounded-full"><DevelopIcon /></div>
                            <h3 className="mt-4 text-2xl font-black uppercase">3. Develop</h3>
                            <p className="mt-2 text-gray-800 font-bold">Our expert developers write clean, efficient, and scalable code.</p>
                        </div>
                        <div className="process-card bg-neo-white p-8 border-4 border-black shadow-hard flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                             <div className="bg-neo-purple border-2 border-black p-3 mb-4 rounded-full"><DeployIcon /></div>
                            <h3 className="mt-4 text-2xl font-black uppercase">4. Deploy</h3>
                            <p className="mt-2 text-gray-800 font-bold">We ensure a smooth launch and provide ongoing support.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Section 4: Meet Our Team --- */}
            <div className="team-section py-20 sm:py-28 bg-neo-blue border-t-4 border-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-black tracking-tight sm:text-5xl uppercase text-white text-stroke-black drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">The Minds Behind the Magic</h2>
                    <p className="mt-4 text-xl text-black font-mono font-bold bg-white inline-block px-4 border-2 border-black">A dedicated team of strategists, designers, and developers.</p>
                    <div className="mt-16 flex flex-col items-center space-y-8">
                        <div className="flex flex-wrap justify-center gap-8">
                            {firstRowTeam.map((member) => (
                                <div key={member.name} className="team-card text-center w-40 bg-white p-4 border-4 border-black shadow-hard hover:-translate-y-2 transition-all">
                                    <img className="mx-auto h-32 w-32 border-2 border-black object-cover shadow-sm bg-gray-200" src={member.img} alt={member.name} />
                                    <h3 className="mt-4 text-sm font-black uppercase leading-tight tracking-tight text-black">{member.name}</h3>
                                    <p className="text-xs leading-6 text-neo-purple font-bold font-mono">{member.role}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap justify-center gap-8">
                            {secondRowTeam.map((member) => (
                                <div key={member.name} className="team-card text-center w-40 bg-white p-4 border-4 border-black shadow-hard hover:-translate-y-2 transition-all">
                                    <img className="mx-auto h-32 w-32 border-2 border-black object-cover shadow-sm bg-gray-200" src={member.img} alt={member.name} />
                                    <h3 className="mt-4 text-sm font-black uppercase leading-tight tracking-tight text-black">{member.name}</h3>
                                    <p className="text-xs leading-6 text-neo-purple font-bold font-mono">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;
