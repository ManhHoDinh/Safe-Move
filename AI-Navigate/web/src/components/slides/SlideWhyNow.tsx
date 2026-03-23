import { motion } from 'framer-motion';
import { CloudRain, Building2, Brain } from 'lucide-react';
import SlideLayout from './SlideLayout';

const topCards = [
  {
    icon: CloudRain,
    number: '01',
    title: 'Climate Acceleration',
    description:
      'Flood frequency and severity are accelerating faster than cities can adapt with legacy infrastructure.',
    accent: 'caution-amber',
    borderColor: 'rgba(245,158,11,0.3)',
    glowColor: 'rgba(245,158,11,0.08)',
    iconColor: '#F59E0B',
    numberColor: 'text-caution-amber/40',
    titleColor: 'text-caution-amber',
  },
  {
    icon: Building2,
    number: '02',
    title: 'Smart City Investment Wave',
    description:
      'Global smart city budgets are exceeding $2.5T by 2030, creating procurement windows for real-time urban intelligence.',
    accent: 'storm-blue',
    borderColor: 'rgba(37,99,235,0.3)',
    glowColor: 'rgba(37,99,235,0.08)',
    iconColor: '#2563EB',
    numberColor: 'text-storm-blue/40',
    titleColor: 'text-storm-blue',
  },
  {
    icon: Brain,
    number: '03',
    title: 'AI/LLM Maturity',
    description:
      'Foundation models and multimodal AI have reached the reliability threshold required for safety-critical routing decisions.',
    accent: 'flood-cyan',
    borderColor: 'rgba(6,182,212,0.3)',
    glowColor: 'rgba(6,182,212,0.08)',
    iconColor: '#06B6D4',
    numberColor: 'text-flood-cyan/40',
    titleColor: 'text-flood-cyan',
  },
];

const bottomCards = [
  {
    title: 'Camera Infrastructure Exists',
    description:
      'Cities already have dense CCTV and traffic-cam networks — we turn sunk costs into real-time flood sensors at zero hardware overhead.',
    borderColor: 'rgba(34,197,94,0.3)',
    glowColor: 'rgba(34,197,94,0.06)',
    iconColor: '#22C55E',
    titleColor: 'text-safe-green',
    dotColor: 'bg-safe-green',
  },
  {
    title: 'Zero Incumbents',
    description:
      'No competitor offers flood-aware mobility intelligence at city scale. The window to establish category leadership is open now.',
    borderColor: 'rgba(239,68,68,0.3)',
    glowColor: 'rgba(239,68,68,0.06)',
    iconColor: '#EF4444',
    titleColor: 'text-danger-red',
    dotColor: 'bg-danger-red',
  },
];

export default function SlideWhyNow() {
  return (
    <SlideLayout>
      <div className="flex flex-col h-full">
        {/* Section tag */}
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-caution-amber/10 border border-caution-amber/30 text-caution-amber text-xs font-mono font-semibold uppercase tracking-widest">
            Timing
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
          Why Now?
        </motion.h2>

        {/* Top 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
          {topCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.number}
                className="relative bg-slate-dark/80 border rounded-2xl p-6 flex flex-col gap-4 overflow-hidden"
                style={{ borderColor: card.borderColor }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                viewport={{ once: true }}
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: card.glowColor }}
                />

                {/* Number + icon row */}
                <div className="relative flex items-center justify-between">
                  <span className={`font-mono font-bold text-5xl ${card.numberColor} select-none`}>
                    {card.number}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${card.iconColor}18`, border: `1px solid ${card.borderColor}` }}
                  >
                    <Icon size={20} style={{ color: card.iconColor }} />
                  </div>
                </div>

                {/* Title */}
                <h3 className={`relative font-semibold text-lg leading-snug ${card.titleColor}`}>
                  {card.title}
                </h3>

                {/* Description */}
                <p className="relative text-sm text-neutral-400 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          {bottomCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="relative bg-slate-dark/80 border rounded-2xl px-6 py-5 flex items-start gap-4 overflow-hidden"
              style={{ borderColor: card.borderColor }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.56 + i * 0.12 }}
              viewport={{ once: true }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: card.glowColor }}
              />

              {/* Dot indicator */}
              <div className="relative mt-1 flex-shrink-0">
                <span className={`block w-2.5 h-2.5 rounded-full ${card.dotColor}`} />
              </div>

              <div className="relative">
                <h3 className={`font-semibold text-base ${card.titleColor}`}>{card.title}</h3>
                <p className="text-sm text-neutral-400 mt-1 leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
