import { motion } from 'framer-motion';
import { Camera, Cloud, Database, Newspaper, Users } from 'lucide-react';
import SlideLayout from './SlideLayout';

const sources = [
  {
    icon: Camera,
    name: 'Traffic Cameras',
    format: 'RTSP',
    frequency: '5s cycle',
  },
  {
    icon: Cloud,
    name: 'Weather APIs',
    format: 'REST API',
    frequency: '15min',
  },
  {
    icon: Database,
    name: 'Historical DB',
    format: 'SQL',
    frequency: 'Batch',
  },
  {
    icon: Newspaper,
    name: 'News Crawl',
    format: 'RSS / NLP',
    frequency: '5min cycle',
  },
  {
    icon: Users,
    name: 'User Reports',
    format: 'Mobile API',
    frequency: 'Real-time',
  },
];

export default function Slide15DataSources() {
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
          Data Source Layer
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Five complementary streams. 24/7 ingestion.
        </motion.p>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center mt-8">
          {/* Source cards row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {sources.map((source, i) => {
              const Icon = source.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-slate-dark border border-neutral-700 rounded-lg p-4 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-flood-cyan" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{source.name}</h3>
                  <p className="font-mono text-xs text-neutral-400 mt-2">{source.format}</p>
                  <p className="text-xs text-flood-cyan font-medium mt-1">{source.frequency}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Down arrows */}
          <motion.div
            className="flex justify-center my-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <svg width="200" height="24" viewBox="0 0 200 24" fill="none">
              {[40, 70, 100, 130, 160].map((x, i) => (
                <g key={i}>
                  <line x1={x} y1="0" x2={x} y2="16" stroke="#64748B" strokeWidth="1.5" />
                  <polygon points={`${x - 4},14 ${x},22 ${x + 4},14`} fill="#64748B" />
                </g>
              ))}
            </svg>
          </motion.div>

          {/* Kafka ingestion bus */}
          <motion.div
            className="bg-caution-amber/10 border border-caution-amber/20 rounded-lg px-6 py-4 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-caution-amber"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-caution-amber font-bold text-sm uppercase tracking-wider">
              Kafka Ingestion Bus
            </span>
            <motion.div
              className="w-2 h-2 rounded-full bg-caution-amber"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
