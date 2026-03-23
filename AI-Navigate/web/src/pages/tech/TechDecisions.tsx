import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Scale, ArrowRight } from 'lucide-react';

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

const decisions = [
  {
    title: 'FastAPI over Django / Express',
    decision: 'Python FastAPI for all backend services.',
    alternatives: ['Django REST Framework', 'Node.js / Express', 'Go / Gin'],
    tradeoff:
      'Python ecosystem (ML libraries) vs raw throughput. FastAPI is 3-5x slower than Go for pure API calls.',
    why: 'ML models are in Python. Same language for API + inference eliminates serialization overhead. Async support handles 10K+ concurrent WebSocket connections.',
  },
  {
    title: 'TimescaleDB over InfluxDB / Cassandra',
    decision: 'TimescaleDB for time-series flood / traffic data.',
    alternatives: ['InfluxDB', 'Apache Cassandra', 'Plain PostgreSQL with partitioning'],
    tradeoff:
      'SQL compatibility vs write throughput. InfluxDB writes 2x faster but lacks spatial queries.',
    why: 'PostGIS extension gives spatial queries on the same database. One storage layer for both time-series AND geospatial. Hypertable compression reduces storage 90%.',
  },
  {
    title: 'PyTorch + ONNX over TensorFlow Serving',
    decision: 'Train in PyTorch, serve via ONNX Runtime.',
    alternatives: ['TensorFlow + TF Serving', 'JAX', 'Plain PyTorch serving with TorchServe'],
    tradeoff:
      'Two-tool pipeline vs single-framework. ONNX conversion adds build complexity.',
    why: 'PyTorch for faster research iteration. ONNX Runtime for 3-5x inference speedup. GPU + CPU serving from same model artifact. Team expertise is PyTorch-native.',
  },
  {
    title: 'Kafka over RabbitMQ / Redis Streams',
    decision: 'Apache Kafka for all event streaming.',
    alternatives: ['RabbitMQ', 'Redis Streams', 'AWS Kinesis', 'Apache Pulsar'],
    tradeoff:
      'Operational complexity vs durability. Kafka requires ZooKeeper / KRaft. Higher memory footprint.',
    why: "Event replay capability is critical -- when a new prediction model deploys, we reprocess the last 24 hours of events. Kafka's log-based storage enables this. RabbitMQ can't replay. 100K+ events/second throughput.",
  },
  {
    title: 'LLM API (Claude / GPT) over Self-hosted LLM',
    decision: 'External LLM API with local rule-based fallback.',
    alternatives: ['Self-hosted Llama 3 (70B)', 'Fine-tuned smaller model only', 'No LLM -- rules-only approach'],
    tradeoff:
      'Latency + cost vs capability. API calls add 500-2000ms. $0.01-0.03 per severity assessment.',
    why: 'Reasoning quality for flood severity is critical -- lives depend on it. Self-hosted 8B models hallucinate 3x more on domain-specific tasks. API cost is $300-500/month at scale, trivial vs value. Rule-based fallback for when API is down.',
  },
  {
    title: 'Google Maps API over OSRM / Valhalla',
    decision: 'Google Maps Directions API for routing base.',
    alternatives: ['Self-hosted OSRM', 'Valhalla', 'Mapbox Directions API'],
    tradeoff:
      'Per-request cost ($0.005-0.01) vs real-time traffic data. Self-hosted is free but has no live traffic.',
    why: "Google's real-time traffic data is irreplaceable -- no open-source alternative has live traffic. We add flood intelligence as a penalty layer on top. At 50K routes/day, cost is ~$250-500/month.",
  },
];

export default function TechDecisions() {
  return (
    <div className="space-y-16">
      <Section>
        <h1 className="text-4xl font-bold text-white">Architecture Decision Records</h1>
        <p className="text-lg text-neutral-400 mt-3">
          Key decisions, alternatives considered, and why we chose what we chose.
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {decisions.map((d, i) => (
            <motion.div
              key={i}
              className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 * i }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-3 mb-4">
                <Scale size={18} className="text-storm-blue mt-0.5 flex-shrink-0" />
                <h3 className="text-lg font-bold text-white">{d.title}</h3>
              </div>

              <p className="text-sm text-neutral-200 mb-3">
                <span className="text-neutral-500 font-semibold text-xs uppercase tracking-wider">Decision: </span>
                {d.decision}
              </p>

              <div className="mb-3">
                <span className="text-neutral-500 font-semibold text-xs uppercase tracking-wider">
                  Alternatives Considered:
                </span>
                <ul className="mt-1.5 space-y-1">
                  {d.alternatives.map((alt, j) => (
                    <li key={j} className="text-sm text-neutral-400 flex items-start gap-2">
                      <span className="text-neutral-600 mt-1.5 block w-1.5 h-1.5 rounded-full bg-neutral-600 flex-shrink-0" />
                      {alt}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-caution-amber mb-3">
                <span className="text-caution-amber/70 font-semibold text-xs uppercase tracking-wider">Trade-off: </span>
                {d.tradeoff}
              </p>

              <p className="text-sm text-safe-green">
                <span className="text-safe-green/70 font-semibold text-xs uppercase tracking-wider">Why this wins: </span>
                {d.why}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Next page */}
      <div className="pt-8 border-t border-neutral-800">
        <Link
          to="/technology/ai-pipeline"
          className="inline-flex items-center gap-2 text-sm font-medium text-storm-blue hover:text-white transition-colors"
        >
          Next: AI Detection Pipeline <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
