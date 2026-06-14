import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';
import destinationsHero from '../assets/logistiqo/chinaPort.jpg';
import hubRotterdam from '../assets/logistiqo/hub-rotterdam.jpg';
import hubSingapore from '../assets/logistiqo/hub-singapore.jpg';
import aboutHero from '../assets/logistiqo/about-hero.jpg';

const PORTS_SLIDER = [
  { name: 'Shanghai, CHN', img: destinationsHero },
  { name: 'Rotterdam, NLD', img: hubRotterdam },
  { name: 'Singapore, SGP', img: hubSingapore },
  { name: 'Hamburg, DEU', img: aboutHero },
];

export default function DestinationsPage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 6000; // 4 seconds per slide
    const intervalTime = 80; // tick every 50ms
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setSlideIndex((prevIndex) => (prevIndex + 1) % PORTS_SLIDER.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);
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
              <div className="relative w-full aspect-square rounded-[24px] overflow-hidden shadow-lg border border-[#E2E8F0] bg-[#fff8f7]">
                {/* Background images (cross-fade) */}
                {PORTS_SLIDER.map((port, idx) => (
                  <img
                    key={port.name}
                    alt={port.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      idx === slideIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    src={port.img}
                  />
                ))}

                {/* Top Row: Floating glass buttons */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <div className="w-10 h-10 rounded-full bg-white/85 backdrop-blur-md border border-white/50 flex items-center justify-center text-[#b61722] shadow-sm">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      public
                    </span>
                  </div>
                  <div className="bg-white/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/50 shadow-sm flex items-center gap-1">
                    <span className="font-['Plus_Jakarta_Sans'] text-[14px] font-bold text-[#271816]">
                      <CountUp end={120} suffix="+" />
                    </span>
                    <span className="font-['Inter'] text-[10px] font-medium text-[#64748B] uppercase">Ports</span>
                  </div>
                </div>

                {/* Bottom Row: Active Port Glass Panel */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/85 backdrop-blur-md border-t border-white/50 p-4 rounded-b-[24px] z-10 flex flex-col justify-between">
                  <div className="mb-2">
                    <span className="block font-['Inter'] text-[9px] font-bold tracking-[0.08em] text-[#b61722] uppercase">
                      Active Port
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#271816] tracking-tight truncate">
                      {PORTS_SLIDER[slideIndex].name}
                    </h3>
                  </div>
                  {/* Red progress bar showing duration/transition */}
                  <div className="h-1.5 w-full bg-[#ffe2df] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#b61722] rounded-full transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    ></div>
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
              <button className="flex items-center gap-1.5 text-[#64748B] hover:text-[#b61722] font-['Inter'] text-xs font-semibold tracking-[0.05em] transition-colors self-start md:self-auto">
                View Full Directory 
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
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
