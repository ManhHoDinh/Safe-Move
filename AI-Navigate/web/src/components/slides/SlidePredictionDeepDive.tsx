import { motion } from 'framer-motion';
import { Database, BarChart3, Network, Merge, AlertCircle, ArrowDown } from 'lucide-react';
import SlideLayout from './SlideLayout';

const pipelineSteps = [
  {
    icon: Database,
    label: 'Feature Aggregator',
    desc: 'Historical floods, weather forecast, camera signals, news, feedback',
    color: 'text-flood-cyan',
    bg: 'bg-flood-cyan/10',
    border: 'border-flood-cyan/20',
  },
  {
    icon: BarChart3,
    label: 'Baseline Model',
    desc: 'Gradient boosting / time-series for 30-60min prediction',
    color: 'text-safe-green',
    bg: 'bg-safe-green/10',
    border: 'border-safe-green/20',
  },
  {
    icon: Network,
    label: 'Spatio-Temporal Model',
    desc: 'Zone adjacency: if A floods \u2192 B risk increases',
    color: 'text-storm-blue',
    bg: 'bg-storm-blue/10',
    border: 'border-storm-blue/20',
  },
  {
    icon: Merge,
    label: 'Signal Fusion',
    desc: 'Combine model output with live weather/camera/news',
    color: 'text-caution-amber',
    bg: 'bg-caution-amber/10',
    border: 'border-caution-amber/20',
  },
  {
    icon: AlertCircle,
    label: 'Warning Score',
    desc: 'Location + time window + confidence + action',
    color: 'text-danger-red',
    bg: 'bg-danger-red/10',
    border: 'border-danger-red/20',
  },
];

const challengesSolutions = [
  { problem: 'Data scarcity', solution: 'Zone clustering + transfer learning', color: 'text-caution-amber' },
  { problem: 'Model drift', solution: 'Retraining schedule + drift detection', color: 'text-storm-blue' },
  { problem: 'Sparse labels', solution: 'Weak supervision + feedback events', color: 'text-flood-cyan' },
  { problem: 'Class imbalance', solution: 'Reweighting + threshold tuning', color: 'text-danger-red' },
];

export default function SlidePredictionDeepDive() {
  return (
    <SlideLayout>
      <div className="flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-flood-cyan border border-flood-cyan/30 rounded-full px-3 py-1">
            Deep Dive
          </span>
        </motion.div>
        <motion.h2
          className="text-4xl font-bold text-white mt-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Prediction Engine
        </motion.h2>

        <div className="flex-1 flex flex-col lg:flex-row gap-4 mt-4">
          {/* Left: Data Pipeline */}
          <div className="lg:w-1/2 flex flex-col gap-3">
            <motion.div
              className="bg-slate-dark border border-neutral-700 rounded-xl p-4 flex-1"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Data Pipeline</p>
              <div className="flex flex-col gap-1">
                {pipelineSteps.map((step, i) => (
                  <div key={i}>
                    <motion.div
                      className={`${step.bg} border ${step.border} rounded-lg px-3 py-2.5 flex items-start gap-3`}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                      viewport={{ once: true }}
                    >
                      <step.icon className={`w-4 h-4 ${step.color} mt-0.5 flex-shrink-0`} strokeWidth={1.5} />
                      <div className="flex-1">
                        <span className={`text-xs font-semibold ${step.color}`}>{step.label}</span>
                        <p className="text-[10px] text-neutral-400 mt-0.5 leading-relaxed">{step.desc}</p>
                      </div>
                      <span className="text-[9px] text-neutral-600 font-mono mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    </motion.div>
                    {i < pipelineSteps.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <ArrowDown className="w-3 h-3 text-neutral-600" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Output Example + Challenges */}
          <div className="lg:w-1/2 flex flex-col gap-3">
            {/* Output Example */}
            <motion.div
              className="bg-flood-cyan/5 border border-flood-cyan/20 rounded-xl p-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-flood-cyan uppercase tracking-wider mb-2">Output Example</p>
              <div className="bg-abyss/70 rounded-lg p-3 font-mono text-[10px] text-flood-cyan leading-relaxed border border-neutral-800">
                <span className="text-neutral-500">{'{'}</span><br/>
                &nbsp;&nbsp;<span className="text-flood-cyan">"location"</span>: {'{'} <span className="text-caution-amber">lat</span>, <span className="text-caution-amber">lng</span> {'}'},<br/>
                &nbsp;&nbsp;<span className="text-flood-cyan">"predicted_flood"</span>: <span className="text-safe-green">true</span>,<br/>
                &nbsp;&nbsp;<span className="text-flood-cyan">"time_window"</span>: <span className="text-safe-green">"30-60 min"</span>,<br/>
                &nbsp;&nbsp;<span className="text-flood-cyan">"confidence"</span>: <span className="text-caution-amber">0.79</span>,<br/>
                &nbsp;&nbsp;<span className="text-flood-cyan">"risk_level"</span>: <span className="text-danger-red">"HIGH"</span>,<br/>
                &nbsp;&nbsp;<span className="text-flood-cyan">"action"</span>: <span className="text-safe-green">"alert_and_avoid"</span><br/>
                <span className="text-neutral-500">{'}'}</span>
              </div>
            </motion.div>

            {/* Challenges & Solutions */}
            <motion.div
              className="bg-slate-dark border border-neutral-700 rounded-xl p-4 flex-1"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Challenges & Solutions</p>
              <div className="flex flex-col gap-2">
                {challengesSolutions.map((c, i) => (
                  <motion.div
                    key={i}
                    className="bg-abyss/40 rounded-md px-3 py-2 flex items-start gap-2"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.55 + i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <span className={`text-xs font-bold ${c.color} flex-shrink-0`}>{'\u2022'}</span>
                    <div>
                      <span className={`text-xs font-semibold ${c.color}`}>{c.problem}</span>
                      <span className="text-[10px] text-neutral-400 ml-1.5">{c.solution}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        {/* Tech doc link */}
        <a
          href="https://github.com/ManhHoDinh/AI-Navigate/blob/main/docs/tech/llm-agent-prediction-simulation.md"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-8 text-[9px] text-neutral-600 hover:text-flood-cyan transition-colors font-mono z-20"
        >
          docs/tech-architecture.md →
        </a>
      </div>
    </SlideLayout>
  );
}
