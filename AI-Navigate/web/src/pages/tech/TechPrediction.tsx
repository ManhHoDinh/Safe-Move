import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Database,
  Cloud,
  Newspaper,
  Radio,
  Activity,
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

const predictionSignals = [
  {
    icon: Database,
    label: 'Historical',
    desc: 'Seasonal patterns, drainage capacity',
    bg: 'bg-storm-blue/10',
    border: 'border-storm-blue/20',
    color: 'text-storm-blue',
  },
  {
    icon: Cloud,
    label: 'Weather',
    desc: 'Rainfall accumulation, storm trajectory',
    bg: 'bg-flood-cyan/10',
    border: 'border-flood-cyan/20',
    color: 'text-flood-cyan',
  },
  {
    icon: Newspaper,
    label: 'News / Social',
    desc: 'NLP-extracted flood mentions',
    bg: 'bg-caution-amber/10',
    border: 'border-caution-amber/20',
    color: 'text-caution-amber',
  },
  {
    icon: Radio,
    label: 'Sensors',
    desc: 'Camera trends, IoT water levels',
    bg: 'bg-safe-green/10',
    border: 'border-safe-green/20',
    color: 'text-safe-green',
  },
];

export default function TechPrediction() {
  return (
    <div className="space-y-16">
      <Section>
        <h1 className="text-4xl font-bold text-white">Prediction Engine</h1>
        <p className="text-lg text-neutral-400 mt-3">
          Fuse four signal layers into 2-6 hour advance predictions using ML ensembles.
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Signal layers */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              Signal Layers
            </h3>
            {predictionSignals.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  className={`flex items-center gap-4 ${s.bg} border ${s.border} rounded-lg px-4 py-3`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className={`w-5 h-5 ${s.color} flex-shrink-0`} strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{s.label}</p>
                    <p className="text-neutral-400 text-xs">{s.desc}</p>
                  </div>
                  <span className="text-neutral-600 text-lg flex-shrink-0">&rarr;</span>
                </motion.div>
              );
            })}

            {/* Fusion box */}
            <motion.div
              className="bg-slate-dark border border-neutral-600 rounded-xl p-5 text-center mt-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-white font-bold text-sm uppercase tracking-wider">
                Prediction Fusion
              </p>
              <p className="text-neutral-400 text-xs mt-2 font-mono">
                Temporal Fusion Transformer + XGBoost ensemble
              </p>
            </motion.div>
          </div>

          {/* Right: Output */}
          <div className="flex flex-col gap-5 justify-center">
            {/* Heatmap visualization */}
            <motion.div
              className="bg-slate-dark rounded-xl overflow-hidden border border-neutral-700"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="px-4 py-2.5 border-b border-neutral-700">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Flood Probability Heatmap
                </span>
              </div>
              <div className="p-4">
                <div
                  className="w-full h-32 rounded-lg relative overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.15) 20%, rgba(245,158,11,0.2) 40%, rgba(245,158,11,0.35) 60%, rgba(239,68,68,0.3) 75%, rgba(239,68,68,0.5) 100%)',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className="absolute top-6 right-12 w-10 h-10 rounded-full bg-danger-red/40 border border-danger-red/60" />
                  <div className="absolute top-14 right-24 w-8 h-8 rounded-full bg-caution-amber/30 border border-caution-amber/50" />
                  <div className="absolute bottom-4 left-8 w-6 h-6 rounded-full bg-safe-green/30 border border-safe-green/50" />
                </div>

                {/* Timeline bar */}
                <div className="mt-4 flex items-center gap-0">
                  {['Now', '+2hr', '+4hr', '+6hr'].map((step, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full h-2 rounded-sm"
                        style={{
                          backgroundColor:
                            i === 0
                              ? 'rgba(16,185,129,0.5)'
                              : i === 1
                                ? 'rgba(245,158,11,0.4)'
                                : i === 2
                                  ? 'rgba(245,158,11,0.6)'
                                  : 'rgba(239,68,68,0.6)',
                        }}
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 font-mono">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Output specs */}
            <motion.div
              className="bg-deep-navy border border-neutral-700/50 rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Prediction Output
              </span>
              <ul className="mt-3 space-y-2">
                {[
                  '2-6 hour advance prediction window',
                  'Probability heatmaps per road segment',
                  'Warning scores with configurable alert thresholds',
                  'Continuous recalibration from actual outcomes',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                    <Activity size={14} className="text-flood-cyan flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Warning callout */}
            <motion.div
              className="bg-caution-amber/10 border border-caution-amber/20 rounded-lg px-4 py-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-caution-amber text-sm">
                78% flood probability | Nguyen Van Linh | +3.2 hours
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ML Models Detail */}
      <Section>
        <h2 className="text-2xl font-bold text-white mb-6">ML Model Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            className="bg-deep-navy rounded-xl p-6 border border-storm-blue/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-storm-blue mb-3">Temporal Fusion Transformer</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-storm-blue mt-2 flex-shrink-0" />
                Attention-based architecture for time-series
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-storm-blue mt-2 flex-shrink-0" />
                Handles multi-horizon forecasting (2, 4, 6 hours)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-storm-blue mt-2 flex-shrink-0" />
                Interpretable attention weights show which signals drive predictions
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-storm-blue mt-2 flex-shrink-0" />
                Daily retraining on validated ground-truth data
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-deep-navy rounded-xl p-6 border border-safe-green/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-safe-green mb-3">XGBoost Ensemble</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-safe-green mt-2 flex-shrink-0" />
                Gradient-boosted trees for tabular features
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-safe-green mt-2 flex-shrink-0" />
                Handles missing data and categorical features natively
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-safe-green mt-2 flex-shrink-0" />
                Fast inference (~5ms) for real-time scoring
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-safe-green mt-2 flex-shrink-0" />
                Combined with TFT via weighted ensemble averaging
              </li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Next page */}
      <div className="pt-8 border-t border-neutral-800">
        <Link
          to="/technology/stack"
          className="inline-flex items-center gap-2 text-sm font-medium text-storm-blue hover:text-white transition-colors"
        >
          Next: Tech Stack <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
