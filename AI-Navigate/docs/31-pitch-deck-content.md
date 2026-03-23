# FloodRoute AI — Pitch Deck

> Flood-Aware Mobility Intelligence for Smart Cities

This document serves as both the **slide content script** and the **visual design language specification** for the FloodRoute AI investor pitch deck. Every slide is defined with its exact wording, speaker notes, visual direction, and layout intent — ready for a designer or presentation tool to execute faithfully.

---

## Part 1: Slide Design Language

The FloodRoute AI deck is a dark-theme, data-rich, map-forward presentation. It should feel like looking at a mission-critical command center — not a corporate slideshow. Every visual choice reinforces the idea that this is serious infrastructure technology for a serious problem.

---

### 1.1 Color System

#### Primary Brand Palette

| Token            | Hex       | Role                                      |
| ---------------- | --------- | ----------------------------------------- |
| Abyss            | `#0A0E1A` | Primary background, slide canvas          |
| Midnight         | `#111827` | Secondary background, gradient endpoint   |
| Storm Blue       | `#2563EB` | Primary accent, interactive elements, CTAs |
| Flood Cyan       | `#06B6D4` | Data highlights, big numbers, KPIs        |

#### Alert and Status Palette

| Token          | Hex       | Role                                        |
| -------------- | --------- | ------------------------------------------- |
| Safe Green     | `#10B981` | Safe routes, positive metrics, success      |
| Caution Amber  | `#F59E0B` | Warnings, compromised routes, attention     |
| Danger Red     | `#EF4444` | Blocked routes, critical alerts, high risk  |

#### Text and Surface Palette

| Token          | Hex       | Role                                           |
| -------------- | --------- | ----------------------------------------------- |
| White          | `#F8FAFC` | Slide titles, primary text                      |
| Light Gray     | `#E2E8F0` | Body text, bullet points                        |
| Muted          | `#94A3B8` | Subtitles, secondary information                |
| Dim            | `#64748B` | Labels, captions, tertiary text                 |
| Surface        | `#1E293B` | Card backgrounds, panel fills                   |
| Border         | `#334155` | Dividers, box outlines, subtle separation       |

---

### 1.2 Background Styles

**Default Slide Background**
Vertical linear gradient from `#0A0E1A` (top) to `#111827` (bottom). This is the canvas for the majority of slides — clean, dark, distraction-free.

**Accent Slide Background**
Default gradient plus a centered radial glow of `#2563EB` at 5% opacity. Used for emphasis slides (title, closing, key stat reveals). The glow should be subtle — felt more than seen.

**Map Slide Background**
Full-bleed dark-style map (Mapbox Dark or equivalent) rendered at 30% opacity behind all content. Used for slides that reference geographic data, routing, or city-scale visualizations. Content must remain fully legible over the map.

**Rule:** Never use a pure white background. Never use a light theme. This is a dark-mode product built for command centers and night-shift operators. The deck must reflect that.

---

### 1.3 Typography Hierarchy

| Element         | Font                 | Weight   | Size  | Color     | Notes                              |
| --------------- | -------------------- | -------- | ----- | --------- | ---------------------------------- |
| Slide title     | Inter                | Bold     | 44px  | `#F8FAFC` | Tracking-tight, always top-left    |
| Subtitle        | Inter                | Regular  | 20px  | `#94A3B8` | Directly below title, muted        |
| Body / Bullets  | Inter                | Regular  | 18px  | `#E2E8F0` | 1.6 line height, left-aligned      |
| Data callout    | JetBrains Mono       | Bold     | 56px  | `#06B6D4` | Big numbers, KPIs, impact metrics  |
| Label           | Inter                | Medium   | 12px  | `#64748B` | Uppercase, tracking-wide           |
| Code / API      | JetBrains Mono       | Regular  | 14px  | `#94A3B8` | Inline code references             |

**Rules:**
- Body text is always left-aligned. Never center body text or bullet points.
- Titles always sit in the top-left quadrant of the slide.
- Data callouts are used sparingly — one to four per slide maximum — for impact numbers that should be read from across the room.

---

### 1.4 Layout Rules

**Canvas:** 16:9 aspect ratio (1920 x 1080px reference resolution).

**Padding:** 80px on all four sides. No content should bleed into the padding zone except for intentional full-bleed background images or maps.

**Content Zones:**
- Left 55% of the slide: Text, titles, bullet points, narrative content.
- Right 45% of the slide: Visuals — maps, diagrams, charts, mockups.
- Exception: Full-width slides (title, closing, single-stat reveals) use the entire canvas.

**Bullet Point Rules:**
- Maximum 5 bullet points per slide. If you need more, split the slide.
- Each bullet point should be one to two lines maximum.
- Use an em-dash or bold lead-in word to start each bullet for scanability.
- No walls of text. Every slide must breathe.

**Whitespace:** Generous. When in doubt, remove content rather than compress spacing. Density kills comprehension in live presentations.

---

### 1.5 Data Visualization Style

**Charts:**
- Dark background (`#0A0E1A` or `#1E293B` panel).
- No gridlines. Minimal axis labels in `#64748B` at 12px.
- Thin colored lines (2px stroke) or filled bars with rounded top corners.
- Use brand palette colors: Storm Blue for primary series, Flood Cyan for secondary, Safe Green / Danger Red for positive/negative.
- Subtle glow effect on active data points.

**Maps:**
- Base: Mapbox Dark style tiles (or equivalent dark-theme cartography).
- Flood zones: Semi-transparent blue-purple polygons (`#2563EB` to `#7C3AED` gradient by depth), with pulsing edges for active flooding areas.
- Routes: Thick lines (4-6px) color-coded — Safe Green for clear, Caution Amber for compromised, Danger Red for blocked.
- Data points: Glowing dots for camera locations, water-drop icons for confirmed flood points, diamond icons for predicted flood points.
- Heatmap overlay: Probability heatmap using Flood Cyan to Danger Red gradient for prediction confidence.

**Diagrams:**
- Clean rounded-corner boxes (8px radius) with `#1E293B` fill and `#334155` border.
- Connecting lines with directional arrows, 2px stroke, color-coded by function.
- Icons inside boxes for quick visual identification.
- Horizontal flow preferred over vertical for process diagrams.

**Icons:**
- Lucide icon style: outlined, 1.5px stroke weight.
- Monochrome (`#94A3B8`) by default, accent-colored (`#06B6D4` or `#2563EB`) for emphasis.
- 24px default size, 32px for featured icons in diagrams.

---

### 1.6 Map and Flood Visualization Specification

This section defines the visual language for all map-based content in the deck — the most distinctive visual element of the FloodRoute AI brand.

**Base Map:** Mapbox Dark style. Muted road network, minimal labels, dark water bodies. The map serves as context, not the hero — data overlays are the hero.

**Flood Zone Rendering:**
- Confirmed flood: Solid polygon fill, `#2563EB` at 40% opacity, with `#7C3AED` border at 60% opacity.
- Predicted flood: Dashed polygon border, `#06B6D4` at 20% opacity fill, pulsing animation.
- Severity gradient: Lighter blue for shallow flooding, deeper purple for severe flooding. Depth scale from 10cm (light cyan) to 100cm+ (deep violet).

**Route Rendering:**
- Safe route: `#10B981` solid line, 5px width, slight glow.
- Compromised route: `#F59E0B` dashed line, 4px width.
- Blocked route: `#EF4444` solid line with X markers at blocked intersections.
- Recommended route: `#06B6D4` solid line, 6px width, animated dashes showing direction of travel.

**Sensor and Camera Points:**
- Traffic cameras: Small circle icon, `#94A3B8`, with radiating ring animation when actively detecting.
- IoT water sensors: Water-drop icon, colored by current reading (green/amber/red).
- User reports: Person icon with speech bubble, `#F59E0B`.

---

### 1.7 Animation and Transition Guidelines

These specifications are for live-presentation or animated-export versions of the deck. Static PDF versions should capture the "final frame" of each animation.

**Slide Transitions:**
- Default: Fade transition, 400ms duration, ease-in-out.
- No slide, wipe, zoom, or 3D transitions. Keep it professional.

**Content Animations:**
- Data callout numbers: Count up from 0 to final value over 1.5 seconds, ease-out curve. Numbers should feel like they are being calculated in real time.
- Bullet points: Stagger appearance with 200ms delay between each item. Fade-in from left, 300ms duration.
- Diagrams: Nodes appear first (200ms stagger), then connecting lines draw themselves (400ms each).
- Charts: Lines draw from left to right over 1 second. Bars grow from bottom over 800ms.

**Map Animations:**
- Flood zones: "Fill in" effect — polygons expand from center point over 2 seconds.
- Routes: Draw themselves from origin to destination over 1.5 seconds, following the actual path geometry.
- Prediction heatmap: Fade in gradually over 2 seconds, with color intensity increasing.

**Timing Rule:** All animations serve comprehension, not decoration. If an animation does not help the audience understand the content faster, remove it.

---

### 1.8 Component Library

**Stat Card**
A rectangular panel (`#1E293B` background, `#334155` border, 12px radius) containing:
- Large number in JetBrains Mono Bold 56px, `#06B6D4`
- Label below in Inter Medium 12px, `#64748B`, uppercase
- Used for KPIs, impact metrics, market sizing numbers

**Alert Badge**
A pill-shaped badge with colored background at 20% opacity and matching colored text:
- Safe: `#10B981` background, `#10B981` text
- Caution: `#F59E0B` background, `#F59E0B` text
- Danger: `#EF4444` background, `#EF4444` text
- Used for severity indicators, status labels

**Pipeline Node**
A rounded-corner box (8px radius, `#1E293B` fill) containing:
- Icon (32px, accent-colored) centered at top
- Label in Inter Medium 14px, `#E2E8F0`, centered below icon
- Connected to adjacent nodes by arrow lines
- Used for system architecture, workflow, and process diagrams

**Quote Block**
Left-bordered block (4px left border in `#2563EB`) with:
- Quote text in Inter Regular 20px, `#E2E8F0`, italic
- Attribution in Inter Medium 14px, `#64748B`
- Used for vision statements, user testimonials

**Timeline Node**
A circle (24px diameter, `#2563EB` fill) on a horizontal line (`#334155`), with:
- Phase label above in Inter Bold 16px, `#F8FAFC`
- Date range below in Inter Regular 12px, `#64748B`
- Milestones listed below date in Inter Regular 14px, `#94A3B8`
- Nodes grow in size from left to right to indicate scale progression

---

## Part 2: Pitch Deck Slides

---

### Slide 1 — Title / Vision

**Background:** Accent slide — default dark gradient with centered radial glow of `#2563EB` at 5% opacity. Full-bleed dark map of a city at 15% opacity behind everything.

**Layout:** Centered composition (exception to left-align rule — this is the title slide).

---

**[TITLE]**
FloodRoute AI

**[SUBTITLE]**
Flood-Aware Mobility Intelligence for Smart Cities

**[BODY]**

Every year, urban flooding paralyzes millions of commuters, costs billions in damages, and kills thousands on roads. Cities have weather data. They have traffic cameras. They have historical records. What they don't have is a system that connects all of it — in real time — to make a routing decision before a driver reaches a flooded road.

FloodRoute AI is that system.

**[VISUAL DIRECTION]**
Full-bleed dark map of a dense urban area (Ho Chi Minh City or a generic Southeast Asian metro). Glowing blue flood zone polygons pulsing in low-lying areas. A single bright green route line weaves around the flood zones from one side of the city to the other — showing intelligent avoidance. The FloodRoute AI logo sits centered in the upper third. The tagline sits below the logo. The vision paragraph sits in the lower third inside a subtle `#1E293B` panel with 60% opacity.

**[SPEAKER NOTES]**
Open with the vision. Pause after "FloodRoute AI is that system." Let it land. This is not a weather app. This is not a mapping tool. This is an intelligence layer that sits between flood data and traffic decisions — the first platform purpose-built for flood-aware urban mobility. Set the tone: serious problem, serious technology, serious opportunity.

---

### Slide 2 — Problem: Urban Flooding Disrupts Mobility

**Background:** Default dark gradient. Right side: darkened photo-style illustration of a flooded urban road at 20% opacity.

**Layout:** Left text (55%), right data callouts (45%).

---

**[TITLE]**
The Invisible Crisis

**[SUBTITLE]**
Urban flooding is accelerating — and cities have zero purpose-built tools to manage it.

**[BODY — LEFT COLUMN]**

- **300% increase** in urban flood events over the last 20 years, driven by climate change and rapid urbanization
- **$17B+ annual damage** from urban flooding in the United States alone; Southeast Asian cities face three times higher relative economic impact
- **80% of flood-related traffic fatalities** occur when drivers unknowingly enter flooded roadways — deaths that are entirely preventable with real-time intelligence
- **2+ hours of peak traffic capacity lost** per flood event in the average city, cascading into logistics failures, emergency response delays, and compounding economic damage
- **Current response:** manual barricades, delayed news alerts, and reactive rerouting after the damage is done. No real-time flood-traffic intelligence exists.

**[VISUAL DIRECTION — RIGHT COLUMN]**
Four stat cards stacked vertically, each containing one data callout:

| Number | Label                              |
| ------ | ---------------------------------- |
| 300%   | Increase in urban flood events     |
| $17B   | Annual US flood damage             |
| 80%    | Fatalities from unknowing entry    |
| 2hrs+  | Peak capacity lost per event       |

Each number rendered in JetBrains Mono Bold 56px, `#06B6D4`. Labels in Inter Medium 12px, `#64748B`, uppercase. Cards have `#1E293B` background with `#334155` border.

**[SPEAKER NOTES]**
Do not rush this slide. Emphasize that this is not a rare event. In cities like Ho Chi Minh City, Jakarta, Mumbai, and Houston, this happens every monsoon season, every hurricane season. And the problem is accelerating — more impervious surfaces, more extreme rainfall events, more urban density in flood-prone areas. The critical point: cities have ZERO purpose-built tools for flood-traffic intelligence. They use the same tools for flooding that they use for a normal Tuesday. That gap is the opportunity.

---

### Slide 3 — Solution: Flood-Aware Routing Using Google Maps + AI

**Background:** Default dark gradient.

**Layout:** Full-width pipeline diagram in the upper half, before/after map comparison in the lower half.

---

**[TITLE]**
One AI Platform. Every Flood-Affected Route Decision.

**[SUBTITLE]**
Five integrated capabilities. One closed loop.

**[BODY — PIPELINE]**

- **DETECT** — Real-time flood point identification from traffic cameras, weather APIs, IoT water-level sensors, and crawled news sources. Multi-signal fusion ensures no single point of failure.
- **EVALUATE** — LLM-powered severity assessment that goes beyond binary "flooded / not flooded" classification. Depth estimation, vehicle passability scoring, confidence levels, and natural-language risk summaries.
- **ROUTE** — Google Maps integration that automatically reroutes traffic around confirmed and predicted flood zones in real time. Shortest safe path, not just shortest path.
- **LEARN** — Multi-agent system and reinforcement learning engine that improves with every flood event, every user report, every routing outcome. The system compounds intelligence over time.
- **REPORT** — Automated flood impact reports, traffic regulation suggestions, and prediction dashboards delivered to city operators and decision-makers.

**[VISUAL DIRECTION — PIPELINE DIAGRAM]**
Horizontal flow diagram with five pipeline nodes connected by animated directional arrows:

```
[Camera/Sensor Icon] → [Brain/AI Icon] → [Map/Route Icon] → [Loop/Cycle Icon] → [Document Icon]
     DETECT              EVALUATE           ROUTE              LEARN              REPORT
```

Each node: rounded-corner box, `#1E293B` fill, `#334155` border. Icon inside colored by function (Cyan for Detect, Blue for Evaluate, Green for Route, Amber for Learn, Muted for Report). Arrow lines in `#334155` with `#2563EB` directional arrowheads.

Below the pipeline: a split-screen map comparison.
- Left map labeled "Without FloodRoute AI" — chaotic red and amber route lines converging into flood zones, stranded vehicle icons, no alternative routing.
- Right map labeled "With FloodRoute AI" — green route lines smoothly curving around clearly marked blue flood zones, all traffic flowing on safe corridors.

**[SPEAKER NOTES]**
Walk through each pillar deliberately. The key insight that differentiates us: we do not just detect flooding. We connect detection to severity evaluation to routing optimization to continuous learning in a single closed loop. No other platform does this end-to-end. Google Maps gives you directions. Waze gives you crowdsourced traffic. Weather apps give you rainfall data. Nobody connects all three and makes a routing decision. We do.

---

### Slide 4 — System Intelligence: LLM + Agents + RL Learning Loop

**Background:** Default dark gradient with subtle radial glow.

**Layout:** Left text (50%), right circular diagram (50%).

---

**[TITLE]**
Intelligence That Compounds

**[SUBTITLE]**
Every flood event makes the system smarter.

**[BODY — LEFT COLUMN]**

- **LLM LAYER** — Reads weather forecasts, processes camera feeds, ingests news articles, and interprets user reports. Classifies flood severity using natural language understanding. Generates human-readable risk summaries and traffic advisories that city operators can act on immediately.
- **AGENT SYSTEM** — Autonomous agents crawl data sources around the clock. They cross-reference signals across weather, cameras, news, and IoT sensors. They escalate when confidence is low. They self-heal when data sources go offline. They never sleep.
- **REINFORCEMENT LEARNING** — Every routing decision generates an outcome signal. Did the recommended route stay clear? Did drivers follow the suggestion? Was the severity estimate accurate? RL optimizes future decisions: which routes to recommend, when to trigger alerts, how aggressively to reroute.
- **CLOSED LOOP** — Detect, Evaluate, Route, Measure, Learn, Improve. The system gets measurably better after every flood event. This is not a static model — it is a living intelligence engine.

**[VISUAL DIRECTION — RIGHT COLUMN]**
Circular learning loop diagram with five nodes arranged in a circle, connected by curved directional arrows:

```
         [SENSE]
        /       \
   [LEARN]     [THINK]
      |           |
   [MEASURE]   [ACT]
        \       /
```

Node colors:
- Sense: Flood Cyan `#06B6D4`
- Think: Storm Blue `#2563EB`
- Act: Safe Green `#10B981`
- Measure: Caution Amber `#F59E0B`
- Learn: Purple `#7C3AED`

Center of the circle: FloodRoute AI logo mark, small, with subtle glow. Arrows animate clockwise in the live version, showing continuous improvement.

**[SPEAKER NOTES]**
This is the technical moat slide. Spend time here. Competitors do point solutions — a weather API here, a routing tool there. We built a system that integrates ALL signals AND learns from outcomes. The multi-agent architecture means the system is always on, always ingesting, always cross-referencing. The RL layer means every flood event is training data. The more floods a city experiences, the better our system performs for the next one. That is a compounding advantage that is extremely difficult to replicate.

---

### Slide 5 — Simulation: Route Optimization and Traffic Modeling

**Background:** Map slide — full-bleed dark map at 30% opacity behind content.

**Layout:** Split-screen map visualization (top 60%), comparison metrics (bottom 40%).

---

**[TITLE]**
Test Before You Deploy

**[SUBTITLE]**
Digital twin simulation for flood scenario planning.

**[BODY]**

- **Digital twin simulation** of city traffic networks under arbitrary flood conditions — model any scenario without risking real traffic
- **What-if analysis** for infrastructure planners: What if Bridge X floods? What if three arterial roads close simultaneously? What if rainfall exceeds 100mm per hour for six hours?
- **Side-by-side strategy comparison** — test different routing strategies, traffic signal adjustments, and detour plans before pushing any of them to production
- **Stress testing** of city infrastructure resilience under extreme flood scenarios beyond historical precedent
- **Planning tool** for long-term infrastructure investment — evaluate the ROI of proposed drainage projects, elevated roadways, and flood barriers using real traffic impact data

**[VISUAL DIRECTION]**
Split-screen map visualization occupying the right two-thirds of the slide:
- Left map panel labeled "Current Reality" — shows a city with active flood zones (blue polygons), current traffic flow (mixed green/amber/red route lines), and real-time data points.
- Right map panel labeled "Simulation: 150mm/hr Scenario" — shows the same city with expanded hypothetical flood zones (deeper purple polygons), and the system's recommended routing strategy (green lines avoiding all flood zones).

Below the maps: a comparison metrics table in a dark panel (`#1E293B`):

| Metric                    | Current Reality | Simulated Scenario | Delta    |
| ------------------------- | --------------- | ------------------- | -------- |
| Average travel time       | 24 min          | 38 min              | +58%     |
| Vehicles affected         | 12,400          | 41,200              | +232%    |
| Alternative route capacity| 78%             | 34%                 | -56%     |
| Emergency response time   | 8 min           | 19 min              | +137%    |

At the very bottom: a timeline scrubber bar showing simulated time progression from T-6hrs to T+12hrs, with a playhead indicator.

**[SPEAKER NOTES]**
This is what separates us from every reactive flood tool on the market. City operators can simulate a worst-case monsoon scenario BEFORE it happens and pre-position routing strategies, alert templates, and traffic signal plans. Insurance companies can model granular flood risk for portfolio assessment. Urban planners can evaluate whether a proposed $50M drainage project will actually reduce traffic disruption — with real numbers, not guesses. The simulation engine also serves double duty: it is where we generate synthetic training data for our RL models, creating a virtuous cycle between simulation accuracy and real-world routing performance.

---

### Slide 6 — Prediction: Historical + Real-Time + News Data

**Background:** Default dark gradient.

**Layout:** Timeline visualization across the full width (top 60%), accuracy metrics below (bottom 40%).

---

**[TITLE]**
Know Before It Floods

**[SUBTITLE]**
2-6 hour advance warning. 94% severity classification accuracy.

**[BODY]**

- **Three-layer prediction engine** combining historical flood patterns, real-time weather and sensor data, and crawled news and social media reports into a unified probability model
- **2-6 hour advance warning** for flood-prone intersections and corridors — enough lead time to activate detour plans, alert transit operators, and push notifications to drivers
- **Probability heatmaps** showing where flooding is LIKELY to occur — not just where it currently IS — enabling proactive rather than reactive response
- **Temporal modeling** captures seasonal patterns, tide cycles, drainage system capacity, upstream rainfall correlation, and soil saturation rates for high-fidelity predictions
- **94% accuracy** on flood severity classification in pilot deployment benchmarks, with continuous improvement through the learning loop

**[VISUAL DIRECTION]**
Three-panel timeline visualization showing the same city map at three different time points:

**Panel 1 — "6 Hours Before"**
- Map with subtle yellow-orange probability zones in low-lying areas
- Probability indicators: 30-50% confidence
- Label: "Early Warning Issued"
- Alert badge: Caution Amber

**Panel 2 — "2 Hours Before"**
- Same map with intensified amber probability zones, some areas now orange-red
- Probability indicators: 60-85% confidence
- Label: "Pre-Routing Activated"
- Alert badge: Caution Amber transitioning to Danger Red

**Panel 3 — "Now (Confirmed)"**
- Same map with confirmed flood zones matching prediction locations exactly
- Blue flood polygons overlaid precisely where predicted
- Green routing paths already active, traffic already rerouted
- Label: "Zero Vehicles Stranded"
- Alert badge: Safe Green (system worked)

Below the timeline: two large stat cards side by side:

| 94%                               | 2-6hrs                            |
| --------------------------------- | --------------------------------- |
| Severity Classification Accuracy  | Advance Warning Window            |

**[SPEAKER NOTES]**
Most flood response today is purely reactive — cities find out about flooding when drivers are already stuck and calling emergency services. Our prediction engine fundamentally flips this dynamic. We give cities a two to six hour head start. That is enough time to activate pre-planned detour strategies, alert public transit operators to adjust service, send push notifications to commuters, and pre-position emergency response assets. The news and social media crawling layer is particularly important — it picks up early reports from residents, local journalists, and government bulletins that satellites and weather models systematically miss. A tweet about ankle-deep water at an intersection can arrive 45 minutes before a weather radar confirms significant rainfall in that watershed.

---

### Slide 7 — Product: Dashboard, Alerts, Routing, Reports

**Background:** Default dark gradient.

**Layout:** Full-width dashboard mockup (top 55%), five product capability descriptions below (bottom 45%).

---

**[TITLE]**
Built for Operators. Designed for Action.

**[SUBTITLE]**
A single platform — not five tools stitched together.

**[BODY]**

- **COMMAND CENTER** — Real-time city-wide map with flood zone overlay, severity indicators, active alert markers, and route status for every monitored corridor. The single pane of glass for urban flood-traffic operations.
- **ALERT ENGINE** — Push notifications to drivers, fleet operators, and city officials. Severity-tiered alerting with escalation chains. Multi-channel delivery: mobile app, SMS, email, API webhook, and integration with existing city alert systems.
- **ROUTE OPTIMIZER** — Google Maps integration. Input any origin and destination, receive the flood-aware optimal route. REST API endpoint for fleet management systems, ride-hailing platforms, and logistics operators. Sub-200ms response time.
- **REPORTING SUITE** — Daily flood impact reports, traffic disruption analysis, prediction accuracy tracking, and traffic regulation recommendations. Auto-generated and LLM-written in natural language. PDF export for government stakeholders.
- **PLANNING TOOLS** — Historical trend analysis, flood resilience scoring per corridor, infrastructure investment modeling, and long-term risk assessment. The strategic layer for city planners and policy makers.

**[VISUAL DIRECTION]**
Dashboard mockup rendered in the FloodRoute AI dark theme. The mockup should feel like a real product — not a wireframe. Think Palantir Gotham meets Mapbox Studio:

- **Left sidebar** (narrow): Navigation icons for Command Center, Alerts, Routes, Reports, Planning. Active item highlighted with Storm Blue.
- **Center area** (60% of mockup): Full city map with dark Mapbox tiles, three active flood zones (blue polygons with severity color coding), five green safe route lines, two amber compromised route lines, camera and sensor point markers.
- **Right panel** (25% of mockup): Live alert feed showing recent alerts with severity badges (Safe Green, Caution Amber, Danger Red), timestamps, and affected corridors.
- **Bottom strip**: Key metrics bar showing: Active Flood Points (12), Rerouted Vehicles (3,847), Prediction Accuracy (94.2%), System Status (Online — all green).

**[SPEAKER NOTES]**
Walk through each product surface and connect it to a specific user. The command center is the daily driver for traffic operations center staff — the people sitting in front of screens 24/7. The alert engine is what reaches drivers and fleet dispatchers in the field. The route optimizer API is how logistics companies like Grab, Gojek, and DHL integrate our intelligence into their own systems without changing their workflow. The reporting suite is what city council members and department heads read when making budget decisions. The planning tools are what urban infrastructure consultants use when designing the next decade of city development. Every user type has a purpose-built view into the same underlying intelligence.

---

### Slide 8 — Market Opportunity

**Background:** Default dark gradient with subtle radial glow.

**Layout:** Left text and market sizing (55%), right concentric circles and growth chart (45%).

---

**[TITLE]**
$40B Market. Zero Purpose-Built Solutions.

**[SUBTITLE]**
We are defining a new category at the intersection of smart transportation and climate resilience.

**[BODY]**

- **TAM: $40B** — Global smart transportation management and urban climate resilience market, encompassing traffic intelligence, flood risk analytics, and city infrastructure planning
- **SAM: $8B** — AI-powered traffic management and flood risk intelligence specifically, including government procurement and enterprise data services
- **SOM: $400M** — Southeast Asian flood-prone metros and US Gulf Coast / Eastern Seaboard cities as the initial beachhead market within the first three years
- **Growth drivers:** Climate change accelerating flood frequency, smart city infrastructure budgets increasing at 23% CAGR globally, insurance industry demand for granular real-time flood risk data, and government mandates for climate adaptation planning
- **Competitive white space:** No incumbent platform owns the "flood-aware traffic intelligence" category. This is a greenfield opportunity to define and dominate a new vertical.

**[VISUAL DIRECTION — RIGHT COLUMN]**
**Top:** Concentric circle diagram (TAM / SAM / SOM):
- Outer circle: `#2563EB` at 15% opacity, labeled "$40B TAM"
- Middle circle: `#2563EB` at 30% opacity, labeled "$8B SAM"
- Inner circle: `#2563EB` at 60% opacity, labeled "$400M SOM"
- Dollar amounts rendered in JetBrains Mono Bold, Flood Cyan

**Bottom:** Bar chart showing smart city infrastructure budget growth from 2024 to 2030:
- Bars in Storm Blue, growing left to right
- 23% CAGR annotation line in Flood Cyan
- Y-axis: billions of dollars
- Clean, minimal, dark background, no gridlines

**[SPEAKER NOTES]**
The key insight for investors is that this market exists at the intersection of two massive, independently growing mega-trends: smart city infrastructure spending (driven by urbanization and digital transformation) and climate adaptation spending (driven by increasingly severe weather events and government mandates). Both are accelerating. And at that intersection, no single platform currently serves the specific use case of flood-aware traffic intelligence. We are not competing with Google Maps — Google Maps does not model flood zones. We are not competing with weather apps — weather apps do not reroute traffic. We are building the intelligence layer that connects these domains for the first time.

---

### Slide 9 — Business Model

**Background:** Default dark gradient.

**Layout:** Three revenue stream columns (top 50%), revenue projection chart (bottom 50%).

---

**[TITLE]**
SaaS + API + Data Intelligence

**[SUBTITLE]**
Three revenue streams. Multiple buyer types. Compounding data moat.

**[BODY]**

**PLATFORM SUBSCRIPTION (B2G)**
City governments pay monthly for full platform access. Tiered by city population, geographic coverage, and flood point density.
- Starter: $5,000/month — single monitoring zone, up to 50 flood points, basic alerting and routing
- Professional: $15,000/month — multi-zone coverage, up to 500 flood points, simulation engine, prediction dashboards, API access
- Enterprise: Custom pricing — city-wide deployment, dedicated support, custom integrations with existing city systems, SLA guarantees

**API ACCESS (B2B)**
Logistics companies, ride-hailing platforms, navigation apps, and insurance companies pay per API call for routing intelligence and flood risk data.
- Routing API: $0.002 per call — returns flood-aware optimal route for any origin/destination pair
- Risk Assessment API: $0.01 per call — returns flood probability, severity score, and confidence level for any geographic point or corridor

**DATA-AS-A-SERVICE**
Anonymized, aggregated flood-traffic intelligence datasets sold to insurance underwriters, real estate investment firms, and urban planning consultancies.
- Subscription-based access to historical and predictive flood-traffic data
- Custom analytics and reporting for specific geographic areas or risk profiles

**REVENUE PROJECTION**

| Year | ARR        | Key Driver                                     |
| ---- | ---------- | ---------------------------------------------- |
| Y1   | $400K      | 2 pilot city subscriptions + initial API       |
| Y2   | $2.5M      | 5 cities + growing API volume + first DaaS     |
| Y3   | $10M       | 15 cities + enterprise API + DaaS expansion    |
| Y5   | $45M       | 40+ cities + platform ecosystem + global DaaS  |

**[VISUAL DIRECTION]**
**Top section:** Three columns, each representing a revenue stream:
- Column 1: Building icon, "B2G Platform" label, tier pricing in a dark card
- Column 2: Code bracket icon, "B2B API" label, per-call pricing in a dark card
- Column 3: Database icon, "Data Intelligence" label, description in a dark card

**Bottom section:** Revenue growth chart (area chart or bar chart):
- X-axis: Y1 through Y5
- Y-axis: Revenue in millions
- Storm Blue filled area or bars
- Key milestones annotated on the chart (first pilot, API launch, Series A, international expansion)
- The shape should clearly show hockey-stick growth from Y2 to Y5

**[SPEAKER NOTES]**
Walk through why three revenue streams matter. The B2G platform subscription is the anchor — government contracts are sticky, typically multi-year, and provide stable recurring revenue. The B2B API is the growth engine — every logistics company, ride-hailing platform, and delivery service operating in a flood-prone city needs this data, and they need it integrated into their existing systems via API, not a separate dashboard. The Data-as-a-Service play is our long-term margin expander — once we have accumulated years of flood-traffic intelligence data, the marginal cost of packaging and selling that intelligence to insurance, real estate, and planning firms approaches zero. Each revenue stream also reinforces the others: more city deployments generate more data, which makes the API more valuable, which makes the DaaS offering richer.

---

### Slide 10 — Benefits and Impact

**Background:** Default dark gradient with subtle radial glow.

**Layout:** Four-quadrant layout with FloodRoute AI logo in the center connecting all quadrants.

---

**[TITLE]**
Saving Lives. Saving Time. Saving Cities.

**[SUBTITLE]**
Measurable impact across every stakeholder.

**[BODY]**

**FOR CITIZENS (Top-Left Quadrant)**
- 23% reduction in average commute duration during flood events
- Real-time alerts prevent drivers from entering flooded roads
- Zero flood-related traffic fatalities reported in pilot monitoring zones
- Accessible via existing navigation apps through API integration

**FOR CITY GOVERNMENTS (Top-Right Quadrant)**
- 40% faster emergency response through optimized flood-aware routing
- Data-driven traffic regulation recommendations reduce decision lag
- Flood resilience scoring per corridor informs infrastructure investment priorities
- Reduced municipal liability exposure from proactive flood-traffic management

**FOR ENTERPRISES (Bottom-Left Quadrant)**
- 68% fewer flood-related delivery delays for logistics operators
- $2.3M average quarterly cost savings for mid-size fleet operators
- API integration completed in under 48 hours with existing fleet management systems
- Real-time fleet rerouting eliminates manual dispatcher intervention during flood events

**FOR THE PLANET (Bottom-Right Quadrant)**
- 31% fewer vehicle-hours wasted in flood-affected zones
- Measurable CO2 reduction from eliminated idle time and circuitous routing
- Climate adaptation made operational — not just theoretical
- Data foundation for long-term urban resilience planning

**[VISUAL DIRECTION]**
Four-quadrant grid layout. Each quadrant contains:
- Stakeholder icon (32px, accent-colored): Person icon for Citizens, Building icon for Government, Briefcase icon for Enterprise, Globe icon for Planet
- Stakeholder label in Inter Bold 18px, `#F8FAFC`
- Two primary impact metrics in JetBrains Mono Bold 36px, `#06B6D4`
- Supporting text in Inter Regular 14px, `#94A3B8`

Center intersection: FloodRoute AI logo mark with subtle connecting lines radiating to each quadrant in `#334155`.

Quadrant backgrounds: slightly lighter than slide background (`#111827`) with `#334155` borders, creating distinct zones.

**[SPEAKER NOTES]**
Lead with lives saved — that is the headline that resonates with government buyers and press. Then time saved — that is what citizens feel every day. Then money saved — that is what closes enterprise deals. Then environmental impact — that is what ESG-focused investors and climate-conscious government officials care about. This is not just a traffic tool. It is critical infrastructure for climate-adapted cities. The government buying decision is ultimately driven by liability reduction and citizen safety outcomes. The enterprise buying decision is driven by hard cost savings and operational efficiency. Both are strong, both are measurable, and both compound as the system learns.

---

### Slide 11 — Roadmap

**Background:** Default dark gradient.

**Layout:** Full-width horizontal timeline with four phase nodes.

---

**[TITLE]**
From Pilot to Platform

**[SUBTITLE]**
18-month execution plan to category leadership.

**[BODY]**

**PHASE 1 — Foundation (Q1-Q2 2026)**
- Core data pipeline: weather APIs, camera feeds, news crawler, IoT sensor integration
- MVP command center dashboard with real-time flood overlay
- Google Maps routing integration — first flood-aware routing endpoint
- First pilot city deployment: Ho Chi Minh City
- Basic flood detection and severity scoring model v1
- Target: Working product, first reference customer, initial data collection

**PHASE 2 — Intelligence (Q3-Q4 2026)**
- LLM integration for severity assessment and natural language reporting
- Multi-agent system v1: autonomous data crawling and cross-referencing
- Prediction engine: 2-6 hour advance warning capability
- Simulation engine MVP for what-if scenario planning
- Expand to 3 pilot cities
- Mobile alert system launch
- API v1 for B2B customers
- Target: AI differentiation live, 3 paying cities, first API revenue

**PHASE 3 — Scale (Q1-Q2 2027)**
- Reinforcement learning optimization: closed-loop learning from routing outcomes
- Multi-city orchestration: manage 10+ cities from a single platform instance
- Enterprise API with SLA guarantees for logistics and fleet customers
- Government reporting suite: automated flood impact reports and regulation recommendations
- Expand to 10 cities across Southeast Asia
- Third-party integration marketplace
- Target: $3M+ ARR, proven prediction accuracy, 3+ enterprise API customers

**PHASE 4 — Platform (Q3-Q4 2027)**
- Full digital twin simulation for urban flood-traffic modeling
- Edge computing support for direct IoT sensor integration
- International expansion: India, Brazil, US Gulf Coast
- Developer platform: SDKs, documentation, and partner ecosystem
- Data-as-a-Service launch for insurance and real estate verticals
- Target: $10M+ ARR, international presence, platform ecosystem established

**[VISUAL DIRECTION]**
Horizontal timeline spanning the full slide width:

Four phase nodes on a horizontal line (`#334155` base line). Nodes are circles that increase in size from left to right:
- Phase 1: 24px diameter, `#06B6D4` fill
- Phase 2: 32px diameter, `#2563EB` fill
- Phase 3: 40px diameter, `#2563EB` fill
- Phase 4: 48px diameter, `#7C3AED` fill

Above each node: Phase name in Inter Bold 16px, `#F8FAFC`, and date range in Inter Regular 12px, `#64748B`.

Below each node: Three key milestones in Inter Regular 14px, `#94A3B8`, with small bullet markers.

A subtle gradient line connects all four nodes, transitioning from Flood Cyan (left) to Storm Blue (middle) to Purple (right), suggesting increasing sophistication.

A "WE ARE HERE" indicator (small animated arrow or pulsing dot) marks the current position at Phase 1.

**[SPEAKER NOTES]**
We are currently in Phase 1. The pilot deployment in Ho Chi Minh City gives us three critical things: real-world flood data for training our models, a reference customer for government sales conversations, and validation that our detection and routing pipeline works under actual flood conditions. Phase 2 is where the AI differentiation becomes tangible — the LLM integration, multi-agent system, and prediction engine are what separate us from anyone who might try to build a basic flood-routing tool. Phase 3 is the revenue inflection point — scaling to 10 cities and launching the enterprise API creates the growth trajectory needed for a Series A conversation. Phase 4 is the platform play — at that point we stop being a product and become the infrastructure layer that other companies and cities build on. That is the long-term defensible position.

---

### Slide 12 — Team and The Ask

**Background:** Accent slide — default dark gradient with centered radial glow. Map at 10% opacity.

**Layout:** Team section (top 45%), funding ask section (middle 35%), closing statement (bottom 20%).

---

**[TITLE]**
Built by People Who Have Seen the Flood

**[SUBTITLE]**
Domain expertise meets engineering depth.

**[BODY — TEAM]**

- **CEO** — Urban systems and AI background. Track record of building and shipping smart city solutions. Deep understanding of government procurement cycles, stakeholder management, and the operational reality of city traffic departments.
- **CTO** — Machine learning systems engineering. Experience building real-time data pipelines that process millions of events per second. Deep expertise in geospatial AI, distributed systems, and production ML infrastructure.
- **Head of AI** — PhD-level research in flood prediction modeling and traffic network optimization. Published in top-tier venues. Brings academic rigor to production model development and evaluation.
- **Head of Product** — B2G SaaS product leadership. Has shipped products actively used by city operators and government agencies. Understands how to design for high-stakes operational environments where uptime and clarity are non-negotiable.
- **Advisory Board** — Transportation engineering professors, smart city venture investors, climate technology founders, and Southeast Asian government technology advisors.

**[BODY — THE ASK]**

**Raising: $2.5M Seed Round**

Use of funds:
- 45% — Engineering: core platform development, AI/ML pipeline, infrastructure
- 25% — Go-to-market: pilot city expansion, government partnerships, sales
- 15% — Data infrastructure: compute, storage, third-party data licensing, IoT partnerships
- 15% — Operations: team growth, legal, compliance, IP protection

**Milestones to Series A:**
- 10 pilot city deployments with paying government customers
- $3M ARR run rate
- Proven prediction accuracy above 90% across diverse geographies
- 3 or more enterprise API customers in logistics or insurance verticals
- Published case studies demonstrating measurable flood-traffic impact reduction

**[CLOSING STATEMENT]**

> Floods are inevitable. Traffic chaos is not.

**[VISUAL DIRECTION]**
**Top section — Team:** Clean grid layout with five role cards. Each card: `#1E293B` background, `#334155` border, 12px radius. Role title in Inter Bold 16px, Storm Blue. Description in Inter Regular 14px, `#94A3B8`. No photos — role and expertise are what matter at this stage.

**Middle section — The Ask:** Highlighted panel with `#1E293B` background and `#2563EB` left border (4px). "$2.5M Seed Round" in JetBrains Mono Bold 36px, `#06B6D4`. Budget allocation shown as a horizontal stacked bar chart (colored segments with percentage labels). Milestones listed as a checklist below.

**Bottom section — Closing:** Full-width. The closing statement rendered in Inter Bold 44px, `#F8FAFC`, centered, with generous whitespace above and below. Below the statement: contact information and logo in `#64748B`. Background glow intensifies slightly behind the closing text.

**[SPEAKER NOTES]**
Close strong and clean. Walk through the team quickly — investors are evaluating the team as much as the product. Emphasize the combination of domain expertise (people who have actually dealt with urban flooding) and technical depth (people who have built production ML systems at scale). On the ask: $2.5M is a modest raise for the magnitude of the opportunity. It gets us to 10 cities and Series A readiness within 18 months. The milestones are specific, measurable, and achievable. End with the vision statement. Pause. Let it resonate. Floods are inevitable — that is climate reality. Traffic chaos is not — that is what FloodRoute AI eliminates. Thank the audience and open for questions.

---

## Part 3: Appendix — Slide Index and Quick Reference

| Slide | Title                                    | Type       | Key Visual                          |
| ----- | ---------------------------------------- | ---------- | ----------------------------------- |
| 1     | FloodRoute AI                            | Title      | City map with flood zones + routes  |
| 2     | The Invisible Crisis                     | Problem    | Stat cards (300%, $17B, 80%, 2hrs)  |
| 3     | One AI Platform                          | Solution   | Pipeline diagram + before/after map |
| 4     | Intelligence That Compounds              | Technology | Circular learning loop diagram      |
| 5     | Test Before You Deploy                   | Simulation | Split-screen map + metrics table    |
| 6     | Know Before It Floods                    | Prediction | Three-panel timeline + accuracy     |
| 7     | Built for Operators                      | Product    | Dashboard mockup                    |
| 8     | $40B Market                              | Market     | TAM/SAM/SOM circles + growth chart  |
| 9     | SaaS + API + Data Intelligence           | Business   | Revenue streams + hockey stick      |
| 10    | Saving Lives. Saving Time. Saving Cities.| Impact     | Four-quadrant impact grid           |
| 11    | From Pilot to Platform                   | Roadmap    | Horizontal timeline, 4 phases      |
| 12    | Built by People Who Have Seen the Flood  | Team/Ask   | Team grid + funding panel + close   |

---

## Part 4: Design System Token Summary

For implementation in Figma, CSS, or any presentation tool.

```css
/* FloodRoute AI — Pitch Deck Design Tokens */

:root {
  /* Primary Brand Colors */
  --fr-abyss: #0A0E1A;
  --fr-midnight: #111827;
  --fr-storm-blue: #2563EB;
  --fr-flood-cyan: #06B6D4;

  /* Alert Colors */
  --fr-safe-green: #10B981;
  --fr-caution-amber: #F59E0B;
  --fr-danger-red: #EF4444;

  /* Extended Palette */
  --fr-purple: #7C3AED;

  /* Text Colors */
  --fr-text-primary: #F8FAFC;
  --fr-text-body: #E2E8F0;
  --fr-text-muted: #94A3B8;
  --fr-text-dim: #64748B;

  /* Surface Colors */
  --fr-surface: #1E293B;
  --fr-border: #334155;

  /* Typography */
  --fr-font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --fr-font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

  /* Spacing (based on 80px slide padding) */
  --fr-slide-padding: 80px;
  --fr-section-gap: 48px;
  --fr-element-gap: 24px;
  --fr-card-radius: 12px;
  --fr-badge-radius: 9999px;

  /* Transitions */
  --fr-transition-fade: 400ms ease-in-out;
  --fr-transition-count: 1500ms ease-out;
  --fr-transition-draw: 1000ms ease-in-out;
  --fr-transition-stagger: 200ms;
}

/* Background Gradients */
.slide-bg-default {
  background: linear-gradient(180deg, #0A0E1A 0%, #111827 100%);
}

.slide-bg-accent {
  background:
    radial-gradient(ellipse at center, rgba(37, 99, 235, 0.05) 0%, transparent 70%),
    linear-gradient(180deg, #0A0E1A 0%, #111827 100%);
}

.slide-bg-map {
  background:
    linear-gradient(180deg, rgba(10, 14, 26, 0.7) 0%, rgba(17, 24, 39, 0.7) 100%);
  /* Dark map tiles rendered behind this overlay */
}

/* Typography Styles */
.slide-title {
  font-family: var(--fr-font-primary);
  font-weight: 700;
  font-size: 44px;
  color: var(--fr-text-primary);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.slide-subtitle {
  font-family: var(--fr-font-primary);
  font-weight: 400;
  font-size: 20px;
  color: var(--fr-text-muted);
  line-height: 1.4;
}

.slide-body {
  font-family: var(--fr-font-primary);
  font-weight: 400;
  font-size: 18px;
  color: var(--fr-text-body);
  line-height: 1.6;
}

.data-callout {
  font-family: var(--fr-font-mono);
  font-weight: 700;
  font-size: 56px;
  color: var(--fr-flood-cyan);
  line-height: 1.0;
}

.label {
  font-family: var(--fr-font-primary);
  font-weight: 500;
  font-size: 12px;
  color: var(--fr-text-dim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Component: Stat Card */
.stat-card {
  background: var(--fr-surface);
  border: 1px solid var(--fr-border);
  border-radius: var(--fr-card-radius);
  padding: 24px;
}

/* Component: Alert Badge */
.alert-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: var(--fr-badge-radius);
  font-family: var(--fr-font-primary);
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.alert-badge--safe {
  background: rgba(16, 185, 129, 0.2);
  color: var(--fr-safe-green);
}

.alert-badge--caution {
  background: rgba(245, 158, 11, 0.2);
  color: var(--fr-caution-amber);
}

.alert-badge--danger {
  background: rgba(239, 68, 68, 0.2);
  color: var(--fr-danger-red);
}

/* Component: Pipeline Node */
.pipeline-node {
  background: var(--fr-surface);
  border: 1px solid var(--fr-border);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

/* Component: Quote Block */
.quote-block {
  border-left: 4px solid var(--fr-storm-blue);
  padding-left: 24px;
  font-style: italic;
}
```

---

*This document is the single source of truth for the FloodRoute AI pitch deck. It contains everything a designer, developer, or presenter needs to produce, deliver, and maintain the deck across formats — from Figma to Keynote to web-based presentations.*
