# Agent + Feedback Learning System -- System Design

> Closed-loop self-improving intelligence layer for SafeMove AI -- transforms every route outcome, user action, and operator correction into a training signal that continuously sharpens flood-aware routing decisions.

**Status:** Draft
**Owner:** AI Platform Team
**Last Updated:** 2026-03-22
**Depends On:** Routing Intelligence Module, Severity Scoring Module, Data Ingestion Pipeline, LLM Gateway

---

## 1. Overview

### 1.1 Purpose

The Agent + Feedback Learning System transforms SafeMove AI's routing from a static, rule-based engine into a self-improving system that adapts to real-world conditions through continuous feedback. Every route completion, user rejection, operator override, and flood confirmation becomes a learning signal that refines future decisions.

Without this system, routing weights and severity calibrations are fixed at deploy time and degrade as road networks, flood patterns, and user expectations shift. With it, the platform accumulates institutional knowledge -- learning, for example, that Zone C floods 6 hours before official warnings during sustained northeast wind, or that Camera #47 consistently overestimates water depth by 15cm.

### 1.2 Role in the Platform

The system sits at the intersection of four subsystems:

```
                    ┌──────────────────────┐
                    │   User / Operator    │
                    │   Feedback Signals   │
                    └──────────┬───────────┘
                               │
                               ▼
┌──────────────┐    ┌──────────────────────┐    ┌──────────────────┐
│   Routing    │◀───│  Agent + Feedback    │───▶│   Severity       │
│ Intelligence │    │  Learning System     │    │   Scoring        │
│   Module     │    │                      │    │   Module         │
└──────────────┘    └──────────┬───────────┘    └──────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  LLM Gateway / RL    │
                    │  Training Pipeline   │
                    └──────────────────────┘
```

### 1.3 Key Capabilities

| Capability | Description |
|---|---|
| **Feedback Collection** | Ingests explicit (thumbs up/down, flood confirm/reject), implicit (GPS deviation, route abandonment), and passive (acceptance rates, alert dismissal) signals from users, operators, and sensors. |
| **Agent Memory** | Maintains a 3-tier memory system (short/mid/long-term) that stores contextual patterns at different time horizons and decay rates. |
| **LLM-based Reasoning** | Uses an LLM to perform causal analysis on failed routes -- identifying which input signal should have been weighted differently. |
| **RL-based Optimization** | Trains a reinforcement learning policy offline to optimize route selection, zone penalties, and alert thresholds based on cumulative reward signals. |
| **Policy Updates** | Applies learned adjustments to routing weights, severity calibrations, and source trust scores through batched, canary-tested rollouts with automatic rollback. |

---

## 2. Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    AGENT + FEEDBACK LEARNING SYSTEM                            │
│                                                                                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌──────────────────┐   │
│  │  Feedback    │──▶│   Agent     │──▶│  Learning   │──▶│  Policy Update   │   │
│  │  Collector   │   │   Memory    │   │  Engine     │   │  Engine          │   │
│  └─────────────┘   └─────────────┘   └─────────────┘   └────────┬─────────┘   │
│        ▲                                    │                     │             │
│        │                                    │                     ▼             │
│  ┌─────┴───────┐                     ┌──────┴──────┐    ┌──────────────────┐   │
│  │  Trust      │◀────────────────────│ LLM + RL    │    │  Canary / A-B    │   │
│  │  Scorer     │                     │ Backends    │    │  Test Runner     │   │
│  └─────────────┘                     └─────────────┘    └──────────────────┘   │
│                                                                                 │
│  ──────────────────────── Downstream Consumers ────────────────────────────     │
│                                                                                 │
│  ┌──────────────────┐   ┌───────────────────┐   ┌──────────────────────────┐   │
│  │ Routing Module   │   │ Severity Module   │   │ Alerting Module          │   │
│  │ (weight updates) │   │ (calibration adj) │   │ (threshold adj)          │   │
│  └──────────────────┘   └───────────────────┘   └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Sub-Components

| Component | Responsibility | Runtime |
|---|---|---|
| **Feedback Collector** | Normalizes, deduplicates, validates, and persists incoming feedback from all channels. | Always-on, event-driven |
| **Agent Memory (3-tier)** | Stores feedback and derived patterns across three time horizons with configurable decay. | Always-on |
| **Learning Engine -- LLM** | Performs causal reasoning on route failures, generates structured policy adjustment recommendations. | Batch (every 6h) |
| **Learning Engine -- RL** | Trains a reward-driven policy for route selection, zone penalty adjustment, and alert level calibration. | Offline (nightly) |
| **Policy Update Engine** | Validates, versions, and applies policy changes through canary rollout with automatic rollback. | Triggered per learning cycle |
| **Trust Scorer** | Maintains per-source reliability scores based on historical accuracy of feedback and sensor data. | Updated on each feedback event |

---

## 3. Data Flow

### 3.1 Step-by-Step Flow

1. **Feedback Ingestion** -- A user completes (or abandons) a route, confirms or rejects a flood warning, or an operator overrides a system decision. The client app or operator console publishes a feedback event to the `feedback.events` Kafka topic.

2. **Normalization & Validation** -- The Feedback Collector consumes the event, deduplicates it (idempotency key check against Redis), validates the schema, applies spam/abuse detection (rate limit + trust threshold), attaches contextual metadata (current weather, severity score, route path), and writes the enriched event to PostgreSQL.

3. **Memory Categorization** -- The Agent Memory service processes the enriched event. It writes to the appropriate tier:
   - Short-term (Redis): raw event, available for immediate routing queries
   - Mid-term (PostgreSQL `agent_memory_mid`): aggregated into zone-specific weekly pattern counters
   - Long-term (PostgreSQL `agent_memory_long` + S3): contributes to historical weight adjustments and calibration history

4. **Learning Cycle (LLM)** -- Every 6 hours, the LLM learning engine queries Agent Memory for recent failures and context. It constructs prompts with structured context, sends them to the LLM Gateway, parses the structured JSON response, and writes candidate policy adjustments to the `policy_candidates` table.

5. **Learning Cycle (RL)** -- Nightly, the RL training pipeline pulls the full day's feedback as reward signals, updates the policy network (PPO), evaluates against a held-out validation set, and writes updated policy parameters to S3 with a version tag.

6. **Policy Application** -- The Policy Update Engine reads candidate adjustments from both LLM and RL engines. It filters by confidence threshold (>0.7) and sample size (>10), resolves conflicts (RL takes precedence for numerical weights, LLM for categorical decisions), applies via canary rollout (5% traffic), monitors impact for 2 hours, and either promotes to 100% or rolls back.

7. **Downstream Propagation** -- Updated policies are published to the `policy.updates` Kafka topic. The Routing Module, Severity Module, and Alerting Module each consume relevant updates and hot-reload their configurations without restart.

### 3.2 Flow Diagram

```
  User / Operator / Sensor
         │
         │ feedback event
         ▼
  ┌──────────────┐     dedup check     ┌───────┐
  │  Kafka topic │────────────────────▶│ Redis  │
  │  feedback.   │                     │ dedup  │
  │  events      │                     │ set    │
  └──────┬───────┘                     └───────┘
         │
         ▼
  ┌──────────────┐     enrich with     ┌────────────┐
  │  Feedback    │────context──────────│ Weather /  │
  │  Collector   │                     │ Severity   │
  │  Service     │                     │ APIs       │
  └──────┬───────┘                     └────────────┘
         │
         │ write enriched event
         ▼
  ┌──────────────┐
  │  PostgreSQL  │
  │  feedback_   │
  │  events      │
  └──────┬───────┘
         │
         ├──────────────────────────────────┐
         ▼                                  ▼
  ┌──────────────┐                  ┌──────────────┐
  │ Short-term   │                  │ Mid/Long-term│
  │ Memory       │                  │ Memory       │
  │ (Redis)      │                  │ (PostgreSQL) │
  └──────┬───────┘                  └──────┬───────┘
         │                                  │
         │           ┌─────────────────────┘
         │           │
         ▼           ▼
  ┌──────────────────────┐        ┌──────────────────────┐
  │  LLM Learning Engine │        │  RL Learning Engine  │
  │  (every 6h)          │        │  (nightly)           │
  └──────────┬───────────┘        └──────────┬───────────┘
             │                                │
             ▼                                ▼
  ┌──────────────────────────────────────────────────────┐
  │              Policy Update Engine                     │
  │  ┌──────────┐  ┌──────────┐  ┌────────────────────┐  │
  │  │ Validate │─▶│ Canary   │─▶│ Promote / Rollback │  │
  │  └──────────┘  └──────────┘  └────────────────────┘  │
  └──────────────────────────┬───────────────────────────┘
                              │
                              ▼
  ┌──────────┐   ┌───────────┐   ┌────────────┐
  │ Routing  │   │ Severity  │   │ Alerting   │
  │ Module   │   │ Module    │   │ Module     │
  └──────────┘   └───────────┘   └────────────┘
```

---

## 4. Data Model

### 4.1 FeedbackEvent

Represents a single feedback signal from a user, operator, or sensor.

```json
{
  "feedback_id": "fb-20260322-a1b2c3d4",
  "user_id": "usr-7f3e2a91",
  "route_id": "rt-abc123",
  "location": {
    "lat": 29.7604,
    "lng": -95.3698,
    "zone_id": "zone-houston-c3"
  },
  "feedback_type": "route_failed",
  "feedback_value": {
    "reason": "flood_encountered",
    "segment_index": 2,
    "delay_minutes": 18,
    "water_depth_cm": 30,
    "photo_url": "https://cdn.safemove.ai/feedback/fb-20260322-a1b2c3d4.jpg"
  },
  "timestamp": "2026-03-22T14:30:00Z",
  "context": {
    "severity_score": 0.65,
    "weather_signal": {
      "condition": "heavy_rain",
      "rainfall_mm_hr": 45,
      "forecast_confidence": 0.82
    },
    "news_signal": {
      "source": "houston-chronicle",
      "headline": "Flash flood warning issued for Harris County",
      "relevance_score": 0.91
    },
    "route_path": [
      {"lat": 29.7604, "lng": -95.3698},
      {"lat": 29.7550, "lng": -95.3650},
      {"lat": 29.7510, "lng": -95.3590}
    ],
    "route_eta_minutes": 22,
    "route_distance_km": 8.4
  },
  "source_metadata": {
    "app_version": "2.4.1",
    "device_type": "android",
    "session_id": "sess-e4f5g6h7"
  }
}
```

**Allowed `feedback_type` values:**

| Type | Trigger | Signal Strength |
|---|---|---|
| `route_failed` | User could not complete route due to flooding/obstruction | Strong negative |
| `route_success` | User completed route without incident | Moderate positive |
| `flood_confirmed` | User confirms a flood warning was accurate | Strong positive (for severity) |
| `flood_rejected` | User reports a flood warning was false alarm | Strong negative (for severity) |
| `severity_mismatch` | User/operator reports severity level was wrong | Moderate (directional) |
| `operator_override` | Operator manually overrides system routing/severity | Strong (authoritative) |

**PostgreSQL Schema:**

```sql
CREATE TABLE feedback_events (
    feedback_id     VARCHAR(64) PRIMARY KEY,
    user_id         VARCHAR(64) NOT NULL,
    route_id        VARCHAR(64),
    zone_id         VARCHAR(64) NOT NULL,
    lat             DOUBLE PRECISION NOT NULL,
    lng             DOUBLE PRECISION NOT NULL,
    feedback_type   VARCHAR(32) NOT NULL,
    feedback_value  JSONB NOT NULL,
    context         JSONB NOT NULL,
    source_metadata JSONB,
    trust_weight    DOUBLE PRECISION DEFAULT 1.0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_feedback_type CHECK (
        feedback_type IN (
            'route_failed', 'route_success', 'flood_confirmed',
            'flood_rejected', 'severity_mismatch', 'operator_override'
        )
    )
);

CREATE INDEX idx_feedback_zone_time ON feedback_events (zone_id, created_at DESC);
CREATE INDEX idx_feedback_route ON feedback_events (route_id);
CREATE INDEX idx_feedback_type_time ON feedback_events (feedback_type, created_at DESC);
```

### 4.2 AgentMemoryEntry

Represents a learned pattern or cached observation stored in the agent's memory.

```json
{
  "memory_id": "mem-20260322-x9y8z7",
  "location": {
    "zone_id": "zone-houston-c3",
    "lat": 29.7550,
    "lng": -95.3650
  },
  "memory_tier": "mid",
  "pattern_type": "recurring_flood_zone",
  "data": {
    "failure_rate": 0.34,
    "total_routes": 142,
    "failed_routes": 48,
    "common_conditions": {
      "wind_direction": "northeast",
      "rainfall_threshold_mm_hr": 25,
      "tide_level": "high"
    },
    "peak_failure_hours": [14, 15, 16, 17],
    "recommended_penalty": 0.45
  },
  "confidence": 0.82,
  "last_updated": "2026-03-22T12:00:00Z",
  "decay_factor": 0.95,
  "source_feedback_count": 48,
  "expires_at": "2026-04-21T12:00:00Z"
}
```

**Allowed `memory_tier` values:**

| Tier | Storage | Retention | Decay Rate |
|---|---|---|---|
| `short` | Redis (JSON) | 24 hours | Expires, no decay |
| `mid` | PostgreSQL `agent_memory_mid` | 30 days | 0.95 per day (confidence *= decay_factor daily) |
| `long` | PostgreSQL `agent_memory_long` + S3 archive | Indefinite | 0.995 per week |

**Allowed `pattern_type` values:**

| Type | Description |
|---|---|
| `recurring_flood_zone` | Zone that repeatedly floods under specific conditions |
| `route_failure_cluster` | Group of adjacent failed routes indicating systemic issue |
| `source_reliability` | Learned accuracy pattern for a specific data source |
| `severity_calibration` | Historical mapping of predicted vs. actual severity |
| `time_of_day_pattern` | Flooding/traffic patterns that correlate with time windows |
| `weather_correlation` | Learned relationship between weather conditions and route outcomes |

### 4.3 PolicyUpdate

Represents a single change applied to the system's decision-making parameters.

```json
{
  "update_id": "pu-20260322-m4n5o6",
  "policy_version": "v2026.03.22.003",
  "target": "routing_weight",
  "scope": {
    "zone_id": "zone-houston-c3",
    "applies_to": "flood_penalty_multiplier"
  },
  "old_value": 1.2,
  "new_value": 1.55,
  "delta": 0.35,
  "reason": "Zone C3 failure rate increased to 34% over past 7 days. LLM analysis identified northeast wind + rainfall >25mm/hr as unaccounted risk factor. RL reward signal confirms penalty underweighting.",
  "confidence": 0.84,
  "sample_size": 142,
  "source_engine": "llm+rl_consensus",
  "rollout_status": "canary",
  "rollout_percentage": 5,
  "rollback_trigger": {
    "metric": "route_success_rate",
    "threshold": -0.05,
    "window_minutes": 120
  },
  "created_at": "2026-03-22T12:15:00Z",
  "applied_at": "2026-03-22T12:16:00Z",
  "promoted_at": null,
  "rolled_back_at": null
}
```

**Allowed `target` values:**

| Target | What Changes | Example |
|---|---|---|
| `routing_weight` | Flood penalty multiplier for a zone or road segment | 1.2 -> 1.55 |
| `severity_calibration` | Mapping from raw sensor data to severity level | Camera score 0.7 now maps to "high" instead of "moderate" |
| `trust_score` | Reliability weight for a data source | Weather API trust: 0.85 -> 0.78 |
| `alert_threshold` | Sensitivity for triggering flood warnings | Trigger at 0.6 instead of 0.7 |
| `route_preference` | Default route ranking factors for a zone | Prefer highway over surface streets in Zone C3 during rain |

### 4.4 TrustScore

Tracks the reliability of each feedback source and data input.

```json
{
  "source_id": "camera-i45-exit12",
  "source_type": "camera",
  "trust_score": 0.73,
  "total_feedbacks": 312,
  "correct_feedbacks": 228,
  "false_positive_count": 52,
  "false_negative_count": 32,
  "recency_weight": 0.91,
  "weighted_trust": 0.664,
  "last_calibrated": "2026-03-22T06:00:00Z",
  "calibration_history": [
    {"date": "2026-03-15", "trust_score": 0.76},
    {"date": "2026-03-08", "trust_score": 0.79},
    {"date": "2026-03-01", "trust_score": 0.81}
  ],
  "notes": "Declining accuracy since 2026-03-01. Possible lens obstruction or calibration drift."
}
```

**Allowed `source_type` values:** `user`, `operator`, `camera`, `water_sensor`, `news`, `weather_api`, `social_media`

**PostgreSQL Schema:**

```sql
CREATE TABLE trust_scores (
    source_id           VARCHAR(128) PRIMARY KEY,
    source_type         VARCHAR(32) NOT NULL,
    trust_score         DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    total_feedbacks     INTEGER NOT NULL DEFAULT 0,
    correct_feedbacks   INTEGER NOT NULL DEFAULT 0,
    false_positive_count INTEGER NOT NULL DEFAULT 0,
    false_negative_count INTEGER NOT NULL DEFAULT 0,
    recency_weight      DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    weighted_trust      DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    last_calibrated     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    calibration_history JSONB DEFAULT '[]'::JSONB,
    notes               TEXT,

    CONSTRAINT valid_source_type CHECK (
        source_type IN (
            'user', 'operator', 'camera', 'water_sensor',
            'news', 'weather_api', 'social_media'
        )
    ),
    CONSTRAINT valid_trust_range CHECK (
        trust_score >= 0.0 AND trust_score <= 1.0
    )
);
```

---

## 5. Core Components

### 5.1 Feedback Collector

**Objective:** Ingest, validate, enrich, and persist all feedback signals from users, operators, and sensors into a normalized format suitable for downstream learning.

**Inputs:**

| Input | Source | Transport |
|---|---|---|
| Explicit feedback (route success/failure) | Mobile app, web dashboard | Kafka topic `feedback.explicit` |
| Flood confirmation/rejection | Mobile app flood alert dialog | Kafka topic `feedback.explicit` |
| Operator overrides | Operator console | Kafka topic `feedback.operator` |
| Implicit signals (GPS deviation, abandonment) | GPS telemetry pipeline | Kafka topic `feedback.implicit` |
| Passive signals (acceptance rate, dismissal rate) | Analytics pipeline (batch) | Kafka topic `feedback.passive` |

**Outputs:**

- Enriched `FeedbackEvent` written to PostgreSQL `feedback_events` table
- Event published to `feedback.enriched` Kafka topic for downstream consumers
- Trust score delta published to `trust.updates` Kafka topic

**Internal Logic:**

```
function process_feedback(raw_event):
    # 1. Idempotency check
    if redis.sismember("feedback:dedup", raw_event.idempotency_key):
        return DUPLICATE_IGNORED
    redis.sadd("feedback:dedup", raw_event.idempotency_key, ex=86400)

    # 2. Schema validation
    validate_against_schema(raw_event, FEEDBACK_EVENT_SCHEMA)

    # 3. Rate limiting (per user)
    if rate_limiter.is_exceeded(raw_event.user_id, limit=50/hour):
        log.warn("Rate limit exceeded", user_id=raw_event.user_id)
        return RATE_LIMITED

    # 4. Spam detection
    spam_score = spam_detector.score(raw_event)
    if spam_score > 0.8:
        log.warn("Spam detected", score=spam_score)
        return SPAM_REJECTED

    # 5. Freshness check
    event_age = now() - raw_event.timestamp
    if event_age > timedelta(hours=6):
        raw_event.staleness_penalty = min(event_age.hours / 24, 0.8)

    # 6. Context enrichment
    weather = weather_api.get_conditions(raw_event.location, raw_event.timestamp)
    severity = severity_api.get_score(raw_event.location, raw_event.timestamp)
    enriched = enrich(raw_event, weather=weather, severity=severity)

    # 7. Trust weighting
    user_trust = trust_store.get(raw_event.user_id)
    enriched.trust_weight = user_trust.weighted_trust

    # 8. Persist
    db.insert("feedback_events", enriched)
    kafka.produce("feedback.enriched", enriched)

    return ACCEPTED
```

**Explicit Feedback Signals:**

- **Route confirmed:** User taps "I arrived safely" -- produces `route_success` event
- **Route failed:** User reports flooding/blockage on route -- produces `route_failed` event with segment info
- **Flood confirmed:** User taps "Yes, this area is flooded" on a push alert -- produces `flood_confirmed`
- **Flood rejected:** User taps "No, this area is fine" on a push alert -- produces `flood_rejected`
- **Severity mismatch:** Operator adjusts severity level for a zone -- produces `severity_mismatch` with old/new values

**Implicit Feedback Signals:**

- **Route completion time:** If actual time exceeds predicted ETA by >50%, treated as soft negative signal
- **Route abandonment:** User stops following the suggested route midway -- detected via GPS trace divergence
- **GPS deviation:** User deviates >200m from suggested path at a specific segment -- possible avoidance behavior
- **Speed anomaly:** Sustained speed <5 km/h for >3 minutes on a segment expected to be clear

**Passive Signals (Aggregated):**

- **Route acceptance rate:** Fraction of suggested routes that users actually follow (aggregated hourly per zone)
- **Alert dismissal rate:** Fraction of flood alerts dismissed without action (aggregated hourly)
- **Re-routing frequency:** How often users request a new route within 5 minutes of receiving one

**Edge Cases:**

| Edge Case | Handling |
|---|---|
| **Delayed feedback** | Events older than 6 hours receive a staleness penalty (trust_weight *= 1 - staleness_penalty). Events older than 24 hours are accepted but excluded from short-term memory. |
| **Contradictory feedback** | If two users submit opposing feedback for the same zone within 30 minutes, both are stored but flagged as `contradicted=true`. The Trust Scorer resolves by weighting higher-trust sources. |
| **Bot/spam abuse** | Rate limiting (50 events/hour/user) + spam ML classifier (logistic regression on text features, timing patterns, GPS plausibility). Accounts with spam_score > 0.8 on 3+ events are quarantined for manual review. |
| **Missing context** | If weather/severity API is unavailable during enrichment, the event is stored with `context.partial=true` and retried in the next 5-minute batch. |
| **Duplicate submissions** | Idempotency key (hash of user_id + route_id + timestamp rounded to 1min) checked against Redis set with 24h TTL. |

---

### 5.2 Agent Memory (3-tier)

**Objective:** Maintain a multi-tier memory system that gives the learning engines fast access to recent events, medium-term patterns, and long-term institutional knowledge -- with automatic decay to prevent stale data from corrupting decisions.

**Inputs:**

- Enriched `FeedbackEvent` records from the Feedback Collector
- Pattern aggregation results from batch jobs
- Policy update history from the Policy Update Engine

**Outputs:**

- Queryable memory store for the Learning Engines (via internal gRPC API)
- Zone-level pattern summaries for the Routing and Severity modules
- Memory health metrics for observability

**Internal Logic -- Tier Management:**

#### Short-term Memory (Redis)

```
Storage: Redis JSON documents
Key pattern: memory:short:{zone_id}:{event_type}
TTL: 24 hours (auto-expiry)
Max entries per zone: 500 (LRU eviction)

Contents:
- Raw feedback events from the last 24 hours
- Active flood incidents (currently ongoing)
- Current severity scores per zone
- Live route success/failure counters

Access pattern: O(1) lookup by zone_id
Typical query: "What happened in zone-houston-c3 in the last 2 hours?"
```

**Example Redis entry:**

```json
{
  "zone_id": "zone-houston-c3",
  "window_start": "2026-03-22T12:00:00Z",
  "window_end": "2026-03-22T14:00:00Z",
  "events": [
    {
      "feedback_id": "fb-20260322-a1b2c3d4",
      "feedback_type": "route_failed",
      "trust_weight": 0.85,
      "timestamp": "2026-03-22T14:30:00Z"
    }
  ],
  "counters": {
    "route_success": 18,
    "route_failed": 7,
    "flood_confirmed": 3,
    "flood_rejected": 1
  },
  "active_incidents": ["inc-20260322-001"],
  "current_severity": 0.72
}
```

#### Mid-term Memory (PostgreSQL)

```
Storage: PostgreSQL table agent_memory_mid
Retention: 30 days
Granularity: zone + week aggregates
Decay: confidence *= 0.95 daily (applied by nightly cron job)

Contents:
- Weekly failure rates per zone
- Condition-specific patterns (e.g., "Zone C3 floods when rainfall > 25mm/hr + NE wind")
- Route segment reliability scores
- Source accuracy trends

Access pattern: Indexed query by zone_id + time range
Typical query: "What is the failure rate for zone-houston-c3 over the past 3 weeks?"
```

```sql
CREATE TABLE agent_memory_mid (
    memory_id       VARCHAR(64) PRIMARY KEY,
    zone_id         VARCHAR(64) NOT NULL,
    pattern_type    VARCHAR(64) NOT NULL,
    data            JSONB NOT NULL,
    confidence      DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    decay_factor    DOUBLE PRECISION NOT NULL DEFAULT 0.95,
    source_count    INTEGER NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_updated    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at      TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_mid_memory_zone ON agent_memory_mid (zone_id, last_updated DESC);
CREATE INDEX idx_mid_memory_pattern ON agent_memory_mid (pattern_type, confidence DESC);
```

#### Long-term Memory (PostgreSQL + S3)

```
Storage: PostgreSQL table agent_memory_long (metadata + summary)
         S3 bucket safemove-agent-memory (full historical data)
Retention: Indefinite
Decay: confidence *= 0.995 weekly
Compaction: Monthly job merges daily entries into weekly summaries

Contents:
- Historical routing weight evolution per zone
- Seasonal flood patterns (e.g., "Hurricane season baseline penalties")
- Long-term source trust trajectories
- Calibration history for severity models
- Learned policy snapshots (versioned)

Access pattern: Batch reads during nightly RL training
Typical query: "What were the routing weights for zone-houston-c3 during June 2025?"
```

**Memory Decay Implementation:**

```sql
-- Nightly cron job: decay mid-term memory confidence
UPDATE agent_memory_mid
SET confidence = confidence * decay_factor,
    last_updated = NOW()
WHERE expires_at > NOW()
  AND confidence > 0.01;

-- Delete fully decayed entries
DELETE FROM agent_memory_mid
WHERE confidence <= 0.01 OR expires_at <= NOW();

-- Weekly cron job: decay long-term memory
UPDATE agent_memory_long
SET confidence = confidence * 0.995,
    last_updated = NOW()
WHERE confidence > 0.001;
```

**Edge Cases:**

| Edge Case | Handling |
|---|---|
| **Memory overflow (Redis)** | LRU eviction at 500 entries per zone. Evicted entries are flushed to mid-term memory before deletion. If Redis memory exceeds 80% capacity, aggressive eviction triggers and an alert fires. |
| **Stale data** | Decay functions ensure old patterns lose influence over time. Entries with confidence < 0.01 are garbage-collected. Queries filter by `confidence > min_confidence` (default 0.1). |
| **Conflicting memories** | When two mid-term patterns for the same zone contradict (e.g., one says "always floods," another says "rarely floods"), the system retains both with independent confidence scores. The Learning Engine resolves by examining conditions under which each pattern holds. |
| **Cold start (new zone)** | Zones with no memory entries use city-wide default policies. First 50 feedback events are weighted 2x to accelerate learning. Memory tier is tagged `cold_start=true` until sample_size > 50. |
| **Memory corruption** | Nightly snapshot backups to S3. Every write includes a CRC32 checksum in the `data` JSONB field. Weekly validation job re-computes checksums and flags mismatches for manual review. |

---

### 5.3 Learning Engine -- LLM-based

**Objective:** Use an LLM to perform causal analysis on route failures and anomalous outcomes, generating structured policy adjustment recommendations that a human could audit and the Policy Update Engine can apply.

**Inputs:**

- Batch of recent `route_failed` events from Agent Memory (last 6 hours)
- Contextual data: weather conditions, severity scores, route paths, source signals
- Current routing policy (weights, penalties, thresholds)
- Historical memory for the affected zones (mid-term patterns)

**Outputs:**

- Structured `PolicyAdjustmentRecommendation` JSON objects, written to `policy_candidates` table
- Reasoning trace (logged for auditability)
- Confidence score for each recommendation

**Internal Logic:**

```
function llm_learning_cycle():
    # 1. Gather failures from last 6 hours
    failures = agent_memory.query(
        tier="short",
        feedback_type="route_failed",
        since=now() - timedelta(hours=6)
    )

    if len(failures) < 3:
        log.info("Too few failures for LLM analysis, skipping cycle")
        return

    # 2. Group by zone
    zone_groups = group_by(failures, key="zone_id")

    for zone_id, zone_failures in zone_groups.items():
        # 3. Fetch context
        current_policy = policy_store.get(zone_id)
        mid_term = agent_memory.query(tier="mid", zone_id=zone_id)
        weather_history = weather_api.get_history(zone_id, hours=12)

        # 4. Build prompt
        prompt = build_analysis_prompt(
            zone_id=zone_id,
            failures=zone_failures,
            current_policy=current_policy,
            patterns=mid_term,
            weather=weather_history
        )

        # 5. Call LLM
        response = llm_gateway.chat(
            model="claude-sonnet",
            messages=[{"role": "user", "content": prompt}],
            response_format="json",
            temperature=0.2,
            max_tokens=2000
        )

        # 6. Parse and validate
        recommendation = parse_llm_response(response)
        if not validate_recommendation(recommendation):
            log.warn("LLM recommendation failed validation", zone=zone_id)
            continue

        # 7. Store candidate
        db.insert("policy_candidates", {
            "candidate_id": generate_id(),
            "zone_id": zone_id,
            "source_engine": "llm",
            "recommendation": recommendation,
            "confidence": recommendation.confidence,
            "reasoning_trace": response.full_text,
            "created_at": now()
        })
```

**Example Prompt:**

```
You are an AI routing policy analyst for SafeMove AI, a flood-aware urban
traffic intelligence system. Analyze the following route failures and
recommend specific policy adjustments.

## Zone: zone-houston-c3 (Downtown Houston, west of I-45)

## Current Policy
- Flood penalty multiplier: 1.2
- Alert threshold: 0.7
- Trusted sources: weather_api (0.85), camera-i45-exit12 (0.73), news (0.68)

## Recent Failures (last 6 hours)
1. Route rt-abc123 failed at segment 2. Water depth: 30cm. Conditions:
   heavy rain (45mm/hr), NE wind, severity score was 0.65 (below alert
   threshold of 0.7).
2. Route rt-def456 failed at segment 1. Water depth: 20cm. Conditions:
   heavy rain (38mm/hr), NE wind, severity score was 0.62.
3. Route rt-ghi789 failed at segment 3. Water depth: 45cm. Conditions:
   heavy rain (52mm/hr), NE wind, severity score was 0.71 (alert fired
   but route still suggested as "caution").

## Mid-term Patterns
- This zone has a 34% failure rate over the past 7 days (48/142 routes).
- Failures cluster between 14:00-17:00 local time.
- 85% of failures occur when wind is NE and rainfall > 25mm/hr.

## Task
Respond in JSON with this exact structure:
{
  "analysis": "Brief causal explanation of why routes are failing",
  "root_causes": ["list of identified root causes"],
  "adjustments": [
    {
      "target": "routing_weight | severity_calibration | trust_score | alert_threshold",
      "scope": "zone_id or source_id",
      "parameter": "specific parameter name",
      "current_value": <number>,
      "recommended_value": <number>,
      "rationale": "why this change"
    }
  ],
  "confidence": <0.0-1.0>,
  "additional_observations": "any other relevant findings"
}
```

**Example LLM Response:**

```json
{
  "analysis": "Zone C3 has a drainage capacity problem that manifests specifically under NE wind conditions combined with rainfall exceeding 25mm/hr. The NE wind drives water accumulation toward lower-elevation segments on the west side of I-45. The current severity model underweights wind direction as a factor, causing the severity score to remain below the alert threshold (0.7) even when flooding is imminent. Additionally, the flood penalty multiplier of 1.2 is too low for a zone with a 34% failure rate.",
  "root_causes": [
    "Wind direction (NE) is not sufficiently weighted in severity calculation for this zone",
    "Flood penalty multiplier (1.2) does not reflect observed 34% failure rate",
    "Alert threshold (0.7) is too high -- severity scores of 0.62-0.65 already correlate with flooding in this zone under NE wind conditions",
    "Camera i45-exit12 trust score may be too high given zone-specific performance"
  ],
  "adjustments": [
    {
      "target": "routing_weight",
      "scope": "zone-houston-c3",
      "parameter": "flood_penalty_multiplier",
      "current_value": 1.2,
      "recommended_value": 1.65,
      "rationale": "34% failure rate indicates severe underpenalization. Recommended value derived from failure_rate * penalty_scaling_factor (0.34 * 4.85)."
    },
    {
      "target": "alert_threshold",
      "scope": "zone-houston-c3",
      "parameter": "flood_alert_trigger",
      "current_value": 0.7,
      "recommended_value": 0.55,
      "rationale": "Failures occurring at severity 0.62-0.65 indicate the threshold is too high for this zone. Lowering to 0.55 would have caught all 3 recent failures."
    },
    {
      "target": "severity_calibration",
      "scope": "zone-houston-c3",
      "parameter": "wind_direction_weight_ne",
      "current_value": 0.1,
      "recommended_value": 0.35,
      "rationale": "85% of failures correlate with NE wind. Current weight treats wind direction as a minor factor; it should be a primary indicator for this zone."
    }
  ],
  "confidence": 0.84,
  "additional_observations": "Consider installing an additional water level sensor on the west side of I-45 between exits 11 and 13. The camera at exit 12 may have obstructed sightlines during heavy rain."
}
```

**Validation Rules for LLM Output:**

```
function validate_recommendation(rec):
    # 1. Schema compliance
    assert rec has keys: analysis, root_causes, adjustments, confidence

    # 2. Confidence bounds
    assert 0.0 <= rec.confidence <= 1.0

    # 3. Adjustment sanity checks
    for adj in rec.adjustments:
        # No adjustment should change a value by more than 100%
        if adj.current_value != 0:
            change_ratio = abs(adj.recommended_value - adj.current_value) / abs(adj.current_value)
            assert change_ratio <= 1.0, "Change too large: {change_ratio}"

        # Routing weights must be positive
        if adj.target == "routing_weight":
            assert adj.recommended_value > 0

        # Trust scores must be in [0, 1]
        if adj.target == "trust_score":
            assert 0.0 <= adj.recommended_value <= 1.0

        # Alert thresholds must be in [0, 1]
        if adj.target == "alert_threshold":
            assert 0.0 <= adj.recommended_value <= 1.0

    # 4. Maximum adjustments per cycle
    assert len(rec.adjustments) <= 5

    return True
```

**Edge Cases:**

| Edge Case | Handling |
|---|---|
| **LLM hallucination** | Every recommendation is validated against the schema above. Numerical bounds are enforced. If the LLM recommends changing a parameter that does not exist, the adjustment is dropped with a warning log. |
| **Inconsistent recommendations** | If the LLM recommends contradictory adjustments in the same response (e.g., increase and decrease the same parameter), the entire response is rejected and logged for human review. |
| **LLM unavailable / timeout** | The system falls back to a rule-based heuristic: if failure_rate > 0.25, increase flood_penalty by 10%; if alert_miss_rate > 0.3, decrease alert_threshold by 0.05. |
| **LLM cost control** | Maximum of 50 LLM calls per 6-hour cycle. Zones are prioritized by failure count (highest first). Responses are cached by zone + weather pattern hash (TTL: 6 hours). |
| **Prompt injection** | User-provided text (feedback reasons, descriptions) is sanitized before inclusion in prompts. Maximum 200 characters per feedback entry in the prompt context. |

---

### 5.4 Learning Engine -- RL-based (Advanced)

**Objective:** Train a reinforcement learning policy that optimizes long-term route success by learning zone penalties, route preferences, and alert thresholds from cumulative reward signals.

**Inputs:**

- State vector constructed from current conditions
- Historical feedback events as reward signals
- Current policy parameters (for warm-starting)

**Outputs:**

- Updated policy parameters (zone penalties, route preference weights, alert thresholds)
- Value function estimates per zone-condition pair
- Training metrics (reward curves, loss, policy entropy)

**State Space:**

```python
state = {
    # Weather (per zone)
    "rainfall_mm_hr": float,          # Current rainfall intensity
    "wind_speed_kmh": float,          # Current wind speed
    "wind_direction": int,            # 0-7 (N, NE, E, SE, S, SW, W, NW)
    "temperature_c": float,           # Current temperature
    "forecast_6h_rainfall": float,    # Predicted rainfall in next 6h

    # Flood severity (per zone)
    "severity_score": float,          # Current severity [0, 1]
    "water_level_cm": float,          # Sensor reading (if available)
    "active_incidents": int,          # Number of active flood incidents

    # Historical performance (per zone)
    "failure_rate_24h": float,        # Route failure rate in last 24h
    "failure_rate_7d": float,         # Route failure rate in last 7 days
    "avg_delay_minutes": float,       # Average delay in failed routes

    # Route candidates (per route)
    "route_distance_km": float,       # Total route distance
    "route_flood_zone_count": int,    # Number of flood-risk zones on route
    "route_elevation_profile": list,  # Elevation changes along route
    "route_alt_count": int,           # Number of available alternatives

    # Time features
    "hour_of_day": int,              # 0-23
    "day_of_week": int,              # 0-6
    "is_rush_hour": bool,            # True if 7-9 or 16-18
}
# Total state dimension: 42 features (after encoding categoricals)
```

**Action Space:**

```python
actions = {
    # Discrete actions
    "route_selection": int,           # Index of chosen route from candidates (0-4)
    "alert_level": int,               # 0=none, 1=advisory, 2=warning, 3=emergency

    # Continuous actions (discretized into 5 levels)
    "zone_penalty_adjustment": int,   # -2, -1, 0, +1, +2 (maps to -20%, -10%, 0, +10%, +20%)
    "severity_weight_shift": int,     # -2, -1, 0, +1, +2 (maps to +-0.1 adjustments)
}
# Total action dimension: 4 discrete actions, ~100 combinations
```

**Reward Function:**

```python
def compute_reward(state, action, outcome):
    reward = 0.0

    # Primary outcomes
    if outcome.route_completed and not outcome.flood_encountered:
        reward += 2.0                                    # Successful flood avoidance
    elif outcome.route_completed and outcome.flood_encountered:
        reward -= 3.0                                    # Entered flooded zone
    elif not outcome.route_completed:
        reward -= 4.0                                    # Route abandoned

    # ETA quality
    eta_ratio = outcome.actual_time / outcome.predicted_time
    if eta_ratio <= 1.2:
        reward += 1.0                                    # Acceptable ETA
    elif eta_ratio <= 1.5:
        reward += 0.0                                    # Tolerable
    else:
        reward -= 1.0                                    # Unacceptable delay

    # User satisfaction
    if outcome.user_confirmed_success:
        reward += 0.5                                    # Explicit positive feedback
    elif outcome.user_rejected_route:
        reward -= 1.0                                    # User rejected suggestion

    # Efficiency penalty (don't route everyone on 50km detours)
    if action.route_selection != 0:                      # Not the shortest route
        detour_ratio = outcome.route_distance / outcome.shortest_distance
        reward -= 0.3 * (detour_ratio - 1.0)            # Penalty for excessive detours

    # Alert accuracy
    if action.alert_level >= 2 and not outcome.flood_occurred:
        reward -= 0.5                                    # False alarm penalty
    elif action.alert_level == 0 and outcome.flood_occurred:
        reward -= 2.0                                    # Missed warning penalty

    return reward
```

**Training Configuration:**

```python
rl_config = {
    "algorithm": "PPO",                    # Proximal Policy Optimization
    "framework": "Stable-Baselines3",
    "network": {
        "policy": "MlpPolicy",
        "hidden_layers": [256, 128, 64],
        "activation": "ReLU"
    },
    "hyperparameters": {
        "learning_rate": 3e-4,
        "gamma": 0.99,                     # Discount factor
        "gae_lambda": 0.95,                # GAE lambda
        "clip_range": 0.2,                 # PPO clip
        "entropy_coef": 0.01,              # Exploration bonus
        "vf_coef": 0.5,                    # Value function coefficient
        "max_grad_norm": 0.5,
        "n_epochs": 10,
        "batch_size": 64,
        "n_steps": 2048
    },
    "training": {
        "schedule": "nightly 02:00 UTC",
        "episodes_per_cycle": 10000,
        "max_training_time_minutes": 120,
        "validation_split": 0.2,
        "early_stopping_patience": 5
    },
    "exploration": {
        "strategy": "epsilon_greedy_decay",
        "epsilon_start": 0.3,
        "epsilon_end": 0.05,
        "decay_steps": 50000
    }
}
```

**Edge Cases:**

| Edge Case | Handling |
|---|---|
| **Cold start** | For the first 30 days (or until 1000+ feedback events), the RL agent operates in "exploration mode" (epsilon=0.5) and the rule-based policy remains primary. RL outputs are logged but not applied to production. |
| **Sparse rewards** | Most routes complete without incident, producing a +2/+1 reward. To balance, failed routes are oversampled 3x in the training replay buffer. Synthetic negative examples are generated from historical flood data. |
| **Reward hacking** | The RL agent could learn to always suggest the longest route (avoids all risk). The detour penalty (-0.3 per unit of detour ratio) prevents this. Additionally, a maximum detour ratio of 2.0x is enforced as a hard constraint. |
| **Distribution shift** | Monthly re-evaluation of the reward function weights by the engineering team. If route success rate drifts >5% from the baseline after a policy update, automatic rollback triggers. |
| **Non-stationary environment** | Flood patterns change seasonally. The replay buffer uses prioritized experience replay with a recency bias (recent experiences sampled 2x more often). Full buffer refresh every 90 days. |

---

### 5.5 Policy Update Engine

**Objective:** Safely apply learned policy changes to production routing, severity, and alerting systems through validated, versioned, canary-tested rollouts with automatic rollback capability.

**Inputs:**

- Policy adjustment candidates from LLM Learning Engine
- Updated policy parameters from RL Learning Engine
- Current production policy state
- Production metrics (route success rate, alert accuracy, user satisfaction)

**Outputs:**

- Versioned policy snapshots persisted to PostgreSQL + S3
- Policy update events published to `policy.updates` Kafka topic
- Rollout status updates (canary / promoted / rolled_back)

**Internal Logic:**

```
function apply_policy_updates():
    # 1. Gather candidates
    llm_candidates = db.query("policy_candidates WHERE source='llm' AND status='pending'")
    rl_candidates = db.query("policy_candidates WHERE source='rl' AND status='pending'")

    # 2. Filter by confidence and sample size
    viable = []
    for candidate in llm_candidates + rl_candidates:
        if candidate.confidence < 0.7:
            candidate.status = "rejected_low_confidence"
            continue
        if candidate.sample_size < 10:
            candidate.status = "rejected_insufficient_data"
            continue
        viable.append(candidate)

    # 3. Resolve conflicts (same target + scope from both engines)
    resolved = resolve_conflicts(viable)
    """
    Conflict resolution priority:
    - If both LLM and RL recommend changes to the same parameter:
      - For numerical weights: use RL value (data-driven)
      - For categorical decisions: use LLM value (reasoning-driven)
      - If values are within 10% of each other: average them
      - If values diverge >50%: flag for human review, do not auto-apply
    """

    # 4. Compute aggregate impact
    if count_updates(resolved) > MAX_UPDATES_PER_CYCLE:  # default: 10
        # Prioritize by confidence * sample_size
        resolved = sorted(resolved, key=lambda x: x.confidence * x.sample_size, reverse=True)
        resolved = resolved[:MAX_UPDATES_PER_CYCLE]

    # 5. Create versioned policy snapshot
    current_policy = policy_store.get_current()
    new_version = f"v{date.today().isoformat()}.{sequence_number()}"
    new_policy = deep_copy(current_policy)

    for update in resolved:
        apply_single_update(new_policy, update)

    policy_store.save_version(new_version, new_policy, metadata={
        "updates": resolved,
        "source_engines": list(set(u.source_engine for u in resolved)),
        "total_confidence": mean(u.confidence for u in resolved)
    })

    # 6. Canary rollout
    canary = start_canary(
        policy_version=new_version,
        traffic_percentage=5,
        duration_minutes=120,
        rollback_triggers=[
            {"metric": "route_success_rate", "threshold": -0.05},
            {"metric": "alert_false_positive_rate", "threshold": +0.10},
            {"metric": "user_rejection_rate", "threshold": +0.08}
        ]
    )

    return canary
```

**Canary Rollout Process:**

```
  ┌──────────────┐
  │  New Policy  │
  │  Version     │
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐    5% traffic     ┌──────────────┐
  │  Canary      │──────────────────▶│  Monitor     │
  │  Deploy      │                   │  (2 hours)   │
  └──────────────┘                   └──────┬───────┘
                                            │
                              ┌─────────────┼─────────────┐
                              │             │             │
                              ▼             ▼             ▼
                        Metrics OK    Degraded     Severely Degraded
                              │        (< -3%)        (< -5%)
                              ▼             │             │
                     ┌──────────────┐       │             │
                     │ Promote to   │       ▼             ▼
                     │ 25% → 50%   │  ┌──────────┐  ┌──────────┐
                     │ → 100%       │  │ Hold     │  │ Rollback │
                     └──────────────┘  │ + Alert  │  │ Immediate│
                                       └──────────┘  └──────────┘
```

**Rollout stages:** 5% (2h) -> 25% (2h) -> 50% (2h) -> 100% (permanent until next cycle)

**What Gets Updated:**

| Target | Parameter | Update Mechanism |
|---|---|---|
| Routing weights | `flood_penalty_multiplier` per zone | Hot-reload via Kafka consumer in Routing Module |
| Severity calibration | `sensor_weight`, `weather_weight`, `wind_direction_weight` per zone | Hot-reload via config store |
| Trust scores | `trust_score` per source | Direct DB update, cached in Redis |
| Alert thresholds | `flood_alert_trigger` per zone | Hot-reload via Kafka consumer in Alerting Module |
| Route preferences | `preferred_road_type`, `max_detour_ratio` per zone | Hot-reload via config store |

**Edge Cases:**

| Edge Case | Handling |
|---|---|
| **Conflicting updates** | Conflict resolution algorithm (section 5.5 step 3). If LLM and RL disagree by >50%, the update is held for human review with a 24-hour SLA. |
| **Cascading changes** | Changes to trust scores can propagate to severity scores, which propagate to routing weights. To prevent cascade amplification, a maximum of 1 hop of propagation is allowed per cycle. Indirect effects are deferred to the next cycle. |
| **Policy oscillation** | Batch updates (not real-time) prevent rapid oscillation. Additionally, a "damping factor" limits any single parameter from changing by more than 20% per cycle. If a parameter has been adjusted in the same direction for 3 consecutive cycles, the 4th adjustment is capped at 5%. |
| **Rollback failure** | If the rollback mechanism itself fails (e.g., Kafka is down), the system falls back to the last known good policy stored in S3. Every policy version is tagged with a `known_good` flag set only after 24h of stable production metrics. |
| **Simultaneous canaries** | Only one canary is allowed at a time. If a new cycle completes while a canary is in progress, the new updates are queued and applied after the current canary resolves. |

---

## 6. Algorithms / Decision Logic

### 6.1 Trust Scoring Formula

Trust scores quantify the reliability of each feedback source based on historical accuracy and recency.

```
trust_score = (correct_feedbacks / total_feedbacks) * recency_weight

where:
  recency_weight = exp(-lambda * days_since_last_calibration)
  lambda = 0.02 (half-life ~35 days)
```

**Full computation:**

```python
def compute_trust_score(source):
    if source.total_feedbacks == 0:
        return 0.5  # Uninformed prior

    # Base accuracy
    accuracy = source.correct_feedbacks / source.total_feedbacks

    # Bayesian smoothing (prevent extreme scores with few observations)
    # Uses Beta distribution prior: alpha=2, beta=2 (uniform-ish prior)
    smoothed_accuracy = (source.correct_feedbacks + 2) / (source.total_feedbacks + 4)

    # Recency decay
    days_since = (now() - source.last_calibrated).days
    recency_weight = math.exp(-0.02 * days_since)

    # Weighted trust
    weighted_trust = smoothed_accuracy * recency_weight

    # Clamp to [0.05, 0.99] to prevent total exclusion or blind trust
    return max(0.05, min(0.99, weighted_trust))
```

**Example calculations:**

| Source | Total | Correct | Days Since | Accuracy | Smoothed | Recency | Weighted Trust |
|---|---|---|---|---|---|---|---|
| camera-i45-exit12 | 312 | 228 | 0 | 0.731 | 0.728 | 1.000 | 0.728 |
| weather-api-owm | 1580 | 1396 | 3 | 0.884 | 0.883 | 0.942 | 0.832 |
| user-usr-7f3e2a91 | 12 | 10 | 1 | 0.833 | 0.750 | 0.980 | 0.735 |
| news-houston-chron | 45 | 29 | 14 | 0.644 | 0.633 | 0.756 | 0.479 |

### 6.2 Feedback Weighting

When multiple feedback events contribute to a decision, they are weighted by the source's trust score:

```python
def compute_weighted_signal(feedbacks):
    """
    Given a list of feedback events, compute a weighted consensus signal.
    Returns a value in [-1, 1] where -1 = strong negative, +1 = strong positive.
    """
    weighted_sum = 0.0
    weight_total = 0.0

    for fb in feedbacks:
        # Direction: +1 for positive feedback, -1 for negative
        direction = FEEDBACK_DIRECTION[fb.feedback_type]
        # e.g., route_success=+1, route_failed=-1, flood_confirmed=+1, flood_rejected=-1

        # Weight = trust_score * recency_factor * source_type_multiplier
        trust = trust_store.get(fb.user_id).weighted_trust
        recency = math.exp(-0.1 * hours_since(fb.timestamp))
        source_mult = SOURCE_TYPE_MULTIPLIER[fb.source_type]
        # operator=1.5, user=1.0, camera=1.2, news=0.8, social_media=0.5

        weight = trust * recency * source_mult
        weighted_sum += direction * weight
        weight_total += weight

    if weight_total == 0:
        return 0.0

    return weighted_sum / weight_total
```

### 6.3 LLM Reasoning Loop

```
  ┌─────────────┐
  │ 1. Gather   │    Query agent memory for failures,
  │    Context   │    current policy, weather history
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │ 2. Build    │    Construct structured prompt with
  │    Prompt   │    zone, failures, patterns, policy
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │ 3. LLM Call │    Send to LLM Gateway (Claude Sonnet)
  │             │    temperature=0.2, JSON response format
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │ 4. Parse    │    Extract JSON from response,
  │    Response │    deserialize into PolicyAdjustment
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐    Check bounds, schema, sanity.
  │ 5. Validate │    Reject if change > 100% of current,
  │             │    reject if > 5 adjustments
  └──────┬──────┘
         │
    ┌────┴────┐
    │         │
  Valid    Invalid
    │         │
    ▼         ▼
  ┌──────┐  ┌──────────┐
  │Store │  │Log +     │
  │in DB │  │Fallback  │
  └──────┘  │to Rules  │
            └──────────┘
```

### 6.4 RL Reward Design Summary

| Outcome | Reward | Weight Rationale |
|---|---|---|
| Route completes, no flood | +2.0 | Primary objective -- safe route completion |
| Route completes, flood encountered | -3.0 | Critical failure -- should have avoided |
| Route abandoned | -4.0 | Worst outcome -- user had to find their own way |
| Acceptable ETA (<=1.2x predicted) | +1.0 | Quality of service matters |
| Tolerable ETA (1.2-1.5x) | 0.0 | Neutral |
| Unacceptable ETA (>1.5x) | -1.0 | Poor experience |
| User explicit positive | +0.5 | Bonus for confirmed satisfaction |
| User rejected route | -1.0 | User disagreed with suggestion |
| Excessive detour | -0.3 * (ratio-1) | Prevents gaming via ultra-long routes |
| False alarm (alert, no flood) | -0.5 | Erodes user trust in alerts |
| Missed warning (no alert, flood) | -2.0 | Safety-critical failure |

**Total reward range:** approximately [-7.0, +3.5] per episode.

### 6.5 Policy Update Threshold

A policy adjustment is only applied if it meets ALL of the following criteria:

```python
def should_apply(candidate):
    return (
        candidate.confidence >= 0.7 and          # Minimum confidence
        candidate.sample_size >= 10 and           # Minimum data points
        candidate.change_ratio <= 1.0 and         # Max 100% change
        candidate.zone_failure_rate > 0.05 and    # Zone has a real problem
        not candidate.is_conflicted and           # No unresolved conflicts
        candidate.age_hours <= 24                  # Not stale
    )
```

---

## 7. Interfaces / APIs

All endpoints are prefixed with `/api/v1` and require JWT authentication. Operator-level endpoints require the `agent:write` scope.

### 7.1 POST /api/v1/feedback

Submit a feedback event.

**Request:**

```http
POST /api/v1/feedback
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
Content-Type: application/json
Idempotency-Key: fb-20260322-a1b2c3d4

{
  "route_id": "rt-abc123",
  "location": {
    "lat": 29.7604,
    "lng": -95.3698
  },
  "feedback_type": "route_failed",
  "feedback_value": {
    "reason": "flood_encountered",
    "segment_index": 2,
    "water_depth_cm": 30
  }
}
```

**Response (202 Accepted):**

```json
{
  "data": {
    "feedback_id": "fb-20260322-a1b2c3d4",
    "status": "accepted",
    "trust_weight": 0.85,
    "zone_id": "zone-houston-c3"
  },
  "meta": {
    "request_id": "req-9a8b7c6d",
    "processed_at": "2026-03-22T14:30:01Z"
  }
}
```

**Error Responses:**

| Status | Condition | Body |
|---|---|---|
| 400 | Invalid feedback_type or missing required fields | `{"errors": [{"code": "INVALID_FEEDBACK_TYPE", "message": "..."}]}` |
| 409 | Duplicate idempotency key | `{"errors": [{"code": "DUPLICATE_FEEDBACK", "message": "..."}]}` |
| 429 | Rate limit exceeded (50/hour) | `{"errors": [{"code": "RATE_LIMITED", "retry_after_seconds": 120}]}` |

---

### 7.2 GET /api/v1/agent/memory/{zone_id}

Query the agent's memory for a specific zone.

**Request:**

```http
GET /api/v1/agent/memory/zone-houston-c3?tier=mid&min_confidence=0.3&limit=20
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

**Query Parameters:**

| Param | Type | Default | Description |
|---|---|---|---|
| `tier` | string | `all` | Memory tier: `short`, `mid`, `long`, or `all` |
| `min_confidence` | float | `0.1` | Minimum confidence threshold |
| `pattern_type` | string | (none) | Filter by pattern type |
| `since` | ISO datetime | (none) | Only entries updated after this timestamp |
| `limit` | int | `50` | Maximum entries to return |

**Response (200 OK):**

```json
{
  "data": {
    "zone_id": "zone-houston-c3",
    "queried_tiers": ["mid"],
    "entries": [
      {
        "memory_id": "mem-20260322-x9y8z7",
        "memory_tier": "mid",
        "pattern_type": "recurring_flood_zone",
        "data": {
          "failure_rate": 0.34,
          "total_routes": 142,
          "failed_routes": 48,
          "common_conditions": {
            "wind_direction": "northeast",
            "rainfall_threshold_mm_hr": 25
          },
          "peak_failure_hours": [14, 15, 16, 17]
        },
        "confidence": 0.82,
        "last_updated": "2026-03-22T12:00:00Z"
      }
    ],
    "total_count": 1
  },
  "meta": {
    "request_id": "req-1a2b3c4d",
    "cache_hit": false
  }
}
```

---

### 7.3 POST /api/v1/agent/learn

Trigger an on-demand learning cycle. Typically called by the scheduler or by an operator for manual intervention.

**Request:**

```http
POST /api/v1/agent/learn
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
X-Operator-Scope: agent:write

{
  "engine": "llm",
  "zone_ids": ["zone-houston-c3", "zone-houston-d2"],
  "lookback_hours": 12,
  "dry_run": false
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `engine` | string | yes | `llm`, `rl`, or `both` |
| `zone_ids` | string[] | no | Specific zones to analyze (default: all zones with recent failures) |
| `lookback_hours` | int | no | How far back to look for feedback (default: 6 for LLM, 24 for RL) |
| `dry_run` | bool | no | If true, generate recommendations but do not apply (default: false) |

**Response (202 Accepted):**

```json
{
  "data": {
    "cycle_id": "lc-20260322-p3q4r5",
    "engine": "llm",
    "status": "running",
    "zones_queued": 2,
    "estimated_duration_seconds": 45,
    "status_url": "/api/v1/agent/learn/lc-20260322-p3q4r5"
  },
  "meta": {
    "request_id": "req-5e6f7g8h"
  }
}
```

**Polling Status (GET /api/v1/agent/learn/{cycle_id}):**

```json
{
  "data": {
    "cycle_id": "lc-20260322-p3q4r5",
    "status": "completed",
    "results": {
      "zones_analyzed": 2,
      "candidates_generated": 5,
      "candidates_accepted": 3,
      "candidates_rejected": 2,
      "rejection_reasons": {
        "low_confidence": 1,
        "change_too_large": 1
      }
    },
    "completed_at": "2026-03-22T12:15:42Z"
  }
}
```

---

### 7.4 GET /api/v1/policy/current

Get the current production routing policy.

**Request:**

```http
GET /api/v1/policy/current?zone_id=zone-houston-c3
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

**Response (200 OK):**

```json
{
  "data": {
    "policy_version": "v2026.03.22.003",
    "applied_at": "2026-03-22T12:16:00Z",
    "rollout_status": "promoted",
    "zone_policies": {
      "zone-houston-c3": {
        "flood_penalty_multiplier": 1.55,
        "alert_threshold": 0.55,
        "wind_direction_weight_ne": 0.35,
        "max_detour_ratio": 2.0,
        "preferred_road_types": ["highway", "elevated"],
        "source_weights": {
          "weather_api": 0.83,
          "camera-i45-exit12": 0.73,
          "news": 0.48
        }
      }
    },
    "global_defaults": {
      "flood_penalty_multiplier": 1.0,
      "alert_threshold": 0.7,
      "max_detour_ratio": 1.8
    }
  },
  "meta": {
    "request_id": "req-8h9i0j1k",
    "version_history": [
      {"version": "v2026.03.22.003", "applied_at": "2026-03-22T12:16:00Z"},
      {"version": "v2026.03.22.002", "applied_at": "2026-03-22T06:16:00Z"},
      {"version": "v2026.03.21.001", "applied_at": "2026-03-21T06:15:00Z"}
    ]
  }
}
```

---

### 7.5 POST /api/v1/policy/update

Manually apply a policy update (operator override). Bypasses the learning engine but still goes through canary rollout.

**Request:**

```http
POST /api/v1/policy/update
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
X-Operator-Scope: agent:write

{
  "updates": [
    {
      "target": "routing_weight",
      "scope": {
        "zone_id": "zone-houston-c3",
        "parameter": "flood_penalty_multiplier"
      },
      "new_value": 2.0,
      "reason": "Manual override: tropical storm approaching, increasing penalty preemptively"
    }
  ],
  "skip_canary": false,
  "ttl_hours": 48
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `updates` | array | yes | List of policy adjustments to apply |
| `skip_canary` | bool | no | Skip canary rollout (emergency only, requires `agent:emergency` scope) |
| `ttl_hours` | int | no | Auto-revert after N hours (for temporary overrides) |

**Response (202 Accepted):**

```json
{
  "data": {
    "update_id": "pu-20260322-manual-001",
    "policy_version": "v2026.03.22.004",
    "rollout_status": "canary",
    "rollout_percentage": 5,
    "updates_applied": 1,
    "revert_at": "2026-03-24T14:31:00Z",
    "status_url": "/api/v1/policy/update/pu-20260322-manual-001"
  },
  "meta": {
    "request_id": "req-2l3m4n5o",
    "operator": "operator@cityworks.gov"
  }
}
```

---

## 8. Scaling & Performance

### 8.1 Feedback Ingestion

| Concern | Solution | Target |
|---|---|---|
| Throughput | Kafka topic `feedback.events` with 12 partitions, partitioned by `zone_id` | 10,000+ events/day sustained, burst to 50,000 during major flood events |
| Ordering | Per-partition ordering guarantees chronological processing within a zone | Events for a single zone processed in order |
| Consumer lag | 3 consumer instances per topic, auto-scaling via Kubernetes HPA on consumer lag metric | Max processing delay: 5 seconds at peak |
| Backpressure | Kafka consumer uses manual offset commits with batch processing (100 events/batch) | Prevents data loss during downstream outages |

### 8.2 Learning Cycle

| Engine | Schedule | Duration Target | Compute |
|---|---|---|---|
| LLM Learning | Every 6 hours (00:00, 06:00, 12:00, 18:00 UTC) | < 10 minutes | 2 vCPU, 4 GB RAM (API calls, no GPU) |
| RL Training | Nightly at 02:00 UTC | < 120 minutes | 4 vCPU, 16 GB RAM, 1 GPU (T4) |
| Policy Update | After each learning cycle completes | < 2 minutes | 1 vCPU, 2 GB RAM |

### 8.3 Storage

| Tier | Technology | Estimated Size | Retention |
|---|---|---|---|
| Short-term memory | Redis 7.x (cluster mode) | ~200 MB per city | 24h TTL |
| Mid-term memory | PostgreSQL 16 (TimescaleDB extension) | ~2 GB per city per month | 30 days + decay |
| Long-term memory | PostgreSQL 16 + S3 (Parquet archives) | ~500 MB per city per year (compressed) | Indefinite |
| Feedback events | PostgreSQL 16 (partitioned by month) | ~5 GB per city per year | 2 years hot, then S3 archive |
| Policy versions | PostgreSQL + S3 | ~10 MB per city per year | Indefinite |

### 8.4 LLM Call Optimization

| Optimization | Implementation |
|---|---|
| **Batching** | Group failures by zone before calling LLM. One call per zone per cycle (not per failure). |
| **Caching** | Cache LLM responses by `hash(zone_id, weather_pattern, failure_pattern)`. TTL: 6 hours. Hit rate target: >40%. |
| **Rate limiting** | Max 50 LLM calls per 6-hour cycle. Zones prioritized by failure count. |
| **Model selection** | Use Claude Sonnet for routine analysis. Escalate to Claude Opus only for conflicting or low-confidence results (max 5 escalations per cycle). |
| **Token budget** | Max 2000 input tokens + 2000 output tokens per call. Context is truncated to most recent 10 failures per zone. |

### 8.5 RL Training

| Aspect | Configuration |
|---|---|
| **Schedule** | Nightly at 02:00 UTC (off-peak) |
| **Data source** | Full day's feedback events + historical replay buffer (last 90 days) |
| **Training infra** | Single GPU instance (T4) on EKS, spot instance with checkpoint recovery |
| **Model checkpoint** | Saved every 1000 steps to S3. Training resumes from last checkpoint on interruption. |
| **Validation** | 20% holdout set. Early stopping if validation reward plateaus for 5 epochs. |
| **Deployment** | New policy parameters written to S3, consumed by Policy Update Engine. Never directly deployed. |

---

## 9. Failure Modes & Mitigation

| Failure Mode | Impact | Detection | Mitigation |
|---|---|---|---|
| **LLM Gateway unavailable** | No LLM-based learning for current cycle | Health check fails, LLM error count > 3 in 5 minutes | Fall back to rule-based heuristics: if zone failure_rate > 0.25, bump penalty by 10%. Log skipped cycle. Retry next scheduled cycle. |
| **Feedback spam / manipulation** | Corrupted trust scores, incorrect policy shifts | Anomaly detection on feedback volume per user, geographic clustering of feedback from single IP | Rate limiting (50/hr/user), spam ML classifier, trust scoring (new users start at 0.5), quarantine flagged accounts. Operator notification for review. |
| **Policy oscillation** | Routing weights flip-flop between cycles, degrading user experience | Monitor parameter delta history: flag if same parameter changes direction 3+ times in 48 hours | Batch updates (not real-time), damping factor (max 20% change per cycle), 3-cycle same-direction cap (5% max on 4th). |
| **Memory corruption** | Incorrect patterns fed to learning engines | CRC32 checksum validation on every read, nightly integrity scan | Snapshot backups every 6 hours to S3. Corrupted entries are quarantined (not deleted) and replaced from last good snapshot. |
| **Biased feedback** | Over-representation of certain zones, user demographics | Geographic distribution analysis (Gini coefficient on feedback per zone), demographic sampling audit (monthly) | Minimum feedback threshold per zone before policy changes. Geographic sampling balance: weight under-represented zones 2x. Operator feedback weighted 1.5x to counterbalance volume bias. |
| **RL training divergence** | Policy network produces degenerate actions (e.g., always max penalty) | Validation reward drops >20% from baseline, action distribution entropy < 0.1 | Early stopping, rollback to last known good checkpoint, increase exploration epsilon, alert ML team. |
| **Kafka consumer lag** | Feedback events processed with increasing delay | Consumer lag metric > 1000 events sustained for > 5 minutes | Auto-scale consumer instances via HPA. If lag > 10,000, trigger alert and shed passive signals (lowest priority). |
| **Database connection exhaustion** | Feedback writes and memory queries fail | Connection pool utilization > 90% | PgBouncer connection pooling (max 100 connections), read replicas for memory queries, circuit breaker on write path. |

---

## 10. Observability

### 10.1 Metrics (Prometheus)

| Metric | Type | Labels | Alert Threshold |
|---|---|---|---|
| `feedback_events_total` | Counter | `feedback_type`, `zone_id` | < 10 events/hour city-wide (possible ingestion failure) |
| `feedback_processing_duration_seconds` | Histogram | `stage` (validate, enrich, persist) | p99 > 5s |
| `learning_cycle_duration_seconds` | Histogram | `engine` (llm, rl) | LLM > 600s, RL > 7200s |
| `policy_updates_total` | Counter | `target`, `rollout_status` | > 10 updates in single cycle |
| `policy_rollbacks_total` | Counter | `reason` | Any rollback triggers PagerDuty alert |
| `route_success_rate` | Gauge | `zone_id` | < 0.80 sustained for > 1 hour |
| `trust_score_distribution` | Histogram | `source_type` | Mean trust < 0.4 for any source type |
| `agent_memory_entries` | Gauge | `tier`, `zone_id` | Short-term > 450 per zone (approaching LRU limit) |
| `llm_call_errors_total` | Counter | `error_type` | > 5 in 30 minutes |
| `llm_cache_hit_rate` | Gauge | (none) | < 0.2 (cache is not working) |
| `rl_training_reward_mean` | Gauge | (none) | Decreasing trend over 3 consecutive nights |
| `canary_traffic_percentage` | Gauge | `policy_version` | Stuck at 5% for > 6 hours (promotion stalled) |

### 10.2 Structured Logs

All log entries are JSON-formatted and shipped to the ELK stack via Filebeat.

```json
{
  "timestamp": "2026-03-22T14:30:01Z",
  "service": "agent-feedback-learning",
  "component": "feedback_collector",
  "level": "INFO",
  "event": "feedback_accepted",
  "feedback_id": "fb-20260322-a1b2c3d4",
  "user_id": "usr-7f3e2a91",
  "zone_id": "zone-houston-c3",
  "feedback_type": "route_failed",
  "trust_weight": 0.85,
  "processing_time_ms": 42,
  "trace_id": "tr-9a8b7c6d5e4f"
}
```

**Key log events:**

| Event | Component | Level | When |
|---|---|---|---|
| `feedback_accepted` | Feedback Collector | INFO | Every accepted feedback event |
| `feedback_rejected` | Feedback Collector | WARN | Spam, rate-limited, or invalid feedback |
| `llm_reasoning_call` | LLM Learning Engine | INFO | Every LLM API call (includes prompt hash, response time, token count) |
| `llm_recommendation_generated` | LLM Learning Engine | INFO | Recommendation parsed and validated |
| `llm_recommendation_rejected` | LLM Learning Engine | WARN | Recommendation failed validation |
| `rl_training_epoch` | RL Learning Engine | INFO | Each training epoch (includes reward, loss, entropy) |
| `policy_update_applied` | Policy Update Engine | INFO | Policy version promoted or canary started |
| `policy_rollback` | Policy Update Engine | ERROR | Canary failed, rollback executed |
| `trust_score_updated` | Trust Scorer | INFO | Source trust score recalculated |
| `memory_decay_completed` | Agent Memory | INFO | Nightly decay job completed |

### 10.3 Alerts (PagerDuty Integration)

| Alert | Severity | Condition | Action |
|---|---|---|---|
| `RouteSuccessRateDrop` | P1 (Critical) | route_success_rate < 0.70 for any zone for > 30 minutes | Page on-call engineer. Auto-rollback to last known good policy. |
| `PolicyRollbackTriggered` | P2 (High) | Any policy rollback occurs | Notify ML team via Slack. Investigate before next cycle. |
| `LLMErrorRateHigh` | P2 (High) | llm_call_errors > 5 in 30 minutes | Notify ML team. System auto-falls-back to rule-based. |
| `FeedbackIngestionDrop` | P3 (Medium) | feedback_events_total < 10/hour city-wide | Investigate Kafka consumer health. |
| `TrustScoreAnomaly` | P3 (Medium) | Any source trust score drops > 0.2 in single calibration | Investigate source (possible sensor failure or manipulation). |
| `RLTrainingDivergence` | P3 (Medium) | rl_training_reward_mean decreasing 3+ consecutive nights | Review reward function. Check for distribution shift. |
| `MemoryCapacityWarning` | P4 (Low) | Redis memory > 80% or mid-term table > 10M rows | Plan capacity expansion. |

### 10.4 Dashboards (Grafana)

**Dashboard 1: Feedback Overview**
- Feedback volume time series (by type and zone)
- Feedback heatmap overlaid on city map (geographic distribution)
- Trust score distribution by source type (histogram)
- Spam detection rate (time series)

**Dashboard 2: Learning Engine Performance**
- LLM cycle duration and call count (time series)
- LLM recommendation acceptance rate (gauge)
- LLM cache hit rate (gauge)
- RL training reward curve (per nightly run)
- RL policy entropy (trend -- should decrease over time)

**Dashboard 3: Policy Management**
- Policy version timeline (annotations on route success rate chart)
- Active canary status (current version, traffic %, duration)
- Parameter change history per zone (line chart per parameter)
- Rollback history (event log)
- A/B test results: canary vs. control route success rate (comparison bar chart)

**Dashboard 4: Agent Memory Health**
- Memory entry counts by tier and zone (stacked bar)
- Confidence distribution by tier (histogram)
- Decay rate effectiveness (entries expired vs. created per day)
- Memory query latency (p50, p95, p99)

---

## 11. Future Improvements

### 11.1 Multi-Agent Collaboration

Current design treats each zone independently. Future work:

- **Cross-zone awareness:** If Zone C3 is penalized, adjacent Zone C4 will see increased traffic. Agents for neighboring zones should coordinate penalties to prevent cascading overload.
- **Hierarchical agents:** City-level meta-agent coordinates zone-level agents, enforcing global constraints (total network throughput, emergency vehicle corridors).
- **Consensus protocol:** Before applying a policy change, the zone agent consults neighboring zone agents. If the change would degrade neighbors by >5%, it is modified or deferred.

### 11.2 Federated Learning Across Cities

Enable multiple SafeMove AI deployments (Houston, Miami, Jakarta) to share learned patterns without sharing raw data:

- **Federated averaging:** Each city trains a local RL model. Periodically, model weight deltas are aggregated by a central server and redistributed.
- **Transfer learning:** A city with similar geography (flat, coastal, tropical) can bootstrap its learning from a mature deployment.
- **Privacy guarantees:** Only model gradients are shared, never raw feedback data. Differential privacy noise is added before transmission.

### 11.3 Real-Time RL with Continuous Policy Gradient

Move from nightly batch RL training to continuous online learning:

- **Streaming reward signals:** Process feedback events as they arrive, updating the policy network with small gradient steps.
- **Safety constraints:** Constrained policy optimization (CPO) to ensure safety bounds (route success rate never drops below threshold).
- **Challenge:** Requires careful learning rate scheduling and much stronger guardrails against policy instability.

### 11.4 User Preference Personalization

Current system optimizes a single global objective (safe + fast). Future work:

- **User profiles:** Some users prefer the fastest route even with moderate risk. Others prefer maximum safety regardless of detour.
- **Contextual bandits:** Learn per-user preference weights from historical behavior (which route suggestions they accept vs. reject).
- **Privacy:** Preferences stored locally on device, only aggregate patterns shared with the server.

### 11.5 Automated Prompt Optimization

Current LLM prompts are manually engineered. Future work:

- **Prompt evaluation framework:** Score each prompt variant by the accuracy of its recommendations (measured by post-application route success rate improvement).
- **DSPy integration:** Use DSPy to automatically optimize prompt structure, few-shot examples, and output schema based on evaluation metrics.
- **A/B testing for prompts:** Run two prompt variants in parallel and promote the one with better downstream outcomes.

### 11.6 Automated Sensor Health Detection

Use feedback patterns to automatically detect degraded sensors:

- If a camera's trust score drops below 0.4, automatically flag it for maintenance.
- If a weather API's predictions consistently diverge from user-reported conditions in a specific zone, automatically down-weight it for that zone while maintaining normal weight elsewhere.
- Generate automated work orders for physical sensor inspection when trust scores decline over 3+ consecutive calibration cycles.

---

## Appendix A: Configuration Reference

```yaml
# agent-feedback-learning-config.yaml

feedback_collector:
  kafka_topics:
    explicit: "feedback.explicit"
    implicit: "feedback.implicit"
    operator: "feedback.operator"
    passive: "feedback.passive"
    enriched: "feedback.enriched"
  rate_limit:
    max_per_user_per_hour: 50
    max_per_ip_per_hour: 200
  spam_detection:
    enabled: true
    threshold: 0.8
    quarantine_after_strikes: 3
  dedup:
    ttl_seconds: 86400
    redis_key_prefix: "feedback:dedup"
  staleness:
    soft_penalty_after_hours: 6
    reject_after_hours: 24

agent_memory:
  short_term:
    backend: "redis"
    ttl_seconds: 86400
    max_entries_per_zone: 500
    eviction_policy: "lru"
  mid_term:
    backend: "postgresql"
    retention_days: 30
    decay_factor: 0.95
    decay_schedule: "0 3 * * *"  # 03:00 UTC daily
    min_confidence: 0.01
  long_term:
    backend: "postgresql+s3"
    decay_factor: 0.995
    decay_schedule: "0 4 * * 0"  # 04:00 UTC weekly
    s3_bucket: "safemove-agent-memory"
    compaction_schedule: "0 5 1 * *"  # 05:00 UTC monthly

learning_engine:
  llm:
    schedule: "0 */6 * * *"  # Every 6 hours
    model: "claude-sonnet"
    escalation_model: "claude-opus"
    temperature: 0.2
    max_tokens: 2000
    max_calls_per_cycle: 50
    max_escalations_per_cycle: 5
    min_failures_for_analysis: 3
    cache_ttl_seconds: 21600
  rl:
    schedule: "0 2 * * *"  # 02:00 UTC daily
    algorithm: "PPO"
    framework: "stable-baselines3"
    max_training_minutes: 120
    replay_buffer_days: 90
    validation_split: 0.2
    cold_start_threshold: 1000
    cold_start_epsilon: 0.5
    production_epsilon_min: 0.05

policy_update:
  confidence_threshold: 0.7
  min_sample_size: 10
  max_change_ratio: 1.0
  max_updates_per_cycle: 10
  damping_factor: 0.2  # Max 20% change per cycle
  canary:
    initial_percentage: 5
    stages: [5, 25, 50, 100]
    stage_duration_minutes: 120
    rollback_triggers:
      route_success_rate_drop: 0.05
      false_positive_rate_increase: 0.10
      user_rejection_rate_increase: 0.08
  rollback:
    fallback_bucket: "safemove-policy-snapshots"
    known_good_min_age_hours: 24

trust_scoring:
  prior_alpha: 2
  prior_beta: 2
  recency_lambda: 0.02
  min_trust: 0.05
  max_trust: 0.99
  source_type_multipliers:
    operator: 1.5
    camera: 1.2
    user: 1.0
    water_sensor: 1.3
    weather_api: 1.1
    news: 0.8
    social_media: 0.5
```

---

## Appendix B: Glossary

| Term | Definition |
|---|---|
| **Canary rollout** | Deploying a change to a small percentage of traffic before full rollout, to detect regressions early. |
| **Cold start** | The initial period when a zone or source has insufficient data for reliable learning. |
| **Decay factor** | Multiplier applied periodically to reduce the confidence of aging memory entries. |
| **Epsilon-greedy** | Exploration strategy where the agent takes a random action with probability epsilon, and the best known action with probability (1 - epsilon). |
| **GAE** | Generalized Advantage Estimation -- variance reduction technique for policy gradient RL. |
| **PPO** | Proximal Policy Optimization -- RL algorithm that constrains policy updates to prevent destructive large steps. |
| **Replay buffer** | Dataset of historical experiences used for offline RL training. |
| **Trust score** | Numerical measure [0, 1] of a feedback source's reliability, based on historical accuracy and recency. |
| **Zone** | A geographic subdivision of the city used for localized policy management (typically ~1 km^2). |
