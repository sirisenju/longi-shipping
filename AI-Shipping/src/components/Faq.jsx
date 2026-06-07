import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const faqs = [
  {
    q: 'What services does LOGISTIQO provide?',
    a: 'We offer full-service logistics solutions including ocean freight, air cargo, road transport, warehousing, and customs clearance.',
  },
  {
    q: 'Do you handle international shipments?',
    a: 'Yes, we manage shipments across more than 30 countries globally. Our services cover customs clearance compliance, documentation handling, and integrated door-to-door delivery.',
  },
  {
    q: 'How do I track my shipment?',
    a: 'Once your cargo is dispatched, you will receive a tracking code. You can monitor your shipment status in real time via our online client portal or by contacting our 24/7 customer support team.',
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="max-w-[1280px] mx-auto px-4 md:px-8 mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Left: heading */}
      <div className="lg:col-span-4">
        <ScrollReveal>
          <span className="font-['Inter'] text-[12px] leading-none tracking-[0.15em] font-semibold text-[#64748B] mb-4 block uppercase">
            // FAQ //
          </span>
          <h2 className="font-['Plus_Jakarta_Sans'] text-[36px] leading-tight font-bold text-[#271816] uppercase">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>
      </div>

      {/* Right: accordion */}
      <div className="lg:col-span-8">
        <ScrollReveal delay={150}>
          <div className="flex flex-col divide-y divide-[#E2E8F0]">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="py-4 sm:py-6 group">
                  <div
                    className="flex items-center justify-between cursor-pointer select-none"
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                          isOpen
                            ? 'bg-[#271816] text-white'
                            : 'bg-[#ffe2df] text-[#271816] group-hover:bg-[#b61722] group-hover:text-white'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-semibold text-[#271816] group-hover:text-[#b61722] transition-colors duration-200">
                        {faq.q}
                      </h3>
                    </div>
                    <span className="material-symbols-outlined text-[#64748B] group-hover:text-[#b61722] transition-colors">
                      {isOpen ? 'remove' : 'add'}
                    </span>
                  </div>

                  {/* Expandable answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-48 mt-4 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-10 pr-4">
                      <p className="font-['Inter'] text-base text-[#64748B] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
