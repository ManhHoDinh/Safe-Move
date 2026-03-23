# Prediction Models

> SafeMove AI's core intelligence layer -- six production ML models delivering real-time traffic prediction, route optimization, and incident detection with sub-second inference latency.

---

## Model Overview

| # | Model | Type | Primary Input | Output | Accuracy Target | Inference Latency |
|---|---|---|---|---|---|---|
| 1 | Traffic Flow Predictor | Temporal Fusion Transformer | Sensor time series, calendar features | Speed/volume per segment (5-60 min horizon) | MAPE < 8% | < 50 ms |
| 2 | Route Time Estimator | Graph Neural Network (GAT) | Road graph, real-time edge weights | ETA for origin-destination pair | MAE < 2.5 min | < 100 ms |
| 3 | Congestion Predictor | Spatiotemporal CNN (ST-ResNet) | Grid-based speed/volume heatmaps | Congestion probability map (15-60 min) | AUC > 0.92 | < 200 ms |
| 4 | Incident Detector | Isolation Forest + LSTM Autoencoder | Sensor anomalies, speed drops | Incident probability + type classification | Precision > 90%, Recall > 85% | < 30 ms |
| 5 | Demand Forecaster | DeepAR (probabilistic) | Historical demand, events, weather | Delivery demand by zone (1-24h) | MAPE < 12% | < 150 ms |
| 6 | Weather Impact Model | Gradient Boosted Trees (XGBoost) | Weather forecast, road type, history | Speed reduction factor per segment | RMSE < 3.5 km/h | < 10 ms |

---

## Model 1: Traffic Flow Predictor

### Architecture

```
                     TEMPORAL FUSION TRANSFORMER (TFT)
  =====================================================================

  STATIC COVARIATES              TIME-VARYING INPUTS
  (per road segment)             (per timestep)
  +------------------+           +-------------------------+
  | Road type        |           | Historical speed        |
  | # of lanes       |           | Historical volume       |
  | Speed limit      |           | Occupancy %             |
  | Urban/rural flag |           | Hour of day (cyclical)  |
  | Intersection cnt |           | Day of week (cyclical)  |
  +------------------+           | Is holiday              |
         |                       | Weather: temp, precip   |
         v                       | Upstream segment speed  |
  +--------------+               +-------------------------+
  | Static       |                        |
  | Embedding    |                        v
  | Layer        |               +-----------------+
  +--------------+               | Variable        |
         |                       | Selection       |
         |                       | Network (VSN)   |
         |                       +-----------------+
         |                                |
         +----------+----------+----------+
                    |
                    v
         +--------------------+
         | LSTM Encoder       |  <-- Processes past observations
         | (128 hidden units) |
         +--------------------+
                    |
                    v
         +--------------------+
         | Multi-Head         |  <-- Interpretable attention
         | Attention (8 heads)|      over temporal patterns
         +--------------------+
                    |
                    v
         +--------------------+
         | Gated Residual     |
         | Network            |
         +--------------------+
                    |
                    v
         +--------------------+
         | Quantile Output    |  <-- Predicts P10, P50, P90
         | Layer (3 quantiles)|      for uncertainty estimation
         +--------------------+
                    |
                    v
         +----------------------------------+
         | Output: speed & volume forecasts |
         | Horizons: 5, 15, 30, 60 minutes  |
         +----------------------------------+
```

### Implementation

```python
# safemove/models/traffic_flow/model.py

import torch
import torch.nn as nn
from pytorch_forecasting import TemporalFusionTransformer
from pytorch_forecasting.data import TimeSeriesDataSet

class SafeMoveTrafficPredictor:
    """
    Temporal Fusion Transformer for multi-horizon traffic flow prediction.
    Predicts speed and volume for each road segment at 5/15/30/60 min horizons.
    """

    MODEL_CONFIG = {
        "hidden_size": 128,
        "attention_head_size": 8,
        "dropout": 0.1,
        "hidden_continuous_size": 64,
        "learning_rate": 1e-3,
        "lstm_layers": 2,
        "output_size": 3,         # Quantiles: P10, P50, P90
        "loss": QuantileLoss(quantiles=[0.1, 0.5, 0.9]),
        "reduce_on_plateau_patience": 4,
    }

    FEATURE_CONFIG = {
        "time_varying_known": [
            "hour_sin", "hour_cos",         # Cyclical encoding
            "dow_sin", "dow_cos",           # Day of week
            "is_holiday", "is_weekend",
            "temp_forecast_c", "precip_forecast_mm",
        ],
        "time_varying_unknown": [
            "avg_speed_kmh", "volume",
            "occupancy_pct",
            "upstream_speed_1", "upstream_speed_2",
            "downstream_speed_1",
        ],
        "static_categoricals": [
            "road_type", "urban_rural", "city_id",
        ],
        "static_reals": [
            "num_lanes", "speed_limit", "segment_length_km",
            "intersection_count", "avg_daily_traffic",
        ],
    }

    def build_dataset(self, df, max_encoder_length=96, max_prediction_length=12):
        """
        Build TimeSeriesDataSet with 96 steps of history (8 hours at 5-min granularity)
        predicting 12 steps ahead (1 hour at 5-min granularity).
        """
        return TimeSeriesDataSet(
            df,
            time_idx="time_idx",
            target="avg_speed_kmh",
            group_ids=["segment_id"],
            max_encoder_length=max_encoder_length,
            max_prediction_length=max_prediction_length,
            time_varying_known_reals=self.FEATURE_CONFIG["time_varying_known"],
            time_varying_unknown_reals=self.FEATURE_CONFIG["time_varying_unknown"],
            static_categoricals=self.FEATURE_CONFIG["static_categoricals"],
            static_reals=self.FEATURE_CONFIG["static_reals"],
            add_relative_time_idx=True,
            add_target_scales=True,
            add_encoder_length=True,
        )

    def train(self, train_loader, val_loader, max_epochs=50):
        model = TemporalFusionTransformer.from_dataset(
            train_loader.dataset,
            **self.MODEL_CONFIG,
        )
        trainer = pl.Trainer(
            max_epochs=max_epochs,
            accelerator="gpu",
            devices=4,
            strategy="ddp",
            gradient_clip_val=0.5,
            callbacks=[
                EarlyStopping(monitor="val_loss", patience=8),
                ModelCheckpoint(monitor="val_loss", save_top_k=3),
                LearningRateMonitor(),
            ],
        )
        trainer.fit(model, train_loader, val_loader)
        return model
```

### Performance Benchmarks

| Horizon | MAPE (%) | MAE (km/h) | RMSE (km/h) | P90 Coverage |
|---|---|---|---|---|
| 5 min | 4.2 | 2.1 | 3.4 | 91.2% |
| 15 min | 5.8 | 3.0 | 4.7 | 90.5% |
| 30 min | 7.1 | 3.8 | 5.9 | 89.8% |
| 60 min | 9.3 | 5.1 | 7.8 | 88.4% |

---

## Model 2: Route Time Estimator

### Architecture

```
                    GRAPH ATTENTION NETWORK (GAT)
  =====================================================================

  ROAD NETWORK GRAPH                 REAL-TIME EDGE FEATURES
  +---------------------+           +-------------------------+
  | Nodes: Intersections|           | Current speed           |
  | Edges: Road segments|           | Current volume          |
  | ~500K nodes/city    |           | Incident flags          |
  | ~800K edges/city    |           | Construction zones      |
  +---------------------+           | Traffic signal phase    |
         |                          +-------------------------+
         v                                    |
  +---------------------+                     |
  | Node Feature        |                     v
  | Embedding           |           +-------------------+
  | (intersection type, |           | Edge Feature       |
  |  signal, elevation) |           | Embedding          |
  +---------------------+           +-------------------+
         |                                    |
         +--+----+----+----+---------+--------+
            |    |    |    |
            v    v    v    v
         +-------------------------------+
         | GAT Layer 1 (8 heads, d=64)   |  <-- Local neighborhood
         +-------------------------------+
                      |
                      v
         +-------------------------------+
         | GAT Layer 2 (8 heads, d=64)   |  <-- 2-hop context
         +-------------------------------+
                      |
                      v
         +-------------------------------+
         | GAT Layer 3 (4 heads, d=128)  |  <-- City-wide patterns
         +-------------------------------+
                      |
                      v
         +-------------------------------+
         | Path Aggregation Module       |  <-- Aggregate node embeddings
         | (attention over candidate     |      along top-K candidate routes
         |  route nodes)                 |
         +-------------------------------+
                      |
                      v
         +-------------------------------+
         | MLP Head                      |
         | Output: ETA (seconds) +       |
         |   uncertainty interval        |
         +-------------------------------+
```

### Implementation

```python
# safemove/models/route_estimation/model.py

import torch
import torch.nn.functional as F
from torch_geometric.nn import GATv2Conv, global_mean_pool

class RouteTimeGAT(torch.nn.Module):
    """
    Graph Attention Network for route travel time estimation.
    Operates on the city road network graph with real-time edge weights.
    """

    def __init__(
        self,
        node_features: int = 32,
        edge_features: int = 16,
        hidden_dim: int = 64,
        num_heads: list = [8, 8, 4],
        dropout: float = 0.1,
    ):
        super().__init__()

        self.node_encoder = nn.Sequential(
            nn.Linear(node_features, hidden_dim),
            nn.ReLU(),
            nn.LayerNorm(hidden_dim),
        )

        self.edge_encoder = nn.Sequential(
            nn.Linear(edge_features, hidden_dim),
            nn.ReLU(),
            nn.LayerNorm(hidden_dim),
        )

        # Three GAT layers with increasing receptive field
        self.gat1 = GATv2Conv(hidden_dim, hidden_dim // num_heads[0],
                               heads=num_heads[0], edge_dim=hidden_dim, dropout=dropout)
        self.gat2 = GATv2Conv(hidden_dim, hidden_dim // num_heads[1],
                               heads=num_heads[1], edge_dim=hidden_dim, dropout=dropout)
        self.gat3 = GATv2Conv(hidden_dim, 128 // num_heads[2],
                               heads=num_heads[2], edge_dim=hidden_dim, dropout=dropout)

        # Path aggregation: attention-weighted sum of node embeddings along route
        self.path_attention = nn.MultiheadAttention(128, num_heads=4, batch_first=True)

        # ETA prediction head
        self.eta_head = nn.Sequential(
            nn.Linear(128 + 32, 64),    # + route-level features
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(64, 2),           # [mean_eta, log_variance]
        )

    def forward(self, x, edge_index, edge_attr, route_node_ids, route_features):
        # Encode raw features
        x = self.node_encoder(x)
        edge_attr = self.edge_encoder(edge_attr)

        # Message passing through GAT layers
        x = F.elu(self.gat1(x, edge_index, edge_attr)) + x   # Residual
        x = F.elu(self.gat2(x, edge_index, edge_attr)) + x
        x = F.elu(self.gat3(x, edge_index, edge_attr))

        # Extract embeddings for nodes along the candidate route
        route_embeddings = x[route_node_ids]                   # [route_len, 128]
        route_embeddings = route_embeddings.unsqueeze(0)       # [1, route_len, 128]

        # Self-attention over route to capture segment interactions
        attn_out, _ = self.path_attention(route_embeddings, route_embeddings, route_embeddings)
        route_repr = attn_out.mean(dim=1)                      # [1, 128]

        # Concatenate route-level features (distance, num_turns, etc.)
        combined = torch.cat([route_repr, route_features], dim=-1)

        # Predict ETA with uncertainty
        output = self.eta_head(combined)
        mean_eta = F.softplus(output[:, 0])        # Positive ETA
        log_var = output[:, 1]                      # Log variance for uncertainty
        return mean_eta, log_var
```

### Performance Benchmarks

| Route Type | MAE (min) | MAPE (%) | P80 Accuracy | Median Error |
|---|---|---|---|---|
| Short (< 5 km) | 1.2 | 6.8 | 94% | 0.8 min |
| Medium (5-20 km) | 2.1 | 7.5 | 91% | 1.4 min |
| Long (20-50 km) | 3.8 | 8.2 | 87% | 2.6 min |
| Highway dominant | 1.8 | 5.1 | 95% | 1.1 min |
| Urban congested | 3.5 | 11.4 | 82% | 2.3 min |

---

## Model 3: Congestion Predictor

### Architecture

```
               SPATIOTEMPORAL RESIDUAL NETWORK (ST-ResNet)
  =====================================================================

  INPUT: 3D Tensor per city grid
  +------------------------------------------+
  | Dimensions: (C x H x W x T)             |
  | C = channels (speed, volume, occupancy)  |
  | H x W = city grid (e.g., 64 x 64)       |
  | T = time steps (12 x 5-min = 1 hour)    |
  +------------------------------------------+
           |                    |                    |
           v                    v                    v
  +----------------+  +------------------+  +----------------+
  | Closeness      |  | Period           |  | Trend          |
  | Component      |  | Component        |  | Component      |
  | (last 1 hour)  |  | (same hour,      |  | (same hour,    |
  |                |  |  last 3 days)    |  |  last 3 weeks) |
  +----------------+  +------------------+  +----------------+
           |                    |                    |
           v                    v                    v
  +----------------+  +------------------+  +----------------+
  | 3D Conv Block  |  | 3D Conv Block    |  | 3D Conv Block  |
  | (3x3x3) x 4   |  | (3x3x3) x 4     |  | (3x3x3) x 4   |
  | + Residual     |  | + Residual       |  | + Residual     |
  | + BatchNorm    |  | + BatchNorm      |  | + BatchNorm    |
  +----------------+  +------------------+  +----------------+
           |                    |                    |
           +----------+---------+----------+
                      |
                      v
           +------------------------+
           | Parametric Fusion      |   <-- Learned weights for each
           | W_c * X_c + W_p * X_p  |       temporal component
           |          + W_t * X_t   |
           +------------------------+
                      |
                      v
           +------------------------+
           | External Factor Fusion |   <-- Weather, events, holidays
           | (concatenate + 1x1     |
           |  convolution)          |
           +------------------------+
                      |
                      v
           +------------------------+
           | Sigmoid Output         |   <-- Congestion probability
           | (H x W grid)           |       per grid cell [0, 1]
           +------------------------+
```

### Implementation

```python
# safemove/models/congestion/model.py

import torch
import torch.nn as nn

class STResBlock(nn.Module):
    """Spatiotemporal residual block with 3D convolutions."""

    def __init__(self, channels: int):
        super().__init__()
        self.conv1 = nn.Conv3d(channels, channels, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm3d(channels)
        self.conv2 = nn.Conv3d(channels, channels, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm3d(channels)

    def forward(self, x):
        residual = x
        out = torch.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        return torch.relu(out + residual)


class CongestionPredictor(nn.Module):
    """
    ST-ResNet for city-wide congestion prediction.
    Processes three temporal views (closeness, period, trend)
    and fuses with external factors (weather, events).
    """

    def __init__(
        self,
        grid_h: int = 64,
        grid_w: int = 64,
        in_channels: int = 3,          # speed, volume, occupancy
        hidden_channels: int = 64,
        num_res_blocks: int = 4,
        num_external_features: int = 12,
        prediction_horizons: list = [3, 6, 12],  # 15, 30, 60 min
    ):
        super().__init__()
        self.prediction_horizons = prediction_horizons

        # Three temporal branches
        self.closeness_branch = self._build_branch(in_channels, hidden_channels, num_res_blocks)
        self.period_branch = self._build_branch(in_channels, hidden_channels, num_res_blocks)
        self.trend_branch = self._build_branch(in_channels, hidden_channels, num_res_blocks)

        # Learned fusion weights
        self.W_c = nn.Parameter(torch.randn(1, hidden_channels, 1, 1))
        self.W_p = nn.Parameter(torch.randn(1, hidden_channels, 1, 1))
        self.W_t = nn.Parameter(torch.randn(1, hidden_channels, 1, 1))

        # External factor embedding
        self.external_embed = nn.Sequential(
            nn.Linear(num_external_features, grid_h * grid_w),
            nn.ReLU(),
            nn.Unflatten(1, (1, grid_h, grid_w)),
        )

        # Output head: one channel per prediction horizon
        self.output_conv = nn.Sequential(
            nn.Conv2d(hidden_channels + 1, 32, kernel_size=1),
            nn.ReLU(),
            nn.Conv2d(32, len(prediction_horizons), kernel_size=1),
            nn.Sigmoid(),
        )

    def _build_branch(self, in_ch, hidden_ch, num_blocks):
        layers = [nn.Conv3d(in_ch, hidden_ch, kernel_size=3, padding=1), nn.ReLU()]
        for _ in range(num_blocks):
            layers.append(STResBlock(hidden_ch))
        layers.append(nn.AdaptiveAvgPool3d((hidden_ch, None, None)))
        return nn.Sequential(*layers)

    def forward(self, x_close, x_period, x_trend, external_features):
        # Process each temporal component
        h_c = self.closeness_branch(x_close).squeeze(2)  # [B, C, H, W]
        h_p = self.period_branch(x_period).squeeze(2)
        h_t = self.trend_branch(x_trend).squeeze(2)

        # Parametric fusion
        fused = self.W_c * h_c + self.W_p * h_p + self.W_t * h_t

        # External factor injection
        ext = self.external_embed(external_features)       # [B, 1, H, W]
        combined = torch.cat([fused, ext], dim=1)          # [B, C+1, H, W]

        # Predict congestion probability per grid cell per horizon
        return self.output_conv(combined)                   # [B, horizons, H, W]
```

### Grid Resolution and Coverage

| City Size | Grid Resolution | Cell Size | Coverage |
|---|---|---|---|
| Small (< 500K pop) | 32 x 32 | ~500 m | Central urban area |
| Medium (500K-2M) | 64 x 64 | ~500 m | Full metro area |
| Large (2M+) | 128 x 128 | ~500 m | Metro + major corridors |

---

## Model 4: Incident Detector

### Architecture

```
                      HYBRID ANOMALY DETECTION
  =====================================================================

  INPUT STREAM (per segment, 30-second windows)
  +-------------------------------------------+
  | speed_delta, volume_delta, occupancy_delta |
  | upstream_speed_ratio, queue_length_est     |
  +-------------------------------------------+
              |                         |
              v                         v
  +---------------------+    +---------------------+
  | Isolation Forest    |    | LSTM Autoencoder    |
  | (statistical        |    | (temporal anomaly   |
  |  anomaly detection) |    |  reconstruction)    |
  |                     |    |                     |
  | Features:           |    | Encoder:            |
  | - Z-scores of all   |    |   LSTM(64) -> LSTM  |
  |   input features    |    |   (32) -> latent(16)|
  | - Sudden speed drop |    | Decoder:            |
  |   > 30 km/h         |    |   LSTM(32) -> LSTM  |
  | - Volume spike      |    |   (64) -> recon.    |
  |                     |    |                     |
  | Output: anomaly     |    | Output: recon.      |
  |   score [0, 1]      |    |   error [0, inf)    |
  +---------------------+    +---------------------+
              |                         |
              +----------+--------------+
                         |
                         v
              +---------------------+
              | Ensemble Combiner   |
              | score = 0.4*IF +    |
              |         0.6*LSTM_AE |
              +---------------------+
                         |
                         v
              +---------------------+
              | Classification Head |     IF score > threshold:
              | (incident type)     |     - Collision
              |                     |     - Breakdown
              | Random Forest on    |     - Road hazard
              | anomaly features    |     - Weather-related
              +---------------------+     - Construction
                         |
                         v
              +---------------------+
              | Severity Estimator  |     Severity: 1-5
              | + Duration Pred.    |     Duration: minutes
              +---------------------+
```

### Implementation

```python
# safemove/models/incident_detection/model.py

import torch
import torch.nn as nn
from sklearn.ensemble import IsolationForest

class LSTMAutoencoder(nn.Module):
    """Temporal autoencoder for detecting anomalous traffic patterns."""

    def __init__(self, input_dim: int = 5, hidden_dim: int = 64, latent_dim: int = 16):
        super().__init__()
        self.encoder = nn.LSTM(input_dim, hidden_dim, num_layers=2, batch_first=True)
        self.enc_to_latent = nn.Linear(hidden_dim, latent_dim)
        self.latent_to_dec = nn.Linear(latent_dim, hidden_dim)
        self.decoder = nn.LSTM(hidden_dim, input_dim, num_layers=2, batch_first=True)

    def forward(self, x):
        # x: [batch, seq_len, input_dim]
        enc_out, (h_n, _) = self.encoder(x)
        latent = self.enc_to_latent(h_n[-1])              # [batch, latent_dim]
        dec_init = self.latent_to_dec(latent).unsqueeze(0) # [1, batch, hidden_dim]
        dec_input = torch.zeros_like(x)
        dec_out, _ = self.decoder(dec_input, (dec_init, torch.zeros_like(dec_init)))
        return dec_out, latent

    def reconstruction_error(self, x):
        recon, _ = self.forward(x)
        return torch.mean((x - recon) ** 2, dim=(1, 2))   # Per-sample MSE


class IncidentDetector:
    """
    Hybrid anomaly detection combining Isolation Forest (statistical)
    with LSTM Autoencoder (temporal). Ensemble score triggers incident alerts.
    """

    THRESHOLDS = {
        "anomaly_score": 0.75,          # Combined score threshold
        "min_consecutive_windows": 2,    # Must persist for 2+ windows (60s)
        "speed_drop_absolute": 30,       # km/h drop in single window
        "confidence_min": 0.6,           # Minimum confidence to alert
    }

    def __init__(self):
        self.isolation_forest = IsolationForest(
            n_estimators=200,
            contamination=0.02,          # Expected 2% anomaly rate
            random_state=42,
        )
        self.lstm_ae = LSTMAutoencoder()
        self.classifier = RandomForestClassifier(n_estimators=100)

    def detect(self, window_features: dict) -> dict:
        """Run detection on a single 30-second window for one segment."""
        # Isolation Forest score
        if_score = self._normalize_if_score(
            self.isolation_forest.score_samples([window_features["statistical"]])[0]
        )

        # LSTM Autoencoder reconstruction error
        temporal_input = torch.tensor(window_features["temporal"]).unsqueeze(0)
        recon_error = self.lstm_ae.reconstruction_error(temporal_input).item()
        ae_score = min(recon_error / self.ae_error_threshold, 1.0)

        # Ensemble
        combined_score = 0.4 * if_score + 0.6 * ae_score

        if combined_score > self.THRESHOLDS["anomaly_score"]:
            incident_type = self.classifier.predict([window_features["classification"]])[0]
            severity = self._estimate_severity(combined_score, window_features)
            return {
                "detected": True,
                "score": combined_score,
                "type": incident_type,
                "severity": severity,
                "confidence": min(combined_score / self.THRESHOLDS["anomaly_score"], 1.0),
            }
        return {"detected": False, "score": combined_score}
```

---

## Model 5: Demand Forecaster

### Architecture

```
                       DeepAR PROBABILISTIC FORECASTER
  =====================================================================

  INPUTS (per delivery zone, hourly)
  +------------------------------------------+
  | Historical demand (orders/hour)          |
  | Day of week, hour of day (cyclical)      |
  | Weather forecast                          |
  | Scheduled events (concerts, sports)      |
  | Promotions / pricing                      |
  | Zone demographics                         |
  +------------------------------------------+
              |
              v
  +------------------------------------------+
  | Autoregressive LSTM                       |
  |                                           |
  | h_t = LSTM(h_{t-1}, x_t, z_{t-1})       |
  |                                           |
  | where z_{t-1} is the previous sample     |
  | (teacher forcing during training)         |
  +------------------------------------------+
              |
              v
  +------------------------------------------+
  | Distribution Head                         |
  |                                           |
  | Negative Binomial: P(z_t | mu_t, alpha_t)|
  | mu_t = softplus(W_mu * h_t)              |
  | alpha_t = softplus(W_alpha * h_t)        |
  +------------------------------------------+
              |
              v
  +------------------------------------------+
  | Output: 200 sample paths per zone        |
  | Horizons: 1h, 3h, 6h, 12h, 24h          |
  | Percentiles: P10, P50, P90               |
  +------------------------------------------+
```

### Implementation

```python
# safemove/models/demand_forecast/model.py

from gluonts.mx import DeepAREstimator
from gluonts.dataset.field_names import FieldName

class DemandForecaster:
    """
    Probabilistic demand forecasting for logistics zones.
    Uses Amazon's DeepAR architecture with negative binomial output.
    """

    def __init__(self, prediction_length: int = 24, context_length: int = 168):
        self.estimator = DeepAREstimator(
            freq="H",                           # Hourly granularity
            prediction_length=prediction_length, # 24 hours ahead
            context_length=context_length,       # 1 week of history
            num_layers=3,
            num_cells=128,
            dropout_rate=0.1,
            distr_output=NegativeBinomialOutput(),
            use_feat_dynamic_real=True,          # Time-varying features
            use_feat_static_cat=True,            # Zone-level categories
            cardinality=[50, 7, 24],             # Zone, day-of-week, hour
            embedding_dimension=[16, 4, 8],
            num_parallel_samples=200,            # Monte Carlo samples
            trainer=Trainer(
                epochs=100,
                learning_rate=1e-3,
                num_batches_per_epoch=500,
            ),
        )

    def train(self, train_data):
        self.predictor = self.estimator.train(train_data)

    def predict(self, test_data) -> dict:
        forecasts = list(self.predictor.predict(test_data))
        return {
            "p10": [f.quantile(0.1) for f in forecasts],
            "p50": [f.quantile(0.5) for f in forecasts],
            "p90": [f.quantile(0.9) for f in forecasts],
            "mean": [f.mean for f in forecasts],
            "samples": [f.samples for f in forecasts],
        }
```

---

## Model 6: Weather Impact Model

### Architecture

```
                   XGBOOST WEATHER IMPACT MODEL
  =====================================================================

  INPUTS (per road segment)
  +------------------------------------------+
  | Weather Features:                         |    Road Features:
  | - Temperature (C)                         |    - Road type
  | - Precipitation rate (mm/h)               |    - Surface type
  | - Precipitation type (rain/snow/ice)      |    - Drainage quality
  | - Visibility (km)                         |    - Elevation grade
  | - Wind speed (km/h)                       |    - Exposure (sheltered/open)
  | - Wind gusts (km/h)                       |
  | - Humidity (%)                            |    Historical:
  | - Road surface temp (C)                   |    - Avg speed in similar
  | - Fog flag                                |      weather conditions
  +------------------------------------------+    - Incident rate
              |
              v
  +------------------------------------------+
  | XGBoost Regressor                         |
  | - 500 trees, max_depth=8                  |
  | - Target: speed_reduction_factor          |
  |   (actual_speed / free_flow_speed)        |
  | - Range: [0.1, 1.0]                       |
  |   1.0 = no impact, 0.1 = severe impact   |
  +------------------------------------------+
              |
              v
  +------------------------------------------+
  | Output: speed_factor per segment          |
  | Used by: Route Estimator, Congestion      |
  |   Predictor as input feature              |
  +------------------------------------------+
```

### Implementation

```python
# safemove/models/weather_impact/model.py

import xgboost as xgb
import numpy as np

class WeatherImpactModel:
    """
    Predicts the speed reduction factor caused by weather conditions.
    Lightweight model (< 10ms inference) used as feature input to other models.
    """

    FEATURE_COLUMNS = [
        "temp_c", "precip_rate_mmh", "precip_type",
        "visibility_km", "wind_speed_kmh", "wind_gust_kmh",
        "humidity_pct", "surface_temp_c", "is_fog",
        "road_type", "surface_type", "drainage_quality",
        "elevation_grade", "exposure_class",
        "historical_speed_similar_weather", "historical_incident_rate",
    ]

    def __init__(self):
        self.model = xgb.XGBRegressor(
            n_estimators=500,
            max_depth=8,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            reg_alpha=0.1,
            reg_lambda=1.0,
            objective="reg:squarederror",
            tree_method="hist",
            eval_metric=["rmse", "mae"],
        )

    def train(self, X_train, y_train, X_val, y_val):
        self.model.fit(
            X_train, y_train,
            eval_set=[(X_val, y_val)],
            early_stopping_rounds=20,
            verbose=50,
        )
        # Log feature importance
        importance = dict(zip(self.FEATURE_COLUMNS, self.model.feature_importances_))
        return sorted(importance.items(), key=lambda x: -x[1])

    def predict(self, weather_features: np.ndarray) -> np.ndarray:
        """Predict speed reduction factor. Clamp to [0.1, 1.0]."""
        raw = self.model.predict(weather_features)
        return np.clip(raw, 0.1, 1.0)
```

---

## Feature Engineering

### Feature Categories

```
  +------------------------------------------------------------------+
  |                    FEATURE ENGINEERING PIPELINE                    |
  |                                                                   |
  |  TEMPORAL FEATURES          SPATIAL FEATURES                      |
  |  - Hour of day (sin/cos)   - Segment length                      |
  |  - Day of week (sin/cos)   - Number of lanes                     |
  |  - Month (sin/cos)         - Speed limit                         |
  |  - Is holiday              - Road classification                  |
  |  - Is peak hour            - Upstream/downstream speeds           |
  |  - Minutes since midnight  - Neighboring segment avg              |
  |  - Lag features (t-1..t-6) - Distance to nearest intersection    |
  |                             - Distance to highway ramp            |
  |  ROLLING STATISTICS                                               |
  |  - Speed: mean, std, min,  EXTERNAL FEATURES                     |
  |    max (1h, 4h, 24h, 7d)  - Temperature, precipitation           |
  |  - Volume: sum, mean       - Visibility, wind                     |
  |    (1h, 4h, 24h)          - Nearby events (type, capacity)       |
  |  - Congestion ratio        - School in/out schedule               |
  |  - Speed trend (slope)     - Construction zone flag               |
  |                             - Social media sentiment              |
  +------------------------------------------------------------------+
```

### Cyclical Encoding

```python
# safemove/models/common/feature_engineering.py

import numpy as np

def cyclical_encode(value: float, period: float) -> tuple[float, float]:
    """Encode cyclical features as sin/cos to preserve continuity."""
    return (
        np.sin(2 * np.pi * value / period),
        np.cos(2 * np.pi * value / period),
    )

def build_temporal_features(timestamp) -> dict:
    return {
        "hour_sin": cyclical_encode(timestamp.hour, 24)[0],
        "hour_cos": cyclical_encode(timestamp.hour, 24)[1],
        "dow_sin": cyclical_encode(timestamp.weekday(), 7)[0],
        "dow_cos": cyclical_encode(timestamp.weekday(), 7)[1],
        "month_sin": cyclical_encode(timestamp.month, 12)[0],
        "month_cos": cyclical_encode(timestamp.month, 12)[1],
        "is_weekend": int(timestamp.weekday() >= 5),
        "is_peak_morning": int(7 <= timestamp.hour <= 9),
        "is_peak_evening": int(16 <= timestamp.hour <= 18),
        "minutes_since_midnight": timestamp.hour * 60 + timestamp.minute,
    }
```

---

## Model Evaluation Metrics

### Primary Metrics by Model

| Model | Primary Metric | Secondary Metrics | Business KPI |
|---|---|---|---|
| Traffic Flow | MAPE < 8% | MAE, RMSE, quantile coverage | Dashboard accuracy |
| Route Time | MAE < 2.5 min | MAPE, P80 accuracy | User trust in ETA |
| Congestion | AUC-ROC > 0.92 | Precision, recall, F1 | Proactive rerouting |
| Incident Detection | Precision > 90% | Recall > 85%, F1 > 87%, time-to-detect | False alarm rate |
| Demand Forecast | MAPE < 12% | CRPS, quantile calibration | Fleet utilization |
| Weather Impact | RMSE < 3.5 km/h | MAE, R-squared | Route quality in bad weather |

### Evaluation Pipeline

```python
# safemove/models/common/evaluation.py

import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, roc_auc_score

class ModelEvaluator:
    """Standardized evaluation suite for all SafeMove prediction models."""

    @staticmethod
    def regression_metrics(y_true, y_pred) -> dict:
        mae = mean_absolute_error(y_true, y_pred)
        rmse = np.sqrt(mean_squared_error(y_true, y_pred))
        mape = np.mean(np.abs((y_true - y_pred) / np.clip(y_true, 1e-8, None))) * 100
        return {"MAE": mae, "RMSE": rmse, "MAPE": mape}

    @staticmethod
    def quantile_calibration(y_true, quantile_preds: dict) -> dict:
        """Check if predicted quantiles match observed coverage."""
        results = {}
        for q, preds in quantile_preds.items():
            observed_coverage = np.mean(y_true <= preds)
            results[f"Q{int(q*100)}_target"] = q
            results[f"Q{int(q*100)}_observed"] = observed_coverage
            results[f"Q{int(q*100)}_calibration_error"] = abs(q - observed_coverage)
        return results

    @staticmethod
    def detection_metrics(y_true, y_scores, threshold: float = 0.5) -> dict:
        y_pred = (y_scores >= threshold).astype(int)
        tp = np.sum((y_pred == 1) & (y_true == 1))
        fp = np.sum((y_pred == 1) & (y_true == 0))
        fn = np.sum((y_pred == 0) & (y_true == 1))
        precision = tp / max(tp + fp, 1)
        recall = tp / max(tp + fn, 1)
        f1 = 2 * precision * recall / max(precision + recall, 1e-8)
        return {
            "precision": precision,
            "recall": recall,
            "f1": f1,
            "auc_roc": roc_auc_score(y_true, y_scores),
        }
```

---

## Production Inference

### Serving Architecture

```
  CLIENT REQUEST
       |
       v
  +-------------------+
  | API Gateway       |
  | (rate limiting)   |
  +-------------------+
       |
       v
  +-------------------+       +---------------------+
  | Model Router      |------>| Feature Store       |
  | (selects model    |       | (Feast)             |
  |  + version)       |       | Online: Redis       |
  |                   |       | Offline: S3/Parquet |
  +-------------------+       +---------------------+
       |
       +----------+----------+----------+
       |          |          |          |
       v          v          v          v
  +---------+ +---------+ +---------+ +---------+
  | Traffic | | Route   | | Congest.| | Incident|
  | TFT     | | GAT     | | ST-CNN  | | Hybrid  |
  | (TorchS.| | (TorchS.| | (TorchS.| | (ONNX)  |
  |  + GPU) |  | + GPU) |  | + GPU) |  | + CPU) |
  +---------+ +---------+ +---------+ +---------+
       |          |          |          |
       +----------+----------+----------+
                  |
                  v
          +---------------+
          | Response       |
          | Aggregator     |
          | (combine +     |
          |  cache result) |
          +---------------+
```

### Inference Latency Targets

| Model | Serving Format | Hardware | Target P99 | Batch Size |
|---|---|---|---|---|
| Traffic Flow TFT | TorchServe | NVIDIA T4 GPU | < 50 ms | 64 segments |
| Route Time GAT | TorchServe | NVIDIA T4 GPU | < 100 ms | 1 route |
| Congestion ST-CNN | TorchServe | NVIDIA T4 GPU | < 200 ms | 1 city grid |
| Incident Detector | ONNX Runtime | CPU (8 core) | < 30 ms | 128 segments |
| Demand Forecaster | TorchServe | NVIDIA T4 GPU | < 150 ms | 50 zones |
| Weather Impact | XGBoost native | CPU (4 core) | < 10 ms | 1000 segments |

---

## Training Infrastructure and Retraining Schedule

### Training Resources

| Model | Training Data | Training Time | GPU Hours | Cost/Run |
|---|---|---|---|---|
| Traffic Flow TFT | 6 months, all segments | ~8 hours | 32 (4x A100) | ~$100 |
| Route Time GAT | 3 months, full graph | ~12 hours | 32 (4x A100) | ~$100 |
| Congestion ST-CNN | 6 months, city grids | ~6 hours | 16 (2x A100) | ~$50 |
| Incident Detector | 1 year, labeled incidents | ~2 hours | 4 (1x A100) | ~$15 |
| Demand Forecaster | 1 year, zone demand | ~4 hours | 8 (1x A100) | ~$25 |
| Weather Impact | 2 years, weather+traffic | ~30 min | CPU only | ~$2 |

### Retraining Schedule

```
  +------------------------------------------------------------------+
  |                    RETRAINING CADENCE                              |
  |                                                                   |
  |  Model                  Schedule       Trigger Conditions          |
  |  =====================  ============   =========================  |
  |  Traffic Flow TFT       Weekly         MAPE drift > 2% baseline  |
  |  Route Time GAT         Bi-weekly      MAE drift > 1 min         |
  |  Congestion ST-CNN      Weekly         AUC drop > 0.02           |
  |  Incident Detector      Monthly        Precision drop > 5%       |
  |  Demand Forecaster      Weekly         MAPE drift > 3%           |
  |  Weather Impact         Monthly        RMSE drift > 1 km/h       |
  |                                                                   |
  |  All models: emergency retrain on city-level infrastructure       |
  |  changes (new roads, signal changes, construction zones)          |
  +------------------------------------------------------------------+
```

### Model Versioning

```python
# safemove/models/common/versioning.py

MODEL_REGISTRY = {
    "traffic_flow_tft": {
        "current_version": "v12",
        "stage": "production",
        "trained_on": "2026-03-14",
        "metrics": {"mape_30min": 7.1, "rmse_30min": 5.9},
        "artifact": "s3://safemove-models/traffic_flow_tft/v12/model.pt",
        "champion_challenger": {
            "champion": "v12",
            "challenger": "v13-experimental",
            "traffic_split": {"champion": 0.9, "challenger": 0.1},
        },
    },
}
```

---

*SafeMove AI Prediction Models -- six specialized models delivering real-time traffic intelligence with production-grade reliability and continuous improvement.*
