import React from 'react';
import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';
import avatarDavid from '../assets/logistiqo/user.jpg';

const logos = ['Sisyphus', 'Magnolia', 'Epicurious', 'Sisyphus', 'Magnolia'];

export default function Testimonials() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-8 mb-20">
      {/* Main testimonial grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left: Big stat */}
        <ScrollReveal>
          <div className="font-['Plus_Jakarta_Sans'] text-[36px] sm:text-[48px] md:text-[72px] leading-none tracking-[-0.02em] font-extrabold text-[#271816] mb-6">
            <span className="text-[#b61722]">
              +<CountUp end={99} suffix="%" />
            </span><br />
            Achieving Excellence Every Time
          </div>
        </ScrollReveal>

        {/* Right: Quote + attribution */}
        <ScrollReveal delay={150}>
          <div className="flex flex-col gap-8">
            <p className="font-['Plus_Jakarta_Sans'] text-[24px] leading-relaxed font-semibold text-[#271816] italic">
              "Working with Boulevard felt less like building with a creative partner. Every visual, every word—just hit right."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-[#ffe9e7] shrink-0">
                <img alt="David Wilson" className="w-full h-full object-cover" src={avatarDavid} />
              </div>
              <div>
                <h4 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#271816]">David Wilson</h4>
                <p className="font-['Inter'] text-sm text-[#64748B]">Business Consultant</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Logo marquee */}
      <ScrollReveal delay={300}>
        <div className="mt-16 pt-10 border-t border-[#E2E8F0] overflow-hidden relative w-full">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fff8f7] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fff8f7] to-transparent z-10 pointer-events-none" />

          <div className="flex items-center gap-16 whitespace-nowrap animate-[marquee_20s_linear_infinite] w-[200%]">
            {/* Set 1 */}
            <div className="flex items-center gap-16 min-w-full justify-around opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              {logos.map((name, i) => (
                <span key={i} className="font-['Plus_Jakarta_Sans'] text-2xl font-bold tracking-widest uppercase text-[#271816]">
                  {name}
                </span>
              ))}
            </div>
            {/* Set 2 (duplicate for seamless loop) */}
            <div className="flex items-center gap-16 min-w-full justify-around opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              {logos.map((name, i) => (
                <span key={i} className="font-['Plus_Jakarta_Sans'] text-2xl font-bold tracking-widest uppercase text-[#271816]">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
