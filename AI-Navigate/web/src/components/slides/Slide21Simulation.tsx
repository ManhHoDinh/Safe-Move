import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

const metrics = [
  { label: 'Avg Travel Time', current: '28 min', simulated: '52 min', delta: '+86%' },
  { label: 'Affected Vehicles', current: '3.2K', simulated: '18.7K', delta: '+484%' },
  { label: 'Alt Capacity', current: 'High', simulated: 'Critical', delta: '⚠' },
];

function CityGrid({
  label,
  labelColor,
  floodZones,
  routeColor,
  routePoints,
}: {
  label: string;
  labelColor: string;
  floodZones: { x: number; y: number; r: number }[];
  routeColor: string;
  routePoints: string;
}) {
  return (
    <div className="bg-slate-dark border border-neutral-700 rounded-xl overflow-hidden flex-1">
      <div className="px-4 py-2.5 border-b border-neutral-700">
        <span className={`text-xs font-semibold uppercase tracking-wider ${labelColor}`}>
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
          {/* Route */}
          <polyline
            points={routePoints}
            fill="none"
            stroke={routeColor}
            strokeWidth="2"
            strokeDasharray="6,3"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Slide21Simulation() {
  const currentFloodZones = [
    { x: 80, y: 45, r: 16 },
    { x: 140, y: 115, r: 18 },
  ];

  const simFloodZones = [
    { x: 80, y: 45, r: 18 },
    { x: 140, y: 115, r: 22 },
    { x: 55, y: 80, r: 16 },
    { x: 160, y: 60, r: 14 },
    { x: 100, y: 120, r: 12 },
    { x: 35, y: 30, r: 15 },
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
          Simulation Engine
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Test before you deploy. Digital twin for your city.
        </motion.p>

        <div className="flex-1 flex flex-col justify-center mt-6">
          {/* Side-by-side comparison cards */}
          <div className="flex flex-col lg:flex-row gap-6">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <CityGrid
                label="Current Reality"
                labelColor="text-safe-green"
                floodZones={currentFloodZones}
                routeColor="#10B981"
                routePoints="20,120 50,120 50,80 100,80 150,80 150,40 180,40"
              />
            </motion.div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <CityGrid
                label="Simulation: 150mm/hr"
                labelColor="text-caution-amber"
                floodZones={simFloodZones}
                routeColor="#F59E0B"
                routePoints="20,120 50,120 50,140 100,140 100,80 150,80 180,80"
              />
            </motion.div>
          </div>

          {/* Comparison metrics table */}
          <motion.div
            className="bg-slate-dark border border-neutral-700 rounded-lg overflow-hidden mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Table header */}
            <div className="grid grid-cols-4 gap-0 px-4 py-2 border-b border-neutral-700 bg-neutral-800/50">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Metric
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 text-center">
                Current
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 text-center">
                Simulated
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 text-center">
                Delta
              </span>
            </div>
            {/* Table rows */}
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                className={`grid grid-cols-4 gap-0 px-4 py-2.5 ${
                  i < metrics.length - 1 ? 'border-b border-neutral-700/50' : ''
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-sm text-neutral-300">{m.label}</span>
                <span className="text-sm font-mono text-neutral-400 text-center">
                  {m.current}
                </span>
                <span className="text-sm font-mono text-white text-center font-semibold">
                  {m.simulated}
                </span>
                <span className="text-sm font-mono text-danger-red text-center font-bold">
                  {m.delta}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
