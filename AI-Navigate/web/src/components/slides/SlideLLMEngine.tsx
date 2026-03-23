import { motion } from 'framer-motion';
import { Brain, Shield, Zap, DollarSign } from 'lucide-react';
import SlideLayout from './SlideLayout';

const scoringComponents = [
  { label: 'Rule-based', weight: 'w1', desc: 'Rainfall threshold + known flood zones', color: 'text-safe-green', bg: 'bg-safe-green/10', border: 'border-safe-green/20', trait: 'Deterministic' },
  { label: 'LLM Score', weight: 'w2', desc: 'Context-aware reasoning across signals', color: 'text-storm-blue', bg: 'bg-storm-blue/10', border: 'border-storm-blue/20', trait: 'Intelligent' },
  { label: 'Feedback', weight: 'w3', desc: 'User confirm/reject ground truth', color: 'text-caution-amber', bg: 'bg-caution-amber/10', border: 'border-caution-amber/20', trait: 'Adaptive' },
];

const thresholds = [
  { range: '0 — 0.3', action: 'Ignore', color: 'text-neutral-400', bg: 'bg-neutral-800' },
  { range: '0.3 — 0.6', action: 'Warn', color: 'text-caution-amber', bg: 'bg-caution-amber/8' },
  { range: '0.6 — 0.8', action: 'Avoid Route', color: 'text-storm-blue', bg: 'bg-storm-blue/8' },
  { range: '0.8 — 1.0', action: 'Block Road', color: 'text-danger-red', bg: 'bg-danger-red/8' },
];

const challenges = [
  { icon: Shield, problem: 'Hallucination', solution: 'Guardrails + rule cross-check + confidence bounds', color: 'text-danger-red' },
  { icon: Zap, problem: 'Latency', solution: 'Cache by location + async pipeline + batch calls', color: 'text-caution-amber' },
  { icon: DollarSign, problem: 'Cost', solution: 'Only call LLM on high-uncertainty + compress input', color: 'text-safe-green' },
];

export default function SlideLLMEngine() {
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
          LLM Flood Evaluation Engine
        </motion.h2>

        <div className="flex-1 flex flex-col lg:flex-row gap-4 mt-4">
          {/* Left: Hybrid Scoring + Thresholds */}
          <div className="lg:w-1/2 flex flex-col gap-3">
            {/* Hybrid Scoring Formula */}
            <motion.div
              className="bg-slate-dark border border-neutral-700 rounded-xl p-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Hybrid Scoring System</p>
              <div className="bg-abyss/60 rounded-lg px-4 py-2 mb-3 text-center">
                <p className="font-mono text-sm text-flood-cyan font-bold">
                  Final = w1 &times; Rule + w2 &times; LLM + w3 &times; Feedback
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {scoringComponents.map((c, i) => (
                  <motion.div
                    key={i}
                    className={`${c.bg} border ${c.border} rounded-lg px-3 py-2 flex items-center gap-3`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <span className={`font-mono font-bold text-xs ${c.color} w-7`}>{c.weight}</span>
                    <div className="flex-1">
                      <span className={`text-xs font-semibold ${c.color}`}>{c.label}</span>
                      <span className="text-[10px] text-neutral-500 ml-2">{c.desc}</span>
                    </div>
                    <span className="text-[9px] text-neutral-600 font-mono">{c.trait}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Decision Thresholds */}
            <motion.div
              className="bg-slate-dark border border-neutral-700 rounded-xl p-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Severity → Action Mapping</p>
              <div className="flex flex-col gap-1">
                {thresholds.map((t, i) => (
                  <div key={i} className={`${t.bg} rounded-md px-3 py-1.5 flex items-center justify-between`}>
                    <span className="font-mono text-xs text-neutral-400">{t.range}</span>
                    <span className={`text-xs font-semibold ${t.color}`}>{t.action}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: LLM Prompt + Challenges */}
          <div className="lg:w-1/2 flex flex-col gap-3">
            {/* LLM Prompt Design */}
            <motion.div
              className="bg-storm-blue/5 border border-storm-blue/20 rounded-xl p-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-storm-blue" strokeWidth={1.5} />
                <p className="text-xs font-semibold text-storm-blue uppercase tracking-wider">LLM Prompt Design</p>
              </div>
              <div className="bg-abyss/70 rounded-lg p-3 font-mono text-[10px] text-flood-cyan leading-relaxed border border-neutral-800">
                <span className="text-neutral-500">// System prompt</span><br/>
                You are an urban flood risk AI.<br/><br/>
                <span className="text-neutral-500">// Input signals</span><br/>
                Weather: <span className="text-caution-amber">rainfall, humidity, forecast</span><br/>
                Camera: <span className="text-caution-amber">description, confidence</span><br/>
                News: <span className="text-caution-amber">extracted flood reports</span><br/>
                History: <span className="text-caution-amber">past severity, frequency</span><br/><br/>
                <span className="text-neutral-500">// Required output (JSON)</span><br/>
                {'{'} severity: <span className="text-safe-green">0-1</span>, confidence: <span className="text-safe-green">0-1</span>,<br/>
                &nbsp;&nbsp;explanation: <span className="text-safe-green">"string"</span> {'}'}
              </div>
            </motion.div>

            {/* LLM Output Example */}
            <motion.div
              className="bg-safe-green/5 border border-safe-green/20 rounded-xl p-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-safe-green uppercase tracking-wider mb-2">Output Example</p>
              <div className="bg-abyss/70 rounded-lg p-3 font-mono text-[10px] leading-relaxed border border-neutral-800">
                <span className="text-neutral-500">{'{'}</span><br/>
                &nbsp;&nbsp;<span className="text-flood-cyan">"severity"</span>: <span className="text-caution-amber">0.82</span>,<br/>
                &nbsp;&nbsp;<span className="text-flood-cyan">"level"</span>: <span className="text-safe-green">"HIGH"</span>,<br/>
                &nbsp;&nbsp;<span className="text-flood-cyan">"confidence"</span>: <span className="text-caution-amber">0.76</span>,<br/>
                &nbsp;&nbsp;<span className="text-flood-cyan">"explanation"</span>: <span className="text-safe-green">"Heavy rain + historical<br/>&nbsp;&nbsp;&nbsp;flood zone + 3 user reports"</span><br/>
                <span className="text-neutral-500">{'}'}</span>
              </div>
            </motion.div>

            {/* Challenges & Solutions */}
            <motion.div
              className="bg-slate-dark border border-neutral-700 rounded-xl p-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Challenges & Solutions</p>
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
