import React, { useRef, useMemo, useEffect } from "react";
import gsap from "gsap";

// --- Icons ---
import { LuBriefcase, LuSmile, LuHeadphones, LuUsers } from "react-icons/lu";

// Wrapper for consistency if needed, or just use directly in the stats array
const IconWrapper = ({ children }) => (
    <div className="h-8 w-8 mb-4 text-black">
        {React.cloneElement(children, { size: "100%", strokeWidth: 3 })}
    </div>
);

// --- Main Component ---
const StatsSection = () => {
  const containerRef = useRef(null);

  const stats = useMemo(
    () => [
      { value: 20, suffix: "+", label: "Projects Completed", icon: <IconWrapper><LuBriefcase /></IconWrapper>, color: "bg-neo-yellow" },
      { value: 100, suffix: "%", label: "Client Satisfaction", icon: <IconWrapper><LuSmile /></IconWrapper>, color: "bg-neo-pink" },
      { value: "24/7", suffix: "", label: "Support Available", icon: <IconWrapper><LuHeadphones /></IconWrapper>, color: "bg-neo-blue" },
      { value: 20, suffix: "+", label: "Expert Team Members", icon: <IconWrapper><LuUsers /></IconWrapper>, color: "bg-neo-green" },
    ],
    []
  );

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll(".stat-number");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elem = entry.target;
            const targetStat = stats.find((stat) => stat.label === elem.dataset.label);

            if (targetStat && typeof targetStat.value === "number") {
              let counter = { val: 0 };
              gsap.to(counter, {
                val: targetStat.value,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                  elem.textContent = Math.round(counter.val) + targetStat.suffix;
                },
              });
            }
            observer.unobserve(elem); // ✅ run only once per stat
          }
        });
      },
      { threshold: 0.5 } // when 50% of element is visible
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [stats]);

  return (
    <div ref={containerRef} className="bg-white py-20 sm:py-24 border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-card ${stat.color} border-4 border-black p-8 text-center flex flex-col items-center justify-center transition-all duration-300 shadow-hard hover:shadow-hard-lg hover:-translate-y-1`}
            >
              <div className="bg-white p-3 border-2 border-black rounded-full mb-4 shadow-hard-sm">
                {stat.icon}
              </div>
              <p
                className="text-4xl sm:text-5xl font-black text-black stat-number leading-none"
                data-label={stat.label}
              >
                {typeof stat.value === "number" ? `0${stat.suffix}` : stat.value}
              </p>
              <p className="text-lg text-black font-bold font-mono mt-2 uppercase tracking-wide bg-white px-2 border-2 border-black">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
