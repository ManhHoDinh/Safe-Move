import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const problems = [
  {
    stat: '300%',
    label: 'Increase in Urban Flash Floods',
    description:
      'Urban flood events have tripled in 20 years. Climate projections show acceleration through 2040.',
  },
  {
    stat: '$17B+',
    label: 'Annual Economic Loss',
    description:
      'Annual US urban flood damage. Southeast Asia faces 3x higher relative impact.',
  },
  {
    stat: '2 hours',
    label: 'Peak Capacity Lost Per Event',
    description:
      'Average peak traffic capacity lost per flood event. Cascades into logistics failures and emergency delays.',
  },
  {
    stat: '80%',
    label: 'Flood Traffic Fatalities',
    description:
      'Of flood-related traffic fatalities occur when drivers unknowingly enter flooded roads.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.12 },
  }),
};

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="problem" className="relative py-24 lg:py-32 bg-abyss">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-blue to-transparent" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Cities Drown in Data Gaps.{' '}
            <span className="text-danger-red">Drivers Drown on Roads.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group relative rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20"
            >
              <div className="mb-3">
                <span className="font-mono font-bold text-flood-cyan text-4xl leading-none">
                  {item.stat}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.label}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-12 text-center text-neutral-400 italic max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Here is the gap: cities have weather forecasts, traffic cameras, and incident
          reports. But they have zero real-time intelligence connecting flood conditions
          to routing decisions. The road floods. The navigation app still sends drivers
          through it.
        </motion.p>
      </div>
    </section>
  );
}
