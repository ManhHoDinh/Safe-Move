import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

const metrics = [
  { label: 'Avg Travel Time', current: '47 min', simulated: '32 min', change: '-32%' },
  { label: 'Affected Vehicles', current: '12,400', simulated: '3,100', change: '-75%' },
  { label: 'Road Capacity', current: '38%', simulated: '71%', change: '+87%' },
];

function GridMap({ floodZones, label }: { floodZones: { x: number; y: number; r: number }[]; label: string }) {
  return (
    <div className="bg-slate-dark border border-neutral-700 rounded-lg overflow-hidden">
      <div className="px-4 py-2 border-b border-neutral-700">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {label}
        </span>
      </div>
      <div className="p-4">
        <svg viewBox="0 0 200 150" className="w-full h-auto">
          {/* Grid lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={(i + 1) * 20}
              y1="0"
              x2={(i + 1) * 20}
              y2="150"
              stroke="rgba(51,65,85,0.5)"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={(i + 1) * 20}
              x2="200"
              y2={(i + 1) * 20}
              stroke="rgba(51,65,85,0.5)"
              strokeWidth="0.5"
            />
          ))}
          {/* Roads */}
          <line x1="20" y1="40" x2="180" y2="40" stroke="#475569" strokeWidth="2" />
          <line x1="20" y1="80" x2="180" y2="80" stroke="#475569" strokeWidth="2" />
          <line x1="20" y1="120" x2="180" y2="120" stroke="#475569" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="140" stroke="#475569" strokeWidth="2" />
          <line x1="100" y1="10" x2="100" y2="140" stroke="#475569" strokeWidth="2" />
          <line x1="150" y1="10" x2="150" y2="140" stroke="#475569" strokeWidth="2" />
          {/* Flood zones */}
          {floodZones.map((zone, i) => (
            <circle
              key={i}
              cx={zone.x}
              cy={zone.y}
              r={zone.r}
              fill="rgba(239,68,68,0.25)"
              stroke="rgba(239,68,68,0.5)"
              strokeWidth="1"
            />
          ))}
          {/* Safe route */}
          <polyline
            points="20,120 50,120 50,80 100,80 150,80 150,40 180,40"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="6,3"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Slide05Simulation() {
  const currentFloodZones = [
    { x: 80, y: 45, r: 18 },
    { x: 140, y: 115, r: 22 },
  ];

  const simFloodZones = [
    { x: 80, y: 45, r: 18 },
    { x: 140, y: 115, r: 22 },
    { x: 55, y: 80, r: 16 },
    { x: 160, y: 60, r: 20 },
    { x: 100, y: 120, r: 14 },
  ];

  return (
    <SlideLayout background="map">
      <div className="flex flex-col h-full">
        <motion.h2
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Test Before You Deploy
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Run flood scenarios on a digital twin before they happen in the real
          world.
        </motion.p>

        <div className="flex-1 flex flex-col justify-center mt-6">
          {/* Split view maps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <GridMap floodZones={currentFloodZones} label="Current Reality" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <GridMap floodZones={simFloodZones} label="Simulation — Worst Case" />
            </motion.div>
          </div>

          {/* Comparison metrics */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                className="bg-slate-dark border border-neutral-700 rounded-lg p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-xs uppercase tracking-wider text-neutral-400">
                  {m.label}
                </p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="font-mono text-neutral-500 text-sm">
                    {m.current}
                  </span>
                  <span className="text-neutral-600">&rarr;</span>
                  <span className="font-mono text-white text-sm font-semibold">
                    {m.simulated}
                  </span>
                </div>
                <span className="font-mono text-safe-green text-sm font-bold mt-1 inline-block">
                  {m.change}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
