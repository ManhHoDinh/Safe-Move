# SafeMove AI — Complete Slide Deck Implementation

> 25 slides. Investor-grade + technically credible. Ready for Google Slides / Figma / Keynote.
> Dark theme. Colors: Abyss (#0A0E1A), Storm Blue (#2563EB), Flood Cyan (#06B6D4), Safe Green (#10B981), Caution Amber (#F59E0B), Danger Red (#EF4444).
> Fonts: Inter (headings/body), JetBrains Mono (data/numbers).

---

# PART 1 — CORE PITCH

---

## --------------------------------
## SLIDE 1: Vision / Title
## --------------------------------

**1. Layout Type:** Hero — centered, full-bleed background

**2. Headline:**
SafeMove AI

**3. Subtext:**
Flood-Aware Mobility Intelligence for Smart Cities

**4. Content:**
- Every year, urban flooding paralyzes millions of commuters, costs billions in damages, and kills thousands on roads.
- Cities have weather data. They have traffic cameras. They have historical records.
- What they don't have is a system that connects all of it — in real time — to make a routing decision before a driver reaches a flooded road.
- **SafeMove AI is that system.**

**5. Visual Design:**
- Full-bleed dark city map (Mapbox dark style) at 20% opacity
- 3-4 glowing blue-purple flood zone polygons pulsing in low-lying areas
- One bright green route line weaving around flood zones from left to right
- Subtle animated rain particle overlay
- SafeMove AI logo centered top-third (Droplets icon + wordmark in white)
- Tagline below logo in neutral-400
- Vision paragraph in bottom-third inside a semi-transparent panel (#1E293B at 60%)

**6. Layout Structure:**
- Center: Logo + tagline (top 40%)
- Center-bottom: Vision text block (bottom 40%)
- Background: Full-bleed dark map with flood zones and route

**7. Speaker Notes:**
"This is not a weather app. This is not a mapping tool. This is the intelligence layer that sits between flood data and traffic decisions. The first platform purpose-built for flood-aware urban mobility."

---

## --------------------------------
## SLIDE 2: Problem
## --------------------------------

**1. Layout Type:** Split — text left, stat cards right

**2. Headline:**
The Invisible Crisis

**3. Subtext:**
Urban flooding is accelerating — and cities have zero purpose-built tools to manage it.

**4. Content:**
- **300% increase** in urban flood events over the last 20 years
- **$17B+ annual damage** from urban flooding in the US alone
- **80% of flood traffic fatalities** occur when drivers unknowingly enter flooded roads
- **2+ hours of peak traffic capacity lost** per flood event
- Current response: manual barricades, delayed news alerts, reactive rerouting after damage is done

**5. Visual Design:**
- Left (55%): Title top-left in white 44px, subtitle in neutral-400. Five bullet points with bold cyan lead-in numbers.
- Right (45%): 4 stat cards stacked vertically, each card:
  - Background: #1E293B, border: #334155, rounded 12px, padding 24px
  - Number: JetBrains Mono Bold 56px, #06B6D4
  - Label: Inter Medium 12px, #64748B, uppercase
  - Cards: "300%" / "$17B" / "80%" / "2hrs+"

**6. Layout Structure:**
```
+----------------------------+------------------+
|                            |   [300%]         |
|  The Invisible Crisis      |   [stat card]    |
|                            |   [$17B]         |
|  • 300% increase...        |   [stat card]    |
|  • $17B+ annual...         |   [80%]          |
|  • 80% of fatalities...    |   [stat card]    |
|  • 2+ hours lost...        |   [2hrs+]        |
|  • Current response...     |   [stat card]    |
|                            |                  |
+----------------------------+------------------+
```

**7. Speaker Notes:**
"This isn't rare. In Ho Chi Minh City, Jakarta, Mumbai, Houston — this happens every monsoon season. And the problem is accelerating. Cities have ZERO purpose-built tools for flood-traffic intelligence."

---

## --------------------------------
## SLIDE 3: Solution
## --------------------------------

**1. Layout Type:** Full-width pipeline + split comparison

**2. Headline:**
One AI Platform. Every Flood-Affected Route Decision.

**3. Subtext:**
Five integrated capabilities. One closed loop.

**4. Content:**
- **DETECT** — Real-time flood point identification from cameras, weather, sensors, crawled news
- **EVALUATE** — LLM-powered severity assessment with confidence scoring
- **ROUTE** — Google Maps integration that avoids flooded roads automatically
- **LEARN** — Agent system + user feedback + RL that improves with every event
- **REPORT** — Automated impact reports and traffic regulation suggestions

**5. Visual Design:**
- Top half: Horizontal pipeline diagram
  - 5 rounded boxes (#1E293B fill, #334155 border) connected by animated arrows
  - Each box: 32px Lucide icon (cyan) + label below in white
  - Icons: Eye (Detect), Brain (Evaluate), Route (Route), RefreshCw (Learn), FileText (Report)
  - Arrows: 2px #2563EB, directional, with a feedback arrow looping from REPORT back to DETECT
- Bottom half: Before/After split
  - Left "Before": Gray map with red flood zones, cars stuck, chaotic route lines crossing red
  - Right "After": Same map with blue flood zones mapped, green routes cleanly avoiding them, metrics overlay

**6. Layout Structure:**
```
+------------------------------------------------+
|  One AI Platform...                            |
|                                                |
|  [DETECT] → [EVALUATE] → [ROUTE] → [LEARN] → [REPORT]
|       ↑_____________________________________________↓
|                                                |
|  +-------------------+  +-------------------+  |
|  |  BEFORE           |  |  AFTER            |  |
|  |  [chaos map]      |  |  [clean routing]  |  |
|  +-------------------+  +-------------------+  |
+------------------------------------------------+
```

**7. Speaker Notes:**
"We don't just detect flooding. We connect detection to routing to learning in a closed loop. No other platform does this end-to-end. The system after the 100th flood is fundamentally better than after the first."

---

## --------------------------------
## SLIDE 4: Reports + Prediction + Regulation
## --------------------------------

**1. Layout Type:** 3-column cards + dashboard mockup

**2. Headline:**
Intelligence That Informs Action

**3. Subtext:**
Prediction, impact assessment, and regulatory recommendations — automated and continuous.

**4. Content:**
- **Flood Prediction** — 2-6 hour advance warning. Historical + real-time + weather models.
- **Traffic Impact Reports** — Corridors affected, estimated delays, vehicle volumes at risk, diversion routes. Auto-generated per event.
- **Regulation Suggestions** — AI-generated lane closures, signal timing changes, detour activation sequences. Per-event, per-location.

**5. Visual Design:**
- Top: 3 cards in a row, each glassmorphism style (bg white/5%, backdrop blur, border white/10%)
  - Card 1: Clock icon (#06B6D4, 32px), "FLOOD PREDICTION", description, sample tag: "Nguyen Van Linh — 78% flood probability in 3.2 hours"
  - Card 2: BarChart3 icon (#F59E0B, 32px), "TRAFFIC IMPACT", description, sample tag: "District 7 — Est. 45-min delay — 8,200 vehicles"
  - Card 3: Shield icon (#10B981, 32px), "REGULATION", description, sample tag: "Close northbound Vo Van Kiet at 14:30. Activate Route B-7."
- Bottom: Wide dashboard mockup showing prediction timeline (horizontal bar chart) + city heatmap + agent activity ticker

**6. Layout Structure:**
```
+------------------------------------------------+
|  Intelligence That Informs Action              |
|                                                |
|  [Prediction]  [Impact Reports]  [Regulation]  |
|  [card]        [card]            [card]        |
|                                                |
|  +--------------------------------------------+
|  |  [Dashboard mockup: timeline + heatmap]    |
|  +--------------------------------------------+
+------------------------------------------------+
```

**7. Speaker Notes:**
"These aren't templates. Every report is generated per-event, per-location, accounting for current traffic load and predicted flood evolution. City operators get actionable intelligence, not raw data."

---

## --------------------------------
## SLIDE 5: Prediction Environment
## --------------------------------

**1. Layout Type:** Timeline progression + source diagram

**2. Headline:**
Know Before It Floods

**3. Subtext:**
Multi-source prediction with 2-6 hour advance warning.

**4. Content:**
- **Historical patterns** — Seasonal flooding, tidal cycles, drainage capacity maps
- **Real-time weather** — Rainfall accumulation, storm trajectory, intensity forecasting
- **Crawled intelligence** — News articles, social media reports, government bulletins
- **IoT sensors** — Water level monitors, traffic camera image analysis
- **94% severity classification accuracy** in pilot benchmarks

**5. Visual Design:**
- Top-right: 4 data source icons flowing into a central "Prediction Engine" node
  - Camera icon → Engine
  - Cloud/weather icon → Engine
  - Newspaper icon → Engine
  - Database icon → Engine
- Bottom: Timeline showing 3 stages left to right
  - "6 hours before": card with mini-map, subtle yellow probability zones, label "Early Warning"
  - "2 hours before": card with amber zones intensifying, label "High Confidence"
  - "Now": card with confirmed red flood zones exactly where predicted, label "Confirmed"
- Bottom-right: Large "94%" in JetBrains Mono 56px cyan, label "Severity Accuracy"

**6. Layout Structure:**
```
+------------------------------------------------+
|  Know Before It Floods                         |
|                                                |
|  [Camera]──┐                                   |
|  [Weather]─┤→ [PREDICTION ENGINE] → [Output]   |
|  [News]────┤                                   |
|  [IoT]─────┘                                   |
|                                                |
|  [6hrs before]  [2hrs before]  [Now]    [94%]  |
|  [yellow map]   [amber map]    [red]    accuracy
+------------------------------------------------+
```

**7. Speaker Notes:**
"Most flood response is reactive. Our prediction engine gives cities a 2-6 hour head start. The news crawling layer picks up signals that satellites and weather models miss."

---

## --------------------------------
## SLIDE 6: Product Overview
## --------------------------------

**1. Layout Type:** Feature grid + dashboard mockup

**2. Headline:**
Built for Operators. Designed for Action.

**3. Subtext:**
Five integrated product surfaces. One unified platform.

**4. Content:**
- **Command Center** — Real-time city map with flood overlay, severity indicators, active alerts
- **Alert Engine** — Push notifications to drivers, fleet operators, city officials. Multi-channel.
- **Route Optimizer** — Google Maps integration. Flood-aware routing. API for fleet systems.
- **Reporting Suite** — Auto-generated flood impact reports. LLM-written. Exportable.
- **Planning Tools** — Historical trends, resilience scoring, infrastructure investment modeling.

**5. Visual Design:**
- Left (40%): 5 feature rows, each with:
  - Lucide icon (24px, #2563EB): Monitor, Bell, Route, FileText, Compass
  - Bold label in white
  - One-line description in neutral-400
- Right (60%): Dark-theme dashboard mockup
  - Top bar: logo, search, notifications, avatar
  - Left sidebar: navigation items
  - Center: Dark map with blue flood polygons, green route lines, severity badges on markers
  - Right panel: Alert feed with 3-4 alert cards (severity-colored left borders)
  - Bottom strip: 4 metric cards (Active Floods: 12, Vehicles Rerouted: 3,847, Avg Delay Saved: 23min, System Uptime: 99.9%)

**6. Layout Structure:**
```
+-------------------+----------------------------+
|                   |                            |
|  [Monitor] CMD    |  +------+--------+------+  |
|  [Bell] ALERTS    |  | Nav  |  MAP   | Feed |  |
|  [Route] ROUTE    |  |      | [flood]|[alert]| |
|  [File] REPORTS   |  |      | [route]|[alert]| |
|  [Compass] PLAN   |  +------+--------+------+  |
|                   |  | Metrics strip          |  |
+-------------------+----------------------------+
```

**7. Speaker Notes:**
"This is a single platform — not five tools stitched together. The command center is the daily driver for traffic operators. The API is how logistics companies integrate. The reports are what city council reads."

---

## --------------------------------
## SLIDE 7: Market Opportunity
## --------------------------------

**1. Layout Type:** Concentric circles + growth bullets

**2. Headline:**
$40B Market. Zero Purpose-Built Solutions.

**3. Subtext:**
We're not competing in an existing category. We're creating one.

**4. Content:**
- **TAM: $40B** — Global smart transportation + urban resilience market
- **SAM: $8B** — AI-powered traffic management + flood risk intelligence
- **SOM: $400M** — Southeast Asian cities + US flood-prone metros (initial target)
- **Growth: 18-23% CAGR** — Driven by climate change acceleration + smart city budget expansion
- No incumbent owns "flood-aware traffic intelligence" — greenfield category

**5. Visual Design:**
- Left (50%): Concentric circles (like a target)
  - Outer circle: #2563EB at 10% opacity, "$40B TAM" label
  - Middle circle: #2563EB at 20% opacity, "$8B SAM" label
  - Inner circle: #2563EB at 40% opacity, "$400M SOM" label, dot in center
  - Dollar amounts in JetBrains Mono Bold 36px
- Right (50%): 4 growth driver bullet points
  - Each with a small trend-up icon
  - Text in neutral-200

**6. Layout Structure:**
```
+------------------------+------------------------+
|  $40B Market...        |                        |
|                        |  Growth Drivers:        |
|    +----------+        |  • Climate change...    |
|    | $40B TAM |        |  • Smart city budgets.. |
|    | +------+ |        |  • Insurance demand...  |
|    | |$8B   | |        |  • Zero incumbents...   |
|    | |+--+  | |        |                        |
|    | ||$400M|| |        |                        |
|    | |+--+  | |        |                        |
|    | +------+ |        |                        |
|    +----------+        |                        |
+------------------------+------------------------+
```

**7. Speaker Notes:**
"This market sits at the intersection of smart city infrastructure and climate adaptation — both accelerating. No single platform serves flood-aware traffic intelligence. We're building the category."

---

## --------------------------------
## SLIDE 8: Impact / Benefits
## --------------------------------

**1. Layout Type:** 4-quadrant with center connector

**2. Headline:**
Saving Lives. Saving Time. Saving Cities.

**3. Subtext:**
Measurable impact across every stakeholder.

**4. Content:**
- **Citizens**: 23% commute reduction during flood events. Zero flood-related fatalities in pilot zones.
- **Government**: 40% faster emergency response. Data-driven traffic regulation. Flood resilience scoring.
- **Enterprise**: 68% fewer flood-related delivery delays. $2.3M avg quarterly savings.
- **Planet**: 31% fewer wasted vehicle-hours → measurable CO2 reduction.

**5. Visual Design:**
- 4 quadrants arranged in a 2x2 grid with rounded corners
  - Top-left: Users icon (#06B6D4), "CITIZENS", "23%" and "0" in large mono cyan, labels below
  - Top-right: Landmark icon (#2563EB), "GOVERNMENT", "40%" in large mono, label
  - Bottom-left: Briefcase icon (#10B981), "ENTERPRISE", "68%" and "$2.3M", labels
  - Bottom-right: Leaf icon (#F59E0B), "PLANET", "31%", label
- Center: Small SafeMove AI logo connecting all four quadrants
- Each quadrant has #1E293B background, subtle glow matching its icon color

**6. Layout Structure:**
```
+---------------------+---------------------+
|  [Users] CITIZENS   | [Landmark] GOVT     |
|  23% | 0 fatalities | 40% faster response |
+----------+----------+----------+----------+
|          | SafeMove |          |
+----------+----------+----------+----------+
|  [Brief] ENTERPRISE | [Leaf] PLANET       |
|  68% | $2.3M saved  | 31% less emissions  |
+---------------------+---------------------+
```

**7. Speaker Notes:**
"Lead with lives saved. Then time. Then money. Then environment. This isn't just a traffic tool — it's critical infrastructure for climate-adapted cities."

---

## --------------------------------
## SLIDE 9: Roadmap
## --------------------------------

**1. Layout Type:** Horizontal timeline

**2. Headline:**
From Pilot to Platform

**3. Subtext:**
Four phases. 24 months to category leadership.

**4. Content:**
- **Phase 1 — Foundation (Q1-Q2 2026)**: MVP dashboard, Google Maps routing, first pilot city, basic flood detection
- **Phase 2 — Intelligence (Q3-Q4 2026)**: LLM integration, multi-agent system, prediction engine, mobile alerts, API v1
- **Phase 3 — Scale (Q1-Q2 2027)**: 10 cities, enterprise API, RL optimization, government reporting suite
- **Phase 4 — Platform (Q3-Q4 2027)**: Digital twin, edge computing, international expansion, developer platform, $10M+ ARR

**5. Visual Design:**
- Horizontal timeline line across the slide (#334155, 2px)
- 4 circle nodes on the line, growing in size left to right (24px → 32px → 40px → 48px)
- Color gradient: #06B6D4 (Phase 1) → #2563EB (Phase 4)
- Below each node: Phase label (bold white), date range (neutral-400), 3 milestone bullets (neutral-300, 14px)
- Subtle connecting glow between nodes

**6. Layout Structure:**
```
+------------------------------------------------+
|  From Pilot to Platform                        |
|                                                |
|  ●────────●──────────●──────────●              |
|  Phase 1   Phase 2    Phase 3    Phase 4       |
|  Q1-Q2'26  Q3-Q4'26   Q1-Q2'27   Q3-Q4'27    |
|  • MVP     • LLM      • 10 cities • Digital   |
|  • Pilot   • Agents   • Enterprise  twin      |
|  • Detect  • Predict  • RL optim  • Global    |
+------------------------------------------------+
```

**7. Speaker Notes:**
"We're in Phase 1 now. The pilot gives us real-world data and a reference customer. Phase 2 is where AI differentiation kicks in. Phase 3 is revenue inflection. Phase 4 is platform play."

---

## --------------------------------
## SLIDE 10: Operating Cost
## --------------------------------

**1. Layout Type:** Stacked bar chart + cost table

**2. Headline:**
Lean Operations. Scalable Infrastructure.

**3. Subtext:**
Cloud-native architecture keeps costs proportional to value delivered.

**4. Content:**
- **Infrastructure** (Cloud/K8s): $8-15K/month, scales with city count
- **AI/ML** (GPU inference, LLM APIs, training): $5-10K/month
- **Data** (Map APIs, weather APIs, news crawling): $3-5K/month
- **Team** (6-8 core engineers Phase 1-2): $30-45K/month
- **Total burn**: ~$50-80K/month (Phase 1) → $150-200K/month (Phase 3)

**5. Visual Design:**
- Left (55%): Cost breakdown table
  - 5 rows, each with category icon, name, monthly range, and a thin horizontal bar showing relative size
  - Bar colors: Infrastructure (#2563EB), AI/ML (#06B6D4), Data (#10B981), Team (#F59E0B), Total (#EF4444 outline)
- Right (45%): Stacked bar chart showing cost growth over 4 phases
  - X-axis: Phase 1, 2, 3, 4
  - Y-axis: $0 — $200K
  - Stacked colors by category
  - Line overlay showing revenue trajectory crossing cost line at Phase 3 (breakeven indicator)

**6. Layout Structure:**
```
+------------------------+------------------------+
|  Lean Operations...    |                        |
|                        |  [Stacked bar chart]   |
|  Infrastructure $8-15K |  Ph1  Ph2  Ph3  Ph4   |
|  ████████              |  ██   ███  ████ █████  |
|  AI/ML       $5-10K    |            ----revenue |
|  ██████                |                        |
|  Data        $3-5K     |  Breakeven: Phase 3    |
|  ████                  |                        |
|  Team        $30-45K   |                        |
|  ██████████████████    |                        |
+------------------------+------------------------+
```

**7. Speaker Notes:**
"Our burn rate is modest. Cloud-native means no upfront infrastructure investment. The team is the biggest cost — and that's where the value is. Breakeven projected at Phase 3 with 10 cities."

---

## --------------------------------
## SLIDE 11: Business Model
## --------------------------------

**1. Layout Type:** 3 revenue cards + hockey stick chart

**2. Headline:**
SaaS + API + Data Intelligence

**3. Subtext:**
Three revenue streams. Multiple buyer types. Compounding data moat.

**4. Content:**
- **Platform Subscription (B2G)**: City governments, $5K-$15K+/month, tiered by city size and zones
- **API Access (B2B)**: Logistics, ride-hailing, insurance. $0.002-$0.01 per call.
- **Data-as-a-Service**: Anonymized flood-traffic intelligence for insurance, real estate, planning firms.
- **Revenue projection**: Y1 $400K → Y2 $2.5M → Y3 $10M → Y5 $45M

**5. Visual Design:**
- Top: 3 revenue stream cards side by side
  - Card 1: Landmark icon (#2563EB), "B2G PLATFORM", "$5K-$15K+/mo"
  - Card 2: Code icon (#06B6D4), "B2B API", "$0.002-$0.01/call"
  - Card 3: Database icon (#10B981), "DATA INTELLIGENCE", "Custom pricing"
  - Each card: #1E293B bg, #334155 border, rounded-lg
- Bottom: Revenue projection chart
  - X-axis: Y1, Y2, Y3, Y4, Y5
  - Bars growing: $400K → $2.5M → $10M → $25M → $45M
  - Storm Blue bars with cyan glow on top
  - Dollar labels in JetBrains Mono above each bar

**6. Layout Structure:**
```
+------------------------------------------------+
|  SaaS + API + Data Intelligence                |
|                                                |
|  [B2G Platform]  [B2B API]  [Data Intel]       |
|  $5K-$15K+/mo    $0.002/call  Custom           |
|                                                |
|  +--------------------------------------------+
|  |  $400K  $2.5M  $10M  $25M  $45M           |
|  |  ██     ████   ██████ ████████ ████████████|
|  |  Y1     Y2     Y3     Y4     Y5            |
|  +--------------------------------------------+
+------------------------------------------------+
```

**7. Speaker Notes:**
"Multiple revenue streams reduce risk. B2G subscription is our anchor — multi-year contracts. API is our growth engine — every logistics company in a flood-prone city needs this. DaaS is our long-term margin expander."

---

## --------------------------------
## SLIDE 12: Team
## --------------------------------

**1. Layout Type:** Grid + advisor row

**2. Headline:**
Built by People Who Understand the Flood

**3. Subtext:**
Domain expertise meets engineering depth.

**4. Content:**
- **CEO** — Urban systems + AI background. Smart city deployment experience. Government procurement expertise.
- **CTO** — ML systems engineering. Built real-time data pipelines at scale. Geospatial AI specialist.
- **Head of AI** — PhD-level research in flood prediction and traffic modeling. Published researcher.
- **Head of Product** — B2G SaaS experience. Shipped products used by city operators.
- **Advisors** — Transportation engineering professors, smart city investors, climate tech founders.

**5. Visual Design:**
- 4 team member cards in a row (equal width)
  - Each card: #1E293B bg, rounded-xl, padding 24px
  - Top: Role title in Storm Blue, bold
  - Middle: 2-3 line background description in neutral-300
  - No photos (roles only for pitch stage)
- Below: Advisor row — 3-4 names with titles in smaller text, neutral-400
- Subtle grid pattern overlay on background

**6. Layout Structure:**
```
+------------------------------------------------+
|  Built by People Who Understand the Flood      |
|                                                |
|  [CEO]     [CTO]     [Head AI]  [Head Product] |
|  Urban +   ML Sys    PhD Flood  B2G SaaS      |
|  AI        Eng       Prediction Experience     |
|                                                |
|  Advisors: Prof. X (Transport), Y (Climate VC) |
+------------------------------------------------+
```

**7. Speaker Notes:**
"The team has the right mix: domain expertise in flooding and traffic, technical depth in ML and systems, and go-to-market experience in government SaaS."

---

## --------------------------------
## SLIDE 13: Vision / Expansion
## --------------------------------

**1. Layout Type:** Expanding map + capability timeline + The Ask

**2. Headline:**
From Flood Routing to Urban Resilience Infrastructure

**3. Subtext:**
Floods are inevitable. Traffic chaos is not.

**4. Content:**
- **Geographic expansion**: Southeast Asia → India/South Asia → US Gulf Coast → Global
- **Capability expansion**: Flood routing → Multi-hazard (earthquake, wildfire, storm) → Full urban resilience platform
- **Integration**: Insurance risk APIs, emergency services, autonomous vehicles, logistics networks
- **The Ask**: $2.5M Seed — 45% Engineering, 25% GTM, 15% Data Infrastructure, 15% Operations
- **Milestones to Series A**: 10 pilot cities, $3M ARR, proven prediction accuracy, 3 enterprise API customers

**5. Visual Design:**
- Top half: World map (dark) with expansion dots
  - Phase 1: Bright dots on SE Asia
  - Phase 2: Dots spread to South Asia
  - Phase 3: Dots reach US Gulf Coast
  - Phase 4: Dots worldwide — connected by faint lines
- Bottom-left: Capability expansion as stacked layers (flood → multi-hazard → full resilience)
- Bottom-right: "The Ask" card — highlighted with Storm Blue border glow
  - "$2.5M Seed" in JetBrains Mono Bold 48px
  - Pie chart: 45% / 25% / 15% / 15% breakdown
  - "10 cities. $3M ARR. Series A in 18 months."

**6. Layout Structure:**
```
+------------------------------------------------+
|  From Flood Routing to Urban Resilience...     |
|                                                |
|  [World map with expansion dots]               |
|  SE Asia → India → US Gulf → Global            |
|                                                |
|  [Capability layers]   |  [$2.5M SEED]         |
|  Flood → Multi-hazard  |  45% Eng / 25% GTM   |
|  → Full resilience     |  15% Data / 15% Ops   |
|                        |  Series A: 18 months   |
+------------------------------------------------+
|  "Floods are inevitable. Traffic chaos is not." |
+------------------------------------------------+
```

**7. Speaker Notes:**
"We start with flood routing in Southeast Asia because the problem is acute and the market is ready. But the architecture supports any environmental hazard. This is infrastructure — not a feature. Join us in building it."

---

# PART 2 — SYSTEM DESIGN

---

## --------------------------------
## SLIDE 14: Overall System Architecture
## --------------------------------

**1. Layout Type:** Full-width architecture diagram

**2. Headline:**
System Architecture — End-to-End Intelligence Pipeline

**3. Subtext:**
Seven layers. One closed loop. Sub-second routing decisions.

**4. Content:**
- Data Sources → Ingestion → Processing → Intelligence → Routing → Presentation → Feedback
- Feedback loops back to Intelligence and Processing layers
- Each layer labeled with key technologies

**5. Visual Design:**
Full-width architecture diagram with 7 horizontal layers, top to bottom:

```
┌─────────────────────────────────────────────────────────────┐
│  DATA SOURCES                                               │
│  [Camera] [Weather API] [Historical DB] [News Crawl] [User]│
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  INGESTION LAYER                          Kafka / MQTT      │
│  [Stream Ingest] [Batch Ingest] [Crawl Scheduler]          │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  PROCESSING LAYER                         Flink / Spark     │
│  [Clean] [Normalize] [Geo-tag] [Time-align] [Event Fuse]  │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  INTELLIGENCE LAYER                   PyTorch / LangChain   │
│  [Flood Detect] [LLM Severity] [Prediction] [Agent System] │
└──────────────┬───────────────────────┬──────────────────────┘
               ▼                       ▼
┌──────────────────────┐  ┌───────────────────────────────────┐
│  ROUTING LAYER       │  │  SIMULATION LAYER                 │
│  Google Maps API     │  │  What-if / Digital Twin           │
│  [Route] [Re-rank]   │  │  [Simulate] [Compare] [Plan]     │
└──────────┬───────────┘  └───────────────────────────────────┘
           ▼
┌─────────────────────────────────────────────────────────────┐
│  PRESENTATION LAYER                   React / Vite / APIs   │
│  [Dashboard] [Mobile App] [Gov Portal] [REST API] [WebSocket]│
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  FEEDBACK LOOP                                              │
│  [User Reports] [Route Outcomes] [Prediction Accuracy]      │
│  ──────────────── loops back to Intelligence ───────────────│
└─────────────────────────────────────────────────────────────┘
```

- Color code each layer: Sources (#94A3B8), Ingestion (#F59E0B), Processing (#06B6D4), Intelligence (#2563EB), Routing (#10B981), Presentation (#EC4899), Feedback (#EF4444)
- Arrows: white, directional, 2px
- Feedback arrow curves from bottom back up to Intelligence layer

**6. Layout Structure:**
- Full slide width for the diagram
- Title in top-left corner
- Each layer is a rounded rectangle with module boxes inside
- Vertical flow with arrows between layers

**7. Speaker Notes:**
"This is the full pipeline. Data flows in from 5 source types, gets processed, analyzed by our intelligence layer, and drives routing decisions. The critical piece is the feedback loop — every routing outcome improves the next prediction."

---

## --------------------------------
## SLIDE 15: Data Ingestion Layer
## --------------------------------

**1. Layout Type:** 5-column source cards + specs table

**2. Headline:**
Data Source Layer — Always Watching. Always Learning.

**3. Subtext:**
Five complementary data streams. 24/7 ingestion. Event-level fusion.

**4. Content:**
- **Traffic Cameras**: RTSP/MJPEG feeds, frame analysis every 5s, flood visual detection via CV model
- **Weather APIs**: Google Weather / OpenWeatherMap, 15-min polling, rainfall + forecast data
- **Historical DB**: PostgreSQL/TimescaleDB, flood records, traffic patterns, drainage capacity maps
- **News Crawl**: RSS/scraping agents, 5-min cycle, NLP extraction of flood mentions + severity
- **User Feedback**: Mobile app + API, real-time event reports, photo uploads, severity ratings

**5. Visual Design:**
- 5 cards in a row, each representing a data source:
  - Card background: #1E293B, subtle top-border colored by source type
  - Icon: Camera (#EF4444), Cloud (#2563EB), Database (#06B6D4), Newspaper (#F59E0B), User (#10B981)
  - Source name, format, frequency, estimated volume
- Below: Data flow arrows converging into a single "Ingestion Bus (Kafka)" bar

**6. Layout Structure:**
```
+------------------------------------------------+
|  Data Source Layer                              |
|                                                |
|  [Camera]  [Weather] [History] [News]  [User]  |
|  RTSP      REST API  SQL      RSS/NLP  API     |
|  5s cycle  15min     batch    5min     real-time|
|  ~1K fps   12 APIs   10yr+    50 src   ~500/day|
|                                                |
|  ────────────▼────────▼──────▼────▼────▼───────|
|  [              KAFKA INGESTION BUS           ] |
+------------------------------------------------+
```

**7. Speaker Notes:**
"No single data source is reliable enough alone. Cameras can be obstructed. Weather APIs miss localized flooding. News is delayed. User reports are sparse. But together, cross-referenced, they produce high-confidence flood detection."

---

## --------------------------------
## SLIDE 16: Data Processing & Event Fusion
## --------------------------------

**1. Layout Type:** Pipeline diagram

**2. Headline:**
Processing Pipeline — From Raw Signals to Actionable Events

**3. Subtext:**
Clean, normalize, geo-tag, time-align, fuse. Every event gets a confidence score.

**4. Content:**
- **Data Cleaning**: Remove duplicates, fill gaps, validate schemas
- **Normalization**: Standardize units (depth in cm, coordinates in WGS84, timestamps in UTC)
- **Geolocation Mapping**: Map every signal to road segments using PostGIS spatial queries
- **Timestamp Alignment**: Align multi-source events within 30-second windows
- **Event Fusion**: Merge correlated signals into unified flood events with composite confidence scores

**5. Visual Design:**
- Horizontal pipeline with 5 processing stages as connected boxes:
  - Each box: rounded rectangle, #1E293B fill, labeled
  - Arrow between each: →
  - Below each box: key operation description in neutral-400
- Top: "Raw data" input stream (messy, multiple colored dots)
- Bottom: "Clean events" output stream (organized, single color per event)
- Side annotation: "Stream: Apache Flink (real-time)" and "Batch: Apache Spark (historical)"

**6. Layout Structure:**
```
+------------------------------------------------+
|  Processing Pipeline                           |
|                                                |
|  ···· Raw Signals (noisy, multi-format) ····   |
|        ▼                                       |
|  [Clean]→[Normalize]→[Geo-tag]→[Align]→[Fuse] |
|  dedup   units       PostGIS   30s win  merge  |
|        ▼                                       |
|  ──── Clean Events (structured, scored) ────   |
|                                                |
|  Stream: Flink     |     Batch: Spark          |
+------------------------------------------------+
```

**7. Speaker Notes:**
"Raw data is messy. A camera feed says 'water detected.' A weather API says 'heavy rain.' A user report says 'street flooded.' Our processing pipeline fuses these into a single flood event with a location, severity estimate, and confidence score."

---

## --------------------------------
## SLIDE 17: Flood Detection + LLM Severity
## --------------------------------

**1. Layout Type:** Split — detection flow left, LLM evaluation right

**2. Headline:**
Flood Intelligence — Detection Meets Reasoning

**3. Subtext:**
Multi-source detection. LLM-powered severity assessment. Confidence scoring at every step.

**4. Content:**
- **Detection**: Multi-source triangulation (camera + weather + news + user confirms)
- **Flood Point Lifecycle**: Detected → Confirmed → Monitored → Resolved
- **LLM Evaluation**: Reads weather bulletins, camera descriptions, news text, user reports
- **Output**: Severity level (1-5), depth estimate, passability score, confidence %
- **Fallback**: Rule-based scoring when LLM unavailable

**5. Visual Design:**
- Left (50%): Detection flow diagram
  - 4 source icons converging into "Detection Engine" box
  - Below: lifecycle state machine: Detected → Confirmed → Monitored → Resolved (colored circles connected by arrows)
- Right (50%): LLM evaluation card
  - Input: "Camera: water visible on road surface. Weather: 85mm rainfall in 2hrs. News: 'District 7 flooding reported.' User: 'knee-deep water on Nguyen Hue.'"
  - Arrow into "LLM Reasoning" box (#2563EB border glow)
  - Output card: "Severity: Level 3/5 | Depth: 35cm | Passability: Impassable for sedans | Confidence: 91%"

**6. Layout Structure:**
```
+-----------------------+-------------------------+
|  DETECTION            |  LLM EVALUATION         |
|                       |                         |
|  [Cam][Wx][News][User]|  Input: "Camera shows...|
|       ▼               |  Weather reports 85mm...|
|  [Detection Engine]   |  News: District 7..."   |
|       ▼               |       ▼                 |
|  Detected → Confirmed |  [LLM REASONING]        |
|  → Monitored → Done   |       ▼                 |
|                       |  Level 3/5 | 35cm       |
|                       |  Impassable | 91% conf  |
+-----------------------+-------------------------+
```

**7. Speaker Notes:**
"The LLM doesn't just classify — it reasons. 'Knee-deep water' means something different from 'ankle-deep puddle.' The LLM synthesizes multiple signals into a human-readable severity assessment with a confidence score."

---

## --------------------------------
## SLIDE 18: Routing Intelligence
## --------------------------------

**1. Layout Type:** Diagram + map mockup

**2. Headline:**
Routing Intelligence — Google Maps + Flood Avoidance

**3. Subtext:**
Dynamic obstacle avoidance. Real-time recalculation. Time vs. safety tradeoffs.

**4. Content:**
- **Google Maps Directions API** integration for base routing
- **Flood points as dynamic obstacles** — weighted penalties on road segments
- **Route re-ranking**: Score routes by (time × safety × distance) composite
- **Real-time recalculation** when new flood points detected (<2s latency)
- **Fleet mode vs individual mode**: Optimize across entire fleet or single driver
- **Emergency corridors**: Priority routing for ambulance, fire, police

**5. Visual Design:**
- Left (45%): Routing logic diagram
  - "Google Maps API" box at top
  - "Flood Penalty Engine" box applying weights
  - "Route Scorer" box ranking 3-5 candidate routes
  - "Best Route" output with safety + time metrics
- Right (55%): Map mockup
  - Dark map with 3 flood zones (red-orange polygons)
  - Gray dashed line: original route (crosses flood zone, X marker)
  - Green solid line: optimized route (cleanly avoids all zones)
  - Amber dashed line: alternative route (avoids zones, longer)
  - Metrics overlay: "1.2s recalc | 23 min saved | 2 alternatives"

**6. Layout Structure:**
```
+--------------------+----------------------------+
|  ROUTING LOGIC     |  [MAP VISUALIZATION]       |
|                    |                            |
|  [Google Maps API] |  ··· flood zone ···        |
|       ▼            |  --- original (gray, X)    |
|  [Flood Penalty]   |  ─── safe route (green)    |
|       ▼            |  --- alt route (amber)     |
|  [Route Scorer]    |                            |
|  time × safety     |  1.2s | 23min | 2 alts    |
|       ▼            |                            |
|  [Best Route]      |                            |
+--------------------+----------------------------+
```

**7. Speaker Notes:**
"We don't build our own mapping engine — we augment Google Maps with flood intelligence. Every flood point adds a weighted penalty to affected road segments. The router then finds the best path that balances time, distance, and flood safety."

---

## --------------------------------
## SLIDE 19: Agent Learning + Feedback Loop
## --------------------------------

**1. Layout Type:** Circular loop diagram

**2. Headline:**
The Learning Loop — Every Flood Makes the System Smarter

**3. Subtext:**
Agents collect. Agents learn. Agents improve. Autonomously.

**4. Content:**
- **Data Crawler Agents**: Continuously crawl weather, news, social media for flood signals
- **Analysis Agents**: Cross-reference, validate, and score incoming signals
- **Decision Agents**: Recommend routing strategies based on learned patterns
- **Feedback Collection**: User ratings, route outcomes, prediction vs reality comparison
- **Agent Memory**: Stores what worked, what failed, how severity was misjudged
- **RL Policy Improvement**: Optional reinforcement learning to optimize route weight decisions over time

**5. Visual Design:**
- Central circular loop diagram with 5 nodes:
  - CRAWL (#06B6D4) → ANALYZE (#2563EB) → DECIDE (#10B981) → EXECUTE (#F59E0B) → MEASURE (#EF4444) → back to CRAWL
  - Each node: circle with icon inside, label outside
  - Arrows: curved, animated direction indicators
  - Center: "Agent Memory" database icon
- Right side: "Feedback Sources" list
  - User ratings (stars), route completion data, prediction accuracy log, LLM confidence calibration

**6. Layout Structure:**
```
+------------------------------------------------+
|  The Learning Loop                             |
|                                                |
|         CRAWL                                  |
|        ╱     ╲                                 |
|    MEASURE    ANALYZE    Feedback:             |
|      │  [Memory]  │      • User ratings        |
|    EXECUTE    DECIDE     • Route outcomes       |
|        ╲     ╱           • Prediction accuracy  |
|         (loop)           • LLM calibration      |
|                                                |
|  Optional: RL policy optimization layer        |
+------------------------------------------------+
```

**7. Speaker Notes:**
"Most systems are static — they work the same on day 1000 as day 1. Our agent system learns. After every flood event, it measures what worked, what didn't, and adjusts. The system after monsoon season is fundamentally better than before it."

---

## --------------------------------
## SLIDE 20: Prediction Engine
## --------------------------------

**1. Layout Type:** Multi-source fusion + output heatmap

**2. Headline:**
Prediction Engine — Foresight, Not Hindsight

**3. Subtext:**
Fuse four signal layers into 2-6 hour advance flood predictions.

**4. Content:**
- **Historical Layer**: 10+ years of flood records, seasonal patterns, drainage capacity models, tidal data
- **Weather Layer**: Real-time rainfall, storm trajectory, intensity curves from multiple weather APIs
- **News/Social Layer**: NLP-extracted flood mentions from 50+ sources, sentiment and urgency scoring
- **Sensor Layer**: Camera flood detection trends, IoT water level monitors, traffic flow anomalies
- **Output**: Probability heatmap per road segment, warning scores, alert thresholds, 2-6hr window

**5. Visual Design:**
- Left (50%): 4 signal sources flowing into fusion engine
  - Stacked boxes: Historical (blue), Weather (cyan), News (amber), Sensors (green)
  - All arrows point into central "Prediction Fusion" box
  - Below: ML model label "Temporal Fusion Transformer + XGBoost ensemble"
- Right (50%): Output visualization
  - Mini city map with probability heatmap overlay (green → yellow → red gradient)
  - Timeline bar below map: "Now" → "+2hr" → "+4hr" → "+6hr" with intensifying zones
  - Warning score: "WARNING: 78% flood probability, Nguyen Van Linh, +3.2 hours"

**6. Layout Structure:**
```
+------------------------+------------------------+
|  SIGNAL FUSION         |  PREDICTION OUTPUT     |
|                        |                        |
|  [Historical]──┐       |  [City heatmap]        |
|  [Weather]─────┤→[ML]  |  green→yellow→red      |
|  [News/Social]─┤       |                        |
|  [Sensors]─────┘       |  Now  +2hr  +4hr  +6hr |
|                        |  ░░   ▒▒▒   ▓▓▓  ███  |
|  TFT + XGBoost         |                        |
|                        |  ⚠ 78% | NVL | +3.2hr |
+------------------------+------------------------+
```

**7. Speaker Notes:**
"Four signal layers — each incomplete on its own. Historical data knows where it floods every year. Weather knows intensity. News catches early reports humans post. Sensors confirm in real-time. Fused together: 2-6 hour prediction with 94% accuracy."

---

## --------------------------------
## SLIDE 21: Simulation Engine
## --------------------------------

**1. Layout Type:** Split-screen comparison + scenario builder

**2. Headline:**
Simulation Engine — Test Before You Deploy

**3. Subtext:**
Digital twin. What-if scenarios. Infrastructure planning with data, not intuition.

**4. Content:**
- **Real-Time Mirror**: Digital twin of current city traffic under flood conditions
- **What-If Scenarios**: "What if Bridge X floods? What if 3 arterials close simultaneously?"
- **Strategy Comparison**: Test routing strategies side-by-side before pushing to production
- **Stress Testing**: Model extreme rainfall scenarios beyond historical records
- **Government Planning**: Evaluate infrastructure investments using simulation data

**5. Visual Design:**
- Top: Two side-by-side map cards
  - Left card: "CURRENT REALITY" label, dark map with 2 active flood zones, current traffic flow
  - Right card: "SIMULATION: 150mm/hr rainfall" label, same map with 6 flood zones, rerouted traffic
- Bottom: Comparison metrics table
  - Columns: Metric | Current | Simulated | Delta
  - Rows: Avg travel time (28min | 52min | +86%), Affected vehicles (3.2K | 18.7K | +484%), Alternative route capacity (High | Critical | ⚠)
- Bottom-right: "Used by city planners for infrastructure investment decisions" callout

**6. Layout Structure:**
```
+------------------------+------------------------+
|  CURRENT REALITY       |  SIMULATION            |
|  [map: 2 flood zones]  |  [map: 6 flood zones]  |
|  [green routes]        |  [rerouted traffic]     |
+------------------------+------------------------+
|  Metric      | Current | Simulated | Delta      |
|  Avg time    | 28min   | 52min     | +86%       |
|  Vehicles    | 3.2K    | 18.7K     | +484%      |
|  Alt capacity| High    | Critical  | ⚠          |
+------------------------------------------------+
```

**7. Speaker Notes:**
"City operators can simulate a monsoon scenario BEFORE it happens and pre-position routing strategies. Insurance companies can model risk. Urban planners can evaluate where to invest in drainage infrastructure."

---

## --------------------------------
## SLIDE 22: Reporting & Analytics
## --------------------------------

**1. Layout Type:** Dashboard mockup

**2. Headline:**
Reporting & Analytics — Intelligence for Every Stakeholder

**3. Subtext:**
Auto-generated. LLM-written. Exportable. Decision-ready.

**4. Content:**
- **Operational Reports**: Per-event flood impact, response time, vehicles rerouted, delay reduction
- **Flood Heatmaps**: Historical frequency + predicted risk overlaid on city map
- **Route Effectiveness**: Which diversions worked, which caused secondary congestion
- **Regulation Suggestions**: Lane closures, signal timing, detour plans — auto-generated per event
- **Trend Analysis**: Flood frequency trends, severity trends, infrastructure resilience scoring

**5. Visual Design:**
Full-width dashboard mockup:
- Top-left: 4 KPI cards (Active floods, Vehicles rerouted, Avg delay saved, Prediction accuracy)
- Top-right: Flood frequency line chart (12-month trend, showing seasonal peaks)
- Bottom-left: City heatmap showing historical flood frequency (color gradient)
- Bottom-right: Regulation suggestions panel with 3 actionable items, each with status badge
- LLM-generated summary text at top: "Today's assessment: 3 active flood zones in District 7. 4,200 vehicles rerouted. Average 18 minutes saved per commuter."

**6. Layout Structure:**
```
+------------------------------------------------+
|  "3 active zones. 4,200 rerouted. 18min saved" |
|                                                |
|  [12] Active  [4.2K] Rerouted  [18m] Saved    |
|                                                |
|  [Flood heatmap]     |  [Trend line chart]     |
|  [city map]          |  [12-month frequency]   |
|                      |                         |
|  [Regulation panel]                            |
|  • Close NB Vo Van Kiet 14:30 [PENDING]        |
|  • Extend green phase Tran HD +15s [ACTIVE]    |
|  • Activate detour Route B-7 [ACTIVE]          |
+------------------------------------------------+
```

**7. Speaker Notes:**
"Reports are auto-generated after every flood event. The LLM writes human-readable summaries. City operators don't have to compile data — they just read the assessment and act on the regulation suggestions."

---

## --------------------------------
## SLIDE 23: User-Facing Products
## --------------------------------

**1. Layout Type:** Product showcase — 4 panels

**2. Headline:**
Four Products. One Platform. Every User Type.

**3. Subtext:**
From drivers to city planners — purpose-built interfaces for each role.

**4. Content:**
- **Driver App**: Real-time flood alerts, flood-aware navigation, report flooding, route alternatives
- **Operator Dashboard**: Command center with live map, alert management, regulation controls
- **Government Portal**: Long-term analytics, infrastructure planning, budget impact, resilience scoring
- **Developer API**: REST + WebSocket for logistics, insurance, ride-hailing integration

**5. Visual Design:**
- 4 panels arranged 2x2:
  - Top-left: Phone mockup (dark) showing map with flood alert notification and "Rerouting..." banner
  - Top-right: Desktop dashboard mockup (same as Slide 6 but focused on operator view)
  - Bottom-left: Desktop showing charts, heatmaps, trend analysis (government planning view)
  - Bottom-right: Code snippet mockup showing API request/response (dark terminal style)
- Each panel has a colored top-border matching the product: Driver (#10B981), Operator (#2563EB), Government (#F59E0B), API (#06B6D4)

**6. Layout Structure:**
```
+------------------------+------------------------+
|  [DRIVER APP]          |  [OPERATOR DASHBOARD]  |
|  📱 Phone mockup       |  🖥 Desktop + map       |
|  Flood alert + reroute |  Live control center   |
+------------------------+------------------------+
|  [GOVERNMENT PORTAL]   |  [DEVELOPER API]       |
|  📊 Charts + heatmaps  |  💻 Code + response     |
|  Planning + resilience |  REST + WebSocket      |
+------------------------+------------------------+
```

**7. Speaker Notes:**
"Every user type gets a purpose-built view. Drivers get alerts and navigation. Operators get real-time control. Government gets planning data. Developers get an API that plugs flood intelligence into any system."

---

## --------------------------------
## SLIDE 24: Infrastructure & Deployment (AWS)
## --------------------------------

**1. Layout Type:** Infrastructure stack diagram with AWS service mapping

**2. Headline:**
Infrastructure — Hosted on AWS. Production-Grade.

**3. Subtext:**
Serverless containers. Managed Kafka. GPU inference. Auto-scaling.

**4. Content:**
- **Compute**: ECS Fargate (serverless containers) + Lambda (async jobs) + SageMaker (GPU inference)
- **Stream Processing**: Amazon MSK (Managed Kafka) + Kinesis Data Analytics (Flink-compatible)
- **Batch Processing**: Amazon EMR (Spark) for historical analysis and model training
- **Storage**: ElastiCache Redis (hot) + RDS PostgreSQL/TimescaleDB (warm) + S3 Parquet (cold)
- **AI/ML**: SageMaker Endpoints (CV models) + Bedrock (LLM severity via Claude) + SageMaker Training
- **Frontend**: S3 + CloudFront (CDN) + Amplify (CI/CD auto-deploy from GitHub)
- **APIs**: API Gateway (WebSocket) + ALB (REST) + Cognito (Auth)
- **Observability**: CloudWatch (metrics/logs) + X-Ray (tracing) + SNS (alerts)
- **Security**: Cognito (OAuth2), KMS (encryption), WAF (DDoS/rate limiting), VPC private subnets

**5. Visual Design:**
Vertical infrastructure stack:
```
┌─────────────────────────────────────────────┐
│  CLIENTS                                    │
│  [Mobile] [Web Dashboard] [API Consumers]   │
├─────────────────────────────────────────────┤
│  API GATEWAY          Nginx / Kong          │
│  REST | WebSocket | GraphQL                 │
├─────────────────────────────────────────────┤
│  APPLICATION LAYER    Kubernetes             │
│  [Auth] [Routing] [Detection] [Prediction]  │
│  [Agents] [Reporting] [Simulation] [LLM]    │
├─────────────────────────────────────────────┤
│  PROCESSING           Kafka + Flink + Spark │
│  [Stream: real-time] [Batch: historical]    │
├─────────────────────────────────────────────┤
│  STORAGE                                    │
│  [Redis: hot] [TimescaleDB: warm] [S3: cold]│
├─────────────────────────────────────────────┤
│  OBSERVABILITY        Prometheus + Grafana   │
│  [Metrics] [Logs] [Traces] [Alerts]         │
├─────────────────────────────────────────────┤
│  SECURITY             OAuth2 / JWT / RBAC    │
│  [Encryption] [Audit] [Access Control]      │
└─────────────────────────────────────────────┘
```
- Each layer: different shade of the dark palette
- Tech labels in neutral-400, mono font
- Subtle arrows showing data flow downward and feedback upward

**6. Layout Structure:**
- Full-width stacked layers
- Title in top-left
- Each layer is a rounded rectangle spanning full width
- Key technologies listed inline

**7. Speaker Notes:**
"Cloud-native from day one. Kafka handles 100K+ events/second. Flink processes in real-time. TimescaleDB stores time-series flood data efficiently. The entire stack auto-scales — adding a new city doesn't require re-architecting."

---

## --------------------------------
## SLIDE 25: Future System Evolution
## --------------------------------

**1. Layout Type:** Expanding capability rings + integration map

**2. Headline:**
The Evolution — From Flood Routing to Urban Resilience OS

**3. Subtext:**
The platform grows with every city, every hazard, every integration.

**4. Content:**
- **Near-term**: City-scale digital twin with full traffic + flood simulation
- **Medium-term**: Multi-hazard routing (earthquake, wildfire, storm surge, landslide)
- **Integration**: Smart traffic signal coordination, autonomous vehicle routing
- **Ecosystem**: Insurance risk APIs, logistics optimization, emergency services corridors
- **Autonomous workflows**: Auto-activate detour plans, auto-adjust signals, auto-notify emergency services
- **Vision**: The operating system for urban resilience — not just flood, not just traffic, but every environmental disruption

**5. Visual Design:**
- Center: "SafeMove AI" core (solid circle, Storm Blue)
- Ring 1 (current): Flood routing, severity assessment, prediction, reporting
- Ring 2 (2027): Digital twin, multi-hazard, signal coordination, edge computing
- Ring 3 (2028+): Insurance APIs, autonomous workflows, AV integration, international platform
- Each ring: expanding circle, progressively lighter shade of blue
- Right side: Integration partner logos/icons (insurance, logistics, emergency, transit)
- Bottom: "From flood routing to urban resilience infrastructure" in display font

**6. Layout Structure:**
```
+------------------------------------------------+
|  The Evolution                                 |
|                                                |
|      +--Ring 3: Insurance, AV, Global--+       |
|      | +--Ring 2: Twin, Multi-hazard-+ |       |
|      | | +--Ring 1: Flood routing---+ | |       |
|      | | |    [SafeMove AI]         | | |       |
|      | | +-------------------------+ | |       |
|      | +-----------------------------+ |       |
|      +---------------------------------+       |
|                                                |
|  From flood routing to urban resilience OS.    |
+------------------------------------------------+
```

**7. Speaker Notes:**
"We start narrow and go deep — flood-aware traffic intelligence for Southeast Asian cities. But the architecture supports any hazard, any city, any integration. Every new data source, every new city, every new flood event makes the platform more valuable. This is infrastructure that compounds."

---

# END OF DECK

**Total: 25 slides**
- Part 1 (Core Pitch): 13 slides
- Part 2 (System Design): 12 slides

**Design implementation notes:**
- All backgrounds: dark gradient (#0A0E1A → #111827), never white
- Titles: Inter Bold 44px, white, top-left
- Data callouts: JetBrains Mono Bold 48-56px, #06B6D4
- Cards: #1E293B bg, #334155 border, 12px radius
- Diagrams: rounded boxes, colored by layer, directional arrows
- Charts: dark bg, no gridlines, colored bars/lines from brand palette
- Every slide scannable in 5 seconds
