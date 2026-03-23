import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

const DOTS = [
  { top: '12%', left: '8%',  size: 'w-3 h-3',  delay: 0.2, color: 'bg-flood-cyan/40',     glow: 'rgba(6,182,212,0.35)' },
  { top: '70%', left: '5%',  size: 'w-2 h-2',  delay: 0.5, color: 'bg-storm-blue/50',     glow: 'rgba(37,99,235,0.3)'  },
  { top: '20%', right: '9%', size: 'w-4 h-4',  delay: 0.35,color: 'bg-flood-cyan/30',     glow: 'rgba(6,182,212,0.3)'  },
  { top: '75%', right: '7%', size: 'w-2 h-2',  delay: 0.6, color: 'bg-safe-green/40',     glow: 'rgba(16,185,129,0.3)' },
  { top: '45%', left: '3%',  size: 'w-2.5 h-2.5', delay: 0.45, color: 'bg-caution-amber/30', glow: 'rgba(245,158,11,0.25)' },
] as const;

export default function SlideThankYou() {
  return (
    <SlideLayout background="accent" className="items-center justify-center text-center">
      {/* Floating pulsing dots */}
      {DOTS.map((dot, i) => {
        const { top, left, right, size, delay, color, glow } = dot as typeof dot & { left?: string; right?: string };
        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ top, ...(left ? { left } : {}), ...(right ? { right } : {}) }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
          >
            <motion.div
              className={`${size} rounded-full ${color}`}
              style={{ boxShadow: `0 0 16px ${glow}` }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
                boxShadow: [
                  `0 0 10px ${glow}`,
                  `0 0 24px ${glow}`,
                  `0 0 10px ${glow}`,
                ],
              }}
              transition={{
                duration: 2.4 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          </motion.div>
        );
      })}

      {/* Main content stack */}
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        {/* Large heading */}
        <motion.h1
          className="text-8xl lg:text-9xl font-bold tracking-tight leading-none"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <span className="text-white">Thank </span>
          <span
            className="text-flood-cyan"
            style={{
              textShadow:
                '0 0 40px rgba(6,182,212,0.5), 0 0 80px rgba(6,182,212,0.2), 0 0 120px rgba(6,182,212,0.1)',
            }}
          >
            You
          </span>
        </motion.h1>

        {/* Gradient divider */}
        <motion.div
          className="h-px w-16 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          viewport={{ once: true }}
        />

        {/* Domain */}
        <motion.p
          className="font-mono text-flood-cyan text-xl tracking-widest"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          safemove.skylabs.vn
        </motion.p>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <img
            src="/EnvRouteQR.png"
            alt="SafeMove QR Code"
            className="w-24 h-24 rounded-lg border border-neutral-700/50"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
          />
        </motion.div>

        {/* Author + event */}
        <motion.div
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <span className="text-white text-lg font-semibold tracking-wide">
            Ho Dinh Manh
          </span>
          <span className="text-neutral-500 text-sm font-light tracking-wider">
            Graduation Thesis — UIT VNU-HCM
          </span>
          <span className="text-safe-green text-xs font-semibold tracking-wider mt-0.5">
            9.9/10 · Published at IEEE ICCAIS 2024
          </span>
        </motion.div>

        {/* Closing tagline */}
        <motion.p
          className="text-base lg:text-lg mt-4 tracking-wide"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <span className="text-white font-bold">Floods are inevitable. </span>
          <span className="text-neutral-500 font-bold">Traffic chaos is not.</span>
        </motion.p>
      </div>
    </SlideLayout>
  );
}
