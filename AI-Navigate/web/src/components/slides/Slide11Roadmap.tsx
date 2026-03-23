import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

const phases = [
  {
    label: 'Phase 1',
    period: 'Q1 — Q2 2026',
    title: 'Foundation',
    milestones: ['Launch MVP platform', 'First pilot city deployment', 'Core flood detection engine'],
    size: 16,
    color: '#06B6D4',
  },
  {
    label: 'Phase 2',
    period: 'Q3 — Q4 2026',
    title: 'Intelligence',
    milestones: ['LLM-powered analysis', 'Autonomous agent system', 'Predictive flood modeling'],
    size: 20,
    color: '#0E9AC4',
  },
  {
    label: 'Phase 3',
    period: 'Q1 — Q2 2027',
    title: 'Scale',
    milestones: ['10 cities deployed', 'Enterprise API launch', 'Insurance data partnerships'],
    size: 24,
    color: '#1A7EB4',
  },
  {
    label: 'Phase 4',
    period: 'Q3 — Q4 2027',
    title: 'Platform',
    milestones: ['Digital twin simulation', 'International expansion', 'Full autonomous operations'],
    size: 28,
    color: '#2563EB',
  },
];

export default function Slide11Roadmap() {
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
          From Pilot to Platform
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          A deliberate path from single-city MVP to global flood intelligence platform.
        </motion.p>

        <div className="flex-1 flex items-center mt-8">
          <div className="w-full">
            {/* Timeline container */}
            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute top-[60px] left-0 right-0 h-0.5 bg-neutral-700"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'left' }}
              />

              {/* Phase nodes */}
              <div className="grid grid-cols-4 gap-6">
                {phases.map((phase, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                    viewport={{ once: true }}
                  >
                    {/* Label above */}
                    <div className="text-center mb-3">
                      <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500">
                        {phase.label}
                      </p>
                      <p className="text-sm text-neutral-300 font-semibold mt-0.5">
                        {phase.title}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">{phase.period}</p>
                    </div>

                    {/* Node circle */}
                    <motion.div
                      className="rounded-full border-2 flex items-center justify-center z-10"
                      style={{
                        width: phase.size * 2.5,
                        height: phase.size * 2.5,
                        borderColor: phase.color,
                        backgroundColor: `${phase.color}20`,
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + i * 0.15,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      viewport={{ once: true }}
                    >
                      <div
                        className="rounded-full"
                        style={{
                          width: phase.size,
                          height: phase.size,
                          backgroundColor: phase.color,
                        }}
                      />
                    </motion.div>

                    {/* Milestones below */}
                    <div className="mt-4 space-y-1.5">
                      {phase.milestones.map((m, j) => (
                        <motion.div
                          key={j}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.7 + i * 0.15 + j * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <div
                            className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: phase.color }}
                          />
                          <span className="text-xs text-neutral-400 leading-relaxed">
                            {m}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
