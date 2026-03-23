# Pitch Deck UI/UX Improvements Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the React pitch deck slides at `/slides` with professional startup UI/UX, real tech brand logos, hackathon-appropriate content (no pre-built references), and proper pitch flow ordering.

**Architecture:** 26 React slide components rendered by `PitchDeck.tsx` using scroll-snap navigation. Each slide is a standalone component using `SlideLayout.tsx` as base wrapper with Framer Motion animations and Tailwind CSS styling. Brand logos loaded from `cdn.simpleicons.org`.

**Tech Stack:** React 19, TypeScript, Framer Motion, Tailwind CSS 4, Lucide React icons, Vite 8

---

## File Structure

### Files to Create
- `web/src/components/slides/SlideWhyNow.tsx` — New "Why Now?" slide (climate + smart city + AI maturity)
- `web/src/components/slides/SlideTraction.tsx` — New "Built in 48 Hours" traction slide with tech logos
- `web/src/components/slides/SlideCompetition.tsx` — New competitive landscape comparison table
- `web/src/components/slides/SlideThankYou.tsx` — New closing "Thank You" slide

### Files to Modify
- `web/src/pages/PitchDeck.tsx` — Reorder slides, add new slides, remove duplicate closing
- `web/src/components/slides/Slide12Team.tsx` — Already updated (Ho Dinh Manh only + tech logos)
- `web/src/components/slides/Slide14Architecture.tsx` — Add tech brand logos to layer labels
- `web/src/components/slides/Slide24Infrastructure.tsx` — Add brand logo row for AWS/Docker/etc
- `web/src/components/slides/Slide01Title.tsx` — Minor: remove any pre-built references

### Files NOT to touch
- `SlideLayout.tsx` — Base wrapper is solid
- `web/src/index.css` — Theme colors are good
- `web/src/main.tsx` — Routing is correct

---

## Task 1: Create "Why Now?" Slide

**Files:**
- Create: `web/src/components/slides/SlideWhyNow.tsx`

- [ ] **Step 1: Create SlideWhyNow.tsx**

```tsx
import { motion } from 'framer-motion';
import { CloudRain, Building2, Brain } from 'lucide-react';
import SlideLayout from './SlideLayout';

const reasons = [
  {
    icon: CloudRain,
    num: '01',
    title: 'Climate Acceleration',
    desc: 'Urban flooding frequency has increased 3x in 20 years. Climate models project continued escalation through 2050.',
    color: 'text-caution-amber',
    bg: 'bg-caution-amber/10',
    border: 'border-caution-amber/20',
  },
  {
    icon: Building2,
    num: '02',
    title: 'Smart City Investment Wave',
    desc: 'Global smart city spending will reach $189B by 2028. Governments are actively seeking AI-powered infrastructure.',
    color: 'text-storm-blue',
    bg: 'bg-storm-blue/10',
    border: 'border-storm-blue/20',
  },
  {
    icon: Brain,
    num: '03',
    title: 'AI/LLM Maturity',
    desc: 'Foundation models enable real-time multimodal assessment at cost points impossible 2 years ago.',
    color: 'text-flood-cyan',
    bg: 'bg-flood-cyan/10',
    border: 'border-flood-cyan/20',
  },
];

const bottomCards = [
  { title: 'Camera Infrastructure Exists', desc: '600+ CCTV cameras already deployed — untapped data source', color: 'text-safe-green', border: 'border-safe-green/20' },
  { title: 'Zero Incumbents', desc: 'No product combines flood CV + LLM + routing today', color: 'text-danger-red', border: 'border-danger-red/20' },
];

export default function SlideWhyNow() {
  return (
    <SlideLayout background="default">
      <div className="flex flex-col h-full">
        <motion.div
          className="text-xs font-semibold uppercase tracking-widest text-caution-amber border border-caution-amber/30 rounded-full px-3 py-1 w-fit"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Timing
        </motion.div>
        <motion.h2
          className="text-4xl font-bold text-white mt-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Now?
        </motion.h2>

        <div className="flex-1 flex flex-col gap-5 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                className={`${r.bg} border ${r.border} rounded-xl p-5 text-center`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-10 h-10 rounded-lg ${r.bg} flex items-center justify-center mx-auto mb-3`}>
                  <r.icon className={`w-5 h-5 ${r.color}`} strokeWidth={1.5} />
                </div>
                <p className="font-mono text-xs text-neutral-500 mb-1">{r.num}</p>
                <p className={`font-semibold text-sm ${r.color}`}>{r.title}</p>
                <p className="text-neutral-400 text-xs mt-2 leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {bottomCards.map((c, i) => (
              <motion.div
                key={i}
                className={`bg-slate-dark border ${c.border} rounded-lg p-4 text-center`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <p className={`font-semibold text-sm ${c.color}`}>{c.title}</p>
                <p className="text-neutral-500 text-xs mt-1">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `cd D:/hackathon/Safe-Move/AI-Navigate && npx tsc --noEmit 2>&1 | head -20`

- [ ] **Step 3: Commit**

```bash
git add web/src/components/slides/SlideWhyNow.tsx
git commit -m "feat: add Why Now slide for pitch deck"
```

---

## Task 2: Create "Built in 48 Hours" Traction Slide

**Files:**
- Create: `web/src/components/slides/SlideTraction.tsx`

- [ ] **Step 1: Create SlideTraction.tsx**

```tsx
import { motion } from 'framer-motion';
import { Camera, Brain, Layers } from 'lucide-react';
import SlideLayout from './SlideLayout';

const cards = [
  { icon: Camera, stat: '600+', label: 'Cameras Integrated', desc: 'Real-time monitoring of Ho Chi Minh City\'s full CCTV network in a single hackathon sprint.', tag: 'Live System', color: 'text-storm-blue', bg: 'bg-storm-blue/10', border: 'border-storm-blue/30' },
  { icon: Brain, stat: '~90%', label: 'Detection Accuracy', desc: 'CNN flood detection model trained and deployed with transfer learning. Real-time inference.', tag: 'AI-Powered', color: 'text-caution-amber', bg: 'bg-caution-amber/10', border: 'border-caution-amber/30' },
  { icon: Layers, stat: '7', label: 'Microservices', desc: 'Full-stack platform: FastAPI backend, React dashboard, Flutter mobile app, Docker deployment.', tag: 'Full Stack', color: 'text-flood-cyan', bg: 'bg-flood-cyan/10', border: 'border-flood-cyan/30' },
];

const techLogos = [
  { name: 'Python', url: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'TensorFlow', url: 'https://cdn.simpleicons.org/tensorflow/FF6F00' },
  { name: 'Flutter', url: 'https://cdn.simpleicons.org/flutter/02569B' },
  { name: 'React', url: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'FastAPI', url: 'https://cdn.simpleicons.org/fastapi/009688' },
  { name: 'Docker', url: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Google Maps', url: 'https://cdn.simpleicons.org/googlemaps/4285F4' },
  { name: 'Firebase', url: 'https://cdn.simpleicons.org/firebase/FFCA28' },
  { name: 'PostgreSQL', url: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'Redis', url: 'https://cdn.simpleicons.org/redis/DC382D' },
];

const stats = [
  { value: '600+', label: 'cameras monitored' },
  { value: '~90%', label: 'detection accuracy' },
  { value: '<5s', label: 'alert latency' },
  { value: '12s', label: 'camera refresh' },
];

export default function SlideTraction() {
  return (
    <SlideLayout background="accent">
      <div className="flex flex-col h-full">
        <motion.div
          className="text-xs font-semibold uppercase tracking-widest text-safe-green border border-safe-green/30 rounded-full px-3 py-1 w-fit"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Built
        </motion.div>
        <motion.h2
          className="text-4xl font-bold text-white mt-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Built in 48 Hours. Production-Ready.
        </motion.h2>

        <div className="flex-1 flex flex-col gap-4 mt-6">
          {/* 3 stat cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {cards.map((c, i) => (
              <motion.div
                key={i}
                className={`${c.bg} border ${c.border} rounded-xl p-5 text-center`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <p className={`font-mono font-bold text-3xl ${c.color}`}>{c.stat}</p>
                <p className="font-semibold text-sm text-white mt-1">{c.label}</p>
                <p className="text-neutral-400 text-xs mt-2 leading-relaxed">{c.desc}</p>
                <span className={`inline-block mt-3 text-[10px] font-semibold uppercase tracking-wider ${c.color} ${c.bg} border ${c.border} rounded px-2 py-0.5`}>
                  {c.tag}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Tech logos row */}
          <motion.div
            className="flex items-center justify-center gap-5 flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {techLogos.map((t) => (
              <img key={t.name} src={t.url} alt={t.name} className="h-5 opacity-70 hover:opacity-100 transition-opacity" title={t.name} />
            ))}
          </motion.div>

          {/* Bottom stats bar */}
          <motion.div
            className="bg-slate-dark border border-flood-cyan/15 rounded-lg px-6 py-3 flex items-center justify-center gap-6 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((s, i) => (
              <div key={i} className="flex items-baseline gap-1.5 text-sm">
                <span className="font-mono font-bold text-flood-cyan">{s.value}</span>
                <span className="text-neutral-400">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `cd D:/hackathon/Safe-Move/AI-Navigate && npx tsc --noEmit 2>&1 | head -20`

- [ ] **Step 3: Commit**

```bash
git add web/src/components/slides/SlideTraction.tsx
git commit -m "feat: add Traction slide with tech brand logos"
```

---

## Task 3: Create Competitive Landscape Slide

**Files:**
- Create: `web/src/components/slides/SlideCompetition.tsx`

- [ ] **Step 1: Create SlideCompetition.tsx**

```tsx
import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import SlideLayout from './SlideLayout';

const capabilities = [
  'Real-time Flood CV Detection',
  'LLM Severity Assessment',
  'Flood-Aware Routing',
  'Predictive Flood Warnings',
  'Autonomous Learning Agent',
  'Open Research / Dataset',
];

type Support = 'yes' | 'no' | 'partial';

const competitors: { name: string; color: string; support: Support[] }[] = [
  { name: 'SafeMove AI', color: 'text-flood-cyan', support: ['yes', 'yes', 'yes', 'yes', 'yes', 'yes'] },
  { name: 'Google Maps', color: 'text-neutral-400', support: ['no', 'no', 'partial', 'no', 'no', 'no'] },
  { name: 'Waze', color: 'text-neutral-400', support: ['no', 'no', 'partial', 'no', 'no', 'no'] },
  { name: 'HERE', color: 'text-neutral-400', support: ['no', 'no', 'partial', 'no', 'no', 'no'] },
];

function SupportIcon({ status }: { status: Support }) {
  if (status === 'yes') return <Check className="w-4 h-4 text-safe-green" />;
  if (status === 'partial') return <Minus className="w-4 h-4 text-caution-amber" />;
  return <X className="w-4 h-4 text-danger-red" />;
}

export default function SlideCompetition() {
  return (
    <SlideLayout>
      <div className="flex flex-col h-full">
        <motion.div
          className="text-xs font-semibold uppercase tracking-widest text-storm-blue border border-storm-blue/30 rounded-full px-3 py-1 w-fit"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Competition
        </motion.div>
        <motion.h2
          className="text-4xl font-bold text-white mt-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why No One Else Can Do This
        </motion.h2>

        <motion.div
          className="flex-1 mt-6 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-slate-dark border border-neutral-700 rounded-xl overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-5 gap-px bg-neutral-800">
              <div className="bg-slate-dark p-3 text-xs font-semibold text-neutral-500">Capability</div>
              {competitors.map((c) => (
                <div key={c.name} className={`bg-slate-dark p-3 text-xs font-semibold text-center ${c.color}`}>
                  {c.name}
                </div>
              ))}
            </div>
            {/* Data rows */}
            {capabilities.map((cap, ri) => (
              <div key={ri} className="grid grid-cols-5 gap-px bg-neutral-800">
                <div className={`p-3 text-xs font-medium text-neutral-300 ${ri % 2 === 0 ? 'bg-abyss/60' : 'bg-slate-dark'}`}>
                  {cap}
                </div>
                {competitors.map((c, ci) => (
                  <div key={ci} className={`p-3 flex items-center justify-center ${ri % 2 === 0 ? 'bg-abyss/60' : 'bg-slate-dark'}`}>
                    <SupportIcon status={c.support[ri]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-slate-dark border border-neutral-700 rounded-lg px-6 py-3 mt-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-neutral-400 text-sm">
            Existing players react to <span className="text-caution-amber font-semibold">user-reported</span> floods. We{' '}
            <span className="text-flood-cyan font-bold">detect, predict, and prevent</span> automatically.
          </span>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `cd D:/hackathon/Safe-Move/AI-Navigate && npx tsc --noEmit 2>&1 | head -20`

- [ ] **Step 3: Commit**

```bash
git add web/src/components/slides/SlideCompetition.tsx
git commit -m "feat: add Competitive Landscape slide"
```

---

## Task 4: Create "Thank You" Closing Slide

**Files:**
- Create: `web/src/components/slides/SlideThankYou.tsx`

- [ ] **Step 1: Create SlideThankYou.tsx**

```tsx
import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

export default function SlideThankYou() {
  return (
    <SlideLayout background="accent" className="items-center justify-center text-center">
      {/* Animated particles */}
      {[15, 70, 30, 65, 45].map((left, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-storm-blue"
          style={{ top: `${20 + i * 12}%`, left: `${left}%` }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <motion.h2
        className="text-6xl lg:text-7xl font-bold"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <span className="text-white">Thank </span>
        <span className="text-flood-cyan" style={{ textShadow: '0 0 40px rgba(6,182,212,0.4)' }}>
          You
        </span>
      </motion.h2>

      <motion.div
        className="w-16 h-0.5 bg-gradient-to-r from-storm-blue to-flood-cyan rounded-full mt-4"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      />

      <motion.p
        className="font-mono text-flood-cyan text-lg mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        safemove.ai
      </motion.p>

      <motion.div
        className="flex flex-col items-center gap-1 mt-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        viewport={{ once: true }}
      >
        <p className="text-neutral-300 text-sm font-medium">Ho Dinh Manh</p>
        <p className="text-neutral-500 text-xs">Built at Hackathon 2026</p>
      </motion.div>

      <motion.p
        className="text-white font-bold text-xl mt-8 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        viewport={{ once: true }}
      >
        Floods are inevitable.{' '}
        <span className="text-neutral-500">Traffic chaos is not.</span>
      </motion.p>
    </SlideLayout>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `cd D:/hackathon/Safe-Move/AI-Navigate && npx tsc --noEmit 2>&1 | head -20`

- [ ] **Step 3: Commit**

```bash
git add web/src/components/slides/SlideThankYou.tsx
git commit -m "feat: add Thank You closing slide"
```

---

## Task 5: Update PitchDeck.tsx with New Slides and Professional Flow

**Files:**
- Modify: `web/src/pages/PitchDeck.tsx`

- [ ] **Step 1: Update PitchDeck.tsx**

Replace the import section and slides array to include 4 new slides and reorder into professional pitch flow:

**New imports to add:**
```tsx
import SlideWhyNow from '../components/slides/SlideWhyNow';
import SlideTraction from '../components/slides/SlideTraction';
import SlideCompetition from '../components/slides/SlideCompetition';
import SlideThankYou from '../components/slides/SlideThankYou';
```

**New slide order (30 slides):**
```tsx
const slides = [
  // --- A: PITCH NARRATIVE ---
  Slide01Title,         // 1. Title
  Slide02Problem,       // 2. Problem
  SlideWhyNow,          // 3. Why Now? (NEW)
  Slide03Solution,      // 4. Solution Overview
  SlideTraction,        // 5. Built in 48 Hours (NEW)
  Slide04Intelligence,  // 6. Three AI Systems
  Slide06Prediction,    // 7. Prediction / Early Warning
  Slide07Product,       // 8. Product - Built for Operators
  Slide23Products,      // 9. Products Portfolio

  // --- B: BUSINESS CASE ---
  Slide08Market,        // 10. Market Opportunity
  SlideCompetition,     // 11. Competitive Landscape (NEW)
  Slide09Business,      // 12. Business Model
  Slide10Impact,        // 13. Impact
  SlideAWSCost,         // 14. Unit Economics
  Slide11Roadmap,       // 15. Roadmap
  Slide12Team,          // 16. Team + The Ask
  Slide25Evolution,     // 17. Vision

  // --- C: TECHNICAL APPENDIX ---
  Slide14Architecture,  // 18. System Architecture
  Slide15DataSources,   // 19. Five Data Streams
  Slide16Processing,    // 20. Processing Pipeline
  Slide17FloodDetection,// 21. Flood Detection + LLM
  Slide20Prediction,    // 22. Prediction Engine Detail
  Slide18Routing,       // 23. Routing Engine
  Slide19AgentLoop,     // 24. Agent System
  Slide05Simulation,    // 25. Simulation Overview
  Slide21Simulation,    // 26. Simulation Detail
  Slide22Reporting,     // 27. Reporting
  Slide24Infrastructure,// 28. AWS Infrastructure
  Slide13Expansion,     // 29. Expansion

  // --- CLOSING ---
  SlideThankYou,        // 30. Thank You (NEW)
];
```

- [ ] **Step 2: Build to verify**

Run: `cd D:/hackathon/Safe-Move/AI-Navigate && npx vite build 2>&1 | tail -15`
Expected: Build succeeds with no errors

- [ ] **Step 3: Commit**

```bash
git add web/src/pages/PitchDeck.tsx
git commit -m "feat: add new slides and reorder for professional pitch flow"
```

---

## Task 6: Add Tech Brand Logos to Infrastructure Slide

**Files:**
- Modify: `web/src/components/slides/Slide24Infrastructure.tsx`

- [ ] **Step 1: Read current file to find insertion point**

Read `web/src/components/slides/Slide24Infrastructure.tsx` and find the stats/metrics section at the bottom.

- [ ] **Step 2: Add a tech logo row**

Add a row of brand logos (AWS, Docker, Kafka, PostgreSQL, Redis, Supabase, Firebase) above the stats section. Use `<img>` tags from `cdn.simpleicons.org` with `h-5 opacity-70 hover:opacity-100 transition-opacity` styling, wrapped in a flex row.

- [ ] **Step 3: Build to verify**

Run: `cd D:/hackathon/Safe-Move/AI-Navigate && npx vite build 2>&1 | tail -10`

- [ ] **Step 4: Commit**

```bash
git add web/src/components/slides/Slide24Infrastructure.tsx
git commit -m "feat: add tech brand logos to Infrastructure slide"
```

---

## Task 7: Final Build and Visual Verification

**Files:** None (verification only)

- [ ] **Step 1: Full build**

Run: `cd D:/hackathon/Safe-Move/AI-Navigate && npx vite build 2>&1 | tail -15`
Expected: Clean build, no warnings

- [ ] **Step 2: Start dev server and verify in browser**

Run: `cd D:/hackathon/Safe-Move/AI-Navigate && npx vite dev --port 5173 &`

Navigate to `http://localhost:5173/slides` in browser.
Verify:
- All 30 slides render without errors
- Slide order follows pitch flow (Story → Business → Technical → Thank You)
- Tech brand logos load on slides 5, 16, 28
- Team slide shows "Ho Dinh Manh" with no pre-built references
- Competitive landscape table renders correctly
- Navigation dots, progress bar, and keyboard controls work

- [ ] **Step 3: Take screenshots of key slides using Playwright**

Navigate through slides 1, 3, 5, 11, 16, 30 and take screenshots to verify visual quality.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete pitch deck improvements with professional flow and brand logos"
```

---

## Summary

| Task | New/Modified | Description |
|------|-------------|-------------|
| 1 | Create `SlideWhyNow.tsx` | Climate + Smart City + AI maturity timing slide |
| 2 | Create `SlideTraction.tsx` | 48-hour hackathon traction + 10 tech brand logos |
| 3 | Create `SlideCompetition.tsx` | Competitive comparison table vs Google/Waze/HERE |
| 4 | Create `SlideThankYou.tsx` | Professional closing slide |
| 5 | Modify `PitchDeck.tsx` | Add 4 new slides, reorder to 30-slide pitch flow |
| 6 | Modify `Slide24Infrastructure.tsx` | Add brand logo row |
| 7 | Verify | Build, visual check, screenshots |
