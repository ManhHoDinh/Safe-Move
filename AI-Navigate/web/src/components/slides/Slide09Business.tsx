import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Building, Code, Database } from 'lucide-react';
import SlideLayout from './SlideLayout';

const streams = [
  {
    icon: Building,
    title: 'B2G Platform',
    desc: 'City-wide SaaS license for traffic and emergency management agencies.',
    pricing: '$5K — $15K+ / month',
  },
  {
    icon: Code,
    title: 'Developer API',
    desc: 'Pay-per-call access for navigation apps, logistics, and insurance.',
    pricing: '$0.002 per API call',
  },
  {
    icon: Database,
    title: 'Data-as-a-Service',
    desc: 'Historical flood-traffic datasets for insurers, urban planners, and researchers.',
    pricing: 'Custom enterprise pricing',
  },
];

const projections = [
  { year: 'Y1', value: 400, label: '$400K' },
  { year: 'Y2', value: 2400, label: '$2.4M' },
  { year: 'Y3', value: 8000, label: '$8M' },
  { year: 'Y4', value: 22000, label: '$22M' },
  { year: 'Y5', value: 45000, label: '$45M' },
];

const maxVal = 45000;

function AnimatedBar({ target, delay, inView }: { target: number; delay: number; inView: boolean }) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      setHeight((target / maxVal) * 100);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, target, delay]);

  return (
    <div
      className="w-full rounded-t-md bg-gradient-to-t from-storm-blue to-flood-cyan transition-all duration-1000 ease-out"
      style={{ height: `${height}%` }}
    />
  );
}

export default function Slide09Business() {
  const chartRef = useRef(null);
  const chartInView = useInView(chartRef, { once: true, amount: 0.3 });

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
          SaaS + API + Data Intelligence
        </motion.h2>

        <div className="flex-1 flex flex-col mt-8">
          {/* Revenue streams */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {streams.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-slate-dark border border-neutral-700 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className="w-7 h-7 text-flood-cyan mb-3" strokeWidth={1.5} />
                  <h3 className="text-white font-semibold text-lg">{s.title}</h3>
                  <p className="text-neutral-400 text-sm mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                  <p className="font-mono text-flood-cyan text-sm font-bold mt-3">
                    {s.pricing}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Revenue projection chart */}
          <motion.div
            ref={chartRef}
            className="mt-8 bg-slate-dark border border-neutral-700 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Revenue Projection
            </h3>
            <div className="flex items-end gap-4 h-32">
              {projections.map((p, i) => (
                <div key={i} className="flex-1 flex flex-col items-center h-full">
                  <div className="flex-1 w-full flex items-end">
                    <AnimatedBar
                      target={p.value}
                      delay={0.2 + i * 0.15}
                      inView={chartInView}
                    />
                  </div>
                  <span className="font-mono text-flood-cyan text-xs font-bold mt-2">
                    {p.label}
                  </span>
                  <span className="text-neutral-500 text-xs mt-0.5">{p.year}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
