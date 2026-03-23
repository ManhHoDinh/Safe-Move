import { motion } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';
import SlideLayout from './SlideLayout';

const regions = [
  { label: 'SE Asia', period: '2026', cities: 'HCMC, Bangkok, Jakarta', icon: '🌏' },
  { label: 'India', period: '2027', cities: 'Mumbai, Chennai, Kolkata', icon: '🇮🇳' },
  { label: 'US Gulf', period: '2028', cities: 'Houston, NOLA, Miami', icon: '🇺🇸' },
  { label: 'Global', period: '2029+', cities: 'Europe, LatAm, Africa', icon: '🌍' },
];

const funds = [
  { label: 'Engineering', pct: 45, color: '#06B6D4' },
  { label: 'GTM', pct: 25, color: '#2563EB' },
  { label: 'Data', pct: 15, color: '#F59E0B' },
  { label: 'Ops', pct: 15, color: '#10B981' },
];

export default function Slide13Expansion() {
  return (
    <SlideLayout background="accent" slideNumber={13}>
      <div className="flex flex-col h-full">
        {/* Title */}
        <motion.h2
          className="text-3xl lg:text-4xl font-bold text-white"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          From Flood Routing to Urban Resilience Infrastructure
        </motion.h2>

        {/* Hero ask */}
        <motion.div
          className="flex items-center justify-center mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 120 }}
          viewport={{ once: true }}
        >
          <span
            className="font-mono text-6xl lg:text-7xl font-bold text-flood-cyan"
            style={{
              textShadow: '0 0 60px rgba(6,182,212,0.3), 0 0 120px rgba(6,182,212,0.1)',
            }}
          >
            $2.5M Seed Round
          </span>
        </motion.div>

        {/* Fund allocation — horizontal bars */}
        <div className="flex items-center justify-center mt-8">
          <div className="w-full max-w-2xl space-y-3">
            {funds.map((fund, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-neutral-400 text-sm w-24 flex-shrink-0 text-right">
                  {fund.label}
                </span>
                <div className="flex-1 h-4 bg-neutral-800/60 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: fund.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${fund.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.7 + i * 0.1, ease: 'easeOut' as const }}
                    viewport={{ once: true }}
                  />
                </div>
                <span className="font-mono text-sm text-white font-bold w-10 text-right">
                  {fund.pct}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Geographic expansion — 4 compact cards in a row */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-neutral-500" strokeWidth={1.5} />
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Geographic Expansion
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {regions.map((region, i) => (
              <motion.div
                key={i}
                className="bg-slate-dark/60 border border-neutral-700/40 rounded-xl px-4 py-3 flex flex-col gap-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-flood-cyan font-bold text-sm">
                    {region.period}
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-neutral-600" strokeWidth={1.5} />
                </div>
                <span className="text-white font-semibold text-base">{region.label}</span>
                <span className="text-neutral-500 text-xs">{region.cities}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing line */}
        <motion.div
          className="mt-auto flex items-center justify-center pb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          viewport={{ once: true }}
        >
          <p className="text-3xl lg:text-4xl font-bold text-white text-center">
            Floods are inevitable.{' '}
            <span className="text-flood-cyan">Traffic chaos is not.</span>
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
