import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

const layers = [
  {
    label: 'DATA SOURCES',
    modules: [
      { name: 'Camera', detail: 'RTSP 5s' },
      { name: 'Weather', detail: 'REST 15m' },
      { name: 'Historical', detail: 'SQL batch' },
      { name: 'News Crawl', detail: 'NLP 5m' },
      { name: 'User Reports', detail: 'Real-time' },
    ],
    aws: '',
    bg: 'bg-neutral-800',
    border: 'border-neutral-600',
    accent: 'text-neutral-300',
    dot: 'bg-neutral-400',
  },
  {
    label: 'INGESTION',
    modules: [
      { name: 'Event Streaming', detail: 'Kafka' },
      { name: 'IoT Ingest', detail: 'MQTT' },
      { name: 'Webhooks', detail: 'REST' },
    ],
    aws: 'MSK · Kinesis · API Gateway',
    bg: 'bg-caution-amber/8',
    border: 'border-caution-amber/20',
    accent: 'text-caution-amber',
    dot: 'bg-caution-amber',
  },
  {
    label: 'PROCESSING',
    modules: [
      { name: 'Stream', detail: 'Flink <5s' },
      { name: 'Batch', detail: 'Spark hourly' },
      { name: 'Geo-Tag', detail: 'PostGIS' },
      { name: 'Event Fuse', detail: '30s window' },
    ],
    aws: 'Kinesis Analytics · EMR · RDS PostGIS',
    bg: 'bg-flood-cyan/8',
    border: 'border-flood-cyan/20',
    accent: 'text-flood-cyan',
    dot: 'bg-flood-cyan',
  },
  {
    label: 'INTELLIGENCE',
    modules: [
      { name: 'CV Detect', detail: 'YOLOv8' },
      { name: 'LLM Severity', detail: 'Claude' },
      { name: 'Prediction', detail: 'TFT+XGB' },
      { name: 'Agents', detail: 'Multi-agent' },
      { name: 'RL Optimize', detail: 'PPO' },
    ],
    aws: 'SageMaker · Bedrock · Lambda',
    bg: 'bg-storm-blue/8',
    border: 'border-storm-blue/20',
    accent: 'text-storm-blue',
    dot: 'bg-storm-blue',
  },
  {
    label: 'ROUTING',
    modules: [
      { name: 'Google Maps', detail: 'Directions API' },
      { name: 'Flood Penalty', detail: 'Segment weights' },
      { name: 'Route Scorer', detail: 'Time×Safety' },
    ],
    aws: 'ECS Fargate · ElastiCache',
    bg: 'bg-safe-green/8',
    border: 'border-safe-green/20',
    accent: 'text-safe-green',
    dot: 'bg-safe-green',
  },
  {
    label: 'PRESENTATION',
    modules: [
      { name: 'Dashboard', detail: 'React' },
      { name: 'Mobile', detail: 'Push alerts' },
      { name: 'REST API', detail: 'FastAPI' },
      { name: 'WebSocket', detail: 'Real-time' },
    ],
    aws: 'CloudFront · S3 · Amplify · API GW',
    bg: 'bg-critical-magenta/8',
    border: 'border-critical-magenta/20',
    accent: 'text-critical-magenta',
    dot: 'bg-critical-magenta',
  },
  {
    label: 'FEEDBACK',
    modules: [
      { name: 'User Ratings', detail: 'Explicit' },
      { name: 'Route Outcomes', detail: 'Implicit' },
      { name: 'Prediction Accuracy', detail: 'Hourly check' },
    ],
    aws: 'CloudWatch · SageMaker Monitoring',
    bg: 'bg-danger-red/8',
    border: 'border-danger-red/20',
    accent: 'text-danger-red',
    dot: 'bg-danger-red',
  },
];

export default function Slide14Architecture() {
  return (
    <SlideLayout>
      <div className="flex flex-col h-full">
        <motion.h2
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          System Architecture
        </motion.h2>
        <motion.p
          className="text-neutral-400 mt-1 flex items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-lg">Seven layers. One closed loop.</span>
          <span className="px-2 py-0.5 text-[10px] font-bold text-caution-amber bg-caution-amber/10 border border-caution-amber/20 rounded-full uppercase tracking-wider">
            AWS
          </span>
        </motion.p>

        {/* Architecture layers */}
        <div className="flex-1 flex mt-4">
          <div className="w-full flex gap-3">
            {/* Layers stack */}
            <div className="flex-1 flex flex-col gap-0">
              {layers.map((layer, i) => (
                <motion.div
                  key={layer.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  viewport={{ once: true }}
                >
                  {/* Arrow */}
                  {i > 0 && (
                    <div className="flex justify-center py-0.5">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M6 0 L6 4" stroke="#475569" strokeWidth="1.5" />
                        <polygon points="3,3.5 6,8 9,3.5" fill="#475569" />
                      </svg>
                    </div>
                  )}

                  {/* Layer bar */}
                  <div className={`${layer.bg} border ${layer.border} rounded-lg px-3 py-1.5 flex items-center gap-3`}>
                    {/* Layer name */}
                    <div className="flex items-center gap-2 w-24 flex-shrink-0">
                      <div className={`w-1.5 h-1.5 rounded-full ${layer.dot}`} />
                      <span className={`text-[10px] font-bold tracking-wider uppercase ${layer.accent}`}>
                        {layer.label}
                      </span>
                    </div>

                    {/* Modules */}
                    <div className="flex gap-1.5 flex-wrap flex-1">
                      {layer.modules.map((mod) => (
                        <span
                          key={mod.name}
                          className="inline-flex items-center gap-1 text-[10px] bg-neutral-900/60 rounded px-1.5 py-0.5"
                        >
                          <span className="text-white font-medium">{mod.name}</span>
                          <span className="text-neutral-500">{mod.detail}</span>
                        </span>
                      ))}
                    </div>

                    {/* AWS service */}
                    {layer.aws && (
                      <span className="hidden lg:inline text-[9px] font-mono text-caution-amber/60 flex-shrink-0">
                        {layer.aws}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty spacer - feedback loop moved below */}
          </div>
        </div>

        {/* Feedback Loop — horizontal bar with arrows */}
        <motion.div
          className="mt-2 relative"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <div className="bg-danger-red/5 border border-danger-red/20 rounded-lg px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-danger-red animate-pulse" />
              <span className="text-[10px] font-bold text-danger-red uppercase tracking-wider">Feedback Loop</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-neutral-400">
              <span>User ratings</span>
              <span className="text-danger-red/40">→</span>
              <span>Route outcomes</span>
              <span className="text-danger-red/40">→</span>
              <span>Accuracy check</span>
              <span className="text-danger-red/40">→</span>
              <span className="text-danger-red font-semibold">Policy update</span>
              <span className="text-danger-red/40">→</span>
              <span className="text-flood-cyan font-semibold">↑ Back to Intelligence & Data Sources</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom key metrics */}
        <motion.div
          className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-6">
            {[
              { val: '100K+', label: 'events/sec' },
              { val: '< 30s', label: 'end-to-end' },
              { val: '99.9%', label: 'uptime SLA' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-flood-cyan">{s.val}</span>
                <span className="text-[10px] text-neutral-500">{s.label}</span>
              </div>
            ))}
          </div>
          <span className="text-[10px] text-neutral-500 hidden lg:block">
            Camera frame → driver alert in &lt; 30 seconds
          </span>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
