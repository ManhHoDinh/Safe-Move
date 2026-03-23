import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Menu, X, Presentation, Cpu } from 'lucide-react';

import Hero from '../components/landing/Hero';
import Problem from '../components/landing/Problem';
import Solution from '../components/landing/Solution';
import HowItWorks from '../components/landing/HowItWorks';
import AIAdvantage from '../components/landing/AIAdvantage';
import Demo from '../components/landing/Demo';
import Prediction from '../components/landing/Prediction';
import Government from '../components/landing/Government';
import Testimonials from '../components/landing/Testimonials';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Demo', href: '#demo' },
  { label: 'Testimonials', href: '#testimonials' },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-abyss">
      <a href="#hero" className="skip-link">Skip to content</a>
      {/* Sticky header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-abyss/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <Droplets
              size={24}
              className="text-storm-blue transition-transform duration-300 group-hover:scale-110"
              strokeWidth={2}
            />
            <span className="text-lg font-bold text-white tracking-tight">
              SafeMove
              <span className="text-storm-blue"> AI</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-neutral-400 font-medium transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/technology"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-300 border border-white/10 rounded-lg transition-all duration-300 hover:text-white hover:border-white/20 hover:bg-white/5"
            >
              <Cpu size={16} />
              Technology
            </Link>
            <Link
              to="/slides"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-300 border border-white/10 rounded-lg transition-all duration-300 hover:text-white hover:border-white/20 hover:bg-white/5"
            >
              <Presentation size={16} />
              Pitch Deck
            </Link>
            <a
              href="#cta"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-storm-blue rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Early Access
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-abyss/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Nav content */}
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative pt-24 px-6 flex flex-col gap-6"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-semibold text-neutral-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/technology"
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-neutral-300 border border-white/10 rounded-lg"
              >
                <Cpu size={18} />
                Technology
              </Link>
              <Link
                to="/slides"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-neutral-300 border border-white/10 rounded-lg"
              >
                <Presentation size={18} />
                Pitch Deck
              </Link>
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-storm-blue rounded-lg"
              >
                Get Early Access
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page sections */}
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <AIAdvantage />
        <Demo />
        <Prediction />
        <Government />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
