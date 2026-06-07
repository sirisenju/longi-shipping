import React from 'react';
import ScrollReveal from './ScrollReveal';
import warehousingImg from '../assets/logistiqo/service-warehousing.jpg';
import oceanImg from '../assets/logistiqo/service-ocean-freight.jpg';
import airImg from '../assets/logistiqo/service-air-transport.jpg';

const services = [
  {
    title: 'Warehousing',
    desc: 'Secure, scalable storage solutions for all your inventory needs.',
    icon: 'warehouse',
    img: warehousingImg,
  },
  {
    title: 'Ocean Freight',
    desc: 'Cost-effective global shipping with reliable transit times.',
    icon: 'directions_boat',
    img: oceanImg,
  },
  {
    title: 'Air Transport',
    desc: 'Expedited shipping when speed is your top priority.',
    icon: 'flight_takeoff',
    img: airImg,
  },
];

export default function Services() {
  return (
    <section id="services" className="max-w-[1280px] mx-auto px-4 md:px-8 mb-20">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col gap-2 mb-4">
            <span className="font-['Inter'] text-[12px] leading-none tracking-[0.15em] font-semibold text-[#64748B]">
              // OUR SERVICES //
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-[36px] leading-tight font-bold text-[#271816] uppercase">
              Explore Our Services
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${service.img})` }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#271816]/90 via-[#271816]/40 to-transparent" />
                {/* Card content */}
                <div className="absolute bottom-0 left-0 p-8 flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#b61722] flex items-center justify-center text-white shadow-lg mb-2 group-hover:-translate-y-2 transition-transform duration-300">
                    <span className="material-symbols-outlined">{service.icon}</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] leading-snug font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="font-['Inter'] text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
