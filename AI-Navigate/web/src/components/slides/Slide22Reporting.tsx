import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

const kpis = [
  { value: '12', label: 'Active Floods', color: 'text-danger-red' },
  { value: '4,200', label: 'Rerouted', color: 'text-flood-cyan' },
  { value: '18 min', label: 'Saved', color: 'text-safe-green' },
];

const regulations = [
  { text: 'Close NB Vo Van Kiet at 14:30', status: 'PENDING', statusColor: 'bg-caution-amber/20 text-caution-amber' },
  { text: 'Extend green phase Tran HD +15s', status: 'ACTIVE', statusColor: 'bg-safe-green/20 text-safe-green' },
  { text: 'Activate detour Route B-7', status: 'ACTIVE', statusColor: 'bg-safe-green/20 text-safe-green' },
];

const trendMonths = [
  { label: 'Oct', height: 40 },
  { label: 'Nov', height: 65 },
  { label: 'Dec', height: 85 },
  { label: 'Jan', height: 55 },
  { label: 'Feb', height: 30 },
  { label: 'Mar', height: 70 },
];

export default function Slide22Reporting() {
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
          Reporting &amp; Analytics
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Auto-generated. LLM-written. Decision-ready.
        </motion.p>

        <div className="flex-1 flex flex-col gap-4 mt-6">
          {/* LLM Summary */}
          <motion.div
            className="bg-slate-dark border border-neutral-700 rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-neutral-300 italic text-sm leading-relaxed">
              &ldquo;Today&rsquo;s assessment: 3 active flood zones in District 7. 4,200 vehicles
              rerouted. Average 18 minutes saved per trip. Recommendation: extend traffic
              signal adjustment on Tran Hung Dao until 18:00.&rdquo;
            </p>
          </motion.div>

          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-4">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                className="bg-slate-dark border border-neutral-700 rounded-lg p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <p className={`font-mono text-3xl font-bold ${kpi.color}`}>
                  {kpi.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-neutral-500 mt-1">
                  {kpi.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom row: Regulation Suggestions + Trend Analysis */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Regulation Suggestions */}
            <motion.div
              className="bg-slate-dark border border-neutral-700 rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="px-4 py-2.5 border-b border-neutral-700">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Regulation Suggestions
                </span>
              </div>
              <div className="p-4 space-y-3">
                {regulations.map((reg, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-neutral-300 flex-1 min-w-0">
                      {reg.text}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${reg.statusColor} flex-shrink-0`}
                    >
                      {reg.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trend Analysis */}
            <motion.div
              className="bg-slate-dark border border-neutral-700 rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="px-4 py-2.5 border-b border-neutral-700">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Trend Analysis
                </span>
              </div>
              <div className="p-4 flex items-end justify-between gap-2 h-[calc(100%-40px)]">
                {trendMonths.map((month, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center flex-1 gap-1 justify-end h-full"
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: 'bottom' }}
                  >
                    <div className="flex-1 w-full flex items-end justify-center">
                      <div
                        className="w-full max-w-[28px] rounded-t"
                        style={{
                          height: `${month.height}%`,
                          backgroundColor:
                            month.height >= 80
                              ? 'rgba(239,68,68,0.6)'
                              : month.height >= 60
                                ? 'rgba(245,158,11,0.6)'
                                : 'rgba(6,182,212,0.5)',
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {month.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
