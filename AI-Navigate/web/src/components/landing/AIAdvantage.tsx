import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FileText, Sparkles, Bot, Box } from 'lucide-react';

const systems = [
  {
    icons: [FileText, Sparkles],
    title: 'LLM INTELLIGENCE',
    description:
      'Our language model reads weather reports, camera feeds, news, and user reports to assess flood severity in natural language — no manual classification. It reasons about severity like an experienced traffic operator, but across every source simultaneously.',
  },
  {
    icons: [Bot],
    title: 'AGENT SYSTEM',
    description:
      'Autonomous agents crawl, verify, cross-reference, and escalate. One monitors weather. Another watches cameras. A third crawls news. A fourth cross-references all three. When signals converge, the system escalates.',
  },
  {
    icons: [Box],
    title: 'SIMULATION ENGINE',
    description:
      'Test routing strategies against simulated flood scenarios before deploying. Import your city\'s road network, overlay historical flood data, inject hypothetical rainfall, and watch how the system responds.',
  },
];

const stats = [
  { value: 6, suffix: '-hour', label: 'Prediction window', prefix: '', decimals: 0 },
  { value: 94.7, suffix: '%', label: 'Severity accuracy', prefix: '', decimals: 1 },
  { value: 800, suffix: 'ms', label: 'Recalculation time', prefix: '< ', decimals: 0 },
];

function AnimatedCounter({
  target,
  suffix,
  prefix = '',
  decimals = 0,
  inView,
}: {
  target: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  inView: boolean;
}) {
  const count = useMotionValue(0);
  const formatted = useTransform(count, (v) =>
    decimals > 0 ? v.toFixed(decimals) : String(Math.round(v))
  );
  const [display, setDisplay] = useState(decimals > 0 ? '0.' + '0'.repeat(decimals) : '0');

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, {
        duration: 2,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [inView, target, count]);

  useEffect(() => {
    const unsubscribe = formatted.on('change', (v) => {
      setDisplay(String(v));
    });
    return unsubscribe;
  }, [formatted]);

  return (
    <span className="font-mono font-bold text-4xl md:text-5xl text-white">
      {prefix}{display}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.15 },
  }),
};

export default function AIAdvantage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' });

  return (
    <section id="ai-advantage" className="relative py-24 lg:py-32 bg-abyss">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-blue to-transparent" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[length:var(--font-size-h1)] md:text-5xl font-bold text-white tracking-tight">
            Not just data. <span className="text-storm-blue">Intelligence.</span>
          </h2>
        </motion.div>

        <motion.p
          className="text-center text-neutral-400 max-w-2xl mx-auto mb-16 text-[length:var(--font-size-body-lg)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Three interconnected AI systems work together to transform raw flood data into
          actionable routing intelligence.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {systems.map((system, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20"
            >
              <div className="flex items-center gap-2 mb-5">
                {system.icons.map((Icon, j) => (
                  <Icon
                    key={j}
                    size={28}
                    className="text-storm-blue"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="text-xs font-bold tracking-[0.2em] text-storm-blue block mb-3">
                {system.title}
              </span>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {system.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="rounded-2xl bg-deep-navy border border-slate-dark p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.decimals}
                  inView={statsInView}
                />
                {/* Gradient underline */}
                <div className="mt-3 mb-3 h-0.5 w-16 mx-auto bg-gradient-to-r from-storm-blue to-flood-cyan rounded-full" />
                <p className="text-sm text-neutral-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
