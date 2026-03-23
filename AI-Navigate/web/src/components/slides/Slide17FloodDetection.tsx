import { motion } from 'framer-motion';
import { Camera, Cloud, Newspaper, Users, ExternalLink, FileText } from 'lucide-react';
import SlideLayout from './SlideLayout';

const detectionSources = [
  { icon: Camera, label: 'Camera' },
  { icon: Cloud, label: 'Weather' },
  { icon: Newspaper, label: 'News' },
  { icon: Users, label: 'User' },
];

const lifecycleStates = [
  { label: 'Detected', color: '#F59E0B' },
  { label: 'Confirmed', color: '#EF4444' },
  { label: 'Monitored', color: '#2563EB' },
  { label: 'Resolved', color: '#10B981' },
];

export default function Slide17FloodDetection() {
  return (
    <SlideLayout>
      <div className="flex flex-col h-full">
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Flood Intelligence
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Multi-source detection meets LLM reasoning.
        </motion.p>

        {/* Split layout */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 mt-8">
          {/* Left — Detection flow */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            {/* Source icons converging */}
            <div className="relative">
              <div className="flex justify-between mb-2 px-4">
                {detectionSources.map((source, i) => {
                  const Icon = source.icon;
                  return (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: -15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-flood-cyan" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs text-neutral-500 mt-1">{source.label}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Converging arrows */}
              <motion.div
                className="flex justify-center my-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <svg width="240" height="30" viewBox="0 0 240 30" fill="none">
                  <line x1="30" y1="0" x2="120" y2="26" stroke="#64748B" strokeWidth="1.5" />
                  <line x1="85" y1="0" x2="120" y2="26" stroke="#64748B" strokeWidth="1.5" />
                  <line x1="155" y1="0" x2="120" y2="26" stroke="#64748B" strokeWidth="1.5" />
                  <line x1="210" y1="0" x2="120" y2="26" stroke="#64748B" strokeWidth="1.5" />
                  <polygon points="116,24 120,30 124,24" fill="#64748B" />
                </svg>
              </motion.div>

              {/* Detection engine box */}
              <motion.div
                className="bg-storm-blue/10 border border-storm-blue/30 rounded-lg px-4 py-3 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-bold text-storm-blue uppercase tracking-wider">
                  Detection Engine
                </span>
              </motion.div>
            </div>

            {/* Lifecycle state machine */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Flood Lifecycle
              </span>
              <div className="flex items-center justify-between mt-3 px-2">
                {lifecycleStates.map((state, i) => (
                  <div key={i} className="flex items-center">
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 1.0 + i * 0.12,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      viewport={{ once: true }}
                    >
                      <div
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                        style={{
                          borderColor: state.color,
                          backgroundColor: `${state.color}20`,
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: state.color }}
                        />
                      </div>
                      <span
                        className="text-xs font-medium mt-1.5"
                        style={{ color: state.color }}
                      >
                        {state.label}
                      </span>
                    </motion.div>

                    {/* Arrow */}
                    {i < lifecycleStates.length - 1 && (
                      <motion.svg
                        width="30"
                        height="12"
                        viewBox="0 0 30 12"
                        fill="none"
                        className="mx-1 mt-[-12px]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <line x1="0" y1="6" x2="22" y2="6" stroke="#64748B" strokeWidth="1.5" />
                        <polygon points="20,2 30,6 20,10" fill="#64748B" />
                      </motion.svg>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — LLM evaluation card */}
          <div className="lg:w-1/2 flex flex-col justify-center gap-4">
            <motion.h3
              className="text-xs font-semibold text-neutral-500 uppercase tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              LLM Evaluation
            </motion.h3>

            {/* Input panel */}
            <motion.div
              className="bg-slate-dark rounded-lg p-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                Input Signals
              </span>
              <div className="mt-2 space-y-1.5">
                <p className="text-sm text-neutral-300 leading-relaxed">
                  <span className="text-flood-cyan font-medium">Camera:</span> water visible on road
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  <span className="text-flood-cyan font-medium">Weather:</span> 85mm / 2hrs
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  <span className="text-flood-cyan font-medium">News:</span> District 7 flooding
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  <span className="text-flood-cyan font-medium">User:</span> knee-deep on Nguyen Hue
                </p>
              </div>
            </motion.div>

            {/* Arrow down */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <line x1="8" y1="0" x2="8" y2="14" stroke="#2563EB" strokeWidth="1.5" />
                <polygon points="4,12 8,20 12,12" fill="#2563EB" />
              </svg>
            </motion.div>

            {/* LLM reasoning box */}
            <motion.div
              className="bg-storm-blue/10 border border-storm-blue/30 rounded-lg px-4 py-3 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-bold text-storm-blue uppercase tracking-wider">
                LLM Reasoning
              </span>
            </motion.div>

            {/* Arrow down */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <line x1="8" y1="0" x2="8" y2="14" stroke="#2563EB" strokeWidth="1.5" />
                <polygon points="4,12 8,20 12,12" fill="#2563EB" />
              </svg>
            </motion.div>

            {/* Output panel */}
            <motion.div
              className="bg-slate-dark border border-flood-cyan/20 rounded-lg p-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              viewport={{ once: true }}
            >
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                Output Assessment
              </span>
              <p className="font-mono text-flood-cyan text-sm font-bold mt-2 leading-relaxed">
                Level 3/5 | 35cm depth | Impassable for sedans | 91% confidence
              </p>
            </motion.div>
          </div>
        </div>

        {/* Published Research Banner */}
        <motion.div
          className="mt-6 bg-safe-green/5 border border-safe-green/20 rounded-xl p-4"
          style={{ boxShadow: '0 0 30px rgba(16,185,129,0.06)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-safe-green/15 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-safe-green" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-safe-green uppercase tracking-wider mb-1">
                Published Research — IEEE ICCAIS 2024
              </p>
              <p className="text-sm text-neutral-300 leading-relaxed">
                <span className="text-white font-medium">"UIT-VisDrone-Flood"</span> — 7,411 synthetic flood images generated via ClimateGAN + SAM for CNN-based flood detection with ~90% accuracy.
              </p>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="https://ieeexplore.ieee.org/document/10814214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-flood-cyan hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> IEEE Xplore
                </a>
                <a
                  href="https://universe.roboflow.com/uit-2pejh/uit-flooded-visdrone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-flood-cyan hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> Dataset
                </a>
                <a
                  href="https://huggingface.co/spaces/ManhHoDinh/floodTrafficSolution"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-flood-cyan hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> Live Demo
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
