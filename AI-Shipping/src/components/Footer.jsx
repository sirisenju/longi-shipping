import React from 'react';
import { Link } from 'react-router-dom';
import footerCtaBg from '../assets/logistiqo/footer-cta-bg.jpg';

export default function Footer() {
  return (
    <>
      {/* CTA Banner */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 mb-12">
        <div
          className="bg-[#271816] text-white rounded-[2rem] overflow-hidden relative py-16 px-6 md:p-24 flex flex-col items-center text-center"
        >
          {/* Background image at low opacity */}
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${footerCtaBg})` }}
          />
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-['Plus_Jakarta_Sans'] text-[30px] sm:text-[36px] md:text-[48px] leading-tight font-bold text-white uppercase mb-6">
              Ready to move your business forward?
            </h2>
            <p className="font-['Inter'] text-base opacity-80 mb-8 max-w-lg mx-auto leading-relaxed">
              From planning to delivery, our logistics experts are here to simplify your supply chain and keep your business moving.
            </p>
            <Link to="/contact" className="bg-[#b61722] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#da3437] transition-all hover:scale-95 duration-200 cursor-pointer inline-block">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <footer className="bg-[#fff8f7] border-t border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#b61722]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              directions_boat
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[24px] font-bold text-[#271816] uppercase">
              Logistiqo
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 justify-center">
            <a href="#" className="font-['Inter'] text-[#64748B] hover:text-[#b61722] transition-colors opacity-80 hover:opacity-100">
              Privacy Policy
            </a>
            <a href="#" className="font-['Inter'] text-[#64748B] hover:text-[#b61722] transition-colors opacity-80 hover:opacity-100">
              Terms of Service
            </a>
            <a href="#" className="font-['Inter'] text-[#64748B] hover:text-[#b61722] transition-colors opacity-80 hover:opacity-100">
              Cookie Policy
            </a>
          </div>

          {/* Copyright */}
          <div className="font-['Inter'] text-[#64748B] text-sm">
            © 2024 Logistiqo. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
