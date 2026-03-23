import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Search,
  BarChart3,
  Zap,
  Play,
  Target,
  Bot,
  MessageSquare,
  Database,
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

const loopNodes = [
  { label: 'CRAWL', color: '#06B6D4', icon: Search, desc: 'Monitor sources 24/7' },
  { label: 'ANALYZE', color: '#2563EB', icon: BarChart3, desc: 'Cross-reference signals' },
  { label: 'DECIDE', color: '#10B981', icon: Zap, desc: 'Recommend strategies' },
  { label: 'EXECUTE', color: '#F59E0B', icon: Play, desc: 'Apply routing updates' },
  { label: 'MEASURE', color: '#EF4444', icon: Target, desc: 'Track outcomes' },
];

const agentTypes = [
  {
    name: 'Crawler Agents',
    desc: 'Monitor weather, news, social media 24/7',
    icon: Search,
    color: '#06B6D4',
  },
  {
    name: 'Analysis Agents',
    desc: 'Cross-reference, validate, score incoming signals',
    icon: BarChart3,
    color: '#2563EB',
  },
  {
    name: 'Decision Agents',
    desc: 'Recommend routing strategies from learned patterns',
    icon: Zap,
    color: '#10B981',
  },
  {
    name: 'Reporting Agents',
    desc: 'Generate LLM-written impact reports',
    icon: MessageSquare,
    color: '#F59E0B',
  },
  {
    name: 'Orchestrator',
    desc: 'Coordinate agents, resolve conflicts, manage priorities',
    icon: Bot,
    color: '#EC4899',
  },
];

export default function TechAgents() {
  return (
    <div className="space-y-16">
      <Section>
        <h1 className="text-4xl font-bold text-white">Agent System & Continuous Learning</h1>
        <p className="text-lg text-neutral-400 mt-3">
          Autonomous agents crawl, analyze, decide, execute, and measure -- every flood makes the
          system smarter.
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Circular loop diagram */}
          <div className="flex items-center justify-center">
            <div className="relative" style={{ width: 340, height: 340 }}>
              <svg width="340" height="340" viewBox="0 0 340 340" className="absolute inset-0">
                {loopNodes.map((_, i) => {
                  const cx = 170;
                  const cy = 170;
                  const r = 130;
                  const angle1 = (i * 2 * Math.PI) / loopNodes.length - Math.PI / 2;
                  const angle2 =
                    (((i + 1) % loopNodes.length) * 2 * Math.PI) / loopNodes.length - Math.PI / 2;
                  const x1 = cx + r * Math.cos(angle1);
                  const y1 = cy + r * Math.sin(angle1);
                  const x2 = cx + r * Math.cos(angle2);
                  const y2 = cy + r * Math.sin(angle2);
                  const midAngle = (angle1 + angle2) / 2;
                  const cpr = r * 0.6;
                  const cpx = cx + cpr * Math.cos(midAngle);
                  const cpy = cy + cpr * Math.sin(midAngle);

                  return (
                    <motion.path
                      key={i}
                      d={`M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`}
                      fill="none"
                      stroke={loopNodes[i].color}
                      strokeWidth="2"
                      strokeOpacity="0.35"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                      viewport={{ once: true }}
                    />
                  );
                })}
              </svg>

              {/* Nodes */}
              {loopNodes.map((node, i) => {
                const cx = 170;
                const cy = 170;
                const r = 130;
                const angle = (i * 2 * Math.PI) / loopNodes.length - Math.PI / 2;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                const Icon = node.icon;

                return (
                  <motion.div
                    key={i}
                    className="absolute flex flex-col items-center"
                    style={{ left: x - 36, top: y - 36, width: 72, height: 72 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + i * 0.12,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center border-2"
                      style={{
                        borderColor: node.color,
                        backgroundColor: `${node.color}15`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: node.color }} strokeWidth={1.5} />
                    </div>
                    <span
                      className="text-[10px] font-bold tracking-wide mt-1 whitespace-nowrap"
                      style={{ color: node.color }}
                    >
                      {node.label}
                    </span>
                    <span className="text-[9px] text-neutral-500 whitespace-nowrap">{node.desc}</span>
                  </motion.div>
                );
              })}

              {/* Center label */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center">
                  <Database className="w-6 h-6 text-neutral-400 mb-1" strokeWidth={1.5} />
                  <span className="text-xs font-bold text-white tracking-wide">AGENT</span>
                  <span className="text-xs font-bold text-neutral-400 tracking-wide">MEMORY</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Agent type cards */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              Agent Types
            </h3>
            {agentTypes.map((agent, i) => {
              const Icon = agent.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-deep-navy border border-neutral-700/50 rounded-xl px-5 py-4 flex items-start gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${agent.color}15` }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: agent.color }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-white font-semibold text-sm">{agent.name}</span>
                    <p className="text-xs text-neutral-400 mt-1">{agent.desc}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Feedback sources */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                Feedback Sources
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'User ratings',
                  'Route completion data',
                  'Prediction accuracy',
                  'LLM confidence calibration',
                ].map((source, i) => (
                  <motion.span
                    key={i}
                    className="inline-flex items-center gap-2 bg-slate-dark border border-neutral-700/50 rounded-full px-3 py-1.5 text-xs text-neutral-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.06 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-flood-cyan" />
                    {source}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.p
              className="text-neutral-500 text-xs italic mt-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              viewport={{ once: true }}
            >
              Optional: RL policy optimization layer for automated strategy tuning.
            </motion.p>
          </div>
        </div>
      </Section>

      {/* Next page */}
      <div className="pt-8 border-t border-neutral-800">
        <Link
          to="/technology/prediction"
          className="inline-flex items-center gap-2 text-sm font-medium text-storm-blue hover:text-white transition-colors"
        >
          Next: Prediction Engine <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
