import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

const routingSteps = [
  { label: 'Google Maps API', desc: 'Base routes + ETA', color: '#06B6D4' },
  { label: 'Flood Penalty Engine', desc: 'Weighted road segments', color: '#F59E0B' },
  { label: 'Route Scorer', desc: 'time x safety x distance', color: '#2563EB' },
  { label: 'Best Route', desc: 'Optimized output', color: '#10B981' },
];

export default function Slide18Routing() {
  return (
    <SlideLayout background="map">
      <div className="flex flex-col h-full">
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Routing Intelligence
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Google Maps + flood avoidance. &lt; 2s recalculation.
        </motion.p>

        {/* Split layout */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 mt-8">
          {/* Left — Routing logic flow */}
          <div className="lg:w-[45%] flex flex-col justify-center gap-2">
            {routingSteps.map((step, i) => (
              <div key={i}>
                <motion.div
                  className="bg-slate-dark border rounded-lg px-5 py-3 flex items-center gap-3"
                  style={{ borderColor: `${step.color}40` }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: step.color }}
                  />
                  <div>
                    <span className="text-white font-semibold text-sm">{step.label}</span>
                    <p className="text-xs text-neutral-400 mt-0.5">{step.desc}</p>
                  </div>
                </motion.div>

                {/* Arrow between steps */}
                {i < routingSteps.length - 1 && (
                  <motion.div
                    className="flex justify-center my-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.12 }}
                    viewport={{ once: true }}
                  >
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <line x1="8" y1="0" x2="8" y2="8" stroke="#64748B" strokeWidth="1.5" />
                      <polygon points="4,7 8,14 12,7" fill="#64748B" />
                    </svg>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Right — Map visualization */}
          <div className="lg:w-[55%] flex items-center justify-center">
            <motion.div
              className="relative w-full rounded-xl overflow-hidden border border-neutral-700"
              style={{
                aspectRatio: '4 / 3',
                maxHeight: 340,
                background: '#0f1729',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Grid background (simulating streets) */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 300"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Flood zone 1 — red pulsing circle */}
                <motion.circle
                  cx="180"
                  cy="120"
                  r="28"
                  fill="#EF4444"
                  fillOpacity="0.15"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  animate={{ r: [26, 30, 26], fillOpacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <text x="180" y="124" textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="bold" opacity="0.7">
                  FLOOD
                </text>

                {/* Flood zone 2 — amber pulsing circle */}
                <motion.circle
                  cx="260"
                  cy="180"
                  r="22"
                  fill="#F59E0B"
                  fillOpacity="0.12"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  animate={{ r: [20, 24, 20], fillOpacity: [0.08, 0.18, 0.08] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />

                {/* Flood zone 3 — red pulsing circle */}
                <motion.circle
                  cx="140"
                  cy="210"
                  r="20"
                  fill="#EF4444"
                  fillOpacity="0.12"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  strokeOpacity="0.3"
                  animate={{ r: [18, 22, 18], fillOpacity: [0.08, 0.16, 0.08] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />

                {/* Gray dashed path (crosses flood zone) */}
                <motion.path
                  d="M60 60 L120 90 L180 120 L240 160 L320 200"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  strokeOpacity="0.4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: true }}
                />

                {/* X marker on blocked path */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.5 }}
                  viewport={{ once: true }}
                >
                  <line x1="174" y1="114" x2="186" y2="126" stroke="#EF4444" strokeWidth="2.5" />
                  <line x1="186" y1="114" x2="174" y2="126" stroke="#EF4444" strokeWidth="2.5" />
                </motion.g>

                {/* Green solid path (avoids flood zones) */}
                <motion.path
                  d="M60 60 L100 70 L120 60 L200 60 L280 100 L320 140 L340 200"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeOpacity="0.9"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1.2 }}
                  viewport={{ once: true }}
                />

                {/* Amber dashed path (longer alternative) */}
                <motion.path
                  d="M60 60 L60 160 L80 240 L160 260 L280 240 L340 200"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  strokeOpacity="0.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1.6 }}
                  viewport={{ once: true }}
                />

                {/* Start point */}
                <circle cx="60" cy="60" r="5" fill="#06B6D4" />
                <text x="60" y="50" textAnchor="middle" fill="#06B6D4" fontSize="9" fontWeight="bold">
                  A
                </text>

                {/* End point */}
                <circle cx="340" cy="200" r="5" fill="#06B6D4" />
                <text x="340" y="190" textAnchor="middle" fill="#06B6D4" fontSize="9" fontWeight="bold">
                  B
                </text>

                {/* Legend */}
                <line x1="20" y1="275" x2="40" y2="275" stroke="#10B981" strokeWidth="2" />
                <text x="44" y="278" fill="#94A3B8" fontSize="8">Safe route</text>

                <line x1="110" y1="275" x2="130" y2="275" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" />
                <text x="134" y="278" fill="#94A3B8" fontSize="8">Alternative</text>

                <line x1="210" y1="275" x2="230" y2="275" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 2" strokeOpacity="0.5" />
                <text x="234" y="278" fill="#94A3B8" fontSize="8">Blocked</text>
              </svg>

              {/* Metrics overlay */}
              <motion.div
                className="absolute top-3 right-3 bg-abyss/80 backdrop-blur-sm border border-neutral-700 rounded-lg px-3 py-2"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                viewport={{ once: true }}
              >
                <p className="font-mono text-xs text-flood-cyan font-bold leading-relaxed">
                  1.2s recalc<br />
                  23 min saved<br />
                  2 alternatives
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
