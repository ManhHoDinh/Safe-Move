import { motion } from 'framer-motion';
import { Monitor, Bell, Route, FileText, Smartphone } from 'lucide-react';
import SlideLayout from './SlideLayout';

const features = [
  { icon: Monitor, label: 'Command Center', desc: 'City-wide monitoring', color: 'text-flood-cyan', bg: 'bg-flood-cyan/10', border: 'border-flood-cyan/20' },
  { icon: Bell, label: 'Smart Alerts', desc: 'Push + email + SMS', color: 'text-danger-red', bg: 'bg-danger-red/10', border: 'border-danger-red/20' },
  { icon: Route, label: 'Route Engine', desc: 'Flood-safe pathfinding', color: 'text-safe-green', bg: 'bg-safe-green/10', border: 'border-safe-green/20' },
  { icon: FileText, label: 'Analytics', desc: 'LLM-generated reports', color: 'text-storm-blue', bg: 'bg-storm-blue/10', border: 'border-storm-blue/20' },
  { icon: Smartphone, label: 'Mobile App', desc: 'Flutter + crowd reports', color: 'text-caution-amber', bg: 'bg-caution-amber/10', border: 'border-caution-amber/20' },
];

const alerts = [
  { text: 'Nguyen Hue Blvd — Flood Depth 18cm', severity: 'critical', dot: 'bg-danger-red', glow: 'shadow-[0_0_6px_rgba(239,68,68,0.3)]' },
  { text: 'Le Loi St Bridge — Water Rising', severity: 'warning', dot: 'bg-caution-amber', glow: 'shadow-[0_0_6px_rgba(245,158,11,0.3)]' },
  { text: 'Hai Ba Trung Alt Route — Clear', severity: 'safe', dot: 'bg-safe-green', glow: '' },
];

export default function Slide07Product() {
  return (
    <SlideLayout background="accent">
      <div className="flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-storm-blue border border-storm-blue/30 rounded-full px-3 py-1">
            Product
          </span>
        </motion.div>
        <motion.h2
          className="text-4xl font-bold text-white mt-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Built for Operators &amp; Citizens
        </motion.h2>

        {/* 5 feature cards — horizontal strip */}
        <motion.div
          className="grid grid-cols-5 gap-2 mt-5"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={`${f.bg} border ${f.border} rounded-xl p-3 flex flex-col items-center text-center gap-1.5 group hover:scale-[1.03] transition-transform`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
              viewport={{ once: true }}
            >
              <div className={`w-9 h-9 rounded-lg ${f.bg} border ${f.border} flex items-center justify-center`}>
                <f.icon className={`w-4 h-4 ${f.color}`} strokeWidth={1.5} />
              </div>
              <p className="text-white text-xs font-semibold leading-tight">{f.label}</p>
              <p className="text-neutral-500 text-[10px] leading-tight">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard mockup — takes the rest of space */}
        <motion.div
          className="flex-1 mt-4 min-h-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-deep-navy border border-neutral-700/60 rounded-xl overflow-hidden h-full flex flex-col"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 60px rgba(6,182,212,0.04)' }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-neutral-700/50 bg-slate-dark/50">
              <div className="w-2 h-2 rounded-full bg-danger-red/80" />
              <div className="w-2 h-2 rounded-full bg-caution-amber/80" />
              <div className="w-2 h-2 rounded-full bg-safe-green/80" />
              <span className="text-[10px] text-neutral-500 ml-2 font-mono">SafeMove Command Center — Ho Chi Minh City</span>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-safe-green animate-pulse" />
                <span className="text-[9px] text-safe-green font-mono">LIVE</span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="flex-1 p-3 flex gap-3 min-h-0">
              {/* Left: Stats + Alerts */}
              <div className="w-48 flex-shrink-0 flex flex-col gap-2">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'Active Floods', value: '3', color: 'text-danger-red' },
                    { label: 'Rerouted', value: '847', color: 'text-flood-cyan' },
                    { label: 'Avg Delay', value: '+4m', color: 'text-safe-green' },
                    { label: 'Risk Score', value: '72', color: 'text-caution-amber' },
                  ].map((s, i) => (
                    <div key={i} className="bg-abyss/80 rounded-lg p-2 text-center">
                      <p className="text-[8px] text-neutral-600 uppercase tracking-wider">{s.label}</p>
                      <p className={`font-mono font-bold text-base ${s.color} mt-0.5`}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Alerts */}
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-[8px] text-neutral-600 uppercase tracking-wider font-semibold">Live Alerts</p>
                  {alerts.map((a, i) => (
                    <div key={i} className={`flex items-center gap-1.5 bg-abyss/60 rounded-md px-2 py-1.5 ${a.glow}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${a.dot} flex-shrink-0`} />
                      <span className="text-[9px] text-neutral-300 leading-tight">{a.text}</span>
                    </div>
                  ))}
                </div>

                {/* Camera count */}
                <div className="bg-flood-cyan/5 border border-flood-cyan/15 rounded-lg p-2 text-center">
                  <p className="text-[8px] text-neutral-500 uppercase tracking-wider">Cameras Online</p>
                  <p className="font-mono font-bold text-lg text-flood-cyan">612<span className="text-neutral-600 text-xs">/620</span></p>
                </div>
              </div>

              {/* Right: Map visualization — Ho Chi Minh City */}
              <div className="flex-1 bg-abyss/60 rounded-lg relative overflow-hidden border border-neutral-800">
                {/* Street grid */}
                <div className="absolute inset-0 opacity-[0.08]" style={{
                  backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }} />

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 350" preserveAspectRatio="xMidYMid slice">
                  {/* Saigon River */}
                  <path d="M 0 80 Q 80 60 150 90 Q 220 120 300 85 Q 380 50 500 70" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="18" />
                  <path d="M 0 80 Q 80 60 150 90 Q 220 120 300 85 Q 380 50 500 70" fill="none" stroke="rgba(6,182,212,0.25)" strokeWidth="2" />

                  {/* Major roads */}
                  <line x1="50" y1="0" x2="50" y2="350" stroke="rgba(148,163,184,0.12)" strokeWidth="3" />
                  <line x1="160" y1="0" x2="160" y2="350" stroke="rgba(148,163,184,0.12)" strokeWidth="3" />
                  <line x1="280" y1="0" x2="280" y2="350" stroke="rgba(148,163,184,0.12)" strokeWidth="3" />
                  <line x1="400" y1="0" x2="400" y2="350" stroke="rgba(148,163,184,0.12)" strokeWidth="3" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(148,163,184,0.12)" strokeWidth="3" />
                  <line x1="0" y1="250" x2="500" y2="250" stroke="rgba(148,163,184,0.12)" strokeWidth="3" />
                  {/* Diagonal road */}
                  <line x1="80" y1="350" x2="450" y2="30" stroke="rgba(148,163,184,0.08)" strokeWidth="4" />

                  {/* Flood zones with pulse effect */}
                  <ellipse cx="180" cy="180" rx="55" ry="45" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" strokeDasharray="4,3">
                    <animate attributeName="rx" values="55;60;55" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="ry" values="45;50;45" dur="3s" repeatCount="indefinite" />
                  </ellipse>
                  <ellipse cx="350" cy="230" rx="35" ry="30" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.2)" strokeWidth="1" strokeDasharray="3,3">
                    <animate attributeName="rx" values="35;38;35" dur="4s" repeatCount="indefinite" />
                  </ellipse>
                  <ellipse cx="300" cy="120" rx="25" ry="20" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.2)" strokeWidth="1" strokeDasharray="3,2" />

                  {/* Safe route (green, animated dash) */}
                  <polyline points="40,310 80,270 120,230 170,260 230,220 270,170 330,140 390,110 440,70 480,40" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeDasharray="8,4" opacity="0.8">
                    <animate attributeName="stroke-dashoffset" values="0;-24" dur="1.5s" repeatCount="indefinite" />
                  </polyline>

                  {/* Blocked route (red) */}
                  <polyline points="40,310 100,240 160,180" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeDasharray="4,4" opacity="0.5" />
                  <line x1="150" y1="170" x2="170" y2="190" stroke="#EF4444" strokeWidth="2" opacity="0.6" />
                  <line x1="170" y1="170" x2="150" y2="190" stroke="#EF4444" strokeWidth="2" opacity="0.6" />

                  {/* Camera dots with glow */}
                  {[[70,140],[130,200],[200,130],[250,250],[310,170],[370,220],[420,130],[90,290],[340,300],[460,180],[150,110],[380,60]].map(([x,y], i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r="5" fill="rgba(6,182,212,0.1)" />
                      <circle cx={x} cy={y} r="2.5" fill="#06B6D4" opacity="0.6" />
                    </g>
                  ))}

                  {/* District labels */}
                  <text x="100" y="160" fill="rgba(148,163,184,0.3)" fontSize="9" fontFamily="monospace">D.1</text>
                  <text x="250" y="200" fill="rgba(148,163,184,0.3)" fontSize="9" fontFamily="monospace">D.3</text>
                  <text x="380" y="260" fill="rgba(148,163,184,0.3)" fontSize="9" fontFamily="monospace">D.7</text>
                  <text x="420" y="100" fill="rgba(148,163,184,0.3)" fontSize="9" fontFamily="monospace">D.2</text>

                  {/* Flood labels */}
                  <text x="155" y="175" fill="#EF4444" fontSize="9" fontWeight="bold" fontFamily="monospace" opacity="0.8">FLOOD</text>
                  <text x="330" y="225" fill="#EF4444" fontSize="8" fontWeight="bold" fontFamily="monospace" opacity="0.6">FLOOD</text>
                  <text x="285" y="115" fill="#F59E0B" fontSize="7" fontFamily="monospace" opacity="0.5">RISK</text>

                  {/* Route labels */}
                  <text x="25" y="325" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="monospace">A</text>
                  <text x="470" y="35" fill="#2563EB" fontSize="9" fontWeight="bold" fontFamily="monospace">B</text>
                  <text x="400" y="60" fill="#10B981" fontSize="7" fontFamily="monospace" opacity="0.7">Safe Route</text>
                  <text x="100" y="260" fill="#EF4444" fontSize="6" fontFamily="monospace" opacity="0.5">Blocked</text>
                </svg>

                {/* Map label overlay */}
                <div className="absolute bottom-2 left-2 bg-abyss/80 backdrop-blur-sm border border-neutral-700/50 rounded px-2 py-0.5">
                  <span className="text-[8px] text-neutral-400 font-mono">Ho Chi Minh City — Real-time Flood Map</span>
                </div>
                <div className="absolute top-2 right-2 bg-abyss/80 backdrop-blur-sm border border-neutral-700/50 rounded px-2 py-0.5 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-safe-green animate-pulse" />
                  <span className="text-[7px] text-safe-green font-mono">12 CAMERAS ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
