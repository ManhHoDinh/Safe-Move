import { motion } from 'framer-motion';
import { Database, Cloud, Newspaper, Radio } from 'lucide-react';
import SlideLayout from './SlideLayout';

const signals = [
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
    desc: 'Rainfall, storm trajectory',
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

const timelineSteps = ['Now', '+2hr', '+4hr', '+6hr'];

export default function Slide20Prediction() {
  return (
    <SlideLayout>
      <div className="flex flex-col h-full">
        <motion.h2
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Prediction Engine
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Fuse four signal layers into 2–6 hour advance predictions.
        </motion.p>

        <div className="flex-1 flex flex-col lg:flex-row gap-10 mt-8 items-center">
          {/* Left — Signal sources flowing into fusion box */}
          <div className="lg:w-1/2 flex flex-col items-center gap-3">
            {signals.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  className={`w-full flex items-center gap-4 ${s.bg} border ${s.border} rounded-lg px-4 py-3`}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className={`w-5 h-5 ${s.color} flex-shrink-0`} strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{s.label}</p>
                    <p className="text-neutral-400 text-xs">{s.desc}</p>
                  </div>
                  <span className="text-neutral-500 text-lg flex-shrink-0">→</span>
                </motion.div>
              );
            })}

            {/* Fusion box */}
            <motion.div
              className="w-full bg-slate-dark border border-neutral-600 rounded-xl p-4 text-center mt-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="text-white font-bold text-sm uppercase tracking-wider">
                Prediction Fusion
              </p>
              <p className="text-neutral-400 text-xs mt-1 font-mono">
                ML: TFT + XGBoost
              </p>
            </motion.div>
          </div>

          {/* Right — Output visualization */}
          <div className="lg:w-1/2 flex flex-col gap-5">
            {/* Heatmap card */}
            <motion.div
              className="bg-slate-dark rounded-xl overflow-hidden border border-neutral-700"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="px-4 py-2 border-b border-neutral-700">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Flood Probability Heatmap
                </span>
              </div>
              <div className="p-4">
                {/* Simulated heatmap using gradient */}
                <div
                  className="w-full h-32 rounded-lg relative overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.15) 20%, rgba(245,158,11,0.2) 40%, rgba(245,158,11,0.35) 60%, rgba(239,68,68,0.3) 75%, rgba(239,68,68,0.5) 100%)',
                  }}
                >
                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  {/* Hotspot circles */}
                  <div className="absolute top-6 right-12 w-10 h-10 rounded-full bg-danger-red/40 border border-danger-red/60" />
                  <div className="absolute top-14 right-24 w-8 h-8 rounded-full bg-caution-amber/30 border border-caution-amber/50" />
                  <div className="absolute bottom-4 left-8 w-6 h-6 rounded-full bg-safe-green/30 border border-safe-green/50" />
                </div>

                {/* Timeline bar */}
                <div className="mt-4 flex items-center gap-0">
                  {timelineSteps.map((step, i) => (
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
                      <span className="text-[10px] text-neutral-500 mt-1 font-mono">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Warning callout */}
            <motion.div
              className="bg-caution-amber/10 border border-caution-amber/20 rounded-lg px-4 py-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-caution-amber text-sm">
                ⚠ 78% flood probability | Nguyen Van Linh | +3.2 hours
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
