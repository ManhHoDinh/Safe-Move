import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScanEye, BrainCircuit, Route, RefreshCw } from 'lucide-react';

const pillars = [
  {
    icon: ScanEye,
    label: 'DETECT',
    title: 'Real-Time Detection',
    description:
      'Real-time flood point identification from traffic cameras, IoT water-level sensors, weather feeds, and crawled news. The system watches continuously across every source simultaneously.',
  },
  {
    icon: BrainCircuit,
    label: 'EVALUATE',
    title: 'Severity Assessment',
    description:
      'LLM-powered severity assessment. Not just flooded/not-flooded — depth estimation, passability scoring, confidence levels. Natural language understanding of weather bulletins and social media.',
  },
  {
    icon: Route,
    label: 'ROUTE',
    title: 'Smart Rerouting',
    description:
      'Google Maps integration that avoids flooded roads automatically. Drivers, fleet operators, and city systems receive optimized routes that treat flood points as dynamic obstacles.',
  },
  {
    icon: RefreshCw,
    label: 'LEARN',
    title: 'Continuous Learning',
    description:
      'Agents and reinforcement learning that improve routing with every event. User reports, outcome data, prediction accuracy — everything feeds back. The system compounds.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.15 },
  }),
};

export default function Solution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="solution" className="relative py-24 lg:py-32 bg-abyss">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-blue to-transparent" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            One AI platform.{' '}
            <span className="text-storm-blue">Every flood-affected route decision.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="group relative flex flex-col rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20"
              >
                <div className="mb-5">
                  <Icon
                    size={48}
                    className="text-storm-blue transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-xs font-bold tracking-[0.2em] text-storm-blue mb-2">
                  {pillar.label}
                </span>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed flex-1">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
