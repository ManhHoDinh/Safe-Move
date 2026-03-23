# LLM Agent, Prediction Engine & Simulation Engine — Technical Reference

This document provides a comprehensive technical overview of three core AI modules in the Safe-Move AI-Navigate system: the Agent + Feedback Learning System, the Prediction Engine, and the Simulation Engine.

---

## Table of Contents

1. [Agent + Feedback Learning System](#1-agent--feedback-learning-system)
2. [Prediction Engine](#2-prediction-engine)
3. [Simulation Engine](#3-simulation-engine)
4. [Cross-Module Integration](#4-cross-module-integration)
5. [Strategic Value](#5-strategic-value)

---

## 1. Agent + Feedback Learning System

### 1.1 Overview

The Agent + Feedback Learning System is a closed-loop intelligence layer that continuously improves routing decisions and flood severity assessments based on real-world outcomes. It combines LLM-based causal analysis with reinforcement learning (RL) reward signals to adapt system behavior over time.

### 1.2 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   FEEDBACK LEARNING LOOP                │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │   Feedback    │───▶│    Agent     │                   │
│  │  Collector    │    │   Memory     │                   │
│  └──────────────┘    └──────┬───────┘                   │
│         ▲                   │                            │
│         │                   ▼                            │
│  ┌──────┴───────┐    ┌──────────────┐                   │
│  │   Policy     │◀───│   Learning   │                   │
│  │   Update     │    │   Engine     │                   │
│  └──────────────┘    └──────────────┘                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 1.3 Components

#### 1.3.1 Feedback Collector

**Purpose:** Aggregates explicit and implicit feedback signals from multiple sources.

**Input signals:**
- Route success/failure outcomes (did the user complete the route without encountering flooding?)
- User confirm/reject actions (explicit thumbs-up/down on route suggestions)
- Operator corrections (traffic management operators overriding system decisions)
- Implicit signals: GPS trace analysis, rerouting events, speed anomalies

**Output:**
```json
{
  "event_id": "fb-20260322-001",
  "route_id": "rt-abc123",
  "outcome": "failure",
  "signals": {
    "user_action": "rerouted",
    "flood_encountered": true,
    "segment": "B",
    "delay_minutes": 12
  },
  "timestamp": "2026-03-22T14:30:00Z"
}
```

#### 1.3.2 Agent Memory

**Purpose:** Maintains a multi-tier memory system for contextual learning.

| Memory Tier | Retention   | Content                                      | Usage                         |
|-------------|-------------|----------------------------------------------|-------------------------------|
| Short-term  | Hours       | Recent events, active flood zones, live signals | Immediate routing decisions   |
| Mid-term    | Weeks       | Weekly patterns, recurring flood zones         | Pattern recognition           |
| Long-term   | Months+     | Historical weights, seasonal trends, trust scores | Baseline calibration         |

**Implementation:** Key-value store with TTL-based expiration, backed by Redis (short-term), PostgreSQL (mid-term), and S3/archival storage (long-term).

#### 1.3.3 Learning Engine

**Purpose:** Analyzes feedback to determine why decisions succeeded or failed, and computes parameter adjustments.

**Two learning modes:**

**Mode A — LLM-based Causal Analysis:**
```
Prompt:
  A route was recommended but failed.
  Context: weather=high, 3 flood reports near segment B

  Analyze:
  1. Why did route fail?
  2. Which signal needs higher weight?
  → Return JSON adjustment
```

The LLM returns structured adjustments:
```json
{
  "analysis": "Flood reports near segment B were underweighted relative to weather severity",
  "adjustments": {
    "news_flood_report_weight": "+0.15",
    "weather_severity_weight": "+0.05",
    "camera_signal_weight": "unchanged"
  },
  "confidence": 0.82
}
```

**Mode B — RL Reward-based Optimization:**

| Signal               | Reward |
|----------------------|--------|
| Avoids flood zone    | +2     |
| Acceptable ETA       | +1     |
| Enters flood zone    | -3     |
| User rejects route   | -1     |

The RL policy optimizer uses these reward signals to update routing weights via policy gradient methods.

#### 1.3.4 Policy Update

**Purpose:** Applies learned adjustments to system parameters.

**Updated parameters:**
- Routing weights (how much each signal affects route scoring)
- Severity calibration (threshold adjustments for flood severity levels)
- Source trust scores (reliability weighting per data source)

**Safety mechanisms:**
- Batch updates (not real-time) to prevent oscillation
- Rollback checks: if new policy degrades performance by >5% over 24h, revert
- Confidence thresholds: only apply adjustments above 0.7 confidence

### 1.4 Challenges & Mitigations

| Challenge           | Description                                      | Mitigation                                          |
|---------------------|--------------------------------------------------|-----------------------------------------------------|
| Sparse feedback     | Most users don't provide explicit ratings         | Use implicit signals (GPS, rerouting, speed changes) |
| Bias                | Over-trusting certain sources                     | Trust scoring with confidence intervals              |
| Policy oscillation  | Rapid changes causing unstable behavior           | Batch updates with rollback checks                   |
| Cold start          | New zones with no historical data                 | Transfer learning from similar geographic profiles   |

---

## 2. Prediction Engine

### 2.1 Overview

The Prediction Engine generates flood risk forecasts for specific locations and time windows. It combines traditional ML models with spatio-temporal analysis and real-time signal fusion to produce actionable warning scores.

### 2.2 Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                     PREDICTION PIPELINE                        │
│                                                                │
│  ┌──────────────┐                                              │
│  │   Feature     │  Historical floods, weather forecast,       │
│  │  Aggregator   │  camera signals, news, feedback             │
│  └──────┬───────┘                                              │
│         │                                                      │
│         ▼                                                      │
│  ┌──────────────┐                                              │
│  │   Baseline    │  Gradient boosting / time-series             │
│  │    Model      │  30-60 min prediction window                 │
│  └──────┬───────┘                                              │
│         │                                                      │
│         ▼                                                      │
│  ┌──────────────┐                                              │
│  │ Spatio-       │  Zone adjacency graph                       │
│  │ Temporal      │  If zone A floods → zone B risk increases   │
│  └──────┬───────┘                                              │
│         │                                                      │
│         ▼                                                      │
│  ┌──────────────┐                                              │
│  │   Signal      │  Combine model output with                  │
│  │   Fusion      │  live weather/camera/news                   │
│  └──────┬───────┘                                              │
│         │                                                      │
│         ▼                                                      │
│  ┌──────────────┐                                              │
│  │  Warning      │  Location + time window +                   │
│  │   Score       │  confidence + action                        │
│  └──────────────┘                                              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 2.3 Components

#### 2.3.1 Feature Aggregator

**Purpose:** Collects and normalizes input features from multiple data sources into a unified feature vector.

**Input sources:**
- Historical flood records (frequency, severity, duration per zone)
- Weather forecasts (rainfall intensity, humidity, wind, barometric pressure)
- Camera signals (water level estimation, road condition classification)
- News extraction (NLP-parsed flood reports, severity keywords)
- User feedback (confirm/reject history, implicit route signals)

**Output:** Normalized feature matrix with timestamp alignment and missing value imputation.

#### 2.3.2 Baseline Model

**Purpose:** Generates initial flood probability predictions using well-understood ML methods.

**Model options:**
- **Gradient Boosting (XGBoost/LightGBM):** For tabular features with strong predictive power
- **Time-series models (Prophet/ARIMA):** For temporal pattern extraction
- **Prediction window:** 30-60 minutes ahead

**Features used:** Rainfall accumulation, historical flood frequency, soil saturation index, tide levels (for coastal zones), drain capacity estimates.

#### 2.3.3 Spatio-Temporal Model

**Purpose:** Captures geographic flood propagation patterns.

**Approach:**
- Build a zone adjacency graph where edges represent water flow paths
- If zone A floods, compute increased risk for downstream zone B
- Use graph neural networks (GNN) or simpler adjacency-weighted propagation

**Key insight:** Flooding is not independent across zones. Upstream flooding significantly increases downstream risk within 15-45 minutes.

#### 2.3.4 Signal Fusion

**Purpose:** Combines model predictions with real-time signals for final risk assessment.

**Fusion formula:**
```
FinalRisk = α × BaselineScore + β × SpatioTemporalScore + γ × LiveSignalScore
```

Where live signals include:
- Real-time camera detections
- Breaking news reports
- User feedback from the last 30 minutes
- Current weather radar data

#### 2.3.5 Warning Score

**Purpose:** Produces the final actionable output.

**Output specification:**
```json
{
  "location": { "lat": 13.7563, "lng": 100.5018 },
  "predicted_flood": true,
  "time_window": "30-60 min",
  "confidence": 0.79,
  "risk_level": "HIGH",
  "action": "alert_and_avoid"
}
```

**Action mapping:**

| Risk Level | Confidence | Action           |
|------------|------------|------------------|
| LOW        | Any        | Monitor          |
| MEDIUM     | < 0.6      | Warn users       |
| MEDIUM     | >= 0.6     | Suggest alternate |
| HIGH       | Any        | Alert and avoid  |
| CRITICAL   | Any        | Block road       |

### 2.4 Challenges & Solutions

| Challenge        | Description                                           | Solution                                    |
|------------------|-------------------------------------------------------|---------------------------------------------|
| Data scarcity    | Limited flood event data in many zones                | Zone clustering + transfer learning         |
| Model drift      | Changing urban landscape alters flood patterns        | Retraining schedule + drift detection       |
| Sparse labels    | Few confirmed flood events for supervised learning    | Weak supervision + feedback events          |
| Class imbalance  | Floods are rare events (< 1% of observations)        | Reweighting + threshold tuning              |

---

## 3. Simulation Engine

### 3.1 Overview

The Simulation Engine enables "what-if" scenario analysis for urban flood events. It simulates the impact of flooding on traffic networks, evaluates rerouting strategies, and generates planning recommendations for government and traffic management stakeholders.

### 3.2 Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                    SIMULATION PIPELINE                         │
│                                                                │
│  ┌──────────────┐                                              │
│  │  Scenario     │  Define: rain intensity, duration,          │
│  │  Generator    │  flood points, time of day                  │
│  └──────┬───────┘                                              │
│         │                                                      │
│         ▼                                                      │
│  ┌──────────────┐                                              │
│  │   Route       │  Multi-user routing simulation              │
│  │  Simulation   │  with dynamic rerouting                     │
│  └──────┬───────┘                                              │
│         │                                                      │
│         ▼                                                      │
│  ┌──────────────┐                                              │
│  │   Impact      │  Congestion, delays, blocked zones,         │
│  │  Analyzer     │  rerouting load distribution                │
│  └──────┬───────┘                                              │
│         │                                                      │
│         ▼                                                      │
│  ┌──────────────┐                                              │
│  │  Planning     │  Actionable recommendations                 │
│  │  Recommendations │  for operators and planners              │
│  └──────────────┘                                              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 3.3 Components

#### 3.3.1 Scenario Generator

**Purpose:** Creates realistic flood scenarios for simulation.

**Input parameters:**
- Rain intensity and duration (e.g., heavy rain for 2 hours)
- Number and location of flood points
- Time of day (peak vs. off-peak traffic)
- Optional: historical event replay mode

**Scenario template example:**
```json
{
  "scenario_id": "sim-heavy-rain-001",
  "rain_intensity_mm_hr": 50,
  "duration_hours": 2,
  "flood_points": [
    { "lat": 13.756, "lng": 100.501, "severity": "HIGH" },
    { "lat": 13.742, "lng": 100.523, "severity": "MEDIUM" },
    { "lat": 13.768, "lng": 100.489, "severity": "HIGH" }
  ],
  "time_of_day": "peak_morning",
  "traffic_density": "high"
}
```

#### 3.3.2 Route Simulation

**Purpose:** Simulates multi-user routing behavior under flood conditions.

**Capabilities:**
- Simulates N concurrent users requesting routes
- Dynamic rerouting when flood is detected on current path
- Bottleneck detection as rerouted traffic concentrates on alternate roads
- Time-step progression (5-minute intervals)

**Key metrics tracked:**
- Route completion rate
- Average delay per user
- Rerouting frequency
- Bottleneck formation locations

#### 3.3.3 Impact Analyzer

**Purpose:** Quantifies the overall impact of the simulated flood scenario.

**Output metrics:**
```json
{
  "congestion_index": 3.2,
  "avg_delay_minutes": 18,
  "blocked_zones": ["zone-A", "zone-D"],
  "rerouting_load": {
    "route-B": "+45%",
    "route-C": "+32%"
  },
  "affected_users_estimate": 12500,
  "economic_impact_estimate_thb": 2500000
}
```

#### 3.3.4 Planning Recommendations

**Purpose:** Translates simulation results into actionable recommendations.

**Output types:**
- **Immediate:** Block route A, redirect traffic to routes B/C
- **Preventive:** Issue early alert for zone D (predicted cascade flooding)
- **Strategic:** Recommend infrastructure improvements for recurring bottlenecks
- **Communication:** Generate public advisory messages for affected areas

### 3.4 Use Cases

| Stakeholder        | Use Case                                           | Value                                         |
|--------------------|-----------------------------------------------------|-----------------------------------------------|
| Government Planning | Evaluate traffic regulation during heavy rain       | Evidence-based policy decisions               |
| Traffic Operations  | Optimize real-time traffic guidance                 | Reduced congestion and response time          |
| Policy Testing      | Test road closure scenarios before applying         | Risk-free validation of interventions         |
| Strategic Planning  | Identify urban infrastructure weak points           | Prioritize infrastructure investment          |

### 3.5 Challenges & Solutions

| Challenge        | Description                                        | Solution                                       |
|------------------|----------------------------------------------------|-------------------------------------------------|
| Complexity       | City-scale simulation requires many variables       | Zone-based simulation with LOD scaling          |
| Compute cost     | Full simulation is computationally expensive         | Batch processing + reusable scenario templates  |
| Input accuracy   | Scenario inputs may not match reality               | Multi-scenario runs + sensitivity analysis      |
| Validation       | Hard to validate without real events                | Historical event replay + expert review         |

---

## 4. Cross-Module Integration

The three modules form an interconnected intelligence system:

```
                    ┌──────────────┐
                    │  Prediction   │
                    │   Engine      │
                    └──────┬───────┘
                           │ flood forecasts
                           ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Agent +      │◀──│   Routing     │──▶│  Simulation   │
│  Feedback     │   │   Engine      │   │   Engine      │
│  Learning     │   └──────────────┘   └──────────────┘
└──────────────┘           ▲                    │
       │                   │                    │
       └───────────────────┘                    │
         policy updates          scenario results
                                 feed back into
                                 prediction training
```

**Data flow:**
1. **Prediction Engine** generates flood forecasts and feeds them to the Routing Engine
2. **Routing Engine** uses predictions to compute safe routes for users
3. **Agent + Feedback Learning** collects outcomes from routing decisions and updates policies
4. **Simulation Engine** uses prediction models to run what-if scenarios; results feed back into prediction model training and agent calibration

---

## 5. Strategic Value

### For End Users
- More accurate flood avoidance through continuously improving predictions
- Reduced travel time with adaptive routing that learns from collective experience
- Proactive alerts before flooding occurs

### For Government & Traffic Operators
- Evidence-based planning with simulation-validated recommendations
- Reduced emergency response costs through early warning
- Data-driven infrastructure investment prioritization

### For the Platform
- Self-improving system that gets better with more usage (network effect)
- Defensible IP through proprietary learning loops and prediction models
- Scalable architecture applicable to any flood-prone urban area

---

*Last updated: 2026-03-22*
