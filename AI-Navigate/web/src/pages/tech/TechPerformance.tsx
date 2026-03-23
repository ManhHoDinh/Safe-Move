import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Clock,
  TrendingUp,
  Layers,
  BarChart3,
  ArrowRight,
} from 'lucide-react';

function Section({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

const latencyStages = [
  { label: 'Image Processing', ms: 200, width: '6.5%', color: 'bg-flood-cyan', range: undefined },
  { label: 'Flood Detection (CV)', ms: 300, width: '9.7%', color: 'bg-storm-blue', range: undefined },
  { label: 'LLM Severity Assessment', ms: 1400, width: '45.2%', color: 'bg-caution-amber', range: '800-2000ms' },
  { label: 'Route Recalculation', ms: 500, width: '16.1%', color: 'bg-safe-green', range: undefined },
  { label: 'Push to Client', ms: 100, width: '3.2%', color: 'bg-critical-magenta', range: undefined },
];

const optimizationTargets = [
  { stage: 'CV Detection', current: '300ms', target: '150ms', strategy: 'ONNX quantization + batch inference' },
  { stage: 'LLM Assessment', current: '800-2000ms', target: '400ms', strategy: 'Prompt caching + model distillation' },
  { stage: 'Route Calc', current: '500ms', target: '200ms', strategy: 'Pre-compute penalty graph, cache hot routes' },
  { stage: 'Total P95', current: '3.1s', target: '1.5s', strategy: 'Pipeline parallelization + edge caching' },
];

const scalingTiers = [
  { tier: 'Tier 1', points: '< 50 flood points', pods: '2 pods', gpus: '1 GPU', llm: 'Shared LLM queue' },
  { tier: 'Tier 2', points: '50-500 flood points', pods: '4 pods', gpus: '2 GPUs', llm: 'Dedicated LLM queue' },
  { tier: 'Tier 3', points: '500+ flood points', pods: '8 pods', gpus: '4 GPUs', llm: 'Dedicated LLM instance' },
];

const costPerCity = [
  { tier: 'Tier 1 (Small)', infra: '$2K', aiml: '$1K', dataApis: '$500', total: '$3.5K' },
  { tier: 'Tier 2 (Medium)', infra: '$5K', aiml: '$3K', dataApis: '$1.5K', total: '$9.5K' },
  { tier: 'Tier 3 (Large)', infra: '$12K', aiml: '$8K', dataApis: '$4K', total: '$24K' },
];

export default function TechPerformance() {
  return (
    <div className="space-y-16">
      <Section>
        <h1 className="text-4xl font-bold text-white">Performance & Latency</h1>
        <p className="text-lg text-neutral-400 mt-3">
          Every millisecond from camera frame to driver alert, accounted for.
        </p>
      </Section>

      {/* Latency Budget */}
      <Section>
        <h2 className="text-2xl font-bold text-white mb-6">End-to-End Latency Budget</h2>
        <motion.div
          className="bg-deep-navy rounded-xl p-8 border border-neutral-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Pipeline bar chart */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-500 font-mono">0ms</span>
              <span className="text-xs text-neutral-500 font-mono">3100ms (P95)</span>
            </div>

            <div className="relative">
              <div className="w-full h-12 bg-slate-dark rounded-lg overflow-hidden flex">
                {latencyStages.map((stage, i) => (
                  <motion.div
                    key={i}
                    className={`${stage.color} relative group cursor-pointer`}
                    style={{ width: stage.width }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 * i }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-mono font-bold text-white/90 whitespace-nowrap">
                        {stage.range || `${stage.ms}ms`}
                      </span>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-800 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-neutral-700">
                      {stage.label}
                    </div>
                  </motion.div>
                ))}
                <div className="flex-1 bg-neutral-700/30" />
              </div>
            </div>

            <div className="flex mt-3 gap-4 flex-wrap">
              {latencyStages.map((stage, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-sm ${stage.color}`} />
                  <span className="text-xs text-neutral-400">{stage.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center gap-3 mb-8 p-3 bg-storm-blue/5 border border-storm-blue/20 rounded-lg">
            <Clock size={18} className="text-storm-blue flex-shrink-0" />
            <p className="text-sm text-neutral-300">
              <span className="text-white font-semibold">Total end-to-end:</span>{' '}
              1.9s (best case) to 3.1s (P95). LLM severity assessment dominates the budget at 45% of wall-clock time.
            </p>
          </div>

          {/* Optimization targets table */}
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-flood-cyan" />
            Optimization Targets
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Stage</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Current</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Target</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Strategy</th>
                </tr>
              </thead>
              <tbody>
                {optimizationTargets.map((row, i) => (
                  <motion.tr
                    key={i}
                    className={i % 2 === 0 ? 'bg-slate-dark/50' : 'bg-slate-dark/20'}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                    viewport={{ once: true }}
                  >
                    <td className="py-3 px-4 text-neutral-300 font-medium">{row.stage}</td>
                    <td className="py-3 px-4 text-caution-amber font-mono">{row.current}</td>
                    <td className="py-3 px-4 text-flood-cyan font-mono">{row.target}</td>
                    <td className="py-3 px-4 text-neutral-400">{row.strategy}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </Section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-storm-blue/30 to-transparent" />

      {/* Scalability */}
      <Section>
        <h2 className="text-2xl font-bold text-white mb-6">Scalability Architecture</h2>

        {/* Horizontal Scaling */}
        <motion.div
          className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Layers size={18} className="text-flood-cyan" />
            <h3 className="text-lg font-bold text-white">Horizontal Scaling (per city)</h3>
          </div>

          <p className="text-sm text-neutral-400 mb-5">
            Each city gets its own Kafka partition, Flink job, and Redis cache shard.
            Adding a city means deploying config, not code. 15-minute provisioning.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['HCMC', 'Jakarta', 'Houston'].map((city, i) => (
              <motion.div
                key={city}
                className="border border-neutral-700/50 rounded-lg p-4 bg-neutral-800/40"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                viewport={{ once: true }}
              >
                <p className="text-sm font-bold text-white mb-3 text-center">{city}</p>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-flood-cyan bg-flood-cyan/10 border border-flood-cyan/20 rounded px-2 py-1 text-center">Kafka Partition</div>
                  <div className="text-xs font-mono text-storm-blue bg-storm-blue/10 border border-storm-blue/20 rounded px-2 py-1 text-center">Flink Job</div>
                  <div className="text-xs font-mono text-caution-amber bg-caution-amber/10 border border-caution-amber/20 rounded px-2 py-1 text-center">Redis Shard</div>
                  <div className="text-xs font-mono text-safe-green bg-safe-green/10 border border-safe-green/20 rounded px-2 py-1 text-center">CV Pipeline</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-safe-green/5 border border-safe-green/20 rounded-lg">
            <p className="text-sm text-neutral-300">
              <span className="text-safe-green font-semibold">Isolation guarantee:</span>{' '}
              A spike in Jakarta never affects HCMC's latency. Each city pipeline is independently scalable and deployable.
            </p>
          </div>
        </motion.div>

        {/* Vertical Scaling */}
        <motion.div
          className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={18} className="text-caution-amber" />
            <h3 className="text-lg font-bold text-white">Vertical Scaling (per city complexity)</h3>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tier</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Flood Points</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Pods</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">GPUs</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">LLM</th>
                </tr>
              </thead>
              <tbody>
                {scalingTiers.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-dark/50' : 'bg-slate-dark/20'}>
                    <td className="py-3 px-4 text-flood-cyan font-mono font-medium">{row.tier}</td>
                    <td className="py-3 px-4 text-neutral-300">{row.points}</td>
                    <td className="py-3 px-4 text-neutral-300">{row.pods}</td>
                    <td className="py-3 px-4 text-neutral-300">{row.gpus}</td>
                    <td className="py-3 px-4 text-neutral-400">{row.llm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-caution-amber/5 border border-caution-amber/20 rounded-lg">
            <p className="text-sm text-neutral-300">
              <span className="text-caution-amber font-semibold">Auto-scale:</span>{' '}
              Kubernetes HPA triggers at 70% CPU or 500 events/sec per pod. Scale-up in 45 seconds, scale-down after 5 minutes of low utilization.
            </p>
          </div>
        </motion.div>

        {/* Cost Per City */}
        <motion.div
          className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 size={18} className="text-safe-green" />
            <h3 className="text-lg font-bold text-white">Cost Per City (monthly)</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">City Tier</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Infra</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">AI / ML</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Data APIs</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total / month</th>
                </tr>
              </thead>
              <tbody>
                {costPerCity.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-dark/50' : 'bg-slate-dark/20'}>
                    <td className="py-3 px-4 text-neutral-300 font-medium">{row.tier}</td>
                    <td className="py-3 px-4 text-neutral-400 font-mono">{row.infra}</td>
                    <td className="py-3 px-4 text-neutral-400 font-mono">{row.aiml}</td>
                    <td className="py-3 px-4 text-neutral-400 font-mono">{row.dataApis}</td>
                    <td className="py-3 px-4 text-white font-mono font-bold">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </Section>

      {/* Next page */}
      <div className="pt-8 border-t border-neutral-800">
        <Link
          to="/technology/data-flow"
          className="inline-flex items-center gap-2 text-sm font-medium text-storm-blue hover:text-white transition-colors"
        >
          Next: Data Flow & Consistency <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
