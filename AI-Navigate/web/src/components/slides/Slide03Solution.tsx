import { motion } from 'framer-motion';
import { Radar, ShieldCheck, Navigation, Brain } from 'lucide-react';
import SlideLayout from './SlideLayout';

const nodes = [
  { icon: Radar, label: 'DETECT', desc: 'IoT + radar + satellite flood sensing' },
  { icon: ShieldCheck, label: 'EVALUATE', desc: 'Multi-source risk scoring per segment' },
  { icon: Navigation, label: 'ROUTE', desc: 'Dynamic rerouting for all vehicles' },
  { icon: Brain, label: 'LEARN', desc: 'RL adapts after every event' },
];

export default function Slide03Solution() {
  return (
    <SlideLayout slideNumber={3}>
      <div className="flex flex-col h-full">
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          One AI Platform. Every Flood Decision.
        </motion.h2>

        {/* Pipeline diagram */}
        <div className="flex-1 flex flex-col items-center justify-center mt-8">
          {/* Nodes row */}
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 lg:gap-8 w-full max-w-4xl">
            {nodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <div key={i} className="flex items-center gap-4 sm:gap-2 lg:gap-4">
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="relative bg-slate-dark border border-neutral-700/60 rounded-2xl w-28 h-28 lg:w-32 lg:h-32 flex flex-col items-center justify-center gap-1.5 overflow-hidden"
                      style={{
                        boxShadow: '0 0 20px rgba(6,182,212,0.05)',
                      }}
                    >
                      <Icon className="w-8 h-8 lg:w-9 lg:h-9 text-flood-cyan" strokeWidth={1.5} />
                      <span className="text-xs font-bold text-white tracking-wider uppercase">
                        {node.label}
                      </span>
                      <span className="text-[10px] text-neutral-500 text-center leading-tight px-2">
                        {node.desc}
                      </span>
                    </div>
                  </motion.div>

                  {/* Arrow between nodes */}
                  {i < nodes.length - 1 && (
                    <motion.div
                      className="flex-shrink-0 hidden sm:block"
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                      viewport={{ once: true }}
                    >
                      <svg
                        width="48"
                        height="16"
                        viewBox="0 0 48 16"
                        fill="none"
                        className="text-storm-blue"
                      >
                        <motion.line
                          x1="0"
                          y1="8"
                          x2="38"
                          y2="8"
                          stroke="currentColor"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                          viewport={{ once: true }}
                        />
                        <motion.polygon
                          points="36,3 48,8 36,13"
                          fill="currentColor"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.7 + i * 0.15 }}
                          viewport={{ once: true }}
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Feedback loop arrow */}
          <motion.div
            className="w-full max-w-4xl mt-4 hidden sm:flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <svg
              width="100%"
              height="48"
              viewBox="0 0 700 48"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              className="max-w-[650px]"
            >
              <motion.path
                d="M620 8 C640 8 650 20 650 32 C650 44 640 48 620 48 L80 48 C60 48 50 44 50 32 C50 20 60 8 80 8"
                stroke="#06B6D4"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                fill="none"
                strokeOpacity="0.4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.3, ease: 'easeInOut' }}
                viewport={{ once: true }}
              />
              {/* Arrowhead on left end */}
              <motion.polygon
                points="72,4 80,12 88,4"
                fill="#06B6D4"
                fillOpacity="0.4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 2.5 }}
                viewport={{ once: true }}
              />
            </svg>
          </motion.div>

          {/* Bottom stat line */}
          <motion.p
            className="font-mono text-sm text-neutral-500 tracking-wider mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            viewport={{ once: true }}
          >
            Google Maps{' '}
            <span className="text-flood-cyan/50">+</span>{' '}
            LLM{' '}
            <span className="text-flood-cyan/50">+</span>{' '}
            Agents{' '}
            <span className="text-flood-cyan/50">+</span>{' '}
            RL
          </motion.p>
        </div>
      </div>
    </SlideLayout>
  );
}
