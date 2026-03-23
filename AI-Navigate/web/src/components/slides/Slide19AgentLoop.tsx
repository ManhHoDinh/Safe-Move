import { motion } from 'framer-motion';
import { Search, BarChart3, Zap, Play, Target, Database } from 'lucide-react';
import SlideLayout from './SlideLayout';

const loopNodes = [
  { label: 'CRAWL', color: '#06B6D4', icon: Search },
  { label: 'ANALYZE', color: '#2563EB', icon: BarChart3 },
  { label: 'DECIDE', color: '#10B981', icon: Zap },
  { label: 'EXECUTE', color: '#F59E0B', icon: Play },
  { label: 'MEASURE', color: '#EF4444', icon: Target },
];

const feedbackSources = [
  'User ratings',
  'Route outcomes',
  'Prediction accuracy',
  'LLM calibration',
];

export default function Slide19AgentLoop() {
  const cx = 160;
  const cy = 160;
  const r = 120;

  return (
    <SlideLayout>
      <div className="flex flex-col h-full">
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          The Learning Loop
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Every flood makes the system smarter.
        </motion.p>

        {/* Content */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 mt-8 items-center">
          {/* Center — Circular loop diagram */}
          <div className="lg:w-2/3 flex items-center justify-center">
            <div className="relative" style={{ width: 320, height: 320 }}>
              <svg
                width="320"
                height="320"
                viewBox="0 0 320 320"
                className="absolute inset-0"
              >
                {/* Curved arrows between nodes */}
                {loopNodes.map((_, i) => {
                  const angle1 =
                    (i * 2 * Math.PI) / loopNodes.length - Math.PI / 2;
                  const angle2 =
                    (((i + 1) % loopNodes.length) * 2 * Math.PI) /
                      loopNodes.length -
                    Math.PI / 2;
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
                      strokeOpacity="0.4"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                      viewport={{ once: true }}
                    />
                  );
                })}
              </svg>

              {/* Nodes */}
              {loopNodes.map((node, i) => {
                const angle =
                  (i * 2 * Math.PI) / loopNodes.length - Math.PI / 2;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                const Icon = node.icon;

                return (
                  <motion.div
                    key={i}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: x - 32,
                      top: y - 32,
                      width: 64,
                      height: 64,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + i * 0.12,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center border-2"
                      style={{
                        borderColor: node.color,
                        backgroundColor: `${node.color}15`,
                      }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: node.color }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span
                      className="text-xs font-bold tracking-wide mt-1 whitespace-nowrap"
                      style={{ color: node.color }}
                    >
                      {node.label}
                    </span>
                  </motion.div>
                );
              })}

              {/* Center — Agent Memory */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center">
                  <Database
                    className="w-6 h-6 text-neutral-400 mb-1"
                    strokeWidth={1.5}
                  />
                  <span className="text-xs font-bold text-white tracking-wide">
                    AGENT
                  </span>
                  <span className="text-xs font-bold text-neutral-400 tracking-wide">
                    MEMORY
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right — Feedback sources */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <motion.h3
              className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Feedback Sources
            </motion.h3>
            <div className="flex flex-col gap-3">
              {feedbackSources.map((source, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 rounded-full bg-flood-cyan flex-shrink-0" />
                  <span className="text-neutral-300 text-sm">{source}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-neutral-500 text-sm mt-4 italic text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          viewport={{ once: true }}
        >
          Optional: RL policy optimization layer
        </motion.p>
      </div>
    </SlideLayout>
  );
}
