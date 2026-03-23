import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Code,
  ChevronDown,
  Database,
  BrainCircuit,
  Map,
  Server,
  Activity,
  Shield,
  ArrowRight,
  ExternalLink,
  FileText,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Architecture layer data                                            */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Explore cards                                                      */
/* ------------------------------------------------------------------ */
const exploreCards = [
  {
    title: 'Data Pipeline',
    desc: 'Five data sources with real-time and batch processing',
    icon: Database,
    href: '/technology/data-pipeline',
    color: 'text-flood-cyan',
    bg: 'bg-flood-cyan/5',
    border: 'border-flood-cyan/20',
  },
  {
    title: 'Flood Detection & LLM',
    desc: 'Multi-source detection meets LLM severity reasoning',
    icon: BrainCircuit,
    href: '/technology/flood-detection',
    color: 'text-storm-blue',
    bg: 'bg-storm-blue/5',
    border: 'border-storm-blue/20',
  },
  {
    title: 'Routing Intelligence',
    desc: 'Google Maps augmented with flood penalty scoring',
    icon: Map,
    href: '/technology/routing',
    color: 'text-safe-green',
    bg: 'bg-safe-green/5',
    border: 'border-safe-green/20',
  },
  {
    title: 'Infrastructure',
    desc: 'Cloud-native, containerized, auto-scaling deployment',
    icon: Server,
    href: '/technology/infrastructure',
    color: 'text-caution-amber',
    bg: 'bg-caution-amber/5',
    border: 'border-caution-amber/20',
  },
  {
    title: 'Performance & Latency',
    desc: 'End-to-end latency budget and optimization targets',
    icon: Activity,
    href: '/technology/performance',
    color: 'text-danger-red',
    bg: 'bg-danger-red/5',
    border: 'border-danger-red/20',
  },
  {
    title: 'Security & Observability',
    desc: 'Data privacy, SLOs, and monitoring stack',
    icon: Shield,
    href: '/technology/security',
    color: 'text-critical-magenta',
    bg: 'bg-critical-magenta/5',
    border: 'border-critical-magenta/20',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function TechOverview() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <Section className="pt-8 pb-4 text-center">
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
          className="text-4xl md:text-5xl font-bold text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          How SafeMove AI Works
        </motion.h1>

        <motion.p
          className="text-lg text-neutral-400 mt-6 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          A technical deep-dive into the architecture, data pipeline, and intelligence
          systems powering flood-aware urban mobility.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ChevronDown size={28} className="mx-auto text-neutral-600 animate-bounce" />
        </motion.div>
      </Section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-storm-blue/30 to-transparent" />

      {/* System Architecture */}
      <Section>
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

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-storm-blue/30 to-transparent" />

      {/* Explore the system */}
      <Section>
        <h2 className="text-3xl font-bold text-white">Explore the System</h2>
        <p className="text-lg text-neutral-400 mt-2 mb-10">
          Deep-dive into each layer of the platform.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exploreCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                viewport={{ once: true }}
              >
                <Link
                  to={card.href}
                  className={`block ${card.bg} border ${card.border} rounded-xl p-6 hover:bg-white/5 transition-colors duration-200 group h-full`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={20} className={card.color} strokeWidth={1.5} />
                    <h3 className="text-white font-semibold text-sm group-hover:text-storm-blue transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">{card.desc}</p>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${card.color}`}>
                    Read more <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Published Research */}
      <Section>
        <div className="bg-safe-green/5 border border-safe-green/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={20} className="text-safe-green" />
            <h3 className="text-lg font-bold text-white">Published Research — IEEE ICCAIS 2024</h3>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed mb-4">
            <span className="text-white font-medium">"UIT-VisDrone-Flood: A Synthesized Aerial Vehicle Detection Dataset Under Flood Conditions"</span> — 7,411 synthetic flood images generated via ClimateGAN + SAM. CNN-based flood detection with ~90% accuracy on 600+ traffic cameras in Ho Chi Minh City.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://ieeexplore.ieee.org/document/10814214"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-flood-cyan/10 border border-flood-cyan/30 text-xs font-semibold text-flood-cyan hover:bg-flood-cyan/20 transition-colors"
            >
              <ExternalLink size={12} /> IEEE Xplore
            </a>
            <a
              href="https://ami.gov.vn/wp-content/uploads/2024/11/TA03-2-compressed.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-storm-blue/10 border border-storm-blue/30 text-xs font-semibold text-storm-blue hover:bg-storm-blue/20 transition-colors"
            >
              <FileText size={12} /> Full Paper PDF
            </a>
            <a
              href="https://universe.roboflow.com/uit-2pejh/uit-flooded-visdrone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safe-green/10 border border-safe-green/30 text-xs font-semibold text-safe-green hover:bg-safe-green/20 transition-colors"
            >
              <Database size={12} /> Dataset
            </a>
            <a
              href="https://huggingface.co/spaces/ManhHoDinh/floodTrafficSolution"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-caution-amber/10 border border-caution-amber/30 text-xs font-semibold text-caution-amber hover:bg-caution-amber/20 transition-colors"
            >
              <ExternalLink size={12} /> Live Demo
            </a>
          </div>
        </div>
      </Section>

      {/* Next page */}
      <div className="pt-8 border-t border-neutral-800">
        <Link
          to="/technology/data-pipeline"
          className="inline-flex items-center gap-2 text-sm font-medium text-storm-blue hover:text-white transition-colors"
        >
          Next: Data Pipeline <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
