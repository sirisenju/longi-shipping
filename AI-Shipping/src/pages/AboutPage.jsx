import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';
import aboutHero from '../assets/logistiqo/about-hero.jpg';
import aboutMission from '../assets/logistiqo/about-mission.jpg';

const stats = [
  { end: 15, suffix: '+', label: 'YR EXPERTISE',      color: 'text-[#b61722]' },
  { end: 30, suffix: '+', label: 'CO COUNTRIES',       color: 'text-[#271816]' },
  { end: 60, suffix: 'K+', label: 'TN CARGO HANDLED',  color: 'text-[#271816]' },
];

const missionPoints = [
  { icon: 'check_circle', label: 'End-to-End Visibility' },
  { icon: 'speed',        label: 'Optimized Routing Algorithms' },
  { icon: 'eco',          label: 'Sustainable Fleet Integration' },
];

export default function AboutPage() {
  return (
    <main className="pb-16 min-h-screen">

      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-16 px-4 md:px-8 overflow-hidden min-h-[500px] flex items-center mb-16">
        {/* Background Image Effect */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[#ffffff]">
            <img
              alt="High-contrast logistics facility background"
              className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
              src={aboutHero}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#fff8f7] via-[#fff8f7]/80 to-transparent"></div>
        </div>

        {/* Content Container (z-10 on top of background) */}
        <div className="max-w-[1280px] mx-auto w-full relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              {/* Left: text */}
              <div className="w-full md:w-5/12 flex flex-col justify-center space-y-6">
                <span className="font-['Inter'] text-[12px] leading-none tracking-[0.15em] font-semibold text-[#b61722] uppercase inline-block px-4 py-2 border border-[#E2E8F0] rounded-full self-start bg-white shadow-sm">
                  Our Origin
                </span>
                <h1 className="font-['Plus_Jakarta_Sans'] text-[36px] sm:text-[48px] md:text-[72px] leading-[1.05] tracking-[-0.02em] font-extrabold text-[#271816]">
                  LOGISTICS<br />EXPERTISE<br />REIMAGINED
                </h1>
                <p className="font-['Inter'] text-base text-[#5b403e] leading-relaxed max-w-md">
                  We are engineering the future of global supply chains. By merging industrial reliability with high-performance digital systems, we move the world forward with precision.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-[#b61722] font-semibold hover:underline self-start"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Back to Home
                </Link>
              </div>

              {/* Right: image */}
              <div className="w-full md:w-7/12 relative">
                <div className="rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/10] shadow-sm relative group">
                  <img
                    alt="A modern high-tech logistics distribution center"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    src={aboutHero}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Caption badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <p className="font-['Inter'] text-[14px] font-semibold tracking-wider text-white">
                      Advanced Digital Orchestration Facility
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 mb-16">
        <ScrollReveal delay={100}>
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#E2E8F0]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">
              {stats.map(({ end, suffix, label, color }) => (
                <div key={label} className="flex flex-col items-center justify-center py-6 first:pt-0 last:pb-0 md:py-0">
                  <span className={`font-['Plus_Jakarta_Sans'] text-[48px] leading-[1.1] tracking-[-0.02em] font-extrabold ${color} mb-2`}>
                    <CountUp end={end} suffix={suffix} />
                  </span>
                  <span className="font-['Inter'] text-[14px] font-semibold tracking-[0.15em] text-[#5b403e] uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Mission Section ── */}
      <section className="bg-[#fff0ef] py-16 mb-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

              {/* Image */}
              <div className="rounded-3xl overflow-hidden shadow-sm">
                <img
                  alt="Digital network overlay on shipping containers"
                  className="w-full h-auto object-cover aspect-square"
                  src={aboutMission}
                />
              </div>

              {/* Content */}
              <div className="space-y-8">
                <span className="font-['Inter'] text-[12px] leading-none tracking-[0.15em] font-semibold text-[#b61722] uppercase inline-block px-4 py-2 border border-[#E2E8F0] bg-white rounded-full">
                  Our Mission
                </span>
                <h2 className="font-['Plus_Jakarta_Sans'] text-[36px] leading-tight font-bold text-[#271816] uppercase">
                  DRIVING DIGITAL INNOVATION IN SHIPPING
                </h2>
                <div className="space-y-6 font-['Inter'] text-base text-[#5b403e] leading-relaxed">
                  <p>
                    At Logistiqo, we believe that the physical movement of goods must be matched by the seamless flow of data. Our mission is to dismantle the complexities of global freight through relentless digital innovation and uncompromising service quality.
                  </p>
                  <p>
                    We are building a unified logistics ecosystem where transparency, speed, and reliability are not just promises, but foundational structural guarantees engineered into every route we map and every container we ship.
                  </p>
                </div>
                <ul className="space-y-4 pt-4">
                  {missionPoints.map(({ icon, label }) => (
                    <li key={label} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#b61722] bg-[#da3437]/20 p-2 rounded-full">
                        {icon}
                      </span>
                      <span className="font-['Inter'] text-[14px] font-semibold tracking-wider text-[#271816]">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
