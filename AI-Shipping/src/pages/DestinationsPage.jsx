import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';
import destinationsHero from '../assets/logistiqo/destinations-hero.jpg';
import hubRotterdam from '../assets/logistiqo/hub-rotterdam.jpg';
import hubSingapore from '../assets/logistiqo/hub-singapore.jpg';

export default function DestinationsPage() {
  return (
    <main className="pb-16 min-h-screen">
      
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-12 px-4 md:px-8 overflow-hidden min-h-[500px] md:min-h-[819px] flex items-center mb-12">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[#ffffff]">
            <img
              alt="High-contrast, modern architectural view of a massive global shipping port at dawn"
              className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
              src={destinationsHero}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#fff8f7] via-[#fff8f7]/80 to-transparent"></div>
        </div>

        <div className="max-w-[1280px] mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-6">
            <ScrollReveal>
              <div className="inline-block px-4 py-1 rounded-full border-[1.5px] border-[#ffe2df] bg-white/50 backdrop-blur-sm">
                <span className="font-['Inter'] text-[12px] leading-none tracking-[0.15em] font-semibold text-[#b61722] uppercase">
                  Global Network
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] sm:text-[40px] md:text-[72px] leading-[1.05] tracking-[-0.02em] font-extrabold text-[#271816] uppercase">
                Global Reach,<br />
                <span className="text-[#b61722]">Local Precision.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="font-['Inter'] text-base md:text-lg text-[#5b403e] leading-relaxed max-w-2xl">
                Explore our comprehensive network of shipping routes and regional hubs across the globe. We connect continents with industrial-grade reliability and high-performance logistics solutions.
              </p>
            </ScrollReveal>
          </div>

          {/* Stat badge card */}
          <div className="md:col-span-4 w-full max-w-sm justify-self-center md:justify-self-end">
            <ScrollReveal delay={250}>
              <div className="relative w-full aspect-square rounded-[24px] bg-white border border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full bg-[#ffe2df] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#b61722]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      public
                    </span>
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#271816]">
                    <CountUp end={120} suffix="+" />
                  </span>
                </div>
                <div>
                  <p className="font-['Inter'] text-[14px] font-semibold tracking-[0.05em] text-[#64748B] uppercase mb-2">
                    Active Ports
                  </p>
                  <div className="h-1.5 w-full bg-[#ffe2df] rounded-full overflow-hidden">
                    <div className="h-full bg-[#b61722] w-3/4 rounded-full"></div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Primary Hubs Bento Grid ── */}
      <section className="py-12 px-4 md:px-8 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto">
          
          <ScrollReveal>
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="font-['Plus_Jakarta_Sans'] text-[36px] font-bold text-[#271816] mb-4">
                  Primary Hubs
                </h2>
                <p className="font-['Inter'] text-base text-[#64748B] max-w-xl">
                  Strategic locations anchoring our global supply chain infrastructure, equipped with state-of-the-art handling capabilities.
                </p>
              </div>
              <button className="flex items-center gap-2 text-[#b61722] font-['Inter'] text-[14px] font-semibold tracking-[0.05em] hover:text-[#da3437] transition-colors self-start md:self-auto">
                View Full Directory 
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
              
              {/* Rotterdam Card - Large */}
              <div className="md:col-span-8 relative h-[300px] md:h-full rounded-[24px] overflow-hidden group shadow-sm border border-[#E2E8F0]/30">
                <img
                  alt="Sweeping view of the Port of Rotterdam automated container cranes"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={hubRotterdam}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#271816]/90 via-[#271816]/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex justify-between items-end">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full font-['Inter'] text-[11px] font-semibold text-white uppercase border border-white/30">
                        Europe
                      </span>
                      <span className="px-3 py-1 bg-[#b61722]/90 backdrop-blur-md rounded-full font-['Inter'] text-[11px] font-semibold text-white uppercase">
                        Mega Hub
                      </span>
                    </div>
                    <div>
                      <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-bold text-white mb-1">
                        Rotterdam, NLD
                      </h3>
                      <p className="font-['Inter'] text-sm text-white/80">
                        Automated Deep-Water Terminals
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="font-['Plus_Jakarta_Sans'] text-[28px] font-extrabold text-white leading-none">
                      <CountUp end={14.3} decimals={1} suffix="M" />
                    </span>
                    <span className="font-['Inter'] text-[12px] font-semibold tracking-[0.05em] text-white/60 uppercase">
                      TEU Annual
                    </span>
                  </div>
                </div>
              </div>

              {/* Singapore Card - Square */}
              <div className="md:col-span-4 relative h-[300px] md:h-full rounded-[24px] overflow-hidden group shadow-sm border border-[#E2E8F0]/30">
                <img
                  alt="Bustling Port of Singapore transshipment grid at dusk"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={hubSingapore}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#271816]/90 via-[#271816]/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                  <div className="space-y-3">
                    <div>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full font-['Inter'] text-[11px] font-semibold text-white uppercase border border-white/30">
                        Asia Pacific
                      </span>
                    </div>
                    <div>
                      <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-bold text-white mb-1">
                        Singapore, SGP
                      </h3>
                      <p className="font-['Inter'] text-sm text-white/80">
                        Transshipment Center
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

    </main>
  );
}
