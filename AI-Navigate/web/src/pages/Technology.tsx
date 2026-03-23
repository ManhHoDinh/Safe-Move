import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Menu, X as XIcon } from 'lucide-react';
import {
  ArchitectureDecisions,
  LatencyBudget,
  DataFlowDetail,
  ScalabilityDesign,
  SecurityModel,
  MonitoringObservability,
  AIDetectionPipeline,
  AWSDeployment,
} from '../components/tech/DeepDive';
import {
  Droplets,
  ArrowLeft,
  Camera,
  Cloud,
  Database,
  Newspaper,
  Users,
  Search,
  BarChart3,
  Zap,
  Play,
  Target,
  Bot,
  Radio,
  Shield,
  Globe,
  Server,
  Layers,
  Code,
  Activity,
  Wifi,
  Container,
  Eye,
  MessageSquare,
  Map,
  Gauge,
  BrainCircuit,
  Timer,
  ChevronDown,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Reusable animated section wrapper                                  */
/* ------------------------------------------------------------------ */
function Section({
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

/* ------------------------------------------------------------------ */
/*  Section divider                                                    */
/* ------------------------------------------------------------------ */
function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-storm-blue/30 to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Down arrow between architecture layers                             */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Horizontal arrow between boxes                                     */
/* ------------------------------------------------------------------ */
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

/* ================================================================== */
/*  DATA: Architecture Layers                                          */
/* ================================================================== */
const architectureLayers = [
  {
    label: 'DATA SOURCES',
    items: 'Traffic Cameras  --  Weather APIs  --  Historical DB  --  News Crawl  --  User Reports',
    bg: 'bg-neutral-800',
    border: 'border-neutral-700',
    text: 'text-neutral-300',
    accent: '#94A3B8',
  },
  {
    label: 'INGESTION',
    items: 'Apache Kafka  --  MQTT  --  REST Webhooks',
    bg: 'bg-caution-amber/10',
    border: 'border-caution-amber/20',
    text: 'text-caution-amber',
    accent: '#F59E0B',
  },
  {
    label: 'PROCESSING',
    items: 'Apache Flink (stream)  --  Apache Spark (batch)  --  PostGIS',
    bg: 'bg-flood-cyan/10',
    border: 'border-flood-cyan/20',
    text: 'text-flood-cyan',
    accent: '#06B6D4',
  },
  {
    label: 'INTELLIGENCE',
    items: 'LLM Severity Assessment  --  Multi-Agent System  --  Prediction Engine  --  RL Optimization',
    bg: 'bg-storm-blue/10',
    border: 'border-storm-blue/20',
    text: 'text-storm-blue',
    accent: '#2563EB',
  },
  {
    label: 'ROUTING',
    items: 'Google Maps API  --  Flood Penalty Engine  --  Route Scorer',
    bg: 'bg-safe-green/10',
    border: 'border-safe-green/20',
    text: 'text-safe-green',
    accent: '#10B981',
  },
  {
    label: 'PRESENTATION',
    items: 'React Dashboard  --  Mobile App  --  REST API  --  WebSocket',
    bg: 'bg-critical-magenta/10',
    border: 'border-critical-magenta/20',
    text: 'text-critical-magenta',
    accent: '#EC4899',
  },
  {
    label: 'FEEDBACK',
    items: 'User Reports  --  Route Outcomes  --  Prediction Accuracy',
    bg: 'bg-danger-red/10',
    border: 'border-danger-red/20',
    text: 'text-danger-red',
    accent: '#EF4444',
  },
];

/* ================================================================== */
/*  DATA: Data Sources                                                 */
/* ================================================================== */
const dataSources = [
  {
    icon: Camera,
    name: 'Traffic Cameras',
    specs: 'RTSP/MJPEG -- 5s frame cycle -- CV flood detection -- ~1K fps',
  },
  {
    icon: Cloud,
    name: 'Weather APIs',
    specs: 'Google Weather + OWM -- 15-min polling -- Rainfall + forecast',
  },
  {
    icon: Database,
    name: 'Historical DB',
    specs: 'PostgreSQL/TimescaleDB -- 10+ years -- Flood records + drainage maps',
  },
  {
    icon: Newspaper,
    name: 'News Crawl',
    specs: 'RSS + NLP scraping -- 5-min cycle -- 50+ sources -- Sentiment scoring',
  },
  {
    icon: Users,
    name: 'User Reports',
    specs: 'Mobile API -- Real-time -- Photo uploads -- Severity ratings',
  },
];

/* ================================================================== */
/*  DATA: Processing Pipeline                                          */
/* ================================================================== */
const processingSteps = [
  { label: 'CLEAN', desc: 'Deduplication, schema validation, gap filling' },
  { label: 'NORMALIZE', desc: 'Standard units (cm, WGS84, UTC), format alignment' },
  { label: 'GEO-TAG', desc: 'Map signals to road segments via PostGIS spatial queries' },
  { label: 'TIME-ALIGN', desc: 'Merge multi-source events within 30-second windows' },
  { label: 'EVENT FUSE', desc: 'Composite flood events with confidence scoring' },
];

/* ================================================================== */
/*  DATA: Flood Lifecycle                                              */
/* ================================================================== */
const lifecycleStates = [
  { label: 'Detected', color: '#F59E0B' },
  { label: 'Confirmed', color: '#EF4444' },
  { label: 'Monitored', color: '#2563EB' },
  { label: 'Resolved', color: '#10B981' },
];

/* ================================================================== */
/*  DATA: Routing Steps                                                */
/* ================================================================== */
const routingSteps = [
  {
    label: 'Google Maps Directions API',
    desc: 'Fetch base routes with real-time traffic ETA',
    color: '#06B6D4',
  },
  {
    label: 'Flood Penalty Engine',
    desc: 'Apply weighted penalties to flooded road segments',
    color: '#F59E0B',
  },
  {
    label: 'Route Scorer',
    desc: 'Rank by time x safety x distance composite score',
    color: '#2563EB',
  },
  {
    label: 'Best Route Selection',
    desc: 'Deliver optimized route with 3-5 alternatives',
    color: '#10B981',
  },
];

/* ================================================================== */
/*  DATA: Agent Loop Nodes                                             */
/* ================================================================== */
const loopNodes = [
  { label: 'CRAWL', color: '#06B6D4', icon: Search, desc: 'Monitor sources 24/7' },
  { label: 'ANALYZE', color: '#2563EB', icon: BarChart3, desc: 'Cross-reference signals' },
  { label: 'DECIDE', color: '#10B981', icon: Zap, desc: 'Recommend strategies' },
  { label: 'EXECUTE', color: '#F59E0B', icon: Play, desc: 'Apply routing updates' },
  { label: 'MEASURE', color: '#EF4444', icon: Target, desc: 'Track outcomes' },
];

/* ================================================================== */
/*  DATA: Agent Types                                                  */
/* ================================================================== */
const agentTypes = [
  {
    name: 'Crawler Agents',
    desc: 'Monitor weather, news, social media 24/7',
    icon: Search,
    color: '#06B6D4',
  },
  {
    name: 'Analysis Agents',
    desc: 'Cross-reference, validate, score incoming signals',
    icon: BarChart3,
    color: '#2563EB',
  },
  {
    name: 'Decision Agents',
    desc: 'Recommend routing strategies from learned patterns',
    icon: Zap,
    color: '#10B981',
  },
  {
    name: 'Reporting Agents',
    desc: 'Generate LLM-written impact reports',
    icon: MessageSquare,
    color: '#F59E0B',
  },
  {
    name: 'Orchestrator',
    desc: 'Coordinate agents, resolve conflicts, manage priorities',
    icon: Bot,
    color: '#EC4899',
  },
];

/* ================================================================== */
/*  DATA: Prediction Signals                                           */
/* ================================================================== */
const predictionSignals = [
  {
    icon: Database,
    label: 'Historical',
    desc: 'Seasonal patterns, drainage capacity',
    bg: 'bg-storm-blue/10',
    border: 'border-storm-blue/20',
    color: 'text-storm-blue',
  },
  {
    icon: Cloud,
    label: 'Weather',
    desc: 'Rainfall accumulation, storm trajectory',
    bg: 'bg-flood-cyan/10',
    border: 'border-flood-cyan/20',
    color: 'text-flood-cyan',
  },
  {
    icon: Newspaper,
    label: 'News / Social',
    desc: 'NLP-extracted flood mentions',
    bg: 'bg-caution-amber/10',
    border: 'border-caution-amber/20',
    color: 'text-caution-amber',
  },
  {
    icon: Radio,
    label: 'Sensors',
    desc: 'Camera trends, IoT water levels',
    bg: 'bg-safe-green/10',
    border: 'border-safe-green/20',
    color: 'text-safe-green',
  },
];

/* ================================================================== */
/*  DATA: Tech Stack                                                   */
/* ================================================================== */
const techStack = [
  {
    category: 'Frontend',
    icon: Globe,
    techs: ['Vite', 'React 18', 'TypeScript', 'TailwindCSS', 'Mapbox GL', 'Framer Motion'],
  },
  {
    category: 'Backend',
    icon: Server,
    techs: ['Python 3.11+', 'FastAPI', 'Celery', 'SQLAlchemy'],
  },
  {
    category: 'AI / ML',
    icon: BrainCircuit,
    techs: ['PyTorch', 'LangChain', 'Hugging Face', 'ONNX Runtime', 'scikit-learn'],
  },
  {
    category: 'Data',
    icon: Database,
    techs: ['PostgreSQL', 'TimescaleDB', 'Redis', 'Apache Kafka', 'Apache Flink', 'Apache Spark'],
  },
  {
    category: 'Maps',
    icon: Map,
    techs: ['Google Maps Platform', 'Mapbox', 'OpenStreetMap', 'PostGIS', 'OSRM'],
  },
  {
    category: 'Infrastructure',
    icon: Container,
    techs: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
  },
  {
    category: 'Monitoring',
    icon: Eye,
    techs: ['Prometheus', 'Grafana', 'Sentry', 'OpenTelemetry'],
  },
  {
    category: 'Communication',
    icon: Wifi,
    techs: ['REST', 'WebSocket', 'gRPC', 'MQTT'],
  },
];

/* ================================================================== */
/*  DATA: Infrastructure Layers                                        */
/* ================================================================== */
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

/* ================================================================== */
/*  DATA: API Endpoints                                                */
/* ================================================================== */
const apiEndpoints = [
  {
    method: 'POST',
    path: '/api/v1/flood/detect',
    desc: 'Submit flood detection data from cameras, sensors, or user reports',
    methodColor: 'text-safe-green',
  },
  {
    method: 'GET',
    path: '/api/v1/flood/points?lat=10.76&lng=106.66&radius=5km',
    desc: 'Retrieve active flood points within a geographic radius',
    methodColor: 'text-flood-cyan',
  },
  {
    method: 'POST',
    path: '/api/v1/routes/optimize',
    desc: 'Request flood-aware optimized routing between two coordinates',
    methodColor: 'text-safe-green',
  },
  {
    method: 'GET',
    path: '/api/v1/prediction/heatmap?city=hcmc&hours=6',
    desc: 'Get flood probability heatmap predictions for a city',
    methodColor: 'text-flood-cyan',
  },
  {
    method: 'WS',
    path: '/api/v1/stream/alerts',
    desc: 'Subscribe to real-time flood alert events via WebSocket',
    methodColor: 'text-caution-amber',
  },
];

/* ================================================================== */
/*  TABLE OF CONTENTS DATA                                             */
/* ================================================================== */
const tocGroups = [
  {
    label: 'Overview',
    items: [
      { id: 'hero', label: 'Introduction' },
      { id: 'architecture', label: 'System Architecture' },
    ],
  },
  {
    label: 'Data & Processing',
    items: [
      { id: 'data-pipeline', label: 'Data Pipeline' },
      { id: 'processing', label: 'Data Processing' },
    ],
  },
  {
    label: 'AI & Intelligence',
    items: [
      { id: 'flood-intelligence', label: 'Flood Detection & LLM' },
      { id: 'routing', label: 'Routing Intelligence' },
      { id: 'agent-system', label: 'Agent System' },
      { id: 'prediction', label: 'Prediction Engine' },
    ],
  },
  {
    label: 'Product & Infra',
    items: [
      { id: 'tech-stack', label: 'Tech Stack' },
      { id: 'infrastructure', label: 'Infrastructure' },
      { id: 'api', label: 'API Reference' },
    ],
  },
  {
    label: 'Deep Dive',
    items: [
      { id: 'adr', label: 'Architecture Decisions' },
      { id: 'latency', label: 'Latency Budget' },
      { id: 'dataflow', label: 'Data Flow Model' },
      { id: 'scalability', label: 'Scalability' },
      { id: 'security', label: 'Security' },
      { id: 'observability', label: 'Observability & SLOs' },
      { id: 'ai-pipeline', label: 'AI Detection Pipeline' },
      { id: 'aws-deployment', label: 'AWS Deployment' },
    ],
  },
];

/* ================================================================== */
/*  SIDEBAR COMPONENT                                                  */
/* ================================================================== */
function Sidebar({ activeId, onNavigate }: { activeId: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 py-4" aria-label="Table of contents">
      {tocGroups.map((group) => (
        <div key={group.label} className="mb-3">
          <span className="block px-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] mb-1.5">
            {group.label}
          </span>
          {group.items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onNavigate}
                className={`block px-4 py-1.5 text-[13px] transition-all duration-200 border-l-2 ${
                  isActive
                    ? 'text-storm-blue border-storm-blue bg-storm-blue/5 font-medium'
                    : 'text-neutral-400 border-transparent hover:text-white hover:border-neutral-600 hover:bg-white/3'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

/* ================================================================== */
/*  MAIN COMPONENT                                                     */
/* ================================================================== */
export default function Technology() {
  const [activeId, setActiveId] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const allIds = tocGroups.flatMap((g) => g.items.map((i) => i.id));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile sidebar open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-abyss">
      {/* ============================================================ */}
      {/* STICKY HEADER                                                 */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-abyss/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Left: hamburger (mobile) + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            >
              {sidebarOpen ? <XIcon size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="flex items-center gap-2.5 group">
              <Droplets
                size={24}
                className="text-storm-blue transition-transform duration-300 group-hover:scale-110"
                strokeWidth={2}
              />
              <span className="text-lg font-bold text-white tracking-tight">
                SafeMove<span className="text-storm-blue"> AI</span>
              </span>
            </Link>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-400 border border-white/10 rounded-lg transition-all duration-300 hover:text-white hover:border-white/20 hover:bg-white/5"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-16 bottom-0 w-64 bg-deep-navy border-r border-neutral-800 overflow-y-auto">
            <Sidebar activeId={activeId} onNavigate={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Layout: Sidebar + Content */}
      <div className="flex pt-16">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-60 bg-deep-navy border-r border-neutral-800 overflow-y-auto z-30">
          <Sidebar activeId={activeId} />
        </aside>

        {/* Main content — offset by sidebar width on desktop */}
        <main className="flex-1 lg:ml-60 min-w-0">
        {/* ============================================================ */}
        {/* 1. HERO BANNER                                               */}
        {/* ============================================================ */}
        <Section id="hero" className="pt-28 pb-20 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-storm-blue/10 border border-storm-blue/20 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Code size={14} className="text-storm-blue" />
            <span className="text-xs font-semibold text-storm-blue tracking-wide uppercase">
              For Developers & Technical Partners
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            How SafeMove AI Works
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-neutral-400 mt-6 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            A technical deep-dive into the architecture, data pipeline, and intelligence
            systems powering flood-aware urban mobility.
          </motion.p>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ChevronDown size={28} className="mx-auto text-neutral-600 animate-bounce" />
          </motion.div>
        </Section>

        <Divider />

        {/* ============================================================ */}
        {/* 2. SYSTEM ARCHITECTURE OVERVIEW                              */}
        {/* ============================================================ */}
        <Section id="architecture">
          <h2 className="text-3xl font-bold text-white">System Architecture</h2>
          <p className="text-lg text-neutral-400 mt-2 mb-10">
            Seven layers. One closed loop. Every signal flows down, every outcome flows back up.
          </p>

          <div className="flex gap-6">
            {/* Main layers */}
            <div className="flex-1 flex flex-col">
              {architectureLayers.map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  viewport={{ once: true }}
                >
                  {i > 0 && <DownArrow color={architectureLayers[i - 1].accent} />}
                  <div
                    className={`${layer.bg} border ${layer.border} rounded-lg px-5 py-3.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4`}
                  >
                    <span
                      className={`text-xs font-bold tracking-wider uppercase ${layer.text} w-32 flex-shrink-0`}
                    >
                      {layer.label}
                    </span>
                    <span className={`text-sm ${layer.text} opacity-80`}>{layer.items}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feedback loop arrow (right side) */}
            <div className="relative hidden lg:flex items-center justify-center w-20">
              <motion.svg
                className="absolute"
                width="60"
                height="100%"
                viewBox="0 0 60 500"
                preserveAspectRatio="none"
                fill="none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <motion.path
                  d="M10 460 C 55 460, 55 460, 55 350 C 55 250, 55 220, 10 220"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                  strokeDasharray="6 3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1.2 }}
                  viewport={{ once: true }}
                />
                <motion.polygon
                  points="10,213 18,220 10,227"
                  fill="#EF4444"
                  fillOpacity="0.6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 2.2 }}
                  viewport={{ once: true }}
                />
              </motion.svg>
              <motion.span
                className="absolute text-danger-red/60 text-xs font-semibold tracking-wider"
                style={{ writingMode: 'vertical-lr', top: '60%' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
                viewport={{ once: true }}
              >
                FEEDBACK LOOP
              </motion.span>
            </div>
          </div>

          {/* Mobile feedback note */}
          <motion.p
            className="lg:hidden text-sm text-danger-red/60 mt-4 text-center italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Feedback Layer loops back to Intelligence for continuous improvement.
          </motion.p>
        </Section>

        <Divider />

        {/* ============================================================ */}
        {/* 3. DATA PIPELINE                                             */}
        {/* ============================================================ */}
        <Section id="data-pipeline">
          <h2 className="text-3xl font-bold text-white">Data Pipeline</h2>
          <p className="text-lg text-neutral-400 mt-2 mb-10">
            Five data sources. Real-time + batch processing. Event-level fusion.
          </p>

          {/* Source cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {dataSources.map((source, i) => {
              const Icon = source.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-deep-navy border border-neutral-700/50 rounded-xl p-5 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-flood-cyan" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{source.name}</h3>
                  <p className="font-mono text-xs text-neutral-400 mt-3 leading-relaxed">
                    {source.specs.split(' -- ').map((spec, j) => (
                      <span key={j}>
                        {j > 0 && <span className="text-flood-cyan/40"> | </span>}
                        {spec}
                      </span>
                    ))}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Ingestion bus bar */}
          <motion.div
            className="mt-8 bg-caution-amber/10 border border-caution-amber/20 rounded-lg px-6 py-4 flex items-center justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
        </Section>

        <Divider />

        {/* ============================================================ */}
        {/* 4. PROCESSING PIPELINE                                       */}
        {/* ============================================================ */}
        <Section id="processing">
          <h2 className="text-3xl font-bold text-white">Data Processing</h2>
          <p className="text-lg text-neutral-400 mt-2 mb-10">
            Five sequential stages transform raw, noisy signals into structured flood events.
          </p>

          {/* Desktop: horizontal pipeline */}
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

          {/* Mobile: vertical pipeline */}
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

        <Divider />

        {/* ============================================================ */}
        {/* 5. FLOOD DETECTION & LLM ASSESSMENT                         */}
        {/* ============================================================ */}
        <Section id="flood-intelligence">
          <h2 className="text-3xl font-bold text-white">Flood Intelligence</h2>
          <p className="text-lg text-neutral-400 mt-2 mb-10">
            Multi-source detection meets LLM-powered reasoning for accurate severity assessment.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT: Multi-Source Detection */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-6">
                Multi-Source Detection
              </h3>

              {/* Source icons converging */}
              <div className="relative">
                <div className="flex justify-between mb-2 px-4">
                  {[
                    { icon: Camera, label: 'Camera' },
                    { icon: Cloud, label: 'Weather' },
                    { icon: Newspaper, label: 'News' },
                    { icon: Users, label: 'User' },
                  ].map((source, i) => {
                    const Icon = source.icon;
                    return (
                      <motion.div
                        key={i}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: -15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-11 h-11 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-flood-cyan" strokeWidth={1.5} />
                        </div>
                        <span className="text-xs text-neutral-500 mt-1.5">{source.label}</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Converging arrows */}
                <motion.div
                  className="flex justify-center my-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
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

                {/* Detection Engine box */}
                <motion.div
                  className="bg-storm-blue/10 border border-storm-blue/30 rounded-lg px-4 py-3 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <span className="text-sm font-bold text-storm-blue uppercase tracking-wider">
                    Detection Engine
                  </span>
                </motion.div>
              </div>

              {/* Confidence scoring */}
              <motion.div
                className="mt-6 bg-neutral-900 rounded-lg p-4 font-mono text-sm text-neutral-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-xs text-neutral-500 block mb-2 font-sans font-semibold uppercase tracking-wider">
                  Confidence Scoring
                </span>
                <code className="text-flood-cyan">
                  Score = &Sigma;(source_weight &times; source_confidence)
                </code>
              </motion.div>

              {/* Lifecycle state machine */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Flood Point Lifecycle
                </span>
                <div className="flex items-center justify-between mt-4 px-1">
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
                          className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                          style={{
                            borderColor: state.color,
                            backgroundColor: `${state.color}15`,
                            color: state.color,
                          }}
                        >
                          {state.label}
                        </div>
                      </motion.div>
                      {i < lifecycleStates.length - 1 && (
                        <svg
                          width="24"
                          height="12"
                          viewBox="0 0 24 12"
                          fill="none"
                          className="mx-1"
                        >
                          <line
                            x1="0"
                            y1="6"
                            x2="16"
                            y2="6"
                            stroke="#64748B"
                            strokeWidth="1.5"
                          />
                          <polygon points="14,2 24,6 14,10" fill="#64748B" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: LLM Severity Assessment */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-6">
                LLM Severity Assessment
              </h3>

              {/* Input prompt */}
              <motion.div
                className="bg-neutral-900 rounded-lg p-4 font-mono text-sm text-neutral-300"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="text-xs text-neutral-500 block mb-3 font-sans font-semibold uppercase tracking-wider">
                  Input Context
                </span>
                <div className="space-y-1.5 leading-relaxed">
                  <p>
                    <span className="text-flood-cyan">Camera:</span> Water visible on road surface,
                    20cm estimated
                  </p>
                  <p>
                    <span className="text-flood-cyan">Weather:</span> 85mm rainfall in last 2
                    hours, continuing
                  </p>
                  <p>
                    <span className="text-flood-cyan">News:</span> "District 7 flooding reported
                    on VnExpress"
                  </p>
                  <p>
                    <span className="text-flood-cyan">User:</span> "Knee-deep water on Nguyen Hue
                    Street"
                  </p>
                </div>
              </motion.div>

              {/* Arrow */}
              <motion.div
                className="flex justify-center py-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                  <line x1="8" y1="0" x2="8" y2="14" stroke="#2563EB" strokeWidth="1.5" />
                  <polygon points="4,12 8,20 12,12" fill="#2563EB" />
                </svg>
              </motion.div>

              {/* LLM Reasoning Engine */}
              <motion.div
                className="bg-storm-blue/10 border border-storm-blue/30 rounded-lg px-4 py-3 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-bold text-storm-blue uppercase tracking-wider">
                  LLM Reasoning Engine
                </span>
              </motion.div>

              {/* Arrow */}
              <motion.div
                className="flex justify-center py-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.65 }}
                viewport={{ once: true }}
              >
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                  <line x1="8" y1="0" x2="8" y2="14" stroke="#2563EB" strokeWidth="1.5" />
                  <polygon points="4,12 8,20 12,12" fill="#2563EB" />
                </svg>
              </motion.div>

              {/* Output assessment */}
              <motion.div
                className="bg-slate-dark border border-flood-cyan/20 rounded-xl p-5"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                  Output Assessment
                </span>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-neutral-500">Severity</span>
                    <p className="font-mono text-sm text-caution-amber font-bold mt-0.5">
                      Level 3/5
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500">Depth</span>
                    <p className="font-mono text-sm text-flood-cyan font-bold mt-0.5">~35cm</p>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500">Passability</span>
                    <p className="font-mono text-sm text-danger-red font-bold mt-0.5">
                      Impassable for sedans
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500">Confidence</span>
                    <p className="font-mono text-sm text-safe-green font-bold mt-0.5">91%</p>
                  </div>
                </div>
              </motion.div>

              {/* Fallback note */}
              <motion.p
                className="mt-4 text-xs text-neutral-500 italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                viewport={{ once: true }}
              >
                Fallback: Rule-based scoring when LLM unavailable. Ensures zero downtime for
                severity assessment.
              </motion.p>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ============================================================ */}
        {/* 6. ROUTING INTELLIGENCE                                      */}
        {/* ============================================================ */}
        <Section id="routing">
          <h2 className="text-3xl font-bold text-white">Routing Intelligence</h2>
          <p className="text-lg text-neutral-400 mt-2 mb-4">
            We don't build our own mapping engine -- we augment Google Maps with flood intelligence.
          </p>
          <p className="text-sm text-neutral-500 mb-10">
            Real-time flood data is injected as weighted penalties into route scoring, enabling
            safe-path recommendations that Google Maps alone cannot provide.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Routing pipeline */}
            <div className="flex flex-col gap-2">
              {routingSteps.map((step, i) => (
                <div key={i}>
                  <motion.div
                    className="bg-slate-dark border rounded-xl px-5 py-4 flex items-start gap-4"
                    style={{ borderColor: `${step.color}30` }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5"
                      style={{
                        backgroundColor: `${step.color}15`,
                        color: step.color,
                        border: `1.5px solid ${step.color}40`,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm">{step.label}</span>
                      <p className="text-xs text-neutral-400 mt-1">{step.desc}</p>
                    </div>
                  </motion.div>
                  {i < routingSteps.length - 1 && <DownArrow color={step.color} />}
                </div>
              ))}
            </div>

            {/* Right: Key metrics and info */}
            <div className="flex flex-col justify-center gap-6">
              {/* Metrics row */}
              <motion.div
                className="grid grid-cols-3 gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {[
                  { value: '< 2s', label: 'Recalculation', icon: Timer },
                  { value: '3-5', label: 'Alternatives', icon: Layers },
                  { value: '2 modes', label: 'Fleet + Individual', icon: Gauge },
                ].map((metric, i) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={i}
                      className="bg-deep-navy border border-neutral-700/50 rounded-xl p-4 text-center"
                    >
                      <Icon
                        size={20}
                        className="mx-auto text-storm-blue mb-2"
                        strokeWidth={1.5}
                      />
                      <p className="font-mono text-lg font-bold text-white">{metric.value}</p>
                      <p className="text-xs text-neutral-400 mt-1">{metric.label}</p>
                    </div>
                  );
                })}
              </motion.div>

              {/* Route visualization mock */}
              <motion.div
                className="relative rounded-xl overflow-hidden border border-neutral-700"
                style={{
                  aspectRatio: '16 / 9',
                  background: '#0f1729',
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Grid background */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 225"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Flood zones */}
                  <motion.circle
                    cx="180"
                    cy="95"
                    r="28"
                    fill="#EF4444"
                    fillOpacity="0.12"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                    strokeOpacity="0.3"
                    animate={{ r: [26, 30, 26], fillOpacity: [0.08, 0.18, 0.08] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <text
                    x="180"
                    y="99"
                    textAnchor="middle"
                    fill="#EF4444"
                    fontSize="8"
                    fontWeight="bold"
                    opacity="0.6"
                  >
                    FLOOD
                  </text>
                  <motion.circle
                    cx="260"
                    cy="150"
                    r="20"
                    fill="#F59E0B"
                    fillOpacity="0.1"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeOpacity="0.3"
                    animate={{ r: [18, 22, 18] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                  />

                  {/* Blocked route (dashed gray) */}
                  <motion.path
                    d="M50 50 L120 75 L180 95 L240 130 L330 170"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                  />

                  {/* Safe route (solid green) */}
                  <motion.path
                    d="M50 50 L90 55 L130 42 L210 42 L290 75 L330 110 L350 170"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeOpacity="0.9"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.0 }}
                    viewport={{ once: true }}
                  />

                  {/* Start/End */}
                  <circle cx="50" cy="50" r="4" fill="#06B6D4" />
                  <text
                    x="50"
                    y="42"
                    textAnchor="middle"
                    fill="#06B6D4"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    A
                  </text>
                  <circle cx="350" cy="170" r="4" fill="#06B6D4" />
                  <text
                    x="350"
                    y="162"
                    textAnchor="middle"
                    fill="#06B6D4"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    B
                  </text>

                  {/* Legend */}
                  <line x1="20" y1="205" x2="40" y2="205" stroke="#10B981" strokeWidth="2" />
                  <text x="44" y="208" fill="#94A3B8" fontSize="8">
                    Safe route
                  </text>
                  <line
                    x1="120"
                    y1="205"
                    x2="140"
                    y2="205"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    strokeOpacity="0.5"
                  />
                  <text x="144" y="208" fill="#94A3B8" fontSize="8">
                    Blocked
                  </text>
                </svg>
              </motion.div>

              {/* Emergency note */}
              <motion.div
                className="bg-danger-red/5 border border-danger-red/20 rounded-lg px-4 py-3 flex items-start gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Shield size={18} className="text-danger-red flex-shrink-0 mt-0.5" />
                <p className="text-xs text-neutral-400">
                  <span className="text-danger-red font-semibold">Emergency Corridors:</span>{' '}
                  Priority routing for ambulance, fire, and police vehicles with dedicated
                  flood-safe corridors.
                </p>
              </motion.div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ============================================================ */}
        {/* 7. AGENT SYSTEM & LEARNING LOOP                             */}
        {/* ============================================================ */}
        <Section id="agent-system">
          <h2 className="text-3xl font-bold text-white">Agent System & Continuous Learning</h2>
          <p className="text-lg text-neutral-400 mt-2 mb-10">
            Autonomous agents crawl, analyze, decide, execute, and measure -- every flood makes the
            system smarter.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Circular loop diagram */}
            <div className="flex items-center justify-center">
              <div className="relative" style={{ width: 340, height: 340 }}>
                <svg
                  width="340"
                  height="340"
                  viewBox="0 0 340 340"
                  className="absolute inset-0"
                >
                  {loopNodes.map((_, i) => {
                    const cx = 170;
                    const cy = 170;
                    const r = 130;
                    const angle1 = (i * 2 * Math.PI) / loopNodes.length - Math.PI / 2;
                    const angle2 =
                      (((i + 1) % loopNodes.length) * 2 * Math.PI) / loopNodes.length -
                      Math.PI / 2;
                    const x1 = cx + r * Math.cos(angle1);
                    const y1 = cy + r * Math.sin(angle1);
                    const x2 = cx + r * Math.cos(angle2);
                    const y2 = cy + r * Math.sin(angle2);
                    const midAngle = (angle1 + angle2) / 2;
                    const cpr = r * 0.6;
                    const cpx = cx + cpr * Math.cos(midAngle);
                    const cpy = cy + cpr * Math.sin(midAngle);

                    return (
                      <motion.path
                        key={i}
                        d={`M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`}
                        fill="none"
                        stroke={loopNodes[i].color}
                        strokeWidth="2"
                        strokeOpacity="0.35"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                        viewport={{ once: true }}
                      />
                    );
                  })}
                </svg>

                {/* Nodes */}
                {loopNodes.map((node, i) => {
                  const cx = 170;
                  const cy = 170;
                  const r = 130;
                  const angle = (i * 2 * Math.PI) / loopNodes.length - Math.PI / 2;
                  const x = cx + r * Math.cos(angle);
                  const y = cy + r * Math.sin(angle);
                  const Icon = node.icon;

                  return (
                    <motion.div
                      key={i}
                      className="absolute flex flex-col items-center"
                      style={{ left: x - 36, top: y - 36, width: 72, height: 72 }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + i * 0.12,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      viewport={{ once: true }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center border-2"
                        style={{
                          borderColor: node.color,
                          backgroundColor: `${node.color}15`,
                        }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: node.color }}
                          strokeWidth={1.5}
                        />
                      </div>
                      <span
                        className="text-[10px] font-bold tracking-wide mt-1 whitespace-nowrap"
                        style={{ color: node.color }}
                      >
                        {node.label}
                      </span>
                      <span className="text-[9px] text-neutral-500 whitespace-nowrap">
                        {node.desc}
                      </span>
                    </motion.div>
                  );
                })}

                {/* Center label */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col items-center">
                    <Database className="w-6 h-6 text-neutral-400 mb-1" strokeWidth={1.5} />
                    <span className="text-xs font-bold text-white tracking-wide">AGENT</span>
                    <span className="text-xs font-bold text-neutral-400 tracking-wide">
                      MEMORY
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right: Agent type cards */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Agent Types
              </h3>
              {agentTypes.map((agent, i) => {
                const Icon = agent.icon;
                return (
                  <motion.div
                    key={i}
                    className="bg-deep-navy border border-neutral-700/50 rounded-xl px-5 py-4 flex items-start gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${agent.color}15` }}
                    >
                      <Icon className="w-4.5 h-4.5" style={{ color: agent.color }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm">{agent.name}</span>
                      <p className="text-xs text-neutral-400 mt-1">{agent.desc}</p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Feedback sources */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  Feedback Sources
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'User ratings',
                    'Route completion data',
                    'Prediction accuracy',
                    'LLM confidence calibration',
                  ].map((source, i) => (
                    <motion.span
                      key={i}
                      className="inline-flex items-center gap-2 bg-slate-dark border border-neutral-700/50 rounded-full px-3 py-1.5 text-xs text-neutral-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + i * 0.06 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-flood-cyan" />
                      {source}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.p
                className="text-neutral-500 text-xs italic mt-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                viewport={{ once: true }}
              >
                Optional: RL policy optimization layer for automated strategy tuning.
              </motion.p>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ============================================================ */}
        {/* 8. PREDICTION ENGINE                                         */}
        {/* ============================================================ */}
        <Section id="prediction">
          <h2 className="text-3xl font-bold text-white">Prediction Engine</h2>
          <p className="text-lg text-neutral-400 mt-2 mb-10">
            Fuse four signal layers into 2-6 hour advance predictions using ML ensembles.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Signal layers */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Signal Layers
              </h3>
              {predictionSignals.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    className={`flex items-center gap-4 ${s.bg} border ${s.border} rounded-lg px-4 py-3`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Icon className={`w-5 h-5 ${s.color} flex-shrink-0`} strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm">{s.label}</p>
                      <p className="text-neutral-400 text-xs">{s.desc}</p>
                    </div>
                    <span className="text-neutral-600 text-lg flex-shrink-0">&rarr;</span>
                  </motion.div>
                );
              })}

              {/* Fusion box */}
              <motion.div
                className="bg-slate-dark border border-neutral-600 rounded-xl p-5 text-center mt-2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-white font-bold text-sm uppercase tracking-wider">
                  Prediction Fusion
                </p>
                <p className="text-neutral-400 text-xs mt-2 font-mono">
                  Temporal Fusion Transformer + XGBoost ensemble
                </p>
              </motion.div>
            </div>

            {/* Right: Output */}
            <div className="flex flex-col gap-5 justify-center">
              {/* Heatmap visualization */}
              <motion.div
                className="bg-slate-dark rounded-xl overflow-hidden border border-neutral-700"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="px-4 py-2.5 border-b border-neutral-700">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Flood Probability Heatmap
                  </span>
                </div>
                <div className="p-4">
                  <div
                    className="w-full h-32 rounded-lg relative overflow-hidden"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.15) 20%, rgba(245,158,11,0.2) 40%, rgba(245,158,11,0.35) 60%, rgba(239,68,68,0.3) 75%, rgba(239,68,68,0.5) 100%)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <div className="absolute top-6 right-12 w-10 h-10 rounded-full bg-danger-red/40 border border-danger-red/60" />
                    <div className="absolute top-14 right-24 w-8 h-8 rounded-full bg-caution-amber/30 border border-caution-amber/50" />
                    <div className="absolute bottom-4 left-8 w-6 h-6 rounded-full bg-safe-green/30 border border-safe-green/50" />
                  </div>

                  {/* Timeline bar */}
                  <div className="mt-4 flex items-center gap-0">
                    {['Now', '+2hr', '+4hr', '+6hr'].map((step, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full h-2 rounded-sm"
                          style={{
                            backgroundColor:
                              i === 0
                                ? 'rgba(16,185,129,0.5)'
                                : i === 1
                                  ? 'rgba(245,158,11,0.4)'
                                  : i === 2
                                    ? 'rgba(245,158,11,0.6)'
                                    : 'rgba(239,68,68,0.6)',
                          }}
                        />
                        <span className="text-[10px] text-neutral-500 mt-1 font-mono">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Output specs */}
              <motion.div
                className="bg-deep-navy border border-neutral-700/50 rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Prediction Output
                </span>
                <ul className="mt-3 space-y-2">
                  {[
                    '2-6 hour advance prediction window',
                    'Probability heatmaps per road segment',
                    'Warning scores with configurable alert thresholds',
                    'Continuous recalibration from actual outcomes',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <Activity
                        size={14}
                        className="text-flood-cyan flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Warning callout */}
              <motion.div
                className="bg-caution-amber/10 border border-caution-amber/20 rounded-lg px-4 py-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <p className="font-mono text-caution-amber text-sm">
                  78% flood probability | Nguyen Van Linh | +3.2 hours
                </p>
              </motion.div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ============================================================ */}
        {/* 9. TECH STACK                                                */}
        {/* ============================================================ */}
        <Section id="tech-stack">
          <h2 className="text-3xl font-bold text-white">Technology Stack</h2>
          <p className="text-lg text-neutral-400 mt-2 mb-10">
            Production-grade tools across every layer of the platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techStack.map((row, i) => {
              const Icon = row.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-deep-navy border border-neutral-700/50 rounded-xl p-5 flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-storm-blue" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm mb-3">{row.category}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {row.techs.map((tech, j) => (
                        <span
                          key={j}
                          className="inline-flex px-2.5 py-1 rounded-md bg-slate-dark text-neutral-300 text-xs font-medium border border-neutral-700/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Section>

        <Divider />

        {/* ============================================================ */}
        {/* 10. INFRASTRUCTURE                                           */}
        {/* ============================================================ */}
        <Section id="infrastructure">
          <h2 className="text-3xl font-bold text-white">Infrastructure & Deployment</h2>
          <p className="text-lg text-neutral-400 mt-2 mb-10">
            Cloud-native, containerized, and auto-scaling for real-time workloads.
          </p>

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
                {/* Kubernetes wheel icon */}
                <svg viewBox="0 0 48 48" className="w-12 h-12">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="rgba(6,182,212,0.25)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="6"
                    fill="none"
                    stroke="rgba(6,182,212,0.5)"
                    strokeWidth="1.5"
                  />
                  {Array.from({ length: 7 }).map((_, i) => {
                    const angle = (i * 2 * Math.PI) / 7 - Math.PI / 2;
                    const x1 = 24 + 8 * Math.cos(angle);
                    const y1 = 24 + 8 * Math.sin(angle);
                    const x2 = 24 + 18 * Math.cos(angle);
                    const y2 = 24 + 18 * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="rgba(6,182,212,0.35)"
                        strokeWidth="1.5"
                      />
                    );
                  })}
                </svg>
                <span className="text-sm text-neutral-300 font-semibold tracking-wider uppercase">
                  Kubernetes
                </span>
                <div className="flex flex-col gap-1.5">
                  {['Auto-scaling', 'Self-healing', 'Rolling deploys'].map((feat, i) => (
                    <span key={i} className="text-xs text-neutral-500 text-center">
                      {feat}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Key numbers */}
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
                  <div
                    key={i}
                    className="bg-deep-navy border border-neutral-700/50 rounded-lg p-3 text-center"
                  >
                    <p className="font-mono text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ============================================================ */}
        {/* 11. API OVERVIEW                                             */}
        {/* ============================================================ */}
        <Section id="api">
          <h2 className="text-3xl font-bold text-white">API Reference (Preview)</h2>
          <p className="text-lg text-neutral-400 mt-2 mb-10">
            RESTful endpoints and WebSocket streams for integration with your applications.
          </p>

          <div className="space-y-3">
            {apiEndpoints.map((endpoint, i) => (
              <motion.div
                key={i}
                className="bg-neutral-900 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className={`font-mono text-xs font-bold ${endpoint.methodColor} bg-neutral-800 rounded px-2.5 py-1 w-12 text-center`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="font-mono text-sm text-neutral-300 break-all">
                    {endpoint.path}
                  </code>
                </div>
                <p className="text-xs text-neutral-500 sm:ml-auto sm:text-right flex-shrink-0">
                  {endpoint.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 bg-storm-blue/5 border border-storm-blue/20 rounded-lg px-5 py-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-neutral-400">
              <span className="text-storm-blue font-semibold">Note:</span> Full API documentation
              with interactive playground available to partners and early access customers.
            </p>
          </motion.div>
        </Section>

        <Divider />

        {/* ============================================================ */}
        {/* DEEP DIVE SECTIONS                                           */}
        {/* ============================================================ */}
        <ArchitectureDecisions />
        <Divider />
        <LatencyBudget />
        <Divider />
        <DataFlowDetail />
        <Divider />
        <ScalabilityDesign />
        <Divider />
        <SecurityModel />
        <Divider />
        <MonitoringObservability />
        <Divider />
        <AIDetectionPipeline />
        <Divider />
        <AWSDeployment />
        <Divider />
      </main>
      </div>

      {/* ============================================================ */}
      {/* 12. FOOTER                                                    */}
      {/* ============================================================ */}
      <footer className="lg:ml-60 bg-neutral-900 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Droplets size={20} className="text-storm-blue" strokeWidth={2} />
            <span className="text-sm font-bold text-white tracking-tight">
              SafeMove AI
            </span>
            <span className="text-neutral-600 mx-2">|</span>
            <span className="text-xs text-neutral-500">
              Flood-Aware Mobility Intelligence
            </span>
          </div>

          <Link
            to="/"
            className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
          >
            Back to Home
          </Link>

          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} SafeMove AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
