import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Navigation, AlertTriangle } from 'lucide-react';

const metrics = [
  {
    icon: Clock,
    label: 'Average Reroute Time',
    value: '< 1.2s',
    description: 'From flood detection to route update',
  },
  {
    icon: Navigation,
    label: 'Routes Optimized Daily',
    value: '12,000+',
    description: 'Across all monitored corridors',
  },
  {
    icon: AlertTriangle,
    label: 'Incidents Prevented',
    value: '847',
    description: 'Vehicles rerouted from danger zones',
  },
];

export default function Demo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="demo" className="relative py-24 lg:py-32 bg-abyss">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-blue to-transparent" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[length:var(--font-size-h1)] md:text-5xl font-bold text-white tracking-tight">
            See it <span className="text-storm-blue">in action.</span>
          </h2>
        </motion.div>

        {/* Simulated map visualization */}
        <motion.div
          className="rounded-2xl bg-deep-navy border border-slate-dark overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative flex flex-col lg:flex-row">
            {/* Map area */}
            <div className="flex-1 relative min-h-[400px] lg:min-h-[480px]">
              {/* Grid lines simulating streets */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(37,99,235,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.6) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Main roads (thicker lines) */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 600 480"
                preserveAspectRatio="xMidYMid slice"
                role="img"
                aria-label="Interactive visualization showing SafeMove AI detecting flood zones and rerouting traffic around them"
              >
                {/* Major horizontal roads */}
                <line x1="0" y1="160" x2="600" y2="160" stroke="rgba(148,163,184,0.12)" strokeWidth="3" />
                <line x1="0" y1="320" x2="600" y2="320" stroke="rgba(148,163,184,0.12)" strokeWidth="3" />
                {/* Major vertical roads */}
                <line x1="200" y1="0" x2="200" y2="480" stroke="rgba(148,163,184,0.12)" strokeWidth="3" />
                <line x1="400" y1="0" x2="400" y2="480" stroke="rgba(148,163,184,0.12)" strokeWidth="3" />

                {/* Flood zone 1 - large */}
                <motion.circle
                  cx="300"
                  cy="240"
                  r="55"
                  fill="rgba(239,68,68,0.08)"
                  stroke="rgba(239,68,68,0.3)"
                  strokeWidth="1.5"
                  animate={{ r: [50, 60, 50], opacity: [0.8, 0.5, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Flood zone 1 inner pulse */}
                <motion.circle
                  cx="300"
                  cy="240"
                  r="25"
                  fill="rgba(239,68,68,0.15)"
                  animate={{ r: [22, 30, 22], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Flood zone 2 - smaller */}
                <motion.circle
                  cx="420"
                  cy="150"
                  r="30"
                  fill="rgba(245,158,11,0.08)"
                  stroke="rgba(245,158,11,0.3)"
                  strokeWidth="1.5"
                  animate={{ r: [28, 35, 28], opacity: [0.7, 0.4, 0.7] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />
                <motion.circle
                  cx="420"
                  cy="150"
                  r="12"
                  fill="rgba(245,158,11,0.15)"
                  animate={{ r: [10, 16, 10], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />

                {/* Original route (gray dashed - crosses flood zone) */}
                <path
                  d="M 80 380 L 180 320 L 280 260 L 340 220 L 440 160 L 520 100"
                  fill="none"
                  stroke="rgba(148,163,184,0.25)"
                  strokeWidth="2.5"
                  strokeDasharray="8 5"
                />
                {/* X markers on the original route in flood zone */}
                <text x="275" y="255" fill="rgba(239,68,68,0.7)" fontSize="18" fontWeight="bold" textAnchor="middle">&times;</text>
                <text x="430" y="155" fill="rgba(245,158,11,0.7)" fontSize="16" fontWeight="bold" textAnchor="middle">&times;</text>

                {/* Safe route (green animated) */}
                <motion.path
                  d="M 80 380 L 160 350 L 200 380 L 240 370 L 280 340 L 340 340 L 380 300 L 420 260 L 460 220 L 500 160 L 520 100"
                  fill="none"
                  stroke="rgba(16,185,129,0.7)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="800"
                  initial={{ strokeDashoffset: 800 }}
                  animate={isInView ? { strokeDashoffset: 0 } : {}}
                  transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.8 }}
                />
                {/* Safe route glow */}
                <motion.path
                  d="M 80 380 L 160 350 L 200 380 L 240 370 L 280 340 L 340 340 L 380 300 L 420 260 L 460 220 L 500 160 L 520 100"
                  fill="none"
                  stroke="rgba(16,185,129,0.15)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="800"
                  initial={{ strokeDashoffset: 800 }}
                  animate={isInView ? { strokeDashoffset: 0 } : {}}
                  transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.8 }}
                />

                {/* Start point */}
                <circle cx="80" cy="380" r="6" fill="#10B981" />
                <circle cx="80" cy="380" r="3" fill="white" />

                {/* End point */}
                <circle cx="520" cy="100" r="6" fill="#10B981" />
                <circle cx="520" cy="100" r="3" fill="white" />

                {/* Labels */}
                <text x="80" y="405" fill="rgba(203,213,225,0.6)" fontSize="10" textAnchor="middle">START</text>
                <text x="520" y="88" fill="rgba(203,213,225,0.6)" fontSize="10" textAnchor="middle">DEST</text>
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-neutral-400 block" style={{ borderTop: '2px dashed rgba(148,163,184,0.5)' }} />
                  <span className="text-neutral-500">Original route</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-safe-green rounded-full block" />
                  <span className="text-neutral-500">Safe route</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-danger-red/30 border border-danger-red/50 block" />
                  <span className="text-neutral-500">Flood zone</span>
                </div>
              </div>
            </div>

            {/* Side metrics panel */}
            <div className="lg:w-72 border-t lg:border-t-0 lg:border-l border-slate-dark p-6 flex flex-col justify-center gap-6 bg-deep-navy/50">
              <div className="text-xs font-bold tracking-[0.15em] text-storm-blue mb-2">
                ROUTE ANALYSIS
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <div className="text-xs text-neutral-500 mb-1">Status</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-safe-green animate-pulse" />
                  <span className="text-sm font-semibold text-safe-green">
                    Route recalculated in 1.2s
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <div className="text-xs text-neutral-500 mb-1">Time Saved</div>
                <span className="font-mono font-bold text-2xl text-white">
                  23 min
                </span>
                <span className="text-xs text-neutral-500 ml-2">vs original route</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 2.1 }}
              >
                <div className="text-xs text-neutral-500 mb-1">Flood Severity</div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-5 h-2 rounded-sm ${
                          level <= 3 ? 'bg-danger-red' : 'bg-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-white">Level 3/5</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 2.4 }}
              >
                <div className="text-xs text-neutral-500 mb-1">Affected Roads</div>
                <span className="font-mono font-bold text-2xl text-white">7</span>
                <span className="text-xs text-neutral-500 ml-2">corridors blocked</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={i}
                className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
              >
                <Icon
                  size={24}
                  className="text-storm-blue mx-auto mb-3"
                  strokeWidth={1.5}
                />
                <div className="font-mono font-bold text-2xl text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-white mb-1">
                  {metric.label}
                </div>
                <p className="text-xs text-neutral-500">{metric.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
