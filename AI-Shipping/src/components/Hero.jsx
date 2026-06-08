import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/logistiqo/hero-bg.jpg';
import videoThumb from '../assets/logistiqo/floating-video-thumb.jpg';

export default function Hero() {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    navigate(`/track?id=${encodeURIComponent(trackingId.trim())}`);
  };
  return (
    <section id="home" className="w-full mb-24">
      {/* Full-bleed image div — no padding, no border-radius, stretches 100vw behind navbar */}
      <div
        className="relative w-full min-h-screen flex items-center"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#271816]/50 mix-blend-multiply" />

        {/* Content — centred, padded, pushed below navbar with pt-32 */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-16 pt-32 pb-20">
          <div className="max-w-3xl flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold tracking-wider border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#da3437]" />
              Best Support
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-[36px] sm:text-[48px] md:text-[72px] leading-[1.05] tracking-[-0.02em] font-extrabold text-white uppercase">
              Take your shipping<br />to the next level
            </h1>

            <p className="text-white/90 text-lg md:text-xl max-w-xl font-['Inter'] leading-relaxed">
              Simplify logistics, reduce costs, and deliver faster with our all-in-one shipping management platform.
            </p>

            {/* Tracking Input Container */}
            <form onSubmit={handleTrack} className="w-full max-w-sm flex flex-col gap-2 mt-2">
              <div className="relative flex items-center w-full">
                <input
                  type="text"
                  placeholder="Input tracking Id"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full pl-5 pr-14 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#ffe2df]/50 focus:border-white/40 focus:bg-white/20 font-['Inter'] text-sm transition-all"
                />
                <button
                  type="submit"
                  aria-label="Track shipment"
                  className="absolute right-1.5 w-9 h-9 bg-white text-[#271816] hover:bg-[#ffe2df] rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Floating Video Badge — anchored to bottom-right of the full-bleed block */}
        <div className="hidden lg:flex absolute bottom-12 right-12 bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl p-4 items-center gap-4 text-white w-64 shadow-xl">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#fff8f7]">
            <img className="w-full h-full object-cover" alt="Warehouse logistics" src={videoThumb} />
            <div className="absolute inset-0 flex items-center justify-center bg-[#271816]/30">
              <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm">See how we work.</p>
            <p className="text-xs opacity-75 mt-1">01 / 04</p>
          </div>
        </div>
      </div>
    </section>
  );
}
