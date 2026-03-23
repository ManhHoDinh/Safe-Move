import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="cta" className="relative py-24 lg:py-32 bg-abyss">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-blue to-transparent" />

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
          }}
        />
      </div>

      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-[length:var(--font-size-h1)] md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Your City Floods.{' '}
          <span className="text-storm-blue">Your Routes Don't Have To.</span>
        </motion.h2>

        <motion.p
          className="mt-5 text-[length:var(--font-size-body-lg)] text-neutral-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Join the cities and enterprises building flood-resilient mobility
          infrastructure. Early access is open for qualified government agencies and
          logistics operators.
        </motion.p>

        <motion.div
          className="mt-10 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {submitted ? (
            <div className="rounded-xl bg-safe-green/10 border border-safe-green/20 p-6" aria-live="polite">
              <p className="text-safe-green font-semibold">
                Thank you! We'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your work email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-4 rounded-lg bg-deep-navy border border-slate-dark text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-storm-blue focus:ring-1 focus:ring-storm-blue transition-colors"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-storm-blue rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                Request Early Access
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          )}
        </motion.div>

        {/* QR Code */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="rounded-xl bg-white p-3 shadow-lg shadow-storm-blue/10">
            <img
              src="/EnvRouteQR.png"
              alt="Scan QR code to visit SafeMove AI"
              className="w-32 h-32"
            />
          </div>
          <p className="text-xs text-neutral-500">Scan to visit our website</p>
        </motion.div>

        <motion.p
          className="mt-6 text-xs text-neutral-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Backed by{' '}
          <span className="text-neutral-400 font-medium">Antler</span>,{' '}
          <span className="text-neutral-400 font-medium">Techstars Climate</span>, and{' '}
          <span className="text-neutral-400 font-medium">Google for Startups</span>.
          Currently deployed in 3 pilot cities.
        </motion.p>
      </div>
    </section>
  );
}
