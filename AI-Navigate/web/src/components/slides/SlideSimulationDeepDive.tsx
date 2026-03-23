import { motion } from 'framer-motion';
import { CloudRain, Route, BarChart3, FileText, Building2, TrafficCone, FlaskConical, Landmark, Layers, Cpu, Crosshair } from 'lucide-react';
import SlideLayout from './SlideLayout';

const simulationSteps = [
  {
    icon: CloudRain,
    label: 'Scenario Generator',
    desc: 'Heavy rain 2hrs, 3 flood points, peak hour + local flooding',
    color: 'text-caution-amber',
    bg: 'bg-caution-amber/10',
    border: 'border-caution-amber/20',
  },
  {
    icon: Route,
    label: 'Route Simulation',
    desc: 'Multi-user routing, rerouting on flood detection, bottleneck creation',
    color: 'text-storm-blue',
    bg: 'bg-storm-blue/10',
    border: 'border-storm-blue/20',
  },
  {
    icon: BarChart3,
    label: 'Impact Analyzer',
    desc: 'Congestion index, expected delay, blocked zones, rerouting load',
    color: 'text-flood-cyan',
    bg: 'bg-flood-cyan/10',
    border: 'border-flood-cyan/20',
  },
  {
    icon: FileText,
    label: 'Planning Recommendations',
    desc: 'Block route A, redirect to B/C, early alert zone D',
    color: 'text-safe-green',
    bg: 'bg-safe-green/10',
    border: 'border-safe-green/20',
  },
];

const useCases = [
  { icon: Building2, title: 'Gov Planning', desc: 'Evaluate traffic regulation during heavy rain', color: 'text-storm-blue', bg: 'bg-storm-blue/10', border: 'border-storm-blue/20' },
  { icon: TrafficCone, title: 'Traffic Ops', desc: 'Optimize real-time traffic guidance', color: 'text-caution-amber', bg: 'bg-caution-amber/10', border: 'border-caution-amber/20' },
  { icon: FlaskConical, title: 'Policy Testing', desc: 'Test road closure scenarios before applying', color: 'text-flood-cyan', bg: 'bg-flood-cyan/10', border: 'border-flood-cyan/20' },
  { icon: Landmark, title: 'Strategic Planning', desc: 'Identify urban infrastructure weak points', color: 'text-safe-green', bg: 'bg-safe-green/10', border: 'border-safe-green/20' },
];

const challenges = [
  { icon: Layers, problem: 'Complexity', solution: 'Zone-based simulation with LOD scaling', color: 'text-caution-amber' },
  { icon: Cpu, problem: 'Compute cost', solution: 'Batch processing + scenario templates', color: 'text-storm-blue' },
  { icon: Crosshair, problem: 'Input accuracy', solution: 'Multi-scenario + sensitivity analysis', color: 'text-danger-red' },
];

export default function SlideSimulationDeepDive() {
  return (
    <SlideLayout>
      <div className="flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-caution-amber border border-caution-amber/30 rounded-full px-3 py-1">
            Deep Dive
          </span>
        </motion.div>
        <motion.h2
          className="text-4xl font-bold text-white mt-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Simulation Engine
        </motion.h2>

        <div className="flex-1 flex flex-col lg:flex-row gap-4 mt-4">
          {/* Left: Simulation Pipeline */}
          <div className="lg:w-1/2 flex flex-col gap-3">
            <motion.div
              className="bg-slate-dark border border-neutral-700 rounded-xl p-4 flex-1"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Simulation Pipeline</p>
              <div className="flex flex-col gap-2">
                {simulationSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    className={`${step.bg} border ${step.border} rounded-lg px-3 py-2.5 flex items-start gap-3`}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <step.icon className={`w-4 h-4 ${step.color} mt-0.5 flex-shrink-0`} strokeWidth={1.5} />
                    <div className="flex-1">
                      <span className={`text-xs font-semibold ${step.color}`}>{step.label}</span>
                      <p className="text-[10px] text-neutral-400 mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                    <span className="text-[9px] text-neutral-600 font-mono mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Use Cases + Challenges */}
          <div className="lg:w-1/2 flex flex-col gap-3">
            {/* Use Cases */}
            <motion.div
              className="bg-caution-amber/5 border border-caution-amber/20 rounded-xl p-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-caution-amber uppercase tracking-wider mb-3">Use Cases</p>
              <div className="grid grid-cols-2 gap-2">
                {useCases.map((uc, i) => (
                  <motion.div
                    key={i}
                    className={`${uc.bg} border ${uc.border} rounded-lg px-3 py-2.5`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <uc.icon className={`w-3.5 h-3.5 ${uc.color}`} strokeWidth={1.5} />
                      <span className={`text-xs font-semibold ${uc.color}`}>{uc.title}</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-relaxed">{uc.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Challenges */}
            <motion.div
              className="bg-slate-dark border border-neutral-700 rounded-xl p-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Challenges</p>
              <div className="flex flex-col gap-1.5">
                {challenges.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 bg-abyss/40 rounded-md px-3 py-1.5">
                    <c.icon className={`w-3.5 h-3.5 ${c.color} mt-0.5 flex-shrink-0`} strokeWidth={1.5} />
                    <div>
                      <span className={`text-xs font-semibold ${c.color}`}>{c.problem}</span>
                      <span className="text-[10px] text-neutral-400 ml-1.5">{c.solution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        {/* Tech doc link */}
        <a
          href="https://github.com/ManhHoDinh/AI-Navigate/blob/main/docs/tech/llm-agent-prediction-simulation.md"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-8 text-[9px] text-neutral-600 hover:text-flood-cyan transition-colors font-mono z-20"
        >
          docs/tech-architecture.md →
        </a>
      </div>
    </SlideLayout>
  );
}
