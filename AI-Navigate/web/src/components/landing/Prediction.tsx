import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, BarChart3, Shield } from 'lucide-react';

const reports = [
  {
    icon: Clock,
    title: 'FLOOD PREDICTION',
    description:
      'AI models combine weather forecasts, soil saturation data, drainage capacity, and historical flood patterns to predict flooding events 15-60 minutes before they occur, giving cities time to preemptively reroute traffic.',
    tag: 'Prediction: District 7 — 78% probability in 45 min',
  },
  {
    icon: BarChart3,
    title: 'TRAFFIC IMPACT REPORTS',
    description:
      'Automated reports quantify the traffic impact of each flood event: affected vehicles, delay hours, economic cost, and alternative route utilization. Delivered to traffic management centers in real time.',
    tag: 'Impact: 2,340 vehicles rerouted — 18 min avg saved',
  },
  {
    icon: Shield,
    title: 'REGULATION SUGGESTIONS',
    description:
      'Based on recurring flood patterns and infrastructure analysis, the system generates policy recommendations for road design, drainage upgrades, and traffic regulation changes to reduce future flood risk.',
    tag: 'Suggestion: Install backflow valves at 3 intersections',
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

export default function Prediction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="prediction" className="relative py-24 lg:py-32 bg-abyss">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-blue to-transparent" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[length:var(--font-size-h1)] md:text-5xl font-bold text-white tracking-tight">
            Know <span className="text-storm-blue">before</span> it floods.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reports.map((report, i) => {
            const Icon = report.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="group rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 flex flex-col"
              >
                <Icon
                  size={32}
                  className="text-storm-blue mb-5 transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                />
                <span className="text-xs font-bold tracking-[0.2em] text-storm-blue mb-3">
                  {report.title}
                </span>
                <p className="text-sm text-neutral-400 leading-relaxed flex-1 mb-5">
                  {report.description}
                </p>
                <span className="inline-block self-start bg-storm-blue/10 text-storm-blue text-xs font-medium rounded-full px-3 py-1.5">
                  {report.tag}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
