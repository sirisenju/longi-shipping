import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import destinationsHero from '../assets/logistiqo/destinations-hero.jpg';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('http://localhost:8000/api/v1/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const errMessage = data.message || Object.values(data).flat().join(', ') || 'Failed to submit contact message. Please try again.';
        throw new Error(errMessage);
      }

      setSubmitted(true);
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: ''
        });
        setSubmitted(false);
      }, 4000);
    } catch (err) {
      setSubmitError(err.message || 'An error occurred while transmitting your message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex-grow pb-16 min-h-screen">
      
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-12 px-4 md:px-8 overflow-hidden flex items-center mb-12">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[#ffffff]">
            <img
              alt="High-contrast global shipping port background"
              className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
              src={destinationsHero}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#fff8f7] via-[#fff8f7]/70 to-transparent"></div>
        </div>

        <div className="max-w-[1280px] mx-auto w-full relative z-10 text-center md:text-left pt-8">
          <ScrollReveal>
            <div className="max-w-4xl space-y-3">
              <span className="font-['Inter'] text-[12px] leading-none tracking-[0.15em] font-semibold text-[#b61722] uppercase block">
                Contact Us
              </span>
              <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] sm:text-[40px] md:text-[64px] leading-[1.1] tracking-[-0.02em] font-extrabold text-[#271816] uppercase">
                GET IN TOUCH
              </h1>
              <p className="font-['Inter'] text-base md:text-lg text-[#5c647a] max-w-2xl leading-relaxed">
                Have a question or ready to collaborate? Our global team is here to help you move your business forward. Connect with Logistiqo's dedicated support specialists today.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Contact Layout Split ── */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left space-y-8">
            
            {/* Direct Contact Channels */}
            <ScrollReveal delay={100} className="w-full">
              <div className="space-y-6 flex flex-col items-center lg:items-start">
                <h2 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#271816]">
                  Direct Channels
                </h2>
                
                <div className="space-y-4 flex flex-col items-center lg:items-start w-full">
                  {/* Email Channel */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 group cursor-pointer text-center sm:text-left">
                    <div className="w-12 h-12 rounded-full bg-[#ffe9e7] flex items-center justify-center text-[#b61722] shrink-0 group-hover:bg-[#b61722] group-hover:text-white transition-colors duration-300">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <span className="block font-['Inter'] text-[14px] font-semibold tracking-[0.05em] text-[#5c647a] mb-1">
                        EMAIL INQUIRIES
                      </span>
                      <a className="font-['Inter'] text-base text-[#271816] hover:text-[#b61722] transition-colors" href="mailto:hello@logistiqo.com">
                        hello@logistiqo.com
                      </a>
                    </div>
                  </div>

                  {/* Call Channel */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 group cursor-pointer text-center sm:text-left">
                    <div className="w-12 h-12 rounded-full bg-[#ffe9e7] flex items-center justify-center text-[#b61722] shrink-0 group-hover:bg-[#b61722] group-hover:text-white transition-colors duration-300">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <div>
                      <span className="block font-['Inter'] text-[14px] font-semibold tracking-[0.05em] text-[#5c647a] mb-1">
                        GLOBAL SUPPORT
                      </span>
                      <a className="font-['Inter'] text-base text-[#271816] hover:text-[#b61722] transition-colors" href="tel:+18005550199">
                        +1 (800) 555-0199
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Headquarters */}
            <ScrollReveal delay={150} className="w-full">
              <div className="space-y-4 flex flex-col items-center lg:items-start">
                <h2 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#271816]">
                  Global Headquarters
                </h2>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-full bg-[#ffe9e7] flex items-center justify-center text-[#b61722] shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <span className="block font-['Inter'] text-[14px] font-semibold tracking-[0.05em] text-[#5c647a] mb-1">
                      MAIN OFFICE
                    </span>
                    <address className="font-['Inter'] text-base text-[#271816] not-italic leading-relaxed">
                      100 Logistics Way, Suite 400<br />
                      Metro Center District<br />
                      Chicago, IL 60601, USA
                    </address>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Social Connection */}
            <ScrollReveal delay={200} className="w-full">
              <div className="space-y-3 flex flex-col items-center lg:items-start">
                <span className="block font-['Inter'] text-[14px] font-semibold tracking-[0.05em] text-[#5c647a]">
                  CONNECT SOCIALLY
                </span>
                <div className="flex gap-4">
                  <a
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#5c647a] hover:border-[#b61722] hover:text-[#b61722] hover:scale-105 active:scale-95 transition-all duration-300"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[20px]">share</span>
                  </a>
                  <a
                    aria-label="Twitter"
                    className="w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#5c647a] hover:border-[#b61722] hover:text-[#b61722] hover:scale-105 active:scale-95 transition-all duration-300"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={150}>
              <div className="bg-[#fff8f7] rounded-[24px] p-6 md:p-8 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] border border-[#E2E8F0]/50">
                
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#ffe9e7] text-[#b61722] flex items-center justify-center animate-bounce">
                      <span className="material-symbols-outlined text-3xl">check_circle</span>
                    </div>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#271816]">
                      Thank You!
                    </h3>
                    <p className="font-['Inter'] text-[#5c647a] max-w-md">
                      Your message has been successfully transmitted. One of our regional dispatchers will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-['Inter'] text-[14px] font-semibold tracking-[0.05em] text-[#271816] block" htmlFor="name">
                          Full Name
                        </label>
                        <input
                          className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 font-['Inter'] text-base text-[#271816] focus:ring-2 focus:ring-[#b61722] focus:border-[#b61722] transition-all outline-none"
                          id="name"
                          name="name"
                          placeholder="Jane Doe"
                          required
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-['Inter'] text-[14px] font-semibold tracking-[0.05em] text-[#271816] block" htmlFor="email">
                          Work Email
                        </label>
                        <input
                          className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 font-['Inter'] text-base text-[#271816] focus:ring-2 focus:ring-[#b61722] focus:border-[#b61722] transition-all outline-none"
                          id="email"
                          name="email"
                          placeholder="jane@company.com"
                          required
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-['Inter'] text-[14px] font-semibold tracking-[0.05em] text-[#271816] block" htmlFor="company">
                          Company
                        </label>
                        <input
                          className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 font-['Inter'] text-base text-[#271816] focus:ring-2 focus:ring-[#b61722] focus:border-[#b61722] transition-all outline-none"
                          id="company"
                          name="company"
                          placeholder="Organization Name"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-['Inter'] text-[14px] font-semibold tracking-[0.05em] text-[#271816] block" htmlFor="service">
                          Service Interest
                        </label>
                        <select
                          className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 font-['Inter'] text-base text-[#5c647a] focus:ring-2 focus:ring-[#b61722] focus:border-[#b61722] transition-all outline-none cursor-pointer"
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                        >
                          <option value="" disabled>Select a service...</option>
                          <option value="freight">Global Freight Forwarding</option>
                          <option value="supply-chain">Supply Chain Optimization</option>
                          <option value="customs">Customs Brokerage</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-['Inter'] text-[14px] font-semibold tracking-[0.05em] text-[#271816] block" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 font-['Inter'] text-base text-[#271816] focus:ring-2 focus:ring-[#b61722] focus:border-[#b61722] transition-all resize-none outline-none"
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        required
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    {submitError && (
                      <div className="p-4 rounded-lg bg-red-50 text-red-700 text-xs font-['Inter'] border border-red-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-red-500">error</span>
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-[#b61722] text-white px-5 py-2.5 rounded-lg font-['Inter'] text-xs font-semibold tracking-[0.05em] hover:bg-[#930013] transition-all hover:scale-95 active:scale-90 duration-300 shadow-sm hover:shadow-md cursor-pointer group disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                              arrow_outward
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ── Global Offices Bento Grid ── */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 mb-12">
        <ScrollReveal>
          <div className="mb-6 text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="font-['Plus_Jakarta_Sans'] text-[36px] font-bold text-[#271816] mb-2">
              Global Offices
            </h2>
            <p className="font-['Inter'] text-base text-[#5c647a]">
              Strategic hubs supporting logistics worldwide.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Europe HQ */}
            <div className="bg-[#fff8f7] rounded-[24px] p-8 border border-[#E2E8F0] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] hover:border-[#b61722]/35 transition-all duration-300 flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-10 h-10 rounded-full bg-[#ffe9e7] flex items-center justify-center text-[#b61722] mb-6">
                <span className="material-symbols-outlined text-[20px]">public</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#271816] mb-2">
                Europe HQ
              </h3>
              <p className="font-['Inter'] text-[14px] font-semibold tracking-[0.05em] text-[#5c647a] mb-4 uppercase">
                Frankfurt, Germany
              </p>
              <address className="font-['Inter'] text-[14px] text-[#271816] not-italic mb-4 leading-relaxed">
                Logistikallee 42<br />
                60549 Frankfurt am Main
              </address>
              <a
                className="inline-flex items-center text-[#b61722] font-['Inter'] text-[14px] font-semibold tracking-[0.05em] hover:text-[#930013] transition-colors"
                href="tel:+4969123456"
              >
                <span className="material-symbols-outlined text-[16px] mr-2">call</span>
                +49 69 1234 56
              </a>
            </div>

            {/* Asia-Pacific HQ */}
            <div className="bg-[#fff8f7] rounded-[24px] p-8 border border-[#E2E8F0] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] hover:border-[#b61722]/35 transition-all duration-300 flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-10 h-10 rounded-full bg-[#ffe9e7] flex items-center justify-center text-[#b61722] mb-6">
                <span className="material-symbols-outlined text-[20px]">public</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#271816] mb-2">
                Asia-Pacific HQ
              </h3>
              <p className="font-['Inter'] text-[14px] font-semibold tracking-[0.05em] text-[#5c647a] mb-4 uppercase">
                Singapore
              </p>
              <address className="font-['Inter'] text-[14px] text-[#271816] not-italic mb-4 leading-relaxed">
                8 Marina View<br />
                Asia Square Tower 1, 018960
              </address>
              <a
                className="inline-flex items-center text-[#b61722] font-['Inter'] text-[14px] font-semibold tracking-[0.05em] hover:text-[#930013] transition-colors"
                href="tel:+6567890123"
              >
                <span className="material-symbols-outlined text-[16px] mr-2">call</span>
                +65 6789 0123
              </a>
            </div>

            {/* Americas LatAm */}
            <div className="bg-[#fff8f7] rounded-[24px] p-8 border border-[#E2E8F0] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] hover:border-[#b61722]/35 transition-all duration-300 flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-10 h-10 rounded-full bg-[#ffe9e7] flex items-center justify-center text-[#b61722] mb-6">
                <span className="material-symbols-outlined text-[20px]">public</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#271816] mb-2">
                Americas LatAm
              </h3>
              <p className="font-['Inter'] text-[14px] font-semibold tracking-[0.05em] text-[#5c647a] mb-4 uppercase">
                São Paulo, Brazil
              </p>
              <address className="font-['Inter'] text-[14px] text-[#271816] not-italic mb-4 leading-relaxed">
                Av. Paulista, 1000<br />
                Bela Vista, SP, 01310-100
              </address>
              <a
                className="inline-flex items-center text-[#b61722] font-['Inter'] text-[14px] font-semibold tracking-[0.05em] hover:text-[#930013] transition-colors"
                href="tel:+551198765432"
              >
                <span className="material-symbols-outlined text-[16px] mr-2">call</span>
                +55 11 9876 5432
              </a>
            </div>

          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}
