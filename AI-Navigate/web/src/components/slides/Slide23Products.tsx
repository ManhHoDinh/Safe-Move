import { motion } from 'framer-motion';
import { Smartphone, Monitor, Landmark, Code } from 'lucide-react';
import SlideLayout from './SlideLayout';

const products = [
  {
    icon: Smartphone,
    title: 'Driver App',
    borderColor: 'border-t-safe-green',
    iconColor: 'text-safe-green',
    desc: 'Real-time alerts, flood-aware navigation, report flooding',
  },
  {
    icon: Monitor,
    title: 'Operator Dashboard',
    borderColor: 'border-t-storm-blue',
    iconColor: 'text-storm-blue',
    desc: 'Command center, live map, alert management, regulation controls',
  },
  {
    icon: Landmark,
    title: 'Government Portal',
    borderColor: 'border-t-caution-amber',
    iconColor: 'text-caution-amber',
    desc: 'Long-term analytics, infrastructure planning, resilience scoring',
  },
  {
    icon: Code,
    title: 'Developer API',
    borderColor: 'border-t-flood-cyan',
    iconColor: 'text-flood-cyan',
    desc: 'REST + WebSocket + GraphQL for logistics, insurance, ride-hailing',
  },
];

export default function Slide23Products() {
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
          Four Products. One Platform.
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Purpose-built interfaces for every user type.
        </motion.p>

        <div className="flex-1 flex items-center mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {products.map((product, i) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={i}
                  className={`bg-slate-dark border border-neutral-700 ${product.borderColor} border-t-4 rounded-xl p-6`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`w-6 h-6 ${product.iconColor}`} strokeWidth={1.5} />
                    <h3 className="text-white font-bold text-lg uppercase tracking-wide">
                      {product.title}
                    </h3>
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {product.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
