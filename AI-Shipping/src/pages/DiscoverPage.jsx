import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import discoverFeatured from '../assets/logistiqo/discover-featured.jpg';
import card1Img from '../assets/logistiqo/discover-card1.jpg';
import card2Img from '../assets/logistiqo/discover-card2.jpg';
import card3Img from '../assets/logistiqo/discover-card3.jpg';

const articles = [
  {
    img: card1Img,
    tag: '// TRENDS //',
    tagColor: 'text-[#b61722]',
    title: 'Global Supply Chain Resilience in 2024',
    desc: 'Analyzing the shift from just-in-time to just-in-case inventory strategies across major global manufacturing hubs.',
    meta: '5 min read',
    metaIcon: 'arrow_outward',
  },
  {
    img: card2Img,
    tag: '// CASE STUDY //',
    tagColor: 'text-[#271816]',
    title: 'Optimizing Last-Mile Delivery Protocols',
    desc: 'How a leading e-commerce retailer achieved a 22% reduction in delivery times through micro-fulfillment centers.',
    meta: 'PDF Download',
    metaIcon: 'download',
  },
  {
    img: card3Img,
    tag: '// WHITEPAPER //',
    tagColor: 'text-[#006765]',
    title: 'Sustainable Logistics: The Zero-Emission Goal',
    desc: 'A comprehensive guide to transitioning enterprise fleets to electric and hydrogen power over the next decade.',
    meta: '12 Pages',
    metaIcon: 'download',
  },
];

export default function DiscoverPage() {
  const [email, setEmail] = useState('');

  return (
    <main className="flex-grow pt-[120px] pb-10">

      {/* ── Hero / Intro ── */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 py-10">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            <span className="font-['Inter'] text-[12px] leading-none tracking-[0.15em] font-semibold text-[#b61722] uppercase">
              // Resource Hub //
            </span>
            <h1 className="font-['Plus_Jakarta_Sans'] text-[36px] sm:text-[48px] md:text-[72px] leading-[1.05] tracking-[-0.02em] font-extrabold text-[#271816]">
              Discover Innovation
            </h1>
            <p className="font-['Inter'] text-lg text-[#64748B] leading-relaxed max-w-2xl">
              Insights, analysis, and thought leadership shaping the future of global supply chains and logistics performance.
            </p>
            {/* Search bar */}
            <div className="w-full max-w-xl relative mt-4">
              <input
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white border border-[#E2E8F0] focus:border-[#b61722] focus:ring-1 focus:ring-[#b61722] outline-none font-['Inter'] text-base text-[#271816] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05)] transition-shadow"
                placeholder="Search articles, whitepapers..."
                type="text"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]">
                search
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Featured Article ── */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 pb-10">
        <ScrollReveal delay={100}>
          <div className="relative w-full h-[380px] sm:h-[450px] md:h-[500px] rounded-[24px] overflow-hidden group cursor-pointer shadow-[0_10px_15px_-3px_rgb(0,0,0,0.1)]">
            {/* BG image with zoom on hover */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${discoverFeatured})` }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#271816]/90 via-[#271816]/40 to-transparent" />
            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-12 w-full md:w-2/3">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#b61722] text-white px-3 py-1 rounded-full font-['Inter'] text-xs font-semibold uppercase tracking-wider">
                  NEW
                </span>
                <span className="text-white/80 font-['Inter'] text-[12px] font-semibold tracking-[0.15em] uppercase">
                  // Deep Dive //
                </span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-[22px] sm:text-[28px] md:text-[36px] leading-tight font-bold text-white mb-4 group-hover:text-[#ffb3ad] transition-colors duration-300">
                The Next Era of Autonomous Freight: Predictive Routing &amp; AI
              </h2>
              <p className="font-['Inter'] text-base text-white/80 mb-6 line-clamp-2 leading-relaxed">
                How machine learning models are fundamentally altering long-haul logistics planning, reducing fuel consumption by up to 14% while improving delivery predictability.
              </p>
              <div className="flex items-center gap-2 text-white font-['Inter'] text-[14px] font-semibold tracking-wider group-hover:gap-4 transition-all duration-300">
                Read Full Article
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Resource Grid ── */}
      <section className="bg-[#fff8f7]/50 border-y border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12">
          {/* Header */}
          <ScrollReveal>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-['Plus_Jakarta_Sans'] text-[24px] leading-snug font-semibold text-[#271816] mb-2">
                  Latest Insights
                </h2>
                <p className="font-['Inter'] text-base text-[#64748B]">
                  Curated resources for logistics professionals.
                </p>
              </div>
              <button className="hidden md:flex items-center gap-2 text-[#b61722] font-['Inter'] text-[14px] font-semibold tracking-wider hover:text-[#da3437] transition-colors">
                View All
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Cards */}
          <ScrollReveal delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((a, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[24px] p-6 flex flex-col shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.1)] transition-shadow duration-300 border border-[#E2E8F0] group cursor-pointer"
                >
                  {/* Image */}
                  <div className="h-48 rounded-xl overflow-hidden mb-6 bg-[#ffe2df] relative">
                    <img
                      alt={a.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={a.img}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#E2E8F0]">
                      <span className={`font-['Inter'] text-[12px] font-semibold tracking-[0.15em] ${a.tagColor} uppercase`}>
                        {a.tag}
                      </span>
                    </div>
                  </div>
                  {/* Text */}
                  <div className="flex-grow">
                    <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#271816] mb-3 group-hover:text-[#b61722] transition-colors">
                      {a.title}
                    </h3>
                    <p className="font-['Inter'] text-sm text-[#64748B] leading-relaxed line-clamp-3">
                      {a.desc}
                    </p>
                  </div>
                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex justify-between items-center text-[#64748B] font-['Inter'] text-xs">
                    <span>{a.meta}</span>
                    <span className="material-symbols-outlined group-hover:text-[#b61722] transition-colors">
                      {a.metaIcon}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Mobile "View All" */}
          <button className="md:hidden mt-8 w-full flex items-center justify-center gap-2 text-[#b61722] font-['Inter'] text-[14px] font-semibold py-4 border border-[#E2E8F0] rounded-full hover:bg-[#fff8f7] transition-colors">
            View All Resources
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* ── Newsletter Signup ── */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 py-12">
        <ScrollReveal>
          <div className="bg-[#271816] rounded-[24px] py-12 px-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Decorative glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#b61722]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#006765]/10 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

            {/* Left: copy */}
            <div className="w-full md:w-1/2 z-10 text-center md:text-left">
              <span className="font-['Inter'] text-[12px] font-semibold tracking-[0.15em] text-[#ffdad7] uppercase mb-4 block">
                // STAY INFORMED //
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-[28px] sm:text-[36px] leading-tight font-bold text-[#fff8f7] mb-4">
                Logistics Intelligence, Delivered.
              </h2>
              <p className="font-['Inter'] text-base text-[#f9dcd9]/80 leading-relaxed">
                Join 10,000+ industry professionals who receive our weekly insights on supply chain optimization and tech trends.
              </p>
            </div>

            {/* Right: form */}
            <div className="w-full md:w-1/2 z-10">
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex-grow">
                  <label className="sr-only" htmlFor="discover-email">Email address</label>
                  <input
                    id="discover-email"
                    className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#ffdad7] focus:ring-1 focus:ring-[#ffdad7] outline-none font-['Inter'] transition-colors"
                    placeholder="Enter your business email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-[#b61722] hover:bg-[#da3437] text-white px-8 py-4 font-['Inter'] text-[14px] font-semibold tracking-wider flex items-center justify-center gap-2 whitespace-nowrap shadow-lg transition-colors active:scale-95 duration-200 cursor-pointer"
                >
                  Subscribe
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </form>
              <p className="text-[#f9dcd9]/50 text-xs mt-3 font-['Inter'] text-center md:text-left">
                By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}
