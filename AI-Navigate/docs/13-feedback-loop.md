# Feedback Loop & Learning System

> Closed-loop intelligence architecture enabling SafeMove AI to continuously learn from real-world outcomes, user behavior, and model performance -- turning every prediction into a training signal.

---

## Feedback Architecture

```
             SAFEMOVE AI -- CLOSED-LOOP LEARNING ARCHITECTURE
  =========================================================================

                            +-------------------+
                            |   REAL WORLD      |
                            |   (Traffic,       |
                            |    Road Network,  |
                            |    Weather)       |
                            +-------------------+
                                 |         ^
                    Observations |         | Actions
                                 v         |
  +------------------------------------------------------------------+
  |                                                                   |
  |    +----------+     +-----------+     +----------+     +-------+  |
  |    |  SENSE   |---->|  PREDICT  |---->|  DECIDE  |---->|  ACT  |  |
  |    |          |     |           |     |          |     |       |  |
  |    | Sensors  |     | ML Models |     | RL Agent |     | Route |  |
  |    | GPS data |     | LLM Layer |     | Rules    |     | Signal|  |
  |    | Weather  |     | Ensembles |     | Optimizer|     | Alert |  |
  |    +----------+     +-----------+     +----------+     +-------+  |
  |         ^                 ^                ^               |      |
  |         |                 |                |               |      |
  |    +----+-----------------+----------------+---------------+---+  |
  |    |                 FEEDBACK COLLECTOR                        |  |
  |    |                                                           |  |
  |    |  +-------------+  +--------------+  +------------------+  |  |
  |    |  | Real-Time   |  | User         |  | Model            |  |  |
  |    |  | Feedback    |  | Feedback     |  | Feedback         |  |  |
  |    |  | (sensor     |  | (ratings,    |  | (prediction vs   |  |  |
  |    |  |  outcomes)  |  |  behavior)   |  |  actual)         |  |  |
  |    |  +-------------+  +--------------+  +------------------+  |  |
  |    |                                                           |  |
  |    |  +-------------------------------------------------+     |  |
  |    |  | System Feedback (latency, throughput, errors)    |     |  |
  |    |  +-------------------------------------------------+     |  |
  |    +-----------------------------------------------------------+  |
  |                            |                                      |
  |                            v                                      |
  |    +-----------------------------------------------------------+  |
  |    |               LEARNING ENGINE                              |  |
  |    |                                                            |  |
  |    |  +-------------+  +-------------+  +-------------------+  |  |
  |    |  | Continuous  |  | A/B Testing |  | Drift Detection   |  |  |
  |    |  | Retraining  |  | Framework   |  | & Auto-Remediation|  |  |
  |    |  +-------------+  +-------------+  +-------------------+  |  |
  |    |                                                            |  |
  |    |  +-------------+  +-------------+  +-------------------+  |  |
  |    |  | RL Policy   |  | Human-in-   |  | Learning Metrics  |  |  |
  |    |  | Optimizer   |  | the-Loop    |  | Dashboard         |  |  |
  |    |  +-------------+  +-------------+  +-------------------+  |  |
  |    +-----------------------------------------------------------+  |
  |                                                                   |
  +------------------------------------------------------------------+
```

---

## Feedback Loop Types

### Loop 1: Real-Time Feedback (Sensor to Outcome)

```
  +-------+      +----------+      +----------+      +----------+
  | Sense |----->| Predict  |----->| Act      |----->| Measure  |
  | (t=0) |      | (t=0.5s) |      | (t=1s)   |      | (t=30s)  |
  +-------+      +----------+      +----------+      +----------+
      ^                                                     |
      |                                                     |
      +--------- Error signal (prediction - actual) --------+

  Cycle time: 30 seconds to 5 minutes
  Purpose: Immediate model calibration, signal timing adjustment
```

```python
# safemove/feedback/realtime_loop.py

from dataclasses import dataclass
from typing import Optional
import asyncio

@dataclass
class PredictionOutcome:
    prediction_id: str
    segment_id: str
    model_name: str
    predicted_at: int              # Unix ms
    horizon_minutes: int
    predicted_speed: float
    predicted_volume: int
    actual_speed: Optional[float] = None
    actual_volume: Optional[int] = None
    error_speed: Optional[float] = None
    error_volume: Optional[int] = None

class RealTimeFeedbackLoop:
    """
    Compares predictions against actual sensor observations as they arrive.
    Generates error signals for online model calibration and drift detection.
    """

    def __init__(self):
        self.prediction_store = PredictionStore()     # Redis: pending predictions
        self.outcome_store = OutcomeStore()            # TimescaleDB: historical outcomes
        self.calibrator = OnlineCalibrator()
        self.drift_detector = DriftDetector()

    async def on_observation(self, segment_id: str, observation: dict):
        """Called every 30 seconds when new sensor data arrives."""
        # Find all predictions that targeted this time window
        pending = await self.prediction_store.get_pending(
            segment_id=segment_id,
            target_time=observation["timestamp"],
            tolerance_ms=30_000,
        )

        outcomes = []
        for prediction in pending:
            outcome = PredictionOutcome(
                prediction_id=prediction["id"],
                segment_id=segment_id,
                model_name=prediction["model"],
                predicted_at=prediction["timestamp"],
                horizon_minutes=prediction["horizon"],
                predicted_speed=prediction["speed"],
                predicted_volume=prediction["volume"],
                actual_speed=observation["avg_speed_kmh"],
                actual_volume=observation["vehicle_count"],
                error_speed=observation["avg_speed_kmh"] - prediction["speed"],
                error_volume=observation["vehicle_count"] - prediction["volume"],
            )
            outcomes.append(outcome)

        # Store outcomes for batch analysis
        await self.outcome_store.insert_batch(outcomes)

        # Online calibration: adjust model bias in real-time
        for outcome in outcomes:
            await self.calibrator.update(outcome)

        # Check for distribution drift
        await self.drift_detector.check(segment_id, outcomes)

    async def get_recent_accuracy(self, model_name: str, hours: int = 1) -> dict:
        """Real-time accuracy dashboard data."""
        outcomes = await self.outcome_store.query_recent(model_name, hours)
        speeds = [(o.predicted_speed, o.actual_speed) for o in outcomes if o.actual_speed]
        if not speeds:
            return {"status": "insufficient_data"}

        predicted, actual = zip(*speeds)
        return {
            "model": model_name,
            "window_hours": hours,
            "sample_count": len(speeds),
            "mae": mean_absolute_error(actual, predicted),
            "rmse": root_mean_squared_error(actual, predicted),
            "mape": mean_absolute_percentage_error(actual, predicted) * 100,
            "bias": np.mean(np.array(predicted) - np.array(actual)),
        }
```

### Loop 2: User Feedback (Explicit + Implicit)

```
  EXPLICIT FEEDBACK                    IMPLICIT FEEDBACK
  =================                    =================

  +------------------+                 +------------------+
  | "Was this route  |                 | User behavior    |
  |  accurate?"      |                 | tracking:        |
  |                  |                 |                  |
  | [Thumbs Up/Down] |                 | - Chose route A  |
  | [Report Error]   |                 |   over route B   |
  | [Star Rating]    |                 | - Rerouted mid-  |
  | [Comment]        |                 |   trip (implicit  |
  +------------------+                 |   negative)      |
         |                             | - Completed route |
         v                             |   (implicit +)   |
  +------------------+                 | - Time on app    |
  | Feedback DB      |                 +------------------+
  | (structured)     |                         |
  +------------------+                         v
         |                             +------------------+
         +------------+                | Behavior         |
                      |                | Analyzer         |
                      v                +------------------+
              +------------------+              |
              | User Feedback    |<-------------+
              | Aggregator       |
              |                  |
              | - Segment-level  |
              |   satisfaction   |
              | - Route quality  |
              |   score          |
              | - Feature value  |
              |   signals        |
              +------------------+
```

```python
# safemove/feedback/user_feedback.py

from enum import Enum

class FeedbackType(Enum):
    ROUTE_ACCURACY = "route_accuracy"       # Was the ETA correct?
    ROUTE_PREFERENCE = "route_preference"   # Did they take our suggested route?
    INCIDENT_REPORT = "incident_report"     # User-reported road issue
    CONDITION_REPORT = "condition_report"   # "Road is actually clear/congested"
    APP_RATING = "app_rating"              # General satisfaction

class UserFeedbackCollector:
    """
    Collects and processes both explicit and implicit user feedback.
    Converts feedback into training signals for model improvement.
    """

    def record_explicit_feedback(self, feedback: dict) -> dict:
        """Process explicit user feedback (ratings, reports, comments)."""
        enriched = {
            **feedback,
            "timestamp": int(time.time() * 1000),
            "context": self._capture_context(feedback),
        }

        # Immediate action for certain feedback types
        if feedback["type"] == FeedbackType.INCIDENT_REPORT.value:
            self._escalate_incident_report(feedback)

        if feedback["type"] == FeedbackType.CONDITION_REPORT.value:
            self._update_ground_truth(feedback)

        self.feedback_store.insert(enriched)
        return {"status": "recorded", "id": enriched["id"]}

    def track_implicit_feedback(self, user_id: str, event: dict):
        """Track implicit behavioral signals."""
        signals = {
            "route_followed": {
                # User followed the recommended route to completion
                "signal": "positive",
                "weight": 0.3,
                "applies_to": "route_model",
            },
            "route_deviated": {
                # User deviated from recommended route
                "signal": "negative",
                "weight": 0.5,
                "applies_to": "route_model",
                "analysis": self._analyze_deviation(event),
            },
            "reroute_requested": {
                # User manually requested a new route
                "signal": "negative",
                "weight": 0.7,
                "applies_to": "route_model",
            },
            "eta_exceeded": {
                # Actual trip time exceeded predicted ETA
                "signal": "negative",
                "weight": lambda event: min((event["actual_time"] - event["predicted_time"])
                                            / event["predicted_time"], 1.0),
                "applies_to": "eta_model",
            },
        }

        signal = signals.get(event["type"])
        if signal:
            self._record_training_signal(user_id, event, signal)

    def aggregate_segment_satisfaction(self, segment_id: str, window_days: int = 30) -> dict:
        """Aggregate user satisfaction score for a road segment."""
        feedback = self.feedback_store.query(segment_id=segment_id, days=window_days)
        explicit_scores = [f["rating"] for f in feedback if "rating" in f]
        implicit_signals = [f["weight"] for f in feedback if "signal" in f]

        return {
            "segment_id": segment_id,
            "explicit_avg": np.mean(explicit_scores) if explicit_scores else None,
            "implicit_score": np.mean(implicit_signals) if implicit_signals else None,
            "sample_count": len(feedback),
            "trend": self._compute_trend(feedback),
        }
```

### Loop 3: Model Feedback (Prediction vs Actual)

```
  +------------------------------------------------------------------+
  |            MODEL PERFORMANCE TRACKING PIPELINE                    |
  |                                                                   |
  |  For EVERY prediction:                                            |
  |                                                                   |
  |  1. Log prediction  -----> Prediction Store (Redis, TTL=1h)       |
  |  2. Wait for actual -----> Observation arrives (30s-60min later)  |
  |  3. Compute error   -----> Outcome Store (TimescaleDB)            |
  |  4. Update metrics  -----> Prometheus + Grafana                   |
  |  5. Check thresholds ----> Alert if degraded                      |
  |  6. Store for retrain ---> Training Data Lake (S3)                |
  |                                                                   |
  |  Aggregation windows:                                             |
  |  - 5 min: Real-time dashboard                                    |
  |  - 1 hour: Operational alerts                                    |
  |  - 1 day: Retraining triggers                                    |
  |  - 1 week: Model comparison reports                              |
  +------------------------------------------------------------------+
```

```python
# safemove/feedback/model_feedback.py

class ModelFeedbackAnalyzer:
    """
    Comprehensive model performance analysis.
    Tracks accuracy across dimensions: time, geography, conditions.
    """

    def compute_segmented_accuracy(self, model_name: str, date: str) -> dict:
        """Break down model accuracy by multiple dimensions."""
        outcomes = self.outcome_store.query(model_name=model_name, date=date)

        return {
            "overall": self._compute_metrics(outcomes),

            "by_hour": {
                hour: self._compute_metrics([o for o in outcomes if o.hour == hour])
                for hour in range(24)
            },

            "by_day_type": {
                "weekday": self._compute_metrics(
                    [o for o in outcomes if o.is_weekday]),
                "weekend": self._compute_metrics(
                    [o for o in outcomes if not o.is_weekday]),
            },

            "by_road_type": {
                road_type: self._compute_metrics(
                    [o for o in outcomes if o.road_type == road_type])
                for road_type in ["highway", "arterial", "collector", "local"]
            },

            "by_weather": {
                "clear": self._compute_metrics(
                    [o for o in outcomes if o.weather == "clear"]),
                "rain": self._compute_metrics(
                    [o for o in outcomes if o.weather == "rain"]),
                "snow": self._compute_metrics(
                    [o for o in outcomes if o.weather == "snow"]),
            },

            "by_congestion_level": {
                "free_flow": self._compute_metrics(
                    [o for o in outcomes if o.actual_los in ["A", "B"]]),
                "moderate": self._compute_metrics(
                    [o for o in outcomes if o.actual_los in ["C", "D"]]),
                "congested": self._compute_metrics(
                    [o for o in outcomes if o.actual_los in ["E", "F"]]),
            },

            "worst_segments": self._find_worst_segments(outcomes, n=20),
            "best_segments": self._find_best_segments(outcomes, n=20),
        }

    def _compute_metrics(self, outcomes: list) -> dict:
        if not outcomes:
            return {"status": "insufficient_data", "n": 0}
        predicted = [o.predicted_speed for o in outcomes]
        actual = [o.actual_speed for o in outcomes]
        return {
            "n": len(outcomes),
            "mae": float(np.mean(np.abs(np.array(predicted) - np.array(actual)))),
            "rmse": float(np.sqrt(np.mean((np.array(predicted) - np.array(actual))**2))),
            "mape": float(np.mean(np.abs(
                (np.array(actual) - np.array(predicted)) / np.clip(np.array(actual), 1, None)
            )) * 100),
            "bias": float(np.mean(np.array(predicted) - np.array(actual))),
        }
```

### Loop 4: System Feedback (Infrastructure Performance)

```
  +------------------------------------------------------------------+
  |              SYSTEM PERFORMANCE FEEDBACK                          |
  |                                                                   |
  |  METRIC                    THRESHOLD          ACTION              |
  |  ========================  =================  =================   |
  |  API latency P99           > 500 ms           Scale horizontally  |
  |  Model inference P99       > 100 ms           Optimize/quantize   |
  |  Kafka consumer lag        > 50K messages      Add consumers      |
  |  Cache hit rate            < 25%               Tune TTL/threshold  |
  |  Error rate (5xx)          > 0.1%              Alert + investigate |
  |  GPU utilization           > 85% sustained     Add GPU nodes       |
  |  Memory usage              > 80%               Investigate leaks   |
  |  Data freshness            > 30s stale         Pipeline alert      |
  |                                                                   |
  +------------------------------------------------------------------+
```

```python
# safemove/feedback/system_feedback.py

class SystemFeedbackMonitor:
    """
    Monitors infrastructure health and automatically triggers
    scaling actions and performance optimizations.
    """

    THRESHOLDS = {
        "api_latency_p99_ms": {"warn": 300, "critical": 500, "action": "scale_api"},
        "inference_latency_p99_ms": {"warn": 80, "critical": 150, "action": "optimize_model"},
        "kafka_lag": {"warn": 30_000, "critical": 50_000, "action": "scale_consumers"},
        "cache_hit_rate": {"warn": 0.30, "critical": 0.20, "action": "tune_cache"},
        "error_rate_5xx": {"warn": 0.005, "critical": 0.001, "action": "alert_oncall"},
        "gpu_utilization": {"warn": 0.80, "critical": 0.90, "action": "scale_gpu"},
    }

    async def evaluate(self) -> list[dict]:
        """Evaluate all system metrics against thresholds."""
        actions = []
        metrics = await self.collect_current_metrics()

        for metric_name, thresholds in self.THRESHOLDS.items():
            value = metrics.get(metric_name)
            if value is None:
                continue

            # For metrics where lower is worse (cache_hit_rate)
            if metric_name in ["cache_hit_rate"]:
                if value < thresholds["critical"]:
                    actions.append(self._create_action(metric_name, "critical", value, thresholds))
                elif value < thresholds["warn"]:
                    actions.append(self._create_action(metric_name, "warn", value, thresholds))
            else:
                if value > thresholds["critical"]:
                    actions.append(self._create_action(metric_name, "critical", value, thresholds))
                elif value > thresholds["warn"]:
                    actions.append(self._create_action(metric_name, "warn", value, thresholds))

        return actions

    def _create_action(self, metric: str, severity: str, value: float, thresholds: dict) -> dict:
        return {
            "metric": metric,
            "severity": severity,
            "current_value": value,
            "threshold": thresholds[severity],
            "recommended_action": thresholds["action"],
            "timestamp": int(time.time()),
            "auto_remediate": severity == "critical" and thresholds["action"] != "alert_oncall",
        }
```

---

## Reinforcement Learning Integration

### Overview

```
  +------------------------------------------------------------------+
  |          REINFORCEMENT LEARNING FOR TRAFFIC OPTIMIZATION          |
  |                                                                   |
  |                    +-------------------+                          |
  |                    |   RL AGENT        |                          |
  |                    |   (PPO / SAC)     |                          |
  |                    +-------------------+                          |
  |                     /        |        \                           |
  |                    /         |         \                          |
  |           +-------+   +----------+   +--------+                  |
  |           | State |   | Action   |   | Reward |                  |
  |           | Space |   | Space    |   | Signal |                  |
  |           +-------+   +----------+   +--------+                  |
  |              |              |              |                      |
  |              v              v              v                      |
  |         [Observe]      [Execute]      [Evaluate]                 |
  |              |              |              |                      |
  |              +------+-------+------+------+                      |
  |                     |              |                              |
  |                     v              v                              |
  |              +------------+  +-----------+                       |
  |              | Environment|  | Simulator |                       |
  |              | (Real)     |  | (SUMO)    |                       |
  |              +------------+  +-----------+                       |
  +------------------------------------------------------------------+
```

### State Space Definition

```python
# safemove/rl/state_space.py

import numpy as np
from dataclasses import dataclass

@dataclass
class TrafficState:
    """
    State representation for the RL agent.
    Captures the complete observable traffic state for a region.
    """

    # Per-segment features (N segments x F features)
    segment_speeds: np.ndarray          # Shape: (N,) -- current avg speed km/h
    segment_volumes: np.ndarray         # Shape: (N,) -- current vehicle count
    segment_occupancy: np.ndarray       # Shape: (N,) -- occupancy percentage
    segment_queue_lengths: np.ndarray   # Shape: (N,) -- estimated queue (meters)

    # Temporal context
    hour_sin: float                     # Cyclical hour encoding
    hour_cos: float
    dow_sin: float                      # Day of week encoding
    dow_cos: float
    is_peak: bool

    # External context
    weather_condition: int              # 0=clear, 1=rain, 2=snow, 3=fog
    precipitation_rate: float           # mm/h
    active_incidents: np.ndarray        # Shape: (N,) -- binary incident flags
    event_impact: np.ndarray            # Shape: (N,) -- event proximity score

    # Prediction context (from ML models)
    predicted_speeds_15m: np.ndarray    # Shape: (N,) -- 15 min prediction
    predicted_speeds_30m: np.ndarray    # Shape: (N,) -- 30 min prediction
    congestion_probability: np.ndarray  # Shape: (N,) -- from congestion model

    def to_tensor(self) -> np.ndarray:
        """Flatten state into a single vector for the RL agent."""
        segment_features = np.stack([
            self.segment_speeds,
            self.segment_volumes,
            self.segment_occupancy,
            self.segment_queue_lengths,
            self.active_incidents,
            self.event_impact,
            self.predicted_speeds_15m,
            self.predicted_speeds_30m,
            self.congestion_probability,
        ], axis=-1)  # Shape: (N, 9)

        context = np.array([
            self.hour_sin, self.hour_cos,
            self.dow_sin, self.dow_cos,
            float(self.is_peak),
            self.weather_condition / 3.0,
            self.precipitation_rate / 50.0,
        ])

        return np.concatenate([segment_features.flatten(), context])

    @property
    def dimension(self) -> int:
        N = len(self.segment_speeds)
        return N * 9 + 7  # 9 per-segment features + 7 context features
```

### Action Space Definition

```python
# safemove/rl/action_space.py

from enum import Enum
from dataclasses import dataclass

class ActionType(Enum):
    SIGNAL_TIMING = "signal_timing"           # Adjust traffic signal phases
    ROUTE_RECOMMENDATION = "route_recommend"   # Suggest alternate routes
    SPEED_ADVISORY = "speed_advisory"          # Dynamic speed limits
    LANE_ASSIGNMENT = "lane_assignment"        # Reversible lane direction
    RAMP_METERING = "ramp_metering"           # Highway on-ramp flow control
    INCIDENT_RESPONSE = "incident_response"    # Deploy response resources

@dataclass
class ActionSpace:
    """
    Defines the set of actions the RL agent can take.
    Actions are continuous (signal timing) and discrete (route choice).
    """

    # Signal timing: phase duration adjustments per intersection
    # Continuous: [-15, +15] seconds per phase
    signal_adjustments: np.ndarray       # Shape: (num_intersections, num_phases)

    # Route recommendation: weight adjustment for route scoring
    # Continuous: [0.5, 2.0] multiplier on edge costs
    route_weights: np.ndarray            # Shape: (num_segments,)

    # Speed advisory: suggested speed per segment
    # Continuous: [20, speed_limit] km/h
    speed_advisories: np.ndarray         # Shape: (num_segments,)

    # Ramp metering: on-ramp flow rate
    # Continuous: [0.0, 1.0] fraction of full capacity
    ramp_rates: np.ndarray               # Shape: (num_ramps,)

    @classmethod
    def action_bounds(cls, config: dict) -> dict:
        return {
            "signal_adjustments": (-15.0, 15.0),
            "route_weights": (0.5, 2.0),
            "speed_advisories": (20.0, config["max_speed_limit"]),
            "ramp_rates": (0.0, 1.0),
        }
```

### Reward Function Design

```python
# safemove/rl/reward.py

class RewardFunction:
    """
    Multi-objective reward function balancing efficiency, safety,
    fairness, and environmental impact.

    R(s, a, s') = w1*R_efficiency + w2*R_safety + w3*R_fairness + w4*R_environment
    """

    WEIGHTS = {
        "efficiency": 0.40,    # Primary: minimize travel time
        "safety": 0.30,        # Critical: reduce incident risk
        "fairness": 0.20,      # Important: equitable service across corridors
        "environment": 0.10,   # Growing: reduce emissions via smoother flow
    }

    def compute(self, state_before, action, state_after, context) -> dict:
        """Compute composite reward from the state transition."""

        # Efficiency: improvement in average network speed
        r_efficiency = self._efficiency_reward(state_before, state_after)

        # Safety: reduction in high-risk conditions
        r_safety = self._safety_reward(state_before, state_after, context)

        # Fairness: reduce variance in service quality across segments
        r_fairness = self._fairness_reward(state_before, state_after)

        # Environment: reward smoother traffic flow (less stop-and-go)
        r_environment = self._environment_reward(state_before, state_after)

        composite = (
            self.WEIGHTS["efficiency"] * r_efficiency +
            self.WEIGHTS["safety"] * r_safety +
            self.WEIGHTS["fairness"] * r_fairness +
            self.WEIGHTS["environment"] * r_environment
        )

        return {
            "composite": composite,
            "efficiency": r_efficiency,
            "safety": r_safety,
            "fairness": r_fairness,
            "environment": r_environment,
        }

    def _efficiency_reward(self, before, after) -> float:
        """Reward increase in average network speed toward free-flow."""
        speed_before = np.mean(before.segment_speeds)
        speed_after = np.mean(after.segment_speeds)
        free_flow = np.mean(before.free_flow_speeds)

        # Normalized improvement: +1 if reached free flow, 0 if no change, -1 if halved
        improvement = (speed_after - speed_before) / max(free_flow - speed_before, 1.0)
        return np.clip(improvement, -1.0, 1.0)

    def _safety_reward(self, before, after, context) -> float:
        """Penalize high-variance speed conditions and near-incident states."""
        # Speed variance across adjacent segments (high = dangerous)
        variance_before = np.std(before.segment_speeds)
        variance_after = np.std(after.segment_speeds)
        variance_reduction = (variance_before - variance_after) / max(variance_before, 1.0)

        # Penalize any new incidents
        new_incidents = np.sum(after.active_incidents) - np.sum(before.active_incidents)
        incident_penalty = -0.5 * max(new_incidents, 0)

        return np.clip(variance_reduction + incident_penalty, -1.0, 1.0)

    def _fairness_reward(self, before, after) -> float:
        """Reward equitable congestion distribution (Gini coefficient reduction)."""
        gini_before = self._gini_coefficient(before.segment_speeds)
        gini_after = self._gini_coefficient(after.segment_speeds)
        # Lower Gini = more equitable = better
        return np.clip(gini_before - gini_after, -1.0, 1.0)

    def _environment_reward(self, before, after) -> float:
        """Reward smoother traffic flow (proxy for emissions reduction)."""
        # Speed oscillation: lower std of speed changes = smoother
        accel_before = np.std(np.diff(before.segment_speeds))
        accel_after = np.std(np.diff(after.segment_speeds))
        smoothness = (accel_before - accel_after) / max(accel_before, 0.1)
        return np.clip(smoothness, -1.0, 1.0)

    @staticmethod
    def _gini_coefficient(values: np.ndarray) -> float:
        sorted_vals = np.sort(values)
        n = len(sorted_vals)
        index = np.arange(1, n + 1)
        return (2 * np.sum(index * sorted_vals) / (n * np.sum(sorted_vals))) - (n + 1) / n
```

### Exploration vs Exploitation

```python
# safemove/rl/exploration.py

class ExplorationStrategy:
    """
    Manages the exploration-exploitation tradeoff.
    Uses safety-constrained exploration to avoid dangerous actions.
    """

    STRATEGY_CONFIG = {
        "algorithm": "PPO",              # Proximal Policy Optimization
        "exploration_noise": 0.2,        # Initial noise scale
        "noise_decay": 0.995,            # Decay per episode
        "min_noise": 0.02,               # Minimum exploration noise
        "safety_constraint": True,       # Enforce safe action bounds
    }

    SAFETY_CONSTRAINTS = {
        # Never reduce signal green time below minimum pedestrian crossing time
        "min_green_time_sec": 12,
        # Never recommend speed above posted limit
        "max_speed_advisory_factor": 1.0,
        # Never fully close a ramp (minimum flow)
        "min_ramp_rate": 0.1,
        # Maximum simultaneous changes per cycle
        "max_actions_per_cycle": 5,
    }

    def select_action(self, state, policy_network, training: bool = True) -> dict:
        """Select action with safety-constrained exploration."""
        # Get policy distribution
        action_mean, action_std = policy_network(state.to_tensor())

        if training:
            # Sample with exploration noise
            noise = self.current_noise * np.random.randn(*action_mean.shape)
            action = action_mean + noise
        else:
            # Exploitation only during deployment
            action = action_mean

        # Apply safety constraints
        action = self._apply_safety_constraints(action, state)

        return action

    def _apply_safety_constraints(self, action, state) -> np.ndarray:
        """Clip actions to safe bounds and verify no dangerous states result."""
        # Hard constraints on action magnitudes
        action = np.clip(action,
            self.action_space.low,
            self.action_space.high
        )

        # Verify minimum green time constraint
        signal_actions = action[:self.num_intersections * self.num_phases]
        current_greens = state.signal_green_times
        proposed_greens = current_greens + signal_actions.reshape(current_greens.shape)
        proposed_greens = np.maximum(proposed_greens, self.SAFETY_CONSTRAINTS["min_green_time_sec"])
        action[:len(signal_actions)] = (proposed_greens - current_greens).flatten()

        return action

    def decay_exploration(self):
        """Reduce exploration noise over time."""
        self.current_noise = max(
            self.current_noise * self.STRATEGY_CONFIG["noise_decay"],
            self.STRATEGY_CONFIG["min_noise"],
        )
```

---

## Continuous Learning Pipeline

```
  +------------------------------------------------------------------+
  |              CONTINUOUS LEARNING PIPELINE                         |
  |                                                                   |
  |  +--------+    +----------+    +----------+    +----------+       |
  |  | Collect |-->| Validate |-->| Retrain  |-->| Evaluate |       |
  |  | Data    |   | Quality  |   | Model    |   | (offline)|       |
  |  +--------+   +----------+   +----------+   +----------+       |
  |       |             |              |              |               |
  |  Continuous    Automated      Scheduled or   Champion vs         |
  |  from all     quality gates   drift-triggered Challenger          |
  |  feedback                                        |               |
  |  loops                                           v               |
  |                                           +----------+           |
  |                                           | A/B Test |           |
  |                                           | (online) |           |
  |                                           +----------+           |
  |                                                |                 |
  |                                           PASS?                  |
  |                                          /     \                 |
  |                                        YES      NO              |
  |                                         |        |               |
  |                                    +---------+ +--------+        |
  |                                    | Promote | | Reject |        |
  |                                    | to Prod | | + Log  |        |
  |                                    +---------+ +--------+        |
  +------------------------------------------------------------------+
```

```python
# safemove/learning/continuous_pipeline.py

class ContinuousLearningPipeline:
    """
    Automated pipeline for continuous model improvement.
    Triggered by schedule or drift detection.
    """

    def __init__(self, model_name: str, config: dict):
        self.model_name = model_name
        self.config = config
        self.data_validator = DataQualityValidator()
        self.trainer = ModelTrainer(model_name)
        self.evaluator = OfflineEvaluator()
        self.ab_tester = ABTestFramework()

    async def run(self, trigger: str = "scheduled"):
        """Execute the full continuous learning cycle."""

        # Step 1: Collect training data from feedback stores
        new_data = await self.collect_training_data()
        log.info(f"Collected {len(new_data)} new training samples (trigger: {trigger})")

        # Step 2: Validate data quality
        quality_report = self.data_validator.validate(new_data)
        if quality_report["score"] < 0.95:
            log.warning(f"Data quality below threshold: {quality_report['score']}")
            await self.alert_data_team(quality_report)
            return {"status": "aborted", "reason": "data_quality"}

        # Step 3: Retrain model
        current_model = self.model_registry.get_production(self.model_name)
        new_model = await self.trainer.train(
            train_data=new_data,
            base_model=current_model,
            config=self.config["training"],
        )

        # Step 4: Offline evaluation
        eval_results = self.evaluator.evaluate(
            model=new_model,
            test_set=self.config["test_set"],
            baseline_model=current_model,
        )

        if not eval_results["improved"]:
            log.info(f"New model did not improve: {eval_results['comparison']}")
            return {"status": "no_improvement", "metrics": eval_results}

        # Step 5: Register as challenger
        version = self.model_registry.register(
            name=self.model_name,
            model=new_model,
            metrics=eval_results,
            stage="challenger",
        )

        # Step 6: Launch A/B test
        ab_test = await self.ab_tester.launch(
            champion=current_model.version,
            challenger=version,
            traffic_split={"champion": 0.9, "challenger": 0.1},
            duration_hours=self.config.get("ab_test_duration_hours", 48),
            success_criteria=self.config["success_criteria"],
        )

        return {
            "status": "ab_test_launched",
            "test_id": ab_test["id"],
            "challenger_version": version,
        }
```

---

## A/B Testing Framework

### Test Configuration

```python
# safemove/learning/ab_testing.py

class ABTestFramework:
    """
    Statistical A/B testing for model deployments.
    Uses Bayesian analysis for faster convergence than frequentist methods.
    """

    DEFAULT_CONFIG = {
        "min_samples": 10_000,
        "max_duration_hours": 72,
        "confidence_threshold": 0.95,     # Bayesian posterior probability
        "min_improvement_pct": 1.0,       # Must be at least 1% better
        "primary_metric": "mape",
        "secondary_metrics": ["mae", "rmse", "p90_accuracy"],
        "guardrail_metrics": {
            "latency_p99_ms": {"max": 200},     # Must not regress latency
            "error_rate": {"max": 0.01},         # Must not increase errors
        },
    }

    async def launch(self, champion: str, challenger: str,
                     traffic_split: dict, duration_hours: int,
                     success_criteria: dict) -> dict:
        test = {
            "id": generate_test_id(),
            "champion": champion,
            "challenger": challenger,
            "traffic_split": traffic_split,
            "start_time": int(time.time()),
            "end_time": int(time.time()) + duration_hours * 3600,
            "success_criteria": {**self.DEFAULT_CONFIG, **success_criteria},
            "status": "running",
            "results": {"champion": [], "challenger": []},
        }
        await self.test_store.insert(test)
        await self.traffic_splitter.configure(test)
        return test

    async def evaluate_test(self, test_id: str) -> dict:
        """Evaluate A/B test using Bayesian analysis."""
        test = await self.test_store.get(test_id)
        champion_metrics = self._collect_metrics(test, "champion")
        challenger_metrics = self._collect_metrics(test, "challenger")

        # Bayesian comparison
        comparison = self._bayesian_compare(champion_metrics, challenger_metrics)

        # Check guardrail metrics
        guardrails_passed = all(
            challenger_metrics[metric] <= threshold["max"]
            for metric, threshold in test["success_criteria"]["guardrail_metrics"].items()
        )

        decision = "promote" if (
            comparison["prob_challenger_better"] >= test["success_criteria"]["confidence_threshold"]
            and comparison["improvement_pct"] >= test["success_criteria"]["min_improvement_pct"]
            and guardrails_passed
            and len(challenger_metrics["samples"]) >= test["success_criteria"]["min_samples"]
        ) else "continue" if time.time() < test["end_time"] else "reject"

        return {
            "test_id": test_id,
            "decision": decision,
            "comparison": comparison,
            "guardrails_passed": guardrails_passed,
            "champion_mape": champion_metrics["mape"],
            "challenger_mape": challenger_metrics["mape"],
        }

    def _bayesian_compare(self, champion: dict, challenger: dict) -> dict:
        """Bayesian posterior comparison using beta distribution."""
        # Model error as beta distribution
        alpha_c = champion["successes"] + 1
        beta_c = champion["failures"] + 1
        alpha_t = challenger["successes"] + 1
        beta_t = challenger["failures"] + 1

        # Monte Carlo estimation of P(challenger > champion)
        samples_c = np.random.beta(alpha_c, beta_c, 100_000)
        samples_t = np.random.beta(alpha_t, beta_t, 100_000)
        prob_better = np.mean(samples_t > samples_c)

        return {
            "prob_challenger_better": prob_better,
            "improvement_pct": (np.mean(samples_t) - np.mean(samples_c)) / np.mean(samples_c) * 100,
            "credible_interval_95": (np.percentile(samples_t - samples_c, 2.5),
                                     np.percentile(samples_t - samples_c, 97.5)),
        }
```

---

## Drift Detection

### Multi-Dimensional Drift Monitoring

```
  +------------------------------------------------------------------+
  |                    DRIFT DETECTION SYSTEM                         |
  |                                                                   |
  |  +------------------+  +-------------------+  +----------------+  |
  |  | Data Drift       |  | Concept Drift     |  | Prediction     |  |
  |  | (input features  |  | (relationship     |  | Drift          |  |
  |  |  distribution    |  |  between features |  | (output        |  |
  |  |  shift)          |  |  and target       |  |  distribution  |  |
  |  |                  |  |  changes)         |  |  shift)        |  |
  |  | Method:          |  | Method:           |  | Method:        |  |
  |  | KS test          |  | Page-Hinkley      |  | PSI            |  |
  |  | PSI              |  | ADWIN             |  | (Population    |  |
  |  |                  |  |                   |  |  Stability     |  |
  |  | Check: hourly    |  | Check: per batch  |  |  Index)        |  |
  |  +------------------+  +-------------------+  +----------------+  |
  |           |                     |                     |           |
  |           v                     v                     v           |
  |  +--------------------------------------------------------+      |
  |  |              DRIFT SEVERITY CLASSIFIER                  |      |
  |  |                                                         |      |
  |  |  No Drift    Minor Drift    Major Drift    Critical     |      |
  |  |  (PSI<0.1)   (0.1<PSI<0.2) (0.2<PSI<0.5) (PSI>0.5)   |      |
  |  |     |            |              |              |        |      |
  |  |  Continue    Log + Monitor   Alert + Fast   Emergency   |      |
  |  |                               Retrain      Retrain      |      |
  |  +--------------------------------------------------------+      |
  +------------------------------------------------------------------+
```

```python
# safemove/learning/drift_detection.py

from scipy import stats
import numpy as np

class DriftDetector:
    """
    Multi-method drift detection for continuous model monitoring.
    Detects data drift, concept drift, and prediction drift.
    """

    PSI_THRESHOLDS = {
        "none": 0.1,
        "minor": 0.2,
        "major": 0.5,
    }

    def detect_data_drift(self, reference: np.ndarray, current: np.ndarray,
                          feature_names: list) -> dict:
        """Detect distribution shifts in input features using PSI and KS test."""
        results = {}
        for i, feature in enumerate(feature_names):
            psi = self._compute_psi(reference[:, i], current[:, i])
            ks_stat, ks_pvalue = stats.ks_2samp(reference[:, i], current[:, i])

            severity = "none"
            if psi > self.PSI_THRESHOLDS["major"]:
                severity = "critical"
            elif psi > self.PSI_THRESHOLDS["minor"]:
                severity = "major"
            elif psi > self.PSI_THRESHOLDS["none"]:
                severity = "minor"

            results[feature] = {
                "psi": psi,
                "ks_statistic": ks_stat,
                "ks_pvalue": ks_pvalue,
                "severity": severity,
            }

        overall_severity = max(
            [r["severity"] for r in results.values()],
            key=["none", "minor", "major", "critical"].index
        )
        return {"features": results, "overall_severity": overall_severity}

    def detect_concept_drift(self, errors: np.ndarray,
                             window_size: int = 1000) -> dict:
        """Detect concept drift using Page-Hinkley test on prediction errors."""
        cumulative_sum = 0
        min_sum = float('inf')
        drift_detected = False
        drift_point = None
        threshold = 50  # Page-Hinkley threshold
        delta = 0.005   # Allowable deviation

        for i, error in enumerate(errors):
            cumulative_sum += error - delta
            if cumulative_sum < min_sum:
                min_sum = cumulative_sum
            if cumulative_sum - min_sum > threshold:
                drift_detected = True
                drift_point = i
                break

        return {
            "drift_detected": drift_detected,
            "drift_point": drift_point,
            "cumulative_deviation": cumulative_sum - min_sum,
            "threshold": threshold,
        }

    @staticmethod
    def _compute_psi(reference: np.ndarray, current: np.ndarray,
                     n_bins: int = 10) -> float:
        """Population Stability Index: measures distribution shift."""
        bins = np.histogram_bin_edges(reference, bins=n_bins)
        ref_counts = np.histogram(reference, bins=bins)[0] / len(reference)
        cur_counts = np.histogram(current, bins=bins)[0] / len(current)

        # Avoid division by zero
        ref_counts = np.clip(ref_counts, 1e-6, None)
        cur_counts = np.clip(cur_counts, 1e-6, None)

        psi = np.sum((cur_counts - ref_counts) * np.log(cur_counts / ref_counts))
        return psi
```

---

## Human-in-the-Loop Checkpoints

### Checkpoint Architecture

```
  AUTOMATED PIPELINE                         HUMAN REVIEW
  ==================                         ============

  Model retrained -----> Quality gate pass? --NO--> Alert team
                              |                     Manual review
                             YES                    required
                              |
                              v
  A/B test complete ---> Promotion safe? ----NO--> Dashboard review
                              |                     Ops approval needed
                             YES
                              |
                              v
  RL policy update ----> Safety check pass? -NO--> RL policy frozen
                              |                     Engineer review
                             YES
                              |
                              v
  Deployed to production
```

```python
# safemove/learning/human_review.py

class HumanInTheLoopManager:
    """
    Manages human review checkpoints in the automated learning pipeline.
    Ensures critical decisions have human oversight.
    """

    REVIEW_TRIGGERS = {
        "model_promotion": {
            "auto_approve_if": {
                "improvement_pct": (1.0, 10.0),   # Auto-approve 1-10% improvement
                "guardrails_all_pass": True,
                "ab_test_duration_hours_min": 24,
                "sample_count_min": 50_000,
            },
            "always_review_if": [
                "improvement > 10%",              # Suspicious large improvement
                "any guardrail near threshold",   # Within 10% of guardrail limit
                "model architecture changed",     # New model type
                "training data source changed",   # New data pipeline
            ],
        },
        "rl_policy_update": {
            "auto_approve_if": {
                "reward_improvement_pct": (0.5, 5.0),
                "safety_constraint_violations": 0,
                "simulation_hours": 168,          # 1 week of simulated traffic
            },
            "always_review_if": [
                "safety metric degraded",
                "action distribution shifted significantly",
                "new action type introduced",
            ],
        },
        "drift_remediation": {
            "auto_approve_if": {
                "drift_severity": "minor",
                "retrained_model_improves": True,
            },
            "always_review_if": [
                "drift_severity >= major",
                "multiple features drifted simultaneously",
                "root cause unknown",
            ],
        },
    }

    async def request_review(self, review_type: str, context: dict) -> dict:
        """Submit a review request and wait for human decision."""
        trigger_config = self.REVIEW_TRIGGERS[review_type]

        # Check if auto-approval criteria are met
        if self._can_auto_approve(trigger_config, context):
            return {"decision": "auto_approved", "reviewer": "system"}

        # Check if mandatory review is triggered
        must_review_reasons = self._check_mandatory_review(trigger_config, context)

        # Create review ticket
        ticket = {
            "id": generate_ticket_id(),
            "type": review_type,
            "context": context,
            "must_review_reasons": must_review_reasons,
            "created_at": int(time.time()),
            "status": "pending",
            "priority": "high" if must_review_reasons else "normal",
        }

        await self.ticket_store.insert(ticket)
        await self.notify_reviewers(ticket)

        # Wait for human decision (with timeout)
        decision = await self.wait_for_decision(ticket["id"], timeout_hours=24)
        return decision
```

---

## Learning Metrics Dashboard

### Dashboard Layout

```
  +------------------------------------------------------------------+
  |  SAFEMOVE LEARNING SYSTEM DASHBOARD                    [LIVE]     |
  +------------------------------------------------------------------+
  |                                                                   |
  |  MODEL ACCURACY (7-DAY TREND)          FEEDBACK VOLUME            |
  |  +---------------------------+         +---------------------+    |
  |  | Traffic: 7.1% MAPE  [==] |         | Real-time: 2.1M/day |    |
  |  | Route:   2.3 min MAE [==] |         | User:      12K/day  |    |
  |  | Congest: 0.93 AUC   [==] |         | Model:     850K/day |    |
  |  | Incident: 91% prec  [==] |         | System:    5K/hour  |    |
  |  +---------------------------+         +---------------------+    |
  |                                                                   |
  |  DRIFT STATUS                          ACTIVE A/B TESTS          |
  |  +---------------------------+         +---------------------+    |
  |  | Traffic Flow:  OK         |         | TFT v12 vs v13     |    |
  |  | Route GNN:     OK         |         |   Day 2/3, n=45K   |    |
  |  | Congestion:    MINOR drift|         |   Challenger +1.2% |    |
  |  | Incident:      OK         |         |   Conf: 0.87       |    |
  |  | Demand:        OK         |         +---------------------+    |
  |  | Weather:       OK         |                                    |
  |  +---------------------------+         RETRAINING QUEUE          |
  |                                        +---------------------+    |
  |  RL AGENT PERFORMANCE                  | Congestion: queued  |    |
  |  +---------------------------+         | (drift-triggered)   |    |
  |  | Avg reward:    0.73       |         | Demand: scheduled   |    |
  |  | Safety score:  0.98       |         | (weekly, Sat 3AM)  |    |
  |  | Exploration:   0.05       |         +---------------------+    |
  |  | Policy update: 2h ago    |                                    |
  |  +---------------------------+                                    |
  |                                                                   |
  |  HUMAN REVIEW QUEUE                   LEARNING EFFICIENCY        |
  |  +---------------------------+         +---------------------+    |
  |  | Pending reviews: 1        |         | Data -> Insight:    |    |
  |  | - RL policy (high prio)   |         |   Avg 4.2 hours    |    |
  |  | Avg review time: 35 min   |         | Retrain cycle:      |    |
  |  | Auto-approved (7d): 12    |         |   Avg 6.1 hours    |    |
  |  +---------------------------+         | Feedback util: 94%  |    |
  |                                        +---------------------+    |
  +------------------------------------------------------------------+
```

### Key Learning Metrics

```python
# safemove/learning/metrics.py

LEARNING_METRICS = {
    # Model Quality
    "model_accuracy_current": {
        "description": "Current production model accuracy (primary metric per model)",
        "alert_threshold": "model-specific",
        "granularity": "5 min",
    },
    "model_accuracy_trend": {
        "description": "7-day rolling accuracy trend (slope)",
        "alert_threshold": "negative slope for 24+ hours",
        "granularity": "1 hour",
    },

    # Feedback Pipeline
    "feedback_volume_per_type": {
        "description": "Feedback events received per loop type",
        "alert_threshold": "< 50% of expected volume",
        "granularity": "5 min",
    },
    "feedback_to_training_latency": {
        "description": "Time from feedback event to inclusion in training data",
        "target": "< 24 hours for real-time, < 7 days for batch",
        "granularity": "1 hour",
    },

    # Drift
    "drift_psi_per_feature": {
        "description": "Population Stability Index per input feature",
        "alert_threshold": "PSI > 0.2 for any feature",
        "granularity": "1 hour",
    },

    # A/B Testing
    "ab_test_active_count": {
        "description": "Number of active A/B tests",
        "max_concurrent": 3,
        "granularity": "event",
    },
    "ab_test_avg_duration_hours": {
        "description": "Average time to reach statistical significance",
        "target": "< 48 hours",
        "granularity": "per test",
    },

    # RL Agent
    "rl_average_reward": {
        "description": "Rolling average composite reward",
        "alert_threshold": "< 0.5 or declining for 2+ hours",
        "granularity": "5 min",
    },
    "rl_safety_constraint_violations": {
        "description": "Count of actions violating safety constraints",
        "alert_threshold": "> 0 (any violation triggers alert)",
        "granularity": "per action",
    },

    # Human Review
    "human_review_queue_depth": {
        "description": "Pending human review tickets",
        "alert_threshold": "> 5 pending for 4+ hours",
        "granularity": "event",
    },
    "human_review_avg_time_hours": {
        "description": "Average time to complete human review",
        "target": "< 4 hours",
        "granularity": "per review",
    },

    # Learning Efficiency
    "data_to_deployment_hours": {
        "description": "End-to-end: new data to improved model in production",
        "target": "< 72 hours (including A/B test)",
        "granularity": "per cycle",
    },
    "feedback_utilization_pct": {
        "description": "Percentage of feedback actually used in retraining",
        "target": "> 90%",
        "granularity": "daily",
    },
}
```

### Prometheus Metrics Export

```yaml
# safemove/learning/monitoring/metrics.yaml

metrics:
  # Model accuracy (real-time)
  - name: safemove_model_accuracy_mape
    type: gauge
    labels: [model_name, city_id, horizon]
    description: "Current MAPE for each model/city/horizon"

  - name: safemove_model_accuracy_mae
    type: gauge
    labels: [model_name, city_id]
    description: "Current MAE for each model/city"

  # Feedback counters
  - name: safemove_feedback_events_total
    type: counter
    labels: [loop_type, feedback_type, city_id]
    description: "Total feedback events by type"

  - name: safemove_feedback_latency_seconds
    type: histogram
    labels: [loop_type]
    buckets: [0.1, 1, 10, 60, 300, 3600]
    description: "Feedback processing latency"

  # Drift detection
  - name: safemove_drift_psi
    type: gauge
    labels: [model_name, feature_name]
    description: "PSI drift score per model feature"

  - name: safemove_drift_alerts_total
    type: counter
    labels: [model_name, severity]
    description: "Drift alert count by severity"

  # RL agent
  - name: safemove_rl_reward
    type: gauge
    labels: [component]
    description: "RL reward by component (efficiency/safety/fairness/env)"

  - name: safemove_rl_safety_violations_total
    type: counter
    labels: [constraint_type]
    description: "Safety constraint violations"

  # A/B tests
  - name: safemove_ab_test_confidence
    type: gauge
    labels: [test_id, variant]
    description: "Current Bayesian confidence level"

  # Retraining
  - name: safemove_retrain_duration_seconds
    type: histogram
    labels: [model_name, trigger]
    buckets: [600, 1800, 3600, 7200, 14400, 28800]
    description: "Model retraining duration"

  - name: safemove_retrain_total
    type: counter
    labels: [model_name, trigger, outcome]
    description: "Retraining runs by trigger and outcome"
```

---

*SafeMove AI Feedback Loop & Learning System -- every prediction is a learning opportunity, every outcome improves the next decision.*
