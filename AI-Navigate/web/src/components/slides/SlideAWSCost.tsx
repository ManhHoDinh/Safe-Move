import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { DollarSign } from 'lucide-react';
import SlideLayout from './SlideLayout';

const costCategories = [
  { name: 'ECS Fargate', desc: 'Serverless containers (6 services)', phase1: 300, phase2: 1000, phase3: 4000, color: 'bg-storm-blue' },
  { name: 'SageMaker + Bedrock', desc: 'GPU inference + LLM calls', phase1: 400, phase2: 1100, phase3: 6400, color: 'bg-critical-magenta' },
  { name: 'MSK (Kafka)', desc: 'Event streaming', phase1: 150, phase2: 400, phase3: 1200, color: 'bg-caution-amber' },
  { name: 'RDS + Redis + S3', desc: 'All storage tiers', phase1: 180, phase2: 700, phase3: 2100, color: 'bg-safe-green' },
  { name: 'CloudFront + API GW', desc: 'CDN + API routing', phase1: 60, phase2: 200, phase3: 500, color: 'bg-flood-cyan' },
  { name: 'Monitoring + Other', desc: 'CloudWatch, X-Ray, WAF', phase1: 80, phase2: 200, phase3: 500, color: 'bg-neutral-500' },
];

const phases = [
  { label: 'Phase 1', desc: 'Pilot · 1 city', total: '$1.2K', totalNum: 1200 },
  { label: 'Phase 2', desc: 'Scale · 3-5 cities', total: '$3.6K', totalNum: 3600 },
  { label: 'Phase 3', desc: 'City-Scale · 10+', total: '$14.7K', totalNum: 14700 },
];

export default function SlideAWSCost() {
  const chartRef = useRef(null);
  const inView = useInView(chartRef, { once: true, amount: 0.3 });

  return (
    <SlideLayout>
      <div className="flex flex-col h-full">
        {/* Title */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white">AWS Operating Cost</h2>
          <span className="px-3 py-1 text-xs font-bold text-caution-amber bg-caution-amber/10 border border-caution-amber/20 rounded-full uppercase tracking-wider">
            AWS
          </span>
        </motion.div>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Lean infrastructure. Cost scales with cities, not with headcount.
        </motion.p>

        <div className="flex-1 flex flex-col lg:flex-row gap-5 mt-6" ref={chartRef}>
          {/* Left: Stacked cost bars per phase */}
          <div className="flex-1 flex flex-col gap-4">
            {phases.map((phase, pi) => (
              <motion.div
                key={phase.label}
                className="bg-deep-navy border border-neutral-700/50 rounded-xl p-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + pi * 0.12 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-white font-semibold text-sm">{phase.label}</span>
                    <span className="text-neutral-500 text-xs ml-2">{phase.desc}</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-flood-cyan">{phase.total}<span className="text-xs text-neutral-500 font-normal">/mo</span></span>
                </div>

                {/* Stacked horizontal bar */}
                <div className="h-5 bg-slate-dark rounded-full overflow-hidden flex">
                  {costCategories.map((cat, ci) => {
                    const val = pi === 0 ? cat.phase1 : pi === 1 ? cat.phase2 : cat.phase3;
                    const pct = (val / phase.totalNum) * 100;
                    return (
                      <motion.div
                        key={cat.name}
                        className={`h-full ${cat.color} opacity-80 first:rounded-l-full last:rounded-r-full`}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${pct}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 + pi * 0.15 + ci * 0.05 }}
                      />
                    );
                  })}
                </div>
              </motion.div>
            ))}

            {/* Legend */}
            <motion.div
              className="flex flex-wrap gap-3 mt-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              viewport={{ once: true }}
            >
              {costCategories.map((cat) => (
                <div key={cat.name} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${cat.color} opacity-80`} />
                  <span className="text-[10px] text-neutral-500">{cat.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Cost breakdown table */}
          <motion.div
            className="lg:w-80 bg-deep-navy border border-neutral-700/50 rounded-xl p-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <DollarSign size={14} className="text-safe-green" />
              Cost per Service
            </h3>

            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-neutral-700/50">
                  <th className="text-left py-2 text-neutral-500 font-medium">Service</th>
                  <th className="text-right py-2 text-neutral-500 font-medium">Ph1</th>
                  <th className="text-right py-2 text-neutral-500 font-medium">Ph2</th>
                  <th className="text-right py-2 text-neutral-500 font-medium">Ph3</th>
                </tr>
              </thead>
              <tbody>
                {costCategories.map((cat, i) => (
                  <tr key={cat.name} className={i % 2 === 0 ? 'bg-slate-dark/30' : ''}>
                    <td className="py-1.5 px-1 text-neutral-300">{cat.name}</td>
                    <td className="py-1.5 text-right font-mono text-neutral-400">${cat.phase1}</td>
                    <td className="py-1.5 text-right font-mono text-neutral-400">${cat.phase2}</td>
                    <td className="py-1.5 text-right font-mono text-flood-cyan">${cat.phase3.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="border-t border-neutral-700/50 font-bold">
                  <td className="py-2 px-1 text-white">Total</td>
                  <td className="py-2 text-right font-mono text-flood-cyan">$1.2K</td>
                  <td className="py-2 text-right font-mono text-flood-cyan">$3.6K</td>
                  <td className="py-2 text-right font-mono text-flood-cyan">$14.7K</td>
                </tr>
              </tbody>
            </table>

            {/* Key insights */}
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2 text-[10px]">
                <span className="text-safe-green font-bold mt-0.5">▸</span>
                <span className="text-neutral-400">SageMaker + Bedrock is the largest cost — GPU inference + LLM calls. Drops 80% after custom model (Phase 3).</span>
              </div>
              <div className="flex items-start gap-2 text-[10px]">
                <span className="text-caution-amber font-bold mt-0.5">▸</span>
                <span className="text-neutral-400">Breakeven at ~8 cities on Professional tier ($15K/city × 8 = $120K revenue vs $14.7K infra).</span>
              </div>
              <div className="flex items-start gap-2 text-[10px]">
                <span className="text-storm-blue font-bold mt-0.5">▸</span>
                <span className="text-neutral-400">90%+ gross margin at scale. Infrastructure cost grows linearly, revenue grows exponentially.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
