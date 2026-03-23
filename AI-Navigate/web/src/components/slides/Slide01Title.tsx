import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

export default function Slide01Title() {
  return (
    <SlideLayout background="accent" className="items-center justify-center text-center" slideNumber={1}>
      {/* Animated background grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-storm-blue/[0.04]"
            style={{ left: `${(i + 1) * (100 / 13)}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: i * 0.05, ease: 'easeOut' }}
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-storm-blue/[0.04]"
            style={{ top: `${(i + 1) * (100 / 8)}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Floating abstract geometric elements */}
      {/* Blue pulse — flood zone */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '18%', left: '12%' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
      >
        <motion.div
          className="w-20 h-20 rounded-full border border-flood-cyan/30"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
            boxShadow: '0 0 40px rgba(6,182,212,0.1)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Green line — safe route */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ bottom: '22%', right: '10%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
          <motion.path
            d="M0 50 Q30 10 60 30 Q90 50 120 10"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2, delay: 1.6, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      {/* Amber dot — warning */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '28%', right: '18%' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.8, ease: 'easeOut' }}
      >
        <motion.div
          className="w-3 h-3 rounded-full bg-caution-amber"
          style={{ boxShadow: '0 0 20px rgba(245,158,11,0.4)' }}
          animate={{
            opacity: [0.5, 1, 0.5],
            boxShadow: [
              '0 0 12px rgba(245,158,11,0.3)',
              '0 0 24px rgba(245,158,11,0.5)',
              '0 0 12px rgba(245,158,11,0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-7xl lg:text-8xl font-bold text-white tracking-tight"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        SafeMove{' '}
        <span
          className="text-flood-cyan"
          style={{
            textShadow: '0 0 40px rgba(6,182,212,0.4), 0 0 80px rgba(6,182,212,0.15)',
          }}
        >
          AI
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg text-neutral-500 mt-5 font-light tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        Flood-Aware Mobility Intelligence for Smart Cities
      </motion.p>

      {/* Tagline */}
      <motion.div
        className="mt-auto pb-4 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <p className="font-mono text-sm text-neutral-600 tracking-[0.3em] uppercase">
          Detect{' '}
          <span className="text-flood-cyan/50">&middot;</span>{' '}
          Evaluate{' '}
          <span className="text-flood-cyan/50">&middot;</span>{' '}
          Route{' '}
          <span className="text-flood-cyan/50">&middot;</span>{' '}
          Learn
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-neutral-500 font-medium tracking-wide">Graduation Thesis — UIT VNU-HCM</span>
          <span className="text-neutral-700">|</span>
          <span className="text-xs text-safe-green font-semibold tracking-wide">9.9/10 · IEEE ICCAIS 2024</span>
        </div>
      </motion.div>
    </SlideLayout>
  );
}
