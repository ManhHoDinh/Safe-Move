import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import SlideLayout from './SlideLayout';

const drivers = [
  'Climate change accelerating urban flooding',
  'Smart city budgets exceeding $2.5T by 2030',
  'Government flood resilience mandates',
  'Insurance demanding real-time flood data',
  'Zero incumbents in flood-aware mobility',
];

export default function Slide08Market() {
  return (
    <SlideLayout slideNumber={8}>
      <div className="flex flex-col h-full">
        <motion.h2
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          $40B Market. Zero Solutions.
        </motion.h2>

        <div className="flex-1 flex flex-col lg:flex-row gap-12 mt-8 items-center">
          {/* Left — concentric circles */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="relative" style={{ width: 400, height: 400 }}>
              {/* TAM */}
              <motion.div
                className="absolute rounded-full border border-storm-blue/30 flex items-end justify-center"
                style={{
                  width: 400,
                  height: 400,
                  left: 0,
                  top: 0,
                  background: 'rgba(37,99,235,0.06)',
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 100 }}
                viewport={{ once: true }}
              >
                <span className="text-neutral-500 text-xs tracking-wider mb-8">
                  TAM
                </span>
              </motion.div>
              {/* TAM label */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: 20 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="font-mono font-bold text-3xl text-storm-blue/60">
                  $40B
                </span>
              </motion.div>

              {/* SAM */}
              <motion.div
                className="absolute rounded-full border border-storm-blue/40 flex items-end justify-center"
                style={{
                  width: 260,
                  height: 260,
                  left: 70,
                  top: 70,
                  background: 'rgba(37,99,235,0.12)',
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 100 }}
                viewport={{ once: true }}
              >
                <span className="text-neutral-400 text-xs tracking-wider mb-6">
                  SAM
                </span>
              </motion.div>
              {/* SAM label */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: 94 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="font-mono font-bold text-2xl text-storm-blue/80">
                  $8B
                </span>
              </motion.div>

              {/* SOM */}
              <motion.div
                className="absolute rounded-full border border-flood-cyan/60 flex items-center justify-center"
                style={{
                  width: 140,
                  height: 140,
                  left: 130,
                  top: 130,
                  background: 'rgba(6,182,212,0.15)',
                  boxShadow: '0 0 40px rgba(6,182,212,0.1)',
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8, type: 'spring', stiffness: 100 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <span className="font-mono font-bold text-4xl text-flood-cyan">
                    $400M
                  </span>
                  <br />
                  <span className="text-neutral-400 text-xs tracking-wider">
                    SOM
                  </span>
                </div>
              </motion.div>

              {/* CAGR floating badge */}
              <motion.div
                className="absolute flex items-center gap-1.5 bg-slate-dark/90 border border-safe-green/30 rounded-full px-4 py-2"
                style={{
                  bottom: 12,
                  right: -16,
                  boxShadow: '0 0 20px rgba(16,185,129,0.1)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1, type: 'spring', stiffness: 200 }}
                viewport={{ once: true }}
              >
                <TrendingUp className="w-4 h-4 text-safe-green" strokeWidth={2} />
                <span className="font-mono text-sm font-bold text-safe-green">
                  18-23% CAGR
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right — growth drivers */}
          <div className="lg:w-1/2 flex flex-col gap-5">
            <motion.h3
              className="text-lg font-semibold text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Growth Drivers
            </motion.h3>
            {drivers.map((d, i) => (
              <motion.div
                key={i}
                className="flex gap-3 items-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-flood-cyan flex-shrink-0" />
                <p className="text-neutral-300 text-base">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
