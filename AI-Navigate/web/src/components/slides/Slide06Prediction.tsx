import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

const stages = [
  {
    time: '6 hours before',
    color: '#F59E0B',
    opacity: 0.2,
    zones: [
      { x: 80, y: 60, r: 14 },
      { x: 130, y: 90, r: 12 },
    ],
    desc: 'Early-warning signals from weather models and soil saturation data.',
  },
  {
    time: '2 hours before',
    color: '#F59E0B',
    opacity: 0.45,
    zones: [
      { x: 80, y: 60, r: 20 },
      { x: 130, y: 90, r: 18 },
      { x: 55, y: 100, r: 14 },
    ],
    desc: 'Prediction confidence increases. Pre-emptive rerouting begins.',
  },
  {
    time: 'Now',
    color: '#EF4444',
    opacity: 0.5,
    zones: [
      { x: 80, y: 60, r: 26 },
      { x: 130, y: 90, r: 24 },
      { x: 55, y: 100, r: 20 },
      { x: 160, y: 50, r: 16 },
    ],
    desc: 'Confirmed flood zones. All routing is fully adapted.',
  },
];

export default function Slide06Prediction() {
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
          Know Before It Floods
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Predictive intelligence gives cities hours of lead time — not minutes.
        </motion.p>

        <div className="flex-1 flex flex-col justify-center mt-6">
          {/* Timeline stages */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {stages.map((stage, i) => (
              <motion.div
                key={i}
                className="bg-slate-dark border border-neutral-700 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Header */}
                <div
                  className="px-4 py-2 border-b border-neutral-700 flex items-center gap-2"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className="text-sm font-semibold text-white">
                    {stage.time}
                  </span>
                </div>

                {/* Mini map */}
                <div className="p-4">
                  <svg viewBox="0 0 200 130" className="w-full h-auto">
                    {/* Grid */}
                    {Array.from({ length: 9 }).map((_, j) => (
                      <line
                        key={`v-${j}`}
                        x1={(j + 1) * 20}
                        y1="0"
                        x2={(j + 1) * 20}
                        y2="130"
                        stroke="rgba(51,65,85,0.4)"
                        strokeWidth="0.5"
                      />
                    ))}
                    {Array.from({ length: 6 }).map((_, j) => (
                      <line
                        key={`h-${j}`}
                        x1="0"
                        y1={(j + 1) * 20}
                        x2="200"
                        y2={(j + 1) * 20}
                        stroke="rgba(51,65,85,0.4)"
                        strokeWidth="0.5"
                      />
                    ))}
                    {/* Roads */}
                    <line x1="20" y1="40" x2="180" y2="40" stroke="#475569" strokeWidth="1.5" />
                    <line x1="20" y1="80" x2="180" y2="80" stroke="#475569" strokeWidth="1.5" />
                    <line x1="60" y1="10" x2="60" y2="120" stroke="#475569" strokeWidth="1.5" />
                    <line x1="120" y1="10" x2="120" y2="120" stroke="#475569" strokeWidth="1.5" />
                    {/* Flood zones */}
                    {stage.zones.map((z, j) => (
                      <circle
                        key={j}
                        cx={z.x}
                        cy={z.y}
                        r={z.r}
                        fill={`${stage.color}`}
                        fillOpacity={stage.opacity}
                        stroke={stage.color}
                        strokeWidth="1"
                        strokeOpacity={stage.opacity + 0.2}
                      />
                    ))}
                  </svg>
                </div>

                {/* Description */}
                <div className="px-4 pb-4">
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Accuracy metric */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono font-bold text-6xl text-flood-cyan">
              94%
            </span>
            <div className="text-left">
              <p className="text-white font-semibold">Prediction Accuracy</p>
              <p className="text-neutral-400 text-sm">
                6-hour advance flood detection across test cities
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
