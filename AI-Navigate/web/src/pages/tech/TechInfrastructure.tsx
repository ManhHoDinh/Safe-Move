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

const infraLayers = [
  {
    name: 'Clients',
    tech: 'React SPA  --  React Native Mobile  --  API Consumers  --  WebSocket Subscribers',
    bg: 'bg-neutral-800',
    border: 'border-neutral-700',
    text: 'text-neutral-300',
  },
  {
    name: 'API Gateway',
    tech: 'NGINX / Kong  --  Rate Limiting  --  JWT Auth  --  SSL Termination',
    bg: 'bg-storm-blue/10',
    border: 'border-storm-blue/20',
    text: 'text-storm-blue',
  },
  {
    name: 'Application Services',
    tech: 'Auth  --  Routing  --  Detection  --  Prediction  --  Agents  --  LLM Proxy',
    bg: 'bg-flood-cyan/10',
    border: 'border-flood-cyan/20',
    text: 'text-flood-cyan',
  },
  {
    name: 'Processing',
    tech: 'Kafka Streams  --  Apache Spark (batch)  --  Apache Flink (real-time)  --  Celery Workers',
    bg: 'bg-caution-amber/10',
    border: 'border-caution-amber/20',
    text: 'text-caution-amber',
  },
  {
    name: 'Storage',
    tech: 'Redis (hot cache)  --  TimescaleDB (warm time-series)  --  PostgreSQL (relational)  --  S3 (cold archive)',
    bg: 'bg-safe-green/10',
    border: 'border-safe-green/20',
    text: 'text-safe-green',
  },
  {
    name: 'Observability',
    tech: 'Prometheus  --  Grafana  --  Sentry  --  OpenTelemetry  --  PagerDuty',
    bg: 'bg-danger-red/10',
    border: 'border-danger-red/20',
    text: 'text-danger-red',
  },
];

export default function TechInfrastructure() {
  return (
    <div className="space-y-16">
      <Section>
        <h1 className="text-4xl font-bold text-white">Infrastructure & Deployment</h1>
        <p className="text-lg text-neutral-400 mt-3">
          Cloud-native, containerized, and auto-scaling for real-time workloads.
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Infrastructure stack */}
          <div className="lg:col-span-2 flex flex-col">
            {infraLayers.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                viewport={{ once: true }}
              >
                {i > 0 && (
                  <div className="flex justify-center py-1">
                    <span className="text-neutral-600 text-sm">&#9660;</span>
                  </div>
                )}
                <div
                  className={`${layer.bg} border ${layer.border} rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2`}
                >
                  <span className={`text-sm font-bold uppercase tracking-wider ${layer.text}`}>
                    {layer.name}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">{layer.tech}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Key numbers and K8s */}
          <div className="flex flex-col gap-5 justify-center">
            <motion.div
              className="border border-neutral-600 border-dashed rounded-xl p-5 flex flex-col items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <svg viewBox="0 0 48 48" className="w-12 h-12">
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(6,182,212,0.25)" strokeWidth="1.5" />
                <circle cx="24" cy="24" r="6" fill="none" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" />
                {Array.from({ length: 7 }).map((_, i) => {
                  const angle = (i * 2 * Math.PI) / 7 - Math.PI / 2;
                  const x1 = 24 + 8 * Math.cos(angle);
                  const y1 = 24 + 8 * Math.sin(angle);
                  const x2 = 24 + 18 * Math.cos(angle);
                  const y2 = 24 + 18 * Math.sin(angle);
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(6,182,212,0.35)" strokeWidth="1.5" />
                  );
                })}
              </svg>
              <span className="text-sm text-neutral-300 font-semibold tracking-wider uppercase">
                Kubernetes
              </span>
              <div className="flex flex-col gap-1.5">
                {['Auto-scaling', 'Self-healing', 'Rolling deploys'].map((feat, i) => (
                  <span key={i} className="text-xs text-neutral-500 text-center">{feat}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {[
                { value: '100K+', label: 'events/sec' },
                { value: '< 30s', label: 'end-to-end' },
                { value: '99.9%', label: 'uptime SLA' },
                { value: 'Auto', label: 'scale/city' },
              ].map((stat, i) => (
                <div key={i} className="bg-deep-navy border border-neutral-700/50 rounded-lg p-3 text-center">
                  <p className="font-mono text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Next page */}
      <div className="pt-8 border-t border-neutral-800">
        <Link
          to="/technology/api"
          className="inline-flex items-center gap-2 text-sm font-medium text-storm-blue hover:text-white transition-colors"
        >
          Next: API Reference <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
