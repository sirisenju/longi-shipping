import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home',         to: '/' },
  { label: 'About',        to: '/about' },
  { label: 'Discover',     to: '/discover' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Contact',      to: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (to) => {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to.split('#')[0]) && to.split('#')[0] !== '/';
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
      <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between px-6 md:px-8 py-4 bg-white/80 backdrop-blur-md rounded-full shadow-sm">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[#b61722]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            directions_boat
          </span>
          <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#271816] uppercase tracking-tight">
            Logistiqo
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className={
                isActive(to)
                  ? 'bg-[#ffe2df] rounded-full px-4 py-1 text-[#271816] font-semibold'
                  : 'text-[#5b403e] px-4 py-1 hover:text-[#b61722] transition-colors duration-300'
              }
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex bg-[#b61722] text-white hover:bg-[#930013] duration-200 transition-all font-semibold px-4 py-1.5 rounded-lg text-xs cursor-pointer items-center gap-1.5">
            Get Connected
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </button>
          <button
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-[#ffe2df] text-[#271816] cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 mx-0 bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-lg flex flex-col gap-3 border border-[#E2E8F0]/20 animate-mobile-menu">
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className={`font-semibold text-lg py-2 border-b border-[#E2E8F0]/10 transition-colors ${
                isActive(to) ? 'text-[#b61722]' : 'text-[#271816] hover:text-[#b61722]'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <button className="sm:hidden mt-2 bg-[#b61722] text-white hover:bg-[#930013] duration-200 transition-all font-semibold px-4 py-2 rounded-lg text-xs cursor-pointer flex items-center justify-center gap-1.5">
            Get Connected
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </button>
        </div>
      )}
    </nav>
  );
}
