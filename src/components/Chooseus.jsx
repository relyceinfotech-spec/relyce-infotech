import React from 'react';

// Data for the "Why Choose Us" section
const featuresData = [
  {
    title: "Comprehensive Support",
    description: "From the initial spark of an idea to a successful product launch and beyond, we provide continuous, end-to-end support to ensure your project thrives.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
    align: 'left'
  },
  {
    title: "Affordable Solutions",
    description: "We believe in empowering new businesses. Our services are strategically priced to be cost-effective for startups and SMEs without compromising on quality.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    align: 'right'
  },
  {
    title: "Experienced Team",
    description: "Our team consists of skilled professionals with years of industry experience, all dedicated to applying their expertise to deliver exceptional, quality results.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    align: 'left'
  },
  {
    title: "Client-Centric Approach",
    description: "Your success is our primary goal. We take the time to deeply understand your specific business needs to ensure our solutions are perfectly aligned with your vision.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>`,
    // align: 'left'
  }
];

const WhyChooseUs = () => {


    return (
        <div className="bg-neo-pink text-neo-black py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-16 px-4">
                    <h2 className="text-5xl lg:text-7xl font-black uppercase text-white text-stroke-black drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]">Why Choose Us</h2>
                    <p className="mt-6 text-xl font-mono font-bold bg-white border-2 border-black inline-block p-4 shadow-hard transform -rotate-1">Your success is our mission. Here's why we're the right choice for you.</p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuresData.map((feature, index) => (
                        <div 
                            key={index} 
                            className={`why-card-${feature.align} bg-white p-8 border-4 border-black shadow-hard flex flex-col items-center text-center hover:shadow-hard-xl hover:-translate-y-1 transition-all duration-300`}
                        >
                            <div className="text-black mb-6 bg-neo-yellow p-4 border-2 border-black rounded-full shadow-hard-sm" dangerouslySetInnerHTML={{ __html: feature.icon }} />
                            <div>
                                <h3 className="text-3xl font-black text-black mb-3 uppercase">{feature.title}</h3>
                                <p className="text-gray-800 font-mono font-bold leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
