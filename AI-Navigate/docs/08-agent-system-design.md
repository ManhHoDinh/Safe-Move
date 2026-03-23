# Multi-Agent System Design

> Autonomous, Collaborative Intelligence -- A Swarm of Specialized Agents Powering SafeMove AI

---

## 1. Agent Architecture Overview

```
+-------------------------------------------------------------------------+
|                     SAFEMOVE MULTI-AGENT SYSTEM                         |
|                                                                         |
|                      +---------------------+                            |
|                      |  ORCHESTRATOR AGENT |                            |
|                      |  (Coordinator)      |                            |
|                      +----------+----------+                            |
|                                 |                                       |
|            +--------------------+--------------------+                  |
|            |          |          |          |         |                  |
|            v          v          v          v         v                  |
|     +-----------+ +--------+ +--------+ +--------+ +--------+          |
|     |  DATA     | |ANALYSIS| |PREDICT | |DECISION| |REPORT  |          |
|     |  CRAWLER  | | AGENTS | | AGENTS | | AGENTS | | AGENTS |          |
|     |  AGENTS   | |        | |        | |        | |        |          |
|     +-----------+ +--------+ +--------+ +--------+ +--------+          |
|     | Traffic   | |Pattern | |Forecast| |Routing | |LLM     |          |
|     | GPS       | |Anomaly | |Trend   | |Signal  | |Summary |          |
|     | Weather   | |Cluster | |Demand  | |Fleet   | |Alert   |          |
|     | Events    | |Correla.| |Risk    | |Balance | |Report  |          |
|     +-----------+ +--------+ +--------+ +--------+ +--------+          |
|            |          |          |          |         |                  |
|            +----------+----------+----------+---------+                  |
|                                 |                                       |
|                      +----------+----------+                            |
|                      |  SHARED STATE       |                            |
|                      |  (Redis + Kafka)    |                            |
|                      +---------------------+                            |
|                                                                         |
|    +-------------+  +----------------+  +-------------------+           |
|    | Agent       |  | Message Bus    |  | Health Monitor    |           |
|    | Registry    |  | (Kafka topics) |  | (Heartbeat/Watch) |           |
|    +-------------+  +----------------+  +-------------------+           |
+-------------------------------------------------------------------------+
```

---

## 2. Agent Types

### 2.1 Data Crawler Agents

Data crawler agents are the sensory organs of the platform. Each crawler specializes in one data domain, converting external signals into normalized internal events.

```
+-------------------------------------------------------------------+
|                     DATA CRAWLER AGENTS                           |
|                                                                   |
|  +---------------+  +---------------+  +---------------+         |
|  | TrafficSensor |  | GPSTracker    |  | WeatherCrawler|         |
|  | Crawler       |  | Crawler       |  |               |         |
|  |               |  |               |  |               |         |
|  | Sources:      |  | Sources:      |  | Sources:      |         |
|  | - Loop detect |  | - Fleet GPS   |  | - OpenWeather |         |
|  | - Radar       |  | - Rideshare   |  | - NWS API     |         |
|  | - Camera feed |  | - Public trans|  | - NOAA        |         |
|  |               |  |               |  |               |         |
|  | Protocol:     |  | Protocol:     |  | Protocol:     |         |
|  |  MQTT, HTTP   |  |  Protobuf/TCP |  |  REST polling |         |
|  |               |  |               |  |  (5 min)      |         |
|  | Rate:         |  | Rate:         |  |               |         |
|  |  10K msg/sec  |  |  50K pos/sec  |  | Rate:         |         |
|  +---------------+  +---------------+  |  200 req/min  |         |
|                                        +---------------+         |
|  +---------------+  +---------------+                            |
|  | EventCrawler  |  | SocialCrawler |                            |
|  |               |  |               |                            |
|  | Sources:      |  | Sources:      |                            |
|  | - Eventbrite  |  | - X/Twitter   |                            |
|  | - City permits|  | - Waze reports|                            |
|  | - School cal. |  | - News feeds  |                            |
|  | - Sports sched|  |               |                            |
|  |               |  | NLP Pipeline: |                            |
|  | Protocol:     |  |  - Sentiment  |                            |
|  |  REST, RSS    |  |  - NER (loc)  |                            |
|  +---------------+  |  - Classify   |                            |
|                      +---------------+                            |
+-------------------------------------------------------------------+
```

**Crawler Agent Interface:**

```python
class BaseCrawlerAgent:
    """Base class for all data crawler agents."""

    agent_type: str = "crawler"

    async def connect(self) -> None:
        """Establish connection to data source."""

    async def fetch(self) -> list[RawEvent]:
        """Pull or receive new data from source."""

    async def normalize(self, raw: RawEvent) -> NormalizedEvent:
        """Convert source-specific format to platform schema."""

    async def validate(self, event: NormalizedEvent) -> bool:
        """Schema validation + sanity checks (range, freshness)."""

    async def emit(self, event: NormalizedEvent) -> None:
        """Publish validated event to Kafka topic."""

    async def health_check(self) -> HealthStatus:
        """Report connectivity, lag, error rate."""
```

### 2.2 Analysis Agents

Analysis agents consume enriched data streams and extract higher-order intelligence: patterns, anomalies, correlations, and clusters.

```
+-------------------------------------------------------------------+
|                      ANALYSIS AGENTS                              |
|                                                                   |
|  +--------------------+      +--------------------+               |
|  | PatternDetector    |      | AnomalyDetector    |               |
|  |                    |      |                    |               |
|  | Detects:           |      | Detects:           |               |
|  |  - Recurring       |      |  - Sudden speed    |               |
|  |    congestion      |      |    drops (Z > 3)   |               |
|  |  - Time-of-day     |      |  - Unusual volume  |               |
|  |    patterns        |      |    (isolation forest|               |
|  |  - Seasonal trends |      |  - Sensor failures |               |
|  |  - Event impact    |      |    (flat readings) |               |
|  |    signatures      |      |  - GPS spoofing    |               |
|  |                    |      |                    |               |
|  | Methods:           |      | Methods:           |               |
|  |  - DBSCAN cluster  |      |  - Isolation Forest|               |
|  |  - DTW similarity  |      |  - LSTM Autoencoder|               |
|  |  - Fourier analysis|      |  - Statistical (KS)|               |
|  +--------------------+      +--------------------+               |
|                                                                   |
|  +--------------------+      +--------------------+               |
|  | CorrelationAgent   |      | ClusterAgent       |               |
|  |                    |      |                    |               |
|  | Finds links:       |      | Groups:            |               |
|  |  - Weather <-> flow|      |  - Similar road    |               |
|  |  - Events <-> delay|      |    segments        |               |
|  |  - Incident <->    |      |  - Co-congested    |               |
|  |    cascade effects |      |    corridors       |               |
|  |                    |      |  - Vehicle fleets  |               |
|  | Method:            |      |    by behavior     |               |
|  |  - Granger causal  |      |                    |               |
|  |  - Mutual info     |      | Method:            |               |
|  |  - Transfer entropy|      |  - Spectral cluster|               |
|  +--------------------+      |  - K-means on embeds|              |
|                               +--------------------+               |
+-------------------------------------------------------------------+
```

### 2.3 Prediction Agents

Prediction agents wrap ML models with autonomous decision-making: they select models, blend forecasts, and manage uncertainty.

```
+-------------------------------------------------------------------+
|                     PREDICTION AGENTS                             |
|                                                                   |
|  +----------------------------+                                   |
|  | ForecastAgent              |                                   |
|  |                            |                                   |
|  | Input:  enriched traffic   |                                   |
|  |         + feature store    |                                   |
|  |                            |                                   |
|  | Models (ensemble):         |                                   |
|  |   - TFT (primary)         |   Confidence Interval:            |
|  |   - Prophet (baseline)    |   +---------+---------+           |
|  |   - LSTM (fallback)       |   |  Lower  |  Upper  |           |
|  |                            |   |  Bound  |  Bound  |           |
|  | Output: point forecast     |   |  (10%)  |  (90%)  |           |
|  |       + confidence bands   |   +---------+---------+           |
|  |       + model weights      |                                   |
|  +----------------------------+                                   |
|                                                                   |
|  +----------------------------+  +----------------------------+   |
|  | TrendAgent                 |  | RiskAgent                  |   |
|  |                            |  |                            |   |
|  | Detects emerging trends:   |  | Computes risk scores:      |   |
|  |  - Congestion building     |  |  - Accident probability    |   |
|  |  - Traffic shifting routes |  |  - Congestion severity     |   |
|  |  - Demand surge forming    |  |  - Infrastructure stress   |   |
|  |                            |  |  - Safety hazard level     |   |
|  | Horizon: 5min to 24hr      |  |                            |   |
|  | Publishes: TrendAlert      |  | Publishes: RiskScore       |   |
|  +----------------------------+  +----------------------------+   |
+-------------------------------------------------------------------+
```

### 2.4 Decision Agents

Decision agents translate intelligence into action. They consume predictions and analysis, apply constraints and objectives, and output executable decisions.

```
+-------------------------------------------------------------------+
|                      DECISION AGENTS                              |
|                                                                   |
|  +---------------------+        +---------------------+          |
|  | RoutingAgent         |        | SignalTimingAgent    |          |
|  |                      |        |                     |          |
|  | Input:               |        | Input:              |          |
|  |  - Current traffic   |        |  - Queue lengths    |          |
|  |  - Predictions       |        |  - Phase state      |          |
|  |  - Road network graph|        |  - Predictions      |          |
|  |  - User constraints  |        |  - Emergency flags  |          |
|  |                      |        |                     |          |
|  | Algorithm:           |        | Algorithm:          |          |
|  |  - A* with learned   |        |  - PPO RL policy    |          |
|  |    edge weights      |        |  - Safety constraints|         |
|  |  - Multi-objective   |        |  - Min/max green    |          |
|  |    (time, safety,    |        |                     |          |
|  |     emissions)       |        | Output:             |          |
|  |                      |        |  - Next phase       |          |
|  | Output:              |        |  - Phase duration   |          |
|  |  - Top 3 routes      |        |  - Coordination plan|          |
|  |  - ETA estimates     |        +---------------------+          |
|  +---------------------+                                         |
|                                                                   |
|  +---------------------+        +---------------------+          |
|  | FleetDispatchAgent   |        | DemandBalanceAgent   |          |
|  |                      |        |                     |          |
|  | Assigns vehicles to  |        | Redistributes       |          |
|  | tasks optimally:     |        | resources across    |          |
|  |  - Minimize total    |        | zones:              |          |
|  |    travel time       |        |  - Emergency units  |          |
|  |  - Balance workload  |        |  - Public transit   |          |
|  |  - Respect SLAs      |        |  - Traffic officers |          |
|  |                      |        |                     |          |
|  | Algorithm:           |        | Algorithm:          |          |
|  |  - Hungarian method  |        |  - LP + forecast    |          |
|  |  - OR-Tools VRP      |        |  - Rebalance every  |          |
|  +---------------------+        |    15 minutes       |          |
|                                  +---------------------+          |
+-------------------------------------------------------------------+
```

### 2.5 Reporting Agents

Reporting agents use LLM capabilities to transform raw analytics into human-readable intelligence.

```
+-------------------------------------------------------------------+
|                     REPORTING AGENTS                              |
|                                                                   |
|  +---------------------------+                                    |
|  | SummaryAgent (LLM-powered)|                                    |
|  |                           |                                    |
|  | LangChain pipeline:       |                                    |
|  |                           |                                    |
|  | [Structured Data]         |                                    |
|  |       |                   |                                    |
|  |       v                   |                                    |
|  | [Data Formatter]          |     Output Examples:               |
|  |       |                   |     - "Downtown congestion was     |
|  |       v                   |       23% above average today,    |
|  | [Prompt Template]         |       primarily driven by the     |
|  |       |                   |       Mariners game at 7pm.       |
|  |       v                   |       Recommend deploying 3       |
|  | [LLM (Llama 3)]          |       additional signal officers  |
|  |       |                   |       on 4th Ave corridor for     |
|  |       v                   |       tomorrow's rematch."        |
|  | [Output Parser]           |                                    |
|  |       |                   |                                    |
|  |       v                   |                                    |
|  | [Formatted Report]        |                                    |
|  +---------------------------+                                    |
|                                                                   |
|  +---------------------------+  +---------------------------+     |
|  | AlertNarrativeAgent       |  | DashboardInsightAgent     |     |
|  |                           |  |                           |     |
|  | Converts raw anomaly      |  | Generates contextual     |     |
|  | alerts into actionable    |  | insights for dashboard   |     |
|  | human-readable messages   |  | widgets in natural       |     |
|  | with context and          |  | language, updated every  |     |
|  | recommended actions.      |  | 60 seconds.             |     |
|  +---------------------------+  +---------------------------+     |
+-------------------------------------------------------------------+
```

### 2.6 Orchestrator Agent

The Orchestrator is the brain of the multi-agent system. It manages agent lifecycles, resolves conflicts, allocates resources, and ensures system-wide coherence.

```
+-------------------------------------------------------------------+
|                     ORCHESTRATOR AGENT                            |
|                                                                   |
|  +-----------------------------------------------------------+   |
|  |                    TASK PLANNER                            |   |
|  |                                                           |   |
|  |  Incoming Event/Request                                   |   |
|  |         |                                                 |   |
|  |         v                                                 |   |
|  |  [Classify Task Type]                                     |   |
|  |         |                                                 |   |
|  |         v                                                 |   |
|  |  [Build Execution DAG]                                    |   |
|  |         |                                                 |   |
|  |    +----+----+----+                                       |   |
|  |    |    |    |    |                                       |   |
|  |    v    v    v    v                                       |   |
|  |  [Assign to Agent Pool]                                   |   |
|  |         |                                                 |   |
|  |         v                                                 |   |
|  |  [Monitor Execution]                                      |   |
|  |         |                                                 |   |
|  |    +----+----+                                            |   |
|  |    |         |                                            |   |
|  |    v         v                                            |   |
|  | [Success]  [Failure --> Retry/Reassign/Escalate]          |   |
|  |    |                                                      |   |
|  |    v                                                      |   |
|  | [Aggregate Results]                                       |   |
|  |    |                                                      |   |
|  |    v                                                      |   |
|  | [Emit Decision/Report]                                    |   |
|  +-----------------------------------------------------------+   |
|                                                                   |
|  Responsibilities:                                                |
|  - Priority queue management (emergency > real-time > batch)     |
|  - Agent health monitoring (heartbeat every 10s)                 |
|  - Conflict resolution (see Section 5)                           |
|  - Resource allocation (CPU/GPU budgets per agent type)          |
|  - Circuit breaker (disable failing agents, reroute work)        |
|  - Audit trail (log all decisions for compliance)                |
+-------------------------------------------------------------------+
```

---

## 3. Agent Communication Protocol

### 3.1 Message Format

All inter-agent communication uses a standardized envelope over Kafka topics.

```
+-------------------------------------------------------------------+
|                   AGENT MESSAGE ENVELOPE                          |
+-------------------------------------------------------------------+
| Field              | Type     | Description                       |
|--------------------|----------|-----------------------------------|
| message_id         | UUID     | Unique message identifier         |
| correlation_id     | UUID     | Links related messages in a flow  |
| source_agent       | string   | Sending agent ID                  |
| target_agent       | string   | Receiving agent ID (or "*" for    |
|                    |          | broadcast)                        |
| message_type       | enum     | REQUEST, RESPONSE, EVENT, COMMAND |
| priority           | int      | 0 (low) to 9 (critical)          |
| timestamp          | datetime | ISO 8601 with microseconds       |
| ttl_ms             | int      | Time-to-live (expire if unread)   |
| payload            | object   | Type-specific data                |
| trace_context      | object   | OpenTelemetry span context        |
+-------------------------------------------------------------------+
```

### 3.2 Communication Patterns

```
PATTERN 1: Publish-Subscribe (one-to-many)
+----------+      +-------+      +----------+
| Crawler  |----->| Kafka |----->| Analysis |
| Agent    |      | Topic |--+-->| Agent A  |
+----------+      +-------+  |   +----------+
                              |   +----------+
                              +-->| Analysis |
                                  | Agent B  |
                                  +----------+

PATTERN 2: Request-Reply (one-to-one)
+----------+  request   +----------+
| Decision |----------->| Predict  |
| Agent    |<-----------| Agent    |
+----------+  response  +----------+
  (via reply topic with correlation_id)

PATTERN 3: Pipeline (chain)
+--------+    +--------+    +--------+    +--------+
|Crawler |===>|Analysis|===>|Predict |===>|Decision|
| Agent  |    | Agent  |    | Agent  |    | Agent  |
+--------+    +--------+    +--------+    +--------+

PATTERN 4: Scatter-Gather (orchestrated fan-out)
                  +--------+
            +---->|Agent A |----+
            |     +--------+    |
+------+    |     +--------+    |    +------+
|Orch. |----+---->|Agent B |----+--->|Orch. |
|Agent |    |     +--------+    |    |Agent |
|(fan  |    |     +--------+    |    |(gath)|
| out) |    +---->|Agent C |----+    +------+
+------+          +--------+
```

### 3.3 Topic Topology

```
Kafka Topics:
  agent.crawler.traffic-raw         (crawlers --> enrichment)
  agent.crawler.gps-raw             (crawlers --> enrichment)
  agent.crawler.weather             (crawlers --> enrichment)
  agent.crawler.events              (crawlers --> enrichment)
  agent.analysis.patterns           (analysis --> prediction, reporting)
  agent.analysis.anomalies          (analysis --> decision, reporting)
  agent.prediction.forecasts        (prediction --> decision, reporting)
  agent.prediction.risks            (prediction --> decision, notification)
  agent.decision.routes             (decision --> presentation)
  agent.decision.signals            (decision --> signal controllers)
  agent.reporting.summaries         (reporting --> presentation)
  agent.orchestrator.commands       (orchestrator --> all agents)
  agent.orchestrator.health         (all agents --> orchestrator)
  agent.deadletter                  (failed messages)
```

---

## 4. Agent Lifecycle Management

```
                    +-------------------+
                    |    REGISTERED     |
                    | (in agent registry|
                    |  but not running) |
                    +---------+---------+
                              |
                              | deploy
                              v
                    +-------------------+
                    |   INITIALIZING    |
                    | (loading models,  |
                    |  connecting to    |
                    |  data sources)    |
                    +---------+---------+
                              |
                              | ready
                              v
              +----------> ACTIVE <-----------+
              |           (processing         |
              |            messages)           |
              |               |               |
              |    +----------+----------+    |
              |    |          |          |    |
              |    v          v          v    |
          recovered      degraded     paused
              |    |          |          |    |
              |    v          v          v    |
              |  HEALTHY   DEGRADED   PAUSED |
              |  (full     (partial   (manual |
              |   capacity) capacity) hold)   |
              |    |          |          |    |
              +----+     +----+    +----+    |
                         |         |         |
                         v         v         |
                    DRAINING    RESUMING -----+
                    (finish       |
                     in-flight)   |
                         |
                         v
                    TERMINATED
                    (removed from
                     active pool)
```

### Lifecycle Operations

| Operation | Trigger | Action |
|---|---|---|
| **Deploy** | Orchestrator schedule or manual | Container starts, loads models, registers |
| **Health Check** | Every 10 seconds | Heartbeat + metrics to orchestrator |
| **Scale Up** | Queue depth > threshold | Orchestrator spawns additional instances |
| **Scale Down** | Queue depth < threshold for 5min | Drain and terminate excess instances |
| **Pause** | Manual or dependency failure | Stop consuming, hold state |
| **Resume** | Dependency restored or manual | Resume consuming from last offset |
| **Upgrade** | New model/code version | Rolling restart with zero downtime |
| **Terminate** | Decommission or critical failure | Drain, checkpoint state, remove |

---

## 5. Conflict Resolution Strategy

When multiple decision agents propose contradictory actions, the system must resolve conflicts deterministically.

```
+-------------------------------------------------------------------+
|                   CONFLICT RESOLUTION ENGINE                      |
|                                                                   |
|  Step 1: DETECT                                                   |
|  +-------------------------------------------------------------+ |
|  | Compare decisions from concurrent agents:                    | |
|  |   - RoutingAgent says "divert traffic to Route A"           | |
|  |   - SignalTimingAgent says "extend green on Route B"        | |
|  |   - Both affect same intersection zone                     | |
|  +-------------------------------------------------------------+ |
|                              |                                    |
|  Step 2: CLASSIFY            v                                    |
|  +-------------------------------------------------------------+ |
|  | Conflict Types:                                              | |
|  |   - RESOURCE: two agents need same signal phase             | |
|  |   - OBJECTIVE: optimizing different KPIs (speed vs safety)  | |
|  |   - TEMPORAL: decisions for overlapping time windows        | |
|  |   - SPATIAL: decisions for overlapping geographic zones     | |
|  +-------------------------------------------------------------+ |
|                              |                                    |
|  Step 3: RESOLVE             v                                    |
|  +-------------------------------------------------------------+ |
|  | Resolution Hierarchy:                                        | |
|  |   1. SAFETY FIRST: any decision with safety implications    | |
|  |      always wins (emergency vehicles, pedestrian safety)    | |
|  |   2. PRIORITY RANK: higher-priority agent wins              | |
|  |      (Emergency > Signal > Routing > Fleet > Report)        | |
|  |   3. CONFIDENCE SCORE: agent with higher confidence wins    | |
|  |   4. RECENCY: more recent data wins                         | |
|  |   5. CONSENSUS: if tie, run quick simulation to evaluate    | |
|  |      both options, pick better outcome                      | |
|  +-------------------------------------------------------------+ |
|                              |                                    |
|  Step 4: EXECUTE             v                                    |
|  +-------------------------------------------------------------+ |
|  | - Winning decision is executed                               | |
|  | - Losing agent is notified with reason                      | |
|  | - Conflict logged for post-hoc analysis                     | |
|  | - If conflict rate > 5% for a pair, flag for tuning         | |
|  +-------------------------------------------------------------+ |
+-------------------------------------------------------------------+
```

### Priority Matrix

| Agent Type | Priority Level | Override Authority |
|---|---|---|
| Emergency Override | P0 (Critical) | Overrides all other agents |
| SignalTimingAgent | P1 (High) | Can override routing, fleet |
| RoutingAgent | P2 (Standard) | Can override fleet, reporting |
| FleetDispatchAgent | P3 (Standard) | Can override reporting |
| DemandBalanceAgent | P3 (Standard) | Can override reporting |
| ReportingAgent | P4 (Low) | No override authority |

---

## 6. Fault Tolerance and Self-Healing

```
+-------------------------------------------------------------------+
|                    FAULT TOLERANCE DESIGN                         |
|                                                                   |
|  DETECTION               DIAGNOSIS              RECOVERY         |
|  +---------------+       +---------------+      +---------------+|
|  |               |       |               |      |               ||
|  | Heartbeat     |------>| Classify      |----->| Restart       ||
|  | Monitor       |       | Failure Type  |      | Agent         ||
|  | (10s interval)|       |               |      | (same node)   ||
|  |               |       | - Crash       |      |               ||
|  | Kafka Lag     |------>| - Hung        |----->| Reschedule    ||
|  | Monitor       |       | - Slow        |      | (different    ||
|  |               |       | - Bad output  |      |  node)        ||
|  |               |       | - Dependency  |      |               ||
|  | Error Rate    |------>|   failure     |----->| Circuit Break ||
|  | Monitor       |       |               |      | (disable +    ||
|  | (> 5% = alarm)|       |               |      |  fallback)    ||
|  +---------------+       +---------------+      +---------------+|
|                                                                   |
+-------------------------------------------------------------------+
```

### Self-Healing Mechanisms

| Failure Scenario | Detection | Recovery | Time to Recover |
|---|---|---|---|
| Agent crashes | Missing heartbeat (3 consecutive) | Auto-restart on same node | < 30 seconds |
| Agent hung (no progress) | Kafka consumer lag growing | Kill + restart on different node | < 60 seconds |
| Model returns garbage | Output validation fails | Fall back to previous model version | < 10 seconds |
| Dependency down (DB/API) | Connection error rate > 50% | Circuit breaker opens, use cached data | Immediate |
| Entire node lost | K8s node health check | Pod rescheduled to healthy node | < 2 minutes |
| Kafka partition offline | Consumer rebalance triggered | Consumers redistribute partitions | < 30 seconds |

### Circuit Breaker States

```
         +---> CLOSED (normal) ---+
         |     all requests pass  |
         |                        | failure_count > threshold
  success_count   |               |
  > threshold     |               v
         |        |          OPEN (tripped)
         |        |          all requests fail-fast
         |        |          use fallback/cache
         |        |               |
         |        |               | after cooldown_period
         +--------+               |
                                  v
                          HALF-OPEN (testing)
                          allow 1 request through
                          if success --> CLOSED
                          if failure --> OPEN
```

---

## 7. Agent Scaling Strategy

### 7.1 Scaling Dimensions

```
+-------------------------------------------------------------------+
|                    AGENT SCALING MODEL                            |
|                                                                   |
|  VERTICAL (per agent instance)                                    |
|  +-----------------------------------------------------------+   |
|  | Crawler:   0.5 CPU, 512MB RAM (lightweight)                |   |
|  | Analysis:  2 CPU, 4GB RAM (CPU-intensive)                  |   |
|  | Predict:   1 CPU, 2GB RAM + 1 GPU slice (model inference)  |   |
|  | Decision:  1 CPU, 2GB RAM (compute-moderate)               |   |
|  | Reporting: 1 CPU, 4GB RAM (LLM context window)             |   |
|  | Orchestr:  2 CPU, 4GB RAM (coordination overhead)          |   |
|  +-----------------------------------------------------------+   |
|                                                                   |
|  HORIZONTAL (number of instances)                                 |
|  +-----------------------------------------------------------+   |
|  |                                                           |   |
|  |  Agent Type       Min   Max   Scale Metric                |   |
|  |  -------------------------------------------------------- |   |
|  |  TrafficCrawler    3     20   Kafka consumer lag          |   |
|  |  GPSCrawler        2     15   Inbound connection count    |   |
|  |  WeatherCrawler    1      3   API rate limit headroom     |   |
|  |  PatternDetector   2      8   Processing queue depth      |   |
|  |  AnomalyDetector   2      8   Event throughput            |   |
|  |  ForecastAgent     2     10   Prediction request queue    |   |
|  |  RoutingAgent      3     15   Route request RPS           |   |
|  |  SignalTimingAgent  2      6   Intersection count         |   |
|  |  SummaryAgent      1      4   Report generation queue     |   |
|  |  Orchestrator      2      3   (HA, not load-scaled)       |   |
|  |                                                           |   |
|  +-----------------------------------------------------------+   |
+-------------------------------------------------------------------+
```

### 7.2 Auto-Scaling Flow

```
                 Metrics (Prometheus)
                        |
                        v
              +-------------------+
              | Scaling Controller|
              | (custom K8s       |
              |  operator)        |
              +-------------------+
                        |
            +-----------+-----------+
            |           |           |
            v           v           v
      Scale by     Scale by     Scale by
      Kafka Lag    CPU/Mem      Custom Metric
            |           |           |
            v           v           v
      +-------------------+
      | HPA / KEDA        |
      | (event-driven     |
      |  autoscaling)     |
      +-------------------+
              |
              v
      [Adjust replica count]
              |
              v
      [Cluster Autoscaler adds nodes if needed]
```

### 7.3 Geographic Sharding

For city-scale deployments, agents are sharded by geographic zone to maintain data locality and reduce cross-zone communication.

```
+-------------------------------------------------------------------+
|                  GEOGRAPHIC AGENT SHARDING                        |
|                                                                   |
|    ZONE: NORTH              ZONE: CENTRAL          ZONE: SOUTH   |
|  +----------------+       +----------------+     +-------------+  |
|  | Crawler (N)    |       | Crawler (C)    |     | Crawler (S) |  |
|  | Analysis (N)   |       | Analysis (C)   |     | Analysis (S)|  |
|  | Predict (N)    |       | Predict (C)    |     | Predict (S) |  |
|  | Decision (N)   |       | Decision (C)   |     | Decision (S)|  |
|  +-------+--------+       +-------+--------+     +------+------+  |
|          |                         |                     |         |
|          +-----------+-------------+---------------------+         |
|                      |                                             |
|              +-------+--------+                                    |
|              | Global         |                                    |
|              | Orchestrator   |                                    |
|              | (cross-zone    |                                    |
|              |  coordination) |                                    |
|              +----------------+                                    |
+-------------------------------------------------------------------+

Zone boundary events (vehicles crossing zones) are handled via
cross-zone handoff protocol with < 100ms synchronization latency.
```

---

## Summary

SafeMove AI's multi-agent architecture decomposes the complexity of city-scale traffic intelligence into specialized, autonomous agents that collaborate through well-defined communication protocols. The system is designed for resilience (self-healing within 30 seconds), scalability (100+ concurrent agents across geographic zones), and coherence (deterministic conflict resolution with safety-first priority). Each agent is independently deployable, testable, and upgradeable, enabling rapid iteration without system-wide downtime.
