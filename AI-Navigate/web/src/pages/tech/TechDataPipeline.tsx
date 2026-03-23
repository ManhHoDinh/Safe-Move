import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Camera,
  Cloud,
  Database,
  Newspaper,
  Users,
  ArrowRight,
} from 'lucide-react';

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

const dataSources = [
  {
    icon: Camera,
    name: 'Traffic Cameras',
    specs: 'RTSP/MJPEG -- 5s frame cycle -- CV flood detection -- ~1K fps',
    details: [
      { label: 'Format', value: 'RTSP / MJPEG streams' },
      { label: 'Frequency', value: 'Every 5 seconds' },
      { label: 'Volume', value: '~1,000 frames/sec across city' },
      { label: 'Reliability', value: '95% uptime (network-dependent)' },
    ],
  },
  {
    icon: Cloud,
    name: 'Weather APIs',
    specs: 'Google Weather + OWM -- 15-min polling -- Rainfall + forecast',
    details: [
      { label: 'Format', value: 'JSON REST API' },
      { label: 'Frequency', value: '15-minute polling cycle' },
      { label: 'Volume', value: '~100 requests/hour per city' },
      { label: 'Reliability', value: '99.9% (multi-provider fallback)' },
    ],
  },
  {
    icon: Database,
    name: 'Historical DB',
    specs: 'PostgreSQL/TimescaleDB -- 10+ years -- Flood records + drainage maps',
    details: [
      { label: 'Format', value: 'PostgreSQL / TimescaleDB' },
      { label: 'Frequency', value: 'Batch (daily updates)' },
      { label: 'Volume', value: '10+ years of flood records' },
      { label: 'Reliability', value: '99.99% (replicated storage)' },
    ],
  },
  {
    icon: Newspaper,
    name: 'News Crawl',
    specs: 'RSS + NLP scraping -- 5-min cycle -- 50+ sources -- Sentiment scoring',
    details: [
      { label: 'Format', value: 'RSS / HTML scraping + NLP' },
      { label: 'Frequency', value: 'Every 5 minutes' },
      { label: 'Volume', value: '50+ news sources monitored' },
      { label: 'Reliability', value: '90% (source availability varies)' },
    ],
  },
  {
    icon: Users,
    name: 'User Reports',
    specs: 'Mobile API -- Real-time -- Photo uploads -- Severity ratings',
    details: [
      { label: 'Format', value: 'Mobile API (REST + image upload)' },
      { label: 'Frequency', value: 'Real-time, event-driven' },
      { label: 'Volume', value: 'Scales with user base' },
      { label: 'Reliability', value: 'Variable (user-generated)' },
    ],
  },
];

export default function TechDataPipeline() {
  return (
    <div className="space-y-16">
      <Section>
        <h1 className="text-4xl font-bold text-white">Data Pipeline</h1>
        <p className="text-lg text-neutral-400 mt-3">
          Five data sources. Real-time + batch processing. Event-level fusion.
        </p>
      </Section>

      {/* Source cards grid */}
      <Section>
        <h2 className="text-2xl font-bold text-white mb-6">Data Sources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataSources.map((source, i) => {
            const Icon = source.icon;
            return (
              <motion.div
                key={i}
                className="bg-deep-navy border border-neutral-700/50 rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-flood-cyan" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{source.name}</h3>
                </div>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed mb-4">
                  {source.specs.split(' -- ').map((spec, j) => (
                    <span key={j}>
                      {j > 0 && <span className="text-flood-cyan/40"> | </span>}
                      {spec}
                    </span>
                  ))}
                </p>
                <div className="space-y-2 border-t border-neutral-700/30 pt-3">
                  {source.details.map((d, j) => (
                    <div key={j} className="flex justify-between text-xs">
                      <span className="text-neutral-500">{d.label}</span>
                      <span className="text-neutral-300 text-right">{d.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Kafka ingestion bus */}
      <Section>
        <h2 className="text-2xl font-bold text-white mb-6">Ingestion Bus</h2>
        <motion.div
          className="bg-caution-amber/10 border border-caution-amber/20 rounded-lg px-6 py-4 flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-caution-amber flex-shrink-0"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-caution-amber font-bold text-sm uppercase tracking-wider">
            Kafka Ingestion Bus
          </span>
          <RightArrow color="#F59E0B" />
          <span className="text-flood-cyan font-bold text-sm uppercase tracking-wider">
            Flink Stream Processing
          </span>
          <RightArrow color="#06B6D4" />
          <span className="text-safe-green font-bold text-sm uppercase tracking-wider">
            Clean Event Store
          </span>
          <motion.div
            className="w-2 h-2 rounded-full bg-safe-green flex-shrink-0"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </motion.div>

        <p className="text-sm text-neutral-400 mt-6 leading-relaxed">
          All five data sources feed into a unified Apache Kafka ingestion bus. Events are
          partitioned by geographic region, enabling parallel processing across cities. The
          bus handles 100K+ events per second with guaranteed delivery and replay capability.
        </p>
      </Section>

      {/* Next page */}
      <div className="pt-8 border-t border-neutral-800">
        <Link
          to="/technology/processing"
          className="inline-flex items-center gap-2 text-sm font-medium text-storm-blue hover:text-white transition-colors"
        >
          Next: Data Processing <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
