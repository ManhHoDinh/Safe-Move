# SafeMove AI -- Dashboard Design

> Complete specification for every dashboard view, layout, data visualization pattern, and user flow in the SafeMove AI platform. This document translates the design system into concrete screen-by-screen implementation guidance.

---

## Dashboard Layout

### Master Layout Wireframe

```
+------------------------------------------------------------------+
|  [=] SafeMove AI        [/] Search...         [bell] [?] [avatar]|
|  (hamburger/logo)       (Cmd+K)               (notif)(help)(user)|
+------+-------------------------------------------+---------------+
|      |                                           |               |
|  S   |                                           |    Right      |
|  I   |                                           |    Panel      |
|  D   |         Main Content Area                 |    (360px)    |
|  E   |                                           |               |
|  B   |    (fluid width, 12-column grid)          |   Contextual  |
|  A   |                                           |   details,    |
|  R   |    View-specific content renders here.    |   event feed, |
|      |    Full-bleed for map views.              |   or property |
|  240 |    Padded grid for dashboard views.       |   inspector   |
|  px  |                                           |               |
|      |                                           |   Collapsible |
|      |                                           |   on tablet   |
|      |                                           |               |
|  N   |                                           |               |
|  A   |                                           |               |
|  V   |                                           |               |
|      |                                           |               |
+------+-------------------------------------------+---------------+
```

### Header Bar (56px)

```
+------------------------------------------------------------------+
|                                                                  |
|  [=]  [SafeMove logo]  |  [/] Search commands & data (Cmd+K)    |
|                         |                                        |
|  Left cluster           |  Center: Search bar (480px max)        |
|                         |                                        |
|  Hamburger on tablet    |  Right cluster:                        |
|  Logo always visible    |  [Live indicator] [bell w/ badge]      |
|                         |  [? Help] [avatar + name dropdown]     |
|                                                                  |
+------------------------------------------------------------------+
```

**Header specifications:**
- Height: 56px, fixed position, z-index: 50
- Background: `--surface-primary` with 1px bottom border `--border-default`
- In dark mode: background `--dm-surface-1` (#0A1628)
- Logo: 28px height, left-aligned with 16px padding
- Search bar: 400px default, expands to 480px on focus, height 36px, rounded-lg
- Notification bell: 20px icon with red badge (8px circle) for unread count
- User avatar: 32px circle with dropdown menu on click

### Sidebar Navigation (240px)

```
+----------------------------------+
|                                  |
|  OPERATIONS                      |  <-- Section label (11px, uppercase,
|                                  |      --neutral-400, 24px top margin)
|  [map-pin]   Command Center  *   |
|  [route]     Route Optimizer     |  <-- Nav item (14px medium, 36px h,
|  [truck]     Fleet Manager       |      8px radius, 12px left padding)
|  [signal]    Signal Control      |
|                                  |  * = active indicator (3px left
|  INTELLIGENCE                    |      border --blue-500, bg tint)
|                                  |
|  [chart]     Analytics           |
|  [brain]     Simulations         |
|  [bot]       Agent Monitor       |
|  [file]      Reports             |
|                                  |
|  ADMINISTRATION                  |
|                                  |
|  [settings]  Settings            |
|  [key]       API Keys            |
|  [users]     Team                |
|                                  |
|  ================================|  <-- Divider (1px --border-default)
|                                  |
|  [collapse]  Collapse    Ctrl+[  |  <-- Collapse toggle
|                                  |
|  +---+                           |
|  |ava| Jane Doe           [...]  |  <-- User section (48px height)
|  +---+ Traffic Ops               |     Avatar 32px, name 14px medium,
|        jane@safemove.ai          |     role 12px --neutral-400
|                                  |
+----------------------------------+
```

### Right Panel (360px)

The right panel is contextual and its content changes based on the active view and user selection.

| Active View | Panel Content |
|---|---|
| Command Center | Real-time event feed and alert stream |
| Route Optimizer | Route comparison details and metrics |
| Analytics | Data point inspector and drill-down |
| Simulations | Scenario parameters and result comparison |
| Agent Monitor | Selected agent detail logs |
| Reports | Report preview and export options |

**Panel behavior:**
- Toggle with keyboard shortcut `Cmd+]` or panel toggle button
- Slides in from right with 250ms ease-in-out transition
- Resizable via drag handle on the left edge (min: 280px, max: 480px)
- On tablet: converts to a bottom drawer (40% viewport height, swipe to expand)
- On mobile: full-screen overlay with back button

---

## Dashboard Views

### 1. Command Center (Default View)

The Command Center is the primary operational view -- a real-time control surface for monitoring and managing city-wide traffic conditions.

#### Layout

```
+------+-----------------------------------------------------+---------+
| SIDE |                                                     | PANEL   |
| BAR  |  +--metrics strip (horizontal, 4 cards)----------+ | (360px) |
|      |  | Active    | Avg Speed | Congestion | Active   | |         |
|      |  | Vehicles  | (city)    | Index      | Alerts   | | EVENT   |
|      |  | 12,847    | 34 mph    | 0.42       | 7        | | FEED    |
|      |  | +3.2% ^   | -2.1% v   | -0.05 v    | +2 ^     | |         |
|      |  +----------------------------------------------- + | [!] I-95|
|      |                                                     | gridlock|
|      |  +--map area (70% viewport height)---------------+ | 2m ago  |
|      |  |                                                | |         |
|      |  |  [Mapbox GL - dark style base map]             | | [!] Sig |
|      |  |                                                | | failure |
|      |  |  Traffic flow overlay (color-coded roads)      | | SR-836  |
|      |  |  Vehicle markers (real-time positions)         | | 5m ago  |
|      |  |  Incident markers (pulsing red indicators)     | |         |
|      |  |                                                | | [i] Opt |
|      |  |  +--layer-panel--+     +--zoom--+              | | complete|
|      |  |  | [x] Traffic   |     | [+]    |              | | Route 7 |
|      |  |  | [x] Vehicles  |     | [-]    |              | | 8m ago  |
|      |  |  | [ ] Heatmap   |     | [N]    |              | |         |
|      |  |  | [ ] Signals   |     +--------+              | | ...     |
|      |  |  +---------------+                             | |         |
|      |  |                                                | | [View   |
|      |  |  +--legend----------------------------------+  | |  All]   |
|      |  |  | Free Flow | Moderate | Slow | Gridlock   |  | |         |
|      |  |  +------------------------------------------+  | |         |
|      |  +------------------------------------------------+ |         |
|      |                                                     |         |
|      |  +--quick actions bar-----------------------------+ |         |
|      |  | [Run Sim] [Optimize Signals] [Export] [Share]   | |         |
|      |  +------------------------------------------------+ |         |
+------+-----------------------------------------------------+---------+
```

#### Metrics Strip

Four stat cards displayed horizontally above the map.

| Metric | Value Format | Source | Update Frequency |
|---|---|---|---|
| **Active Vehicles** | Integer with comma separator | Fleet GPS API | 5 seconds |
| **Average Speed** | Integer + "mph" unit | Traffic sensors aggregate | 10 seconds |
| **Congestion Index** | Decimal (0.00--1.00) | ML model output | 15 seconds |
| **Active Alerts** | Integer with severity breakdown | Event pipeline | Real-time (WebSocket) |

Each card includes:
- Icon (20px, semantic color)
- Label (12px, uppercase, `--neutral-400`)
- Value (30px, JetBrains Mono, bold, `--text-primary`)
- Delta badge: up/down arrow + percentage, green for positive, red for negative
- Sparkline: 120x24px SVG showing last 24 hours of data

#### Map Configuration

```typescript
// Mapbox GL initialization for Command Center
const mapConfig = {
  style: 'mapbox://styles/safemove/dark-traffic-v2',
  center: [-80.1918, 25.7617],  // Default: Miami (configurable per deployment)
  zoom: 12,
  pitch: 0,        // Flat by default, user can tilt
  bearing: 0,
  maxZoom: 18,
  minZoom: 8,
  attributionControl: false,  // Custom attribution in footer
};

// Layer rendering order (bottom to top)
const layerOrder = [
  'base-map',           // Mapbox dark style
  'traffic-heatmap',    // Density heatmap (toggleable)
  'traffic-flow',       // Color-coded road segments
  'route-overlays',     // Active optimized routes
  'signal-markers',     // Traffic signal status
  'vehicle-markers',    // Fleet vehicle positions
  'incident-markers',   // Active incidents (topmost)
];
```

#### Event Feed (Right Panel)

Real-time stream of events sorted by recency.

```
+---------------------------------------+
|  Live Event Feed          [filter] [v] |
+---------------------------------------+
|                                       |
|  [red dot] CRITICAL  2:34 PM         |
|  I-95 NB Gridlock at MM 42           |
|  3 lanes blocked, est. 45 min        |
|  [View] [Ack] [Escalate]             |
|  -----------------------------------  |
|                                       |
|  [amber dot] WARNING  2:31 PM        |
|  Signal #2847 timing drift           |
|  SR-836 @ 72nd Ave, +12s cycle       |
|  [View] [Auto-optimize]              |
|  -----------------------------------  |
|                                       |
|  [green dot] RESOLVED  2:28 PM       |
|  Route optimization complete          |
|  Fleet 12: 3 routes updated          |
|  Saved est. 23 min total             |
|  [View Details]                       |
|  -----------------------------------  |
|                                       |
|  [blue dot] INFO  2:25 PM            |
|  Prediction model retrained           |
|  Accuracy: 94.2% (+0.3%)             |
|  [View Report]                        |
|                                       |
+---------------------------------------+
|  Showing 47 events today  [View All]  |
+---------------------------------------+
```

**Feed specifications:**
- Updates via WebSocket (no polling)
- New events slide in from top with 200ms animation
- Auto-scroll pauses when user scrolls up (with "Jump to latest" button)
- Filter by: severity, type, time range, zone
- Maximum 100 events in view; older events paginate

---

### 2. Analytics Dashboard

A comprehensive data analysis view for traffic patterns, fleet performance, and system health.

#### Layout

```
+------+-----------------------------------------------------------+
| SIDE |                                                           |
| BAR  |  +--time controls-------------------------------------+  |
|      |  | [Today] [7d] [30d] [90d] [Custom]  |  Zone: [All v] |  |
|      |  | [calendar icon] Mar 1 - Mar 21, 2026  [Apply]       |  |
|      |  +-----------------------------------------------------+  |
|      |                                                           |
|      |  +--chart grid (2x3)-----------------------------------+  |
|      |  |                          |                          |  |
|      |  |  Traffic Volume          |  Speed Distribution      |  |
|      |  |  Over Time               |  Heatmap                 |  |
|      |  |  [area chart]            |  [heatmap: hour x road]  |  |
|      |  |  320px height            |  320px height            |  |
|      |  |                          |                          |  |
|      |  +--------------------------+--------------------------+  |
|      |  |                          |                          |  |
|      |  |  Top Congested           |  Prediction Accuracy     |  |
|      |  |  Corridors               |  Over Time               |  |
|      |  |  [horizontal bar chart]  |  [line chart w/ target]  |  |
|      |  |  320px height            |  320px height            |  |
|      |  |                          |                          |  |
|      |  +--------------------------+--------------------------+  |
|      |  |                          |                          |  |
|      |  |  Fleet Utilization       |  Environmental Impact    |  |
|      |  |  by Vehicle Type         |  (CO2 Savings)           |  |
|      |  |  [stacked bar chart]     |  [area chart w/ target]  |  |
|      |  |  320px height            |  320px height            |  |
|      |  |                          |                          |  |
|      |  +--------------------------+--------------------------+  |
|      |                                                           |
+------+-----------------------------------------------------------+
```

#### Chart Specifications

**1. Traffic Volume Over Time** (Area Chart)
- X-axis: time (auto-scales: hourly for 1d, daily for 7-30d, weekly for 90d)
- Y-axis: vehicle count
- Two series: current period (solid fill `#2563EB` at 20% opacity) and comparison period (dashed line `#9CA3AF`)
- Hover: crosshair with tooltip showing exact timestamp, count, and delta
- Annotations: vertical dashed lines for incidents/events

**2. Speed Distribution Heatmap**
- X-axis: hours of day (0--23)
- Y-axis: road segments (top 20 by volume)
- Cell color: `#10B981` (60+ mph) through `#F59E0B` (30 mph) to `#EF4444` (< 10 mph)
- Cell size: minimum 24x24px, scales with container
- Hover: tooltip with segment name, time, average speed, percentile
- Click: drill into corridor detail view

**3. Top Congested Corridors** (Horizontal Bar Chart)
- Ranked list of corridors by congestion severity
- Bar length: proportional to congestion index (0--1)
- Bar color: traffic color encoding (green to red gradient)
- Labels: corridor name (left), congestion value (right)
- Click: navigates to corridor detail with map focus

**4. Prediction Accuracy Over Time** (Line Chart)
- Y-axis: accuracy percentage (80--100% range)
- Reference line: 90% target (dashed `#6B7280`)
- Data points: daily accuracy scores
- Confidence band: 10% opacity fill showing standard deviation
- Annotations: model retrain events marked with vertical lines

**5. Fleet Utilization by Vehicle Type** (Stacked Bar Chart)
- X-axis: time periods
- Y-axis: utilization percentage (0--100%)
- Segments: Active, En-route, Idle, Maintenance
- Colors: `#2563EB`, `#10B981`, `#F59E0B`, `#EF4444`
- Legend: horizontal below chart

**6. Environmental Impact / CO2 Savings** (Area Chart)
- Cumulative CO2 saved (metric tons) over time
- Target line showing projected savings goal
- Annotation markers for optimization milestones
- Secondary axis: equivalent trees planted (for stakeholder readability)

#### Filter System

```
+---------------------------------------------------------------+
|  Filters:                                                     |
|                                                               |
|  Zone        [All Zones         v]   Vehicle Type [All    v]  |
|  Corridor    [All Corridors     v]   Fleet       [All    v]  |
|  Severity    [x]Crit [x]High [x]Med [x]Low                  |
|                                                               |
|  [Reset Filters]                    Applied: 0 filters        |
+---------------------------------------------------------------+
```

Filters apply to all charts simultaneously. Active filter count shown as a badge. Filter state persists in URL query parameters for shareable links.

---

### 3. Route Optimizer

Interactive route planning and optimization interface for fleet operations.

#### Layout

```
+------+-----------------------------------------------------------+
| SIDE |                                                           |
| BAR  |  +--input panel (left, 360px)--+--map (fluid)----------+ |
|      |  |                              |                       | |
|      |  |  ROUTE OPTIMIZER             |  [Mapbox GL Map]      | |
|      |  |                              |                       | |
|      |  |  Origin                      |  Route A (blue, rec.) | |
|      |  |  [pin] 123 Main St, Miami    |  ------>              | |
|      |  |  [x]                         |  Route B (cyan, alt)  | |
|      |  |                              |  - - - ->             | |
|      |  |  Destination                 |  Route C (gray, alt)  | |
|      |  |  [pin] 456 Port Blvd, Miami  |  . . . . >           | |
|      |  |  [x]                         |                       | |
|      |  |                              |  [waypoint markers]   | |
|      |  |  + Add Waypoint              |  [traffic overlay]    | |
|      |  |                              |                       | |
|      |  |  Vehicle Type                |                       | |
|      |  |  [Semi Truck          v]     |                       | |
|      |  |                              |                       | |
|      |  |  Departure Time              |                       | |
|      |  |  [Now v] [2:45 PM]           |                       | |
|      |  |                              |                       | |
|      |  |  Constraints                 |                       | |
|      |  |  [x] Avoid tolls             |                       | |
|      |  |  [x] Avoid highways          |                       | |
|      |  |  [ ] Prefer EV charging      |                       | |
|      |  |                              |                       | |
|      |  |  [Optimize Routes]           |                       | |
|      |  |                              |                       | |
|      |  |  ========================    |                       | |
|      |  |                              |                       | |
|      |  |  RESULTS                     |                       | |
|      |  |                              |                       | |
|      |  |  Recommended: Route A        |                       | |
|      |  |  Score: 94/100               |                       | |
|      |  |                              |                       | |
|      |  +------------------------------+-----------------------+ |
|      |                                                           |
|      |  +--comparison table (full width)------------------------+|
|      |  | Route | Time  | Dist  | Fuel  | Cong. Risk | Score   ||
|      |  |-------|-------|-------|-------|------------|---------|  |
|      |  | A *   | 42min | 28mi  | 2.1gal| Low (12%) | 94/100 ||
|      |  | B     | 38min | 32mi  | 2.4gal| Med (45%) | 78/100 ||
|      |  | C     | 51min | 24mi  | 1.8gal| Low (8%)  | 71/100 ||
|      |  +------------------------------------------------------+|
|      |                                                           |
|      |  [Send to Fleet]  [Save Route]  [Share]  [Export]         |
|      |                                                           |
+------+-----------------------------------------------------------+
```

#### Route Comparison Table

| Column | Data Type | Visual |
|---|---|---|
| Route | Label (A, B, C) | Color-coded dot matching map |
| Time | Duration (min) | Bar chart inline |
| Distance | Miles | Numeric |
| Fuel Est. | Gallons | Numeric with icon |
| Congestion Risk | Percentage | Color-coded badge (green/amber/red) |
| Score | 0--100 | Progress bar with number |

**Recommended route** is highlighted with a subtle blue background tint and a star icon.

#### Route Map Encoding

| Route | Line Style | Color | Width | Opacity |
|---|---|---|---|---|
| **Recommended (A)** | Solid | `#2563EB` | 5px | 1.0 |
| **Alternative (B)** | Dashed (12px dash, 6px gap) | `#06B6D4` | 3px | 0.8 |
| **Alternative (C)** | Dotted (4px dash, 4px gap) | `#9CA3AF` | 3px | 0.6 |
| **Selected (hover)** | Solid + glow | Original + `blur(8px)` | 6px | 1.0 |

#### "Send to Fleet" Flow

1. Click "Send to Fleet" button
2. Modal appears: "Send Route A to Fleet"
3. Select target vehicles (multi-select with search)
4. Optional: Add driver notes
5. Confirm with "Deploy Route" (primary button)
6. Toast: "Route deployed to 3 vehicles in Fleet 12"
7. Event feed updates with deployment confirmation

---

### 4. Simulation Workspace

A scenario planning environment for testing traffic interventions before deployment.

#### Layout

```
+------+-----------------------------------------------------------+
| SIDE |                                                           |
| BAR  |  +--scenario builder (top bar)---------------------------+|
|      |  | Scenario: "I-95 Lane Closure Impact"    [Save] [Share] ||
|      |  | Type: [Road Closure v]  Duration: [4 hours]            ||
|      |  | Location: [I-95 NB, MM 42-45]  Start: [Tomorrow 6AM]  ||
|      |  | [+ Add Condition]                      [Run Simulation]||
|      |  +-------------------------------------------------------+|
|      |                                                           |
|      |  +--split view (50/50)----------------------------------+ |
|      |  |                          |                           | |
|      |  |  CURRENT REALITY         |  SIMULATION RESULT        | |
|      |  |                          |                           | |
|      |  |  [Map with actual        |  [Map with predicted      | |
|      |  |   traffic state]         |   traffic state]          | |
|      |  |                          |                           | |
|      |  |  Avg Speed: 34 mph       |  Avg Speed: 22 mph       | |
|      |  |  Congestion: 0.42        |  Congestion: 0.71        | |
|      |  |  Throughput: 12,400/hr   |  Throughput: 8,200/hr    | |
|      |  |                          |                           | |
|      |  +--------------------------+---------------------------+ |
|      |                                                           |
|      |  +--timeline scrubber (full width)-----------------------+|
|      |  | [|<] [<] [>] [>|]  ====|========  6:00 AM  ========== ||
|      |  |                     ^cursor                           ||
|      |  | 6AM   8AM   10AM   12PM   2PM   4PM   6PM   8PM      ||
|      |  +-------------------------------------------------------+|
|      |                                                           |
|      |  +--metrics comparison (full width)----------------------+|
|      |  | Metric          | Current | Simulated | Delta | Impact||
|      |  |-----------------|---------|-----------|-------|--------|
|      |  | Avg Speed       | 34 mph  | 22 mph    | -35%  | [red] ||
|      |  | Congestion Idx  | 0.42    | 0.71      | +69%  | [red] ||
|      |  | Throughput      | 12,400  | 8,200     | -34%  | [red] ||
|      |  | Affected Routes | --      | 14        | +14   | [amb] ||
|      |  | Est. Delay/Veh  | 0 min   | 18 min    | +18m  | [red] ||
|      |  | Alt Routes Avail| --      | 3         | +3    | [grn] ||
|      |  +------------------------------------------------------+|
|      |                                                           |
|      |  [Apply Mitigation]  [Discard]  [Export Report]           |
+------+-----------------------------------------------------------+
```

#### Split View Synchronization

- Both maps share the same viewport (center, zoom, bearing)
- Pan/zoom one map and the other follows in real-time
- Layer toggles are independent per side
- Timeline scrubber updates the simulation side; current reality side stays at "now"
- Difference overlay mode: single map showing delta between current and simulated

#### Timeline Scrubber

```
+-------------------------------------------------------------------+
|  [|<] [<] [play/pause] [>] [>|]   Speed: [1x] [2x] [4x] [10x]  |
|                                                                   |
|  |----|----|----|----|----|----|----|----|----|----|----|----|      |
|  6AM  7AM  8AM  9AM  10AM 11AM 12PM 1PM  2PM  3PM  4PM  5PM     |
|                    ^                                              |
|               [drag handle]                                       |
|                                                                   |
|  [event markers on timeline: incidents, signal changes, etc.]     |
+-------------------------------------------------------------------+
```

**Specs:** 48px height, full content width, handle is 16px wide draggable element. Playback animates the handle forward at selected speed. Event markers are 8px colored circles positioned at their timestamp.

---

### 5. Agent Monitor

Real-time monitoring dashboard for the multi-agent system that powers SafeMove AI.

#### Layout

```
+------+-----------------------------------------------------------+
| SIDE |                                                           |
| BAR  |  +--agent summary strip----------------------------------+|
|      |  | Total: 12 | Active: 9 [green] | Idle: 2 [gray]       ||
|      |  | Error: 1 [red]  | Avg Response: 142ms                 ||
|      |  +-------------------------------------------------------+|
|      |                                                           |
|      |  +--agent grid (3 columns)-------------------------------+|
|      |  |                                                       ||
|      |  | +--agent card-----+ +--agent card-----+ +--agent---+ ||
|      |  | | [green dot]     | | [green dot]     | | [red dot]| ||
|      |  | | Data Crawler    | | Route Optimizer | | Signal   | ||
|      |  | | Agent #1        | | Agent #3        | | Agent #7 | ||
|      |  | |                 | |                 | |          | ||
|      |  | | Status: Active  | | Status: Active  | | ERROR    | ||
|      |  | | Tasks: 847      | | Tasks: 234      | | Tasks: 0 | ||
|      |  | | Latency: 89ms   | | Latency: 203ms  | | Lat: --  | ||
|      |  | | CPU: 23%        | | CPU: 67%        | | CPU: 0%  | ||
|      |  | | Uptime: 14h 22m | | Uptime: 14h 22m | | Down 3m  | ||
|      |  | |                 | |                 | |          | ||
|      |  | | [View] [Restart]| | [View] [Pause] | | [Restart]| ||
|      |  | +-----------------+ +-----------------+ +----------+ ||
|      |  |                                                       ||
|      |  | (... more agent cards)                                ||
|      |  +-------------------------------------------------------+|
|      |                                                           |
|      |  +--selected agent detail (bottom, expandable)----------+|
|      |  |                                                       ||
|      |  | Agent: Data Crawler #1          Status: Active [grn]  ||
|      |  |                                                       ||
|      |  | +--metrics---+ +--log stream-----------------------+ ||
|      |  | | CPU   [23%]| | 14:32:01 [INFO]  Fetched I-95    | ||
|      |  | | [====    ] | |   sensor batch (142 records)      | ||
|      |  | |            | | 14:31:56 [INFO]  Processing       | ||
|      |  | | MEM   [41%]| |   SR-836 camera feed              | ||
|      |  | | [======  ] | | 14:31:52 [WARN]  Sensor #4421    | ||
|      |  | |            | |   reporting stale data (>30s)     | ||
|      |  | | Tasks 847  | | 14:31:48 [INFO]  API rate limit  | ||
|      |  | | Errors  3  | |   at 78% (420/540 calls)         | ||
|      |  | | Uptime     | | 14:31:44 [INFO]  Fetched US-1    | ||
|      |  | | 14h 22m    | |   sensor batch (98 records)       | ||
|      |  | +------------+ +----------------------------------+ ||
|      |  |                                                       ||
|      |  | +--performance chart (sparkline strip)---------------+||
|      |  | | Latency (24h)  [~~~~~~~~~~~~~~~~~~~~~~~~~~~~]      |||
|      |  | | Throughput     [~~~~~~~~~~~~~~~~~~~~~~~~~~~~]      |||
|      |  | | Error Rate     [~~~~~~~~~~~~~~~~~~~~~~~~~~~~]      |||
|      |  | +---------------------------------------------------+||
|      |  +-------------------------------------------------------+|
+------+-----------------------------------------------------------+
```

#### Agent Card States

| State | Dot Color | Background | Border |
|---|---|---|---|
| **Active** | Pulsing `#10B981` | `--surface-primary` | `--border-default` |
| **Idle** | Solid `#6B7280` | `--surface-secondary` | `--border-default` |
| **Warning** | Pulsing `#F59E0B` | `#FFFBEB` (5% tint) | `#FDE68A` |
| **Error** | Pulsing `#EF4444` | `#FEF2F2` (5% tint) | `#FECACA` |
| **Stopped** | No dot | `--surface-secondary` | dashed `--border-default` |

#### Log Stream

- Monospace font (JetBrains Mono, 13px)
- Timestamp: `--neutral-400`
- Log levels color-coded: INFO (`--neutral-500`), WARN (`#F59E0B`), ERROR (`#EF4444`), DEBUG (`#6B7280`)
- Auto-scroll with pause on user scroll
- Filter bar: search text, log level checkboxes
- Maximum 500 lines in view; virtual scrolling for performance

#### Health Dashboard (Agent Monitor sub-view)

```
+---------------------------------------------------------------+
|  System Health Overview                            [Refresh]  |
+---------------------------------------------------------------+
|                                                               |
|  +--uptime card--+  +--throughput--+  +--error rate---------+ |
|  | 99.97%        |  | 1.2M        |  | 0.03%               | |
|  | Uptime (30d)  |  | tasks/day   |  | Error rate          | |
|  | [==========] ||  | [==========]|  | [==========]        | |
|  +---------------+  +-------------+  +---------------------+ |
|                                                               |
|  +--agent uptime timeline (gantt-style)---------------------+ |
|  | Agent 1  [====green====][r][========green=========]      | |
|  | Agent 2  [==================green====================]   | |
|  | Agent 3  [====green====][y][====green====][y][==green==] | |
|  | Agent 7  [====green====][=======red=======][===green===] | |
|  | ...                                                      | |
|  |          6AM   9AM   12PM   3PM   6PM   9PM   12AM      | |
|  +----------------------------------------------------------+ |
|                                                               |
+---------------------------------------------------------------+
```

---

### 6. Reports and Insights

AI-powered reporting interface that generates natural-language insights from traffic data.

#### Layout

```
+------+-----------------------------------------------------------+
| SIDE |                                                           |
| BAR  |  +--natural language query bar--------------------------+|
|      |  | [brain icon]  "What caused the congestion spike on   "||
|      |  |               "I-95 last Tuesday morning?"            ||
|      |  | [Ask SafeMove AI]                     [voice input]   ||
|      |  +-------------------------------------------------------+|
|      |                                                           |
|      |  +--AI response area------------------------------------+|
|      |  |                                                       ||
|      |  | Based on analysis of sensor data, GPS traces, and     ||
|      |  | incident reports, the congestion spike on I-95 NB     ||
|      |  | on March 18 (Tuesday) between 7:15-9:45 AM was        ||
|      |  | caused by:                                            ||
|      |  |                                                       ||
|      |  | 1. A 3-vehicle collision at mile marker 43 reported   ||
|      |  |    at 7:12 AM, blocking 2 of 4 lanes               ||
|      |  | 2. Concurrent construction at MM 38 reducing capacity ||
|      |  | 3. 12% higher than normal volume (spring break travel)||
|      |  |                                                       ||
|      |  | +--auto-generated chart----------------------------+ ||
|      |  | | [Traffic volume chart for I-95, Mar 18]          | ||
|      |  | | Highlighted: 7:15-9:45 AM anomaly window         | ||
|      |  | +--------------------------------------------------+ ||
|      |  |                                                       ||
|      |  | Recommendation: Pre-position incident response at     ||
|      |  | MM 40-45 during spring break week. Estimated...       ||
|      |  |                                                       ||
|      |  | [Copy] [Share] [Create Report] [Ask Follow-up]        ||
|      |  +-------------------------------------------------------+|
|      |                                                           |
|      |  +--report library--------------------------------------+|
|      |  |                                                       ||
|      |  |  RECENT REPORTS                                       ||
|      |  |                                                       ||
|      |  |  [doc] Weekly Traffic Summary - Mar 14-21             ||
|      |  |        Generated 2h ago  |  12 pages  |  [PDF] [CSV] ||
|      |  |                                                       ||
|      |  |  [doc] Monthly Fleet Performance - February           ||
|      |  |        Generated Mar 1   |  24 pages  |  [PDF] [CSV] ||
|      |  |                                                       ||
|      |  |  [doc] I-95 Corridor Analysis Q1 2026                ||
|      |  |        Generated Feb 28  |  18 pages  |  [PDF] [CSV] ||
|      |  |                                                       ||
|      |  |  SCHEDULED REPORTS                                    ||
|      |  |                                                       ||
|      |  |  [clock] Daily Summary       Every day at 6:00 AM    ||
|      |  |  [clock] Weekly Digest       Every Monday at 8:00 AM ||
|      |  |  [clock] Monthly Executive   1st of month at 9:00 AM ||
|      |  |                                                       ||
|      |  |  [+ Create New Report]  [Manage Schedules]            ||
|      |  +-------------------------------------------------------+|
+------+-----------------------------------------------------------+
```

#### Natural Language Query Features

- Typeahead suggestions based on available data dimensions
- Query history (last 20 queries) accessible via dropdown
- Example queries shown for new users
- Streaming response with typing indicator
- Auto-generated charts embedded inline within the AI response
- Source citations linking to raw data views
- Follow-up question suggestions at response end

#### Report Export Options

| Format | Description | Use Case |
|---|---|---|
| **PDF** | Formatted report with charts and branding | Executive presentations, stakeholder updates |
| **CSV** | Raw data tables | Data analysis in external tools |
| **API** | JSON payload via REST endpoint | Integration with other systems |
| **Email** | Formatted HTML email with embedded charts | Scheduled distribution to stakeholders |
| **Slack** | Formatted message with key metrics | Team notifications |

---

## Data Visualization Guidelines

### Color Encoding Standard

Traffic state colors are the single most critical visual encoding in the platform. They must be applied consistently across every chart, map, table, and indicator.

```typescript
// Traffic color scale (used in D3.js and Recharts)
const trafficColorScale = d3.scaleLinear<string>()
  .domain([0, 0.3, 0.5, 0.7, 0.9, 1.0])
  .range([
    '#10B981',  // Flowing (green)
    '#84CC16',  // Moderate (lime)
    '#F59E0B',  // Slow (amber)
    '#F97316',  // Congested (orange)
    '#EF4444',  // Gridlock (red)
    '#991B1B',  // Severe gridlock (dark red)
  ]);

// Supplementary encodings for accessibility
const trafficPatternScale = {
  flowing:   { pattern: 'solid',  icon: 'check-circle' },
  moderate:  { pattern: 'solid',  icon: 'minus-circle'  },
  slow:      { pattern: 'dashed', icon: 'alert-circle'  },
  congested: { pattern: 'dashed', icon: 'alert-triangle'},
  gridlock:  { pattern: 'dotted', icon: 'x-circle'      },
};
```

### Chart Library Selection

| Chart Type | Library | Rationale |
|---|---|---|
| Area, Bar, Line, Pie | **Recharts** | Declarative React API, responsive, built-in animations |
| Heatmap, Custom Viz | **D3.js** | Full control over SVG rendering, complex layouts |
| Sparklines | **D3.js** (inline SVG) | Lightweight, no wrapper overhead for table cells |
| Geo/Map layers | **Mapbox GL JS** | GPU-accelerated, real-time data handling |
| Real-time gauges | **Custom (Framer Motion)** | Smooth animated counters and progress indicators |

### Real-Time Update Strategy

| Data Type | Refresh Interval | Transition Duration | Method |
|---|---|---|---|
| Vehicle positions | 2 seconds | 2000ms (interpolated) | WebSocket |
| Traffic flow colors | 5 seconds | 500ms (paint transition) | WebSocket |
| Metric counters | 5 seconds | 500ms (spring animation) | WebSocket |
| Chart data points | 10 seconds | 300ms (slide-in) | REST polling + SSE |
| Prediction overlays | 60 seconds | 800ms (fade crossfade) | REST polling |
| Event feed | Real-time | 200ms (slide-in) | WebSocket |
| Agent status | 3 seconds | 150ms (state change) | WebSocket |

### Map Tile Configuration

```typescript
// Mapbox style configuration
const mapStyle = {
  base: 'mapbox://styles/mapbox/dark-v11',  // Dark base for control rooms

  customizations: {
    // Reduce label density for cleaner traffic overlay
    'settlement-label': { visibility: 'visible', textSize: 12 },
    'road-label': { visibility: 'visible', textSize: 10 },
    'poi-label': { visibility: 'none' },  // Hide POIs to reduce noise

    // Mute base map colors to let traffic data stand out
    'land': { fillColor: '#0A1628' },
    'water': { fillColor: '#0F172A' },
    'road-primary': { lineColor: '#1F2937', lineWidth: 1 },
    'road-secondary': { lineColor: '#1F2937', lineWidth: 0.5 },
    'building': { fillColor: '#111827', fillOpacity: 0.4 },
  },

  // Light mode variant
  lightBase: 'mapbox://styles/mapbox/light-v11',
};
```

### Tooltip Design

All data points across all visualizations must show tooltips on hover.

```
+----------------------------------+
|  I-95 Northbound                 |  <-- Title (14px, semibold)
|  Mile Marker 42                  |  <-- Subtitle (12px, --neutral-400)
|----------------------------------|
|  Speed:     42 mph               |  <-- Key-value pairs (13px)
|  Volume:    3,241 veh/hr         |      Key: --neutral-400
|  Congestion: 0.38 (Moderate)     |      Value: --text-primary
|  Updated:   14 seconds ago       |
+----------------------------------+
     ^-- pointer (8px triangle)
```

**Specs:** Background `--surface-elevated`, border 1px `--border-default`, shadow-lg, border-radius 8px, padding 12px, max-width 280px. Appears after 200ms hover delay. Follows cursor with 12px offset. Stays within viewport bounds.

---

## Empty States and Onboarding

### Empty State Design

Every view has a designed empty state that guides users toward their first action.

#### Pattern

```
+--------------------------------------------------+
|                                                  |
|              [illustration]                       |
|              (120x120px SVG)                     |
|                                                  |
|          No routes optimized yet                 |
|          (20px, semibold, --text-primary)         |
|                                                  |
|    Create your first optimized route to see      |
|    AI-powered suggestions that save time          |
|    and reduce fuel costs.                         |
|    (14px, --text-secondary, max-width: 360px)    |
|                                                  |
|          [Create First Route]                     |
|          (primary button)                         |
|                                                  |
|    Or try with sample data ->                     |
|    (13px, link style)                             |
|                                                  |
+--------------------------------------------------+
```

#### Empty States per View

| View | Illustration | Title | CTA |
|---|---|---|---|
| Command Center | City skyline with signal towers | Connect your first data source | Add Data Source |
| Analytics | Chart with magnifying glass | No data to analyze yet | Import Historical Data |
| Route Optimizer | Map with dotted path | No routes optimized yet | Create First Route |
| Simulations | Split screen with question marks | No simulations run yet | Build First Scenario |
| Agent Monitor | Robot waving | No agents configured | Deploy First Agent |
| Reports | Document with sparkles | No reports generated yet | Generate First Report |

### Guided Onboarding Tour (5 Steps)

The onboarding tour activates on first login and can be restarted from Help menu.

#### Step 1: Welcome

```
+--overlay (dimmed)-------------------------------------+
|                                                       |
|   +--spotlight on: full dashboard--+                  |
|   |                                |                  |
|   +--tooltip (bottom-center)-------+                  |
|   | Welcome to SafeMove AI                            |
|   |                                                   |
|   | Your AI-powered traffic intelligence platform.    |
|   | Let us show you around in 60 seconds.             |
|   |                                                   |
|   | [Skip Tour]                    [Start Tour ->]    |
|   +---------------------------------------------------+
|                                                       |
+-------------------------------------------------------+
```

#### Step 2: Command Center

```
Spotlight: Map area
Tooltip position: Right of map

"This is your Command Center. Monitor city-wide
traffic in real-time with live vehicle positions,
congestion overlays, and incident alerts."

[<- Back]                    [Next: Analytics ->]
Step 2 of 5  [o o o o o]
```

#### Step 3: Navigation

```
Spotlight: Sidebar
Tooltip position: Right of sidebar

"Use the sidebar to switch between views. Press
Cmd+K anytime to search commands, pages, and
data from anywhere in the platform."

[<- Back]                    [Next: AI Features ->]
Step 3 of 5  [o o o o o]
```

#### Step 4: AI Features

```
Spotlight: Reports/Query bar
Tooltip position: Below query bar

"Ask SafeMove AI anything about your traffic data.
Get natural-language insights, auto-generated
reports, and predictive recommendations."

[<- Back]                    [Next: Get Started ->]
Step 4 of 5  [o o o o o]
```

#### Step 5: Get Started

```
Spotlight: Quick actions area
Tooltip position: Above actions

"You are all set. Start by connecting a data source
or explore with our sample dataset to see
SafeMove AI in action."

[<- Back]    [Load Sample Data]    [Finish Tour]
Step 5 of 5  [o o o o o]
```

#### Onboarding Implementation

```typescript
// Onboarding step configuration
const onboardingSteps = [
  {
    id: 'welcome',
    target: 'body',
    title: 'Welcome to SafeMove AI',
    description: 'Your AI-powered traffic intelligence platform...',
    placement: 'center',
    spotlight: 'full',
  },
  {
    id: 'command-center',
    target: '[data-tour="map-container"]',
    title: 'Command Center',
    description: 'Monitor city-wide traffic in real-time...',
    placement: 'right',
    spotlight: 'element',
  },
  {
    id: 'navigation',
    target: '[data-tour="sidebar"]',
    title: 'Navigation',
    description: 'Switch between views, use Cmd+K to search...',
    placement: 'right',
    spotlight: 'element',
  },
  {
    id: 'ai-features',
    target: '[data-tour="query-bar"]',
    title: 'AI-Powered Insights',
    description: 'Ask anything about your traffic data...',
    placement: 'bottom',
    spotlight: 'element',
  },
  {
    id: 'get-started',
    target: '[data-tour="quick-actions"]',
    title: 'Get Started',
    description: 'Connect a data source or explore sample data...',
    placement: 'top',
    spotlight: 'element',
  },
];
```

### Sample Data Mode

For new users and demo environments, a pre-loaded sample dataset provides a fully functional experience.

**Sample data includes:**
- 72 hours of simulated traffic data for a medium-sized city (500 road segments)
- 150 simulated fleet vehicles with GPS traces
- 12 pre-configured AI agents
- 5 historical incidents with resolution timelines
- 3 pre-built simulation scenarios
- 1 generated weekly report

**Sample mode indicator:** A subtle banner at the top of the content area:

```
+------------------------------------------------------------------+
| [beaker icon] You are viewing sample data. Connect live sources   |
| to see your real traffic data.  [Connect Data] [Dismiss]          |
+------------------------------------------------------------------+
```

The banner uses `--info` semantic color (blue background tint), is dismissible, and persists across sessions until the user connects a real data source.

---

## Implementation Notes

### Technology Stack Mapping

| Design Element | Implementation |
|---|---|
| Layout and grid | Tailwind CSS (`grid`, `flex`, responsive prefixes) |
| Design tokens | Tailwind `theme.extend` + CSS custom properties |
| Component library | React + TypeScript functional components |
| Animations | Framer Motion (`motion.div`, `AnimatePresence`) |
| Charts (standard) | Recharts with custom theme wrapper |
| Charts (custom) | D3.js with React refs (`useRef` + `useEffect`) |
| Maps | Mapbox GL JS via `react-map-gl` wrapper |
| Icons | Lucide React (`lucide-react` package) |
| Date pickers | Custom component or `react-day-picker` |
| Command palette | Custom component inspired by `cmdk` |
| Toasts | Custom component or `sonner` |
| Tables | `@tanstack/react-table` with custom rendering |
| Forms | `react-hook-form` + `zod` validation |

### Performance Targets

| Metric | Target | Measurement |
|---|---|---|
| First Contentful Paint | < 1.2s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Time to Interactive | < 3.0s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Map initial render | < 1.5s | Custom timing |
| Chart render (100 data points) | < 200ms | Custom timing |
| Real-time update jank | 0 dropped frames | Performance observer |
| Bundle size (initial) | < 250KB gzipped | Vite build analysis |

### File Structure

```
src/
  components/
    ui/                    # Base design system components
      Button.tsx
      Card.tsx
      Badge.tsx
      Input.tsx
      Select.tsx
      Modal.tsx
      Drawer.tsx
      Toast.tsx
      Skeleton.tsx
      Table.tsx
      Tooltip.tsx
      CommandPalette.tsx
    layout/                # Layout components
      Sidebar.tsx
      Header.tsx
      RightPanel.tsx
      PageLayout.tsx
    charts/                # Chart wrapper components
      AreaChart.tsx
      BarChart.tsx
      Heatmap.tsx
      RealtimeLine.tsx
      Sparkline.tsx
    map/                   # Map components
      MapContainer.tsx
      TrafficLayer.tsx
      RouteOverlay.tsx
      VehicleMarkers.tsx
      IncidentMarkers.tsx
      MapControls.tsx
      MapLegend.tsx
  views/                   # Dashboard views
    CommandCenter.tsx
    Analytics.tsx
    RouteOptimizer.tsx
    SimulationWorkspace.tsx
    AgentMonitor.tsx
    Reports.tsx
  hooks/                   # Custom React hooks
    useRealtimeData.ts
    useMapViewport.ts
    useOnboarding.ts
    useCommandPalette.ts
  styles/
    tokens.css             # CSS custom properties
    tailwind.config.ts     # Tailwind theme extension
```

---

*This dashboard design document specifies every view, component arrangement, data flow, and interaction pattern required to implement the SafeMove AI frontend. It should be read alongside Document 15 (UI/UX Design System) which defines the foundational tokens, component specifications, and accessibility standards that govern all visual decisions described here.*
