import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Camera,
  Cloud,
  Newspaper,
  Users,
  BrainCircuit,
  Shield,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  FileText,
  Database,
  FlaskConical,
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

const lifecycleStates = [
  { label: 'Detected', color: '#F59E0B' },
  { label: 'Confirmed', color: '#EF4444' },
  { label: 'Monitored', color: '#2563EB' },
  { label: 'Resolved', color: '#10B981' },
];

export default function TechFloodDetection() {
  return (
    <div className="space-y-16">
      <Section>
        <h1 className="text-4xl font-bold text-white">Flood Detection & LLM Severity Assessment</h1>
        <p className="text-lg text-neutral-400 mt-3">
          Multi-source detection meets LLM-powered reasoning for accurate severity assessment.
        </p>
      </Section>

      {/* Multi-source detection + LLM Assessment side by side */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Multi-Source Detection */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-6">
              Multi-Source Detection
            </h3>

            <div className="relative">
              <div className="flex justify-between mb-2 px-4">
                {[
                  { icon: Camera, label: 'Camera' },
                  { icon: Cloud, label: 'Weather' },
                  { icon: Newspaper, label: 'News' },
                  { icon: Users, label: 'User' },
                ].map((source, i) => {
                  const Icon = source.icon;
                  return (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: -15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-11 h-11 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-flood-cyan" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs text-neutral-500 mt-1.5">{source.label}</span>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                className="flex justify-center my-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <svg width="240" height="30" viewBox="0 0 240 30" fill="none">
                  <line x1="30" y1="0" x2="120" y2="26" stroke="#64748B" strokeWidth="1.5" />
                  <line x1="85" y1="0" x2="120" y2="26" stroke="#64748B" strokeWidth="1.5" />
                  <line x1="155" y1="0" x2="120" y2="26" stroke="#64748B" strokeWidth="1.5" />
                  <line x1="210" y1="0" x2="120" y2="26" stroke="#64748B" strokeWidth="1.5" />
                  <polygon points="116,24 120,30 124,24" fill="#64748B" />
                </svg>
              </motion.div>

              <motion.div
                className="bg-storm-blue/10 border border-storm-blue/30 rounded-lg px-4 py-3 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-bold text-storm-blue uppercase tracking-wider">
                  Detection Engine
                </span>
              </motion.div>
            </div>

            <motion.div
              className="mt-6 bg-neutral-900 rounded-lg p-4 font-mono text-sm text-neutral-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-xs text-neutral-500 block mb-2 font-sans font-semibold uppercase tracking-wider">
                Confidence Scoring
              </span>
              <code className="text-flood-cyan">
                Score = &Sigma;(source_weight &times; source_confidence)
              </code>
            </motion.div>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Flood Point Lifecycle
              </span>
              <div className="flex items-center justify-between mt-4 px-1">
                {lifecycleStates.map((state, i) => (
                  <div key={i} className="flex items-center">
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 1.0 + i * 0.12,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      viewport={{ once: true }}
                    >
                      <div
                        className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                        style={{
                          borderColor: state.color,
                          backgroundColor: `${state.color}15`,
                          color: state.color,
                        }}
                      >
                        {state.label}
                      </div>
                    </motion.div>
                    {i < lifecycleStates.length - 1 && (
                      <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="mx-1">
                        <line x1="0" y1="6" x2="16" y2="6" stroke="#64748B" strokeWidth="1.5" />
                        <polygon points="14,2 24,6 14,10" fill="#64748B" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: LLM Severity Assessment */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-6">
              LLM Severity Assessment
            </h3>

            <motion.div
              className="bg-neutral-900 rounded-lg p-4 font-mono text-sm text-neutral-300"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="text-xs text-neutral-500 block mb-3 font-sans font-semibold uppercase tracking-wider">
                Input Context
              </span>
              <div className="space-y-1.5 leading-relaxed">
                <p><span className="text-flood-cyan">Camera:</span> Water visible on road surface, 20cm estimated</p>
                <p><span className="text-flood-cyan">Weather:</span> 85mm rainfall in last 2 hours, continuing</p>
                <p><span className="text-flood-cyan">News:</span> "District 7 flooding reported on VnExpress"</p>
                <p><span className="text-flood-cyan">User:</span> "Knee-deep water on Nguyen Hue Street"</p>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center py-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <line x1="8" y1="0" x2="8" y2="14" stroke="#2563EB" strokeWidth="1.5" />
                <polygon points="4,12 8,20 12,12" fill="#2563EB" />
              </svg>
            </motion.div>

            <motion.div
              className="bg-storm-blue/10 border border-storm-blue/30 rounded-lg px-4 py-3 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-bold text-storm-blue uppercase tracking-wider">
                LLM Reasoning Engine
              </span>
            </motion.div>

            <motion.div
              className="flex justify-center py-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.65 }}
              viewport={{ once: true }}
            >
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <line x1="8" y1="0" x2="8" y2="14" stroke="#2563EB" strokeWidth="1.5" />
                <polygon points="4,12 8,20 12,12" fill="#2563EB" />
              </svg>
            </motion.div>

            <motion.div
              className="bg-slate-dark border border-flood-cyan/20 rounded-xl p-5"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                Output Assessment
              </span>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-neutral-500">Severity</span>
                  <p className="font-mono text-sm text-caution-amber font-bold mt-0.5">Level 3/5</p>
                </div>
                <div>
                  <span className="text-xs text-neutral-500">Depth</span>
                  <p className="font-mono text-sm text-flood-cyan font-bold mt-0.5">~35cm</p>
                </div>
                <div>
                  <span className="text-xs text-neutral-500">Passability</span>
                  <p className="font-mono text-sm text-danger-red font-bold mt-0.5">Impassable for sedans</p>
                </div>
                <div>
                  <span className="text-xs text-neutral-500">Confidence</span>
                  <p className="font-mono text-sm text-safe-green font-bold mt-0.5">91%</p>
                </div>
              </div>
            </motion.div>

            <motion.p
              className="mt-4 text-xs text-neutral-500 italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              viewport={{ once: true }}
            >
              Fallback: Rule-based scoring when LLM unavailable. Ensures zero downtime for severity assessment.
            </motion.p>
          </div>
        </div>
      </Section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-storm-blue/30 to-transparent" />

      {/* AI Detection Pipeline Deep Dive */}
      <Section>
        <h2 className="text-3xl font-bold text-white">AI Detection Pipeline Deep Dive</h2>
        <p className="text-lg text-neutral-400 mt-2 mb-10">
          Why we split detection and severity into two separate systems -- and how we ensure LLM accuracy without labeled flood severity datasets.
        </p>

        {/* The Core Problem */}
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
                  <p className="text-neutral-400 text-sm">Binary flood detection -- "Is there water on this road?" -- is solvable with existing datasets (FloodNet, Flood-Detection-Dataset). We can train a YOLOv8/ResNet classifier with 90%+ accuracy for presence detection.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <XCircle size={18} className="text-danger-red mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">What we CANNOT do with CV alone</p>
                  <p className="text-neutral-400 text-sm">Flood severity assessment -- "How deep? Is it passable? Is it getting worse?" -- requires labeled severity data that doesn't exist at scale. No public dataset maps flood images to depth/passability/risk levels.</p>
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
                <div className="mt-3 pt-3 border-t border-neutral-700/50 text-neutral-400 text-xs">
                  Training a severity classifier requires 10K+ labeled images with depth + passability annotations. This dataset doesn't exist. Creating it takes 6-12 months of field data collection.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two-Stage Pipeline */}
        <motion.div
          className="bg-deep-navy rounded-xl p-8 border border-storm-blue/30 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BrainCircuit size={20} className="text-storm-blue" />
            Our Solution: Two-Stage Pipeline
          </h3>

          <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-8">
            {/* Stage 1 */}
            <div className="flex-1 bg-safe-green/5 border border-safe-green/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Camera size={18} className="text-safe-green" />
                <span className="text-xs font-semibold text-safe-green uppercase tracking-wider">Stage 1: CV Detection</span>
              </div>
              <p className="text-white font-medium mb-2">Binary Flood Detection</p>
              <p className="text-neutral-400 text-sm mb-3">Trained on existing datasets. High confidence, narrow scope.</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-neutral-400">Model</span><span className="font-mono text-neutral-200">YOLOv8 + ResNet50</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Task</span><span className="text-neutral-200">Flood / No Flood</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Accuracy</span><span className="font-mono text-safe-green">92.4%</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Latency</span><span className="font-mono text-neutral-200">~200ms</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Training data</span><span className="text-neutral-200">Public datasets</span></div>
              </div>
              <div className="mt-3 pt-3 border-t border-safe-green/10">
                <p className="text-xs text-safe-green">Output: "Flood detected at [location] with [confidence]%"</p>
              </div>
            </div>

            {/* Arrow */}
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

            {/* Stage 2 */}
            <div className="flex-1 bg-storm-blue/5 border border-storm-blue/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <BrainCircuit size={18} className="text-storm-blue" />
                <span className="text-xs font-semibold text-storm-blue uppercase tracking-wider">Stage 2: LLM Severity</span>
              </div>
              <p className="text-white font-medium mb-2">Multi-Signal Severity Assessment</p>
              <p className="text-neutral-400 text-sm mb-3">Uses reasoning over multiple data sources. No severity labels needed.</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-neutral-400">Model</span><span className="font-mono text-neutral-200">Claude / GPT-4o</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Task</span><span className="text-neutral-200">Severity 1-5, depth, passability</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Accuracy</span><span className="font-mono text-storm-blue">~91% (+-1 level)</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Latency</span><span className="font-mono text-neutral-200">800-2000ms</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">Training data</span><span className="text-caution-amber">None needed</span></div>
              </div>
              <div className="mt-3 pt-3 border-t border-storm-blue/10">
                <p className="text-xs text-storm-blue">Output: "Level 3/5 | ~35cm | Impassable for sedans | 91% conf"</p>
              </div>
            </div>
          </div>

          <TradeoffCard>
            Why not wait to build a severity dataset? Because people are dying NOW. LLM reasoning gives us 91% accuracy today without a single labeled severity image. We'll build the dataset over time using LLM assessments validated by ground truth -- the LLM bootstraps its own training data.
          </TradeoffCard>
        </motion.div>

        {/* Five Guardrails */}
        <motion.div
          className="bg-deep-navy rounded-xl p-8 border border-danger-red/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Shield size={20} className="text-danger-red" />
            Ensuring LLM Accuracy -- Five Guardrails
          </h3>
          <p className="text-neutral-400 text-sm mb-6">
            LLMs can hallucinate. For a system where wrong severity = lives at risk, we implement five layers of validation.
          </p>

          <div className="space-y-4">
            {[
              {
                num: '1',
                title: 'Structured Output Enforcement',
                desc: 'LLM must return a strict JSON schema: {severity: 1-5, depth_cm: number, passability: enum, confidence: 0-100, reasoning: string}. Any malformed response is rejected and retried. After 2 failures, fall back to rule-based scoring.',
                color: 'text-flood-cyan',
                detail: 'Tool: JSON mode + Pydantic validation on response',
              },
              {
                num: '2',
                title: 'Multi-Source Cross-Validation',
                desc: 'LLM severity must be consistent with other signals. If LLM says "Level 1 (minor)" but weather shows 100mm rainfall AND camera shows deep water, the assessment is flagged for review. Consistency score = agreement ratio across sources.',
                color: 'text-storm-blue',
                detail: 'Rule: If consistency < 60%, escalate to human operator',
              },
              {
                num: '3',
                title: 'Confidence Thresholding',
                desc: 'LLM must self-report confidence. Assessments below 70% confidence are downgraded: Level 4-5 assessments require >80% confidence to trigger critical alerts. Low-confidence results get a "UNCONFIRMED" badge and await corroboration.',
                color: 'text-caution-amber',
                detail: 'Rule: High severity + low confidence = hold alert, request more data',
              },
              {
                num: '4',
                title: 'Historical Calibration',
                desc: 'We track LLM accuracy over time by comparing assessments to eventual ground truth (user reports, water level sensors, post-event surveys). If accuracy drifts below 85% on a rolling 7-day window, we adjust prompts, switch models, or increase the confidence threshold.',
                color: 'text-safe-green',
                detail: 'Metric: Rolling 7-day accuracy, measured hourly',
              },
              {
                num: '5',
                title: 'Human-in-the-Loop for Critical Decisions',
                desc: 'Level 4-5 severity (dangerous/life-threatening) ALWAYS notifies a human operator before triggering city-wide routing changes. The operator can confirm, override, or request re-assessment. This is a safety valve, not a bottleneck -- 95% of events are Level 1-3 and flow automatically.',
                color: 'text-danger-red',
                detail: 'SLA: Human confirmation within 2 minutes for Level 4-5',
              },
            ].map((item) => (
              <motion.div
                key={item.num}
                className="bg-slate-dark/50 rounded-lg p-5 border border-neutral-700/30"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: Number(item.num) * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full bg-slate-dark border border-neutral-600 flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm ${item.color}`}>
                    {item.num}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-neutral-300 text-sm leading-relaxed mb-2">{item.desc}</p>
                    <p className="text-xs font-mono text-neutral-500">{item.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* LLM Prompt Design */}
        <motion.div
          className="bg-deep-navy rounded-xl p-8 border border-neutral-700/50 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquare size={20} className="text-flood-cyan" />
            LLM Prompt Design -- How We Get Reliable Severity
          </h3>

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
                Level 4: Deep {'('}40-70cm{')'}.  Most vehicles{'\n'}
                {'         '}cannot pass. Dangerous.{'\n'}
                Level 5: Severe {'(>'}70cm{')'}.  Life-threatening.{'\n'}
                {'         '}No vehicles should enter.{'\n\n'}
                RULES:{'\n'}
                - ALWAYS output valid JSON{'\n'}
                - NEVER overestimate to be safe{'\n'}
                - If uncertain, set confidence {'<'} 70{'\n'}
                - Cross-reference ALL provided sources{'\n'}
                - Explain your reasoning step by step
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Example Input / Output</p>
              <div className="bg-neutral-900 rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto mb-3">
                <span className="text-caution-amber">{'// user input (assembled by agent)'}</span>{'\n'}
                <span className="text-neutral-400">Camera:</span> Water visible on road,{'\n'}
                {'  '}submerging curb, ~25cm estimated{'\n'}
                <span className="text-neutral-400">Weather:</span> 85mm rainfall in 2 hours,{'\n'}
                {'  '}continuing at 30mm/hr{'\n'}
                <span className="text-neutral-400">News:</span> "District 7 flooding causes{'\n'}
                {'  '}traffic jam" -- VnExpress 14:23{'\n'}
                <span className="text-neutral-400">User report:</span> "Knee-deep water on{'\n'}
                {'  '}Nguyen Hue. Motorbikes turning back."
              </div>
              <div className="bg-neutral-900 rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                <span className="text-safe-green">{'// LLM structured output'}</span>{'\n'}
                {'{\n'}
                {'  '}<span className="text-storm-blue">"severity"</span>: <span className="text-flood-cyan">3</span>,{'\n'}
                {'  '}<span className="text-storm-blue">"depth_cm"</span>: <span className="text-flood-cyan">35</span>,{'\n'}
                {'  '}<span className="text-storm-blue">"passability"</span>: <span className="text-caution-amber">"impassable_sedan"</span>,{'\n'}
                {'  '}<span className="text-storm-blue">"confidence"</span>: <span className="text-flood-cyan">91</span>,{'\n'}
                {'  '}<span className="text-storm-blue">"reasoning"</span>: <span className="text-neutral-400">"Camera shows ~25cm,</span>{'\n'}
                {'    '}<span className="text-neutral-400">user says knee-deep (~30-40cm),</span>{'\n'}
                {'    '}<span className="text-neutral-400">rainfall continuing. Converging</span>{'\n'}
                {'    '}<span className="text-neutral-400">on Level 3. Confidence high due</span>{'\n'}
                {'    '}<span className="text-neutral-400">to 4-source agreement."</span>{'\n'}
                {'}'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bootstrap Strategy */}
        <motion.div
          className="bg-deep-navy rounded-xl p-8 border border-safe-green/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-safe-green" />
            The Bootstrap Strategy -- LLM Today, Custom Model Tomorrow
          </h3>
          <p className="text-neutral-400 text-sm mb-6">
            LLM is not the final state. It's the bootstrapper. Here's the 3-phase plan:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-dark/50 rounded-lg p-5 border border-neutral-700/30">
              <div className="text-xs font-semibold text-flood-cyan uppercase tracking-wider mb-2">Phase 1: LLM-Only (Now)</div>
              <p className="text-white font-medium text-sm mb-2">Use LLM for all severity assessment</p>
              <ul className="text-neutral-400 text-xs space-y-1">
                <li>No labeled data needed</li>
                <li>91% accuracy from day 1</li>
                <li>Cost: ~$0.01-0.03 per assessment</li>
                <li>Latency: 800-2000ms</li>
                <li>Every assessment stored with ground truth for future training</li>
              </ul>
            </div>
            <div className="bg-slate-dark/50 rounded-lg p-5 border border-neutral-700/30">
              <div className="text-xs font-semibold text-storm-blue uppercase tracking-wider mb-2">Phase 2: Hybrid (6 months)</div>
              <p className="text-white font-medium text-sm mb-2">Distill LLM knowledge into smaller model</p>
              <ul className="text-neutral-400 text-xs space-y-1">
                <li>10K+ LLM assessments as training data</li>
                <li>Fine-tune ResNet/ViT for severity</li>
                <li>Use LLM only for low-confidence cases</li>
                <li>Cost drops 80%</li>
                <li>Latency drops to ~300ms for most cases</li>
              </ul>
            </div>
            <div className="bg-slate-dark/50 rounded-lg p-5 border border-neutral-700/30">
              <div className="text-xs font-semibold text-safe-green uppercase tracking-wider mb-2">Phase 3: Custom Model (12 months)</div>
              <p className="text-white font-medium text-sm mb-2">Fully trained severity classifier</p>
              <ul className="text-neutral-400 text-xs space-y-1">
                <li>50K+ validated severity labels</li>
                <li>Custom multi-modal model (image + weather + text)</li>
                <li>LLM only for edge cases + validation</li>
                <li>Cost: near-zero (self-hosted inference)</li>
                <li>Latency: ~150ms end-to-end</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-storm-blue/5 border border-storm-blue/20 rounded-lg">
            <p className="text-sm text-neutral-300">
              <span className="text-storm-blue font-semibold">Key insight:</span>{' '}
              The LLM is not a crutch -- it's a data generation engine. Every severity assessment it makes, once validated by ground truth, becomes a training example for the custom model. The LLM bootstraps its own replacement. By month 12, we'll have the largest labeled flood severity dataset in existence -- built automatically.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Published Research */}
      <Section>
        <div className="bg-safe-green/5 border border-safe-green/20 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-safe-green/15 flex items-center justify-center">
              <FileText className="w-5 h-5 text-safe-green" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Published Research</h3>
              <p className="text-neutral-500 text-sm">IEEE ICCAIS 2024 — 13th International Conference on Control, Automation and Information Sciences</p>
            </div>
          </div>

          <div className="bg-neutral-900/50 rounded-xl p-6 mb-6">
            <h4 className="text-lg font-bold text-white mb-2">
              "UIT-VisDrone-Flood: A Synthesized Aerial Vehicle Detection Dataset Under Flood Conditions"
            </h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Due to the difficulty and danger of capturing real flood images, we synthesized a large-scale dataset of <span className="text-white font-semibold">7,411 flood images</span> using advanced AI techniques. This dataset enables CNN-based flood detection with <span className="text-white font-semibold">~90% accuracy</span> on real-world traffic camera feeds.
            </p>
          </div>

          <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">Dataset Generation Pipeline</h4>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-dark/50 rounded-lg p-5 border border-neutral-700/30">
              <div className="flex items-center gap-2 mb-3">
                <FlaskConical size={16} className="text-flood-cyan" />
                <span className="text-xs font-semibold text-flood-cyan uppercase tracking-wider">Step 1: ClimateGAN</span>
              </div>
              <p className="text-white font-medium text-sm mb-2">Flood Simulation</p>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Converts normal traffic images (VisDrone dataset) into realistic flood-like conditions using generative adversarial networks trained on climate data.
              </p>
            </div>
            <div className="bg-slate-dark/50 rounded-lg p-5 border border-neutral-700/30">
              <div className="flex items-center gap-2 mb-3">
                <BrainCircuit size={16} className="text-storm-blue" />
                <span className="text-xs font-semibold text-storm-blue uppercase tracking-wider">Step 2: SAM</span>
              </div>
              <p className="text-white font-medium text-sm mb-2">Vehicle Segmentation</p>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Segment Anything Model extracts vehicle masks for realistic cut-paste composition. Vehicles are placed into flood scenes with proper occlusion and perspective.
              </p>
            </div>
            <div className="bg-slate-dark/50 rounded-lg p-5 border border-neutral-700/30">
              <div className="flex items-center gap-2 mb-3">
                <Database size={16} className="text-safe-green" />
                <span className="text-xs font-semibold text-safe-green uppercase tracking-wider">Step 3: Color Blending</span>
              </div>
              <p className="text-white font-medium text-sm mb-2">Harmonization</p>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Color blending harmonizes inserted vehicles with flood backgrounds, producing photorealistic training data. Final dataset: 7,411 annotated images.
              </p>
            </div>
          </div>

          <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">Evaluation Results (YOLOv10)</h4>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left py-2 px-3 text-neutral-500 font-semibold text-xs uppercase tracking-wider">Model</th>
                  <th className="text-center py-2 px-3 text-neutral-500 font-semibold text-xs uppercase tracking-wider">AP<sub>val</sub></th>
                  <th className="text-center py-2 px-3 text-neutral-500 font-semibold text-xs uppercase tracking-wider">FLOPs</th>
                  <th className="text-center py-2 px-3 text-neutral-500 font-semibold text-xs uppercase tracking-wider">Latency</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { model: 'YOLOv10-N', ap: '38.5', flops: '6.7G', latency: '1.84ms', highlight: true },
                  { model: 'YOLOv10-S', ap: '46.3', flops: '21.6G', latency: '2.49ms', highlight: false },
                  { model: 'YOLOv10-M', ap: '51.1', flops: '59.1G', latency: '4.74ms', highlight: false },
                  { model: 'YOLOv10-L', ap: '53.2', flops: '120.3G', latency: '7.28ms', highlight: false },
                  { model: 'YOLOv10-X', ap: '54.4', flops: '160.4G', latency: '10.70ms', highlight: false },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-neutral-800 ${row.highlight ? 'bg-flood-cyan/5' : ''}`}>
                    <td className={`py-2 px-3 font-mono ${row.highlight ? 'text-flood-cyan font-semibold' : 'text-neutral-300'}`}>{row.model}</td>
                    <td className="py-2 px-3 text-center text-neutral-300">{row.ap}</td>
                    <td className="py-2 px-3 text-center text-neutral-400">{row.flops}</td>
                    <td className="py-2 px-3 text-center text-neutral-400">{row.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://ieeexplore.ieee.org/document/10814214"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-flood-cyan/10 border border-flood-cyan/30 text-sm font-semibold text-flood-cyan hover:bg-flood-cyan/20 transition-colors"
            >
              <ExternalLink size={14} /> IEEE Xplore Paper
            </a>
            <a
              href="https://ami.gov.vn/wp-content/uploads/2024/11/TA03-2-compressed.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-storm-blue/10 border border-storm-blue/30 text-sm font-semibold text-storm-blue hover:bg-storm-blue/20 transition-colors"
            >
              <FileText size={14} /> Full Paper PDF
            </a>
            <a
              href="https://universe.roboflow.com/uit-2pejh/uit-flooded-visdrone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-safe-green/10 border border-safe-green/30 text-sm font-semibold text-safe-green hover:bg-safe-green/20 transition-colors"
            >
              <Database size={14} /> UIT-VisDrone-Flood Dataset
            </a>
            <a
              href="https://huggingface.co/spaces/ManhHoDinh/floodTrafficSolution"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-caution-amber/10 border border-caution-amber/30 text-sm font-semibold text-caution-amber hover:bg-caution-amber/20 transition-colors"
            >
              <ExternalLink size={14} /> YOLOv10 Live Demo
            </a>
          </div>
        </div>
      </Section>

      {/* Next page */}
      <div className="pt-8 border-t border-neutral-800">
        <Link
          to="/technology/routing"
          className="inline-flex items-center gap-2 text-sm font-medium text-storm-blue hover:text-white transition-colors"
        >
          Next: Routing Intelligence <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
