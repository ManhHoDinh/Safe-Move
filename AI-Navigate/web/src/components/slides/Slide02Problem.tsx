import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import SlideLayout from './SlideLayout';

const stats = [
  { value: 300, suffix: '%', label: 'Flood Increase', color: '#06B6D4' },
  { value: 17, prefix: '$', suffix: 'B', label: 'Annual Damage', color: '#EF4444' },
  { value: 80, suffix: '%', label: 'Road Fatalities', color: '#F59E0B' },
  { value: 2, suffix: 'hrs+', label: 'Capacity Lost', color: '#2563EB' },
];

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  inView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="font-mono font-bold text-flood-cyan text-5xl lg:text-6xl leading-none">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function Slide02Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <SlideLayout slideNumber={2}>
      <div ref={ref} className="flex flex-col h-full">
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          The Invisible Crisis
        </motion.h2>

        {/* Supporting line */}
        <motion.p
          className="text-xl text-neutral-400 mt-4 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Urban flooding kills thousands and paralyzes city transport — yet no routing solution exists.
        </motion.p>

        {/* Stat cards — hero 2x2 grid */}
        <div className="flex-1 flex items-center justify-center mt-8">
          <div className="grid grid-cols-2 gap-6 lg:gap-8 w-full max-w-3xl">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="relative bg-slate-dark/80 border border-neutral-700/50 rounded-2xl p-8 lg:p-10 flex flex-col items-center justify-center text-center overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                viewport={{ once: true }}
              >
                {/* Subtle border glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 30px ${s.color}15, 0 0 15px ${s.color}08`,
                  }}
                />

                <AnimatedNumber
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  inView={inView}
                />
                <span className="font-sans text-sm uppercase tracking-widest text-neutral-400 mt-4">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
