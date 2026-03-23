import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  {
    initials: 'NT',
    name: 'Dr. Nguyen Minh Tuan',
    title: 'Director of Urban Traffic',
    org: 'Ho Chi Minh City',
    quote:
      'During the 2024 monsoon season, SafeMove AI identified 47 critical flood points an average of 3 hours before they became impassable. We rerouted over 12,000 vehicles across 6 major corridors with zero flood-related traffic incidents.',
    metric: '47 flood points | 0 incidents',
  },
  {
    initials: 'SC',
    name: 'Sarah Chen',
    title: 'VP of Logistics',
    org: 'PacificFreight',
    quote:
      'We reduced flood-related delivery delays by 68% across our Southeast Asian operations. The prediction engine alone saved us $2.3M in rerouting costs last quarter.',
    metric: '68% fewer delays | $2.3M saved',
  },
  {
    initials: 'JO',
    name: 'Prof. James Okafor',
    title: 'Department of Urban Planning',
    org: 'MIT',
    quote:
      'SafeMove is the first platform I\'ve evaluated that treats flooding as a dynamic traffic variable rather than a static hazard zone. The agent system\'s sub-90-second assessment is a step change.',
    metric: 'Sub-90s flood assessment',
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

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 bg-abyss">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-blue to-transparent" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[length:var(--font-size-h1)] md:text-5xl font-bold text-white tracking-tight">
            The systems that respond fastest{' '}
            <span className="text-storm-blue">win.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 flex flex-col transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20"
            >
              {/* Avatar and info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-storm-blue/20 text-storm-blue font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-neutral-400">
                    {t.title}, {t.org}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm text-neutral-300 leading-relaxed italic flex-1 mb-6">
                "{t.quote}"
              </p>

              {/* Metric badge */}
              <span className="inline-block self-start bg-storm-blue/10 text-storm-blue text-xs font-semibold rounded-full px-3 py-1.5">
                {t.metric}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
