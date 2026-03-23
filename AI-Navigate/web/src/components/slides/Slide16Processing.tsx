import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

const stages = [
  { label: 'DEDUP', tech: 'Kafka dedup', detail: 'Drop duplicate events from overlapping sources' },
  { label: 'NORMALIZE', tech: 'Schema align', detail: 'cm · WGS84 · UTC · JSON' },
  { label: 'GEO-TAG', tech: 'PostGIS', detail: 'Map every signal to road segments' },
  { label: 'TIME-ALIGN', tech: '30s windows', detail: 'Merge multi-source events' },
  { label: 'FUSE', tech: 'Confidence scoring', detail: 'Composite flood event + score' },
];

const tradeoffs = [
  {
    question: 'Stream or Batch?',
    answer: 'Both. Camera + user reports stream via Flink (< 5s). Historical analysis batches via Spark (hourly).',
    color: 'text-flood-cyan',
  },
  {
    question: 'Why 30s fusion window?',
    answer: 'Camera and weather detect same flood 10-20s apart. Too short → duplicate points. Too long → delayed alerts.',
    color: 'text-caution-amber',
  },
  {
    question: 'Why geo-tag to road segments?',
    answer: 'Routing penalties must apply to specific road segments, not circular areas. Costs 50ms per event. Worth it.',
    color: 'text-safe-green',
  },
];

export default function Slide16Processing() {
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
          Raw Signals → Clean Events
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Every event gets a location, severity estimate, and confidence score.
        </motion.p>

        <div className="flex-1 flex flex-col justify-center mt-6 gap-6">
          {/* Pipeline Row */}
          <motion.div
            className="bg-deep-navy rounded-xl border border-neutral-700/50 p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Input label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full bg-danger-red/50"
                    style={{ width: 3 + Math.random() * 3, height: 3 + Math.random() * 3, marginTop: Math.sin(i) * 4 }}
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-500">Camera RTSP · Weather JSON · News text · User GPS</span>
            </div>

            {/* 5 stage boxes */}
            <div className="flex items-stretch gap-1.5 lg:gap-2">
              {stages.map((stage, i) => (
                <div key={stage.label} className="flex items-center flex-1">
                  <motion.div
                    className="w-full bg-slate-dark border border-neutral-700 rounded-lg px-2 py-3 lg:px-4 lg:py-4"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-[10px] lg:text-xs font-bold text-flood-cyan tracking-wider uppercase">{stage.label}</div>
                    <div className="text-[9px] lg:text-[10px] font-mono text-neutral-500 mt-1">{stage.tech}</div>
                    <div className="text-[9px] lg:text-xs text-neutral-400 mt-1.5 leading-tight">{stage.detail}</div>
                  </motion.div>
                  {i < stages.length - 1 && (
                    <svg width="20" height="12" viewBox="0 0 20 12" className="flex-shrink-0 mx-0.5 text-flood-cyan/40">
                      <line x1="0" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5" />
                      <polygon points="13,2 20,6 13,10" fill="currentColor" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            {/* Output label */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-safe-green/70" />
                ))}
              </div>
              <span className="text-xs text-neutral-500">Structured flood events with confidence scores</span>
            </div>
          </motion.div>

          {/* Trade-off Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {tradeoffs.map((t, i) => (
              <motion.div
                key={t.question}
                className="bg-caution-amber/5 border border-caution-amber/15 rounded-lg p-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] text-caution-amber font-bold uppercase tracking-wider">Trade-off</span>
                </div>
                <p className={`text-xs font-semibold ${t.color} mb-1`}>{t.question}</p>
                <p className="text-[11px] text-neutral-400 leading-relaxed">{t.answer}</p>
              </motion.div>
            ))}
          </div>

          {/* Tech stack bar */}
          <motion.div
            className="flex items-center justify-center gap-6 text-neutral-500 text-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-flood-cyan/50" />
              Stream: Apache Flink
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-storm-blue/50" />
              Batch: Apache Spark
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-safe-green/50" />
              Geo: PostGIS
            </span>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
