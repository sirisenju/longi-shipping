import React from 'react';
import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';

export default function About() {
  return (
    <section id="about" className="max-w-[1280px] mx-auto px-4 md:px-8 mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Left: Section tag */}
      <div className="lg:col-span-4 flex items-start">
        <ScrollReveal>
          <span className="font-['Inter'] text-[12px] leading-none tracking-[0.15em] font-semibold text-[#64748B]">
            // ABOUT US //
          </span>
        </ScrollReveal>
      </div>

      {/* Right: Content */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        <ScrollReveal>
          <h2 className="font-['Plus_Jakarta_Sans'] text-[36px] leading-tight font-bold text-[#271816]">
            At LOGISTIQO, We combine logistics expertise and digital innovation to deliver cargo with speed, confidence, and impact worldwide.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#E2E8F0]">
            <div className="flex flex-col gap-1 items-center text-center sm:items-start sm:text-left w-full">
              <span className="font-['Plus_Jakarta_Sans'] text-[36px] font-bold text-[#271816]">
                <CountUp end={15} suffix="+" /> <span className="text-[#64748B] text-2xl font-semibold">YR</span>
              </span>
              <span className="font-['Inter'] text-[14px] font-semibold tracking-wider text-[#64748B]">
                of shipping expertise
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center text-center sm:items-start sm:text-left w-full">
              <span className="font-['Plus_Jakarta_Sans'] text-[36px] font-bold text-[#271816]">
                <CountUp end={30} suffix="+" /> <span className="text-[#64748B] text-2xl font-semibold">CO</span>
              </span>
              <span className="font-['Inter'] text-[14px] font-semibold tracking-wider text-[#64748B]">
                Countries Covered
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center text-center sm:items-start sm:text-left w-full">
              <span className="font-['Plus_Jakarta_Sans'] text-[36px] font-bold text-[#271816]">
                <CountUp end={60} suffix="K+" /> <span className="text-[#64748B] text-2xl font-semibold">TN</span>
              </span>
              <span className="font-['Inter'] text-[14px] font-semibold tracking-wider text-[#64748B]">
                Cargo handled worldwide
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
