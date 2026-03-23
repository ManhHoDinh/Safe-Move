import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Globe,
  Server,
  BrainCircuit,
  Database,
  Map,
  Container,
  Eye,
  Wifi,
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

export default function TechStack() {
  return (
    <div className="space-y-16">
      <Section>
        <h1 className="text-4xl font-bold text-white">Technology Stack</h1>
        <p className="text-lg text-neutral-400 mt-3">
          Production-grade tools across every layer of the platform.
        </p>
      </Section>

      <Section>
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

      {/* Next page */}
      <div className="pt-8 border-t border-neutral-800">
        <Link
          to="/technology/infrastructure"
          className="inline-flex items-center gap-2 text-sm font-medium text-storm-blue hover:text-white transition-colors"
        >
          Next: Infrastructure <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
