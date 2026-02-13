import React from 'react';

const FeaturesGrid = () => {
    // Animation removed as requested to fix issues


    return (
        <div className="bg-neo-white text-neo-black py-24 px-4 sm:px-6 lg:px-8 border-t-4 border-black">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 text-stroke-black">Why Partner <br/><span className="bg-neo-yellow px-2 border-2 border-black inline-block transform -rotate-2 shadow-hard">With Relyce?</span></h2>
                    <p className="mt-6 text-xl font-mono font-bold bg-white border-2 border-black p-2 inline-block shadow-hard-sm transform rotate-1">We're more than just a service provider; we're your dedicated growth partner.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left Grid Item (Main Description) */}
                    <div className="feature-col-left bg-white p-10 border-4 border-black shadow-hard flex flex-col justify-center relative overflow-hidden group hover:-translate-y-1 hover:shadow-hard-xl transition-all duration-300">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-neo-green rounded-bl-full border-l-4 border-b-4 border-black z-0 opacity-50 group-hover:opacity-100 transition-all"></div>
                        <div className="relative z-10">
                            <h3 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-none">
                                From Idea to <span className="text-neo-purple">Launch</span> and Beyond
                            </h3>
                            <p className="text-lg font-mono font-bold text-gray-800 leading-relaxed border-l-4 border-neo-green pl-4">
                                Empowering Startups and SMEs with comprehensive, tailor-made solutions. We are your strategic partner in navigating the digital landscape, providing innovative technology and marketing strategies that drive growth.
                            </p>
                        </div>
                    </div>

                    {/* Right Grid Item (Two smaller cards) */}
                    <div className="feature-col-right flex flex-col gap-8">
                        {/* Card 1: Unlock Potential */}
                        <div className="feature-card group relative bg-white p-10 border-4 border-black shadow-hard overflow-hidden hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg transition-all">
                            <div className="absolute top-4 right-4 text-neo-blue">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                            </div>
                            <div className="relative mt-8">
                                <h3 className="text-3xl font-black uppercase mb-4 bg-neo-blue inline-block px-2 border-2 border-black transform -rotate-1">
                                    Unlock Potential
                                </h3>
                                <p className="text-lg font-mono font-bold text-gray-800 leading-relaxed">
                                    We identify unique opportunities and craft tailored strategies to turn your vision into a market-ready reality.
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Delivering Results */}
                        <div className="feature-card group relative bg-white p-10 border-4 border-black shadow-hard overflow-hidden hover:translate-x-1 hover:translate-y-1 hover:shadow-hard-lg transition-all">
                             <div className="absolute top-4 right-4 text-neo-pink">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                </div>
                             <div className="relative mt-8">
                                <h3 className="text-3xl font-black uppercase mb-4 bg-neo-pink inline-block px-2 border-2 border-black transform rotate-1">
                                    Delivering Results
                                </h3>
                                <p className="text-lg font-mono font-bold text-gray-800 leading-relaxed">
                                   Our data-driven approach ensures every action is measured, optimized, and contributes directly to your success.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FeaturesGrid;
