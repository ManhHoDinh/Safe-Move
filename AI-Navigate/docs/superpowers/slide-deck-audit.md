# SafeMove AI Pitch Deck — Expert Audit & Refactor Plan

**Deck purpose:** Hackathon pitch (LotusHacks x HackHarvard 2026, Social & Mobility Track)
**Audience:** Judges evaluating Technical Implementation, Innovation, Functionality, Design/UX, Presentation, Impact
**Tone:** Premium tech startup, confident, modern, data-driven
**Language:** English

---

## OVERALL DECK EVALUATION

### Critical Issues
1. **33 slides is TOO MANY for a hackathon pitch.** Judges have ~5 min. Need 12-15 slides max for pitch section, with technical appendix available but not presented.
2. **Font inconsistency across slides** — some badges use different font sizes, badge styling varies between slides created by different subagents.
3. **Section badges are inconsistent** — some use rounded-full pills, others use different styling. Need unified badge component.
4. **The deck has 3 different "closing" patterns** — slide 16 (The Ask) has tagline, slide 17 (Vision) has expansion cards, slide 33 (Thank You) has another tagline. Should be ONE clear close.
5. **Technical appendix (slides 18-32) is 15 slides** — too dense for presentation. Should be available for Q&A only, not presented.
6. **Slide 15 heading "Built by People Who've Seen the Flood"** — there's only 1 person. Should be "Solo Builder. Full Stack." or similar.

### Repeated Issues
- Badge styling inconsistent (rounded-full vs rounded, different padding)
- Subtitle text varies: some `text-lg`, others `text-neutral-400`, others `text-sm`
- Card internal spacing varies: some `p-5`, others `p-4`, others `p-3`
- Some slides have section badges, others don't
- Bottom metric bars vary in styling across slides

---

## PROPOSED STYLE GUIDE

### Typography
- **Heading H1 (Title slide only):** `text-7xl lg:text-8xl font-bold` — Inter 900
- **Heading H2 (All content slides):** `text-4xl font-bold` — Inter 800
- **Subtitle:** `text-sm text-neutral-400 mt-1` — Inter 400
- **Badge:** `text-[10px] font-semibold uppercase tracking-widest` — Inter 600
- **Card title:** `text-sm font-semibold text-white` — Inter 600
- **Card body:** `text-xs text-neutral-400 leading-relaxed` — Inter 400
- **Stat number:** `font-mono font-bold` — JetBrains Mono 700
- **Caption/label:** `text-[10px] text-neutral-500 uppercase tracking-wider`

### Color System
- **Primary:** `flood-cyan` (#06B6D4) — data, metrics, links
- **Secondary:** `storm-blue` (#2563EB) — headings accent, badges
- **Success:** `safe-green` (#10B981) — positive metrics, safe routes
- **Warning:** `caution-amber` (#F59E0B) — alerts, costs
- **Danger:** `danger-red` (#EF4444) — flood zones, critical alerts
- **Background:** `abyss` (#0A0E1A) → `deep-navy` (#111827)
- **Surface:** `slate-dark` (#1E293B)
- **Border:** `neutral-700` at 50% opacity

### Spacing
- Slide padding: `px-10 py-12 lg:px-16 lg:py-16`
- Section gap: `gap-5`
- Card padding: `p-4`
- Card gap: `gap-3`

### Badge Component (standardized)
```
text-[10px] font-semibold uppercase tracking-widest
px-3 py-1 rounded-full border
bg-{color}/10 text-{color} border-{color}/30
```

---

## RECOMMENDED SLIDE STRUCTURE (Pitch: 15 slides + Appendix)

### PITCH (presented, ~5 min)
1. **Title** — SafeMove AI
2. **Problem** — The Invisible Crisis
3. **Why Now** — Timing
4. **Solution** — Detect → Evaluate → Route → Learn
5. **Traction** — Built in 48 Hours
6. **Product** — Built for Operators (dashboard mockup)
7. **AI Systems** — Three AI Systems
8. **Market** — $40B Market
9. **Competition** — Competitive Table
10. **Business Model** — SaaS + API + Data
11. **Impact** — Saving Lives
12. **Roadmap** — From Pilot to Platform
13. **Team + Ask** — Ho Dinh Manh + $2.5M (combined slide)
14. **Vision** — Urban Resilience OS
15. **Thank You** — Close

### APPENDIX (available for Q&A, not presented)
- System Architecture
- Tech Stack
- CNN Architecture
- Dataset Pipeline
- Camera Pipeline
- Data Streams
- Processing
- Detection + LLM
- Prediction Timeline
- Prediction Engine
- Routing
- Agent Loop
- Simulation x2
- Microservices
- Reporting
- Infrastructure
- AWS Cost
- Products Portfolio (Four Products)

### Slides to REMOVE from pitch flow:
- **Slide 8 (Four Products)** → merge into appendix (redundant with slide 7 Product)
- **Slide 13 (AWS Cost)** → move to appendix (too technical for pitch)
- **Slide 16 (The Ask)** → merge into Team slide (slide 15)

### Slides to MERGE:
- **Team + Ask** → combine into one slide (already done in Slide12Team.tsx)

---

## PER-SLIDE REFACTOR

### Slide 1: Title
- **Issues:** Missing LotusHacks branding (deploy pending), tag pills look like buttons not labels
- **Headline:** Keep "SafeMove AI"
- **Fix:** Add "LotusHacks x HackHarvard 2026 | Social & Mobility Track" below tagline

### Slide 2: Problem
- **Issues:** Subtitle too long (2 lines). Bottom bar text wraps awkwardly.
- **Fix:** Shorten subtitle to "Urban flooding kills thousands and paralyzes transport. No solution exists."
- **Bottom bar:** "Ho Chi Minh City: 40+ floods/year — 600+ cameras with zero intelligence"

### Slide 3: Why Now?
- **Issues:** Cards are visually flat, number badges (01, 02, 03) are small
- **Fix:** Make numbers larger (text-2xl), add colored left border to each card

### Slide 4: Solution
- **Issues:** "Continuous Feedback Loop" text with arrow characters looks amateur
- **Fix:** Replace arrow text with a thin horizontal line with gradient, or remove entirely

### Slide 5: Traction
- **Issues:** Card descriptions are too long (3 lines each). OpenAI/AWS logos broken on live (fixed in code, pending deploy)
- **Fix:** Shorten descriptions to 1 line each

### Slide 6: AI Systems
- **Issues:** Badge tags at bottom of cards look inconsistent
- **Fix:** Standardize badge styling

### Slide 7: Product (REDESIGNED)
- **Status:** New design pushed, pending deploy
- **No further changes needed**

### Slide 9: Market
- **Issues:** Concentric circles visualization is hard to read at a glance
- **Fix:** Consider replacing with horizontal bars or cleaner layout

### Slide 10: Competition
- **Issues:** "Published Research / Dataset" row should be removed (hackathon rule: no pre-built)
- **Fix:** Replace with "City-Scale Deployment" or remove row

### Slide 11: Business Model
- **Issues:** Revenue projection bars are good. No issues.

### Slide 12: Impact
- **Issues:** Clean layout, minor font size consistency
- **Fix:** Ensure body text is `text-xs` consistently

### Slide 14: Roadmap
- **Issues:** Good layout. Timeline pills at bottom are clean.

### Slide 15: Team
- **Issues:** Heading says "Built by People" but there's only 1 person
- **Fix:** Change heading to "Solo Builder. Full-Stack."

### Slide 16: The Ask
- **Issues:** This slide is REDUNDANT — The Ask is already in the Team slide (Slide12Team.tsx)
- **Fix:** Remove from pitch flow, or merge

### Slide 33: Thank You
- **Issues:** QR Code placeholder looks unfinished
- **Fix:** Either add real QR code or remove the placeholder entirely

---

## IMMEDIATE HIGH-PRIORITY FIXES

1. Fix Competition slide — remove "Published Research / Dataset" row
2. Fix Team slide heading — "Solo Builder. Full-Stack."
3. Remove QR Code placeholder from Thank You
4. Shorten Problem slide subtitle
5. Remove arrow text from Solution slide
6. Reorder PitchDeck.tsx — remove redundant slides from pitch section

---
