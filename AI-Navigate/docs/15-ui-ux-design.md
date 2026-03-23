# SafeMove AI -- UI/UX Design System

> The comprehensive design system governing every pixel, interaction, and visual decision across the SafeMove AI platform. Built for data-dense operational environments where clarity saves time and lives.

---

## Design Philosophy

### Guiding Principles

SafeMove AI serves traffic operators, fleet managers, and city planners who make high-stakes decisions under time pressure. Every design choice flows from four non-negotiable principles:

**1. Clarity Over Decoration**
Every element must earn its place on screen. We eliminate ornamental flourishes in favor of clear information hierarchy. A traffic operator scanning for anomalies at 2 AM should never have to parse decorative UI to find a critical alert. White space is a feature, not wasted space.

**2. Data Density Without Overwhelm**
The platform manages thousands of data points simultaneously -- vehicle positions, signal states, congestion indices, prediction confidence scores. We achieve density through progressive disclosure, consistent visual encoding, and spatial grouping -- never through cramming. The right information appears at the right zoom level.

**3. Real-Time Feedback**
When a user adjusts a signal timing plan or reroutes a fleet, they should see the effect within milliseconds. Every action produces immediate, visible feedback. Data streams update smoothly, not in jarring jumps. The interface feels alive because the city it represents is alive.

**4. Progressive Disclosure**
Surface-level views show high-level health metrics. Clicking into a zone reveals corridor-level data. Clicking a corridor reveals intersection-level detail. Users never see more complexity than they need, but every layer of depth is one click away.

### Design Inspirations

| Reference | What We Take |
|---|---|
| **Stripe** | Information density, clean typography, systematic spacing |
| **Linear** | Keyboard-first navigation, command palette, dark-mode excellence |
| **Notion** | Content-first layout, flexible workspace composition |
| **Vercel** | Real-time feedback, deployment-status visual language |
| **Mapbox Studio** | Map-centric interfaces, layer management, spatial UI |

### Design Constraints

- Primary use context: desktop (1440px+), multi-monitor control rooms
- Secondary context: tablet for field operations, mobile for alerts only
- Must function under fluorescent lighting (control rooms) and sunlight (field)
- Must support continuous 12-hour operational sessions without visual fatigue
- Real-time data refresh cycles of 1--5 seconds
- Color encoding must remain distinguishable under all forms of color vision deficiency

---

## Color System

### Primary Palette

| Token | Name | Hex | RGB | Usage |
|---|---|---|---|---|
| `--color-deep-blue` | Deep Blue | `#0A1628` | `10, 22, 40` | Primary backgrounds, sidebar, headers |
| `--color-electric-blue` | Electric Blue | `#2563EB` | `37, 99, 235` | Primary actions, active states, links, focus rings |
| `--color-accent-green` | Accent Green | `#10B981` | `16, 185, 129` | Success states, positive metrics, flowing traffic |
| `--color-warning-amber` | Warning Amber | `#F59E0B` | `245, 158, 11` | Warnings, caution states, slow traffic |
| `--color-error-red` | Error Red | `#EF4444` | `239, 68, 68` | Errors, critical alerts, congested traffic |

### Electric Blue Extended Scale

| Token | Hex | Usage |
|---|---|---|
| `--blue-50` | `#EFF6FF` | Lightest tint, selected row backgrounds |
| `--blue-100` | `#DBEAFE` | Hover backgrounds, subtle highlights |
| `--blue-200` | `#BFDBFE` | Borders on active elements |
| `--blue-300` | `#93C5FD` | Secondary icons, decorative accents |
| `--blue-400` | `#60A5FA` | Interactive element hover states |
| `--blue-500` | `#2563EB` | Primary -- buttons, links, focus rings |
| `--blue-600` | `#2554D6` | Primary hover state |
| `--blue-700` | `#1D4ED8` | Primary active/pressed state |
| `--blue-800` | `#1E40AF` | Dark mode primary surfaces |
| `--blue-900` | `#1E3A8A` | Deep accent, dark mode borders |

### Neutral Scale

| Token | Hex | Name | Usage |
|---|---|---|---|
| `--neutral-0` | `#FFFFFF` | White | Page backgrounds, card surfaces |
| `--neutral-50` | `#F9FAFB` | Snow | Alternate row backgrounds, subtle fills |
| `--neutral-100` | `#F3F4F6` | Smoke | Input backgrounds, divider fills |
| `--neutral-200` | `#E5E7EB` | Silver | Borders, separators, disabled backgrounds |
| `--neutral-300` | `#D1D5DB` | Fog | Placeholder text, disabled borders |
| `--neutral-400` | `#9CA3AF` | Gray | Secondary icons, metadata text |
| `--neutral-500` | `#6B7280` | Slate | Body text (secondary), labels |
| `--neutral-600` | `#4B5563` | Charcoal | Body text (primary) |
| `--neutral-700` | `#374151` | Graphite | Headings, high-emphasis text |
| `--neutral-800` | `#1F2937` | Ink | Dark mode card surfaces |
| `--neutral-900` | `#111827` | Midnight | Dark mode page backgrounds |
| `--neutral-950` | `#030712` | Void | Deepest dark mode surfaces |

### Semantic Colors

| Role | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| **Success** | `#10B981` (bg: `#ECFDF5`) | `#34D399` (bg: `#064E3B`) | Completed actions, positive deltas, systems online |
| **Warning** | `#F59E0B` (bg: `#FFFBEB`) | `#FBBF24` (bg: `#78350F`) | Degraded performance, approaching thresholds |
| **Error** | `#EF4444` (bg: `#FEF2F2`) | `#F87171` (bg: `#7F1D1D`) | Failed operations, critical alerts, system down |
| **Info** | `#3B82F6` (bg: `#EFF6FF`) | `#60A5FA` (bg: `#1E3A8A`) | Informational notices, tips, neutral updates |

### Traffic-Specific Color Encoding

These colors are reserved exclusively for traffic state visualization on maps, charts, and status indicators. They must never be repurposed for unrelated UI elements.

| Traffic State | Hex | Tailwind | Map Opacity | Usage |
|---|---|---|---|---|
| **Flowing** (0--30% congestion) | `#10B981` | `emerald-500` | 0.7 | Free-flow roads, healthy corridors |
| **Moderate** (30--50% congestion) | `#84CC16` | `lime-500` | 0.7 | Light congestion, slightly below free-flow |
| **Slow** (50--70% congestion) | `#F59E0B` | `amber-500` | 0.8 | Noticeable delays, reduced speed |
| **Congested** (70--90% congestion) | `#F97316` | `orange-500` | 0.85 | Heavy delays, significant queuing |
| **Gridlock** (90--100% congestion) | `#EF4444` | `red-500` | 0.9 | Near-standstill, critical intervention needed |
| **No Data** | `#6B7280` | `gray-500` | 0.3 | Sensor offline, data unavailable |
| **Predicted** | Corresponding color + dashed stroke | -- | 0.5 | AI-predicted future state (lower opacity) |

### Dark Mode Palette

SafeMove AI defaults to dark mode for control room environments. The dark palette reduces eye strain during extended operational sessions and improves map contrast.

```css
/* Dark Mode Foundations */
--dm-background:       #030712;   /* Page background */
--dm-surface-1:        #0A1628;   /* Primary cards, sidebar */
--dm-surface-2:        #111827;   /* Secondary cards, dropdowns */
--dm-surface-3:        #1F2937;   /* Elevated elements, modals */
--dm-border:           #374151;   /* Subtle borders */
--dm-border-strong:    #4B5563;   /* Emphasized borders */
--dm-text-primary:     #F9FAFB;   /* Primary text */
--dm-text-secondary:   #9CA3AF;   /* Secondary text, labels */
--dm-text-tertiary:    #6B7280;   /* Disabled, placeholder text */
```

### Light Mode Palette

```css
/* Light Mode Foundations */
--lm-background:       #FFFFFF;   /* Page background */
--lm-surface-1:        #FFFFFF;   /* Primary cards */
--lm-surface-2:        #F9FAFB;   /* Secondary cards, sidebar */
--lm-surface-3:        #F3F4F6;   /* Elevated elements, modals */
--lm-border:           #E5E7EB;   /* Subtle borders */
--lm-border-strong:    #D1D5DB;   /* Emphasized borders */
--lm-text-primary:     #111827;   /* Primary text */
--lm-text-secondary:   #6B7280;   /* Secondary text, labels */
--lm-text-tertiary:    #9CA3AF;   /* Disabled, placeholder text */
```

### Accessibility -- WCAG AA Contrast Ratios

All text and interactive elements must meet WCAG 2.1 AA minimum contrast ratios.

| Combination | Ratio | Standard | Pass |
|---|---|---|---|
| `#F9FAFB` text on `#0A1628` background | 16.2:1 | AA (4.5:1) | Yes |
| `#9CA3AF` text on `#0A1628` background | 6.8:1 | AA (4.5:1) | Yes |
| `#2563EB` text on `#FFFFFF` background | 4.6:1 | AA (4.5:1) | Yes |
| `#2563EB` text on `#030712` background | 4.5:1 | AA (4.5:1) | Yes |
| `#10B981` text on `#030712` background | 8.1:1 | AA (4.5:1) | Yes |
| `#EF4444` text on `#030712` background | 4.8:1 | AA (4.5:1) | Yes |
| `#F59E0B` text on `#030712` background | 9.2:1 | AA (4.5:1) | Yes |
| `#111827` text on `#FFFFFF` background | 17.4:1 | AAA (7:1) | Yes |
| `#6B7280` text on `#FFFFFF` background | 5.0:1 | AA (4.5:1) | Yes |

**Color-blind safe encoding:** All traffic-state colors are supplemented with pattern overlays (dashed, dotted, solid) and text labels to ensure distinguishability under protanopia, deuteranopia, and tritanopia.

---

## Typography

### Font Families

| Role | Family | Weight Range | Fallback Stack |
|---|---|---|---|
| **UI / Headings** | Inter | 400--700 | `'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif` |
| **Data / Code** | JetBrains Mono | 400--600 | `'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace` |

**Why Inter:** Designed for computer screens, optimized for high legibility at small sizes, includes tabular numerals (critical for dashboards), extensive language support, and open source.

**Why JetBrains Mono:** Clear digit differentiation (especially 0/O, 1/l/I), ligature support for code, and a technical aesthetic that signals "data" to users.

### Type Scale

| Token | Size | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|
| `--text-xs` | 12px / 0.75rem | 16px (1.33) | +0.02em | Captions, timestamps, fine print |
| `--text-sm` | 14px / 0.875rem | 20px (1.43) | +0.01em | Labels, secondary text, metadata |
| `--text-base` | 16px / 1rem | 24px (1.5) | 0 | Body text, descriptions, form inputs |
| `--text-lg` | 18px / 1.125rem | 28px (1.56) | -0.01em | Emphasized body, card titles |
| `--text-xl` | 20px / 1.25rem | 28px (1.4) | -0.01em | Section titles, modal headers |
| `--text-2xl` | 24px / 1.5rem | 32px (1.33) | -0.02em | Page titles, primary headings |
| `--text-3xl` | 30px / 1.875rem | 36px (1.2) | -0.02em | Hero metrics, dashboard numbers |
| `--text-4xl` | 36px / 2.25rem | 40px (1.11) | -0.03em | Large display numbers |
| `--text-5xl` | 48px / 3rem | 48px (1.0) | -0.03em | Oversized hero stats |

### Font Weights

| Weight | Token | Usage |
|---|---|---|
| 400 Regular | `--font-normal` | Body text, descriptions, long-form content |
| 500 Medium | `--font-medium` | Labels, navigation items, button text, table headers |
| 600 Semibold | `--font-semibold` | Card titles, section headings, emphasized data |
| 700 Bold | `--font-bold` | Page headings, hero metrics, critical alerts |

### Numeric Typography

Dashboard numbers use JetBrains Mono with tabular figures enabled to prevent layout shifts during real-time updates.

```css
.metric-value {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: var(--text-3xl);
  letter-spacing: -0.02em;
  line-height: 1;
}

.metric-delta {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  font-size: var(--text-sm);
}
```

### Text Truncation Rules

- Single-line labels: truncate with ellipsis after container width
- Multi-line descriptions: clamp to 2--3 lines with `line-clamp`
- Table cells: single-line truncation; full text available on hover tooltip
- Never truncate: metric values, alert titles, route names

---

## Spacing and Grid

### Base Unit

All spacing derives from a **4px base unit**. The primary rhythm uses an **8px grid** for component internals, with 4px available for fine adjustments (icon padding, border offsets).

### Spacing Scale

| Token | Value | Pixels | Common Usage |
|---|---|---|---|
| `--space-0` | 0 | 0px | Reset, flush alignment |
| `--space-0.5` | 0.125rem | 2px | Hairline gaps, icon-to-label micro spacing |
| `--space-1` | 0.25rem | 4px | Inline icon padding, tight element gaps |
| `--space-2` | 0.5rem | 8px | Input padding (vertical), related item gaps |
| `--space-3` | 0.75rem | 12px | Input padding (horizontal), compact card padding |
| `--space-4` | 1rem | 16px | Standard card padding, form field spacing |
| `--space-5` | 1.25rem | 20px | Card section spacing |
| `--space-6` | 1.5rem | 24px | Card padding (large), section gaps |
| `--space-8` | 2rem | 32px | Section padding, major group spacing |
| `--space-10` | 2.5rem | 40px | Page-level vertical padding |
| `--space-12` | 3rem | 48px | Major section dividers |
| `--space-16` | 4rem | 64px | Page margin (desktop), hero spacing |
| `--space-24` | 6rem | 96px | Section separators on landing pages |

### Grid System

**12-column fluid grid** with fixed sidebar and optional panel.

```
|-- Sidebar --|------------ Content Grid (12 col) ------------|-- Panel --|
|   240px     |  gap: 24px  |  columns: fluid  |  gap: 24px  |  360px   |
|  (fixed)    |  margin: 24px from sidebar edge               | (optional)|
```

### Breakpoints

| Name | Width | Columns | Sidebar | Panel | Gutter |
|---|---|---|---|---|---|
| `xl` | >= 1440px | 12 | 240px fixed | 360px fixed | 24px |
| `lg` | >= 1280px | 12 | 240px fixed | 320px fixed | 24px |
| `md` | >= 1024px | 8 | 64px (icons only) | Hidden (drawer) | 16px |
| `sm` | >= 768px | 6 | Hidden (overlay) | Hidden (drawer) | 16px |
| `xs` | >= 640px | 4 | Hidden (overlay) | Hidden (full screen) | 12px |
| `xxs` | < 640px | 4 | Hidden | Hidden | 12px |

### Layout Dimensions

| Element | Width | Behavior |
|---|---|---|
| Sidebar (expanded) | 240px | Fixed position, scrollable content |
| Sidebar (collapsed) | 64px | Icons only, tooltips on hover |
| Top header | 100% x 56px | Fixed position, z-index: 50 |
| Content area | Fluid (min: 640px) | Scrollable, contains 12-column grid |
| Right panel | 360px | Fixed position, slides in/out |
| Command palette | 640px | Centered modal overlay |
| Modal (small) | 480px | Centered, max-height: 85vh |
| Modal (medium) | 640px | Centered, max-height: 85vh |
| Modal (large) | 960px | Centered, max-height: 90vh |

### Content Width Constraints

```css
/* Readable content: max 65 characters per line */
.prose         { max-width: 65ch; }

/* Dashboard cards: fill grid columns */
.card          { width: 100%; }

/* Metric strips: horizontal scroll on overflow */
.metric-strip  { display: flex; gap: var(--space-4); overflow-x: auto; }
```

---

## Component System

### Buttons

#### Variants

| Variant | Background | Text | Border | Usage |
|---|---|---|---|---|
| **Primary** | `#2563EB` | `#FFFFFF` | none | Primary actions: Save, Deploy, Run Simulation |
| **Secondary** | transparent | `#2563EB` | `1px solid #2563EB` | Secondary actions: Cancel, Back, View Details |
| **Ghost** | transparent | `#6B7280` | none | Tertiary actions: Edit, Copy, Filter |
| **Danger** | `#EF4444` | `#FFFFFF` | none | Destructive actions: Delete, Remove, Stop |
| **Success** | `#10B981` | `#FFFFFF` | none | Positive confirmations: Approve, Send to Fleet |

#### Sizes

| Size | Height | Padding (h/v) | Font Size | Icon Size | Border Radius |
|---|---|---|---|---|---|
| `xs` | 28px | 8px / 4px | 12px | 14px | 4px |
| `sm` | 32px | 12px / 6px | 13px | 16px | 6px |
| `md` (default) | 36px | 16px / 8px | 14px | 18px | 6px |
| `lg` | 40px | 20px / 10px | 15px | 20px | 8px |
| `xl` | 48px | 24px / 12px | 16px | 22px | 8px |

#### States

```
Default    -> resting appearance
Hover      -> background lightens/darkens 8%, cursor: pointer
Active     -> background darkens 12%, scale(0.98) transform
Focus      -> 2px ring offset (--color-electric-blue), outline-offset: 2px
Disabled   -> opacity: 0.5, cursor: not-allowed, pointer-events: none
Loading    -> spinner replaces icon, text dims to 60% opacity, pointer-events: none
```

#### Button Component (Tailwind Classes)

```tsx
// Primary Button
<button className="
  inline-flex items-center justify-center gap-2
  px-4 py-2 h-9
  bg-blue-600 hover:bg-blue-700 active:bg-blue-800
  text-white text-sm font-medium
  rounded-md
  transition-all duration-150 ease-out
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-blue-500 focus-visible:ring-offset-2
  disabled:opacity-50 disabled:pointer-events-none
">
  Deploy Route
</button>
```

---

### Cards

#### Stat Card

Displays a single key performance indicator with trend.

```
+----------------------------------------------+
|  [icon]  Active Vehicles                     |
|                                               |
|  12,847                          +3.2% ^     |
|  ======                          (green)     |
|  (JetBrains Mono, 30px, bold)                |
|                                               |
|  [--- sparkline (last 24h) ---]              |
+----------------------------------------------+
```

**Specs:** 1-column min width, 16px padding, 1px border `--neutral-200`, border-radius 8px, shadow-sm. Hover: shadow-md, translateY(-1px).

#### Map Card

Full-bleed Mapbox GL container with overlay controls.

```
+----------------------------------------------+
|  [Mapbox GL Canvas - full bleed]             |
|                                               |
|  +--layer-toggle--+       +--zoom-controls--+|
|  | Traffic        |       |  [+]            ||
|  | Vehicles       |       |  [-]            ||
|  | Heatmap        |       |  [compass]      ||
|  +----------------+       +-----------------+|
|                                               |
|  +--legend strip at bottom--+                |
|  | [green] Flowing  [yellow] Slow  [red] .. ||
|  +------------------------------------------+|
+----------------------------------------------+
```

**Specs:** min-height 400px, border-radius 8px with `overflow: hidden`, controls positioned with `absolute` inside a `relative` container.

#### Chart Card

Wrapper for D3.js or Recharts visualizations.

```
+----------------------------------------------+
|  Traffic Volume Over Time           [...]    |
|  Today vs Last Week                          |
|----------------------------------------------+
|                                               |
|  [Chart Area - responsive SVG]               |
|  Height: 240px (sm), 320px (md), 400px (lg) |
|                                               |
+----------------------------------------------+
```

**Specs:** Header with title (semibold, 16px) and options menu. Chart area has 16px horizontal padding, 8px bottom padding. Tooltip on hover.

#### Alert Card

Displays a real-time incident or system alert.

```
+----------------------------------------------+
| [!] CRITICAL   I-95 Northbound Gridlock      |
|     2 min ago  Mile marker 42-45             |
|                                               |
|  Estimated clear: 45 min  |  3 lanes blocked |
|  [View on Map]  [Acknowledge]  [Escalate]    |
+----------------------------------------------+
```

**Specs:** Left border 3px solid (color matches severity), background tinted with semantic color at 5% opacity. Severity badge in top-left.

---

### Tables

**Design:** Clean, minimal borders. Row hover highlight. Fixed header on scroll.

#### Features

- **Sortable columns:** Click header to sort, arrow indicator for direction
- **Filterable:** Filter icon in header opens dropdown filter
- **Inline sparklines:** Tiny 80x24px sparkline SVGs in trend columns
- **Row actions:** Hover to reveal action icons (view, edit, delete)
- **Pagination:** Bottom bar with page size selector (10, 25, 50, 100) and page navigation
- **Selection:** Checkbox column for bulk actions
- **Density toggle:** Compact (32px rows), Default (40px rows), Comfortable (48px rows)

```
+---+------------------+----------+--------+-----------+--------+
| # | Corridor         | Avg Speed| Volume | Trend     | Status |
+---+------------------+----------+--------+-----------+--------+
| 1 | I-95 Northbound  | 42 mph   | 3,241  | [~spark~] | [green]|
| 2 | US-1 Southbound  | 28 mph   | 5,102  | [~spark~] | [amber]|
| 3 | SR-836 Eastbound | 12 mph   | 7,890  | [~spark~] | [red]  |
+---+------------------+----------+--------+-----------+--------+
| Showing 1-25 of 142               [<] 1  2  3 ... 6 [>]     |
+--------------------------------------------------------------+
```

#### Table Styling

```css
/* Row styles */
.table-row          { height: 40px; border-bottom: 1px solid var(--neutral-100); }
.table-row:hover    { background: var(--neutral-50); }
.table-row.selected { background: var(--blue-50); }

/* Header */
.table-header       { height: 36px; font-weight: 500; font-size: 12px;
                      text-transform: uppercase; letter-spacing: 0.05em;
                      color: var(--neutral-500); position: sticky; top: 0; }
```

---

### Charts

#### Area Chart (Traffic Volume)

- Fill with gradient (primary color at 20% top to 0% bottom)
- Stroke: 2px solid primary color
- Dots: 4px circles on hover only
- X-axis: time labels, Y-axis: volume count
- Crosshair on hover with tooltip

#### Bar Chart (Corridor Comparison)

- Rounded top corners (4px radius)
- 8px gap between bars
- Horizontal variant for ranked lists
- Stacked variant for multi-category data

#### Heatmap (Speed by Time/Location)

- Cell size: 24x24px minimum
- Color gradient: `#10B981` (fast) through `#F59E0B` to `#EF4444` (slow)
- Tooltip shows exact value and percentile
- X-axis: hours of day, Y-axis: road segments

#### Real-Time Line Chart

- Smooth cubic bezier interpolation (D3 `curveMonotoneX`)
- New data points animate in from the right edge
- 60-second visible window with scroll-back capability
- Current value displayed as a pulsing dot at the line end
- Prediction zone shown with dashed line and confidence band (10% opacity fill)

---

### Map Components

Built on Mapbox GL JS with custom layers and controls.

#### Traffic Layer

```typescript
// Traffic flow visualization
{
  id: 'traffic-flow',
  type: 'line',
  source: 'traffic-data',
  paint: {
    'line-color': [
      'interpolate', ['linear'], ['get', 'congestion_index'],
      0.0, '#10B981',   // Flowing
      0.3, '#84CC16',   // Moderate
      0.5, '#F59E0B',   // Slow
      0.7, '#F97316',   // Congested
      0.9, '#EF4444',   // Gridlock
    ],
    'line-width': ['interpolate', ['linear'], ['zoom'], 10, 2, 16, 8],
    'line-opacity': 0.8,
  }
}
```

#### Route Overlay

- Primary route: 4px solid `#2563EB`, glow effect (`blur: 8px`)
- Alternative routes: 3px solid `#60A5FA`, dashed pattern
- Selected route: 5px solid `#2563EB`, animated dash pattern (ant trail)
- Waypoints: 12px circles with white border and numbered labels

#### Heatmap Layer

- Radius: 20px at zoom 10, scaling to 40px at zoom 16
- Weight: proportional to congestion severity
- Color ramp: blue (low) through yellow to red (high)
- Opacity: 0.6 base, interactive adjustment slider

#### Markers and Pins

| Type | Size | Color | Icon |
|---|---|---|---|
| Vehicle (active) | 32px | `#2563EB` | Directional arrow |
| Vehicle (idle) | 24px | `#6B7280` | Circle |
| Incident | 36px | `#EF4444` | Warning triangle |
| Signal (optimized) | 28px | `#10B981` | Traffic light |
| Signal (default) | 28px | `#6B7280` | Traffic light |
| Waypoint | 24px | `#2563EB` | Numbered circle |

---

### Status Indicators

#### Live Dot

```tsx
// Pulsing live indicator
<span className="relative flex h-3 w-3">
  <span className="animate-ping absolute inline-flex h-full w-full
                    rounded-full bg-emerald-400 opacity-75" />
  <span className="relative inline-flex rounded-full h-3 w-3
                    bg-emerald-500" />
</span>
```

#### Severity Badges

| Level | Background | Text | Border | Label |
|---|---|---|---|---|
| Critical | `#FEF2F2` | `#991B1B` | `#FECACA` | CRITICAL |
| High | `#FFF7ED` | `#9A3412` | `#FED7AA` | HIGH |
| Medium | `#FFFBEB` | `#92400E` | `#FDE68A` | MEDIUM |
| Low | `#F0FDF4` | `#166534` | `#BBF7D0` | LOW |
| Info | `#EFF6FF` | `#1E40AF` | `#BFDBFE` | INFO |

**Badge specs:** height 20px, padding 0 8px, font-size 11px, font-weight 600, uppercase, letter-spacing 0.05em, border-radius 10px (pill), border 1px solid.

---

### Navigation

#### Sidebar Navigation

```
+----------------------------------+
|  [SafeMove logo]  SafeMove AI    |
+----------------------------------+
|                                  |
|  OPERATIONS                      |
|  [icon] Command Center     (*)   |
|  [icon] Route Optimizer          |
|  [icon] Fleet Manager            |
|                                  |
|  ANALYTICS                       |
|  [icon] Dashboard                |
|  [icon] Reports                  |
|  [icon] Simulations              |
|                                  |
|  SYSTEM                          |
|  [icon] Agent Monitor            |
|  [icon] Settings                 |
|  [icon] API Keys                 |
|                                  |
|  --------------------------------|
|  [icon] Collapse sidebar   [<]   |
|  [avatar] Jane Doe         [v]   |
+----------------------------------+
```

**Specs:** Width 240px, background `--dm-surface-1`, section labels 11px uppercase `--neutral-400`, nav items 14px medium, 36px height, 8px border-radius on hover, active item has `--blue-500` left border accent (3px) and tinted background.

#### Breadcrumbs

```
Home  >  Analytics  >  Traffic Volume  >  I-95 Corridor
(link)   (link)        (link)             (current, bold)
```

**Specs:** Font-size 13px, separator `>` in `--neutral-300`, links in `--neutral-500` with underline on hover, current page in `--neutral-700` semibold.

#### Command Palette

Keyboard shortcut: `Cmd+K` (Mac) / `Ctrl+K` (Windows)

```
+--------------------------------------------------+
|  [search icon]  Search commands, pages, data...  |
+--------------------------------------------------+
|                                                  |
|  RECENT                                          |
|  [icon] Command Center              Ctrl+1       |
|  [icon] I-95 Corridor Report        Ctrl+R       |
|                                                  |
|  ACTIONS                                         |
|  [icon] Run New Simulation          Ctrl+Shift+S |
|  [icon] Export Report               Ctrl+E       |
|  [icon] Toggle Dark Mode            Ctrl+D       |
|                                                  |
|  NAVIGATION                                      |
|  [icon] Go to Route Optimizer                    |
|  [icon] Go to Agent Monitor                      |
|                                                  |
+--------------------------------------------------+
```

**Specs:** 640px wide, centered at 20% from top, backdrop blur, border-radius 12px, shadow-2xl. Results update as user types (debounced 150ms). Arrow keys to navigate, Enter to select, Escape to close.

---

### Forms

#### Text Inputs

```
Label (14px medium, --neutral-700)
+----------------------------------------------+
|  [icon]  Placeholder text                    |
+----------------------------------------------+
Helper text (12px, --neutral-400)
```

**States:**
- Default: border `--neutral-200`, background white
- Focus: border `--blue-500`, ring `0 0 0 3px rgba(37,99,235,0.1)`
- Error: border `--red-500`, ring `0 0 0 3px rgba(239,68,68,0.1)`, error message below in red
- Disabled: background `--neutral-50`, text `--neutral-400`
- Height: 36px (sm), 40px (md), 44px (lg)

#### Select Dropdowns

Custom-styled select with search capability for long lists. Dropdown panel: max-height 240px, scrollable, 8px padding, shadow-lg.

#### Date Range Picker

- Calendar grid with month navigation
- Preset ranges: Today, Last 7 days, Last 30 days, Last quarter, Custom
- Time precision selector (hour, 15-min, 5-min, 1-min)
- Visual range highlight between start and end dates
- Dual calendar view for wide screens

---

### Modals and Drawers

#### Modal

```
+----overlay (bg: rgba(0,0,0,0.6), backdrop-blur: 4px)----+
|                                                           |
|    +--modal (centered, max-width per size)--+            |
|    |  [X]  Modal Title                      |            |
|    |-----------------------------------------|            |
|    |                                         |            |
|    |  Content area with scrollable body      |            |
|    |                                         |            |
|    |-----------------------------------------|            |
|    |  [Cancel]              [Primary Action] |            |
|    +--border-radius: 12px, shadow-2xl--------+            |
|                                                           |
+-----------------------------------------------------------+
```

**Animation:** Scale from 0.95 to 1.0 + opacity from 0 to 1, duration 200ms, ease-out.

#### Drawer (Right Panel)

```
+--content area--+--drawer (360px, slides from right)--+
|                |  [X]  Panel Title                    |
|  (dims to 60%  |--------------------------------------|
|   opacity)     |                                      |
|                |  Scrollable content                  |
|                |                                      |
|                |--------------------------------------|
|                |  [Action buttons]                    |
+----------------+--------------------------------------+
```

**Animation:** translateX(100%) to translateX(0), duration 250ms, ease-in-out.

---

### Toast Notifications

Appear in the bottom-right corner, stack upward (max 3 visible).

```
+----------------------------------------------+
| [icon]  Route optimization complete    [X]   |
|         Fleet 12 updated with 3 new routes   |
+----------------------------------------------+
```

**Variants:** success (green left border), error (red), warning (amber), info (blue).
**Behavior:** Auto-dismiss after 5 seconds (errors persist until dismissed). Progress bar at bottom shows remaining time. Hover pauses timer.
**Animation:** Slide in from right, fade out on dismiss.

---

## Interaction Design

### Transition Timing

| Category | Duration | Easing | Usage |
|---|---|---|---|
| **Micro** | 150ms | `ease-out` | Button hover, toggle, tooltip appear |
| **Standard** | 250ms | `ease-in-out` | Card expand, panel slide, tab switch |
| **Page** | 300ms | `ease-in-out` | Page transition, modal open/close |
| **Data** | 500ms | `ease-out` | Chart animation, counter increment |
| **Map** | 800ms | `ease-in-out` | Map fly-to, zoom transitions |

```css
/* Tailwind config extension */
transitionDuration: {
  'micro': '150ms',
  'standard': '250ms',
  'page': '300ms',
  'data': '500ms',
  'map': '800ms',
}
```

### Loading States

**Skeleton screens are the standard.** Spinners are used only for indeterminate background processes.

```tsx
// Skeleton for a stat card
<div className="animate-pulse">
  <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded mb-3" />
  <div className="h-8 w-32 bg-neutral-200 dark:bg-neutral-700 rounded mb-2" />
  <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-700 rounded" />
</div>
```

**Skeleton rules:**
- Match the exact dimensions and position of the loaded content
- Use `animate-pulse` (opacity 1 to 0.5, 2s duration, infinite)
- Rounded corners matching the final element
- Stagger appearance by 50ms per element for a waterfall feel

### Hover States

Every interactive element must have a visible hover state.

| Element | Hover Behavior |
|---|---|
| Buttons | Background shift (8% lighter/darker), subtle translateY(-1px) |
| Cards | Shadow elevation increase (sm to md), translateY(-2px) |
| Table rows | Background `--neutral-50`, reveal row actions |
| Sidebar items | Background `--neutral-800` (dark mode) |
| Links | Underline appears, color shifts to `--blue-600` |
| Map markers | Scale(1.15), tooltip appears after 200ms delay |
| Chart elements | Highlight segment, dim others to 40% opacity |

### Keyboard Navigation

Full keyboard accessibility following WAI-ARIA patterns.

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Move focus forward/backward through interactive elements |
| `Enter` / `Space` | Activate focused element |
| `Escape` | Close modal, drawer, dropdown, or command palette |
| `Arrow keys` | Navigate within menus, lists, calendar grids |
| `Cmd/Ctrl + K` | Open command palette |
| `Cmd/Ctrl + /` | Open keyboard shortcut reference |
| `1-9` | Switch dashboard views (when sidebar focused) |
| `M` | Toggle map fullscreen (when map focused) |
| `F` | Open filter panel |

**Focus indicators:** 2px solid `--blue-500` ring with 2px offset. High contrast mode: 3px solid with inverse color.

### Real-Time Data Interactions

#### Smooth Counter Animations

```tsx
// Animated number using Framer Motion
<motion.span
  key={value}
  initial={{ y: 10, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  {formatNumber(value)}
</motion.span>
```

#### Map Data Interpolation

- Vehicle positions interpolate smoothly between update intervals using `requestAnimationFrame`
- Traffic colors transition over 500ms using Mapbox `paint-transition` properties
- New incidents appear with a pulse animation (scale 0 to 1 + ring expansion)
- Route changes animate waypoint-by-waypoint over 800ms

#### Chart Data Updates

- New data points slide in from the right edge
- Y-axis rescales with a smooth 300ms transition
- Tooltips remain anchored during updates
- Historical data maintains position stability (no jitter)

---

## Responsive Strategy

### Design Target

**Desktop-first at 1440px.** The platform is primarily used in traffic management centers and fleet operations offices on large screens. Mobile is a monitoring-only experience.

### Breakpoint Behavior

#### Desktop (>= 1440px) -- Primary

```
+--------+------------------------------------------+---------+
|        |                                          |         |
| Sidebar|           Main Content Area              |  Right  |
|  240px |      (fluid, 12-column grid)             |  Panel  |
|        |                                          |  360px  |
| Full   |  Full map, full charts, full tables      |         |
| labels |  Multi-column card grids                 | Detail  |
|        |  Inline editing                          | Feed    |
+--------+------------------------------------------+---------+
```

- All features visible simultaneously
- Side-by-side comparison views
- Multi-column metric strips
- Full data table with all columns

#### Large Desktop (>= 1920px) -- Control Room

- Content max-width increases to 1600px or goes full-width for map views
- Support for detaching panels into separate windows (multi-monitor)
- Higher data density option in tables (28px rows)
- Larger map viewport with expanded legend

#### Tablet (1024px -- 1439px) -- Field Operations

```
+----+---------------------------------------------+
|    |                                             |
| 64 |          Main Content Area                  |
| px |     (fluid, 8-column grid)                  |
|    |                                             |
|icon|  Reduced card columns (2 instead of 4)      |
|only|  Charts stack vertically                    |
|    |  Panel becomes bottom drawer                |
+----+---------------------------------------------+
```

- Sidebar collapses to 64px icon rail (expand on hover/tap)
- Right panel converts to a bottom drawer (swipe up)
- Tables hide non-essential columns, horizontal scroll for rest
- Map controls move to bottom bar
- Charts reduce to 2-column grid

#### Mobile (640px -- 1023px) -- Monitoring Only

```
+---------------------------------------------+
|  [hamburger]  SafeMove AI     [bell] [avatar]|
+---------------------------------------------+
|                                              |
|           Main Content Area                  |
|          (4-column grid)                     |
|                                              |
|  Single-column card stack                    |
|  Simplified map (no layer controls)          |
|  Key metrics only                            |
|                                              |
+---------------------------------------------+
| [map] [alerts] [metrics] [menu]              |
+---------------------------------------------+
```

- Bottom navigation replaces sidebar (4 primary destinations)
- Map simplifies: no layer toggles, tap-to-filter only
- Charts replaced with summary metric cards
- Tables convert to card-list view
- No inline editing (view and alert only)
- Push notifications replace the event feed

#### Small Mobile (< 640px) -- Alert Only

- Critical alert view only
- Single metric display with swipe navigation
- Map shows current location context only
- All actions redirect to "open on desktop" prompt for complex operations

### Responsive Component Behavior

| Component | Desktop | Tablet | Mobile |
|---|---|---|---|
| **Stat Cards** | 4-column row | 2-column grid | Single column stack |
| **Charts** | 2x2 grid | 2x1 or stacked | Single chart with tabs |
| **Data Tables** | Full columns, inline sparklines | Reduced columns, scroll | Card list view |
| **Map** | 70% viewport, all layers | Full width, reduced layers | Full screen, simplified |
| **Sidebar** | 240px fixed | 64px icon rail | Hidden, bottom nav |
| **Right Panel** | 360px fixed | Bottom drawer | Full screen overlay |
| **Command Palette** | 640px centered | 90% width | Full screen |
| **Modals** | Centered, sized | Centered, 90% width | Full screen |
| **Date Picker** | Dual calendar | Single calendar | Full screen picker |

---

## Accessibility Standards

### WCAG 2.1 AA Compliance (Minimum)

| Criterion | Requirement | Implementation |
|---|---|---|
| 1.1.1 Non-text Content | All images have alt text | Map elements have ARIA labels |
| 1.3.1 Info and Relationships | Semantic HTML | Proper heading hierarchy, landmark regions |
| 1.4.1 Use of Color | Color is not the sole indicator | Traffic states include icons + labels |
| 1.4.3 Contrast | 4.5:1 normal, 3:1 large text | Verified for all color combinations |
| 1.4.11 Non-text Contrast | 3:1 for UI components | Focus rings, borders meet requirement |
| 2.1.1 Keyboard | All functions keyboard accessible | Tab order, focus management |
| 2.4.7 Focus Visible | Clear focus indicators | 2px blue ring on all interactive elements |
| 4.1.2 Name, Role, Value | ARIA attributes | Custom components have proper ARIA roles |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .animate-ping, .animate-pulse, .animate-bounce {
    animation: none !important;
  }

  /* Map transitions become instant */
  .mapboxgl-map { transition: none !important; }
}
```

### Screen Reader Considerations

- Live regions (`aria-live="polite"`) for real-time metric updates
- `aria-live="assertive"` for critical traffic alerts
- Chart data available as accessible tables (hidden, toggled by screen reader users)
- Map state changes announced via live region
- Loading states communicated with `aria-busy="true"`

### High Contrast Mode

```css
@media (forced-colors: active) {
  .btn { border: 2px solid ButtonText; }
  .card { border: 1px solid CanvasText; }
  .badge { border: 1px solid CanvasText; }
  .focus-ring { outline: 3px solid Highlight; }
}
```

---

## Design Tokens -- CSS Custom Properties

The complete token set for implementation in Tailwind CSS configuration:

```css
:root {
  /* Brand */
  --brand-deep-blue: #0A1628;
  --brand-electric-blue: #2563EB;
  --brand-accent-green: #10B981;
  --brand-warning-amber: #F59E0B;
  --brand-error-red: #EF4444;

  /* Surfaces */
  --surface-background: #FFFFFF;
  --surface-primary: #FFFFFF;
  --surface-secondary: #F9FAFB;
  --surface-tertiary: #F3F4F6;
  --surface-elevated: #FFFFFF;

  /* Text */
  --text-primary: #111827;
  --text-secondary: #6B7280;
  --text-tertiary: #9CA3AF;
  --text-inverse: #F9FAFB;
  --text-link: #2563EB;

  /* Borders */
  --border-default: #E5E7EB;
  --border-strong: #D1D5DB;
  --border-focus: #2563EB;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Z-Index Scale */
  --z-base: 0;
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-fixed: 30;
  --z-overlay: 40;
  --z-modal: 50;
  --z-popover: 60;
  --z-toast: 70;
  --z-tooltip: 80;
  --z-command: 90;
}

/* Dark mode overrides */
[data-theme="dark"] {
  --surface-background: #030712;
  --surface-primary: #0A1628;
  --surface-secondary: #111827;
  --surface-tertiary: #1F2937;
  --surface-elevated: #1F2937;

  --text-primary: #F9FAFB;
  --text-secondary: #9CA3AF;
  --text-tertiary: #6B7280;
  --text-inverse: #111827;

  --border-default: #374151;
  --border-strong: #4B5563;

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4);
}
```

---

## Asset Specifications

### Icon System

- **Library:** Lucide Icons (open source, consistent 24px grid)
- **Sizes:** 16px (inline), 20px (default), 24px (navigation), 32px (feature icons)
- **Stroke width:** 1.5px (default), 2px (emphasis)
- **Color:** Inherits `currentColor` for automatic theme adaptation
- **Custom icons:** Traffic signal, vehicle types, and congestion indicators are custom SVGs following Lucide grid and style

### Logo

- **Full logo:** 120x32px (sidebar header)
- **Icon mark:** 32x32px (collapsed sidebar, favicon)
- **Formats:** SVG (primary), PNG @2x (fallback)
- **Clear space:** Minimum 8px on all sides
- **Dark mode:** White variant on dark backgrounds

### Favicon and PWA Icons

| Asset | Size | Format |
|---|---|---|
| Favicon | 32x32 | .ico + .svg |
| Apple Touch | 180x180 | .png |
| Android Chrome | 192x192, 512x512 | .png |
| PWA Splash | 1242x2688 | .png |
| OG Image | 1200x630 | .png |

---

*This design system is the single source of truth for all visual and interaction decisions in SafeMove AI. Every component, color, and spacing value implemented in code must trace back to a token defined in this document. Deviations require design review and system update.*
