import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Eye,
  Camera,
  BrainCircuit,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Activity,
  Clock,
  TrendingUp,
  Layers,
  Scale,
  AlertTriangle,
  Globe,
  Zap,
  DollarSign,
  BarChart3,
  Gauge,
  Bell,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Shared animated section wrapper (mirrors Technology.tsx Section)    */
/* ------------------------------------------------------------------ */
function DeepSection({
  children,
  id,
  className = '',
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`max-w-6xl mx-auto px-6 py-20 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}

/* ================================================================== */
/*  DATA                                                               */
/* ================================================================== */

const decisions = [
  {
    title: 'FastAPI over Django / Express',
    decision: 'Python FastAPI for all backend services.',
    alternatives: [
      'Django REST Framework',
      'Node.js / Express',
      'Go / Gin',
    ],
    tradeoff:
      'Python ecosystem (ML libraries) vs raw throughput. FastAPI is 3-5x slower than Go for pure API calls.',
    why: 'ML models are in Python. Same language for API + inference eliminates serialization overhead. Async support handles 10K+ concurrent WebSocket connections.',
  },
  {
    title: 'TimescaleDB over InfluxDB / Cassandra',
    decision: 'TimescaleDB for time-series flood / traffic data.',
    alternatives: [
      'InfluxDB',
      'Apache Cassandra',
      'Plain PostgreSQL with partitioning',
    ],
    tradeoff:
      'SQL compatibility vs write throughput. InfluxDB writes 2x faster but lacks spatial queries.',
    why: 'PostGIS extension gives spatial queries on the same database. One storage layer for both time-series AND geospatial. Hypertable compression reduces storage 90%.',
  },
  {
    title: 'PyTorch + ONNX over TensorFlow Serving',
    decision: 'Train in PyTorch, serve via ONNX Runtime.',
    alternatives: [
      'TensorFlow + TF Serving',
      'JAX',
      'Plain PyTorch serving with TorchServe',
    ],
    tradeoff:
      'Two-tool pipeline vs single-framework. ONNX conversion adds build complexity.',
    why: 'PyTorch for faster research iteration. ONNX Runtime for 3-5x inference speedup. GPU + CPU serving from same model artifact. Team expertise is PyTorch-native.',
  },
  {
    title: 'Kafka over RabbitMQ / Redis Streams',
    decision: 'Apache Kafka for all event streaming.',
    alternatives: [
      'RabbitMQ',
      'Redis Streams',
      'AWS Kinesis',
      'Apache Pulsar',
    ],
    tradeoff:
      'Operational complexity vs durability. Kafka requires ZooKeeper / KRaft. Higher memory footprint.',
    why: 'Event replay capability is critical -- when a new prediction model deploys, we reprocess the last 24 hours of events. Kafka\'s log-based storage enables this. RabbitMQ can\'t replay. 100K+ events/second throughput.',
  },
  {
    title: 'LLM API (Claude / GPT) over Self-hosted LLM',
    decision: 'External LLM API with local rule-based fallback.',
    alternatives: [
      'Self-hosted Llama 3 (70B)',
      'Fine-tuned smaller model only',
      'No LLM -- rules-only approach',
    ],
    tradeoff:
      'Latency + cost vs capability. API calls add 500-2000ms. $0.01-0.03 per severity assessment.',
    why: 'Reasoning quality for flood severity is critical -- lives depend on it. Self-hosted 8B models hallucinate 3x more on domain-specific tasks. API cost is $300-500/month at scale, trivial vs value. Rule-based fallback for when API is down.',
  },
  {
    title: 'Google Maps API over OSRM / Valhalla',
    decision: 'Google Maps Directions API for routing base.',
    alternatives: [
      'Self-hosted OSRM',
      'Valhalla',
      'Mapbox Directions API',
    ],
    tradeoff:
      'Per-request cost ($0.005-0.01) vs real-time traffic data. Self-hosted is free but has no live traffic.',
    why: 'Google\'s real-time traffic data is irreplaceable -- no open-source alternative has live traffic. We add flood intelligence as a penalty layer on top. At 50K routes/day, cost is ~$250-500/month.',
  },
];

const latencyStages = [
  { label: 'Camera Frame Capture', ms: 0, width: '0%', color: 'bg-neutral-500' },
  { label: 'Image Processing', ms: 200, width: '6.5%', color: 'bg-flood-cyan' },
  { label: 'Flood Detection (CV)', ms: 300, width: '9.7%', color: 'bg-storm-blue' },
  { label: 'LLM Severity Assessment', ms: 1400, width: '45.2%', color: 'bg-caution-amber', range: '800-2000ms' },
  { label: 'Route Recalculation', ms: 500, width: '16.1%', color: 'bg-safe-green' },
  { label: 'Push to Client', ms: 100, width: '3.2%', color: 'bg-critical-magenta' },
];

const optimizationTargets = [
  {
    stage: 'CV Detection',
    current: '300ms',
    target: '150ms',
    strategy: 'ONNX quantization + batch inference',
  },
  {
    stage: 'LLM Assessment',
    current: '800-2000ms',
    target: '400ms',
    strategy: 'Prompt caching + model distillation',
  },
  {
    stage: 'Route Calc',
    current: '500ms',
    target: '200ms',
    strategy: 'Pre-compute penalty graph, cache hot routes',
  },
  {
    stage: 'Total P95',
    current: '3.1s',
    target: '1.5s',
    strategy: 'Pipeline parallelization + edge caching',
  },
];

const sloData = [
  {
    service: 'Flood Detection',
    slo: '99.9% availability',
    errorBudget: '43 min/month downtime',
    alertThreshold: '> 0.1% error rate over 5 min',
  },
  {
    service: 'Route API',
    slo: 'P95 latency < 2s',
    errorBudget: '5% of requests allowed > 2s',
    alertThreshold: 'P95 > 3s for 2 min',
  },
  {
    service: 'Prediction Engine',
    slo: '90% accuracy (severity +/-1 level)',
    errorBudget: '10% misclassification allowed',
    alertThreshold: 'Accuracy drops below 85% on rolling 24hr',
  },
  {
    service: 'Alert Delivery',
    slo: '99.5% delivery within 30s',
    errorBudget: '0.5% missed/delayed alerts',
    alertThreshold: '> 1% missed in 10 min',
  },
];

const scalingTiers = [
  {
    tier: 'Tier 1',
    points: '< 50 flood points',
    pods: '2 pods',
    gpus: '1 GPU',
    llm: 'Shared LLM queue',
  },
  {
    tier: 'Tier 2',
    points: '50-500 flood points',
    pods: '4 pods',
    gpus: '2 GPUs',
    llm: 'Dedicated LLM queue',
  },
  {
    tier: 'Tier 3',
    points: '500+ flood points',
    pods: '8 pods',
    gpus: '4 GPUs',
    llm: 'Dedicated LLM instance',
  },
];

const costPerCity = [
  { tier: 'Tier 1 (Small)', infra: '$2K', aiml: '$1K', dataApis: '$500', total: '$3.5K' },
  { tier: 'Tier 2 (Medium)', infra: '$5K', aiml: '$3K', dataApis: '$1.5K', total: '$9.5K' },
  { tier: 'Tier 3 (Large)', infra: '$12K', aiml: '$8K', dataApis: '$4K', total: '$24K' },
];

const securityLayers = [
  {
    icon: Shield,
    title: 'Network Security',
    desc: 'All traffic TLS 1.3. API Gateway rate limiting. DDoS protection via Cloudflare. VPC isolation per customer.',
  },
  {
    icon: Lock,
    title: 'Authentication & Authorization',
    desc: 'OAuth 2.0 + JWT. Role-based access: Admin, Operator, Viewer, API-only. Scoped API keys with IP allowlisting.',
  },
  {
    icon: ShieldCheck,
    title: 'Data Privacy',
    desc: 'Flood data is non-PII. User location data anonymized after 24 hours. Route history aggregated, never stored individually. GDPR-ready architecture.',
  },
  {
    icon: ShieldAlert,
    title: 'Infrastructure Security',
    desc: 'Kubernetes RBAC. Secrets in Vault / AWS Secrets Manager. Container image scanning. Automated CVE patching. SOC 2 compliance roadmap.',
  },
];

/* ================================================================== */
/*  1. ARCHITECTURE DECISIONS                                          */
/* ================================================================== */
export function ArchitectureDecisions() {
  return (
    <DeepSection id="adr">
      <h2 className="text-3xl font-bold text-white">Architecture Decision Records</h2>
      <p className="text-lg text-neutral-400 mt-2 mb-10">
        Key decisions, alternatives considered, and why we chose what we chose.
      </p>

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
    </DeepSection>
  );
}

/* ================================================================== */
/*  2. LATENCY BUDGET                                                  */
/* ================================================================== */
export function LatencyBudget() {
  return (
    <DeepSection id="latency">
      <h2 className="text-3xl font-bold text-white">End-to-End Latency Budget</h2>
      <p className="text-lg text-neutral-400 mt-2 mb-10">
        Every millisecond from camera frame to driver alert, accounted for.
      </p>

      <motion.div
        className="bg-deep-navy rounded-xl p-8 border border-neutral-700/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Pipeline bar chart */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-neutral-500 font-mono">0ms</span>
            <span className="text-xs text-neutral-500 font-mono">3100ms (P95)</span>
          </div>

          <div className="relative">
            {/* Background track */}
            <div className="w-full h-12 bg-slate-dark rounded-lg overflow-hidden flex">
              {latencyStages.filter(s => s.ms > 0).map((stage, i) => (
                <motion.div
                  key={i}
                  className={`${stage.color} relative group cursor-pointer`}
                  style={{ width: stage.width }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 * i }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-mono font-bold text-white/90 whitespace-nowrap">
                      {stage.range || `${stage.ms}ms`}
                    </span>
                  </div>
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-800 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-neutral-700">
                    {stage.label}
                  </div>
                </motion.div>
              ))}
              {/* Remaining fill for visual clarity */}
              <div className="flex-1 bg-neutral-700/30" />
            </div>
          </div>

          {/* Stage labels below the bar */}
          <div className="flex mt-3 gap-4 flex-wrap">
            {latencyStages.filter(s => s.ms > 0).map((stage, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-sm ${stage.color}`} />
                <span className="text-xs text-neutral-400">{stage.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center gap-3 mb-8 p-3 bg-storm-blue/5 border border-storm-blue/20 rounded-lg">
          <Clock size={18} className="text-storm-blue flex-shrink-0" />
          <p className="text-sm text-neutral-300">
            <span className="text-white font-semibold">Total end-to-end:</span>{' '}
            1.9s (best case) to 3.1s (P95). LLM severity assessment dominates the budget at 45% of wall-clock time.
          </p>
        </div>

        {/* Optimization targets table */}
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-flood-cyan" />
          Optimization Targets
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-700/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Stage</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Current</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Target</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Strategy</th>
              </tr>
            </thead>
            <tbody>
              {optimizationTargets.map((row, i) => (
                <motion.tr
                  key={i}
                  className={i % 2 === 0 ? 'bg-slate-dark/50' : 'bg-slate-dark/20'}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                  viewport={{ once: true }}
                >
                  <td className="py-3 px-4 text-neutral-300 font-medium">{row.stage}</td>
                  <td className="py-3 px-4 text-caution-amber font-mono">{row.current}</td>
                  <td className="py-3 px-4 text-flood-cyan font-mono">{row.target}</td>
                  <td className="py-3 px-4 text-neutral-400">{row.strategy}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DeepSection>
  );
}

/* ================================================================== */
/*  Trade-off card helper                                              */
/* ================================================================== */
function TradeoffCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-caution-amber/5 border border-caution-amber/20 rounded-lg p-4 mt-4">
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
          <AlertTriangle size={14} className="text-caution-amber" />
          <span className="text-caution-amber text-xs font-bold uppercase tracking-wider">Trade-off</span>
        </div>
        <p className="text-sm text-neutral-300">{children}</p>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Flow arrow helper                                                  */
/* ================================================================== */
function FlowArrow() {
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="flex-shrink-0 mx-1 opacity-50">
      <line x1="0" y1="8" x2="16" y2="8" stroke="#64748B" strokeWidth="1.5" />
      <polygon points="14,4 24,8 14,12" fill="#64748B" />
    </svg>
  );
}

/* ================================================================== */
/*  Flow box helper                                                    */
/* ================================================================== */
function FlowBox({ label, color = 'border-neutral-600' }: { label: string; color?: string }) {
  return (
    <div className={`px-3 py-1.5 rounded border ${color} bg-neutral-800/60 text-xs font-mono text-neutral-300 whitespace-nowrap`}>
      {label}
    </div>
  );
}

/* ================================================================== */
/*  3. DATA FLOW DETAIL                                                */
/* ================================================================== */
export function DataFlowDetail() {
  return (
    <DeepSection id="dataflow">
      <h2 className="text-3xl font-bold text-white">Data Flow & Consistency Model</h2>
      <p className="text-lg text-neutral-400 mt-2 mb-10">
        How data moves through the system. Where we sacrifice consistency for speed, and where we don't.
      </p>

      <div className="space-y-8">
        {/* Real-Time Path */}
        <motion.div
          className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-danger-red animate-pulse" />
            <h3 className="text-lg font-bold text-white">Real-Time Path (&lt; 5 seconds)</h3>
          </div>

          <div className="flex items-center gap-1 flex-wrap mb-4 p-3 bg-neutral-800/50 rounded-lg">
            <FlowBox label="Camera / Sensor" color="border-flood-cyan/40" />
            <FlowArrow />
            <FlowBox label="Kafka" color="border-caution-amber/40" />
            <FlowArrow />
            <FlowBox label="Flink" color="border-storm-blue/40" />
            <FlowArrow />
            <FlowBox label="Flood Detection" color="border-safe-green/40" />
            <FlowArrow />
            <FlowBox label="Alert" color="border-danger-red/40" />
          </div>

          <p className="text-sm text-neutral-400 mb-2">
            Eventually consistent. A flood point appears in the dashboard within 5 seconds, but may not yet have LLM severity assessment.
          </p>

          <TradeoffCard>
            Speed over completeness. Users see a flood alert immediately with basic severity (rule-based), then it upgrades to LLM-assessed severity within 30 seconds.
          </TradeoffCard>
        </motion.div>

        {/* Near-Real-Time Path */}
        <motion.div
          className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-caution-amber" />
            <h3 className="text-lg font-bold text-white">Near-Real-Time Path (&lt; 30 seconds)</h3>
          </div>

          <div className="flex items-center gap-1 flex-wrap mb-4 p-3 bg-neutral-800/50 rounded-lg">
            <FlowBox label="Flood Event" color="border-danger-red/40" />
            <FlowArrow />
            <FlowBox label="LLM Assessment" color="border-storm-blue/40" />
            <FlowArrow />
            <FlowBox label="Route Penalty Update" color="border-caution-amber/40" />
            <FlowArrow />
            <FlowBox label="Google Maps Re-rank" color="border-safe-green/40" />
          </div>

          <p className="text-sm text-neutral-400 mb-2">
            LLM assessment is the bottleneck. We fire-and-forget the assessment, then update the flood point asynchronously.
          </p>

          <TradeoffCard>
            Accuracy over speed. We wait for LLM confirmation before adjusting route penalties for Level 4-5 (dangerous) floods. Level 1-3 use rule-based penalties immediately.
          </TradeoffCard>
        </motion.div>

        {/* Batch Path */}
        <motion.div
          className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-safe-green" />
            <h3 className="text-lg font-bold text-white">Batch Path (hourly / daily)</h3>
          </div>

          <div className="flex items-center gap-1 flex-wrap mb-4 p-3 bg-neutral-800/50 rounded-lg">
            <FlowBox label="Historical Data" color="border-neutral-500" />
            <FlowArrow />
            <FlowBox label="Spark" color="border-caution-amber/40" />
            <FlowArrow />
            <FlowBox label="Prediction Model Training" color="border-storm-blue/40" />
            <FlowArrow />
            <FlowBox label="Heatmap Update" color="border-flood-cyan/40" />
          </div>

          <p className="text-sm text-neutral-400 mb-2">
            Strongly consistent. Model retraining only promotes to production after validation against holdout set.
          </p>

          <TradeoffCard>
            Correctness over freshness. Prediction models retrain daily but deploy only after accuracy check. We never deploy a worse model.
          </TradeoffCard>
        </motion.div>
      </div>
    </DeepSection>
  );
}

/* ================================================================== */
/*  4. SCALABILITY DESIGN                                              */
/* ================================================================== */
export function ScalabilityDesign() {
  return (
    <DeepSection id="scalability">
      <h2 className="text-3xl font-bold text-white">Scalability Architecture</h2>
      <p className="text-lg text-neutral-400 mt-2 mb-10">
        How the system scales from 1 city to 100 cities.
      </p>

      <div className="space-y-8">
        {/* Horizontal Scaling */}
        <motion.div
          className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Layers size={18} className="text-flood-cyan" />
            <h3 className="text-lg font-bold text-white">Horizontal Scaling (per city)</h3>
          </div>

          <p className="text-sm text-neutral-400 mb-5">
            Each city gets its own Kafka partition, Flink job, and Redis cache shard.
            Adding a city means deploying config, not code. 15-minute provisioning.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['HCMC', 'Jakarta', 'Houston'].map((city, i) => (
              <motion.div
                key={city}
                className="border border-neutral-700/50 rounded-lg p-4 bg-neutral-800/40"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                viewport={{ once: true }}
              >
                <p className="text-sm font-bold text-white mb-3 text-center">{city}</p>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-flood-cyan bg-flood-cyan/10 border border-flood-cyan/20 rounded px-2 py-1 text-center">
                    Kafka Partition
                  </div>
                  <div className="text-xs font-mono text-storm-blue bg-storm-blue/10 border border-storm-blue/20 rounded px-2 py-1 text-center">
                    Flink Job
                  </div>
                  <div className="text-xs font-mono text-caution-amber bg-caution-amber/10 border border-caution-amber/20 rounded px-2 py-1 text-center">
                    Redis Shard
                  </div>
                  <div className="text-xs font-mono text-safe-green bg-safe-green/10 border border-safe-green/20 rounded px-2 py-1 text-center">
                    CV Pipeline
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-safe-green/5 border border-safe-green/20 rounded-lg">
            <p className="text-sm text-neutral-300">
              <span className="text-safe-green font-semibold">Isolation guarantee:</span>{' '}
              A spike in Jakarta never affects HCMC's latency. Each city pipeline is independently scalable and deployable.
            </p>
          </div>
        </motion.div>

        {/* Vertical Scaling */}
        <motion.div
          className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={18} className="text-caution-amber" />
            <h3 className="text-lg font-bold text-white">Vertical Scaling (per city complexity)</h3>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tier</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Flood Points</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Pods</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">GPUs</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">LLM</th>
                </tr>
              </thead>
              <tbody>
                {scalingTiers.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-dark/50' : 'bg-slate-dark/20'}>
                    <td className="py-3 px-4 text-flood-cyan font-mono font-medium">{row.tier}</td>
                    <td className="py-3 px-4 text-neutral-300">{row.points}</td>
                    <td className="py-3 px-4 text-neutral-300">{row.pods}</td>
                    <td className="py-3 px-4 text-neutral-300">{row.gpus}</td>
                    <td className="py-3 px-4 text-neutral-400">{row.llm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-caution-amber/5 border border-caution-amber/20 rounded-lg">
            <p className="text-sm text-neutral-300">
              <span className="text-caution-amber font-semibold">Auto-scale:</span>{' '}
              Kubernetes HPA triggers at 70% CPU or 500 events/sec per pod. Scale-up in 45 seconds, scale-down after 5 minutes of low utilization.
            </p>
          </div>
        </motion.div>

        {/* Cost Per City */}
        <motion.div
          className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 size={18} className="text-safe-green" />
            <h3 className="text-lg font-bold text-white">Cost Per City (monthly)</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">City Tier</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Infra</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">AI / ML</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Data APIs</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total / month</th>
                </tr>
              </thead>
              <tbody>
                {costPerCity.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-dark/50' : 'bg-slate-dark/20'}>
                    <td className="py-3 px-4 text-neutral-300 font-medium">{row.tier}</td>
                    <td className="py-3 px-4 text-neutral-400 font-mono">{row.infra}</td>
                    <td className="py-3 px-4 text-neutral-400 font-mono">{row.aiml}</td>
                    <td className="py-3 px-4 text-neutral-400 font-mono">{row.dataApis}</td>
                    <td className="py-3 px-4 text-white font-mono font-bold">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DeepSection>
  );
}

/* ================================================================== */
/*  5. SECURITY MODEL                                                  */
/* ================================================================== */
export function SecurityModel() {
  return (
    <DeepSection id="security">
      <h2 className="text-3xl font-bold text-white">Security & Data Privacy</h2>
      <p className="text-lg text-neutral-400 mt-2 mb-10">
        How we protect sensitive urban infrastructure data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {securityLayers.map((layer, i) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={i}
              className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 * i }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-storm-blue/10 border border-storm-blue/20 flex items-center justify-center">
                  <Icon size={18} className="text-storm-blue" />
                </div>
                <h3 className="text-lg font-bold text-white">{layer.title}</h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">{layer.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </DeepSection>
  );
}

/* ================================================================== */
/*  6. MONITORING & OBSERVABILITY                                      */
/* ================================================================== */
export function MonitoringObservability() {
  return (
    <DeepSection id="observability">
      <h2 className="text-3xl font-bold text-white">Observability & SLOs</h2>
      <p className="text-lg text-neutral-400 mt-2 mb-10">
        What we measure. What we alert on. What we guarantee.
      </p>

      {/* SLO Table */}
      <motion.div
        className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Gauge size={18} className="text-flood-cyan" />
          Service Level Objectives
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-700/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Service</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">SLO</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Error Budget</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Alert Threshold</th>
              </tr>
            </thead>
            <tbody>
              {sloData.map((row, i) => (
                <motion.tr
                  key={i}
                  className={i % 2 === 0 ? 'bg-slate-dark/50' : 'bg-slate-dark/20'}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                  viewport={{ once: true }}
                >
                  <td className="py-3 px-4 text-white font-medium">{row.service}</td>
                  <td className="py-3 px-4 text-safe-green font-mono text-xs">{row.slo}</td>
                  <td className="py-3 px-4 text-caution-amber font-mono text-xs">{row.errorBudget}</td>
                  <td className="py-3 px-4 text-danger-red font-mono text-xs">{row.alertThreshold}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Monitoring Stack */}
      <motion.div
        className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <Activity size={18} className="text-safe-green" />
          Monitoring Stack
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          {[
            { name: 'Prometheus + Grafana', role: 'Metrics collection & dashboards', icon: BarChart3, color: 'text-flood-cyan', border: 'border-flood-cyan/20', bg: 'bg-flood-cyan/5' },
            { name: 'Sentry', role: 'Error tracking & distributed traces', icon: AlertTriangle, color: 'text-danger-red', border: 'border-danger-red/20', bg: 'bg-danger-red/5' },
            { name: 'OpenTelemetry', role: 'Distributed tracing across services', icon: Eye, color: 'text-storm-blue', border: 'border-storm-blue/20', bg: 'bg-storm-blue/5' },
            { name: 'PagerDuty', role: 'On-call alerting & escalation', icon: Bell, color: 'text-caution-amber', border: 'border-caution-amber/20', bg: 'bg-caution-amber/5' },
            { name: 'Custom Dashboard', role: 'Flood prediction accuracy (predicted vs actual, hourly)', icon: CheckCircle2, color: 'text-safe-green', border: 'border-safe-green/20', bg: 'bg-safe-green/5' },
          ].map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={i}
                className={`${tool.bg} border ${tool.border} rounded-lg p-4`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.08 * i }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className={tool.color} />
                  <span className={`text-sm font-bold ${tool.color}`}>{tool.name}</span>
                </div>
                <p className="text-xs text-neutral-400">{tool.role}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="p-3 bg-storm-blue/5 border border-storm-blue/20 rounded-lg">
          <p className="text-sm text-neutral-300">
            <span className="text-storm-blue font-semibold">Key insight:</span>{' '}
            We treat prediction accuracy as a first-class SLO, not just system uptime.
            Every hour, an automated job compares predicted flood severity against actual reported conditions.
            A sustained accuracy drop below 85% triggers model rollback and PagerDuty escalation.
          </p>
        </div>
      </motion.div>
    </DeepSection>
  );
}

/* ================================================================== */
/*  7. AI DETECTION + LLM SEVERITY PIPELINE (DEEP DIVE)               */
/* ================================================================== */
export function AIDetectionPipeline() {
  return (
    <DeepSection id="ai-pipeline">
      <h2 className="text-3xl font-bold text-white">AI Detection &amp; LLM Severity Pipeline</h2>
      <p className="text-lg text-neutral-400 mt-2 mb-10">
        Why we split detection and severity into two separate systems — and how we ensure LLM accuracy without labeled flood severity datasets.
      </p>

      {/* The Core Problem */}
      <motion.div
        className="bg-deep-navy rounded-xl p-8 border border-neutral-700/50 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertTriangle size={20} className="text-caution-amber" />
          The Core Challenge
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-safe-green mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">What we CAN do with CV models</p>
                <p className="text-neutral-400 text-sm">Binary flood detection — "Is there water on this road?" — is solvable with existing datasets (FloodNet, Flood-Detection-Dataset). We can train a YOLOv8/ResNet classifier with 90%+ accuracy for presence detection.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <XCircle size={18} className="text-danger-red mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">What we CANNOT do with CV alone</p>
                <p className="text-neutral-400 text-sm">Flood severity assessment — "How deep? Is it passable? Is it getting worse?" — requires labeled severity data that doesn't exist at scale. No public dataset maps flood images to depth/passability/risk levels.</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-dark rounded-lg p-5 border border-neutral-700/50">
            <p className="text-xs font-semibold text-caution-amber uppercase tracking-wider mb-3">The Dataset Gap</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-neutral-300">
                <span>FloodNet Dataset</span>
                <span className="text-safe-green font-mono">2,343 images</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>→ Has flood/no-flood labels</span>
                <span className="text-safe-green">✓</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>→ Has depth labels (cm)</span>
                <span className="text-danger-red">✗</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>→ Has passability labels</span>
                <span className="text-danger-red">✗</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>→ Has severity levels (1-5)</span>
                <span className="text-danger-red">✗</span>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-700/50 text-neutral-400 text-xs">
                Training a severity classifier requires 10K+ labeled images with depth + passability annotations. This dataset doesn't exist. Creating it takes 6-12 months of field data collection.
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Our Solution: Two-Stage Pipeline */}
      <motion.div
        className="bg-deep-navy rounded-xl p-8 border border-storm-blue/30 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BrainCircuit size={20} className="text-storm-blue" />
          Our Solution: Two-Stage Pipeline
        </h3>

        {/* Pipeline Diagram */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-8">
          {/* Stage 1 */}
          <div className="flex-1 bg-safe-green/5 border border-safe-green/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Camera size={18} className="text-safe-green" />
              <span className="text-xs font-semibold text-safe-green uppercase tracking-wider">Stage 1: CV Detection</span>
            </div>
            <p className="text-white font-medium mb-2">Binary Flood Detection</p>
            <p className="text-neutral-400 text-sm mb-3">Trained on existing datasets. High confidence, narrow scope.</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-neutral-400">Model</span><span className="font-mono text-neutral-200">YOLOv8 + ResNet50</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Task</span><span className="text-neutral-200">Flood / No Flood</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Accuracy</span><span className="font-mono text-safe-green">92.4%</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Latency</span><span className="font-mono text-neutral-200">~200ms</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Training data</span><span className="text-neutral-200">Public datasets</span></div>
            </div>
            <div className="mt-3 pt-3 border-t border-safe-green/10">
              <p className="text-xs text-safe-green">Output: "Flood detected at [location] with [confidence]%"</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center lg:py-0 py-2">
            <svg width="40" height="24" viewBox="0 0 40 24" className="text-neutral-500 hidden lg:block">
              <line x1="0" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="2" />
              <polygon points="28,6 40,12 28,18" fill="currentColor" />
            </svg>
            <svg width="24" height="40" viewBox="0 0 24 40" className="text-neutral-500 lg:hidden">
              <line x1="12" y1="0" x2="12" y2="28" stroke="currentColor" strokeWidth="2" />
              <polygon points="6,28 12,40 18,28" fill="currentColor" />
            </svg>
          </div>

          {/* Stage 2 */}
          <div className="flex-1 bg-storm-blue/5 border border-storm-blue/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <BrainCircuit size={18} className="text-storm-blue" />
              <span className="text-xs font-semibold text-storm-blue uppercase tracking-wider">Stage 2: LLM Severity</span>
            </div>
            <p className="text-white font-medium mb-2">Multi-Signal Severity Assessment</p>
            <p className="text-neutral-400 text-sm mb-3">Uses reasoning over multiple data sources. No severity labels needed.</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-neutral-400">Model</span><span className="font-mono text-neutral-200">Claude / GPT-4o</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Task</span><span className="text-neutral-200">Severity 1-5, depth, passability</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Accuracy</span><span className="font-mono text-storm-blue">~91% (±1 level)</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Latency</span><span className="font-mono text-neutral-200">800-2000ms</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Training data</span><span className="text-caution-amber">None needed</span></div>
            </div>
            <div className="mt-3 pt-3 border-t border-storm-blue/10">
              <p className="text-xs text-storm-blue">Output: "Level 3/5 | ~35cm | Impassable for sedans | 91% conf"</p>
            </div>
          </div>
        </div>

        <TradeoffCard>
          Why not wait to build a severity dataset? Because people are dying NOW. LLM reasoning gives us 91% accuracy today without a single labeled severity image. We'll build the dataset over time using LLM assessments validated by ground truth — the LLM bootstraps its own training data.
        </TradeoffCard>
      </motion.div>

      {/* LLM Accuracy Guardrails */}
      <motion.div
        className="bg-deep-navy rounded-xl p-8 border border-danger-red/20 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Shield size={20} className="text-danger-red" />
          Ensuring LLM Accuracy — Five Guardrails
        </h3>
        <p className="text-neutral-400 text-sm mb-6">
          LLMs can hallucinate. For a system where wrong severity = lives at risk, we implement five layers of validation.
        </p>

        <div className="space-y-4">
          {[
            {
              num: '1',
              title: 'Structured Output Enforcement',
              desc: 'LLM must return a strict JSON schema: {severity: 1-5, depth_cm: number, passability: enum, confidence: 0-100, reasoning: string}. Any malformed response is rejected and retried. After 2 failures, fall back to rule-based scoring.',
              color: 'text-flood-cyan',
              detail: 'Tool: JSON mode + Pydantic validation on response',
            },
            {
              num: '2',
              title: 'Multi-Source Cross-Validation',
              desc: 'LLM severity must be consistent with other signals. If LLM says "Level 1 (minor)" but weather shows 100mm rainfall AND camera shows deep water, the assessment is flagged for review. Consistency score = agreement ratio across sources.',
              color: 'text-storm-blue',
              detail: 'Rule: If consistency < 60%, escalate to human operator',
            },
            {
              num: '3',
              title: 'Confidence Thresholding',
              desc: 'LLM must self-report confidence. Assessments below 70% confidence are downgraded: Level 4-5 assessments require >80% confidence to trigger critical alerts. Low-confidence results get a "UNCONFIRMED" badge and await corroboration.',
              color: 'text-caution-amber',
              detail: 'Rule: High severity + low confidence = hold alert, request more data',
            },
            {
              num: '4',
              title: 'Historical Calibration',
              desc: 'We track LLM accuracy over time by comparing assessments to eventual ground truth (user reports, water level sensors, post-event surveys). If accuracy drifts below 85% on a rolling 7-day window, we adjust prompts, switch models, or increase the confidence threshold.',
              color: 'text-safe-green',
              detail: 'Metric: Rolling 7-day accuracy, measured hourly',
            },
            {
              num: '5',
              title: 'Human-in-the-Loop for Critical Decisions',
              desc: 'Level 4-5 severity (dangerous/life-threatening) ALWAYS notifies a human operator before triggering city-wide routing changes. The operator can confirm, override, or request re-assessment. This is a safety valve, not a bottleneck — 95% of events are Level 1-3 and flow automatically.',
              color: 'text-danger-red',
              detail: 'SLA: Human confirmation within 2 minutes for Level 4-5',
            },
          ].map((item) => (
            <motion.div
              key={item.num}
              className="bg-slate-dark/50 rounded-lg p-5 border border-neutral-700/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: Number(item.num) * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full bg-slate-dark border border-neutral-600 flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm ${item.color}`}>
                  {item.num}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-2">{item.desc}</p>
                  <p className="text-xs font-mono text-neutral-500">{item.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* LLM Prompt Engineering */}
      <motion.div
        className="bg-deep-navy rounded-xl p-8 border border-neutral-700/50 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <MessageSquare size={20} className="text-flood-cyan" />
          LLM Prompt Design — How We Get Reliable Severity
        </h3>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* System Prompt */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">System Prompt</p>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-xs text-neutral-300 leading-relaxed overflow-x-auto">
              <span className="text-storm-blue">{'// system'}</span>{'\n'}
              You are a flood severity assessment engine.{'\n'}
              You analyze multi-source flood data and output{'\n'}
              structured severity assessments.{'\n\n'}
              SEVERITY SCALE:{'\n'}
              Level 1: Minor puddles {'(<'}10cm{')'}. Passable.{'\n'}
              Level 2: Shallow {'('}10-20cm{')'}.  Cars slow.{'\n'}
              Level 3: Moderate {'('}20-40cm{')'}.  Sedans stuck.{'\n'}
              Level 4: Deep {'('}40-70cm{')'}.  Most vehicles{'\n'}
              {'         '}cannot pass. Dangerous.{'\n'}
              Level 5: Severe {'(>'}70cm{')'}.  Life-threatening.{'\n'}
              {'         '}No vehicles should enter.{'\n\n'}
              RULES:{'\n'}
              - ALWAYS output valid JSON{'\n'}
              - NEVER overestimate to be safe{'\n'}
              - If uncertain, set confidence {'<'} 70{'\n'}
              - Cross-reference ALL provided sources{'\n'}
              - Explain your reasoning step by step
            </div>
          </div>

          {/* Example Exchange */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Example Input → Output</p>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto mb-3">
              <span className="text-caution-amber">{'// user input (assembled by agent)'}</span>{'\n'}
              <span className="text-neutral-400">Camera:</span> Water visible on road,{'\n'}
              {'  '}submerging curb, ~25cm estimated{'\n'}
              <span className="text-neutral-400">Weather:</span> 85mm rainfall in 2 hours,{'\n'}
              {'  '}continuing at 30mm/hr{'\n'}
              <span className="text-neutral-400">News:</span> &quot;District 7 flooding causes{'\n'}
              {'  '}traffic jam&quot; — VnExpress 14:23{'\n'}
              <span className="text-neutral-400">User report:</span> &quot;Knee-deep water on{'\n'}
              {'  '}Nguyen Hue. Motorbikes turning back.&quot;
            </div>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto">
              <span className="text-safe-green">{'// LLM structured output'}</span>{'\n'}
              {'{\n'}
              {'  '}<span className="text-storm-blue">&quot;severity&quot;</span>: <span className="text-flood-cyan">3</span>,{'\n'}
              {'  '}<span className="text-storm-blue">&quot;depth_cm&quot;</span>: <span className="text-flood-cyan">35</span>,{'\n'}
              {'  '}<span className="text-storm-blue">&quot;passability&quot;</span>: <span className="text-caution-amber">&quot;impassable_sedan&quot;</span>,{'\n'}
              {'  '}<span className="text-storm-blue">&quot;confidence&quot;</span>: <span className="text-flood-cyan">91</span>,{'\n'}
              {'  '}<span className="text-storm-blue">&quot;reasoning&quot;</span>: <span className="text-neutral-400">&quot;Camera shows ~25cm,</span>{'\n'}
              {'    '}<span className="text-neutral-400">user says knee-deep (~30-40cm),</span>{'\n'}
              {'    '}<span className="text-neutral-400">rainfall continuing. Converging</span>{'\n'}
              {'    '}<span className="text-neutral-400">on Level 3. Confidence high due</span>{'\n'}
              {'    '}<span className="text-neutral-400">to 4-source agreement.&quot;</span>{'\n'}
              {'}'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bootstrap Strategy */}
      <motion.div
        className="bg-deep-navy rounded-xl p-8 border border-safe-green/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-safe-green" />
          The Bootstrap Strategy — LLM Today, Custom Model Tomorrow
        </h3>
        <p className="text-neutral-400 text-sm mb-6">
          LLM is not the final state. It's the bootstrapper. Here's the 3-phase plan:
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-dark/50 rounded-lg p-5 border border-neutral-700/30">
            <div className="text-xs font-semibold text-flood-cyan uppercase tracking-wider mb-2">Phase 1: LLM-Only (Now)</div>
            <p className="text-white font-medium text-sm mb-2">Use LLM for all severity assessment</p>
            <ul className="text-neutral-400 text-xs space-y-1">
              <li>• No labeled data needed</li>
              <li>• 91% accuracy from day 1</li>
              <li>• Cost: ~$0.01-0.03 per assessment</li>
              <li>• Latency: 800-2000ms</li>
              <li>• Every assessment stored with ground truth for future training</li>
            </ul>
          </div>
          <div className="bg-slate-dark/50 rounded-lg p-5 border border-neutral-700/30">
            <div className="text-xs font-semibold text-storm-blue uppercase tracking-wider mb-2">Phase 2: Hybrid (6 months)</div>
            <p className="text-white font-medium text-sm mb-2">Distill LLM knowledge into smaller model</p>
            <ul className="text-neutral-400 text-xs space-y-1">
              <li>• 10K+ LLM assessments as training data</li>
              <li>• Fine-tune ResNet/ViT for severity</li>
              <li>• Use LLM only for low-confidence cases</li>
              <li>• Cost drops 80%</li>
              <li>• Latency drops to ~300ms for most cases</li>
            </ul>
          </div>
          <div className="bg-slate-dark/50 rounded-lg p-5 border border-neutral-700/30">
            <div className="text-xs font-semibold text-safe-green uppercase tracking-wider mb-2">Phase 3: Custom Model (12 months)</div>
            <p className="text-white font-medium text-sm mb-2">Fully trained severity classifier</p>
            <ul className="text-neutral-400 text-xs space-y-1">
              <li>• 50K+ validated severity labels</li>
              <li>• Custom multi-modal model (image + weather + text)</li>
              <li>• LLM only for edge cases + validation</li>
              <li>• Cost: near-zero (self-hosted inference)</li>
              <li>• Latency: ~150ms end-to-end</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-storm-blue/5 border border-storm-blue/20 rounded-lg">
          <p className="text-sm text-neutral-300">
            <span className="text-storm-blue font-semibold">Key insight:</span>{' '}
            The LLM is not a crutch — it's a data generation engine. Every severity assessment it makes, once validated by ground truth, becomes a training example for the custom model. The LLM bootstraps its own replacement. By month 12, we'll have the largest labeled flood severity dataset in existence — built automatically.
          </p>
        </div>
      </motion.div>
    </DeepSection>
  );
}

/* ================================================================== */
/*  8. AWS DEPLOYMENT ARCHITECTURE                                     */
/* ================================================================== */

const awsLayers = [
  { name: 'CDN & Hosting', services: 'CloudFront + S3 + Amplify', purpose: 'Static assets, global edge delivery, auto-deploy from GitHub', color: 'text-caution-amber', bg: 'bg-caution-amber/5', border: 'border-caution-amber/15' },
  { name: 'API Gateway', services: 'API Gateway + ALB + Cognito', purpose: 'REST, WebSocket, OAuth 2.0, rate limiting', color: 'text-storm-blue', bg: 'bg-storm-blue/5', border: 'border-storm-blue/15' },
  { name: 'Application', services: 'ECS Fargate + Lambda + Step Functions', purpose: 'Serverless containers, async jobs, workflow orchestration', color: 'text-flood-cyan', bg: 'bg-flood-cyan/5', border: 'border-flood-cyan/15' },
  { name: 'AI / ML', services: 'SageMaker + Bedrock (Claude)', purpose: 'GPU inference (CV), LLM severity assessment, model training', color: 'text-critical-magenta', bg: 'bg-critical-magenta/5', border: 'border-critical-magenta/15' },
  { name: 'Processing', services: 'MSK (Kafka) + Kinesis + EMR (Spark)', purpose: 'Event streaming, real-time + batch processing', color: 'text-safe-green', bg: 'bg-safe-green/5', border: 'border-safe-green/15' },
  { name: 'Storage', services: 'ElastiCache + RDS/TimescaleDB + S3', purpose: 'Hot cache, time-series DB, cold archive', color: 'text-flood-cyan', bg: 'bg-flood-cyan/5', border: 'border-flood-cyan/15' },
  { name: 'Observability', services: 'CloudWatch + X-Ray + SNS', purpose: 'Metrics, distributed tracing, alerting', color: 'text-danger-red', bg: 'bg-danger-red/5', border: 'border-danger-red/15' },
];

const awsDecisions = [
  {
    decision: 'ECS Fargate over EKS (Kubernetes)',
    chosen: 'ECS Fargate — serverless containers',
    tradeoff: 'Less flexibility than Kubernetes, but zero cluster management. 70% lower ops overhead for a team of 6-8.',
    revisit: 'When team exceeds 20 engineers or need multi-cloud.',
  },
  {
    decision: 'Bedrock (Claude) over Self-Hosted LLM',
    chosen: 'Amazon Bedrock for LLM severity assessment',
    tradeoff: 'Higher per-call cost ($0.01 vs $0.002), but zero GPU management and 3x better reasoning quality for flood severity.',
    revisit: 'When monthly LLM cost exceeds $5K and custom model achieves comparable accuracy.',
  },
  {
    decision: 'MSK (Kafka) over Kinesis',
    chosen: 'Amazon MSK — managed Kafka',
    tradeoff: 'Higher base cost (~$300/month), but event replay is critical for reprocessing when deploying new prediction models.',
    revisit: 'Never. Event replay is a core architectural requirement.',
  },
  {
    decision: 'Amplify over Manual S3 Pipeline',
    chosen: 'AWS Amplify for frontend CI/CD',
    tradeoff: 'Less customization, but 5-minute setup, auto-preview for PRs, built-in monitoring.',
    revisit: 'When need monorepo or custom build caching.',
  },
];

const costPhases = [
  { phase: 'Phase 1', label: 'Pilot (1 city)', cost: '$1.0-1.4K', width: 'w-[15%]' },
  { phase: 'Phase 2', label: 'Scale (3-5 cities)', cost: '$3.2-4.1K', width: 'w-[35%]' },
  { phase: 'Phase 3', label: 'City-Scale (10+)', cost: '$11.5-15.5K', width: 'w-[75%]' },
];

export function AWSDeployment() {
  return (
    <DeepSection id="aws-deployment">
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        AWS Deployment Architecture
        <span className="px-3 py-1 text-xs font-bold text-caution-amber bg-caution-amber/10 border border-caution-amber/20 rounded-full uppercase tracking-wider">
          AWS
        </span>
      </h2>
      <p className="text-lg text-neutral-400 mt-2 mb-10">
        Production infrastructure on Amazon Web Services. Serverless-first. Auto-scaling. Multi-region ready.
      </p>

      {/* AWS Architecture Diagram */}
      <motion.div
        className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <Layers size={18} className="text-flood-cyan" />
          Infrastructure Stack
        </h3>

        <div className="space-y-2">
          {awsLayers.map((layer, i) => (
            <motion.div
              key={layer.name}
              className={`${layer.bg} border ${layer.border} rounded-lg px-4 py-3 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <span className={`font-bold text-sm uppercase tracking-wider w-32 flex-shrink-0 ${layer.color}`}>
                {layer.name}
              </span>
              <span className="font-mono text-xs text-white/90 bg-slate-dark px-2 py-1 rounded flex-shrink-0">
                {layer.services}
              </span>
              <span className="text-xs text-neutral-400 hidden lg:inline">
                {layer.purpose}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Feedback loop annotation */}
        <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
          <span className="text-danger-red">↑</span>
          <span>Feedback loop: CloudWatch metrics + SageMaker model accuracy → trigger retrain + redeploy</span>
        </div>
      </motion.div>

      {/* Deployment Pipeline */}
      <motion.div
        className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <Zap size={18} className="text-caution-amber" />
          Deployment Pipeline
        </h3>

        <div className="flex flex-col lg:flex-row items-stretch gap-3">
          {[
            { label: 'GitHub Push', tech: 'main branch', icon: '📦', color: 'border-neutral-600' },
            { label: 'Frontend', tech: 'Amplify auto-build → S3 → CloudFront invalidate', icon: '🌐', color: 'border-caution-amber/30' },
            { label: 'Backend', tech: 'CodePipeline → CodeBuild → ECR → ECS rolling deploy', icon: '⚙️', color: 'border-storm-blue/30' },
            { label: 'ML Models', tech: 'SageMaker Pipeline → train → evaluate → canary deploy', icon: '🧠', color: 'border-critical-magenta/30' },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center flex-1">
              <div className={`flex-1 bg-slate-dark/50 border ${step.color} rounded-lg p-4`}>
                <div className="text-sm mb-1">{step.icon}</div>
                <div className="text-white font-semibold text-sm">{step.label}</div>
                <div className="text-xs text-neutral-400 mt-1">{step.tech}</div>
              </div>
              {i < 3 && (
                <span className="text-neutral-600 mx-1 hidden lg:block">→</span>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-neutral-500 mt-4">
          Zero-downtime deployments. Blue/green for backend. Canary rollout for ML models. Auto-rollback on error rate spike.
        </p>
      </motion.div>

      {/* AWS Architecture Decisions */}
      <motion.div
        className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <Scale size={18} className="text-caution-amber" />
          AWS Architecture Decisions
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {awsDecisions.map((d, i) => (
            <motion.div
              key={d.decision}
              className="bg-slate-dark/50 rounded-lg p-5 border border-neutral-700/30"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              viewport={{ once: true }}
            >
              <p className="text-white font-semibold text-sm mb-2">{d.decision}</p>
              <p className="text-xs text-safe-green mb-1.5">
                <span className="font-semibold">Chosen:</span> {d.chosen}
              </p>
              <p className="text-xs text-caution-amber mb-1.5">
                <span className="font-semibold">Trade-off:</span> {d.tradeoff}
              </p>
              <p className="text-xs text-neutral-500">
                <span className="font-semibold">Revisit:</span> {d.revisit}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Cost Estimation */}
      <motion.div
        className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <DollarSign size={18} className="text-safe-green" />
          Monthly AWS Cost Estimation
        </h3>

        <div className="space-y-4">
          {costPhases.map((p, i) => (
            <motion.div
              key={p.phase}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-36 flex-shrink-0">
                <span className="text-white font-semibold text-sm">{p.phase}</span>
                <span className="text-neutral-500 text-xs block">{p.label}</span>
              </div>
              <div className="flex-1 bg-slate-dark rounded-full h-6 overflow-hidden">
                <div className={`h-full ${p.width} bg-gradient-to-r from-storm-blue to-flood-cyan rounded-full flex items-center justify-end pr-3`}>
                  <span className="font-mono text-[10px] font-bold text-white">{p.cost}</span>
                </div>
              </div>
              <span className="font-mono text-sm text-flood-cyan w-28 text-right">{p.cost}/mo</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { service: 'ECS Fargate', cost: '$200-5K', note: 'Scales per city' },
            { service: 'SageMaker + Bedrock', cost: '$400-6.4K', note: 'GPU + LLM calls' },
            { service: 'MSK Kafka', cost: '$150-1.2K', note: 'Event streaming' },
            { service: 'RDS + Redis + S3', cost: '$180-2.1K', note: 'All storage tiers' },
          ].map((s) => (
            <div key={s.service} className="bg-slate-dark/30 rounded-lg p-3 border border-neutral-700/20">
              <div className="text-xs font-semibold text-white">{s.service}</div>
              <div className="font-mono text-sm text-flood-cyan mt-1">{s.cost}</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">{s.note}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Multi-Region Strategy */}
      <motion.div
        className="bg-deep-navy rounded-xl p-6 border border-neutral-700/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <Globe size={18} className="text-storm-blue" />
          Multi-Region Expansion
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { region: 'ap-southeast-1', city: 'Singapore', phase: 'Phase 1', covers: 'Vietnam, Thailand, Indonesia', active: true },
            { region: 'ap-south-1', city: 'Mumbai', phase: 'Phase 2', covers: 'India, Bangladesh, Sri Lanka', active: false },
            { region: 'us-east-1', city: 'Virginia', phase: 'Phase 3', covers: 'US Gulf Coast, East Coast', active: false },
            { region: 'eu-west-1', city: 'Ireland', phase: 'Phase 4', covers: 'Europe, Middle East, Africa', active: false },
          ].map((r) => (
            <div key={r.region} className={`rounded-lg p-4 border ${r.active ? 'bg-storm-blue/10 border-storm-blue/30' : 'bg-slate-dark/30 border-neutral-700/20'}`}>
              <div className="flex items-center gap-2 mb-2">
                {r.active && <span className="w-2 h-2 rounded-full bg-safe-green animate-pulse" />}
                <span className={`text-xs font-bold uppercase tracking-wider ${r.active ? 'text-storm-blue' : 'text-neutral-500'}`}>
                  {r.phase}
                </span>
              </div>
              <div className="font-mono text-xs text-white">{r.region}</div>
              <div className="text-sm font-semibold text-white mt-1">{r.city}</div>
              <div className="text-[10px] text-neutral-400 mt-1">{r.covers}</div>
            </div>
          ))}
        </div>

        <p className="text-xs text-neutral-500 mt-4">
          CloudFront provides global edge for frontend from day 1. Backend services deploy per-region when latency demands it.
        </p>
      </motion.div>
    </DeepSection>
  );
}
