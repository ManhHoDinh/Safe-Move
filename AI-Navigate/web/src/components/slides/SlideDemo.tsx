import { motion } from 'framer-motion';
import { Play, Smartphone, Navigation } from 'lucide-react';
import SlideLayout from './SlideLayout';

export default function SlideDemo() {
  return (
    <SlideLayout background="accent">
      <div className="flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-safe-green border border-safe-green/30 rounded-full px-3 py-1">
            Live Demo
          </span>
        </motion.div>
        <motion.h2
          className="text-4xl font-bold text-white mt-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          See It In Action
        </motion.h2>

        {/* Two video panels */}
        <div className="flex-1 grid grid-cols-2 gap-5 mt-5 min-h-0">
          {/* Left — User Report */}
          <motion.div
            className="flex flex-col min-h-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-flood-cyan/15 border border-flood-cyan/25 flex items-center justify-center">
                <Smartphone className="w-3.5 h-3.5 text-flood-cyan" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Flood Reporting</p>
                <p className="text-neutral-500 text-[10px]">Citizens report floods via mobile app</p>
              </div>
            </div>
            <div
              className="flex-1 bg-deep-navy border border-neutral-700/60 rounded-xl overflow-hidden min-h-0"
              style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.3), 0 0 40px rgba(6,182,212,0.03)' }}
            >
              <video
                src="/UserReport.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            </div>
          </motion.div>

          {/* Right — Route Demo */}
          <motion.div
            className="flex flex-col min-h-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-safe-green/15 border border-safe-green/25 flex items-center justify-center">
                <Navigation className="w-3.5 h-3.5 text-safe-green" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Smart Routing</p>
                <p className="text-neutral-500 text-[10px]">AI reroutes around flood zones in real time</p>
              </div>
            </div>
            <div
              className="flex-1 bg-deep-navy border border-neutral-700/60 rounded-xl overflow-hidden min-h-0"
              style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.3), 0 0 40px rgba(16,185,129,0.03)' }}
            >
              <video
                src="/RouteDemo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-3 bg-slate-dark border border-neutral-700/50 rounded-lg px-5 py-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-1.5">
            <Play className="w-3 h-3 text-safe-green" fill="currentColor" />
            <span className="text-[10px] text-neutral-400">Auto-playing demos</span>
          </div>
          <div className="flex items-baseline gap-1.5 text-sm">
            <span className="font-mono font-bold text-flood-cyan">600+</span>
            <span className="text-neutral-400">cameras</span>
          </div>
          <div className="flex items-baseline gap-1.5 text-sm">
            <span className="font-mono font-bold text-safe-green">&lt;5s</span>
            <span className="text-neutral-400">alert time</span>
          </div>
          <div className="flex items-baseline gap-1.5 text-sm">
            <span className="font-mono font-bold text-caution-amber">~90%</span>
            <span className="text-neutral-400">accuracy</span>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
