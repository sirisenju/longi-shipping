import React from 'react';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: 'local_shipping',
    title: 'Fast & Secure Delivery',
    desc: 'We prioritize speed and safety, making sure your goods arrive on time and in perfect condition.',
  },
  {
    icon: 'inventory_2',
    title: 'Custom Shipping Plans',
    desc: 'Every business is different. We tailor logistics strategies that fit your timeline, budget, and requirements.',
  },
  {
    icon: 'support_agent',
    title: '24/7 Tracking & Support',
    desc: 'Stay informed with real-time shipment tracking and round-the-clock customer assistance.',
  },
];

export default function Features() {
  return (
    <section id="features" className="max-w-[1280px] mx-auto px-4 md:px-8 mb-20">
      <ScrollReveal>
        <div className="bg-[#ffe2df] rounded-[2rem] p-4 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 overflow-hidden relative">
          {/* Radial gradient decoration */}
          <div
            className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at top right, #da3437, transparent 40%)' }}
          />

          {/* Left: heading + CTA */}
          <div className="flex flex-col justify-between z-10 relative">
            <div>
              <span className="font-['Inter'] text-[12px] leading-none tracking-[0.15em] font-semibold text-[#b61722] mb-4 block uppercase">
                // WHY CHOOSE US //
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-[36px] leading-tight font-bold text-[#271816] uppercase max-w-md">
                Why Businesses Choose Us For Their Logistics &amp; Shipping
              </h2>
            </div>
            <div className="mt-8 lg:mt-0">
              <button className="inline-flex items-center gap-1.5 bg-white text-[#271816] px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                Get a Quote
                <span className="material-symbols-outlined text-[16px]">north_east</span>
              </button>
            </div>
          </div>

          {/* Right: feature cards */}
          <div className="flex flex-col gap-4 z-10 relative">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col sm:flex-row items-start gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#ffe9e7] flex items-center justify-center shrink-0 text-[#b61722]">
                  <span className="material-symbols-outlined">{feat.icon}</span>
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-semibold text-[#271816] mb-2">
                    {feat.title}
                  </h3>
                  <p className="font-['Inter'] text-sm text-[#64748B] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
