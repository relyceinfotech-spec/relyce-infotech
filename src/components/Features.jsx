import React from 'react';
import ScrollReveal from './ScrollReveal';

const FeaturesGrid = () => {
    return (
        <div
            style={{
                backgroundColor: '#0a0a0a',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: "'Inter', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
            className="py-24 px-6 sm:px-8 lg:px-16"
        >
            {/* Thin top divider line with warm gradient */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.15), transparent)',
            }} />

            <div className="max-w-5xl mx-auto space-y-16">

                <ScrollReveal
                    baseOpacity={0.1}
                    enableBlur
                    baseRotation={2}
                    blurStrength={3}
                    textClassName="text-[#e8e4df]"
                    highlightWords={['engineer', 'backbone', 'strategy', 'deployment', 'precision', 'purpose']}
                >
                    We engineer the backbone of your business from strategy to deployment, with precision and purpose.
                </ScrollReveal>

                <ScrollReveal
                    baseOpacity={0.1}
                    enableBlur
                    baseRotation={-2}
                    blurStrength={3}
                    textClassName="text-[#e8e4df]"
                    highlightWords={['AI,', 'automation,', 'cloud', 'infrastructure', 'unfair', 'advantage', 'digitalfirst']}
                >
                    AI, automation, and cloud infrastructure your unfair advantage in a digital first world.
                </ScrollReveal>

            </div>

            {/* Thin bottom divider line with warm gradient */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.15), transparent)',
            }} />
        </div>
    );
};

export default FeaturesGrid;
