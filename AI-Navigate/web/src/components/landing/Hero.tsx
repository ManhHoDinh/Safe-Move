import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-abyss"
    >
      {/* Animated grid background */}
      <div className="pointer-events-none absolute inset-0">
        {/* CSS grid lines simulating a city map */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(37,99,235,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Animated dots at grid intersections */}
        {[
          { x: '15%', y: '20%', delay: 0 },
          { x: '72%', y: '35%', delay: 1.2 },
          { x: '40%', y: '70%', delay: 0.6 },
          { x: '85%', y: '60%', delay: 1.8 },
          { x: '25%', y: '85%', delay: 0.9 },
          { x: '60%', y: '15%', delay: 1.5 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-storm-blue"
            style={{ left: dot.x, top: dot.y }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: dot.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Flood zone pulsing circles */}
        {[
          { x: '65%', y: '55%', size: 120, color: 'rgba(239,68,68,0.15)' },
          { x: '30%', y: '40%', size: 90, color: 'rgba(245,158,11,0.12)' },
          { x: '78%', y: '25%', size: 70, color: 'rgba(239,68,68,0.1)' },
        ].map((zone, i) => (
          <motion.div
            key={`flood-${i}`}
            className="absolute rounded-full"
            style={{
              left: zone.x,
              top: zone.y,
              width: zone.size,
              height: zone.size,
              background: `radial-gradient(circle, ${zone.color} 0%, transparent 70%)`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.3, 0.6] }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
          />
        ))}

        {/* Animated safe route SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Danger route (gray dashed) */}
          <path
            d="M 200 600 Q 400 500 500 400 Q 600 300 750 350"
            fill="none"
            stroke="rgba(148,163,184,0.15)"
            strokeWidth="2"
            strokeDasharray="8 6"
          />
          {/* Safe route (green animated) */}
          <motion.path
            d="M 200 600 Q 350 550 400 480 Q 450 410 520 450 Q 600 500 700 430 Q 800 360 900 300"
            fill="none"
            stroke="rgba(16,185,129,0.4)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="1000"
            initial={{ strokeDashoffset: 1000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 3, ease: 'easeInOut', delay: 1 }}
          />
          {/* Green route glow */}
          <motion.path
            d="M 200 600 Q 350 550 400 480 Q 450 410 520 450 Q 600 500 700 430 Q 800 360 900 300"
            fill="none"
            stroke="rgba(16,185,129,0.12)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="1000"
            initial={{ strokeDashoffset: 1000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 3, ease: 'easeInOut', delay: 1 }}
          />
        </svg>

        {/* Radial gradient overlay for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(10,14,26,0.7) 70%, rgba(10,14,26,0.95) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-safe-green animate-pulse" />
          <span className="text-sm text-neutral-300 font-medium">
            AI-Powered Flood Intelligence
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto"
        >
          Every Flood Kills a Route.{' '}
          <span className="text-storm-blue">We Find the One That Survives.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed"
        >
          SafeMove AI connects camera feeds, weather systems, historical records, and
          live news into a single intelligence layer — detecting urban flooding in real
          time and rerouting traffic before the first car hits standing water.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#cta"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-storm-blue rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Request Early Access
          </a>
          <a
            href="#demo"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border border-white/20 rounded-lg bg-transparent transition-all duration-300 hover:bg-white/5 hover:border-white/30"
          >
            Watch Demo
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-abyss to-transparent" />
    </section>
  );
}
