import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Timer,
  Layers,
  Gauge,
  Shield,
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

function DownArrow({ color = '#64748B' }: { color?: string }) {
  return (
    <div className="flex justify-center py-1.5">
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
        <line x1="8" y1="0" x2="8" y2="8" stroke={color} strokeWidth="1.5" />
        <polygon points="4,7 8,14 12,7" fill={color} />
      </svg>
    </div>
  );
}

const routingSteps = [
  {
    label: 'Google Maps Directions API',
    desc: 'Fetch base routes with real-time traffic ETA',
    color: '#06B6D4',
  },
  {
    label: 'Flood Penalty Engine',
    desc: 'Apply weighted penalties to flooded road segments',
    color: '#F59E0B',
  },
  {
    label: 'Route Scorer',
    desc: 'Rank by time x safety x distance composite score',
    color: '#2563EB',
  },
  {
    label: 'Best Route Selection',
    desc: 'Deliver optimized route with 3-5 alternatives',
    color: '#10B981',
  },
];

export default function TechRouting() {
  return (
    <div className="space-y-16">
      <Section>
        <h1 className="text-4xl font-bold text-white">Routing Intelligence</h1>
        <p className="text-lg text-neutral-400 mt-3">
          We don't build our own mapping engine -- we augment Google Maps with flood intelligence.
        </p>
        <p className="text-sm text-neutral-500 mt-2">
          Real-time flood data is injected as weighted penalties into route scoring, enabling
          safe-path recommendations that Google Maps alone cannot provide.
        </p>
      </Section>

      {/* Routing Pipeline + Visualization */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Routing pipeline */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-white mb-4">Route Calculation Flow</h2>
            {routingSteps.map((step, i) => (
              <div key={i}>
                <motion.div
                  className="bg-slate-dark border rounded-xl px-5 py-4 flex items-start gap-4"
                  style={{ borderColor: `${step.color}30` }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5"
                    style={{
                      backgroundColor: `${step.color}15`,
                      color: step.color,
                      border: `1.5px solid ${step.color}40`,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <span className="text-white font-semibold text-sm">{step.label}</span>
                    <p className="text-xs text-neutral-400 mt-1">{step.desc}</p>
                  </div>
                </motion.div>
                {i < routingSteps.length - 1 && <DownArrow color={step.color} />}
              </div>
            ))}
          </div>

          {/* Right: Key metrics and info */}
          <div className="flex flex-col justify-center gap-6">
            <motion.div
              className="grid grid-cols-3 gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {[
                { value: '< 2s', label: 'Recalculation', icon: Timer },
                { value: '3-5', label: 'Alternatives', icon: Layers },
                { value: '2 modes', label: 'Fleet + Individual', icon: Gauge },
              ].map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={i}
                    className="bg-deep-navy border border-neutral-700/50 rounded-xl p-4 text-center"
                  >
                    <Icon size={20} className="mx-auto text-storm-blue mb-2" strokeWidth={1.5} />
                    <p className="font-mono text-lg font-bold text-white">{metric.value}</p>
                    <p className="text-xs text-neutral-400 mt-1">{metric.label}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Route visualization */}
            <motion.div
              className="relative rounded-xl overflow-hidden border border-neutral-700"
              style={{ aspectRatio: '16 / 9', background: '#0f1729' }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 225" fill="none" preserveAspectRatio="xMidYMid meet">
                {/* Flood zones */}
                <motion.circle
                  cx="180" cy="95" r="28"
                  fill="#EF4444" fillOpacity="0.12"
                  stroke="#EF4444" strokeWidth="1.5" strokeOpacity="0.3"
                  animate={{ r: [26, 30, 26], fillOpacity: [0.08, 0.18, 0.08] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <text x="180" y="99" textAnchor="middle" fill="#EF4444" fontSize="8" fontWeight="bold" opacity="0.6">FLOOD</text>
                <motion.circle
                  cx="260" cy="150" r="20"
                  fill="#F59E0B" fillOpacity="0.1"
                  stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.3"
                  animate={{ r: [18, 22, 18] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />

                {/* Blocked route */}
                <motion.path
                  d="M50 50 L120 75 L180 95 L240 130 L330 170"
                  stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 4" strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  viewport={{ once: true }}
                />

                {/* Safe route */}
                <motion.path
                  d="M50 50 L90 55 L130 42 L210 42 L290 75 L330 110 L350 170"
                  stroke="#10B981" strokeWidth="2.5" strokeOpacity="0.9"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1.0 }}
                  viewport={{ once: true }}
                />

                <circle cx="50" cy="50" r="4" fill="#06B6D4" />
                <text x="50" y="42" textAnchor="middle" fill="#06B6D4" fontSize="9" fontWeight="bold">A</text>
                <circle cx="350" cy="170" r="4" fill="#06B6D4" />
                <text x="350" y="162" textAnchor="middle" fill="#06B6D4" fontSize="9" fontWeight="bold">B</text>

                <line x1="20" y1="205" x2="40" y2="205" stroke="#10B981" strokeWidth="2" />
                <text x="44" y="208" fill="#94A3B8" fontSize="8">Safe route</text>
                <line x1="120" y1="205" x2="140" y2="205" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 2" strokeOpacity="0.5" />
                <text x="144" y="208" fill="#94A3B8" fontSize="8">Blocked</text>
              </svg>
            </motion.div>

            {/* Emergency note */}
            <motion.div
              className="bg-danger-red/5 border border-danger-red/20 rounded-lg px-4 py-3 flex items-start gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Shield size={18} className="text-danger-red flex-shrink-0 mt-0.5" />
              <p className="text-xs text-neutral-400">
                <span className="text-danger-red font-semibold">Emergency Corridors:</span>{' '}
                Priority routing for ambulance, fire, and police vehicles with dedicated
                flood-safe corridors.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Flood Penalty Engine Detail */}
      <Section>
        <h2 className="text-2xl font-bold text-white mb-6">Flood Penalty Engine</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-3">Penalty Weights</h3>
            <div className="space-y-3">
              {[
                { level: 'Level 1', penalty: '1.2x', color: 'text-safe-green', desc: 'Minor slowdown' },
                { level: 'Level 2', penalty: '1.8x', color: 'text-caution-amber', desc: 'Significant delay' },
                { level: 'Level 3', penalty: '3.0x', color: 'text-caution-amber', desc: 'Heavy penalty, avoid if possible' },
                { level: 'Level 4', penalty: '10x', color: 'text-danger-red', desc: 'Effectively blocked' },
                { level: 'Level 5', penalty: 'Infinity', color: 'text-danger-red', desc: 'Removed from graph' },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-neutral-300">{p.level}: {p.desc}</span>
                  <span className={`font-mono font-bold ${p.color}`}>{p.penalty}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-3">Route Scoring Formula</h3>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm text-neutral-300 mb-4">
              <code className="text-flood-cyan">
                score = w_time * ETA + w_safety * flood_penalty + w_dist * distance
              </code>
            </div>
            <div className="space-y-2 text-sm text-neutral-400">
              <p>Default weights: time=0.4, safety=0.4, distance=0.2</p>
              <p>Emergency mode: safety=0.8, time=0.2, distance=0.0</p>
              <p>Routes scored, ranked, and top 3-5 returned to client</p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Real-time Recalculation */}
      <Section>
        <h2 className="text-2xl font-bold text-white mb-6">Real-Time Recalculation</h2>
        <motion.div
          className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-3 text-sm text-neutral-300">
            <p>When a new flood event is detected or an existing one changes severity:</p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>Flood penalty graph updates within 2 seconds</li>
              <li>Active navigation sessions receive WebSocket push notification</li>
              <li>Routes are recalculated with new penalty weights</li>
              <li>Driver sees updated route recommendation with explanation</li>
              <li>If route is significantly different, an audio alert is triggered</li>
            </ol>
          </div>
          <div className="mt-4 p-3 bg-storm-blue/5 border border-storm-blue/20 rounded-lg">
            <p className="text-sm text-neutral-300">
              <span className="text-storm-blue font-semibold">Key metric:</span>{' '}
              End-to-end from flood detection to driver notification: under 30 seconds at P95.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Next page */}
      <div className="pt-8 border-t border-neutral-800">
        <Link
          to="/technology/agents"
          className="inline-flex items-center gap-2 text-sm font-medium text-storm-blue hover:text-white transition-colors"
        >
          Next: Agent System <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
