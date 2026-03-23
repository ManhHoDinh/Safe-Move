import { motion } from 'framer-motion';
import { Camera, Brain, Layers } from 'lucide-react';
import SlideLayout from './SlideLayout';

const statCards = [
  {
    icon: Camera,
    value: '600+',
    label: 'Cameras Integrated',
    color: 'storm-blue',
    colorHex: '#2563EB',
    tag: 'Live System',
  },
  {
    icon: Brain,
    value: '~90%',
    label: 'Detection Accuracy',
    color: 'caution-amber',
    colorHex: '#F59E0B',
    tag: 'AI-Powered',
  },
  {
    icon: Layers,
    value: '7',
    label: 'Microservices',
    color: 'flood-cyan',
    colorHex: '#06B6D4',
    tag: 'Full Stack',
  },
];

const techLogos = [
  { name: 'openai', hex: '412991', label: 'OpenAI', svg: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23412991%22%3E%3Cpath d=%22M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z%22/%3E%3C/svg%3E' },
  { name: 'aws', hex: 'FF9900', label: 'AWS', svg: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23FF9900%22%3E%3Cpath d=%22M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.374 6.18 6.18 0 0 1-.248-.467c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.296.072-.584.16-.863.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.343c0-.136.064-.21.191-.21h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.128 0 .2.072.2.21 0 .04-.008.08-.016.128a1.137 1.137 0 0 1-.056.216l-1.923 6.17c-.048.16-.104.264-.168.312a.549.549 0 0 1-.32.08h-.687c-.152 0-.256-.024-.32-.08-.063-.056-.12-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.216-.151-.248-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415A3.48 3.48 0 0 1 18.407 6c.183 0 .375.008.559.024.191.016.367.048.543.08.168.04.327.08.479.128.152.048.272.096.352.144a.75.75 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.694 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.742.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.97-9.722 2.97-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.271-.351 3.384 1.963 7.559 3.153 11.878 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.606z%22/%3E%3Cpath d=%22M22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.216.184-.423.088-.327-.151.319-.79 1.03-2.57.695-2.994z%22/%3E%3C/svg%3E' },
  { name: 'python', hex: '3776AB', label: 'Python' },
  { name: 'tensorflow', hex: 'FF6F00', label: 'TensorFlow' },
  { name: 'flutter', hex: '02569B', label: 'Flutter' },
  { name: 'react', hex: '61DAFB', label: 'React' },
  { name: 'fastapi', hex: '009688', label: 'FastAPI' },
  { name: 'docker', hex: '2496ED', label: 'Docker' },
  { name: 'googlemaps', hex: '4285F4', label: 'Google Maps' },
  { name: 'firebase', hex: 'FFCA28', label: 'Firebase' },
  { name: 'postgresql', hex: '4169E1', label: 'PostgreSQL' },
  { name: 'redis', hex: 'DC382D', label: 'Redis' },
];

const bottomStats = [
  { value: '600+', label: 'cameras' },
  { value: '~90%', label: 'accuracy' },
  { value: '<5s', label: 'latency' },
  { value: '12s', label: 'refresh' },
];

export default function SlideTraction() {
  return (
    <SlideLayout slideNumber={6}>
      <div className="flex flex-col h-full justify-between py-2">

        {/* Section badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex items-start"
        >
          <span className="inline-block bg-safe-green/20 text-safe-green text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-safe-green/30">
            Built
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-4xl font-bold text-white mt-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Built in 48 Hours.{' '}
          <span className="text-safe-green">Production-Ready.</span>
        </motion.h2>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-5 mt-6">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                className="relative bg-slate-dark/80 border border-neutral-700/50 rounded-2xl p-6 flex flex-col gap-3 overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                viewport={{ once: true }}
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-20"
                  style={{
                    boxShadow: `inset 0 0 30px ${card.colorHex}20, 0 0 15px ${card.colorHex}10`,
                  }}
                />

                {/* Icon + tag row */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${card.colorHex}20` }}
                  >
                    <Icon
                      size={20}
                      style={{ color: card.colorHex }}
                    />
                  </div>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border"
                    style={{
                      color: card.colorHex,
                      borderColor: `${card.colorHex}40`,
                      backgroundColor: `${card.colorHex}12`,
                    }}
                  >
                    {card.tag}
                  </span>
                </div>

                {/* Value */}
                <div
                  className="font-mono font-bold text-5xl lg:text-6xl leading-none"
                  style={{ color: card.colorHex }}
                >
                  {card.value}
                </div>

                {/* Label */}
                <div className="text-sm text-neutral-400 font-medium leading-snug">
                  {card.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech logo row */}
        <motion.div
          className="flex items-center justify-center gap-5 mt-6 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {techLogos.map((logo, i) => (
            <motion.img
              key={logo.name}
              src={'svg' in logo && logo.svg ? logo.svg : `https://cdn.simpleicons.org/${logo.name}/${logo.hex}`}
              alt={logo.label}
              title={logo.label}
              className="h-5 opacity-70 hover:opacity-100 transition-opacity duration-200"
              style={'invert' in logo && logo.invert ? { filter: 'invert(1) brightness(0.8)' } : undefined}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              transition={{ duration: 0.3, delay: 0.65 + i * 0.04 }}
              viewport={{ once: true }}
            />
          ))}
        </motion.div>

        {/* Bottom stats bar */}
        <motion.div
          className="mt-6 grid grid-cols-4 divide-x divide-neutral-700/50 bg-slate-dark/60 border border-neutral-700/40 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {bottomStats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-4 px-6 text-center"
            >
              <span className="font-mono font-bold text-xl text-white">
                {stat.value}
              </span>
              <span className="text-xs text-neutral-500 uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </SlideLayout>
  );
}
