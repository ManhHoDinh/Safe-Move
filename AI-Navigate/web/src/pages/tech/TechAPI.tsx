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

export default function TechAPI() {
  return (
    <div className="space-y-16">
      <Section>
        <h1 className="text-4xl font-bold text-white">API Reference (Preview)</h1>
        <p className="text-lg text-neutral-400 mt-3">
          RESTful endpoints and WebSocket streams for integration with your applications.
        </p>
      </Section>

      <Section>
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

      {/* Next page */}
      <div className="pt-8 border-t border-neutral-800">
        <Link
          to="/technology/decisions"
          className="inline-flex items-center gap-2 text-sm font-medium text-storm-blue hover:text-white transition-colors"
        >
          Next: Architecture Decisions <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
