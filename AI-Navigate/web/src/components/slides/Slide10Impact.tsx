import { motion } from 'framer-motion';
import { Users, Landmark, Briefcase, Leaf } from 'lucide-react';
import SlideLayout from './SlideLayout';

const quadrants = [
  {
    icon: Users,
    stakeholder: 'Citizens',
    metrics: ['23% commute reduction', '0 flood fatalities'],
    color: '#06B6D4', // flood-cyan
  },
  {
    icon: Landmark,
    stakeholder: 'Government',
    metrics: ['40% faster emergency response', '60% fewer road closures'],
    color: '#2563EB', // storm-blue
  },
  {
    icon: Briefcase,
    stakeholder: 'Enterprise',
    metrics: ['68% fewer fleet delays', '$2.3M saved per city annually'],
    color: '#10B981', // safe-green
  },
  {
    icon: Leaf,
    stakeholder: 'Planet',
    metrics: ['31% less vehicle-hours wasted', '18% reduction in idle emissions'],
    color: '#F59E0B', // caution-amber
  },
];

export default function Slide10Impact() {
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
          Saving Lives. Saving Time. Saving Cities.
        </motion.h2>

        <div className="flex-1 flex items-center justify-center mt-8">
          <div className="relative w-full max-w-4xl">
            {/* Quadrants grid */}
            <div className="grid grid-cols-2 gap-6">
              {quadrants.map((q, i) => {
                const Icon = q.icon;
                return (
                  <motion.div
                    key={i}
                    className="bg-slate-dark border border-neutral-700 rounded-lg p-6 relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${q.color}15` }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: q.color }}
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="text-white font-semibold text-lg">
                        {q.stakeholder}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {q.metrics.map((m, j) => (
                        <p key={j} className="font-mono text-sm text-flood-cyan font-bold">
                          {m}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Center connector */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8, type: 'spring' }}
              viewport={{ once: true }}
            >
              <div className="bg-abyss border border-neutral-600 rounded-full w-28 h-28 flex items-center justify-center shadow-xl shadow-storm-blue/10">
                <div className="text-center">
                  <p className="text-white font-bold text-sm leading-tight">SafeMove</p>
                  <p className="text-flood-cyan font-bold text-xs">AI</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
