import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function Section({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function DownArrow({ color = '#64748B' }: { color?: string }) {
  return (
    <div className="flex justify-center py-1.5">
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
        <line x1="8" y1="0" x2="8" y2="8" stroke={color} strokeWidth="1.5" />
        <polygon points="4,7 8,14 12,7" fill={color} />
      </svg>
    </div>
  );
}

function RightArrow({ color = '#64748B' }: { color?: string }) {
  return (
    <svg
      width="28"
      height="16"
      viewBox="0 0 28 16"
      fill="none"
      className="flex-shrink-0 mx-1"
    >
      <line x1="0" y1="8" x2="20" y2="8" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <polygon points="18,4 28,8 18,12" fill={color} fillOpacity="0.5" />
    </svg>
  );
}

const processingSteps = [
  { label: 'CLEAN', desc: 'Deduplication, schema validation, gap filling' },
  { label: 'NORMALIZE', desc: 'Standard units (cm, WGS84, UTC), format alignment' },
  { label: 'GEO-TAG', desc: 'Map signals to road segments via PostGIS spatial queries' },
  { label: 'TIME-ALIGN', desc: 'Merge multi-source events within 30-second windows' },
  { label: 'EVENT FUSE', desc: 'Composite flood events with confidence scoring' },
];

export default function TechProcessing() {
  return (
    <div className="space-y-16">
      <Section>
        <h1 className="text-4xl font-bold text-white">Data Processing Pipeline</h1>
        <p className="text-lg text-neutral-400 mt-3">
          Five sequential stages transform raw, noisy signals into structured flood events.
        </p>
      </Section>

      {/* Processing pipeline */}
      <Section>
        <h2 className="text-2xl font-bold text-white mb-6">Five-Stage Pipeline</h2>

        {/* Desktop: horizontal */}
        <div className="hidden lg:flex items-stretch gap-1">
          {processingSteps.map((step, i) => (
            <div key={i} className="flex items-center flex-1">
              <motion.div
                className="bg-slate-dark border border-neutral-700 rounded-lg p-4 w-full text-center h-full flex flex-col justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-bold text-flood-cyan tracking-wider uppercase">
                  {step.label}
                </span>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{step.desc}</p>
              </motion.div>
              {i < processingSteps.length - 1 && <RightArrow color="#06B6D4" />}
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden flex flex-col gap-2">
          {processingSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              viewport={{ once: true }}
            >
              {i > 0 && <DownArrow color="#06B6D4" />}
              <div className="bg-slate-dark border border-neutral-700 rounded-lg p-4">
                <span className="text-xs font-bold text-flood-cyan tracking-wider uppercase">
                  {step.label}
                </span>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Output note */}
        <motion.div
          className="mt-8 bg-safe-green/5 border border-safe-green/20 rounded-lg px-5 py-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-safe-green">
            <span className="font-semibold">Output:</span> Structured flood events with location,
            severity estimate, and confidence score.
          </p>
        </motion.div>
      </Section>

      {/* Stream vs Batch */}
      <Section>
        <h2 className="text-2xl font-bold text-white mb-6">Stream vs Batch Processing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            className="bg-deep-navy rounded-xl p-6 border border-flood-cyan/20"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-flood-cyan mb-3">Stream Processing (Apache Flink)</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-flood-cyan mt-2 flex-shrink-0" />
                Real-time event processing with sub-second latency
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-flood-cyan mt-2 flex-shrink-0" />
                30-second sliding windows for multi-source fusion
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-flood-cyan mt-2 flex-shrink-0" />
                Handles camera frames, user reports, sensor data
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-flood-cyan mt-2 flex-shrink-0" />
                Exactly-once semantics via Kafka consumer groups
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-deep-navy rounded-xl p-6 border border-caution-amber/20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-caution-amber mb-3">Batch Processing (Apache Spark)</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-caution-amber mt-2 flex-shrink-0" />
                Hourly/daily aggregation for historical analysis
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-caution-amber mt-2 flex-shrink-0" />
                Model retraining with validated ground-truth data
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-caution-amber mt-2 flex-shrink-0" />
                Data quality reports and anomaly detection
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-caution-amber mt-2 flex-shrink-0" />
                Prediction heatmap generation and calibration
              </li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Data Quality */}
      <Section>
        <h2 className="text-2xl font-bold text-white mb-6">Data Quality Scoring</h2>
        <motion.div
          className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-neutral-300 mb-4">
            Every fused flood event receives a composite confidence score based on source
            agreement, data freshness, and historical accuracy.
          </p>
          <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm text-neutral-300">
            <span className="text-xs text-neutral-500 block mb-2 font-sans font-semibold uppercase tracking-wider">
              Confidence Scoring Formula
            </span>
            <code className="text-flood-cyan">
              Score = &Sigma;(source_weight &times; source_confidence)
            </code>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[
              { source: 'Camera CV', weight: '0.35' },
              { source: 'Weather API', weight: '0.25' },
              { source: 'News/NLP', weight: '0.15' },
              { source: 'User Reports', weight: '0.25' },
            ].map((s, i) => (
              <div key={i} className="bg-slate-dark rounded-lg p-3 text-center border border-neutral-700/30">
                <p className="text-xs text-neutral-500">{s.source}</p>
                <p className="font-mono text-lg text-white font-bold mt-1">{s.weight}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Next page */}
      <div className="pt-8 border-t border-neutral-800">
        <Link
          to="/technology/flood-detection"
          className="inline-flex items-center gap-2 text-sm font-medium text-storm-blue hover:text-white transition-colors"
        >
          Next: Flood Detection & LLM <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
