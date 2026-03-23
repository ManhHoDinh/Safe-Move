import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

const loopNodes = [
  { label: 'Sense', color: '#06B6D4' },    // flood-cyan
  { label: 'Think', color: '#2563EB' },     // storm-blue
  { label: 'Act', color: '#10B981' },       // safe-green
  { label: 'Measure', color: '#F59E0B' },   // caution-amber
  { label: 'Learn', color: '#EC4899' },     // critical-magenta
];

const bullets = [
  {
    bold: 'LLM-Powered Analysis',
    text: 'Natural language flood reports translated into structured risk assessments in real time.',
  },
  {
    bold: 'Autonomous Agents',
    text: 'AI agents monitor, triage, and escalate without human bottlenecks.',
  },
  {
    bold: 'Reinforcement Learning',
    text: 'Routing models improve with every flood event, optimizing for safety and throughput.',
  },
  {
    bold: 'Closed-Loop Feedback',
    text: 'Outcomes feed back into prediction models — accuracy compounds over time.',
  },
];

export default function Slide04Intelligence() {
  const cx = 160;
  const cy = 160;
  const r = 120;

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
          Intelligence That Compounds
        </motion.h2>

        <div className="flex-1 flex flex-col lg:flex-row gap-12 mt-8 items-center">
          {/* Left — bullets */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            {bullets.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-semibold text-lg">{b.bold}</h3>
                <p className="text-neutral-300 text-base mt-1 leading-relaxed">
                  {b.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right — circular diagram */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="relative" style={{ width: 320, height: 320 }}>
              <svg width="320" height="320" viewBox="0 0 320 320" className="absolute inset-0">
                {/* Connecting arrows */}
                {loopNodes.map((_, i) => {
                  const angle1 = (i * 2 * Math.PI) / loopNodes.length - Math.PI / 2;
                  const angle2 =
                    ((i + 1) * 2 * Math.PI) / loopNodes.length - Math.PI / 2;
                  const x1 = cx + r * Math.cos(angle1);
                  const y1 = cy + r * Math.sin(angle1);
                  const x2 = cx + r * Math.cos(angle2);
                  const y2 = cy + r * Math.sin(angle2);
                  // Control point for arc
                  const midAngle = ((angle1 + angle2) / 2);
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
                const angle = (i * 2 * Math.PI) / loopNodes.length - Math.PI / 2;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);

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
                      className="w-14 h-14 rounded-full flex items-center justify-center border-2"
                      style={{
                        borderColor: node.color,
                        backgroundColor: `${node.color}15`,
                      }}
                    >
                      <span
                        className="text-xs font-bold tracking-wide"
                        style={{ color: node.color }}
                      >
                        {node.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Center label */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <span className="text-sm font-bold text-white tracking-wide">
                    SafeMove
                  </span>
                  <br />
                  <span className="text-xs text-flood-cyan font-semibold">AI</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
