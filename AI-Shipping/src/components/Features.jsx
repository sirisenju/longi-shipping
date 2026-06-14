import React, { useState } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('estimator');

  // Calculator states
  const [calcService, setCalcService] = useState('air');
  const [calcQuantity, setCalcQuantity] = useState(100);
  const [calcDays, setCalcDays] = useState(30);

  // Inquiry form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formService, setFormService] = useState('freight');
  const [formMessage, setFormMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const getCalculationEstimate = () => {
    const qty = Number(calcQuantity) || 0;
    const days = Number(calcDays) || 0;

    if (calcService === 'air') {
      return {
        unit: 'kg',
        rate: 4.5,
        total: qty * 4.5,
        desc: 'Air Freight standard rate'
      };
    } else if (calcService === 'ocean') {
      return {
        unit: 'CBM',
        rate: 120.0,
        total: qty * 120.0,
        desc: 'Ocean Freight LCL cargo rate'
      };
    } else {
      return {
        unit: 'pallets',
        rate: 0.5,
        total: qty * 0.5 * days,
        desc: `Warehousing for ${days} days`
      };
    }
  };

  const openModalWithTab = (tab) => {
    setActiveTab(tab);
    setIsModalOpen(true);
    if (tab === 'custom') {
      setFormMessage('Hello, I am interested in inquiring about a custom shipping plan/package for my company.');
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: formName,
      email: formEmail,
      company: formCompany,
      service: formService,
      message: formMessage,
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const errMessage = data.message || Object.values(data).flat().join(', ') || 'Submission failed.';
        throw new Error(errMessage);
      }

      setSubmitted(true);
      // Reset form fields
      setFormName('');
      setFormEmail('');
      setFormCompany('');
      setFormMessage('');
      setTimeout(() => {
        setSubmitted(false);
        setIsModalOpen(false);
      }, 3000);
    } catch (err) {
      setSubmitError(err.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="features" className="max-w-[1280px] mx-auto px-4 md:px-8 mb-20 relative">
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
              <button
                onClick={() => openModalWithTab('estimator')}
                className="inline-flex items-center gap-1.5 bg-white text-[#271816] px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
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
                  {feat.title === 'Custom Shipping Plans' && (
                    <button
                      onClick={() => openModalWithTab('custom')}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#b61722] hover:text-[#930013] transition-colors cursor-pointer group"
                    >
                      Inquire Custom Package
                      <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ── Quote & Custom Package Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-[#fff8f7] w-full max-w-lg rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 pb-4 border-b border-[#E2E8F0] flex justify-between items-center bg-white">
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#271816]">
                Logistics Quotes & Plans
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#ffe2df] text-[#64748B] hover:text-[#b61722] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Tab navigation */}
            <div className="flex bg-white border-b border-[#E2E8F0]">
              <button
                onClick={() => setActiveTab('estimator')}
                className={`flex-1 py-3 text-sm font-semibold transition-all ${
                  activeTab === 'estimator'
                    ? 'text-[#b61722] border-b-2 border-[#b61722] bg-[#fff8f7]/50'
                    : 'text-[#64748B] hover:text-[#b61722]'
                }`}
              >
                Rate Estimator
              </button>
              <button
                onClick={() => openModalWithTab('custom')}
                className={`flex-1 py-3 text-sm font-semibold transition-all ${
                  activeTab === 'custom'
                    ? 'text-[#b61722] border-b-2 border-[#b61722] bg-[#fff8f7]/50'
                    : 'text-[#64748B] hover:text-[#b61722]'
                }`}
              >
                Custom Packages
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto flex-grow">
              
              {/* Tab 1: Rate Estimator */}
              {activeTab === 'estimator' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-['Plus_Jakarta_Sans'] text-base font-semibold text-[#271816] mb-1">
                      Quick Shipping Calculator
                    </h4>
                    <p className="font-['Inter'] text-xs text-[#64748B]">
                      Estimate your shipment pricing instantly using our standard baseline rates.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Service select */}
                    <div className="space-y-1.5">
                      <label className="font-['Inter'] text-xs font-semibold text-[#271816]">
                        Select Shipping Service
                      </label>
                      <select
                        value={calcService}
                        onChange={(e) => {
                          setCalcService(e.target.value);
                          setCalcQuantity(e.target.value === 'warehousing' ? 10 : 100);
                        }}
                        className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2.5 font-['Inter'] text-sm text-[#271816] outline-none focus:ring-1 focus:ring-[#b61722] focus:border-[#b61722]"
                      >
                        <option value="air">Air Transport (Expedited)</option>
                        <option value="ocean">Ocean Freight (LCL Cargo)</option>
                        <option value="warehousing">Warehousing (Monthly Storage)</option>
                      </select>
                    </div>

                    {/* Numeric Input */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-['Inter'] text-xs font-semibold text-[#271816]">
                          {calcService === 'air' && 'Cargo Weight (kg)'}
                          {calcService === 'ocean' && 'Cargo Volume (CBM)'}
                          {calcService === 'warehousing' && 'Storage Pallets'}
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={calcQuantity}
                          onChange={(e) => setCalcQuantity(Math.max(1, Number(e.target.value) || 0))}
                          className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2.5 font-['Inter'] text-sm text-[#271816] outline-none focus:ring-1 focus:ring-[#b61722] focus:border-[#b61722]"
                        />
                      </div>

                      {calcService === 'warehousing' && (
                        <div className="space-y-1.5">
                          <label className="font-['Inter'] text-xs font-semibold text-[#271816]">
                            Storage Duration (Days)
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={calcDays}
                            onChange={(e) => setCalcDays(Math.max(1, Number(e.target.value) || 0))}
                            className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2.5 font-['Inter'] text-sm text-[#271816] outline-none focus:ring-1 focus:ring-[#b61722] focus:border-[#b61722]"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing Result */}
                  <div className="bg-[#ffe2df]/60 border border-[#ffe2df] rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-2">
                    <span className="font-['Inter'] text-[11px] font-bold tracking-[0.05em] text-[#b61722] uppercase">
                      Estimated Baseline Cost
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#271816]">
                      ${getCalculationEstimate().total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="font-['Inter'] text-xs text-[#5b403e]">
                      Based on ${getCalculationEstimate().rate.toFixed(2)} per {getCalculationEstimate().unit} ({getCalculationEstimate().desc})
                    </span>
                  </div>

                  <div className="text-center pt-2">
                    <p className="font-['Inter'] text-xs text-[#64748B] mb-3">
                      Need specialized cargo handling, container loads, or volume discount packages?
                    </p>
                    <button
                      onClick={() => openModalWithTab('custom')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b61722] hover:text-[#930013] hover:underline"
                    >
                      Inquire Custom Package Plan
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Custom Package Request */}
              {activeTab === 'custom' && (
                <div>
                  {submitted ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-[#ffe9e7] text-[#b61722] flex items-center justify-center animate-bounce">
                        <span className="material-symbols-outlined text-2xl">check_circle</span>
                      </div>
                      <h4 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#271816]">
                        Inquiry Received!
                      </h4>
                      <p className="font-['Inter'] text-sm text-[#64748B] max-w-sm">
                        Thank you for your request. Our commercial agents will prepare a customized package proposal and email you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <div>
                        <h4 className="font-['Plus_Jakarta_Sans'] text-base font-semibold text-[#271816] mb-1">
                          Inquire Custom Corporate Package
                        </h4>
                        <p className="font-['Inter'] text-xs text-[#64748B]">
                          Submit your service interest and we will configure a tailored logistics pricing scheme for you.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-['Inter'] text-xs font-semibold text-[#271816]">Full Name</label>
                          <input
                            type="text"
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="Jane Doe"
                            className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 font-['Inter'] text-sm text-[#271816] outline-none focus:ring-1 focus:ring-[#b61722] focus:border-[#b61722]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-['Inter'] text-xs font-semibold text-[#271816]">Work Email</label>
                          <input
                            type="email"
                            required
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder="jane@company.com"
                            className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 font-['Inter'] text-sm text-[#271816] outline-none focus:ring-1 focus:ring-[#b61722] focus:border-[#b61722]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-['Inter'] text-xs font-semibold text-[#271816]">Company</label>
                          <input
                            type="text"
                            value={formCompany}
                            onChange={(e) => setFormCompany(e.target.value)}
                            placeholder="Acme Logistics"
                            className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 font-['Inter'] text-sm text-[#271816] outline-none focus:ring-1 focus:ring-[#b61722] focus:border-[#b61722]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-['Inter'] text-xs font-semibold text-[#271816]">Primary Interest</label>
                          <select
                            value={formService}
                            onChange={(e) => setFormService(e.target.value)}
                            className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2.5 font-['Inter'] text-sm text-[#271816] outline-none focus:ring-1 focus:ring-[#b61722] focus:border-[#b61722]"
                          >
                            <option value="freight">Global Freight Forwarding</option>
                            <option value="supply-chain">Custom Corporate Contracts</option>
                            <option value="customs">Warehousing & Distribution</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-['Inter'] text-xs font-semibold text-[#271816]">Message / Request Details</label>
                        <textarea
                          rows="3"
                          required
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          placeholder="Please detail your custom contract requirements..."
                          className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 font-['Inter'] text-sm text-[#271816] outline-none focus:ring-1 focus:ring-[#b61722] focus:border-[#b61722] resize-none"
                        ></textarea>
                      </div>

                      {submitError && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-xs font-['Inter'] flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-red-500">error</span>
                          <span>{submitError}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#b61722] hover:bg-[#930013] text-white py-2.5 rounded-xl font-['Inter'] text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Submitting Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Package Request</span>
                            <span className="material-symbols-outlined text-[16px]">send</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
