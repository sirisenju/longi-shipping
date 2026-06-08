import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Landing page sections
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';

// Pages
import AboutPage from './pages/AboutPage';
import DiscoverPage from './pages/DiscoverPage';
import DestinationsPage from './pages/DestinationsPage';
import ContactPage from './pages/ContactPage';
import TrackingPage from './pages/TrackingPage';

const WRAPPER = "font-['Inter'] text-base text-[#271816] antialiased min-h-screen bg-[#fff8f7]";

function LandingPage() {
  return (
    <main className="pb-20">
      <Hero />
      <About />
      <Services />
      <Features />
      <Testimonials />
      <Faq />
    </main>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className={WRAPPER}>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/track" element={<TrackingPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
