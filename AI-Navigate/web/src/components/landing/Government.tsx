import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Landmark, Building2, Check } from 'lucide-react';

const governmentCapabilities = [
  'Urban Planning Insights — Identify chronically flood-prone corridors with data-backed severity rankings',
  'Flood Resilience Scoring — Score every road segment for flood vulnerability, track improvement over time',
  'Traffic Regulation Automation — AI-generated lane closures, signal timing changes, and detour plans',
  'Historical Trend Analysis — Decade-scale flood frequency, severity, and traffic impact trends',
  'Budget Impact Assessment — Quantify economic cost of flood-related traffic disruption',
];

const enterpriseCapabilities = [
  'Fleet rerouting API with sub-second response times',
  'Logistics disruption prediction and contingency planning',
  'Custom risk scoring for supply chain corridors',
  'White-label integration for navigation platforms',
];

export default function Government() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="government" className="relative py-24 lg:py-32 bg-abyss">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-blue to-transparent" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[length:var(--font-size-h1)] md:text-5xl font-bold text-white tracking-tight">
            Built for cities.{' '}
            <span className="text-storm-blue">Trusted by operators.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Government column */}
          <motion.div
            className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 lg:p-10"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-storm-blue/10">
                <Landmark size={24} className="text-storm-blue" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white">FOR GOVERNMENT</h3>
            </div>
            <ul className="space-y-4">
              {governmentCapabilities.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="text-safe-green flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <span className="text-sm text-neutral-300 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Enterprise column */}
          <motion.div
            className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 lg:p-10"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-storm-blue/10">
                <Building2 size={24} className="text-storm-blue" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white">FOR ENTERPRISE</h3>
            </div>
            <ul className="space-y-4">
              {enterpriseCapabilities.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="text-safe-green flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <span className="text-sm text-neutral-300 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Trust signal bar */}
        <motion.div
          className="mt-10 rounded-xl bg-deep-navy border border-slate-dark p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-sm font-semibold text-neutral-300 tracking-wide">
            <span className="text-storm-blue">SOC 2 ready</span>
            <span className="text-neutral-600 mx-3">|</span>
            <span className="text-storm-blue">API-first</span>
            <span className="text-neutral-600 mx-3">|</span>
            <span className="text-storm-blue">99.9% uptime SLA</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
