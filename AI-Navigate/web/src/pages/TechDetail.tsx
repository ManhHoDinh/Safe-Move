import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Bot, Cpu, Database, Layers, Route, Shield, Zap, BarChart3, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

function Section({ title, icon: Icon, color, children }: { title: string; icon: typeof Brain; color: string; children: React.ReactNode }) {
  return (
    <motion.section
      className="mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </motion.div>
      {children}
    </motion.section>
  );
}

function Card({ title, children, accent = 'border-neutral-700' }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <motion.div variants={fadeUp} className={`bg-slate-dark border ${accent} rounded-xl p-5 mb-4`}>
      <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">{title}</h3>
      {children}
    </motion.div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-abyss border border-neutral-800 rounded-lg p-4 font-mono text-xs text-flood-cyan overflow-x-auto leading-relaxed">
      {children}
    </pre>
  );
}

function FlowStep({ num, label, desc }: { num: string; label: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-lg bg-storm-blue/20 border border-storm-blue/30 flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-xs font-bold text-storm-blue">{num}</span>
      </div>
      <div>
        <span className="text-sm font-semibold text-white">{label}</span>
        <p className="text-xs text-neutral-400 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

export default function TechDetail() {
  return (
    <div className="min-h-screen bg-abyss text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-abyss/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/technology" className="text-neutral-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-white">Technical Architecture Detail</h1>
              <p className="text-xs text-neutral-500">SafeMove AI — System Design Documentation</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/slides" className="text-xs text-neutral-400 hover:text-flood-cyan transition-colors">Pitch Deck</Link>
            <Link to="/technology" className="text-xs text-neutral-400 hover:text-flood-cyan transition-colors">Technology</Link>
            <a
              href="https://github.com/ManhHoDinh/AI-Navigate/tree/main/docs/tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-flood-cyan hover:text-white transition-colors font-mono"
            >
              GitHub Docs →
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-storm-blue border border-storm-blue/30 rounded-full px-4 py-1.5 mb-4">
            System Design
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Architecture
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Deep technical documentation for two core AI modules: the LLM Flood Evaluation Engine
            and the Agent + Feedback Learning System.
          </p>
        </motion.div>

        {/* ======================== */}
        {/* MODULE 1: LLM ENGINE     */}
        {/* ======================== */}
        <div className="mb-20">
          <motion.div
            className="bg-storm-blue/5 border border-storm-blue/20 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Brain className="w-6 h-6 text-storm-blue" />
              <h2 className="text-xl font-bold text-white">Module 1: LLM Flood Evaluation Engine</h2>
            </div>
            <p className="text-sm text-neutral-400">
              Transforms raw multi-source data into intelligent, explainable flood severity assessments
              using LLM reasoning combined with rule-based scoring and user feedback.
            </p>
          </motion.div>

          <Section title="Architecture Overview" icon={Layers} color="bg-storm-blue">
            <Card title="System Flow">
              <div className="flex flex-col gap-3">
                <FlowStep num="1" label="Multi-Source Input" desc="Camera feeds, weather APIs, news crawl, user reports, historical data" />
                <FlowStep num="2" label="Preprocessing" desc="Normalize text, extract keywords, compress context, reduce token cost" />
                <FlowStep num="3" label="LLM Evaluation" desc="Structured prompt → GPT-4o reasoning → severity assessment" />
                <FlowStep num="4" label="Hybrid Scoring" desc="Final = w1×Rule + w2×LLM + w3×Feedback (weighted combination)" />
                <FlowStep num="5" label="Output" desc="Severity score, confidence, explanation, recommended action" />
              </div>
            </Card>

            <Card title="Component Diagram" accent="border-storm-blue/30">
              <CodeBlock>{`┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│   Camera    │    │   Weather    │    │    News      │
│   Service   │    │     API      │    │   Crawler    │
└──────┬──────┘    └──────┬───────┘    └──────┬───────┘
       │                  │                    │
       └──────────────────┼────────────────────┘
                          │
                 ┌────────▼────────┐
                 │  Input Aggregator│
                 │  (validation +   │
                 │   normalization) │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │  Preprocessing   │
                 │  (compress +     │
                 │   feature eng.)  │
                 └────────┬────────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
     ┌────────▼──┐  ┌─────▼─────┐  ┌─▼──────────┐
     │Rule-based │  │    LLM    │  │  Feedback   │
     │  Scorer   │  │ Evaluator │  │   Scorer    │
     │  (w1=0.3) │  │  (w2=0.5) │  │  (w3=0.2)  │
     └────────┬──┘  └─────┬─────┘  └─┬──────────┘
              │           │           │
              └───────────┼───────────┘
                          │
                 ┌────────▼────────┐
                 │  Hybrid Scoring  │
                 │  Engine          │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │  Flood Point DB  │
                 │  + Routing/Alert │
                 └─────────────────┘`}</CodeBlock>
            </Card>
          </Section>

          <Section title="Hybrid Scoring System" icon={Cpu} color="bg-flood-cyan">
            <Card title="Scoring Formula">
              <div className="bg-abyss/60 rounded-lg px-4 py-3 mb-4 text-center">
                <p className="font-mono text-lg text-flood-cyan font-bold">
                  Final Score = w1 &times; Rule + w2 &times; LLM + w3 &times; Feedback
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-safe-green/10 border border-safe-green/20 rounded-lg p-3">
                  <p className="text-xs font-bold text-safe-green">Rule-based (w1=0.3)</p>
                  <p className="text-xs text-neutral-400 mt-1">Rainfall thresholds, known flood zones, drainage risk class. Deterministic and fast.</p>
                </div>
                <div className="bg-storm-blue/10 border border-storm-blue/20 rounded-lg p-3">
                  <p className="text-xs font-bold text-storm-blue">LLM Score (w2=0.5)</p>
                  <p className="text-xs text-neutral-400 mt-1">Context-aware reasoning across all signals. Handles unstructured data and edge cases.</p>
                </div>
                <div className="bg-caution-amber/10 border border-caution-amber/20 rounded-lg p-3">
                  <p className="text-xs font-bold text-caution-amber">Feedback (w3=0.2)</p>
                  <p className="text-xs text-neutral-400 mt-1">User confirm/reject ground truth. Corrects model drift and local inaccuracies.</p>
                </div>
              </div>
            </Card>

            <Card title="Severity → Action Mapping">
              <div className="space-y-1.5">
                {[
                  { range: '0.0 — 0.2', level: 'NONE', action: 'Ignore', color: 'text-neutral-400' },
                  { range: '0.2 — 0.4', level: 'LOW', action: 'Monitor', color: 'text-flood-cyan' },
                  { range: '0.4 — 0.6', level: 'MEDIUM', action: 'Warn users', color: 'text-caution-amber' },
                  { range: '0.6 — 0.8', level: 'HIGH', action: 'Avoid route', color: 'text-storm-blue' },
                  { range: '0.8 — 1.0', level: 'CRITICAL', action: 'Block road', color: 'text-danger-red' },
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between bg-abyss/40 rounded-md px-4 py-2">
                    <span className="font-mono text-xs text-neutral-400">{t.range}</span>
                    <span className={`text-xs font-bold ${t.color}`}>{t.level}</span>
                    <span className="text-xs text-neutral-400">{t.action}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="LLM Prompt Design">
              <CodeBlock>{`SYSTEM:
You are an urban flood risk analysis AI for Ho Chi Minh City.
Evaluate flood severity based on multi-source signals.

RULES:
- Prioritize real-time signals over historical data
- If camera and weather agree, boost confidence
- If sources conflict, reduce confidence and explain why
- Output MUST be valid JSON

USER:
Location: 10.7769° N, 106.7009° E (Nguyen Hue Blvd, District 1)
Time: 2026-03-22T08:30:00+07:00

Weather:
  rainfall: 85mm/2hrs (heavy)
  humidity: 94%
  forecast: continued heavy rain next 3hrs

Camera:
  description: "Water visible on road surface, ~15cm depth"
  confidence: 0.82

News:
  - "District 1 flooding reported on major boulevards"
  - "Traffic disrupted on Le Loi Street due to water"

History:
  flood_frequency: HIGH (12 events/year at this location)
  past_severity_avg: 0.71
  drainage_risk: POOR

User Reports (last 2hrs): 3 reports, avg severity: HIGH

OUTPUT FORMAT:
{
  "severity_score": <float 0-1>,
  "severity_level": "<NONE|LOW|MEDIUM|HIGH|CRITICAL>",
  "confidence": <float 0-1>,
  "explanation": "<max 200 chars>"
}`}</CodeBlock>
            </Card>

            <Card title="Output Example">
              <CodeBlock>{`{
  "severity_score": 0.82,
  "severity_level": "CRITICAL",
  "confidence": 0.87,
  "explanation": "Heavy rainfall (85mm/2h) + camera confirms
    15cm water + 3 user reports + historical high-risk zone.
    All sources converge on HIGH-CRITICAL severity."
}`}</CodeBlock>
            </Card>
          </Section>

          <Section title="Challenges & Mitigations" icon={Shield} color="bg-danger-red">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Hallucination', desc: 'LLM fabricates severity. Mitigation: output range validation, rule-based cross-check, confidence bounds.', color: 'border-danger-red/20' },
                { title: 'Latency', desc: 'LLM calls add 1-3s. Mitigation: cache by location grid + weather bucket, skip LLM when rule confidence > 0.9.', color: 'border-caution-amber/20' },
                { title: 'Cost', desc: 'High LLM API costs at scale. Mitigation: GPT-4o-mini for simple cases, batch calls, context compression.', color: 'border-safe-green/20' },
              ].map((c, i) => (
                <motion.div key={i} variants={fadeUp} className={`bg-slate-dark border ${c.color} rounded-xl p-4`}>
                  <p className="text-sm font-bold text-white mb-2">{c.title}</p>
                  <p className="text-xs text-neutral-400">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>

        {/* ======================== */}
        {/* MODULE 2: AGENT SYSTEM   */}
        {/* ======================== */}
        <div className="mb-20">
          <motion.div
            className="bg-safe-green/5 border border-safe-green/20 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Bot className="w-6 h-6 text-safe-green" />
              <h2 className="text-xl font-bold text-white">Module 2: Agent + Feedback Learning System</h2>
            </div>
            <p className="text-sm text-neutral-400">
              Transforms the system from static rule-based routing to self-improving intelligence
              that learns from every user interaction, route outcome, and operator correction.
            </p>
          </motion.div>

          <Section title="Feedback Loop Architecture" icon={Route} color="bg-safe-green">
            <Card title="System Flow">
              <div className="flex flex-col gap-3">
                <FlowStep num="1" label="Feedback Collection" desc="User confirms/rejects route, reports flood, operator corrections, implicit signals" />
                <FlowStep num="2" label="Trust Scoring" desc="Validate feedback source reliability, weight by historical accuracy" />
                <FlowStep num="3" label="Agent Memory" desc="Store in 3-tier memory: short-term (24h), mid-term (30d), long-term (permanent)" />
                <FlowStep num="4" label="Learning Engine" desc="LLM analysis: 'Why did this route fail?' or RL: reward-based policy optimization" />
                <FlowStep num="5" label="Policy Update" desc="Adjust routing weights, severity calibration, warning sensitivity" />
                <FlowStep num="6" label="Deployment" desc="Canary rollout (5% traffic) → validate → full deployment" />
              </div>
            </Card>

            <Card title="Data Flow Diagram" accent="border-safe-green/30">
              <CodeBlock>{`┌─────────────────────────────────────────────┐
│              USER / OPERATOR                │
│  (mobile app, dashboard, passive signals)   │
└──────────────────┬──────────────────────────┘
                   │
          ┌────────▼────────┐
          │ Feedback         │
          │ Collector        │──► Dedup, Validate
          │ (explicit +      │    Spam detect
          │  implicit)       │    Rate limit
          └────────┬────────┘
                   │
          ┌────────▼────────┐
          │  Trust Scorer    │──► Source reliability
          │                  │    Historical accuracy
          └────────┬────────┘
                   │
     ┌─────────────┼─────────────┐
     │             │             │
┌────▼───┐  ┌─────▼────┐  ┌────▼─────┐
│ Short  │  │  Mid     │  │  Long    │
│ Term   │  │  Term    │  │  Term    │
│ (24h)  │  │  (30d)   │  │  (perm)  │
│ Redis  │  │ Postgres │  │ PG + S3  │
└────┬───┘  └─────┬────┘  └────┬─────┘
     └─────────────┼─────────────┘
                   │
     ┌─────────────┼─────────────┐
     │                           │
┌────▼──────────┐    ┌──────────▼────┐
│ LLM Learning  │    │ RL Learning   │
│ (reasoning)   │    │ (reward-based)│
│               │    │               │
│ "Why did this │    │ State → Action│
│  route fail?" │    │ → Reward      │
└────┬──────────┘    └──────────┬────┘
     └─────────────┬─────────────┘
                   │
          ┌────────▼────────┐
          │  Policy Update   │
          │  Engine          │
          │                  │
          │  • Batch update  │
          │  • Canary 5%     │
          │  • Rollback      │
          └────────┬────────┘
                   │
          ┌────────▼────────┐
          │  Routing +       │
          │  Severity +      │
          │  Warning Policy  │
          └─────────────────┘`}</CodeBlock>
            </Card>
          </Section>

          <Section title="Agent Memory Design" icon={Database} color="bg-flood-cyan">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card title="Short-term (24h)" accent="border-flood-cyan/20">
                <ul className="space-y-1.5 text-xs text-neutral-400">
                  <li>• Recent feedback events</li>
                  <li>• Active flood incidents</li>
                  <li>• Current route outcomes</li>
                  <li>• Storage: Redis (in-memory)</li>
                  <li>• TTL: 24 hours auto-expire</li>
                </ul>
              </Card>
              <Card title="Mid-term (30 days)" accent="border-storm-blue/20">
                <ul className="space-y-1.5 text-xs text-neutral-400">
                  <li>• Weekly routing patterns</li>
                  <li>• Zone-specific failure rates</li>
                  <li>• Recurring issues by area</li>
                  <li>• Storage: PostgreSQL</li>
                  <li>• Decay: linear over 30 days</li>
                </ul>
              </Card>
              <Card title="Long-term (permanent)" accent="border-safe-green/20">
                <ul className="space-y-1.5 text-xs text-neutral-400">
                  <li>• Historical routing weights</li>
                  <li>• Severity calibration history</li>
                  <li>• Learned zone policies</li>
                  <li>• Storage: PostgreSQL + S3</li>
                  <li>• Immutable audit trail</li>
                </ul>
              </Card>
            </div>
          </Section>

          <Section title="Learning Engines" icon={Zap} color="bg-caution-amber">
            <Card title="LLM-based Learning">
              <p className="text-xs text-neutral-400 mb-3">Uses LLM to analyze route failures and recommend policy adjustments.</p>
              <CodeBlock>{`PROMPT:
A route was recommended to avoid flood risk, but the user
reported that the route still passed through a flooded area.

Context:
- Weather severity: HIGH (85mm/2hrs)
- Route path: Nguyen Hue → Hai Ba Trung → District 3
- Flood reports near segment B: 3 confirmed
- Historical flood frequency in zone: HIGH
- ETA increase of alternative route: 12 minutes

Analyze:
1. Why did the route fail?
2. Which signal should have been weighted higher?
3. What policy adjustment is recommended?

OUTPUT:
{
  "failure_reason": "Historical flood risk was underestimated.
    Zone B has poor drainage + high elevation change.",
  "signal_adjustment": "Increase weather signal weight for
    Zone B from 0.3 to 0.5 during heavy rain events.",
  "policy_update": {
    "zone": "B",
    "condition": "rainfall > 50mm/h",
    "penalty_increase": 0.25
  },
  "confidence": 0.81
}`}</CodeBlock>
            </Card>

            <Card title="RL-based Learning (Advanced)">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-abyss/40 rounded-lg p-3">
                  <p className="text-xs font-bold text-white mb-2">Reward Design</p>
                  <div className="space-y-1 font-mono text-xs">
                    <p className="text-safe-green">+2 — Route avoids flood zone</p>
                    <p className="text-safe-green">+1 — ETA acceptable (&lt;15min extra)</p>
                    <p className="text-danger-red">-3 — Route enters flooded zone</p>
                    <p className="text-danger-red">-1 — User rejects recommended route</p>
                  </div>
                </div>
                <div className="bg-abyss/40 rounded-lg p-3">
                  <p className="text-xs font-bold text-white mb-2">State Space</p>
                  <ul className="space-y-1 text-xs text-neutral-400">
                    <li>• Weather condition vector</li>
                    <li>• Flood severity map</li>
                    <li>• Route candidates + ETA</li>
                    <li>• Historical route performance</li>
                    <li>• User trust profile</li>
                  </ul>
                </div>
              </div>
            </Card>
          </Section>

          <Section title="Policy Update & Trust" icon={BarChart3} color="bg-storm-blue">
            <Card title="Trust Scoring Formula">
              <CodeBlock>{`trust_score = (correct_feedbacks / total_feedbacks)
             × recency_weight
             × geographic_diversity_factor

where:
  recency_weight = exp(-λ × days_since_last_feedback)
  geographic_diversity_factor = unique_zones / total_zones

Apply threshold: only use feedback if trust_score > 0.4`}</CodeBlock>
            </Card>

            <Card title="Policy Update Safety">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-abyss/40 rounded-lg p-3">
                  <p className="text-xs font-bold text-white mb-2">Update Rules</p>
                  <ul className="space-y-1 text-xs text-neutral-400">
                    <li>• Batch updates every 6 hours</li>
                    <li>• Min sample size: 10 feedbacks</li>
                    <li>• Min confidence: 0.7</li>
                    <li>• Max change per update: ±20%</li>
                  </ul>
                </div>
                <div className="bg-abyss/40 rounded-lg p-3">
                  <p className="text-xs font-bold text-white mb-2">Deployment</p>
                  <ul className="space-y-1 text-xs text-neutral-400">
                    <li>• Canary: 5% traffic for 2 hours</li>
                    <li>• Monitor route success rate</li>
                    <li>• Auto-rollback if success rate drops &gt;5%</li>
                    <li>• Full deploy after validation</li>
                  </ul>
                </div>
              </div>
            </Card>
          </Section>
        </div>

        {/* API Reference */}
        <Section title="API Reference" icon={Server} color="bg-flood-cyan">
          <Card title="Flood Evaluation API">
            <CodeBlock>{`POST /api/flood/evaluate
Content-Type: application/json

{
  "location": { "lat": 10.7769, "lng": 106.7009 },
  "timestamp": "2026-03-22T08:30:00Z",
  "weather": { "rainfall_mm": 85, "humidity": 94, "forecast": "heavy" },
  "camera": { "description": "Water on road, ~15cm", "confidence": 0.82 },
  "news": ["District 1 flooding on major boulevards"],
  "history": { "flood_frequency": "HIGH", "drainage_risk": "POOR" }
}

Response 200:
{
  "evaluation_id": "eval_a7b3c9",
  "severity_score": 0.82,
  "severity_level": "CRITICAL",
  "confidence": 0.87,
  "explanation": "Heavy rainfall + camera confirms water + user reports",
  "recommended_action": "block_road",
  "processing_time_ms": 1847
}`}</CodeBlock>
          </Card>

          <Card title="Feedback API">
            <CodeBlock>{`POST /api/feedback
Content-Type: application/json

{
  "route_id": "route_x7k2",
  "feedback_type": "route_failed",
  "feedback_value": "flood_still_present",
  "location": { "lat": 10.78, "lng": 106.69 },
  "context": { "severity_score": 0.72, "weather_signal": 0.8 }
}

Response 200:
{
  "feedback_id": "fb_m3n8",
  "status": "accepted",
  "trust_score": 0.85,
  "will_trigger_learning": true
}`}</CodeBlock>
          </Card>
        </Section>

        {/* Footer */}
        <motion.div
          className="text-center py-12 border-t border-neutral-800 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-neutral-500 mb-4">
            Full documentation available on GitHub
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/ManhHoDinh/AI-Navigate/blob/main/docs/tech/llm-flood-evaluation-engine.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-flood-cyan hover:text-white transition-colors font-mono bg-slate-dark border border-neutral-700 rounded-lg px-4 py-2"
            >
              llm-flood-evaluation-engine.md →
            </a>
            <a
              href="https://github.com/ManhHoDinh/AI-Navigate/blob/main/docs/tech/agent-feedback-learning-system.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-safe-green hover:text-white transition-colors font-mono bg-slate-dark border border-neutral-700 rounded-lg px-4 py-2"
            >
              agent-feedback-learning-system.md →
            </a>
          </div>
          <p className="text-xs text-neutral-600 mt-6">
            SafeMove AI — Graduation Thesis — UIT VNU-HCM · IEEE ICCAIS 2024
          </p>
        </motion.div>
      </main>
    </div>
  );
}
