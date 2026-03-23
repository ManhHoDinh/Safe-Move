import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import SlideLayout from './SlideLayout';

type CellValue = 'yes' | 'no' | 'partial';

interface CompRow {
  capability: string;
  safemove: CellValue;
  google: CellValue;
  waze: CellValue;
  here: CellValue;
}

const rows: CompRow[] = [
  {
    capability: 'Real-time Flood CV Detection',
    safemove: 'yes',
    google: 'no',
    waze: 'no',
    here: 'no',
  },
  {
    capability: 'LLM Severity Assessment',
    safemove: 'yes',
    google: 'no',
    waze: 'no',
    here: 'no',
  },
  {
    capability: 'Flood-Aware Routing',
    safemove: 'yes',
    google: 'partial',
    waze: 'partial',
    here: 'partial',
  },
  {
    capability: 'Predictive Flood Warnings',
    safemove: 'yes',
    google: 'no',
    waze: 'no',
    here: 'no',
  },
  {
    capability: 'Autonomous Learning Agent',
    safemove: 'yes',
    google: 'no',
    waze: 'no',
    here: 'no',
  },
  {
    capability: 'City-Scale Camera Integration',
    safemove: 'yes',
    google: 'no',
    waze: 'no',
    here: 'no',
  },
];

function CellIcon({ value }: { value: CellValue }) {
  if (value === 'yes') {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-safe-green/15">
        <Check className="w-4 h-4 text-safe-green" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === 'partial') {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-caution-amber/15">
        <Minus className="w-4 h-4 text-caution-amber" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-danger-red/15">
      <X className="w-4 h-4 text-danger-red" strokeWidth={2.5} />
    </span>
  );
}

export default function SlideCompetition() {
  return (
    <SlideLayout slideNumber={9}>
      <div className="flex flex-col h-full">
        {/* Section badge */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-storm-blue/20 border border-storm-blue/40 text-storm-blue text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
            Competition
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Why No One Else Can Do This
        </motion.h2>

        {/* Comparison grid */}
        <motion.div
          className="flex-1 flex flex-col min-h-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-px mb-1">
            <div className="px-4 py-2 text-xs font-semibold tracking-widest uppercase text-neutral-500">
              Capability
            </div>
            <div className="px-4 py-2 text-center text-xs font-bold tracking-wider uppercase text-flood-cyan">
              SafeMove AI
            </div>
            <div className="px-4 py-2 text-center text-xs font-semibold tracking-wider uppercase text-neutral-400">
              Google Maps
            </div>
            <div className="px-4 py-2 text-center text-xs font-semibold tracking-wider uppercase text-neutral-400">
              Waze
            </div>
            <div className="px-4 py-2 text-center text-xs font-semibold tracking-wider uppercase text-neutral-400">
              HERE
            </div>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-px rounded-xl overflow-hidden border border-white/5">
            {rows.map((row, i) => (
              <motion.div
                key={row.capability}
                className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-px items-center ${
                  i % 2 === 0 ? 'bg-abyss/60' : 'bg-slate-dark'
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                viewport={{ once: true }}
              >
                {/* Capability label */}
                <div className="px-5 py-3.5 text-sm font-medium text-neutral-200">
                  {row.capability}
                </div>

                {/* SafeMove AI — highlighted column */}
                <div className="px-4 py-3.5 flex items-center justify-center bg-flood-cyan/5 border-x border-flood-cyan/10">
                  <CellIcon value={row.safemove} />
                </div>

                {/* Google Maps */}
                <div className="px-4 py-3.5 flex items-center justify-center">
                  <CellIcon value={row.google} />
                </div>

                {/* Waze */}
                <div className="px-4 py-3.5 flex items-center justify-center">
                  <CellIcon value={row.waze} />
                </div>

                {/* HERE */}
                <div className="px-4 py-3.5 flex items-center justify-center">
                  <CellIcon value={row.here} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-6 px-6 py-4 rounded-xl border border-flood-cyan/20 bg-flood-cyan/5"
          style={{ boxShadow: '0 0 30px rgba(6,182,212,0.06)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-neutral-300 text-sm lg:text-base leading-relaxed">
            <span className="text-flood-cyan font-semibold">
              Existing players react to user-reported floods.
            </span>{' '}
            We detect, predict, and prevent automatically.
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
