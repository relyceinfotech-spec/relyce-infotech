import React, { useRef, useEffect } from 'react';
import { Helmet } from "react-helmet";
// GSAP is expected to be available globally

// --- Icon Components ---
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const SupportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const ExpertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const QuoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>;


// --- Main Contact Page Component (Contact.jsx) ---
const Contact = () => {
    const containerRef = useRef(null);
    
    useEffect(() => {
        if (window.gsap) {
            const gsap = window.gsap;
            const { ScrollTrigger } = gsap;
            gsap.registerPlugin(ScrollTrigger);
            
            // Animate each section as it comes into view
            gsap.utils.toArray('.section-animate').forEach(section => {
                gsap.from(section, {
                    opacity: 0,
                    y: 100,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            // Animate hero text on load
            gsap.from(".hero-left > *", {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });
            // Animate hero right side
            gsap.from(".hero-right > *", {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.5
            });
        }
    }, []);

    return (
        <div ref={containerRef} className="bg-neo-white text-black font-sans">
            <Helmet>
                <title>Contact Us | Relyce Infotech - Get a Free Consultation</title>
                <meta name="description" content="Get in touch with Relyce Infotech. Whether you have a project idea, need support, or want a free consultation, our team is ready to help you succeed." />
            </Helmet>
            {/* --- Section 1: Hero --- */}
            <div className="h-screen flex flex-col justify-center items-center px-6 border-b-4 border-black relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-neo-yellow rounded-bl-full border-l-4 border-b-4 border-black z-0"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-neo-purple rounded-tr-full border-r-4 border-t-4 border-black z-0"></div>
                
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="hero-left text-center lg:text-left">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-none mb-6">
                            What’s on <br/><span className="bg-neo-green px-2 border-2 border-black inline-block transform -rotate-2 shadow-hard">your mind?</span>
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl max-w-2xl text-gray-800 mx-auto lg:mx-0 font-mono font-bold bg-white border-2 border-black p-4 shadow-hard-sm">
                            We’re here to help! Tell us what you’re looking for and we’ll get you connected to the right people.
                        </p>
                        <a 
                            href="/contactus" // Replace with your actual contact page route
                            className="mt-10 inline-block bg-black text-white font-black py-4 px-10 border-4 border-transparent hover:bg-white hover:text-black hover:border-black hover:shadow-hard transition-all duration-300 transform uppercase text-xl"
                        >
                            Go to Contact Page
                        </a>
                    </div>
                    <div className="hero-right hidden lg:flex flex-col space-y-8">
                        <div className="bg-white border-4 border-black p-8 shadow-hard hover:shadow-hard-lg hover:-translate-y-1 transition-all">
                            <div className="flex items-start gap-4">
                                <ExpertIcon />
                                <div>
                                    <h3 className="font-black text-2xl uppercase mb-1">Talk to an Expert</h3>
                                    <p className="text-gray-800 font-mono font-bold">Discuss your unique ideas with our seasoned specialists.</p>
                                </div>
                            </div>
                        </div>
                         <div className="bg-white border-4 border-black p-8 shadow-hard hover:shadow-hard-lg hover:-translate-y-1 transition-all">
                             <div className="flex items-start gap-4">
                                <QuoteIcon />
                                <div>
                                    <h3 className="font-black text-2xl uppercase mb-1">Get a Free Quote</h3>
                                    <p className="text-gray-800 font-mono font-bold">Receive a no-obligation quote tailored to your project scope.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Section 2: Why Connect --- */}
            <div className="section-animate py-20 sm:py-28 bg-neo-blue border-b-4 border-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-white text-stroke-black drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Let's Start a Conversation</h2>
                    <p className="mt-6 text-xl text-black font-mono font-bold bg-white inline-block px-4 py-2 border-2 border-black shadow-hard transform rotate-1">Whether you have a question, a project idea, or just want to say hello, we're ready to listen.</p>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 border-4 border-black shadow-hard flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="bg-neo-yellow p-4 rounded-full border-2 border-black mb-4"><ChatIcon /></div>
                            <h3 className="mt-4 text-2xl font-black uppercase">Free Consultation</h3>
                            <p className="mt-2 text-gray-800 font-mono font-bold">Get expert advice on your project with no obligations.</p>
                        </div>
                        <div className="bg-white p-8 border-4 border-black shadow-hard flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                             <div className="bg-neo-pink p-4 rounded-full border-2 border-black mb-4"><BriefcaseIcon /></div>
                            <h3 className="mt-4 text-2xl font-black uppercase">Project Discussion</h3>
                            <p className="mt-2 text-gray-800 font-mono font-bold">Have a specific idea? Let's discuss the details and possibilities.</p>
                        </div>
                        <div className="bg-white p-8 border-4 border-black shadow-hard flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                             <div className="bg-neo-green p-4 rounded-full border-2 border-black mb-4"><SupportIcon /></div>
                            <h3 className="mt-4 text-2xl font-black uppercase">Get Support</h3>
                            <p className="mt-2 text-gray-800 font-mono font-bold">Need help with an existing product? We're here for you.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* --- Section 3: Direct Contact Info --- */}
            <div className="section-animate py-20 sm:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight mb-4">Get in Touch Directly</h2>
                            <p className="mt-4 text-xl text-gray-800 font-mono font-bold">Prefer to reach out the old-fashioned way? Here’s how you can find us.</p>
                            <div className="mt-10 space-y-6">
                                <div className="flex items-center group">
                                    <div className="p-2 bg-neo-yellow border-2 border-black mr-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all"><PhoneIcon /></div>
                                    <a href="tel:+919787963935" className="text-xl text-black font-bold hover:bg-neo-yellow hover:px-2 transition-all">+91 97879 63935</a>
                                </div>
                                <div className="flex items-center group">
                                    <div className="p-2 bg-neo-pink border-2 border-black mr-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all"><EmailIcon /></div>
                                    <a href="mailto:relyceinfotech@gmail.com" className="text-xl text-black font-bold hover:bg-neo-pink hover:px-2 transition-all">relyceinfotech@gmail.com</a>
                                </div>
                            </div>
                        </div>
                        <div className="h-80 bg-gray-200 border-4 border-black shadow-hard overflow-hidden">
                            {/* Replace with a real map embed component if needed */}
                            <img src="https://placehold.co/700x400/FFFFFF/000000?text=Our+Location\nChennai Tamil Nadu,+india" alt="Map of Chennai" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
