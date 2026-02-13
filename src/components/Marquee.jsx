import React from 'react';

const Marquee = () => {
  return (
    <div className="relative w-full overflow-hidden bg-neo-yellow border-y-4 border-black py-4 z-20">
      <div className="absolute inset-0 bg-neo-yellow z-0"></div>
      <div className="flex whitespace-nowrap overflow-hidden">
        <div 
            className="flex animate-marquee"
            style={{ 
                animation: 'marquee 20s linear infinite',
            }}
        >
          {/* Duplicated content for seamless loop */}
          <MarqueeContent />
          <MarqueeContent />
          <MarqueeContent />
          <MarqueeContent />
        </div>
      </div>
    </div>
  );
};

const MarqueeContent = () => (
    <div className="flex gap-8 items-center mr-8">
        <span className="text-4xl font-black font-mono uppercase text-black">Web Development</span>
        <span className="text-4xl font-black text-neo-black">///</span>
        <span className="text-4xl font-black font-mono uppercase text-black">Mobile Apps</span>
        <span className="text-4xl font-black text-neo-black">///</span>
        <span className="text-4xl font-black font-mono uppercase text-black">Cloud Solutions</span>
        <span className="text-4xl font-black text-neo-black">///</span>
        <span className="text-4xl font-black font-mono uppercase text-black">AI & Machine Learning</span>
        <span className="text-4xl font-black text-neo-black">///</span>
        <span className="text-4xl font-black font-mono uppercase text-black">Digital Strategy</span>
        <span className="text-4xl font-black text-neo-black">///</span>
    </div>
);

export default Marquee;
