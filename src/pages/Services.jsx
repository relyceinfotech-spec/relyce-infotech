import React, { useState, useEffect, useRef } from "react";
// GSAP is expected to be available globally

const servicesData = [
    {
        id: "webdev",
        title: "Web Development",
        headline: "Crafting Stunning Websites That Convert",
        tools: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB", "REST APIs"],
        color: "bg-neo-yellow",
        content: `Unlock your business potential with us. We build responsive, scalable, and SEO friendly websites tailored to your brand’s unique identity. From simple landing pages to complex e-commerce platforms, we craft solutions that deliver seamless user experiences.`,
    },
    {
        id: "appdev",
        title: "App Development",
        headline: "Next-Gen Mobile Apps for iOS & Android",
        tools: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL"],
        color: "bg-neo-pink",
        content: `Stay ahead in the mobile-first world! We design and develop high-performance mobile applications. We focus on intuitive design, robust functionality, and fast performance to ensure your app stands out and engages users effectively.`,
    },
    {
        id: "digitalmarketing",
        title: "Digital Marketing",
        headline: "Fuel Your Growth with Data-Driven Marketing",
        tools: ["Google Analytics", "SEMrush", "Hootsuite", "Facebook Ads", "SEO Tools"],
        color: "bg-neo-green",
        content: `Boost your brand visibility and drive conversions. From SEO and SEM to social media marketing and content creation, we craft personalized campaigns that increase your online presence and attract quality traffic.`,
    },
    {
        id: "softwaredev",
        title: "Software Development",
        headline: "Custom Software Solutions Tailored to You",
        tools: ["Java", "C#", ".NET", "Python", "Docker", "AWS"],
        color: "bg-neo-purple",
        content: `Streamline your business operations with custom software. We develop scalable and secure software tailored to your specific requirements, helping you automate processes and gain a competitive edge.`,
    },
    {
        id: "uiux",
        title: "UI/UX Design",
        headline: "Designing Experiences Users Love",
        tools: ["Figma", "Adobe XD", "Sketch", "InVision", "User Research"],
        color: "bg-neo-blue",
        content: `Great design drives engagement. Our team crafts visually stunning and user-friendly interfaces. We combine aesthetics with functionality to create designs that reflect your brand’s personality while providing smooth navigation.`,
    },
    {
        id: "ecommerce",
        title: "E-commerce",
        headline: "Your Online Store, Built to Sell",
        tools: ["Shopify", "WooCommerce", "Stripe", "Inventory Management", "SEO"],
        color: "bg-neo-red",
        content: `Launch your online store with confidence. We build fully customizable e-commerce websites integrated with secure payment gateways and user-friendly features to maximize sales.`,
    },
    {
        id: "itconsulting",
        title: "IT Consulting",
        headline: "Expert Tech Guidance for Success",
        tools: ["IT Strategy", "Risk Assessment", "System Integration", "Cloud Consulting"],
        color: "bg-neo-yellow",
        content: `Get expert guidance for your tech challenges. Our IT consulting services help you strategize and implement technology solutions that align with your business goals to drive innovation.`,
    },
];

const Services = () => {
    const [selected, setSelected] = useState(servicesData[0].id);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const timerRef = useRef(null);
    const contentRef = useRef(null);

    const selectedService = servicesData.find((s) => s.id === selected) || servicesData[0];

    // Auto-scroll for desktop only (if desired, or remove if user only wanted it 'scrolling' as in 'interactive')
    // User said "scrolling on lap keep it as this". The current code has auto-scroll. I will keep it but likely only run if not mobile?
    // Actually the previous code had `if (window.innerWidth <= 768 ...)` for auto-scroll. The user wants to CHANGE mobile.
    // So I will remove the mobile auto-scroll since mobile will be a static list.
    // I entered a desktop auto-scroll feature if they want? The previous code ONLY auto-scrolled on MOBILE.
    // "scrolling on lap keep it as this" -> maybe they consider the tab switching as "scrolling"?
    // I will keep the desktop tab interaction manually for now, or maybe add auto-play for desktop if that's what "scrolling" meant.
    // But the code I read had `if (window.innerWidth <= 768`... so it was ONLY animating on mobile.
    // If user implies "keep it as this" on laptop, maybe they want the animation ENABLED on laptop now?
    // Or maybe they just mean the LAYOUT.
    // I will assume layout. I'll disable the mobile auto-scroll since mobile will be a list.

    return (
        <section className="bg-neo-blue border-b-4 border-black px-6 py-20 sm:py-24 font-sans" aria-label="Services Section">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-12 uppercase text-white text-stroke-black drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                Our Services
            </h2>

            {/* MOBILE LAYOUT: Vertical Stack (The "Older One") */}
            <div className="md:hidden flex flex-col gap-8">
                {servicesData.map((service) => (
                    <article key={service.id} className="bg-white border-4 border-black p-6 shadow-hard transition-all hover:shadow-hard-lg hover:-translate-y-1 relative">
                        <div className={`absolute top-0 right-0 p-2 border-l-4 border-b-4 border-black ${service.color} font-mono font-bold text-xs uppercase shadow-hard-sm`}>
                            {service.id}
                        </div>
                        <h3 className="text-3xl font-black mb-3 text-black uppercase leading-tight">
                            {service.title}
                        </h3>
                        <h4 className="text-lg mb-4 font-bold font-mono bg-neo-yellow inline-block px-2 border-2 border-black transform -rotate-1">
                            {service.headline}
                        </h4>
                        <p className="text-base text-black font-medium leading-relaxed mb-6 border-l-4 border-black pl-3">
                            {service.content}
                        </p>
                        <div className="mt-auto">
                            <h5 className="text-black font-black uppercase mb-3 border-b-2 border-black inline-block text-sm">Tools:</h5>
                            <ul className="flex gap-2 flex-wrap">
                                {service.tools.map((tool) => (
                                    <li key={tool} className="bg-black text-white text-xs font-bold uppercase px-2 py-1 border-2 border-transparent">
                                        {tool}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>

            {/* DESKTOP LAYOUT: Interactive Tabs (Keep as is) */}
            <div className="hidden md:flex max-w-7xl mx-auto flex-col md:flex-row md:gap-10">
                {/* Nav Buttons */}
                <nav className="flex flex-col gap-4">
                    {servicesData.map(({ id, title, color }) => (
                        <button
                            key={id}
                            role="tab"
                            aria-selected={selected === id}
                            onClick={() => setSelected(id)}
                            className={`whitespace-nowrap font-black uppercase text-lg px-6 py-4 w-64 text-left border-4 border-black transition-all duration-200 ${
                                selected === id
                                ? `${color} text-black shadow-none translate-x-[2px] translate-y-[2px]`
                                : "bg-white text-gray-500 hover:text-black shadow-hard hover:shadow-hard-lg hover:-translate-y-1"
                            }`}
                        >
                            {title}
                        </button>
                    ))}
                </nav>

                {/* Content Panel */}
                <article
                    key={selected} // Key ensures animation replays on change
                    className="flex-1 bg-white border-4 border-black p-12 shadow-hard-xl relative animate-fade-in-up"
                >
                    <div className={`absolute top-0 right-0 p-2 border-l-4 border-b-4 border-black ${selectedService.color} font-mono font-bold text-xs uppercase shadow-hard-sm`}>
                        Service ID: {selectedService.id}
                    </div>

                    <h3 className="text-5xl font-black mb-4 text-black uppercase leading-tight">
                        {selectedService.title}
                    </h3>
                    <h4 className="text-2xl mb-6 font-bold font-mono bg-neo-yellow inline-block px-2 border-2 border-black transform -rotate-1">
                        {selectedService.headline}
                    </h4>

                    <p className="text-lg text-black font-medium leading-relaxed mb-8 border-l-4 border-black pl-4">
                        {selectedService.content}
                    </p>

                    <div className="mt-auto">
                        <h5 className="text-black font-black uppercase mb-4 border-b-2 border-black inline-block">Tools & Technologies:</h5>
                        <ul className="flex gap-3 flex-wrap">
                            {selectedService.tools.map((tool) => (
                                <li key={tool} className="bg-black text-white text-sm font-bold uppercase px-3 py-2 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors shadow-hard-sm">
                                    {tool}
                                </li>
                            ))}
                        </ul>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Services;
