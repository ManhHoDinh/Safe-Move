# FloodRoute AI -- UI/UX Design System

> A premium, production-grade design system for flood-traffic intelligence.
> Stack: Vite.js + React 18 + TypeScript + TailwindCSS v4.
> Aesthetic lineage: Stripe (clarity), Palantir (density), Vercel (polish), Mapbox (cartography).

---

## 1. Design Philosophy

Four principles govern every design decision in FloodRoute AI. They are not aspirational -- they are constraints.

### 1.1 Cartographic Clarity

Maps are the primary interface. The map is not a feature; it is the canvas on which every other feature exists. Every pixel that is not serving the map's clarity is a pixel that should not be there. Overlays are purposeful. Controls are minimal. The user's eye should spend 70% of its time on the map and 30% on supporting panels.

### 1.2 Urgency Without Panic

Flood intelligence is life-safety information. The system must communicate danger clearly without triggering panic or cognitive overload. Color conveys severity through a deliberate, tested scale -- not through arbitrary red-everything alarmism. Motion indicates change, not decoration. A pulsing flood zone means "this is active and evolving." A static zone means "this is known and stable." The difference matters.

### 1.3 Intelligence Made Visible

FloodRoute AI's value is its intelligence layer. Users must see the AI working. Prediction confidence scores are not hidden in tooltips -- they are first-class UI elements. Agent activity is surfaced in status feeds. LLM reasoning is available on demand. The system earns trust by showing its work, not by hiding behind a clean facade.

### 1.4 Operator-Grade Density

Professional users -- traffic operators, fleet managers, city planners -- need dense information. They do not need whitespace for its own sake. The default view is information-rich. Progressive disclosure exists for new users and secondary details, but the primary interface respects the operator's expertise and need for simultaneous data visibility.

---

## 2. Color System

### 2.1 Primary Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Abyss | `#0A0E1A` | 10, 14, 26 | Primary background. Dark mode default. The canvas everything sits on. |
| Deep Navy | `#111827` | 17, 24, 39 | Card backgrounds, side panels, modal overlays. One step lighter than Abyss. |
| Slate | `#1E293B` | 30, 41, 59 | Borders, dividers, secondary surfaces, inactive tab backgrounds. |
| Storm Blue | `#2563EB` | 37, 99, 235 | Primary action color. Buttons, links, active states, focus rings, selected tabs. |
| Flood Cyan | `#06B6D4` | 6, 182, 212 | Water and flood data indicators. Data highlights and accent on charts. |

#### TailwindCSS Configuration

```typescript
// tailwind.config.ts (partial)
const colors = {
  abyss: '#0A0E1A',
  'deep-navy': '#111827',
  slate: '#1E293B',
  'storm-blue': '#2563EB',
  'flood-cyan': '#06B6D4',
}
```

### 2.2 Alert / Severity Palette

| Name | Hex | RGB | Usage | Severity Level |
|------|-----|-----|-------|----------------|
| Safe Green | `#10B981` | 16, 185, 129 | Clear roads, safe routes, successful operations, Level 0-1 | None / Minimal |
| Caution Amber | `#F59E0B` | 245, 158, 11 | Moderate flood risk, warnings, Level 2-3 | Moderate |
| Danger Red | `#EF4444` | 239, 68, 68 | Severe flooding, critical alerts, Level 4 | Severe |
| Critical Magenta | `#EC4899` | 236, 72, 153 | Emergency state, system failures, Level 5 | Critical / Emergency |

**Usage rule:** Severity colors are never used for decoration. If something is red, it means danger. If something is green, it means safe. No exceptions.

### 2.3 Flood Depth Color Scale

For map polygon overlays and depth indicators. Linear gradient between steps for smooth visual encoding.

| Depth Range | Color Name | Hex | Opacity on Map |
|-------------|-----------|-----|----------------|
| 0 -- 10cm | Light Blue | `#7DD3FC` | 40% |
| 10 -- 30cm | Medium Blue | `#38BDF8` | 50% |
| 30 -- 50cm | Deep Blue | `#0284C7` | 60% |
| 50 -- 100cm | Dark Blue | `#1E3A5F` | 70% |
| 100cm+ | Purple to Red | `#7C3AED` to `#DC2626` gradient | 80% |

**Implementation note:** Use a continuous color interpolation function mapped to depth value, not discrete steps. The table above defines anchor points. Between anchors, interpolate linearly in LAB color space for perceptual uniformity.

```typescript
// Flood depth color utility
export function getFloodDepthColor(depthCm: number): string {
  const stops = [
    { depth: 0, color: '#7DD3FC' },
    { depth: 10, color: '#38BDF8' },
    { depth: 30, color: '#0284C7' },
    { depth: 50, color: '#1E3A5F' },
    { depth: 100, color: '#7C3AED' },
    { depth: 150, color: '#DC2626' },
  ];
  // Interpolate between stops using LAB color space
  return interpolateLAB(stops, depthCm);
}
```

### 2.4 Neutral Scale

| Step | Hex | Usage |
|------|-----|-------|
| 50 | `#F8FAFC` | Light mode backgrounds, light card surfaces |
| 100 | `#F1F5F9` | Hover states in light mode, subtle backgrounds |
| 200 | `#E2E8F0` | Borders and dividers in light mode |
| 300 | `#CBD5E1` | Disabled text, inactive icons |
| 400 | `#94A3B8` | Placeholder text, tertiary information |
| 500 | `#64748B` | Secondary text in dark mode, labels |
| 600 | `#475569` | Body text in light mode |
| 700 | `#334155` | Emphasized text in dark mode panels |
| 800 | `#1E293B` | Card backgrounds in dark mode (alias: Slate) |
| 900 | `#0F172A` | Deep background surfaces |
| 950 | `#020617` | True black surfaces, overlays at high opacity |

### 2.5 Semantic Colors

Each semantic color has a foreground (text/icon), background (subtle fill), and border variant.

| Semantic | Foreground | Background (10% opacity) | Border (20% opacity) |
|----------|-----------|--------------------------|----------------------|
| Success | `#10B981` | `rgba(16, 185, 129, 0.10)` | `rgba(16, 185, 129, 0.20)` |
| Warning | `#F59E0B` | `rgba(245, 158, 11, 0.10)` | `rgba(245, 158, 11, 0.20)` |
| Error | `#EF4444` | `rgba(239, 68, 68, 0.10)` | `rgba(239, 68, 68, 0.20)` |
| Info | `#06B6D4` | `rgba(6, 182, 212, 0.10)` | `rgba(6, 182, 212, 0.20)` |

---

## 3. Typography

### 3.1 Font Families

| Role | Family | Fallback Stack | Source |
|------|--------|---------------|--------|
| Primary | Inter | `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | Google Fonts / self-hosted WOFF2 |
| Monospace | JetBrains Mono | `'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace` | Google Fonts / self-hosted WOFF2 |
| Map Labels | Inter Medium | Same as Primary | Embedded in Mapbox style |

**Loading strategy:** Self-host both fonts as WOFF2. Preload the Regular (400) and Semi-Bold (600) weights of Inter. Load JetBrains Mono asynchronously since it is only used for data values. Use `font-display: swap` to prevent invisible text during load.

```html
<link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Inter-SemiBold.woff2" as="font" type="font/woff2" crossorigin>
```

### 3.2 Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `display` | 48px / 3rem | 700 (Bold) | 1.1 | -0.02em | Hero headlines on landing page |
| `h1` | 36px / 2.25rem | 700 (Bold) | 1.2 | -0.015em | Page titles, dashboard headers |
| `h2` | 28px / 1.75rem | 600 (Semi-Bold) | 1.3 | -0.01em | Section headers |
| `h3` | 22px / 1.375rem | 600 (Semi-Bold) | 1.4 | -0.005em | Card titles, panel headers |
| `h4` | 18px / 1.125rem | 600 (Semi-Bold) | 1.5 | 0 | Subsection titles, list headers |
| `body-lg` | 18px / 1.125rem | 400 (Regular) | 1.6 | 0 | Landing page body text |
| `body` | 15px / 0.9375rem | 400 (Regular) | 1.6 | 0 | Dashboard body text, descriptions |
| `body-sm` | 13px / 0.8125rem | 400 (Regular) | 1.5 | 0 | Secondary information, metadata |
| `caption` | 11px / 0.6875rem | 500 (Medium) | 1.4 | 0.02em | Labels, badges, timestamps |
| `mono-data` | 14px / 0.875rem | 500 (Medium) | 1.4 | 0.01em | Metric values, coordinates, IDs |

#### TailwindCSS Implementation

```typescript
// tailwind.config.ts (partial)
const fontSize = {
  'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
  'h1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
  'h2': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
  'h3': ['1.375rem', { lineHeight: '1.4', letterSpacing: '-0.005em', fontWeight: '600' }],
  'h4': ['1.125rem', { lineHeight: '1.5', fontWeight: '600' }],
  'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
  'body': ['0.9375rem', { lineHeight: '1.6', fontWeight: '400' }],
  'body-sm': ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
  'caption': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
  'mono-data': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],
}
```

---

## 4. Layout System

### 4.1 Spacing

**Base unit:** 4px. All spacing values are multiples of 4px, following an 8px rhythm for primary layout spacing.

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight padding, icon-to-text gap |
| `space-2` | 8px | Default inline spacing, badge padding |
| `space-3` | 12px | Compact card padding, form field gaps |
| `space-4` | 16px | Default card padding, section inner gap |
| `space-5` | 20px | Medium spacing between related elements |
| `space-6` | 24px | Panel padding, card content spacing |
| `space-8` | 32px | Section spacing within a page |
| `space-10` | 40px | Major section gaps |
| `space-12` | 48px | Landing page section inner padding |
| `space-16` | 64px | Landing page section vertical spacing |
| `space-20` | 80px | Large section separators |
| `space-24` | 96px | Hero section vertical padding |
| `space-32` | 128px | Maximum section separation |

### 4.2 Grid System

**Columns:** 12-column grid.
**Gutter:** 24px (desktop), 16px (tablet), 12px (mobile).

| Context | Configuration |
|---------|--------------|
| Landing Page | Max-width 1280px, centered with auto margins, 24px horizontal padding |
| Dashboard | Full viewport width. Sidebar: 256px fixed. Content: fluid. Detail Panel: 400px collapsible. |
| Modal / Dialog | Max-width 640px (standard), 800px (wide), 480px (narrow). Centered vertically and horizontally. |

### 4.3 Breakpoints

| Name | Width | Target |
|------|-------|--------|
| `sm` | 640px | Large phones, small tablets |
| `md` | 768px | Tablets portrait |
| `lg` | 1024px | Tablets landscape, small laptops |
| `xl` | 1280px | Standard desktops (primary design target) |
| `2xl` | 1536px | Large desktops, ultra-wide considerations |

### 4.4 Dashboard Layout Structure

```
+------------------+--------------------------------------------+------------------+
|                  |                                            |                  |
|    Sidebar       |              Main Content                  |   Detail Panel   |
|    256px         |              (fluid)                       |   400px          |
|    fixed         |                                            |   collapsible    |
|                  |    +------------------------------------+  |                  |
|  - Navigation    |    |                                    |  |  - Flood point   |
|  - Layer toggles |    |            Map View                |  |    details       |
|  - Filter panel  |    |            (primary)               |  |  - Route info    |
|  - Agent status  |    |                                    |  |  - Severity      |
|                  |    +------------------------------------+  |    assessment    |
|                  |    |  Bottom Bar: Metrics / Timeline    |  |  - Agent logs    |
|                  |    +------------------------------------+  |                  |
+------------------+--------------------------------------------+------------------+
```

---

## 5. Component System

### 5.1 Buttons

#### Variants

| Variant | Background | Text | Border | Hover | Active |
|---------|-----------|------|--------|-------|--------|
| Primary | `#2563EB` (Storm Blue) | `#FFFFFF` | none | `brightness(1.1)` | `brightness(0.95)` + `scale(0.98)` |
| Secondary | `transparent` | `#FFFFFF` | `1px solid #1E293B` | `bg rgba(30,41,59,0.2)` | `bg rgba(30,41,59,0.3)` + `scale(0.98)` |
| Ghost | `transparent` | `#94A3B8` | none | `text #FFFFFF` + underline | `text #FFFFFF` |
| Danger | `#EF4444` (Danger Red) | `#FFFFFF` | none | `brightness(1.1)` | `brightness(0.95)` + `scale(0.98)` |
| Success | `#10B981` (Safe Green) | `#FFFFFF` | none | `brightness(1.1)` | `brightness(0.95)` + `scale(0.98)` |

#### Sizes

| Size | Height | Padding X | Font Size | Icon Size | Border Radius |
|------|--------|-----------|-----------|-----------|---------------|
| `sm` | 32px | 12px | 13px | 16px | 6px |
| `md` | 40px | 16px | 14px | 18px | 8px |
| `lg` | 48px | 20px | 15px | 20px | 8px |
| `xl` | 56px | 28px | 16px | 22px | 10px |

#### Properties (All Sizes)

- `font-weight`: 500
- `letter-spacing`: -0.01em
- `transition`: all 150ms ease
- `cursor`: pointer
- `focus-visible`: 2px offset ring in Storm Blue
- `disabled`: opacity 0.5, cursor not-allowed, no hover effect

#### React Component Interface

```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
```

### 5.2 Cards

#### Flood Alert Card

Purpose: Display a single detected flood point with its severity and metadata.

```
+--+-----------------------------------------------------------+
|  |  [!] Nguyen Hue Street, District 1          3 min ago     |
|  |  Severity: Level 3/5    Depth: 35cm    Confidence: 94%    |
|  |  Sources: Camera feed, Weather API, Social media           |
+--+-----------------------------------------------------------+
 ^
 Left border: 4px, colored by severity
   Level 1: Safe Green
   Level 2: Caution Amber
   Level 3: Caution Amber
   Level 4: Danger Red
   Level 5: Critical Magenta
```

**Specifications:**
- Background: Deep Navy (`#111827`)
- Border radius: 8px
- Padding: 16px
- Left border: 4px solid, severity-colored
- Shadow: `0 1px 3px rgba(0,0,0,0.3)`
- Icon: 20px, severity-colored
- Location text: `body` size, white
- Timestamp: `caption` size, Neutral-400
- Metrics row: `mono-data` size, severity-colored values
- Sources row: `body-sm` size, Neutral-500

#### Metric Card

Purpose: Display a single KPI with trend and sparkline.

```
+-----------------------------------------------+
|  Active Flood Points          [sparkline~~~~]  |
|  47                           +12 (34%) ^      |
|  Updated 2 min ago                             |
+-----------------------------------------------+
```

**Specifications:**
- Background: Deep Navy (`#111827`)
- Border radius: 8px
- Padding: 20px
- Label: `body-sm`, Neutral-400
- Value: `mono-data` at 36px size, white, font-weight 700
- Trend: `caption`, green for positive (if metric should increase) or red
- Trend arrow: Lucide `trending-up` or `trending-down`, 16px
- Sparkline: 80px wide, 24px tall, stroke 1.5px, Flood Cyan
- Updated timestamp: `caption`, Neutral-500

#### Route Card

Purpose: Display a route summary with flood risk assessment.

```
+-----------------------------------------------+
|  [mini map preview]                            |
|  Tan Son Nhat Airport -> District 7 Hub        |
|  ETA: 45 min (normal: 28 min)                 |
|  [MODERATE RISK]  2 flood zones on route       |
+-----------------------------------------------+
```

**Specifications:**
- Background: Deep Navy (`#111827`)
- Border radius: 8px
- Mini map: 100% width, 120px height, rounded-t-lg, Mapbox static image
- Padding (content): 16px
- Route text: `body`, white, with arrow icon between origin and destination
- ETA: `mono-data`, white. Normal time in Neutral-500 parenthetical.
- Risk badge: Rounded-full, `caption` size, severity-colored background at 15% with full-color text
- Flood zone count: `body-sm`, Neutral-400

#### Report Card

Purpose: Display an available report for download or viewing.

```
+-----------------------------------------------+
|  [PDF]  District 7 Flood Impact Assessment     |
|  Generated: Mar 21, 2026 14:30                 |
|  "8 corridors affected, est. 23,000 vehicles   |
|   impacted over 4-hour window..."              |
|                                    [download]  |
+-----------------------------------------------+
```

**Specifications:**
- Background: Deep Navy (`#111827`)
- Border radius: 8px
- Padding: 16px
- Type badge: `caption`, rounded, Info semantic color background
- Title: `h4` size, white
- Date: `body-sm`, Neutral-400
- Preview: `body-sm`, Neutral-300, max 2 lines with ellipsis overflow
- Download icon: Lucide `download`, 20px, Storm Blue, hover: brightness +10%

### 5.3 Map Components

#### Base Map

- Style: Mapbox `navigation-night-v1` or custom dark style derived from it
- Default zoom: City-level (zoom 12-13)
- Controls: Zoom (+/-) bottom-right, compass top-right, fullscreen toggle
- Attribution: Mapbox attribution, bottom-left, Neutral-500 at `caption` size

#### Flood Overlay

- Geometry: GeoJSON polygons representing flood extent
- Fill: Depth-based color scale (see Section 2.3), base opacity 60%
- Stroke: 1px, same color at 80% opacity
- Active flooding animation: CSS keyframe pulse -- opacity oscillates between 40% and 70% over 2s, infinite loop
- Transition: New flood zones fade in over 500ms

```css
@keyframes flood-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
}

.flood-zone-active {
  animation: flood-pulse 2s ease-in-out infinite;
}

.flood-zone-stable {
  opacity: 0.6;
  transition: opacity 500ms ease;
}
```

#### Route Lines

- Width: 4px (primary route), 2px (alternatives)
- Safe route: Safe Green (`#10B981`), solid
- Warning segment: Gradient transition from green to amber where route approaches flood zone
- Blocked segment: Danger Red, dashed (6px dash, 4px gap)
- Recalculating animation: Animated dash pattern -- `stroke-dashoffset` scrolling, Flood Cyan, 300ms loop

```css
@keyframes route-recalculate {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}

.route-recalculating {
  stroke: #06B6D4;
  stroke-dasharray: 8 6;
  animation: route-recalculate 300ms linear infinite;
}
```

#### Map Markers

| Marker Type | Icon | Size | Color | Interaction |
|-------------|------|------|-------|-------------|
| Flood point | Water droplet (custom SVG) | 28px | Severity-colored | Click: opens detail panel. Hover: shows severity tooltip. |
| Camera | Eye (Lucide `eye`) | 22px | Flood Cyan | Click: shows camera feed. Hover: shows camera name + status. |
| Incident | Warning triangle (Lucide `alert-triangle`) | 24px | Caution Amber | Click: opens incident detail. Hover: shows incident type. |
| Vehicle (fleet) | Truck (Lucide `truck`) | 20px | White | Click: shows vehicle info. Hover: shows ETA + route. |
| User report | Message circle (Lucide `message-circle`) | 20px | Neutral-400 | Click: shows user report text. Hover: shows timestamp. |

**Marker specifications:**
- All markers have a subtle drop shadow: `0 2px 4px rgba(0,0,0,0.4)`
- Active/selected markers scale to 1.2x with 200ms spring transition
- Clustered markers show count badge (Storm Blue circle, white text, `caption` size)

#### Heatmap Layer

For flood prediction probability visualization.

- Color ramp: Transparent (0%) through `#7DD3FC` (25%) through `#F59E0B` (50%) through `#EF4444` (75%) to `#EC4899` (100%)
- Radius: 20px at zoom 12, scales with zoom
- Opacity: 50% base, adjustable via layer control
- Blur: 15px for smooth visual

#### Rain Particle Overlay

Active during real-time weather events. Purely atmospheric, not data-carrying.

- Particle count: 200 (adjustable by performance)
- Particle: 1px wide, 8-15px tall, white at 20% opacity
- Direction: 15-degree angle (simulating wind)
- Speed: 600-900px/s, randomized per particle
- Implementation: Canvas overlay, requestAnimationFrame loop
- Disabled when `prefers-reduced-motion: reduce`

### 5.4 Data Visualization

#### Chart Library

- Standard charts: Recharts (bar, line, area, pie)
- Custom/map-integrated: D3.js
- Real-time: Recharts with 300ms smooth transitions via `animationDuration={300}`

#### Chart Style Guide

| Property | Value |
|----------|-------|
| Background | Transparent (inherits card background) |
| Grid lines | None. Use subtle horizontal reference lines at 20% opacity if needed. |
| Axis labels | `caption` size, Neutral-500, no axis line |
| Tick marks | None |
| Tooltip | Dark card (`#111827`), rounded-lg, 8px padding, `body-sm` for labels, `mono-data` for values, thin border `#1E293B` |
| Legend | Below chart, horizontal, dots (not squares), `body-sm`, Neutral-400 labels |
| Line charts | 2px stroke, no dots except on hover |
| Area charts | Line + fill at 10% opacity |
| Bar charts | Rounded-top corners (4px radius), 4px gap between bars |

#### Color Encoding Rule

Charts **always** use the severity palette consistently:
- Green data = safe / positive
- Amber data = warning / moderate
- Red data = danger / critical
- Cyan data = neutral data / info
- Storm Blue data = system/AI metrics

### 5.5 Status Indicators

#### Live Pulse Dot

A small animated circle indicating system or data source status.

| State | Color | Animation |
|-------|-------|-----------|
| Live / Healthy | Safe Green | Pulse ring expanding + fading, 2s loop |
| Degraded | Caution Amber | Slow pulse, 3s loop |
| Down / Error | Danger Red | Fast pulse, 1s loop |
| Unknown | Neutral-400 | No animation, static |

```css
@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
}

.status-dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  animation: pulse-ring 2s ease-out infinite;
  background: inherit;
}
```

#### Severity Badges

Inline badges for flood severity levels.

| Level | Text | Background | Text Color |
|-------|------|-----------|-----------|
| Level 1 | MINIMAL | `rgba(16,185,129,0.15)` | `#10B981` |
| Level 2 | MODERATE | `rgba(245,158,11,0.15)` | `#F59E0B` |
| Level 3 | SIGNIFICANT | `rgba(245,158,11,0.15)` | `#F59E0B` |
| Level 4 | SEVERE | `rgba(239,68,68,0.15)` | `#EF4444` |
| Level 5 | CRITICAL | `rgba(236,72,153,0.15)` | `#EC4899` |

Specifications: `caption` size, rounded-full, padding 4px 10px, font-weight 600, uppercase.

#### Confidence Meter

A thin horizontal bar showing AI confidence in a severity assessment.

- Width: 100% of container (or fixed, e.g. 120px)
- Height: 4px
- Background: Neutral-800
- Fill: Gradient from Caution Amber (low confidence) to Safe Green (high confidence)
- Threshold markers: 60% and 80% as subtle tick marks
- Label: `mono-data` size, positioned right-aligned above the bar, showing percentage

#### Agent Status Row

Displays the operational state of an autonomous agent.

```
[bot-icon] Agent-Weather    [green dot] Active    Last run: 12s ago    847 items processed
```

- Icon: Lucide `bot`, 16px, Neutral-400
- Name: `body-sm`, white, font-weight 500
- Status dot: 8px, color per state (see Live Pulse Dot)
- Status text: `body-sm`, status-colored
- Last run: `caption`, Neutral-500
- Processed count: `mono-data`, Neutral-300

---

## 6. Visual Style

### 6.1 Landing Page Specific

#### Hero Section

- Background: Full-bleed Abyss (`#0A0E1A`)
- Map visualization: Positioned absolute behind hero content, 40% opacity, slight blur (2px)
- Content: Centered, max-width 800px
- Headline: `display` size, white, text-shadow `0 2px 20px rgba(0,0,0,0.5)`
- Subheadline: `body-lg`, Neutral-300
- CTA group: Centered, 16px gap between buttons
- Bottom gradient: Linear gradient from transparent to Abyss, 200px tall, positioned at bottom of hero

#### Section Rhythm

Sections alternate between two visual treatments:
1. **Full-bleed dark:** Abyss background, content centered at max-width 1280px
2. **Card section:** Slightly lighter (`#0D1117`), content in cards with glassmorphism

Section transitions use a subtle gradient divider line:
```css
.section-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #2563EB 30%,
    #06B6D4 50%,
    #2563EB 70%,
    transparent 100%
  );
  opacity: 0.4;
}
```

#### Glassmorphism Feature Cards

Used for capability pillars and feature highlights.

```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 12px;
  padding: 32px;
  transition: all 300ms ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

#### Floating Card Shadow

Standard elevated card shadow for landing page elements:
```css
.floating-card {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}
```

### 6.2 Map Visualizations (Landing Page)

#### Animated Flood Zones

Flood zones on the landing page demo use the same pulse animation as the dashboard but with enhanced visual impact for marketing purposes:
- Larger pulse radius (2x dashboard)
- Slightly higher opacity range (50%-80%)
- Optional glow effect: `filter: drop-shadow(0 0 8px [severity-color])`

#### Route Animation

SVG path animation for the "rerouting" visual effect:
```css
@keyframes route-draw {
  from { stroke-dashoffset: 1000; }
  to { stroke-dashoffset: 0; }
}

.route-animate {
  stroke-dasharray: 1000;
  animation: route-draw 2s ease-in-out forwards;
}
```

#### Data Point Glow

Active markers on the landing page have a soft glow:
```css
.marker-glow {
  filter: drop-shadow(0 0 6px currentColor);
  transition: filter 300ms ease;
}
```

#### Parallax Layers

Map background elements move at different speeds on scroll for depth:
- Background map: 0.3x scroll speed
- Flood zones: 0.5x scroll speed
- Route lines: 0.7x scroll speed
- UI elements (badges, metrics): 1.0x (normal scroll)

Implementation: CSS `transform: translateY()` driven by scroll position via `IntersectionObserver` or Framer Motion `useScroll`. Must respect `prefers-reduced-motion`.

### 6.3 Iconography

#### Library

Primary: **Lucide React** (`lucide-react`)
- Style: Outlined, 1.5px stroke weight (default)
- Consistent across all components

#### Size Scale

| Context | Size | Stroke |
|---------|------|--------|
| Inline (with text) | 16px | 1.5px |
| Button icon | 18-20px | 1.5px |
| Card icon | 24px | 1.5px |
| Feature section | 32px | 2px |
| Hero / large display | 48px | 2px |

#### Custom Icons Needed

The following icons are not available in Lucide and require custom SVG design:

1. **Flood Depth** -- A simplified cross-section showing water level against a depth gauge. Used in flood detail panels.
2. **Water Level** -- An animated wave line with a horizontal marker. Used in metric cards.
3. **Route Deviation** -- A path that splits from a straight line, curves around an obstacle, and returns. Used in routing UI.
4. **Severity Gauge** -- A semicircular gauge with color segments from green to red with a needle. Used in severity assessment panels.

Custom icons must match Lucide's visual style: 24px viewBox, 1.5px stroke, rounded line caps, no fill by default.

---

## 7. Interaction Design

### 7.1 Page Transitions

- Type: Fade + slide-up
- Duration: 400ms
- Easing: `ease-out` (CSS) or `easeOut` (Framer Motion)
- Implementation: Framer Motion `AnimatePresence` with `motion.div`

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
  {children}
</motion.div>
```

### 7.2 Scroll Animations (Landing Page)

Elements fade-in-up as they enter the viewport.

- Trigger: When element is 20% visible in viewport
- Animation: `opacity: 0, y: 30` to `opacity: 1, y: 0`
- Duration: 500ms
- Easing: Spring with `stiffness: 100, damping: 20`
- Stagger: 100ms between sibling elements (e.g., cards in a row)

```tsx
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};
```

### 7.3 Map Interactions

| Action | Behavior |
|--------|----------|
| Scroll zoom | Smooth zoom with momentum. Requires Ctrl/Cmd key on landing page to prevent accidental zoom. |
| Click flood point | Detail panel slides in from right (400px, 300ms ease-out). Map pans to center the point. |
| Hover flood zone | Polygon brightness increases to 80%. Tooltip appears with severity, depth, last updated. |
| Hover route | Route line width increases to 6px. Tooltip shows ETA, distance, flood zones on route. |
| Click route | Route detail card expands in side panel. Alternative routes shown at 50% opacity. |
| Drag map | Standard pan. Cursor changes to grab/grabbing. |
| Double-click | Zoom in one level, centered on click point. |

### 7.4 Hover States

Every interactive element must have a visible hover state. No exceptions.

| Element | Hover Effect |
|---------|-------------|
| Buttons | Per variant (see Section 5.1) |
| Cards | `translateY(-2px)` + increased shadow + subtle border brightness |
| Links | Underline appears (text-decoration with underline-offset 4px) |
| Table rows | Background lightens to Slate at 20% opacity |
| Icons (actionable) | Color shifts to Storm Blue or brightness +20% |
| Map markers | Scale to 1.15x with 150ms transition |

### 7.5 Loading States

#### Skeleton Screens

Used for all content loading. No spinners in the main UI.

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #1E293B 25%,
    #334155 50%,
    #1E293B 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}
```

Skeleton shapes match the content they replace: rectangles for text lines, circles for avatars, rounded rectangles for badges.

#### Map Loading

- Initial load: Skeleton map with shimmer, overlaid with FloodRoute logo at center
- Tile loading: Tiles fade in individually as they load (Mapbox default behavior, enhanced with 200ms opacity transition)
- Data overlay loading: Thin progress bar at top of map container, Storm Blue, animated

### 7.6 Real-Time Data Updates

#### Metric Counter Animation

When a metric value changes, animate the transition using Framer Motion spring:

```tsx
<motion.span
  key={value}
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  className="font-mono text-4xl font-bold text-white"
>
  {value}
</motion.span>
```

#### Live Data Feed

New items in feeds (alerts, agent logs) slide in from top with a brief highlight:

```tsx
<motion.div
  initial={{ opacity: 0, height: 0, backgroundColor: 'rgba(6,182,212,0.1)' }}
  animate={{ opacity: 1, height: 'auto', backgroundColor: 'transparent' }}
  transition={{ duration: 0.3 }}
>
  {alertContent}
</motion.div>
```

### 7.7 Micro-Interactions

| Interaction | Animation |
|-------------|-----------|
| Button press | `scale(0.98)` for 100ms, then return. `transition: transform 100ms ease` |
| Toggle switch | Thumb slides with spring physics. Track color transitions 200ms. |
| Checkbox | Check mark draws in as SVG stroke animation, 200ms. Background fills simultaneously. |
| Dropdown open | `opacity: 0, y: -8` to `opacity: 1, y: 0`, 200ms ease-out. |
| Tab switch | Underline indicator slides to new tab position, 250ms spring. |
| Notification badge | Appears with `scale(0) -> scale(1.1) -> scale(1)` bounce, 300ms. |
| Tooltip show | `opacity: 0, y: 4` to `opacity: 1, y: 0`, 150ms. 200ms delay before showing. |

---

## 8. Responsive Strategy

### 8.1 Approach

**Desktop-first design** with 1280px as the primary design target. The platform is fundamentally a professional tool. Mobile views are simplified but functional.

### 8.2 Breakpoint Behavior

#### Desktop (1280px+)

- Full dashboard layout: sidebar + map + detail panel
- Landing page: Multi-column feature grids, full-width map demo
- All animations and parallax active
- Dense data tables and charts at full fidelity

#### Tablet (768px -- 1023px)

- Dashboard: Sidebar collapses to icon-only (64px). Detail panel becomes overlay sheet.
- Landing page: Feature cards stack to 2-column grid. Map demo remains full-width.
- How It Works: Horizontal flow becomes 2x2 grid
- Charts: Maintain full width, reduce legend detail

#### Mobile (640px -- 767px)

- Dashboard: No sidebar -- bottom tab navigation. Map is full-screen primary view. Detail panel becomes bottom sheet (drag up to expand).
- Landing page: Single column. All cards stacked. Map demo simplified (static image with overlays, or reduced interactivity).
- Typography: `display` reduces to 36px, `h1` to 28px, `h2` to 22px
- Buttons: Full-width CTAs on mobile
- Tables: Horizontal scroll or collapse into card views

#### Small Mobile (< 640px)

- Same as mobile but with tighter spacing (reduce all `space-*` by one step)
- Remove parallax effects entirely
- Simplify map to essential overlays only

### 8.3 Map Priority Rule

The map is **never hidden** at any breakpoint. It is the core interface. On mobile, the map occupies the full viewport and all other UI overlays on top of it via sheets and overlays. If screen real estate forces a choice between showing a panel and showing the map, the map wins.

---

## 9. Accessibility

### 9.1 Standards

**Minimum compliance: WCAG 2.1 Level AA.** Target Level AAA where feasible without compromising information density.

### 9.2 Color Contrast

All text must meet the following contrast ratios against its background:

| Text Type | Minimum Ratio | Our Target |
|-----------|--------------|------------|
| Normal text (< 18px) | 4.5:1 | 5:1+ |
| Large text (>= 18px bold or >= 24px) | 3:1 | 4:1+ |
| UI components and graphical objects | 3:1 | 3.5:1+ |

**Verified combinations:**
- White (`#FFFFFF`) on Abyss (`#0A0E1A`): 18.4:1 -- passes
- White on Storm Blue (`#2563EB`): 4.6:1 -- passes (normal text)
- Neutral-400 (`#94A3B8`) on Deep Navy (`#111827`): 5.1:1 -- passes
- Neutral-500 (`#64748B`) on Deep Navy (`#111827`): 3.6:1 -- passes large text only
- Danger Red (`#EF4444`) on Deep Navy (`#111827`): 4.1:1 -- passes large text; use with bold weight for smaller sizes
- Safe Green (`#10B981`) on Deep Navy (`#111827`): 5.3:1 -- passes

**Severity colors on dark backgrounds:** All severity colors have been selected to meet 3:1 minimum against Deep Navy for UI components. For text use, pair with increased font weight (500+) or use the color only for large text.

### 9.3 Focus Management

- **Focus ring:** 2px solid Storm Blue (`#2563EB`), 2px offset from element. Visible on all interactive elements.
- **Focus order:** Follows logical reading order. Sidebar > Main content > Detail panel.
- **Skip links:** "Skip to main content" and "Skip to map" links, visible on focus.
- **Focus trap:** Active in modals and overlays. Escape key closes.
- **Return focus:** When a panel or modal closes, focus returns to the element that triggered it.

```css
*:focus-visible {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
}

/* Remove default outline for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}
```

### 9.4 Reduced Motion

All animations respect the `prefers-reduced-motion: reduce` media query.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Specific behaviors when reduced motion is active:
- Parallax effects: Disabled. Elements positioned statically.
- Flood zone pulse: Static opacity (60%), no animation.
- Route recalculation animation: Instant transition, no dash animation.
- Page transitions: Instant opacity change, no slide.
- Scroll animations: Elements visible immediately, no fade-in.
- Rain particle overlay: Disabled entirely.
- Counter animations: Values update instantly, no spring.

### 9.5 Screen Reader Support

#### ARIA Live Regions

Real-time alerts must be announced to screen readers:

```tsx
{/* For new flood alerts */}
<div role="alert" aria-live="assertive" aria-atomic="true">
  {latestCriticalAlert}
</div>

{/* For metric updates */}
<div aria-live="polite" aria-atomic="true">
  Active flood points: {count}
</div>

{/* For route recalculation */}
<div role="status" aria-live="polite">
  Route recalculated. New estimated time: {eta}. {floodZonesAvoided} flood zones avoided.
</div>
```

#### Semantic Landmarks

```html
<header role="banner">          <!-- Top navigation -->
<nav role="navigation">         <!-- Sidebar navigation -->
<main role="main">              <!-- Map + content area -->
<aside role="complementary">    <!-- Detail panel -->
<footer role="contentinfo">     <!-- Footer -->
```

#### Map Accessibility

The map is inherently visual. Provide equivalent information through:
- A data table alternative view (toggle: "View as table") listing all flood points with sortable columns
- Text summary of current map state: "Currently showing 47 flood points across 12 districts. 3 routes are affected."
- Keyboard navigation between map markers using arrow keys when map is focused
- Announcements for map state changes via aria-live

### 9.6 Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next interactive element |
| `Shift+Tab` | Move focus to previous interactive element |
| `Enter` / `Space` | Activate focused element |
| `Escape` | Close modal/panel, deselect map element |
| `Arrow keys` | Navigate within map markers, menu items, tabs |
| `/` | Focus search input (if present) |
| `?` | Open keyboard shortcuts panel |

---

## 10. TailwindCSS Configuration

Complete Tailwind configuration integrating all design tokens defined above.

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary
        abyss: '#0A0E1A',
        'deep-navy': '#111827',
        'storm-blue': '#2563EB',
        'flood-cyan': '#06B6D4',
        // Severity
        'safe-green': '#10B981',
        'caution-amber': '#F59E0B',
        'danger-red': '#EF4444',
        'critical-magenta': '#EC4899',
        // Flood depth
        'flood-light': '#7DD3FC',
        'flood-medium': '#38BDF8',
        'flood-deep': '#0284C7',
        'flood-dark': '#1E3A5F',
        'flood-extreme': '#7C3AED',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
        'h2': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['1.375rem', { lineHeight: '1.4', letterSpacing: '-0.005em', fontWeight: '600' }],
        'h4': ['1.125rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['0.9375rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
        'mono-data': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],
      },
      spacing: {
        '4.5': '18px',
        '13': '52px',
        '15': '60px',
        '18': '72px',
        '22': '88px',
        '26': '104px',
        '30': '120px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'floating': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'floating-hover': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glow-blue': '0 0 20px rgba(37, 99, 235, 0.3)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.3)',
      },
      animation: {
        'flood-pulse': 'flood-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'route-draw': 'route-draw 2s ease-in-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
      keyframes: {
        'flood-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        'route-draw': {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 11. File Structure Convention

```
src/
  components/
    ui/                    # Base UI components (Button, Card, Badge, etc.)
    map/                   # Map-specific components (FloodOverlay, RouteLayer, etc.)
    charts/                # Chart components (MetricChart, PredictionTimeline, etc.)
    layout/                # Layout components (Sidebar, DetailPanel, TopBar, etc.)
    landing/               # Landing page sections (Hero, Problem, Solution, etc.)
  hooks/                   # Custom React hooks (useFloodData, useMapInteraction, etc.)
  lib/                     # Utility functions, color scales, formatters
  styles/
    globals.css            # Tailwind directives, @font-face, CSS animations
    tokens.css             # CSS custom properties (optional, if not using Tailwind exclusively)
  types/                   # TypeScript interfaces and types
  assets/
    fonts/                 # Self-hosted WOFF2 files
    icons/                 # Custom SVG icons
    images/                # Static images (WebP/AVIF)
```

---

## 12. Implementation Checklist

### Phase 1: Foundation
- [ ] Configure TailwindCSS with complete design tokens
- [ ] Self-host Inter and JetBrains Mono fonts
- [ ] Create base UI components: Button, Card, Badge, Input
- [ ] Set up Framer Motion with reduced-motion support
- [ ] Implement dark mode as default with proper CSS custom properties

### Phase 2: Map System
- [ ] Integrate Mapbox GL JS with dark navigation style
- [ ] Build FloodOverlay component with depth-based coloring
- [ ] Build RouteLayer component with safe/warning/blocked states
- [ ] Implement map marker system with clustering
- [ ] Add heatmap layer for flood prediction probability
- [ ] Build detail panel with slide-in animation

### Phase 3: Landing Page
- [ ] Build Hero section with animated map background
- [ ] Build Problem section with stat cards
- [ ] Build Solution section with glassmorphism feature cards
- [ ] Build How It Works section with step flow
- [ ] Build AI Advantage section with technology columns
- [ ] Build interactive routing demo (or pre-rendered equivalent)
- [ ] Build Prediction and Reporting section
- [ ] Build Government/Enterprise value section
- [ ] Build testimonials carousel
- [ ] Build CTA section with email capture
- [ ] Implement scroll animations with Framer Motion
- [ ] Verify all sections are responsive across breakpoints

### Phase 4: Dashboard
- [ ] Build sidebar navigation with layer toggles
- [ ] Build metric cards with live data updates
- [ ] Build flood alert feed with real-time updates
- [ ] Build route comparison view
- [ ] Build report generation and download interface
- [ ] Build agent status monitoring panel
- [ ] Implement chart components with Recharts

### Phase 5: Accessibility and Performance
- [ ] Run axe-core audit on all pages, fix all issues
- [ ] Test with VoiceOver (macOS), NVDA (Windows), and TalkBack (Android)
- [ ] Verify all ARIA live regions announce correctly
- [ ] Test keyboard navigation through every interactive flow
- [ ] Verify prefers-reduced-motion disables all animations
- [ ] Run Lighthouse audit, achieve 90+ on all categories
- [ ] Optimize bundle with code splitting per route
- [ ] Verify all images use modern formats with responsive srcset
- [ ] Test on 3G throttled connection, verify < 3s meaningful paint
