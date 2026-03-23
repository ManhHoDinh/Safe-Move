import { motion } from 'framer-motion';
import { MessageSquare, Brain, Cpu, RefreshCw, AlertTriangle, Scale, Layers } from 'lucide-react';
import SlideLayout from './SlideLayout';

const feedbackSteps = [
  {
    icon: MessageSquare,
    label: 'Feedback Collector',
    desc: 'Route success/failure, user confirm/reject, operator corrections',
    color: 'text-safe-green',
    bg: 'bg-safe-green/10',
    border: 'border-safe-green/20',
  },
  {
    icon: Brain,
    label: 'Agent Memory',
    desc: 'Short-term (recent events), Mid-term (weekly patterns), Long-term (historical weights)',
    color: 'text-flood-cyan',
    bg: 'bg-flood-cyan/10',
    border: 'border-flood-cyan/20',
  },
  {
    icon: Cpu,
    label: 'Learning Engine',
    desc: 'LLM analysis: "Why did this route fail?" or RL: reward-based policy optimization',
    color: 'text-storm-blue',
    bg: 'bg-storm-blue/10',
    border: 'border-storm-blue/20',
  },
  {
    icon: RefreshCw,
    label: 'Policy Update',
    desc: 'Routing weights, severity calibration, source trust scores',
    color: 'text-caution-amber',
    bg: 'bg-caution-amber/10',
    border: 'border-caution-amber/20',
  },
];

const rewards = [
  { signal: '+2', desc: 'Avoids flood zone', color: 'text-safe-green' },
  { signal: '+1', desc: 'Acceptable ETA', color: 'text-flood-cyan' },
  { signal: '-3', desc: 'Enters flood zone', color: 'text-danger-red' },
  { signal: '-1', desc: 'User rejects route', color: 'text-caution-amber' },
];

const challenges = [
  { icon: AlertTriangle, problem: 'Sparse feedback', solution: 'Implicit signals (GPS traces, rerouting events)', color: 'text-caution-amber' },
  { icon: Scale, problem: 'Bias', solution: 'Trust scoring with confidence intervals', color: 'text-storm-blue' },
  { icon: Layers, problem: 'Policy oscillation', solution: 'Batch updates with rollback checks', color: 'text-danger-red' },
];

export default function SlideAgentDeepDive() {
  return (
    <SlideLayout>
      <div className="flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-storm-blue border border-storm-blue/30 rounded-full px-3 py-1">
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
          Agent + Feedback Learning System
        </motion.h2>

        <div className="flex-1 flex flex-col lg:flex-row gap-4 mt-4">
          {/* Left: Feedback Loop */}
          <div className="lg:w-1/2 flex flex-col gap-3">
            <motion.div
              className="bg-slate-dark border border-neutral-700 rounded-xl p-4 flex-1"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Feedback Loop</p>
              <div className="flex flex-col gap-2">
                {feedbackSteps.map((step, i) => (
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
                {/* Loop arrow indicator */}
                <div className="flex justify-center">
                  <div className="text-[10px] text-neutral-600 font-mono flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 text-storm-blue/50" strokeWidth={1.5} />
                    <span>continuous loop</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: LLM Prompt + RL Rewards + Challenges */}
          <div className="lg:w-1/2 flex flex-col gap-3">
            {/* LLM Learning Prompt */}
            <motion.div
              className="bg-storm-blue/5 border border-storm-blue/20 rounded-xl p-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-storm-blue" strokeWidth={1.5} />
                <p className="text-xs font-semibold text-storm-blue uppercase tracking-wider">LLM Learning Prompt</p>
              </div>
              <div className="bg-abyss/70 rounded-lg p-3 font-mono text-[10px] text-flood-cyan leading-relaxed border border-neutral-800">
                <span className="text-neutral-500">// Route failure analysis</span><br/>
                A route was recommended but <span className="text-danger-red">failed</span>.<br/>
                Context: weather=<span className="text-caution-amber">high</span>,<br/>
                &nbsp;&nbsp;3 flood reports near <span className="text-caution-amber">segment B</span><br/><br/>
                <span className="text-neutral-500">// Analysis request</span><br/>
                Analyze:<br/>
                &nbsp;&nbsp;1. Why did route fail?<br/>
                &nbsp;&nbsp;2. Which signal needs higher weight?<br/>
                &nbsp;&nbsp;<span className="text-safe-green">{`→ Return JSON adjustment`}</span>
              </div>
            </motion.div>

            {/* RL Reward Design */}
            <motion.div
              className="bg-safe-green/5 border border-safe-green/20 rounded-xl p-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-safe-green uppercase tracking-wider mb-2">RL Reward Design</p>
              <div className="grid grid-cols-2 gap-1.5">
                {rewards.map((r, i) => (
                  <div key={i} className="bg-abyss/50 rounded-md px-3 py-1.5 flex items-center gap-2">
                    <span className={`font-mono text-xs font-bold ${r.color}`}>{r.signal}</span>
                    <span className="text-[10px] text-neutral-400">{r.desc}</span>
                  </div>
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
