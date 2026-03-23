# AI/ML Architecture

> The Intelligence Engine Behind SafeMove AI -- From Raw Signals to Actionable Decisions

---

## 1. ML Pipeline Overview

```
+-------------------------------------------------------------------------+
|                        SAFEMOVE ML PIPELINE                             |
|                                                                         |
|  DATA SOURCES       FEATURE ENG.      TRAINING        SERVING          |
|  +-----------+      +-----------+     +-----------+   +-----------+    |
|  |Traffic    |      |Temporal   |     |Distributed|   |TF Serving |    |
|  |GPS        |----->|Spatial    |---->|Training   |-->|Triton     |    |
|  |Weather    |      |Categorical|     |on GPU     |   |TorchServe |    |
|  |Events     |      |Graph-based|     |Cluster    |   |           |    |
|  +-----------+      +-----------+     +-----------+   +-----------+    |
|       |                  |                 |               |            |
|       v                  v                 v               v            |
|  +-----------+      +-----------+     +-----------+   +-----------+    |
|  |Data       |      |Feature    |     |MLflow     |   |A/B Test   |    |
|  |Validation |      |Store      |     |Registry   |   |Framework  |    |
|  |(Great     |      |(Feast)    |     |+ Model    |   |+ Shadow   |    |
|  | Expect.)  |      |           |     | Versioning|   | Deploy    |    |
|  +-----------+      +-----------+     +-----------+   +-----------+    |
|                                                            |            |
|                                            +---------------+            |
|                                            v                            |
|                                       +-----------+                     |
|                                       |Monitoring |                     |
|                                       |Drift Det. |                     |
|                                       |Auto Retrain|                    |
|                                       +-----------+                     |
+-------------------------------------------------------------------------+
```

---

## 2. Model Categories

SafeMove AI deploys four families of ML models, each targeting a distinct operational need.

### 2.1 Prediction Models

```
+------------------------------------------------------------------+
|                      PREDICTION MODELS                           |
|                                                                  |
|  +-------------------+  +-------------------+  +---------------+ |
|  | Traffic Flow      |  | Congestion        |  | Incident      | |
|  | Forecasting       |  | Prediction        |  | Probability   | |
|  |                   |  |                   |  |               | |
|  | Architecture:     |  | Architecture:     |  | Architecture: | |
|  |  Temporal Fusion  |  |  Spatio-Temporal  |  |  XGBoost +    | |
|  |  Transformer      |  |  Graph Neural Net |  |  LightGBM     | |
|  |                   |  |  (ST-GNN)         |  |  Ensemble     | |
|  | Horizon:          |  |                   |  |               | |
|  |  15min, 1hr, 24hr |  | Horizon:          |  | Horizon:      | |
|  |                   |  |  5min, 30min      |  |  5min, 15min  | |
|  | Input:            |  |                   |  |               | |
|  |  Time-series flow |  | Input:            |  | Input:        | |
|  |  Calendar feats   |  |  Road graph       |  |  Speed drops  | |
|  |  Weather          |  |  Sensor readings  |  |  Lane closures| |
|  |                   |  |  Historical patt. |  |  Weather       | |
|  | MAE: < 8%         |  |                   |  |               | |
|  | MAPE: < 12%       |  | Accuracy: > 91%   |  | AUC: > 0.94   | |
|  +-------------------+  +-------------------+  +---------------+ |
+------------------------------------------------------------------+
```

### 2.2 Optimization Models

| Model | Purpose | Architecture | Output |
|---|---|---|---|
| **Route Optimizer** | Real-time shortest/fastest path with traffic awareness | Attention-based GNN + Dijkstra hybrid | Ranked route set |
| **Signal Timing Optimizer** | Adaptive traffic signal control | Multi-Agent Deep RL (PPO) | Signal phase plans |
| **Fleet Dispatcher** | Optimal vehicle assignment for logistics | Constraint-satisfying RL + OR-Tools | Dispatch schedule |
| **Demand Balancer** | Redistribute resources across zones | Linear programming + forecasting | Allocation plan |

### 2.3 Simulation Models

| Model | Purpose | Architecture | Fidelity |
|---|---|---|---|
| **Vehicle Dynamics** | Microscopic traffic simulation | Intelligent Driver Model (IDM) + Neural ODE | Single vehicle |
| **Flow Estimator** | Macroscopic flow prediction | Cell Transmission Model + LSTM | Road segment |
| **Network Equilibrium** | System-wide traffic assignment | User Equilibrium solver (Frank-Wolfe) | Full network |
| **Weather Impact** | Adjust parameters for weather | Bayesian regression | Modifier layer |

### 2.4 NLP / LLM Models

```
+------------------------------------------------------------------+
|                        NLP / LLM STACK                           |
|                                                                  |
|  +---------------------+     +---------------------+            |
|  | LangChain Agent     |     | Fine-Tuned LLM      |            |
|  |                     |     | (Llama 3 / Mistral)  |            |
|  | Tools:              |     |                     |            |
|  |  - query_traffic()  |     | Tasks:              |            |
|  |  - get_predictions()|     |  - Report generation|            |
|  |  - run_simulation() |     |  - Anomaly summaries|            |
|  |  - fetch_analytics()|     |  - NL query -> SQL  |            |
|  |                     |     |  - Incident narration|            |
|  +---------------------+     +---------------------+            |
|            |                          |                          |
|            v                          v                          |
|  +---------------------+     +---------------------+            |
|  | RAG Pipeline        |     | Embedding Models    |            |
|  | (pgvector + FAISS)  |     | (all-MiniLM-L6-v2)  |            |
|  |                     |     |                     |            |
|  | Knowledge base:     |     | Use cases:          |            |
|  |  - Traffic policies |     |  - Semantic search  |            |
|  |  - City regulations |     |  - Similar incident |            |
|  |  - Historical reports|    |    retrieval        |            |
|  +---------------------+     +---------------------+            |
+------------------------------------------------------------------+
```

---

## 3. Training Infrastructure

### 3.1 GPU Cluster Layout

```
+-------------------------------------------------------------------+
|                    TRAINING INFRASTRUCTURE                         |
|                                                                   |
|  +-------------------------+    +-------------------------+       |
|  | Training Cluster        |    | Inference Cluster       |       |
|  |                         |    |                         |       |
|  | 4x NVIDIA A100 (80GB)  |    | 8x NVIDIA T4 (16GB)    |       |
|  | 2x nodes, NVLink       |    | 4x nodes               |       |
|  |                         |    |                         |       |
|  | Workloads:              |    | Workloads:              |       |
|  |  - GNN training         |    |  - TF Serving           |       |
|  |  - Transformer training |    |  - Triton Inference     |       |
|  |  - RL environment sim   |    |  - TorchServe           |       |
|  |  - Hyperparameter search|    |  - ONNX Runtime         |       |
|  +-------------------------+    +-------------------------+       |
|                                                                   |
|  +-------------------------+    +-------------------------+       |
|  | Shared Storage          |    | Experiment Tracking     |       |
|  |                         |    |                         |       |
|  | - S3 (datasets, 50TB)  |    | - MLflow Server         |       |
|  | - EFS (checkpoints)    |    | - Weights & Biases      |       |
|  | - FSx Lustre (scratch) |    | - TensorBoard           |       |
|  +-------------------------+    +-------------------------+       |
+-------------------------------------------------------------------+
```

### 3.2 Training Schedule

| Model Family | Frequency | Duration | Data Window | Trigger |
|---|---|---|---|---|
| Traffic Flow Forecast | Daily | ~2 hours | Rolling 90 days | Scheduled |
| Congestion GNN | Weekly | ~8 hours | Rolling 180 days | Scheduled |
| Signal Timing RL | Continuous | Ongoing | Live environment | Always-on |
| Incident Detection | Weekly | ~3 hours | Rolling 60 days | Scheduled + drift |
| Route Optimizer | Bi-weekly | ~6 hours | Rolling 30 days | Scheduled |
| LLM Fine-Tune | Monthly | ~12 hours | Curated dataset | Manual |

---

## 4. Feature Engineering Pipeline

```
Raw Data                Feature Extraction              Feature Store
                                                        (Feast)
+-----------+     +---------------------------+     +----------------+
|TimescaleDB|---->| Temporal Features          |---->| Online Store   |
|           |     |  - rolling_avg_speed_15m   |     | (Redis)        |
|           |     |  - flow_delta_vs_baseline  |     |                |
|           |     |  - peak_hour_indicator     |     | Latency: <5ms  |
+-----------+     |  - day_of_week_sin/cos     |     +----------------+
                  |  - minutes_to_sunset       |
+-----------+     +---------------------------+     +----------------+
|PostGIS    |---->| Spatial Features           |---->| Offline Store  |
|           |     |  - road_segment_type       |     | (S3 / Parquet) |
|           |     |  - intersection_complexity |     |                |
|           |     |  - nearby_poi_density      |     | For training   |
+-----------+     |  - upstream_congestion_3hop|     +----------------+
                  |  - elevation_gradient      |
+-----------+     +---------------------------+
|External   |---->| Contextual Features        |
|APIs       |     |  - temperature_c           |
|           |     |  - precipitation_mm        |
+-----------+     |  - event_within_2km (bool) |
                  |  - school_in_session (bool) |
                  +---------------------------+
```

### Feature Catalog (selected)

| Feature | Type | Freshness | Source |
|---|---|---|---|
| `avg_speed_15m` | Float | 1 min | TimescaleDB rolling agg |
| `flow_rate_delta_pct` | Float | 1 min | (current - baseline) / baseline |
| `congestion_level_upstream_3` | Categorical | 1 min | Graph traversal on road network |
| `is_rush_hour` | Boolean | Static | Calendar rule |
| `precipitation_mm` | Float | 15 min | Weather API |
| `day_of_week_sin` | Float | Static | sin(2 * pi * dow / 7) |
| `road_segment_lanes` | Integer | Static | PostGIS road attributes |
| `event_proximity_km` | Float | 1 hour | Event calendar geocoded |
| `historical_speed_same_slot` | Float | 24 hours | 4-week rolling avg, same time slot |

---

## 5. Model Registry and Versioning

```
+-------------------------------------------------------------------+
|                         MLflow Model Registry                     |
|                                                                   |
|  Model: traffic_flow_forecast                                     |
|  +-------+----------+--------+---------+----------+----------+   |
|  |Version| Stage    | MAE    | MAPE    | Created  | Author   |   |
|  +-------+----------+--------+---------+----------+----------+   |
|  | v3.2.1| Prod     | 6.8%   | 10.1%   | Mar 20   | pipeline |   |
|  | v3.2.0| Archived | 7.1%   | 10.8%   | Mar 13   | pipeline |   |
|  | v3.1.0| Archived | 7.4%   | 11.2%   | Mar 06   | pipeline |   |
|  | v4.0.0| Staging  | 6.2%   | 9.4%    | Mar 21   | research |   |
|  +-------+----------+--------+---------+----------+----------+   |
|                                                                   |
|  Promotion Flow:                                                  |
|                                                                   |
|  [None] --> [Staging] --> [Canary 5%] --> [Prod] --> [Archived]   |
|                 |              |                                   |
|                 v              v                                   |
|           Auto-validate   Monitor for                             |
|           on holdout set  1 hour, compare                         |
|           (must beat      vs incumbent                            |
|            current prod)                                          |
+-------------------------------------------------------------------+
```

### Model Artifact Structure

```
model-artifact/
  |-- model.onnx                  # Optimized model binary
  |-- model_config.yaml           # Hyperparameters, architecture
  |-- requirements.txt            # Python dependencies
  |-- feature_schema.json         # Expected input features
  |-- preprocessing.pkl           # Fitted scalers/encoders
  |-- metrics/
  |     |-- validation_metrics.json
  |     |-- confusion_matrix.png
  |     |-- feature_importance.json
  |-- tests/
        |-- test_inference.py
        |-- test_latency.py
        |-- golden_set.parquet    # Known inputs/outputs
```

---

## 6. A/B Testing Framework

```
                      Incoming Prediction Request
                                |
                                v
                      +-------------------+
                      | Traffic Router    |
                      | (feature flags)   |
                      +-------------------+
                         /            \
                       /                \
                     v                    v
          +----------------+    +----------------+
          | Model A (Prod) |    | Model B (Test) |
          | 90% traffic    |    | 10% traffic    |
          +----------------+    +----------------+
                     \                /
                       \            /
                         v        v
                      +-------------------+
                      | Metrics Collector |
                      +-------------------+
                                |
                      +---------+---------+
                      |                   |
                      v                   v
              +---------------+   +---------------+
              | Statistical   |   | Business      |
              | Significance  |   | Impact        |
              | (t-test,      |   | (latency,     |
              |  bootstrap)   |   |  revenue,     |
              |               |   |  user sat.)   |
              +---------------+   +---------------+
                      |                   |
                      v                   v
              +-------------------------------+
              | Automated Promotion Decision  |
              | (if B wins after N requests)  |
              +-------------------------------+
```

**A/B Testing Rules:**
- Minimum sample: 10,000 predictions before evaluation
- Statistical significance: p < 0.01
- Business guard-rails: new model must not increase P99 latency by > 20%
- Automatic rollback if error rate exceeds 2x baseline
- Shadow mode available: both models run, only A serves, B logs predictions for offline comparison

---

## 7. Online Learning vs Batch Training

```
+------------------------------------------------------------------+
|                                                                  |
|  BATCH TRAINING (Offline)           ONLINE LEARNING (Live)       |
|  ========================           =========================    |
|                                                                  |
|  +-------------------+             +-------------------+         |
|  | Historical Data   |             | Live Kafka Stream |         |
|  | (S3 / Parquet)    |             | (real-time events)|         |
|  +--------+----------+             +--------+----------+         |
|           |                                 |                    |
|           v                                 v                    |
|  +-------------------+             +-------------------+         |
|  | Full Retrain      |             | Incremental Update|         |
|  | (GPU cluster)     |             | (online SGD,      |         |
|  | Epoch: 50-200     |             |  River library)   |         |
|  | Duration: hours   |             | Duration: ms/event|         |
|  +--------+----------+             +--------+----------+         |
|           |                                 |                    |
|           v                                 v                    |
|  +-------------------+             +-------------------+         |
|  | Validate on       |             | Drift Detection   |         |
|  | holdout set       |             | (sliding window   |         |
|  |                   |             |  statistical test) |         |
|  +--------+----------+             +--------+----------+         |
|           |                                 |                    |
|           v                                 v                    |
|  +-------------------+             +-------------------+         |
|  | Deploy to Prod    |             | Update Model      |         |
|  | (daily/weekly)    |             | Weights (live)    |         |
|  +-------------------+             +-------------------+         |
|                                                                  |
+------------------------------------------------------------------+
```

### When to Use Which

| Criterion | Batch | Online |
|---|---|---|
| Data distribution | Stable, slow-changing | Fast-shifting, seasonal |
| Model complexity | Deep learning, GNNs | Linear models, trees |
| Latency requirement | Hours acceptable | Must adapt in minutes |
| Example | Weekly congestion model retrain | Real-time speed adjustment |
| Risk | Stale during sudden events | Catastrophic forgetting |
| Mitigation | Trigger retrain on drift alert | Bounded learning rate + batch anchor |

---

## 8. Reinforcement Learning Loop for Traffic Signal Optimization

```
+-------------------------------------------------------------------+
|              RL LOOP: ADAPTIVE SIGNAL CONTROL                     |
|                                                                   |
|  +------------------+          +-------------------+              |
|  |  ENVIRONMENT     |          |  RL AGENT (PPO)   |              |
|  |  (Intersection)  |          |                   |              |
|  |                  |  state   |  Policy Network   |              |
|  |  - Queue lengths |--------->|  (Actor-Critic)   |              |
|  |  - Phase state   |          |                   |              |
|  |  - Wait times    |  action  |  State: 48-dim    |              |
|  |  - Approaching   |<---------|  Action: phase    |              |
|  |    vehicles      |          |    selection      |              |
|  |                  |  reward  |  Reward: weighted  |              |
|  |                  |--------->|    throughput -    |              |
|  |                  |          |    avg_wait -      |              |
|  +------------------+          |    emergency_pen   |              |
|                                +-------------------+              |
|                                         |                         |
|                                         v                         |
|                                +-------------------+              |
|                                | Experience Replay |              |
|                                | Buffer (1M trans) |              |
|                                +-------------------+              |
|                                                                   |
+-------------------------------------------------------------------+
```

### RL Architecture Details

**State Space (48 dimensions per intersection):**
```
- Queue length per lane (8 lanes)           : 8 floats
- Current phase one-hot encoding            : 8 floats
- Time in current phase (normalized)        : 1 float
- Approaching vehicle count per lane        : 8 floats
- Average wait time per lane                : 8 floats
- Pedestrian demand per crosswalk           : 4 floats
- Emergency vehicle approaching (binary)    : 4 floats
- Time of day (sin/cos encoded)             : 2 floats
- Day of week (sin/cos encoded)             : 2 floats
- Weather condition (one-hot)               : 3 floats
                                       Total: 48 floats
```

**Action Space:**
- Discrete: select next phase from valid phase transitions
- Typical intersection: 4-8 valid phases
- Minimum green time constraint: 10 seconds
- Maximum green time constraint: 90 seconds

**Reward Function:**
```python
def compute_reward(state, action, next_state):
    throughput = vehicles_cleared(next_state) - vehicles_cleared(state)
    avg_wait = mean_waiting_time(next_state)
    emergency_penalty = emergency_delay(next_state) * 10.0
    pedestrian_penalty = pedestrian_wait(next_state) * 0.5

    reward = (
        + 1.0 * throughput
        - 0.3 * avg_wait
        - 5.0 * emergency_penalty
        - 0.5 * pedestrian_penalty
    )
    return reward
```

**Training Protocol:**
1. **Pre-train** in simulation (1M steps, ~6 hours on 4x A100)
2. **Transfer** to live intersection with safety constraints
3. **Online fine-tune** with bounded policy updates (PPO clip = 0.1)
4. **Fallback** to fixed-time plan if reward drops below threshold for 5 minutes
5. **Multi-intersection coordination** via shared reward signal across adjacent intersections

---

## 9. Model Performance Monitoring

```
+-------------------------------------------------------------------+
|                   MODEL MONITORING DASHBOARD                      |
|                                                                   |
|  +-------------------+  +-------------------+  +---------------+  |
|  | DATA DRIFT        |  | PREDICTION DRIFT  |  | PERFORMANCE   |  |
|  |                   |  |                   |  | DEGRADATION   |  |
|  | Monitor input     |  | Monitor output    |  |               |  |
|  | feature distrib.  |  | distribution      |  | Track live    |  |
|  |                   |  |                   |  | accuracy vs   |  |
|  | Method:           |  | Method:           |  | ground truth  |  |
|  |  PSI, KS-test,    |  |  Jensen-Shannon   |  |               |  |
|  |  Wasserstein dist  |  |  divergence       |  | Lag: 15min    |  |
|  |                   |  |                   |  | (when actuals |  |
|  | Alert if:         |  | Alert if:         |  |  arrive)      |  |
|  |  PSI > 0.2        |  |  JSD > 0.15       |  |               |  |
|  +-------------------+  +-------------------+  +---------------+  |
|                                                                   |
|  +-------------------+  +-------------------+  +---------------+  |
|  | LATENCY           |  | THROUGHPUT        |  | AUTO RETRAIN  |  |
|  |                   |  |                   |  |               |  |
|  | P50: < 50ms       |  | Target:           |  | Triggered if: |  |
|  | P95: < 150ms      |  |  5K infer/sec     |  |  - Drift alert|  |
|  | P99: < 300ms      |  |  per model        |  |  - MAE > 10%  |  |
|  |                   |  |                   |  |  - Weekly sched|  |
|  | Alert if P99 >    |  | Alert if < 2K     |  |               |  |
|  |  500ms for 5min   |  |  for 2min         |  | Cooldown: 4hr |  |
|  +-------------------+  +-------------------+  +---------------+  |
+-------------------------------------------------------------------+
```

### Monitoring Pipeline

```
Live Predictions
       |
       v
[Prediction Logger]  --> [Kafka: model-predictions]
       |                           |
       v                           v
[Ground Truth Join]        [Evidently AI / Alibi Detect]
(when actuals arrive)              |
       |                   +-------+-------+
       v                   |               |
[Metric Calculator]   [Drift Score]   [Alert if threshold]
       |                                   |
       v                                   v
[Prometheus Metrics]              [PagerDuty / Slack]
       |
       v
[Grafana Dashboard]
```

---

## 10. Hardware Requirements

### Production Deployment

| Component | Spec | Quantity | Purpose |
|---|---|---|---|
| **GPU Inference** | NVIDIA T4 16GB | 8 | Real-time model serving |
| **GPU Training** | NVIDIA A100 80GB | 4 | Model training + RL |
| **CPU Compute** | m6i.2xlarge (8C/32GB) | 6 | API services, agents |
| **Memory Optimized** | r6i.4xlarge (16C/128GB) | 3 | TimescaleDB, Redis |
| **Spot Instances** | m6i.xlarge (4C/16GB) | 0-20 | Batch jobs, experiments |

### Cost Estimate (Monthly)

| Item | Cost |
|---|---|
| GPU instances (inference, on-demand) | $4,800 |
| GPU instances (training, spot) | $2,200 |
| CPU compute (API/services) | $3,100 |
| Data stores (TimescaleDB, Redis, Kafka) | $4,500 |
| Storage (S3, EFS) | $800 |
| Networking (data transfer, LB) | $600 |
| Observability (logs, metrics, tracing) | $500 |
| **Total** | **$16,500/mo** |

*Costs assume AWS us-east-1 pricing. Spot instances provide ~60% savings for training workloads. Reserved instances recommended for steady-state inference nodes (additional ~30% savings).*

---

## Summary

SafeMove AI's ML architecture combines the predictive power of graph neural networks and temporal transformers with the adaptive intelligence of reinforcement learning. The pipeline is fully automated from feature engineering through deployment, with continuous monitoring ensuring models stay accurate as traffic patterns evolve. The system processes 5,000+ predictions per second with sub-300ms P99 latency, all managed through a versioned, auditable model lifecycle.
