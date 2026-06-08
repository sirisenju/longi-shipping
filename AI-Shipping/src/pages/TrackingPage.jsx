import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';
import worldMap from '../assets/logistiqo/world-map-backdrop.jpg';

export default function TrackingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get('id') || 'LQ-8472910';

  const [trackingInput, setTrackingInput] = useState(queryId);

  // Sync state if URL changes (e.g. going back/forward)
  useEffect(() => {
    setTrackingInput(queryId);
  }, [queryId]);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    setSearchParams({ id: trackingInput.trim() });
  };

  return (
    <main className="flex-grow pt-24 sm:pt-32 pb-12 sm:pb-16 min-h-screen relative overflow-x-hidden" style={{ backgroundColor: '#f4f6fa' }}>
      
      {/* ── Ethereal Background Blobs ── */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#dae2fd]/40 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#f9dcd9]/50 blur-[150px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-[#ffdad7]/30 blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#87f4f0]/20 blur-[130px]"></div>
      </div>

      <div className="max-w-[1280px] mx-auto w-full px-6 md:px-8">
        
        {/* ── Search Hero ── */}
        <section className="flex flex-col items-center text-center mt-4 mb-6 sm:mb-8 relative">
          <ScrollReveal>
            <h1 className="font-['Plus_Jakarta_Sans'] text-[36px] sm:text-[48px] md:text-[64px] leading-tight font-extrabold text-[#271816] mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#271816] to-[#565e74] uppercase">
              Track Your Shipment
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={100} className="w-full max-w-xl">
            <form onSubmit={handleTrackSubmit} className="relative flex items-center w-full">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                className="w-full pl-5 pr-14 py-3 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 text-[#271816] placeholder-[#64748B]/70 focus:outline-none focus:ring-2 focus:ring-[#ffe2df]/50 focus:border-white/40 font-['Inter'] text-sm transition-all shadow-sm"
                placeholder="Enter Tracking Number (e.g., LQ-8472910)"
              />
              <button
                type="submit"
                aria-label="Track shipment"
                className="absolute right-1.5 w-9 h-9 bg-white text-[#271816] hover:bg-[#ffe2df] rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>
            </form>
          </ScrollReveal>
        </section>

        {/* ── Details & Map Split Layout ── */}
        <section className="flex flex-col lg:flex-row gap-8 items-stretch w-full relative mb-8 sm:mb-12">
          
          {/* Details Floating Panel (Left) */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <ScrollReveal delay={150} className="h-full">
              <div className="glass-panel rounded-[2rem] p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 h-full relative overflow-hidden">
                {/* Red glow decoration */}
                <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-[#b61722]/10 blur-[60px] rounded-full pointer-events-none"></div>
                
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-['Inter'] text-[11px] font-bold tracking-wider text-[#64748B]">SHIPMENT ID</p>
                    <div className="flex items-center gap-2 bg-white/40 text-[#b61722] px-3 py-1 rounded-full shadow-sm backdrop-blur-md border border-white/20">
                      <div className="w-2 h-2 bg-[#b61722] rounded-full pulse-indicator"></div>
                      <span className="font-['Inter'] text-[11px] font-bold tracking-wide uppercase">In Transit</span>
                    </div>
                  </div>
                  <p className="font-['Plus_Jakarta_Sans'] text-[28px] md:text-[32px] text-[#271816] font-bold tracking-tight uppercase break-all">
                    {queryId}
                  </p>
                </div>

                <div>
                  <p className="font-['Inter'] text-[11px] font-bold tracking-wider text-[#64748B] mb-2">ESTIMATED DELIVERY</p>
                  <p className="font-['Plus_Jakarta_Sans'] text-[32px] md:text-[36px] font-extrabold text-[#271816] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-[#271816] to-[#565e74]">
                    Oct 24, 2024
                  </p>
                  <p className="font-['Inter'] text-[14px] text-[#64748B]/90 mt-1">Expected arrival at Port of Rotterdam</p>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between font-['Inter'] text-[10px] text-[#64748B]/90 mb-3 font-bold tracking-widest">
                    <span>SHANGHAI</span>
                    <span>ROTTERDAM</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/40 shadow-inner rounded-full overflow-hidden flex relative border border-white/20">
                    <div className="absolute top-0 bottom-0 left-0 bg-[#b61722] w-[60%] rounded-full shadow-[0_0_12px_rgba(182,23,34,0.6)]"></div>
                  </div>
                </div>

                {/* Package Info Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-4 mt-6 pt-4 sm:pt-6 border-t border-white/30">
                  <div>
                    <p className="font-['Inter'] text-[10px] font-bold tracking-wider text-[#64748B] mb-1">WEIGHT</p>
                    <p className="font-['Inter'] text-sm font-semibold text-[#271816]">14,500 kg</p>
                  </div>
                  <div>
                    <p className="font-['Inter'] text-[10px] font-bold tracking-wider text-[#64748B] mb-1">VOLUME</p>
                    <p className="font-['Inter'] text-sm font-semibold text-[#271816]">2x 40ft HC</p>
                  </div>
                  <div>
                    <p className="font-['Inter'] text-[10px] font-bold tracking-wider text-[#64748B] mb-1">SERVICE</p>
                    <p className="font-['Inter'] text-sm font-semibold text-[#271816]">Express Ocean</p>
                  </div>
                  <div>
                    <p className="font-['Inter'] text-[10px] font-bold tracking-wider text-[#64748B] mb-1">COMMODITY</p>
                    <p className="font-['Inter'] text-sm font-semibold text-[#271816]">Electronics</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Map Visualization (Right) */}
          <div className="w-full lg:w-2/3 flex flex-col">
            <ScrollReveal delay={200} className="h-full">
              <div className="glass-panel rounded-[2rem] p-2 relative overflow-hidden min-h-[400px] lg:min-h-[500px] flex flex-col group h-full">
                
                <div className="absolute top-6 left-8 right-8 flex justify-between items-center z-20 pointer-events-none">
                  <h2 className="font-['Plus_Jakarta_Sans'] text-xl text-[#271816] font-bold drop-shadow-md">Live Route</h2>
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-white/50">
                    <span className="material-symbols-outlined text-[#b61722]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      sailing
                    </span>
                    <span className="font-['Inter'] text-xs font-bold text-[#271816] tracking-wide">Ocean Freight</span>
                  </div>
                </div>

                {/* Map Container */}
                <div className="w-full h-full rounded-[1.75rem] relative overflow-hidden flex-grow bg-white/10 backdrop-blur-sm min-h-[350px]">
                  {/* SVG Map Background */}
                  <img
                    alt="World map route backdrop"
                    className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-color-burn"
                    src={worldMap}
                  />
                  {/* Arc & Nodes SVG */}
                  <svg className="absolute inset-0 w-full h-full drop-shadow-xl" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
                    {/* Connecting Arc (Background/Remaining) */}
                    <path class="opacity-40" d="M 150 250 Q 400 50 650 200" fill="none" stroke="#ffffff" strokeDasharray="6 6" strokeWidth="3"></path>
                    {/* Connecting Arc (Progress) */}
                    <path class="drop-shadow-[0_0_8px_rgba(182,23,34,0.5)]" d="M 150 250 Q 275 150 400 130" fill="none" stroke="#b61722" strokeLinecap="round" strokeWidth="5"></path>
                    {/* Origin Node (Shanghai) */}
                    <circle class="drop-shadow-md" cx="150" cy="250" fill="#271816" r="6" stroke="#ffffff" strokeWidth="3"></circle>
                    <text class="drop-shadow-md" fill="#271816" fontFamily="Inter" fontSize="12" fontWeight="700" textAnchor="middle" x="150" y="275">Shanghai (CNSHA)</text>
                    {/* Destination Node (Rotterdam) */}
                    <circle class="drop-shadow-md" cx="650" cy="200" fill="#271816" r="6" stroke="#ffffff" strokeWidth="3"></circle>
                    <text class="drop-shadow-md" fill="#271816" fontFamily="Inter" fontSize="12" fontWeight="700" textAnchor="middle" x="650" y="225">Rotterdam (NLRTM)</text>
                    {/* Current Position Ship Icon */}
                    <g transform="translate(400, 130)">
                      <circle class="shadow-lg" cx="0" cy="0" fill="#ffffff" r="18" stroke="#b61722" strokeWidth="2.5"></circle>
                      <text class="fill" fill="#b61722" fontFamily="Material Symbols Outlined" fontSize="20" textAnchor="middle" x="0" y="6">directions_boat</text>
                      {/* Pulse Effect behind ship */}
                      <circle cx="0" cy="0" fill="none" r="24" stroke="#b61722" strokeDasharray="4 4" strokeWidth="2">
                        <animate attributeName="r" dur="2.5s" repeatCount="indefinite" values="18; 40; 18"></animate>
                        <animate attributeName="opacity" dur="2.5s" repeatCount="indefinite" values="0.6; 0; 0.6"></animate>
                      </circle>
                    </g>
                  </svg>
                  
                  {/* Overlay stats card */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-between gap-8 sm:gap-12 bg-white/60 backdrop-blur-xl px-6 sm:px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50">
                    <div className="text-center">
                      <p className="font-['Inter'] text-[9px] sm:text-[10px] tracking-widest text-[#64748B] mb-1 uppercase">DISTANCE COVERED</p>
                      <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg font-extrabold text-[#b61722]">
                        <CountUp end={6420} suffix=" NM" />
                      </p>
                    </div>
                    <div className="w-px bg-[#E2E8F0] self-stretch"></div>
                    <div className="text-center">
                      <p className="font-['Inter'] text-[9px] sm:text-[10px] tracking-widest text-[#64748B] mb-1 uppercase">REMAINING</p>
                      <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg font-extrabold text-[#271816]/70">
                        <CountUp end={4150} suffix=" NM" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Tracking History Ribbon ── */}
        <section className="w-full mt-4 sm:mt-8 relative">
          <ScrollReveal>
            <div className="flex justify-between items-end mb-4 px-4">
              <h3 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#271816] font-bold tracking-tight">Tracking History</h3>
              <button className="font-['Inter'] text-xs text-[#64748B] hover:text-[#b61722] transition-colors font-semibold tracking-wider flex items-center gap-1">
                View Full History
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Horizontal Ribbon Container */}
          <ScrollReveal delay={150}>
            <div className="flex flex-col sm:flex-row sm:flex-nowrap sm:overflow-x-auto gap-4 pb-6 px-4 sm:snap-x sm:hide-scrollbar">
              
              {/* Item 1 (Current) */}
              <div className="snap-start sm:shrink-0 w-full sm:w-[340px] glass-panel rounded-3xl p-5 sm:p-6 relative group overflow-hidden transition-transform hover:-translate-y-1 duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#b61722] to-[#ffdad7]"></div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-3 text-center sm:text-left">
                  <div className="w-10 h-10 bg-white/60 rounded-full flex items-center justify-center shadow-sm border border-white/50 group-hover:shadow-[0_0_15px_rgba(182,23,34,0.3)] transition-all shrink-0">
                    <span className="material-symbols-outlined text-[#b61722] fill" style={{ fontSize: '20px' }}>directions_boat</span>
                  </div>
                  <div>
                    <p className="font-['Inter'] text-[15px] font-extrabold text-[#271816]">Vessel Underway</p>
                    <p className="font-['Inter'] text-[10px] text-[#64748B] mt-1 uppercase tracking-wider">OCT 12, 2024 • 08:45 UTC</p>
                  </div>
                </div>
                <p className="font-['Inter'] text-sm text-[#5b403e] leading-relaxed text-center sm:text-left">Passing Malacca Strait. ETA Suez Canal in 6 days.</p>
              </div>

              {/* Item 2 */}
              <div className="snap-start sm:shrink-0 w-full sm:w-[340px] glass-panel rounded-3xl p-5 sm:p-6 relative group overflow-hidden transition-transform hover:-translate-y-1 duration-300 opacity-80 hover:opacity-100">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-3 text-center sm:text-left">
                  <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center border border-white/50 shrink-0">
                    <span className="material-symbols-outlined text-[#271816]/50" style={{ fontSize: '20px' }}>check</span>
                  </div>
                  <div>
                    <p className="font-['Inter'] text-[15px] font-bold text-[#271816]">Departed Port of Loading</p>
                    <p className="font-['Inter'] text-[10px] text-[#64748B] mt-1 uppercase tracking-wider">OCT 08, 2024 • 14:20 CST</p>
                  </div>
                </div>
                <p className="font-['Inter'] text-sm text-[#5b403e] leading-relaxed text-center sm:text-left">Vessel 'Oceanic Pearl' departed Shanghai.</p>
              </div>

              {/* Item 3 */}
              <div className="snap-start sm:shrink-0 w-full sm:w-[340px] glass-panel rounded-3xl p-5 sm:p-6 relative group overflow-hidden transition-transform hover:-translate-y-1 duration-300 opacity-70 hover:opacity-100">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-3 text-center sm:text-left">
                  <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center border border-white/50 shrink-0">
                    <span className="material-symbols-outlined text-[#271816]/50" style={{ fontSize: '20px' }}>check</span>
                  </div>
                  <div>
                    <p className="font-['Inter'] text-[15px] font-bold text-[#271816]">Cleared Customs</p>
                    <p className="font-['Inter'] text-[10px] text-[#64748B] mt-1 uppercase tracking-wider">OCT 06, 2024 • 09:15 CST</p>
                  </div>
                </div>
                <p className="font-['Inter'] text-sm text-[#5b403e] leading-relaxed text-center sm:text-left">Export clearance approved.</p>
              </div>

              {/* Item 4 */}
              <div className="snap-start sm:shrink-0 w-full sm:w-[340px] glass-panel rounded-3xl p-5 sm:p-6 relative group overflow-hidden transition-transform hover:-translate-y-1 duration-300 opacity-60 hover:opacity-100">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-3 text-center sm:text-left">
                  <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center border border-white/50 shrink-0">
                    <span className="material-symbols-outlined text-[#271816]/50" style={{ fontSize: '20px' }}>check</span>
                  </div>
                  <div>
                    <p className="font-['Inter'] text-[15px] font-bold text-[#271816]">Shipment Picked Up</p>
                    <p className="font-['Inter'] text-[10px] text-[#64748B] mt-1 uppercase tracking-wider">OCT 04, 2024 • 11:30 CST</p>
                  </div>
                </div>
                <p className="font-['Inter'] text-sm text-[#5b403e] leading-relaxed text-center sm:text-left">Containers gated in at Shanghai terminal.</p>
              </div>

            </div>
          </ScrollReveal>
        </section>

      </div>
    </main>
  );
}
