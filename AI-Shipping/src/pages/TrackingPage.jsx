import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';
import worldMap from '../assets/logistiqo/world-map-backdrop.jpg';

export default function TrackingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get('id') || '';

  const [trackingInput, setTrackingInput] = useState(queryId);
  const [cargo, setCargo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync state if URL changes (e.g. going back/forward)
  useEffect(() => {
    setTrackingInput(queryId);
  }, [queryId]);

  // Fetch cargo data when queryId changes
  useEffect(() => {
    setIsModalOpen(false);
    if (!queryId) {
      setCargo(null);
      setError(null);
      return;
    }

    const fetchCargo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8000/api/v1/track/?number=${encodeURIComponent(queryId)}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Shipment with tracking number "${queryId}" not found.`);
          }
          throw new Error('Failed to fetch tracking details. Please try again later.');
        }
        const data = await response.json();
        setCargo(data);
      } catch (err) {
        setCargo(null);
        setError(err.message || 'An error occurred while retrieving shipment info.');
      } finally {
        setLoading(false);
      }
    };

    fetchCargo();
  }, [queryId]);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    setSearchParams({ id: trackingInput.trim() });
  };

  // Helper: Get short location representation
  const getShortLocation = (loc) => {
    if (!loc) return '';
    const parts = loc.split(',');
    return parts.length > 1 ? `${parts[parts.length - 2].trim()}, ${parts[parts.length - 1].trim()}` : loc;
  };

  // Helper: Format ISO date string
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return dateStr;
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Helper: Format ISO datetime string
  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    const dateObj = new Date(dateTimeStr);
    if (isNaN(dateObj.getTime())) return dateTimeStr;
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).toUpperCase();
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    });
    return `${formattedDate} • ${formattedTime} UTC`;
  };

  // Helper: Get status display properties
  const getStatusMeta = (status) => {
    switch (status) {
      case 'PENDING':
        return { text: 'Pending', icon: 'pending', color: '#E2B13C', bg: 'bg-[#E2B13C]/10', border: 'border-[#E2B13C]/20', pulse: '#E2B13C' };
      case 'IN_TRANSIT':
        return { text: 'In Transit', icon: 'sailing', color: '#b61722', bg: 'bg-[#b61722]/10', border: 'border-[#b61722]/20', pulse: '#b61722' };
      case 'OUT_FOR_DELIVERY':
        return { text: 'Out For Delivery', icon: 'local_shipping', color: '#3B82F6', bg: 'bg-[#3B82F6]/10', border: 'border-[#3B82F6]/20', pulse: '#3B82F6' };
      case 'DELIVERED':
        return { text: 'Delivered', icon: 'check_circle', color: '#10B981', bg: 'bg-[#10B981]/10', border: 'border-[#10B981]/20', pulse: null };
      case 'DELAYED':
        return { text: 'Delayed', icon: 'warning', color: '#EF4444', bg: 'bg-[#EF4444]/10', border: 'border-[#EF4444]/20', pulse: '#EF4444' };
      default:
        return { text: 'Unknown', icon: 'help', color: '#64748B', bg: 'bg-[#64748B]/10', border: 'border-[#64748B]/20', pulse: null };
    }
  };

  // Helper: Get status history specific metadata
  const getHistoryEventMeta = (status) => {
    switch (status) {
      case 'PENDING':
        return { title: 'Shipment Registered', icon: 'inventory_2' };
      case 'IN_TRANSIT':
        return { title: 'Vessel Underway', icon: 'directions_boat' };
      case 'OUT_FOR_DELIVERY':
        return { title: 'Out For Delivery', icon: 'local_shipping' };
      case 'DELIVERED':
        return { title: 'Delivered', icon: 'check_circle' };
      case 'DELAYED':
        return { title: 'Shipment Delayed', icon: 'warning' };
      default:
        return { title: 'Status Update', icon: 'info' };
    }
  };

  // Dynamic variables from fetched cargo
  const latestHistory = cargo?.history?.[0] || null;
  const currentStatus = latestHistory?.status || 'PENDING';
  const statusMeta = getStatusMeta(currentStatus);

  // Determine progress percentage
  let progressPercent = 0;
  if (cargo) {
    switch (currentStatus) {
      case 'PENDING':
        progressPercent = 15;
        break;
      case 'IN_TRANSIT':
      case 'DELAYED':
        progressPercent = 50;
        break;
      case 'OUT_FOR_DELIVERY':
        progressPercent = 85;
        break;
      case 'DELIVERED':
        progressPercent = 100;
        break;
      default:
        progressPercent = 0;
    }
  }

  // Bezier path positioning for current vessel location
  const t = progressPercent / 100;
  const shipX = Math.round((1 - t) * (1 - t) * 150 + 2 * (1 - t) * t * 400 + t * t * 650);
  const shipY = Math.round((1 - t) * (1 - t) * 250 + 2 * (1 - t) * t * 50 + t * t * 200);

  // Distance metrics based on progress
  const totalDistance = 10570; // Mock total nautical miles
  const distanceCovered = Math.round(totalDistance * (progressPercent / 100));
  const distanceRemaining = totalDistance - distanceCovered;

  const destinationLabel = cargo ? getShortLocation(cargo.destination) : 'Rotterdam (NLRTM)';
  const originLabel = cargo?.history?.length > 0
    ? getShortLocation(cargo.history[cargo.history.length - 1].current_location)
    : 'Shanghai (CNSHA)';

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
                placeholder="Enter Tracking Number (e.g., CRG-2026-FH8T8AEF)"
              />
              <button
                type="submit"
                aria-label="Track shipment"
                disabled={loading}
                className="absolute right-1.5 w-9 h-9 bg-white text-[#271816] hover:bg-[#ffe2df] rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 shadow-sm disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-[#b61722] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className="material-symbols-outlined text-[20px]">search</span>
                )}
              </button>
            </form>
          </ScrollReveal>
        </section>

        {/* ── Welcome State ── */}
        {!queryId && !loading && (
          <div className="glass-panel rounded-[2rem] p-8 text-center max-w-2xl mx-auto mt-8 relative overflow-hidden">
            <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-[#b61722]/5 blur-[60px] rounded-full pointer-events-none"></div>
            <span className="material-symbols-outlined text-[64px] text-[#b61722]/70 mb-4 animate-bounce">sailing</span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-[#271816] mb-3">Live Cargo Tracking</h2>
            <p className="font-['Inter'] text-sm text-[#64748B] leading-relaxed max-w-md mx-auto">
              Ready to track your shipment. Please enter your cargo tracking number in the search bar above to see real-time container coordinates, delivery estimates, transit history, and routing.
            </p>
          </div>
        )}

        {/* ── Loading State ── */}
        {loading && (
          <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full animate-pulse mt-8">
            <div className="w-full lg:w-1/3 glass-panel rounded-[2rem] p-8 flex flex-col gap-6">
              <div className="h-4 w-1/3 bg-[#E2E8F0] rounded"></div>
              <div className="h-8 w-2/3 bg-[#E2E8F0] rounded"></div>
              <div className="h-4 w-1/4 bg-[#E2E8F0] rounded mt-4"></div>
              <div className="h-10 w-full bg-[#E2E8F0] rounded"></div>
              <div className="h-2 w-full bg-[#E2E8F0] rounded mt-4"></div>
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/30">
                {[1, 2, 3, 4].map(n => (
                  <div key={n}>
                    <div className="h-3 w-1/2 bg-[#E2E8F0] rounded mb-1"></div>
                    <div className="h-4 w-3/4 bg-[#E2E8F0] rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-2/3 glass-panel rounded-[2rem] p-2 min-h-[400px] lg:min-h-[500px] bg-white/40">
              <div className="w-full h-full rounded-[1.75rem] bg-[#E2E8F0]/30 min-h-[350px]"></div>
            </div>
          </div>
        )}

        {/* ── Error State ── */}
        {error && !loading && (
          <div className="glass-panel rounded-[2rem] p-8 text-center max-w-2xl mx-auto mt-8 border border-red-100 relative overflow-hidden">
            <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-[#b61722]/5 blur-[60px] rounded-full pointer-events-none"></div>
            <span className="material-symbols-outlined text-[64px] text-red-500/80 mb-4">gpp_maybe</span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-[#271816] mb-3">Shipment Not Found</h2>
            <p className="font-['Inter'] text-sm text-[#64748B] leading-relaxed max-w-md mx-auto mb-6">
              {error}
            </p>
            <button
              onClick={() => setSearchParams({})}
              className="px-6 py-2.5 bg-white text-[#271816] hover:bg-[#ffe2df] rounded-xl font-['Inter'] text-xs font-bold transition-all shadow-sm border border-white/40 active:scale-95"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* ── Details & Map Split Layout (Success State) ── */}
        {cargo && !loading && (
          <>
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
                        <div
                          className="flex items-center gap-2 px-3 py-1 rounded-full shadow-sm backdrop-blur-md border border-white/20"
                          style={{ backgroundColor: `${statusMeta.color}15`, color: statusMeta.color }}
                        >
                          {statusMeta.pulse && (
                            <div
                              className="w-2 h-2 rounded-full pulse-indicator"
                              style={{ backgroundColor: statusMeta.pulse }}
                            ></div>
                          )}
                          <span className="font-['Inter'] text-[11px] font-bold tracking-wide uppercase">{statusMeta.text}</span>
                        </div>
                      </div>
                      <p className="font-['Plus_Jakarta_Sans'] text-[28px] md:text-[32px] text-[#271816] font-bold tracking-tight uppercase break-all">
                        {cargo.tracking_number}
                      </p>
                    </div>

                    <div>
                      <p className="font-['Inter'] text-[11px] font-bold tracking-wider text-[#64748B] mb-2">ESTIMATED DELIVERY</p>
                      <p className="font-['Plus_Jakarta_Sans'] text-[32px] md:text-[36px] font-extrabold text-[#271816] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-[#271816] to-[#565e74]">
                        {formatDate(cargo.estimated_delivery)}
                      </p>
                      <p className="font-['Inter'] text-[14px] text-[#64748B]/90 mt-1">Expected arrival at {cargo.destination}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between font-['Inter'] text-[10px] text-[#64748B]/90 mb-3 font-bold tracking-widest uppercase">
                        <span>{originLabel}</span>
                        <span>{destinationLabel}</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/40 shadow-inner rounded-full overflow-hidden flex relative border border-white/20">
                        <div
                          className="absolute top-0 bottom-0 left-0 bg-[#b61722] rounded-full shadow-[0_0_12px_rgba(182,23,34,0.6)] transition-all duration-1000"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Package Info Grid */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-4 mt-6 pt-4 sm:pt-6 border-t border-white/30">
                      <div>
                        <p className="font-['Inter'] text-[10px] font-bold tracking-wider text-[#64748B] mb-1">SENDER</p>
                        <p className="font-['Inter'] text-sm font-semibold text-[#271816] truncate" title={cargo.sender_name}>{cargo.sender_name}</p>
                      </div>
                      <div>
                        <p className="font-['Inter'] text-[10px] font-bold tracking-wider text-[#64748B] mb-1">RECEIVER</p>
                        <p className="font-['Inter'] text-sm font-semibold text-[#271816] truncate" title={cargo.receiver_name}>{cargo.receiver_name}</p>
                      </div>
                      <div>
                        <p className="font-['Inter'] text-[10px] font-bold tracking-wider text-[#64748B] mb-1">WEIGHT</p>
                        <p className="font-['Inter'] text-sm font-semibold text-[#271816]">{parseFloat(cargo.weight).toLocaleString()} kg</p>
                      </div>
                      <div>
                        <p className="font-['Inter'] text-[10px] font-bold tracking-wider text-[#64748B] mb-1">SERVICE</p>
                        <p className="font-['Inter'] text-sm font-semibold text-[#271816]">Express Ocean</p>
                      </div>
                    </div>

                    {/* View Cargo Contents Button */}
                    {cargo.items && cargo.items.length > 0 && (
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-6 w-full py-3 bg-[#b61722] hover:bg-[#b61722]/90 text-white rounded-xl font-['Inter'] text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer border-0"
                      >
                        <span className="material-symbols-outlined text-[16px]">inventory</span>
                        View Cargo Contents
                      </button>
                    )}
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
                        <path className="opacity-40" d="M 150 250 Q 400 50 650 200" fill="none" stroke="#ffffff" strokeDasharray="6 6" strokeWidth="3"></path>
                        {/* Connecting Arc (Progress) */}
                        <path
                          className="drop-shadow-[0_0_8px_rgba(182,23,34,0.5)] transition-all duration-1000"
                          d="M 150 250 Q 400 50 650 200"
                          fill="none"
                          stroke="#b61722"
                          strokeLinecap="round"
                          strokeWidth="5"
                          pathLength="100"
                          strokeDasharray="100"
                          strokeDashoffset={100 - progressPercent}
                        ></path>
                        {/* Origin Node */}
                        <circle className="drop-shadow-md" cx="150" cy="250" fill="#271816" r="6" stroke="#ffffff" strokeWidth="3"></circle>
                        <text className="drop-shadow-md font-bold text-xs" fill="#271816" fontFamily="Inter" fontSize="12" fontWeight="700" textAnchor="middle" x="150" y="275">
                          {originLabel}
                        </text>
                        {/* Destination Node */}
                        <circle className="drop-shadow-md" cx="650" cy="200" fill="#271816" r="6" stroke="#ffffff" strokeWidth="3"></circle>
                        <text className="drop-shadow-md font-bold text-xs" fill="#271816" fontFamily="Inter" fontSize="12" fontWeight="700" textAnchor="middle" x="650" y="225">
                          {destinationLabel}
                        </text>
                        
                        {/* Vessel Node */}
                        {progressPercent > 0 && (
                          <g transform={`translate(${shipX}, ${shipY})`} className="transition-all duration-1000">
                            <circle className="shadow-lg" cx="0" cy="0" fill="#ffffff" r="18" stroke="#b61722" strokeWidth="2.5"></circle>
                            <text fill="#b61722" fontFamily="Material Symbols Outlined" fontSize="20" textAnchor="middle" x="0" y="6">
                              {statusMeta.icon === 'local_shipping' ? 'local_shipping' : 'directions_boat'}
                            </text>
                            {/* Pulse Effect behind ship */}
                            {currentStatus !== 'DELIVERED' && (
                              <circle cx="0" cy="0" fill="none" r="24" stroke="#b61722" strokeDasharray="4 4" strokeWidth="2">
                                <animate attributeName="r" dur="2.5s" repeatCount="indefinite" values="18; 40; 18"></animate>
                                <animate attributeName="opacity" dur="2.5s" repeatCount="indefinite" values="0.6; 0; 0.6"></animate>
                              </circle>
                            )}
                          </g>
                        )}
                      </svg>
                      
                      {/* Overlay stats card */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-between gap-8 sm:gap-12 bg-white/60 backdrop-blur-xl px-6 sm:px-8 py-2 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50">
                        <div className="text-center">
                          <p className="font-['Inter'] text-[9px] sm:text-[10px] tracking-widest text-[#64748B] mb-1 uppercase">DISTANCE COVERED</p>
                          <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg font-extrabold text-[#b61722]">
                            <CountUp end={distanceCovered} suffix=" NM" />
                          </p>
                        </div>
                        <div className="w-px bg-[#E2E8F0] self-stretch"></div>
                        <div className="text-center">
                          <p className="font-['Inter'] text-[9px] sm:text-[10px] tracking-widest text-[#64748B] mb-1 uppercase">REMAINING</p>
                          <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg font-extrabold text-[#271816]/70">
                            <CountUp end={distanceRemaining} suffix=" NM" />
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
                </div>
              </ScrollReveal>

              {/* Horizontal Ribbon Container */}
              <ScrollReveal delay={150}>
                <div className="flex flex-col sm:flex-row sm:flex-nowrap sm:overflow-x-auto gap-4 pb-6 px-4 sm:snap-x sm:hide-scrollbar">
                  {cargo.history?.map((event, index) => {
                    const eventMeta = getHistoryEventMeta(event.status);
                    const isLatest = index === 0;
                    return (
                      <div
                        key={event.id || index}
                        className={`snap-start sm:shrink-0 w-full sm:w-[340px] glass-panel rounded-3xl p-5 sm:p-6 relative group overflow-hidden transition-transform hover:-translate-y-1 duration-300 ${
                          isLatest ? 'opacity-100 shadow-md' : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        {isLatest && (
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#b61722] to-[#ffdad7]"></div>
                        )}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-3 text-center sm:text-left">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                              isLatest
                                ? 'bg-white/60 text-[#b61722] border-white/50 group-hover:shadow-[0_0_15px_rgba(182,23,34,0.3)]'
                                : 'bg-white/40 text-[#271816]/50 border-white/50'
                            }`}
                          >
                            <span className="material-symbols-outlined fill" style={{ fontSize: '20px' }}>
                              {eventMeta.icon}
                            </span>
                          </div>
                          <div>
                            <p className={`font-['Inter'] text-[15px] ${isLatest ? 'font-extrabold text-[#271816]' : 'font-bold text-[#271816]/80'}`}>
                              {eventMeta.title} at {event.current_location}
                            </p>
                            <p className="font-['Inter'] text-[10px] text-[#64748B] mt-1 uppercase tracking-wider">
                              {formatDateTime(event.updated_at)}
                            </p>
                          </div>
                        </div>
                        {event.remarks && (
                          <p className="font-['Inter'] text-sm text-[#5b403e] leading-relaxed text-center sm:text-left">
                            {event.remarks}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            </section>
          </>
        )}
      </div>

      {/* ── Cargo Contents Modal ── */}
      {isModalOpen && cargo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#271816]/30 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Container */}
          <div className="glass-panel w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[85vh] bg-white/85 animate-in fade-in zoom-in-95 duration-200">
            {/* Top red glow accent */}
            <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-[#b61722]/10 blur-[60px] rounded-full pointer-events-none"></div>

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 sm:px-8 border-b border-[#271816]/10">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl font-bold text-[#271816]">Cargo Shipment Contents</h3>
                <p className="font-['Inter'] text-[11px] text-[#64748B] mt-1 font-semibold tracking-wider uppercase">TRACKING ID: {cargo.tracking_number}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 bg-white/80 hover:bg-[#ffe2df]/30 text-[#271816]/70 rounded-full flex items-center justify-center transition-all cursor-pointer border border-[#271816]/10"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Content Body (Scrollable) */}
            <div className="flex-grow overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 flex flex-col gap-6 scrollbar-thin">
              {/* Itemized Table */}
              <div className="w-full overflow-x-auto rounded-2xl border border-[#271816]/10 bg-white/40 shadow-inner">
                <table className="w-full text-left font-['Inter'] border-collapse">
                  <thead>
                    <tr className="bg-[#271816]/5 text-[#64748B] text-[10px] font-bold tracking-widest border-b border-[#271816]/10">
                      <th className="py-4 px-4 sm:px-5">ITEM DESCRIPTION</th>
                      <th className="py-4 px-4 text-center">QTY</th>
                      <th className="py-4 px-4 text-right">UNIT WT</th>
                      <th className="py-4 px-4 text-right">TOTAL WT</th>
                      <th className="py-4 px-4 text-right">UNIT PRICE</th>
                      <th className="py-4 px-4 text-right">TOTAL VALUE</th>
                      <th className="py-4 px-4 sm:px-5 text-center">CONDITION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cargo.items?.map((item) => {
                      const qty = parseInt(item.quantity) || 1;
                      const unitWt = parseFloat(item.weight) || 0;
                      const totalWt = qty * unitWt;
                      const unitPrice = parseFloat(item.price) || 0;
                      const totalVal = qty * unitPrice;
                      
                      return (
                        <tr key={item.id} className="border-b border-[#271816]/5 hover:bg-[#ffe2df]/10 text-xs font-semibold text-[#271816] last:border-0 transition-colors">
                          <td className="py-4 px-4 sm:px-5 font-bold">{item.name}</td>
                          <td className="py-4 px-4 text-center font-normal text-[#64748B]">{qty}</td>
                          <td className="py-4 px-4 text-right font-normal text-[#64748B]">{unitWt.toFixed(2)} kg</td>
                          <td className="py-4 px-4 text-right">{totalWt.toFixed(2)} kg</td>
                          <td className="py-4 px-4 text-right font-normal text-[#64748B]">${unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          <td className="py-4 px-4 text-right font-bold text-[#b61722]">${totalVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          <td className="py-4 px-4 sm:px-5 text-center">
                            <span className="inline-block px-2 py-1 rounded bg-[#10B981]/10 text-[#10B981] text-[9px] font-bold tracking-wide uppercase">
                              {item.condition}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Financial & Shipping Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                {/* Notes/Instructions */}
                <div className="p-5 rounded-2xl bg-white/40 border border-[#271816]/10 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#b61722]">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider">Secure Logistics</span>
                  </div>
                  <p className="font-['Inter'] text-[11px] text-[#64748B] leading-relaxed">
                    This shipment is insured under policy LGI-948271 and satisfies maritime safety regulations. All weights and pricing values match custom declaration logs.
                  </p>
                </div>

                {/* Financial Summary */}
                <div className="flex flex-col gap-3 font-['Inter'] text-xs font-semibold text-[#271816] p-5 rounded-2xl bg-white/40 border border-[#271816]/10">
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">ITEMS SUBTOTAL</span>
                    <span>
                      ${cargo.items?.reduce((sum, item) => sum + (parseInt(item.quantity) * parseFloat(item.price)), 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">SHIPPING FEES</span>
                    <span>${parseFloat(cargo.shipping_fee).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">INSURANCE</span>
                    <span>${parseFloat(cargo.insurance_fee).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="h-px bg-[#271816]/10 my-1"></div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span>GRAND TOTAL</span>
                    <span className="text-[#b61722]">
                      ${(
                        cargo.items?.reduce((sum, item) => sum + (parseInt(item.quantity) * parseFloat(item.price)), 0) +
                        parseFloat(cargo.shipping_fee) +
                        parseFloat(cargo.insurance_fee)
                      ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-5 sm:px-8 bg-[#271816]/5 border-t border-[#271816]/10 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 bg-[#271816] hover:bg-[#271816]/90 text-white rounded-xl font-['Inter'] text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
  </main>
  );
}
