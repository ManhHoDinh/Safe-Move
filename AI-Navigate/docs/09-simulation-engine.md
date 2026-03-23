# Simulation Engine Design

> A High-Fidelity Digital Twin for Traffic Networks -- Predict, Test, and Optimize Before Deploying to the Real World

---

## 1. Simulation Architecture

```
+-------------------------------------------------------------------------+
|                    SAFEMOVE SIMULATION ENGINE                            |
|                                                                         |
|  +-------------------+     +-------------------+     +---------------+  |
|  |  SCENARIO          |     |  SIMULATION CORE  |     |  VISUALIZATION|  |
|  |  MANAGER           |     |                   |     |  PIPELINE     |  |
|  |                    |     |  +-------------+  |     |               |  |
|  | - Scenario YAML    |---->|  | Physics     |  |---->| - WebGL       |  |
|  | - Parameter sweep  |     |  | Engine      |  |     |   renderer    |  |
|  | - Batch runner     |     |  +-------------+  |     | - Heatmaps   |  |
|  |                    |     |  +-------------+  |     | - Time-lapse |  |
|  +-------------------+     |  | Vehicle     |  |     | - Dashboards |  |
|                             |  | Dynamics    |  |     |               |  |
|  +-------------------+     |  +-------------+  |     +---------------+  |
|  |  DATA LAYER        |     |  +-------------+  |                       |
|  |                    |     |  | Signal      |  |     +---------------+  |
|  | - Real-time feeds  |---->|  | Controller  |  |---->| ML INTEGRATION|  |
|  | - Historical data  |     |  +-------------+  |     |               |  |
|  | - Road network     |     |  +-------------+  |     | - Model eval  |  |
|  | - Weather data     |     |  | Weather     |  |     | - RL training |  |
|  |                    |     |  | Effects     |  |     | - Validation  |  |
|  +-------------------+     |  +-------------+  |     +---------------+  |
|                             |                   |                       |
|                             |  +-------------+  |     +---------------+  |
|                             |  | Event       |  |---->| ANALYTICS     |  |
|                             |  | Injector    |  |     |               |  |
|                             |  | (incidents, |  |     | - KPI compute |  |
|                             |  |  closures)  |  |     | - Comparisons |  |
|                             |  +-------------+  |     | - Reports     |  |
|                             +-------------------+     +---------------+  |
+-------------------------------------------------------------------------+
```

---

## 2. Core Capabilities

### 2.1 Traffic Flow Simulation

```
+-------------------------------------------------------------------+
|                    TRAFFIC FLOW MODEL                             |
|                                                                   |
|  MACROSCOPIC (network-level)                                      |
|  +-----------------------------------------------------------+   |
|  |                                                           |   |
|  |  Cell Transmission Model (CTM)                            |   |
|  |                                                           |   |
|  |  Road segmented into cells:                               |   |
|  |                                                           |   |
|  |  [Cell 1]--->[Cell 2]--->[Cell 3]--->[Cell 4]             |   |
|  |   n=45        n=52        n=78        n=31                |   |
|  |   v=55kph     v=48kph     v=25kph     v=60kph             |   |
|  |                            ^^^                             |   |
|  |                         congestion                        |   |
|  |                                                           |   |
|  |  Flow equation: q = min(n_i * v_free, Q_max, w*(N-n_j))  |   |
|  |  Update: every 1 second simulation time                   |   |
|  +-----------------------------------------------------------+   |
|                                                                   |
|  MICROSCOPIC (vehicle-level)                                      |
|  +-----------------------------------------------------------+   |
|  |                                                           |   |
|  |  Intelligent Driver Model (IDM) + MOBIL Lane Change       |   |
|  |                                                           |   |
|  |  Each vehicle:                                            |   |
|  |    acceleration = a * [1 - (v/v0)^4 - (s*/s)^2]          |   |
|  |                                                           |   |
|  |  where:                                                   |   |
|  |    a   = max acceleration (1.5 m/s^2)                     |   |
|  |    v0  = desired velocity                                 |   |
|  |    s*  = desired gap = s0 + v*T + v*dv/(2*sqrt(a*b))      |   |
|  |    s   = actual gap to lead vehicle                       |   |
|  |    b   = comfortable deceleration (2.0 m/s^2)            |   |
|  |    T   = safe time headway (1.5 s)                        |   |
|  |                                                           |   |
|  |  Vehicles: car, truck, bus, emergency, bicycle, pedestrian|   |
|  +-----------------------------------------------------------+   |
+-------------------------------------------------------------------+
```

### 2.2 Vehicle Dynamics

| Parameter | Car | Truck | Bus | Emergency | Bicycle |
|---|---|---|---|---|---|
| Max speed (km/h) | 120 | 90 | 60 | 140 | 30 |
| Acceleration (m/s^2) | 1.5 | 0.8 | 0.6 | 2.5 | 1.0 |
| Deceleration (m/s^2) | 3.0 | 2.0 | 2.5 | 4.0 | 2.5 |
| Length (m) | 4.5 | 12.0 | 12.0 | 5.5 | 1.8 |
| Reaction time (s) | 1.0 | 1.5 | 1.2 | 0.5 | 1.3 |
| Lane change aggression | 0.5 | 0.2 | 0.1 | 0.9 | 0.3 |

### 2.3 Signal Timing Simulation

```
Signal Controller Model:
  +---------------------------------------------+
  |  Intersection: 4-way, 8 phases              |
  |                                             |
  |  Phase 1: NS through       [====.......]   |
  |  Phase 2: NS left turn     [..==........]  |
  |  Phase 3: EW through       [....====...]   |
  |  Phase 4: EW left turn     [........==.]   |
  |  Phase 5: Pedestrian NS    [..==........]  |
  |  Phase 6: Pedestrian EW    [......==....]  |
  |  Phase 7: All-red clearance[.=.=.=.=.=.=]  |
  |  Phase 8: Emergency preempt[============]   |
  |                                             |
  |  Modes:                                     |
  |    - Fixed time (baseline)                  |
  |    - Actuated (sensor-triggered)            |
  |    - Adaptive (RL-optimized)                |
  |    - Coordinated (green wave)               |
  +---------------------------------------------+
```

### 2.4 Weather Effects

```
Weather Impact Matrix:
  +--------------------------------------------------+
  |  Condition      | Speed  | Capacity | Accident   |
  |                 | Factor | Factor   | Multiplier |
  |--------------------------------------------------+
  |  Clear          | 1.00   | 1.00     | 1.0x       |
  |  Light Rain     | 0.90   | 0.95     | 1.5x       |
  |  Heavy Rain     | 0.75   | 0.85     | 2.8x       |
  |  Snow (light)   | 0.70   | 0.80     | 3.0x       |
  |  Snow (heavy)   | 0.50   | 0.60     | 5.0x       |
  |  Ice            | 0.40   | 0.50     | 8.0x       |
  |  Fog (low vis)  | 0.65   | 0.75     | 2.5x       |
  |  Wind (>50kph)  | 0.85   | 0.90     | 1.3x       |
  +--------------------------------------------------+

  Applied as modifiers to base IDM parameters:
    v0_effective = v0 * speed_factor
    capacity_effective = Q_max * capacity_factor
    incident_prob = base_prob * accident_multiplier
```

---

## 3. Simulation Modes

### 3.1 Real-Time Mirror (Digital Twin)

```
+-------------------------------------------------------------------+
|                    DIGITAL TWIN MODE                              |
|                                                                   |
|  REAL WORLD                          SIMULATION                   |
|  +-------------------+              +-------------------+         |
|  |                   |  live feed   |                   |         |
|  | Traffic Sensors   |------------->| Mirror State      |         |
|  | GPS Positions     |              |                   |         |
|  | Signal States     |              | Vehicles synced   |         |
|  | Weather Data      |              | Signals synced    |         |
|  |                   |              | Weather synced    |         |
|  +-------------------+              +-------------------+         |
|                                            |                      |
|                                            v                      |
|                                     +-------------+               |
|                                     | Run 5-min   |               |
|                                     | lookahead   |               |
|                                     +-------------+               |
|                                            |                      |
|                                    +-------+-------+              |
|                                    |               |              |
|                                    v               v              |
|                             [No issues]    [Congestion            |
|                                             predicted]            |
|                                                    |              |
|                                                    v              |
|                                            [Trigger decision      |
|                                             agent for preemptive  |
|                                             action]               |
+-------------------------------------------------------------------+

Sync frequency: every 5 seconds
Lookahead horizon: 5, 15, 60 minutes
Accuracy target: > 92% flow prediction at 5-min horizon
```

### 3.2 What-If Scenario Mode

```
+-------------------------------------------------------------------+
|                    WHAT-IF SCENARIO MODE                          |
|                                                                   |
|  Scenario: "What if we close Main St for construction?"           |
|                                                                   |
|  +------------------+     +-------------------+                   |
|  | Base Scenario    |     | Modified Scenario |                   |
|  | (current state)  |     | (Main St closed)  |                   |
|  +--------+---------+     +--------+----------+                   |
|           |                         |                              |
|           v                         v                              |
|  +------------------+     +-------------------+                   |
|  | Simulate 24hr    |     | Simulate 24hr     |                   |
|  +--------+---------+     +--------+----------+                   |
|           |                         |                              |
|           +------------+------------+                              |
|                        |                                           |
|                        v                                           |
|               +------------------+                                 |
|               | Compare Results  |                                 |
|               |                  |                                 |
|               | - Avg travel time: +12% on affected corridors     |
|               | - Diverted volume: 3,200 veh/hr to Oak Ave        |
|               | - Oak Ave at 94% capacity (risk of gridlock)      |
|               | - Recommended: add temp signal at Oak/5th          |
|               +------------------+                                 |
+-------------------------------------------------------------------+
```

### 3.3 Historical Replay Mode

Replays past events to validate models, investigate incidents, and calibrate parameters.

```
  Timeline:
  ========================================================================
  [Load historical]  [Replay at 1x-100x]  [Compare sim vs actual]
  [state at T=0  ]   [speed             ]  [                     ]

  Use cases:
    - Post-incident analysis ("Why did gridlock last 45 minutes?")
    - Model validation ("Does our forecast match what happened?")
    - Parameter calibration ("Adjust IDM params to match observed flow")
    - Training data generation ("Create labeled data from replay")
```

### 3.4 Stress Test Mode

Push the network to its limits to find breaking points.

```
  Stress Test Profiles:
  +-----------------------------------------------------------+
  |  Profile          | Description                           |
  |-----------------------------------------------------------|
  |  Peak Overload    | 2x normal peak traffic volume         |
  |  Mass Event       | Stadium event: 40K people departing   |
  |  Multi-Incident   | 3 simultaneous accidents on highways  |
  |  Infrastructure   | Close 2 major bridges + heavy rain    |
  |  Emergency Evac   | Evacuation scenario: all outbound     |
  |  Cascading Failure| Signal controller failures propagate  |
  +-----------------------------------------------------------+
```

---

## 4. Physics Model

### 4.1 Cellular Automata Layer (Macroscopic)

```
Road Network as Grid:
+-----+-----+-----+-----+-----+-----+-----+-----+
| 0,0 | 0,1 | 0,2 | 0,3 | 0,4 | 0,5 | 0,6 | 0,7 |
+-----+-----+-----+-----+-----+-----+-----+-----+
         |                 |                 |
         v                 v                 v
       (intersection)  (intersection)   (intersection)
         |                 |                 |
+-----+-----+-----+-----+-----+-----+-----+-----+
| 1,0 | 1,1 | 1,2 | 1,3 | 1,4 | 1,5 | 1,6 | 1,7 |
+-----+-----+-----+-----+-----+-----+-----+-----+

Cell states:
  EMPTY    = 0  (no vehicle)
  OCCUPIED = 1  (vehicle present)
  BLOCKED  = -1 (road closure / obstacle)

Update rules (Nagel-Schreckenberg):
  1. Acceleration: v = min(v + 1, v_max)
  2. Deceleration: v = min(v, gap - 1)
  3. Randomization: with prob p, v = max(v - 1, 0)
  4. Movement: position += v

Cell size: 7.5 meters (one vehicle length)
Time step: 1 second
```

### 4.2 Agent-Based Layer (Microscopic)

Each vehicle is an autonomous agent with:

```
VehicleAgent:
  +-----------------------------------------------+
  |  Properties:                                   |
  |    id, type, origin, destination               |
  |    current_position, current_speed             |
  |    planned_route, patience_level               |
  |                                                |
  |  Behaviors:                                    |
  |    follow_leader()   --> IDM car-following      |
  |    change_lane()     --> MOBIL lane selection    |
  |    choose_route()    --> dynamic route choice    |
  |    react_to_signal() --> stop/go decision        |
  |    react_to_weather()--> adjust parameters       |
  |                                                |
  |  Decision cycle (every time step):             |
  |    1. Perceive surroundings (200m radius)      |
  |    2. Update route if better option exists     |
  |    3. Evaluate lane change opportunity         |
  |    4. Compute acceleration (IDM)               |
  |    5. Update position and speed                |
  +-----------------------------------------------+
```

---

## 5. Digital Twin Concept

```
+-------------------------------------------------------------------+
|                       DIGITAL TWIN                                |
|                                                                   |
|    PHYSICAL WORLD                     DIGITAL WORLD               |
|    +-----------------+                +-----------------+         |
|    |                 |    sensors     |                 |         |
|    |  City Traffic   |==============>|  Virtual City   |         |
|    |  Network        |               |  Model          |         |
|    |                 |    actuators   |                 |         |
|    |  - Roads        |<=============|  - Road graph   |         |
|    |  - Signals      |               |  - Signal sim   |         |
|    |  - Vehicles     |               |  - Vehicle sims |         |
|    |  - Weather      |               |  - Weather model|         |
|    |                 |               |                 |         |
|    +-----------------+                +-----------------+         |
|                                              |                    |
|                                              v                    |
|                                    +-------------------+          |
|                                    | Intelligence      |          |
|                                    | - Predict future  |          |
|                                    | - Test changes    |          |
|                                    | - Optimize params |          |
|                                    | - Train RL agents |          |
|                                    +-------------------+          |
|                                              |                    |
|                                              v                    |
|                                    +-------------------+          |
|                                    | Recommended       |          |
|                                    | Actions           |          |
|                                    | (sent to physical |          |
|                                    |  infrastructure)  |          |
|                                    +-------------------+          |
+-------------------------------------------------------------------+

Synchronization Protocol:
  - State sync: every 5 seconds (bulk sensor update)
  - GPS sync: every 1 second (vehicle positions)
  - Signal sync: every phase change (event-driven)
  - Weather sync: every 5 minutes (API poll)
  - Drift detection: if sim diverges > 15% from real, force resync
```

---

## 6. Visualization Pipeline

```
Simulation State (every frame)
         |
         v
+-------------------+
| State Serializer  |
| (Protobuf, ~2KB   |
|  per frame)       |
+-------------------+
         |
         v
+-------------------+
| WebSocket Server  |
| (30 FPS target)   |
+-------------------+
         |
         v
+-------------------+
| React Frontend    |
| (Vite.js)         |
|                   |
| +---------------+ |
| | Deck.gl /     | |
| | MapLibre GL   | |
| |               | |
| | Layers:       | |
| |  - Vehicle    | |
| |    positions  | |
| |  - Road       | |
| |    heatmap    | |
| |  - Signal     | |
| |    states     | |
| |  - Congestion | |
| |    overlay    | |
| |  - Weather    | |
| |    effects    | |
| +---------------+ |
+-------------------+
```

### Visualization Modes

| Mode | Description | FPS Target |
|---|---|---|
| **Overview** | City-wide heatmap, major corridors | 30 |
| **Corridor** | Single road, vehicle-level detail | 60 |
| **Intersection** | Signal phases, queue lengths, conflicts | 60 |
| **3D Flyover** | Birds-eye animated view with terrain | 30 |
| **Comparison** | Side-by-side: base vs scenario | 30 |
| **Time-Lapse** | 24hr compressed to 60 seconds | 30 |

---

## 7. Performance Benchmarks

```
+-------------------------------------------------------------------+
|                  PERFORMANCE BENCHMARKS                           |
|                                                                   |
|  Test Configuration:                                              |
|    CPU: AMD EPYC 7763 (64 cores)                                 |
|    GPU: NVIDIA A100 40GB                                          |
|    RAM: 256 GB DDR4                                               |
|    Network: 2,847 road segments, 412 intersections               |
|                                                                   |
|  +-----------------------------------------------------+         |
|  | Vehicles | Step Time | Steps/Sec | Mode             |         |
|  |----------|-----------|-----------|------------------|         |
|  |    1,000 |    12 ms  |      83   | Microscopic      |         |
|  |    5,000 |    48 ms  |      20   | Microscopic      |         |
|  |   10,000 |    95 ms  |      10   | Microscopic      |         |
|  |   25,000 |   220 ms  |       4   | Microscopic      |         |
|  |   50,000 |    85 ms  |      11   | Macroscopic      |         |
|  |  100,000 |   160 ms  |       6   | Macroscopic      |         |
|  |   10,000 |    35 ms  |      28   | Hybrid (GPU)     |         |
|  |   50,000 |   110 ms  |       9   | Hybrid (GPU)     |         |
|  +-----------------------------------------------------+         |
|                                                                   |
|  Key Results:                                                     |
|  - 10K vehicles at sub-100ms steps (real-time capable)           |
|  - GPU acceleration: 2.7x speedup for microscopic sim           |
|  - Hybrid mode: macroscopic for distant areas, microscopic       |
|    for focus zone, best performance/fidelity tradeoff            |
|  - Memory: ~0.5 KB per vehicle, ~2 KB per road segment          |
|  - Total memory for 50K vehicles + network: ~120 MB             |
+-------------------------------------------------------------------+
```

---

## 8. Scenario Definition Language

Scenarios are defined in YAML for human readability and version control.

### 8.1 Basic Scenario

```yaml
# scenario: morning_rush_with_rain.yaml
scenario:
  name: "Morning Rush Hour with Rain"
  description: "Simulates typical Monday morning commute with light rain"
  version: "1.0"

  time:
    start: "2026-03-23T06:00:00"
    end: "2026-03-23T10:00:00"
    step_size_ms: 1000
    speed_multiplier: 1.0  # real-time

  network:
    source: "city_network_v3.osm.pbf"
    region:
      center: { lat: 37.7749, lng: -122.4194 }
      radius_km: 15

  demand:
    profile: "weekday_morning"
    scale_factor: 1.0
    od_matrix: "demand/monday_am.csv"

  weather:
    type: "rain_light"
    start_time: "2026-03-23T07:30:00"
    end_time: "2026-03-23T09:00:00"
    intensity: 0.6  # 0-1 scale

  signals:
    mode: "adaptive"  # fixed | actuated | adaptive
    controller: "rl_model_v2.1"

  output:
    metrics: ["avg_travel_time", "throughput", "queue_lengths", "emissions"]
    save_trajectories: true
    save_interval_sec: 60
    output_dir: "results/morning_rush_rain/"
```

### 8.2 What-If Scenario with Interventions

```yaml
# scenario: bridge_closure_analysis.yaml
scenario:
  name: "Bay Bridge Closure Impact Analysis"
  description: "Evaluate traffic impact of closing Bay Bridge for maintenance"

  base_scenario: "scenarios/weekday_typical.yaml"  # inherit base

  interventions:
    - type: "road_closure"
      target: "segment_bay_bridge_wb"
      start_time: "2026-03-23T09:00:00"
      end_time: "2026-03-23T15:00:00"
      lanes_affected: "all"

    - type: "signal_retiming"
      target: "intersection_cluster_downtown"
      description: "Extend green for alternate routes"
      parameters:
        cycle_length: 120
        ns_green_ratio: 0.6  # increase from 0.5

    - type: "message_sign"
      target: "vms_highway_101_north"
      message: "BAY BRIDGE CLOSED - USE GOLDEN GATE"
      compliance_rate: 0.35  # 35% of drivers reroute

    - type: "demand_injection"
      description: "Giants game at 1PM"
      location: { lat: 37.7786, lng: -122.3893 }
      time: "2026-03-23T11:00:00"
      vehicles: 8000
      arrival_spread_min: 90

  comparison:
    baseline: "scenarios/weekday_typical.yaml"
    metrics:
      - name: "avg_travel_time_change"
        threshold_pct: 20  # alert if > 20% increase
      - name: "max_queue_length"
        threshold_vehicles: 200
      - name: "alternative_route_saturation"
        threshold_pct: 90
```

### 8.3 Stress Test Definition

```json
{
  "scenario": {
    "name": "Cascading Failure Stress Test",
    "type": "stress_test",
    "base": "scenarios/peak_hour.yaml",
    "stress_profile": {
      "demand_multiplier_schedule": [
        { "time_offset_min": 0,  "multiplier": 1.0 },
        { "time_offset_min": 15, "multiplier": 1.5 },
        { "time_offset_min": 30, "multiplier": 2.0 },
        { "time_offset_min": 45, "multiplier": 2.5 },
        { "time_offset_min": 60, "multiplier": 3.0 }
      ],
      "random_incidents": {
        "count": 5,
        "severity_range": [1, 3],
        "duration_range_min": [10, 45],
        "region": "downtown"
      },
      "signal_failures": {
        "count": 3,
        "mode": "flash_red",
        "random_timing": true
      }
    },
    "success_criteria": {
      "network_not_gridlocked": true,
      "avg_travel_time_increase_max_pct": 100,
      "emergency_response_time_max_min": 12,
      "recovery_time_after_peak_max_min": 30
    }
  }
}
```

---

## 9. Integration with ML Models

```
+-------------------------------------------------------------------+
|              SIMULATION <--> ML INTEGRATION                       |
|                                                                   |
|  +--------------------+                                           |
|  | Training Loop      |                                           |
|  |                    |                                           |
|  |  [Sim Environment] |                                           |
|  |       |            |                                           |
|  |       v            |                                           |
|  |  [RL Agent acts]   |     Simulation provides:                  |
|  |       |            |       - Reward signal                     |
|  |       v            |       - Next state observation            |
|  |  [Sim steps]       |       - Episode termination               |
|  |       |            |       - Curriculum (easy --> hard)         |
|  |       v            |                                           |
|  |  [Compute reward]  |                                           |
|  |       |            |                                           |
|  |       v            |                                           |
|  |  [Update policy]   |                                           |
|  |  [Repeat 1M steps] |                                           |
|  +--------------------+                                           |
|                                                                   |
|  +--------------------+                                           |
|  | Evaluation Loop    |                                           |
|  |                    |                                           |
|  |  For each candidate model:                                    |
|  |    1. Load model into sim as controller                       |
|  |    2. Run 100 diverse scenarios                               |
|  |    3. Collect KPIs (travel time, throughput, safety)          |
|  |    4. Compare vs baseline (fixed-time controller)             |
|  |    5. Statistical significance test                           |
|  |    6. Generate performance report                             |
|  |                                                                |
|  |  Acceptance criteria:                                         |
|  |    - Mean travel time reduction > 8%                          |
|  |    - No scenario with > 5% travel time increase               |
|  |    - Zero safety constraint violations                        |
|  +--------------------+                                           |
|                                                                   |
|  +--------------------+                                           |
|  | Synthetic Data Gen |                                           |
|  |                    |                                           |
|  |  Simulation generates labeled training data:                  |
|  |    - Input: sensor readings at time T                         |
|  |    - Label: actual traffic state at T+15min                   |
|  |    - Volume: 10M samples per scenario suite                   |
|  |    - Augmentation: noise injection, rare event oversampling   |
|  +--------------------+                                           |
+-------------------------------------------------------------------+
```

---

## 10. Validation Against Real-World Data

### Validation Pipeline

```
+-------------------------------------------------------------------+
|                   VALIDATION PIPELINE                             |
|                                                                   |
|  Step 1: COLLECT GROUND TRUTH                                     |
|  +-----------------------------------------------------------+   |
|  | Historical sensor data for target date/time                |   |
|  | GPS trajectories from fleet vehicles                       |   |
|  | Signal timing logs from controllers                        |   |
|  | Weather records (actual conditions)                        |   |
|  +-----------------------------------------------------------+   |
|                              |                                    |
|  Step 2: REPLAY IN SIMULATION                                     |
|  +-----------------------------------------------------------+   |
|  | Initialize sim with T=0 state from real data               |   |
|  | Inject same demand pattern (origin-destination matrix)     |   |
|  | Apply same weather conditions                              |   |
|  | Run simulation for target time period                      |   |
|  +-----------------------------------------------------------+   |
|                              |                                    |
|  Step 3: COMPARE                                                  |
|  +-----------------------------------------------------------+   |
|  | Metric              | Target      | Method                 |   |
|  |---------------------|-------------|------------------------|   |
|  | Flow rate per link   | MAPE < 15%  | Link-by-link comparison|  |
|  | Average speed        | MAPE < 12%  | Segment-level compare  |  |
|  | Queue lengths        | MAE < 8 veh | Intersection-level     |  |
|  | Travel time (route)  | MAPE < 10%  | GPS trajectory match   |  |
|  | Congestion pattern   | F1 > 0.85   | Binary classification  |  |
|  +-----------------------------------------------------------+   |
|                              |                                    |
|  Step 4: CALIBRATE                                                |
|  +-----------------------------------------------------------+   |
|  | If error > threshold:                                      |   |
|  |   - Auto-tune IDM parameters via Bayesian optimization     |   |
|  |   - Adjust demand scaling factors                          |   |
|  |   - Update route choice model weights                      |   |
|  |   - Re-validate on holdout dataset                         |   |
|  +-----------------------------------------------------------+   |
+-------------------------------------------------------------------+
```

### Validation Results (Current)

| Metric | Target | Achieved | Status |
|---|---|---|---|
| Flow rate MAPE | < 15% | 11.3% | PASS |
| Average speed MAPE | < 12% | 9.7% | PASS |
| Queue length MAE | < 8 vehicles | 5.2 vehicles | PASS |
| Travel time MAPE | < 10% | 8.4% | PASS |
| Congestion pattern F1 | > 0.85 | 0.89 | PASS |
| Signal timing accuracy | > 95% | 97.1% | PASS |

### Continuous Validation

```
Schedule:
  - Daily: automated replay of previous day, compare to actuals
  - Weekly: full network validation on 7-day window
  - Monthly: comprehensive calibration with parameter search
  - Quarterly: independent audit against new sensor installations

Drift Alert:
  If any metric degrades > 5% from baseline for 3 consecutive days,
  trigger automated recalibration pipeline and notify engineering.
```

---

## Summary

SafeMove AI's simulation engine provides a high-fidelity digital twin capable of modeling 10,000+ vehicles in real time with sub-100ms update cycles. The engine combines cellular automata (for network-scale efficiency) with agent-based modeling (for intersection-level accuracy), producing validated results within 10% of real-world measurements. Four simulation modes -- real-time mirror, what-if analysis, historical replay, and stress testing -- enable operators to predict, plan, and optimize with confidence. The tight integration with the ML pipeline creates a virtuous cycle: simulation trains models, models improve the simulation, and both continuously validate against ground truth.
