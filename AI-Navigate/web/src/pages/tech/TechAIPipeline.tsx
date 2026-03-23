import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Camera,
  BrainCircuit,
  Shield,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

function Section({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function TradeoffCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-caution-amber/5 border border-caution-amber/20 rounded-lg p-4 mt-4">
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
          <AlertTriangle size={14} className="text-caution-amber" />
          <span className="text-caution-amber text-xs font-bold uppercase tracking-wider">Trade-off</span>
        </div>
        <p className="text-sm text-neutral-300">{children}</p>
      </div>
    </div>
  );
}

export default function TechAIPipeline() {
  return (
    <div className="space-y-16">
      <Section>
        <h1 className="text-4xl font-bold text-white">AI Detection & LLM Severity Pipeline</h1>
        <p className="text-lg text-neutral-400 mt-3">
          Why we split detection and severity into two separate systems -- and how we ensure LLM accuracy without labeled flood severity datasets.
        </p>
      </Section>

      {/* The Core Problem */}
      <Section>
        <motion.div
          className="bg-deep-navy rounded-xl p-8 border border-neutral-700/50 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-caution-amber" />
            The Core Challenge
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-safe-green mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">What we CAN do with CV models</p>
                  <p className="text-neutral-400 text-sm">Binary flood detection -- "Is there water on this road?" -- is solvable with existing datasets (FloodNet, Flood-Detection-Dataset). We can train a YOLOv8/ResNet classifier with 90%+ accuracy.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <XCircle size={18} className="text-danger-red mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">What we CANNOT do with CV alone</p>
                  <p className="text-neutral-400 text-sm">Flood severity assessment -- "How deep? Is it passable?" -- requires labeled severity data that doesn't exist at scale.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-dark rounded-lg p-5 border border-neutral-700/50">
              <p className="text-xs font-semibold text-caution-amber uppercase tracking-wider mb-3">The Dataset Gap</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-neutral-300">
                  <span>FloodNet Dataset</span>
                  <span className="text-safe-green font-mono">2,343 images</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Has flood/no-flood labels</span>
                  <span className="text-safe-green">&#10003;</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Has depth labels (cm)</span>
                  <span className="text-danger-red">&#10007;</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Has passability labels</span>
                  <span className="text-danger-red">&#10007;</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Has severity levels (1-5)</span>
                  <span className="text-danger-red">&#10007;</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Two-Stage Pipeline */}
      <Section>
        <motion.div
          className="bg-deep-navy rounded-xl p-8 border border-storm-blue/30 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BrainCircuit size={20} className="text-storm-blue" />
            Two-Stage Pipeline
          </h3>

          <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-8">
            <div className="flex-1 bg-safe-green/5 border border-safe-green/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Camera size={18} className="text-safe-green" />
                <span className="text-xs font-semibold text-safe-green uppercase tracking-wider">Stage 1: CV Detection</span>
              </div>
              <p className="text-white font-medium mb-2">Binary Flood Detection</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-neutral-400">Model</span><span className="font-mono text-neutral-200">YOLOv8 + ResNet50</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Accuracy</span><span className="font-mono text-safe-green">92.4%</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Latency</span><span className="font-mono text-neutral-200">~200ms</span></div>
              </div>
            </div>

            <div className="flex items-center justify-center lg:py-0 py-2">
              <svg width="40" height="24" viewBox="0 0 40 24" className="text-neutral-500 hidden lg:block">
                <line x1="0" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="2" />
                <polygon points="28,6 40,12 28,18" fill="currentColor" />
              </svg>
              <svg width="24" height="40" viewBox="0 0 24 40" className="text-neutral-500 lg:hidden">
                <line x1="12" y1="0" x2="12" y2="28" stroke="currentColor" strokeWidth="2" />
                <polygon points="6,28 12,40 18,28" fill="currentColor" />
              </svg>
            </div>

            <div className="flex-1 bg-storm-blue/5 border border-storm-blue/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <BrainCircuit size={18} className="text-storm-blue" />
                <span className="text-xs font-semibold text-storm-blue uppercase tracking-wider">Stage 2: LLM Severity</span>
              </div>
              <p className="text-white font-medium mb-2">Multi-Signal Severity Assessment</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-neutral-400">Model</span><span className="font-mono text-neutral-200">Claude / GPT-4o</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Accuracy</span><span className="font-mono text-storm-blue">~91% (+-1 level)</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Latency</span><span className="font-mono text-neutral-200">800-2000ms</span></div>
              </div>
            </div>
          </div>

          <TradeoffCard>
            LLM reasoning gives us 91% accuracy today without labeled severity data. We'll build the dataset over time using LLM assessments validated by ground truth.
          </TradeoffCard>
        </motion.div>
      </Section>

      {/* Five Guardrails */}
      <Section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Shield size={22} className="text-danger-red" />
          Five Accuracy Guardrails
        </h2>

        <div className="space-y-4">
          {[
            {
              num: '1',
              title: 'Structured Output Enforcement',
              desc: 'LLM must return strict JSON schema. Malformed responses are rejected and retried. After 2 failures, fall back to rule-based scoring.',
              color: 'text-flood-cyan',
            },
            {
              num: '2',
              title: 'Multi-Source Cross-Validation',
              desc: 'LLM severity must be consistent with other signals. If consistency < 60%, escalate to human operator.',
              color: 'text-storm-blue',
            },
            {
              num: '3',
              title: 'Confidence Thresholding',
              desc: 'Assessments below 70% confidence are downgraded. Level 4-5 require >80% confidence for critical alerts.',
              color: 'text-caution-amber',
            },
            {
              num: '4',
              title: 'Historical Calibration',
              desc: 'Track LLM accuracy over rolling 7-day window. If accuracy drops below 85%, adjust prompts or switch models.',
              color: 'text-safe-green',
            },
            {
              num: '5',
              title: 'Human-in-the-Loop for Critical Decisions',
              desc: 'Level 4-5 severity ALWAYS notifies a human operator before triggering city-wide routing changes.',
              color: 'text-danger-red',
            },
          ].map((item) => (
            <motion.div
              key={item.num}
              className="bg-deep-navy rounded-lg p-5 border border-neutral-700/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: Number(item.num) * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full bg-slate-dark border border-neutral-600 flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm ${item.color}`}>
                  {item.num}
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                  <p className="text-neutral-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Prompt Design */}
      <Section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <MessageSquare size={22} className="text-flood-cyan" />
          LLM Prompt Design
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">System Prompt</p>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-xs text-neutral-300 leading-relaxed overflow-x-auto">
              <span className="text-storm-blue">{'// system'}</span>{'\n'}
              You are a flood severity assessment engine.{'\n'}
              You analyze multi-source flood data and output{'\n'}
              structured severity assessments.{'\n\n'}
              SEVERITY SCALE:{'\n'}
              Level 1: Minor puddles {'(<'}10cm{')'}. Passable.{'\n'}
              Level 2: Shallow {'('}10-20cm{')'}.  Cars slow.{'\n'}
              Level 3: Moderate {'('}20-40cm{')'}.  Sedans stuck.{'\n'}
              Level 4: Deep {'('}40-70cm{')'}.  Dangerous.{'\n'}
              Level 5: Severe {'(>'}70cm{')'}.  Life-threatening.
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Example Output</p>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto">
              <span className="text-safe-green">{'// LLM structured output'}</span>{'\n'}
              {'{\n'}
              {'  '}<span className="text-storm-blue">"severity"</span>: <span className="text-flood-cyan">3</span>,{'\n'}
              {'  '}<span className="text-storm-blue">"depth_cm"</span>: <span className="text-flood-cyan">35</span>,{'\n'}
              {'  '}<span className="text-storm-blue">"passability"</span>: <span className="text-caution-amber">"impassable_sedan"</span>,{'\n'}
              {'  '}<span className="text-storm-blue">"confidence"</span>: <span className="text-flood-cyan">91</span>,{'\n'}
              {'  '}<span className="text-storm-blue">"reasoning"</span>: <span className="text-neutral-400">"Camera ~25cm,</span>{'\n'}
              {'    '}<span className="text-neutral-400">user knee-deep, rainfall continuing.</span>{'\n'}
              {'    '}<span className="text-neutral-400">Converging on Level 3."</span>{'\n'}
              {'}'}
            </div>
          </div>
        </div>
      </Section>

      {/* Bootstrap Strategy */}
      <Section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp size={22} className="text-safe-green" />
          Bootstrap Strategy
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            className="bg-deep-navy rounded-lg p-5 border border-flood-cyan/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-semibold text-flood-cyan uppercase tracking-wider mb-2">Phase 1: Now</div>
            <p className="text-white font-medium text-sm mb-2">LLM-Only Assessment</p>
            <ul className="text-neutral-400 text-xs space-y-1">
              <li>91% accuracy from day 1</li>
              <li>$0.01-0.03 per assessment</li>
              <li>800-2000ms latency</li>
            </ul>
          </motion.div>
          <motion.div
            className="bg-deep-navy rounded-lg p-5 border border-storm-blue/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-semibold text-storm-blue uppercase tracking-wider mb-2">Phase 2: 6 months</div>
            <p className="text-white font-medium text-sm mb-2">Hybrid (Distilled Model)</p>
            <ul className="text-neutral-400 text-xs space-y-1">
              <li>10K+ LLM assessments as training data</li>
              <li>Cost drops 80%</li>
              <li>Latency ~300ms for most cases</li>
            </ul>
          </motion.div>
          <motion.div
            className="bg-deep-navy rounded-lg p-5 border border-safe-green/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-semibold text-safe-green uppercase tracking-wider mb-2">Phase 3: 12 months</div>
            <p className="text-white font-medium text-sm mb-2">Custom Severity Model</p>
            <ul className="text-neutral-400 text-xs space-y-1">
              <li>50K+ validated severity labels</li>
              <li>Near-zero cost (self-hosted)</li>
              <li>~150ms end-to-end</li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Next page */}
      <div className="pt-8 border-t border-neutral-800">
        <Link
          to="/technology/performance"
          className="inline-flex items-center gap-2 text-sm font-medium text-storm-blue hover:text-white transition-colors"
        >
          Next: Performance & Latency <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
