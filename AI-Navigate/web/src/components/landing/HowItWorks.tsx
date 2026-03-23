import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: 1,
    label: 'DATA INGESTION',
    description:
      'Camera feeds, weather APIs, IoT sensors, social media, and news sources are continuously aggregated into a unified real-time data pipeline.',
  },
  {
    number: 2,
    label: 'AI ANALYSIS',
    description:
      'LLMs and computer vision models parse unstructured data, classify flood severity, and cross-reference historical patterns for contextual understanding.',
  },
  {
    number: 3,
    label: 'SMART ROUTING',
    description:
      'Agent-based systems generate optimized alternative routes, dynamically adjusting for road closures, traffic density, and evolving flood conditions.',
  },
  {
    number: 4,
    label: 'CONTINUOUS LEARNING',
    description:
      'Every event outcome feeds back into the system, refining prediction accuracy, severity models, and routing efficiency for future responses.',
  },
];

const stepVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: i * 0.2 },
  }),
};

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 bg-abyss">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-blue to-transparent" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[length:var(--font-size-h1)] md:text-5xl font-bold text-white tracking-tight">
            From raw data to safe routes{' '}
            <span className="text-storm-blue">in under 90 seconds.</span>
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-0 relative">
          {/* Connecting line */}
          <div className="absolute top-6 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px border-t border-dashed border-neutral-700" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={stepVariant}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-storm-blue text-white font-bold text-lg mb-5 shadow-lg shadow-storm-blue/20">
                {step.number}
              </div>
              <span className="text-xs font-bold tracking-[0.2em] text-storm-blue mb-2">
                {step.label}
              </span>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-[220px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile / Tablet: vertical timeline */}
        <div className="lg:hidden relative pl-8">
          {/* Vertical connecting line */}
          <div className="absolute top-6 left-[23px] bottom-6 w-px border-l border-dashed border-neutral-700" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={stepVariant}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="relative flex gap-5"
              >
                <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-storm-blue text-white font-bold text-lg shadow-lg shadow-storm-blue/20">
                  {step.number}
                </div>
                <div className="pt-1">
                  <span className="text-xs font-bold tracking-[0.2em] text-storm-blue block mb-1">
                    {step.label}
                  </span>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
