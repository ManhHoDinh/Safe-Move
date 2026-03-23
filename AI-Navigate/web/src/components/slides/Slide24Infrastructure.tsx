import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

const layers = [
  {
    name: 'Clients',
    tech: 'Mobile App | React Dashboard | API Consumers',
    aws: '',
    bg: 'bg-neutral-800',
    border: 'border-neutral-700',
  },
  {
    name: 'CDN & Hosting',
    tech: 'Static assets | Global edge delivery',
    aws: 'CloudFront + S3 + Amplify',
    bg: 'bg-caution-amber/10',
    border: 'border-caution-amber/20',
  },
  {
    name: 'API Gateway',
    tech: 'REST | WebSocket | GraphQL | Auth',
    aws: 'API Gateway + Cognito + ALB',
    bg: 'bg-storm-blue/10',
    border: 'border-storm-blue/20',
  },
  {
    name: 'Application',
    tech: 'Routing | Detection | Prediction | Agents | LLM',
    aws: 'ECS Fargate + Lambda + SageMaker',
    bg: 'bg-flood-cyan/10',
    border: 'border-flood-cyan/20',
  },
  {
    name: 'Processing',
    tech: 'Stream (real-time) | Batch (historical)',
    aws: 'MSK (Kafka) + Kinesis + EMR (Spark)',
    bg: 'bg-safe-green/10',
    border: 'border-safe-green/20',
  },
  {
    name: 'Storage',
    tech: 'Hot cache | Time-series | Cold archive',
    aws: 'ElastiCache (Redis) + RDS + S3',
    bg: 'bg-storm-blue/10',
    border: 'border-storm-blue/20',
  },
  {
    name: 'Observability',
    tech: 'Metrics | Logs | Traces | Alerts',
    aws: 'CloudWatch + X-Ray + SNS',
    bg: 'bg-danger-red/10',
    border: 'border-danger-red/20',
  },
];

const stats = [
  { value: '100K+', label: 'events/sec' },
  { value: '< 30s', label: 'end-to-end' },
  { value: '99.9%', label: 'uptime SLA' },
  { value: 'Auto', label: 'scaling' },
];

export default function Slide24Infrastructure() {
  return (
    <SlideLayout>
      <div className="flex flex-col h-full">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white">Infrastructure</h2>
          <span className="px-3 py-1 text-xs font-bold text-caution-amber bg-caution-amber/10 border border-caution-amber/20 rounded-full uppercase tracking-wider">
            AWS
          </span>
        </motion.div>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Hosted on AWS. Cloud-native. Auto-scaling. Production-grade.
        </motion.p>

        <div className="flex-1 flex items-center mt-4">
          <div className="w-full flex gap-5">
            {/* Main stack */}
            <div className="flex-1 flex flex-col gap-0">
              {layers.map((layer, i) => (
                <div key={layer.name}>
                  {i > 0 && (
                    <motion.div
                      className="flex justify-center py-0.5"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-neutral-600 text-xs">▼</span>
                    </motion.div>
                  )}
                  <motion.div
                    className={`${layer.bg} border ${layer.border} rounded-lg px-4 py-2.5 flex items-center justify-between gap-2`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-white font-bold text-xs uppercase tracking-wider">
                        {layer.name}
                      </span>
                      <span className="text-neutral-500 text-[10px] ml-2 hidden lg:inline">
                        {layer.tech}
                      </span>
                    </div>
                    {layer.aws && (
                      <span className="flex-shrink-0 text-[10px] font-mono text-caution-amber/80 bg-caution-amber/5 px-2 py-0.5 rounded border border-caution-amber/10">
                        {layer.aws}
                      </span>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Right side — AWS badge */}
            <motion.div
              className="hidden lg:flex flex-col items-center justify-center w-40"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="border border-caution-amber/30 border-dashed rounded-xl px-4 py-5 flex flex-col items-center gap-3 bg-caution-amber/5">
                {/* AWS logo text */}
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-caution-amber tracking-tight">AWS</span>
                  <span className="text-[10px] text-neutral-500 mt-0.5">Amazon Web Services</span>
                </div>

                <div className="w-full h-px bg-caution-amber/20 my-1" />

                <div className="flex flex-col gap-1.5 w-full">
                  {['ECS Fargate', 'SageMaker', 'MSK (Kafka)', 'CloudFront', 'ElastiCache', 'S3 + RDS'].map((svc) => (
                    <span key={svc} className="text-[9px] font-mono text-neutral-400 text-center bg-slate-dark rounded px-2 py-0.5">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tech brand logos */}
        <motion.div
          className="flex items-center justify-center gap-6 flex-wrap mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <img src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23FF9900%22%3E%3Cpath d=%22M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.374 6.18 6.18 0 0 1-.248-.467c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.296.072-.584.16-.863.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.343c0-.136.064-.21.191-.21h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.128 0 .2.072.2.21 0 .04-.008.08-.016.128a1.137 1.137 0 0 1-.056.216l-1.923 6.17c-.048.16-.104.264-.168.312a.549.549 0 0 1-.32.08h-.687c-.152 0-.256-.024-.32-.08-.063-.056-.12-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.216-.151-.248-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415A3.48 3.48 0 0 1 18.407 6c.183 0 .375.008.559.024.191.016.367.048.543.08.168.04.327.08.479.128.152.048.272.096.352.144a.75.75 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.694 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.742.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.97-9.722 2.97-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.271-.351 3.384 1.963 7.559 3.153 11.878 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.606z%22/%3E%3Cpath d=%22M22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.216.184-.423.088-.327-.151.319-.79 1.03-2.57.695-2.994z%22/%3E%3C/svg%3E" className="h-5 opacity-60 hover:opacity-100 transition-opacity" title="AWS" alt="AWS" />
          <img src="https://cdn.simpleicons.org/docker/2496ED" className="h-5 opacity-60 hover:opacity-100 transition-opacity" title="Docker" alt="Docker" />
          <img src="https://cdn.simpleicons.org/apachekafka/231F20" className="h-5 opacity-60 hover:opacity-100 transition-opacity" title="Apache Kafka" alt="Apache Kafka" style={{ filter: 'invert(1) brightness(0.7)' }} />
          <img src="https://cdn.simpleicons.org/postgresql/4169E1" className="h-5 opacity-60 hover:opacity-100 transition-opacity" title="PostgreSQL" alt="PostgreSQL" />
          <img src="https://cdn.simpleicons.org/redis/DC382D" className="h-5 opacity-60 hover:opacity-100 transition-opacity" title="Redis" alt="Redis" />
          <img src="https://cdn.simpleicons.org/supabase/3FCF8E" className="h-5 opacity-60 hover:opacity-100 transition-opacity" title="Supabase" alt="Supabase" />
          <img src="https://cdn.simpleicons.org/firebase/FFCA28" className="h-5 opacity-60 hover:opacity-100 transition-opacity" title="Firebase" alt="Firebase" />
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          className="flex items-center justify-center gap-8 mt-4 pt-4 border-t border-neutral-800"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-mono text-lg font-bold text-flood-cyan">{s.value}</div>
              <div className="text-[10px] text-neutral-500">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </SlideLayout>
  );
}
