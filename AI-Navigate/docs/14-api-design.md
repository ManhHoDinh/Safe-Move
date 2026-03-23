# API Design

> SafeMove AI exposes a unified API surface combining REST, WebSocket, and GraphQL interfaces to serve every consumer — from city dashboards polling analytics, to autonomous agents streaming real-time telemetry, to partner platforms running batch optimizations.

---

## 1. Design Principles

| Principle | Implementation |
|---|---|
| **Contract-First** | OpenAPI 3.1 spec is the single source of truth; code is generated from the spec, not the other way around. |
| **Resource-Oriented** | Every URL identifies a noun (traffic flow, route, simulation). Actions are expressed through HTTP verbs. |
| **Consistent Envelope** | Every JSON response shares the same top-level shape (`data`, `meta`, `errors`). |
| **Idempotency** | All mutating endpoints accept an `Idempotency-Key` header to guarantee safe retries. |
| **Versioned by URL** | Major versions live in the path (`/api/v1/`). Non-breaking changes ship without version bumps. |
| **Async by Default** | Long-running operations return `202 Accepted` with a status URL. Clients poll or subscribe via WebSocket. |
| **Security in Depth** | All endpoints require authentication. Sensitive operations require additional scoping via OAuth2 scopes. |

---

## 2. Authentication & Authorization

SafeMove supports three complementary auth mechanisms:

```
┌────────────────────────────────────────────────────────┐
│                   Client Request                       │
│                                                        │
│   ┌──────────┐   ┌──────────┐   ┌──────────────────┐  │
│   │  JWT      │   │ API Key  │   │ OAuth2 (PKCE)    │  │
│   │ (Bearer)  │   │ (Header) │   │ (Authorization   │  │
│   │           │   │          │   │  Code Flow)      │  │
│   └─────┬────┘   └────┬─────┘   └───────┬──────────┘  │
│         │              │                 │             │
│         └──────────────┼─────────────────┘             │
│                        ▼                               │
│              ┌─────────────────┐                       │
│              │  Auth Middleware │                       │
│              │  (FastAPI Deps) │                       │
│              └────────┬────────┘                       │
│                       ▼                                │
│              ┌─────────────────┐                       │
│              │  RBAC / Scopes  │                       │
│              │  Enforcement    │                       │
│              └─────────────────┘                       │
└────────────────────────────────────────────────────────┘
```

### 2.1 JWT (Bearer Token)

Used by the React dashboard and first-party clients.

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "operator@cityworks.gov",
  "password": "••••••••"
}
```

Response:

```json
{
  "data": {
    "access_token": "eyJhbGciOiJSUzI1NiIs...",
    "refresh_token": "dGhpcyBpcyBhIHJlZnJl...",
    "token_type": "Bearer",
    "expires_in": 3600
  }
}
```

Tokens are RS256-signed, carry user ID and RBAC scopes, and expire in **1 hour**. Refresh tokens rotate on each use with a **30-day** absolute lifetime.

### 2.2 API Keys

Used by server-to-server integrations and partner platforms.

```http
GET /api/v1/traffic/flow?zone=downtown
X-API-Key: smv_live_a1b2c3d4e5f6...
```

Keys are scoped to specific domains (`traffic:read`, `routes:write`) and carry per-key rate limits.

### 2.3 OAuth2 (Third-Party)

Used by external developers building on the SafeMove platform.

```
Authorization URL:  https://auth.safemove.ai/oauth/authorize
Token URL:          https://auth.safemove.ai/oauth/token
Supported Flows:    Authorization Code (PKCE), Client Credentials
Scopes:             traffic.read, routes.write, simulation.run,
                    analytics.read, agents.admin, llm.query
```

---

## 3. Base URL Structure

```
Production:    https://api.safemove.ai/api/v1/
Staging:       https://api.staging.safemove.ai/api/v1/
Development:   http://localhost:8000/api/v1/

WebSocket:     wss://ws.safemove.ai/ws/v1/
GraphQL:       https://api.safemove.ai/graphql
```

---

## 4. Core REST Endpoints

### 4.1 Traffic Domain

| Method | Endpoint | Description | Auth Scope |
|--------|----------|-------------|------------|
| `GET` | `/traffic/flow` | Current traffic flow for a zone or corridor | `traffic:read` |
| `GET` | `/traffic/flow/{segment_id}` | Flow data for a specific road segment | `traffic:read` |
| `POST` | `/traffic/predict` | Predict traffic conditions for a future time window | `traffic:read` |
| `GET` | `/traffic/incidents` | Active incidents (accidents, closures, construction) | `traffic:read` |
| `POST` | `/traffic/signals/optimize` | Request signal timing optimization for an intersection group | `traffic:write` |
| `GET` | `/traffic/heatmap` | Congestion heatmap tile data | `traffic:read` |

#### Example: Get Traffic Flow

```http
GET /api/v1/traffic/flow?zone=downtown&granularity=5m&from=2026-03-21T08:00:00Z&to=2026-03-21T09:00:00Z
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
Accept: application/json
```

```json
{
  "data": {
    "zone": "downtown",
    "granularity": "5m",
    "segments": [
      {
        "segment_id": "seg_4f8a2c",
        "road_name": "Market Street",
        "direction": "eastbound",
        "readings": [
          {
            "timestamp": "2026-03-21T08:00:00Z",
            "speed_kmh": 28.4,
            "volume_vph": 1240,
            "occupancy_pct": 67.2,
            "level_of_service": "D"
          }
        ]
      }
    ]
  },
  "meta": {
    "request_id": "req_7x9k2m",
    "timestamp": "2026-03-21T08:01:12Z",
    "total_segments": 47,
    "page": 1,
    "per_page": 25
  }
}
```

#### Example: Predict Traffic

```http
POST /api/v1/traffic/predict
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
Content-Type: application/json

{
  "zone": "downtown",
  "target_time": "2026-03-21T17:00:00Z",
  "horizon_minutes": 60,
  "model": "ensemble_v3",
  "include_confidence": true
}
```

```json
{
  "data": {
    "prediction_id": "pred_8m3nq1",
    "model": "ensemble_v3",
    "target_window": {
      "from": "2026-03-21T17:00:00Z",
      "to": "2026-03-21T18:00:00Z"
    },
    "segments": [
      {
        "segment_id": "seg_4f8a2c",
        "predicted_speed_kmh": 18.6,
        "predicted_volume_vph": 1820,
        "confidence": 0.87,
        "congestion_probability": 0.72
      }
    ]
  },
  "meta": {
    "request_id": "req_9p1z4w",
    "model_version": "3.2.1",
    "inference_time_ms": 142
  }
}
```

---

### 4.2 Routes Domain

| Method | Endpoint | Description | Auth Scope |
|--------|----------|-------------|------------|
| `POST` | `/routes/optimize` | Compute optimal route(s) given origin, destination, and constraints | `routes:write` |
| `GET` | `/routes/{id}` | Retrieve a previously computed route | `routes:read` |
| `POST` | `/routes/batch` | Batch-optimize multiple origin-destination pairs | `routes:write` |
| `GET` | `/routes/{id}/alternatives` | Retrieve alternative routes for a given route request | `routes:read` |
| `POST` | `/routes/{id}/reoptimize` | Reoptimize route based on real-time conditions | `routes:write` |

#### Example: Optimize Route

```http
POST /api/v1/routes/optimize
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
Content-Type: application/json
Idempotency-Key: idem_abc123

{
  "origin": { "lat": 37.7749, "lng": -122.4194 },
  "destination": { "lat": 37.8044, "lng": -122.2712 },
  "departure_time": "2026-03-21T08:30:00Z",
  "vehicle_type": "delivery_van",
  "constraints": {
    "avoid_tolls": false,
    "avoid_highways": false,
    "max_detour_pct": 15,
    "priority": "fastest"
  },
  "include_alternatives": true,
  "max_alternatives": 3
}
```

```json
{
  "data": {
    "route_id": "rt_5k2m8p",
    "status": "completed",
    "primary_route": {
      "distance_km": 18.4,
      "duration_minutes": 32,
      "estimated_arrival": "2026-03-21T09:02:00Z",
      "polyline": "encoded_polyline_string...",
      "steps": [
        {
          "instruction": "Head east on Market St",
          "distance_km": 1.2,
          "duration_minutes": 4,
          "road_name": "Market Street"
        }
      ],
      "traffic_delay_minutes": 8,
      "congestion_segments": 3
    },
    "alternatives": [ "..." ]
  },
  "meta": {
    "request_id": "req_3v7b1n",
    "computation_time_ms": 87
  }
}
```

---

### 4.3 Simulation Domain

| Method | Endpoint | Description | Auth Scope |
|--------|----------|-------------|------------|
| `POST` | `/simulation/run` | Launch a traffic simulation scenario | `simulation:run` |
| `GET` | `/simulation/{id}/status` | Poll simulation progress | `simulation:read` |
| `GET` | `/simulation/{id}/results` | Retrieve completed simulation results | `simulation:read` |
| `POST` | `/simulation/{id}/cancel` | Cancel a running simulation | `simulation:run` |
| `GET` | `/simulation/templates` | List available simulation templates | `simulation:read` |
| `POST` | `/simulation/{id}/replay` | Re-run a simulation with modified parameters | `simulation:run` |

#### Example: Run Simulation

```http
POST /api/v1/simulation/run
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
Content-Type: application/json

{
  "template": "intersection_optimization",
  "zone": "downtown",
  "parameters": {
    "duration_minutes": 120,
    "traffic_multiplier": 1.3,
    "signal_strategy": "adaptive_ai",
    "incident_injection": {
      "enabled": true,
      "probability": 0.05
    }
  }
}
```

```json
{
  "data": {
    "simulation_id": "sim_9w4x7r",
    "status": "queued",
    "estimated_duration_seconds": 340,
    "status_url": "/api/v1/simulation/sim_9w4x7r/status",
    "websocket_url": "wss://ws.safemove.ai/ws/v1/simulation/sim_9w4x7r"
  },
  "meta": {
    "request_id": "req_2c6d8f",
    "queued_at": "2026-03-21T10:15:00Z"
  }
}
```

#### Example: Poll Simulation Status

```json
{
  "data": {
    "simulation_id": "sim_9w4x7r",
    "status": "running",
    "progress_pct": 64,
    "elapsed_seconds": 218,
    "current_sim_time": "2026-03-21T11:16:00Z",
    "metrics_snapshot": {
      "avg_speed_kmh": 34.2,
      "total_vehicles": 12480,
      "incidents_generated": 2
    }
  }
}
```

---

### 4.4 Analytics Domain

| Method | Endpoint | Description | Auth Scope |
|--------|----------|-------------|------------|
| `GET` | `/analytics/dashboard` | Aggregated KPIs for the main dashboard | `analytics:read` |
| `GET` | `/analytics/reports` | List generated reports | `analytics:read` |
| `POST` | `/analytics/reports` | Request a new custom report | `analytics:write` |
| `GET` | `/analytics/reports/{id}` | Download a specific report | `analytics:read` |
| `GET` | `/analytics/trends` | Historical trend data for selected metrics | `analytics:read` |
| `GET` | `/analytics/compare` | Compare metrics across time periods or zones | `analytics:read` |

#### Example: Dashboard KPIs

```http
GET /api/v1/analytics/dashboard?zone=citywide&period=today
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

```json
{
  "data": {
    "period": "2026-03-21",
    "zone": "citywide",
    "kpis": {
      "avg_commute_minutes": 28.4,
      "congestion_index": 6.2,
      "incidents_active": 7,
      "signals_optimized": 342,
      "routes_served": 14820,
      "emission_reduction_pct": 12.3,
      "prediction_accuracy_pct": 91.7
    },
    "vs_yesterday": {
      "avg_commute_minutes": -2.1,
      "congestion_index": -0.8
    }
  }
}
```

---

### 4.5 Agents Domain

| Method | Endpoint | Description | Auth Scope |
|--------|----------|-------------|------------|
| `GET` | `/agents/status` | Health and state of all AI agents | `agents:read` |
| `GET` | `/agents/{agent_id}` | Detailed status of a specific agent | `agents:read` |
| `POST` | `/agents/configure` | Update agent configuration (thresholds, models, policies) | `agents:admin` |
| `POST` | `/agents/{agent_id}/restart` | Restart a specific agent | `agents:admin` |
| `GET` | `/agents/{agent_id}/logs` | Retrieve recent agent decision logs | `agents:read` |
| `GET` | `/agents/metrics` | Aggregate agent performance metrics | `agents:read` |

#### Example: Agent Status

```json
{
  "data": {
    "agents": [
      {
        "agent_id": "agent_traffic_pred",
        "name": "Traffic Prediction Agent",
        "type": "prediction",
        "status": "active",
        "uptime_hours": 168.4,
        "last_action": "2026-03-21T10:14:58Z",
        "model_version": "ensemble_v3.2.1",
        "actions_last_hour": 847,
        "error_rate_pct": 0.02
      },
      {
        "agent_id": "agent_signal_ctrl",
        "name": "Signal Control Agent",
        "type": "optimization",
        "status": "active",
        "uptime_hours": 168.4,
        "last_action": "2026-03-21T10:14:55Z",
        "intersections_managed": 342,
        "actions_last_hour": 2104,
        "error_rate_pct": 0.01
      }
    ]
  },
  "meta": {
    "total_agents": 6,
    "active": 5,
    "degraded": 1,
    "inactive": 0
  }
}
```

---

### 4.6 LLM Domain

| Method | Endpoint | Description | Auth Scope |
|--------|----------|-------------|------------|
| `POST` | `/llm/query` | Ask a natural-language question about traffic data | `llm:query` |
| `POST` | `/llm/report` | Generate a natural-language report from data | `llm:query` |
| `POST` | `/llm/chat` | Multi-turn conversational interface | `llm:query` |
| `GET` | `/llm/models` | List available LLM models and their capabilities | `llm:read` |
| `POST` | `/llm/summarize` | Summarize a set of analytics or incident data | `llm:query` |

#### Example: Natural Language Query

```http
POST /api/v1/llm/query
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
Content-Type: application/json

{
  "query": "What caused the congestion spike on Highway 101 yesterday between 5-6 PM?",
  "context": {
    "zone": "highway_101_corridor",
    "time_range": {
      "from": "2026-03-20T17:00:00Z",
      "to": "2026-03-20T18:00:00Z"
    }
  },
  "response_format": "detailed",
  "include_sources": true
}
```

```json
{
  "data": {
    "answer": "The congestion spike on Highway 101 between 5-6 PM yesterday was primarily caused by a three-vehicle collision at mile marker 42.3 that occurred at 4:47 PM and was not cleared until 5:38 PM. This reduced capacity by approximately 40% on the northbound lanes. Contributing factors included: (1) a 12% higher-than-normal traffic volume due to the Giants game at Oracle Park, and (2) signal timing issues at the Cesar Chavez on-ramp that were resolved by the Signal Control Agent at 5:22 PM.",
    "confidence": 0.91,
    "sources": [
      { "type": "incident", "id": "inc_7k2m", "description": "Multi-vehicle collision, Hwy 101 NB MM 42.3" },
      { "type": "event", "id": "evt_3p8n", "description": "SF Giants home game, Oracle Park" },
      { "type": "agent_log", "id": "log_signal_5x2", "description": "Signal reoptimization, Cesar Chavez ramp" }
    ],
    "model": "safemove-llm-v2",
    "tokens_used": 1847
  },
  "meta": {
    "request_id": "req_4h8j2k",
    "processing_time_ms": 2340
  }
}
```

#### Example: Generate Report

```http
POST /api/v1/llm/report
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
Content-Type: application/json

{
  "report_type": "weekly_summary",
  "zone": "citywide",
  "period": {
    "from": "2026-03-14",
    "to": "2026-03-21"
  },
  "audience": "city_council",
  "format": "markdown",
  "sections": ["executive_summary", "key_metrics", "incidents", "recommendations"]
}
```

---

## 5. WebSocket Endpoints

Real-time data streams are exposed over WebSocket for low-latency consumers.

```
wss://ws.safemove.ai/ws/v1/{channel}
```

### Available Channels

| Channel | Description | Message Rate |
|---------|-------------|--------------|
| `/ws/v1/traffic/live` | Real-time traffic flow updates across all zones | ~10 msg/sec |
| `/ws/v1/traffic/incidents` | Incident creation, updates, and resolution events | Event-driven |
| `/ws/v1/simulation/{id}` | Live progress and metrics for a running simulation | ~2 msg/sec |
| `/ws/v1/agents/events` | Agent actions, decisions, and state changes | ~5 msg/sec |
| `/ws/v1/routes/{id}/track` | Live tracking and ETA updates for an active route | ~1 msg/sec |
| `/ws/v1/alerts` | System alerts and threshold breaches | Event-driven |

### Connection & Subscription

```javascript
const ws = new WebSocket("wss://ws.safemove.ai/ws/v1/traffic/live");

// Authenticate on connect
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: "auth",
    token: "eyJhbGciOiJSUzI1NiIs..."
  }));
};

// Subscribe to specific zones
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: "subscribe",
    channels: ["zone:downtown", "zone:highway_101"],
    filters: {
      min_congestion_level: "C"
    }
  }));
};

// Handle incoming messages
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  // msg.type: "traffic_update" | "incident" | "alert" | ...
  // msg.data: { segment_id, speed_kmh, volume_vph, ... }
  // msg.timestamp: "2026-03-21T10:14:58.123Z"
};
```

### WebSocket Message Format

```json
{
  "type": "traffic_update",
  "channel": "zone:downtown",
  "timestamp": "2026-03-21T10:14:58.123Z",
  "data": {
    "segment_id": "seg_4f8a2c",
    "speed_kmh": 24.1,
    "volume_vph": 1380,
    "level_of_service": "D",
    "trend": "degrading"
  }
}
```

---

## 6. GraphQL Endpoint

For clients needing flexible queries across multiple domains in a single request.

```
POST https://api.safemove.ai/graphql
```

```graphql
query DashboardOverview($zone: String!, $from: DateTime!) {
  trafficFlow(zone: $zone, from: $from) {
    segments {
      segmentId
      speedKmh
      levelOfService
    }
    avgCongestionIndex
  }
  activeIncidents(zone: $zone) {
    id
    severity
    location { lat lng }
    estimatedClearTime
  }
  agentStatus {
    agentId
    name
    status
    actionsLastHour
  }
}
```

GraphQL is rate-limited by query complexity score rather than request count.

---

## 7. Rate Limiting

### Strategy

Rate limits are enforced per-client using a **sliding window** algorithm backed by Redis.

```
┌─────────────────────────────────────────────────────────────┐
│                     Rate Limit Tiers                        │
├──────────────┬──────────┬──────────┬───────────┬────────────┤
│    Tier      │ Requests │ Window   │ Burst     │ Applies To │
├──────────────┼──────────┼──────────┼───────────┼────────────┤
│ Free         │ 100      │ 1 hour   │ 10/min    │ API Key    │
│ Starter      │ 1,000    │ 1 hour   │ 50/min    │ API Key    │
│ Professional │ 10,000   │ 1 hour   │ 200/min   │ API Key    │
│ Enterprise   │ 100,000  │ 1 hour   │ 1000/min  │ API Key    │
│ Internal     │ Unlimited│ -        │ 5000/min  │ JWT        │
└──────────────┴──────────┴──────────┴───────────┴────────────┘
```

### Rate Limit Headers

Every response includes:

```http
X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 9847
X-RateLimit-Reset: 1711036800
X-RateLimit-Window: 3600
Retry-After: 42          # Only present on 429 responses
```

### 429 Response

```json
{
  "errors": [
    {
      "code": "RATE_LIMIT_EXCEEDED",
      "message": "Rate limit exceeded. 10,000 requests per hour allowed.",
      "retry_after_seconds": 42
    }
  ],
  "meta": {
    "request_id": "req_8x2k4m"
  }
}
```

---

## 8. Pagination

All list endpoints use **cursor-based pagination** for consistent results under real-time data changes.

### Request

```http
GET /api/v1/traffic/incidents?zone=citywide&per_page=25&cursor=eyJpZCI6MTIzNH0=
```

### Response

```json
{
  "data": [ "..." ],
  "meta": {
    "per_page": 25,
    "has_next": true,
    "has_prev": true,
    "next_cursor": "eyJpZCI6MTI1OX0=",
    "prev_cursor": "eyJpZCI6MTIwOX0=",
    "total_count": 142
  }
}
```

**Why cursor-based over offset?** Traffic data changes continuously. Offset pagination can produce duplicates or skips when records are inserted or removed between page fetches. Cursors provide stable iteration.

---

## 9. Error Response Format

All errors follow a consistent structure conforming to [RFC 7807](https://datatracker.ietf.org/doc/html/rfc7807) principles.

### Error Envelope

```json
{
  "errors": [
    {
      "code": "RESOURCE_NOT_FOUND",
      "message": "Route with ID 'rt_invalid123' was not found.",
      "field": null,
      "details": {
        "resource_type": "route",
        "resource_id": "rt_invalid123"
      }
    }
  ],
  "meta": {
    "request_id": "req_9p2z4w",
    "timestamp": "2026-03-21T10:20:00Z",
    "documentation_url": "https://docs.safemove.ai/errors/RESOURCE_NOT_FOUND"
  }
}
```

### Standard Error Codes

| HTTP Status | Code | Description |
|-------------|------|-------------|
| `400` | `VALIDATION_ERROR` | Request body or parameters failed validation |
| `401` | `AUTHENTICATION_REQUIRED` | Missing or invalid authentication credentials |
| `403` | `INSUFFICIENT_SCOPE` | Valid auth but missing required scope |
| `404` | `RESOURCE_NOT_FOUND` | Requested resource does not exist |
| `409` | `CONFLICT` | Resource state conflict (e.g., simulation already running) |
| `422` | `UNPROCESSABLE_ENTITY` | Semantically invalid request (e.g., destination inside restricted zone) |
| `429` | `RATE_LIMIT_EXCEEDED` | Too many requests |
| `500` | `INTERNAL_ERROR` | Unexpected server error |
| `502` | `UPSTREAM_ERROR` | Dependency failure (e.g., map tile provider down) |
| `503` | `SERVICE_UNAVAILABLE` | Temporary overload or maintenance |

### Validation Error Example (400)

```json
{
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "message": "Invalid value for 'departure_time': must be a future timestamp.",
      "field": "departure_time",
      "details": {
        "provided": "2025-01-01T00:00:00Z",
        "constraint": "must be >= current time"
      }
    },
    {
      "code": "VALIDATION_ERROR",
      "message": "Missing required field 'destination'.",
      "field": "destination",
      "details": {
        "constraint": "required"
      }
    }
  ],
  "meta": {
    "request_id": "req_1a3b5c"
  }
}
```

### Authentication Error Example (401)

```json
{
  "errors": [
    {
      "code": "AUTHENTICATION_REQUIRED",
      "message": "Access token has expired. Please refresh your token.",
      "details": {
        "token_expired_at": "2026-03-21T09:00:00Z"
      }
    }
  ],
  "meta": {
    "request_id": "req_7d9e1f"
  }
}
```

---

## 10. Versioning Strategy

```
URL Path Versioning:  /api/v1/...  /api/v2/...
                           │              │
                    Current (stable)   Next (beta)
```

### Rules

1. **Major versions** (`v1` -> `v2`) are introduced only for breaking changes and live in the URL path.
2. **Minor/patch changes** (new optional fields, new endpoints) ship within the current version without bumps.
3. **Deprecation policy**: A deprecated version receives security patches for **12 months** after the successor launches. Deprecation is announced via the `Sunset` header and email.
4. **Beta endpoints**: Pre-release features are accessible at `/api/v2-beta/` and may change without notice.

### Sunset Header

```http
Sunset: Sat, 21 Mar 2027 00:00:00 GMT
Deprecation: true
Link: <https://docs.safemove.ai/migration/v1-to-v2>; rel="successor-version"
```

---

## 11. SDK Design

Official SDKs are auto-generated from the OpenAPI spec and published to standard package registries.

### Python SDK

```bash
pip install safemove-sdk
```

```python
from safemove import SafeMoveClient

client = SafeMoveClient(
    api_key="smv_live_a1b2c3d4...",
    base_url="https://api.safemove.ai",  # optional, defaults to production
)

# Get traffic flow
flow = client.traffic.get_flow(zone="downtown", granularity="5m")
for segment in flow.segments:
    print(f"{segment.road_name}: {segment.speed_kmh} km/h (LoS {segment.level_of_service})")

# Predict traffic (async)
import asyncio

async def predict():
    async with SafeMoveClient(api_key="smv_live_...") as client:
        prediction = await client.traffic.predict(
            zone="downtown",
            target_time="2026-03-21T17:00:00Z",
            horizon_minutes=60
        )
        return prediction

result = asyncio.run(predict())

# Optimize route
route = client.routes.optimize(
    origin={"lat": 37.7749, "lng": -122.4194},
    destination={"lat": 37.8044, "lng": -122.2712},
    priority="fastest"
)
print(f"ETA: {route.primary_route.duration_minutes} min")

# Subscribe to real-time updates
async def stream_traffic():
    async for update in client.traffic.stream(zones=["downtown"]):
        print(f"[{update.timestamp}] {update.segment_id}: {update.speed_kmh} km/h")
```

### JavaScript / TypeScript SDK

```bash
npm install @safemove/sdk
```

```typescript
import { SafeMoveClient } from "@safemove/sdk";

const client = new SafeMoveClient({
  apiKey: "smv_live_a1b2c3d4...",
});

// Get traffic flow
const flow = await client.traffic.getFlow({
  zone: "downtown",
  granularity: "5m",
});

// Optimize route
const route = await client.routes.optimize({
  origin: { lat: 37.7749, lng: -122.4194 },
  destination: { lat: 37.8044, lng: -122.2712 },
  priority: "fastest",
});

console.log(`ETA: ${route.primaryRoute.durationMinutes} min`);

// Real-time WebSocket stream
const stream = client.traffic.stream({ zones: ["downtown"] });
stream.on("update", (data) => {
  console.log(`${data.segmentId}: ${data.speedKmh} km/h`);
});
```

### Go SDK

```bash
go get github.com/safemove-ai/safemove-go
```

```go
package main

import (
    "context"
    "fmt"
    "github.com/safemove-ai/safemove-go"
)

func main() {
    client := safemove.NewClient("smv_live_a1b2c3d4...")

    // Get traffic flow
    flow, err := client.Traffic.GetFlow(context.Background(), &safemove.FlowParams{
        Zone:        "downtown",
        Granularity: "5m",
    })
    if err != nil {
        panic(err)
    }

    for _, seg := range flow.Segments {
        fmt.Printf("%s: %.1f km/h\n", seg.RoadName, seg.SpeedKmh)
    }

    // Optimize route
    route, err := client.Routes.Optimize(context.Background(), &safemove.RouteRequest{
        Origin:      safemove.LatLng{Lat: 37.7749, Lng: -122.4194},
        Destination: safemove.LatLng{Lat: 37.8044, Lng: -122.2712},
        Priority:    safemove.PriorityFastest,
    })
    if err != nil {
        panic(err)
    }

    fmt.Printf("ETA: %d min\n", route.PrimaryRoute.DurationMinutes)
}
```

---

## 12. OpenAPI / Swagger Reference

The complete API specification is available in multiple formats:

| Resource | URL |
|----------|-----|
| **Swagger UI** (interactive) | `https://api.safemove.ai/docs` |
| **ReDoc** (reference) | `https://api.safemove.ai/redoc` |
| **OpenAPI JSON** | `https://api.safemove.ai/openapi.json` |
| **OpenAPI YAML** | `https://api.safemove.ai/openapi.yaml` |
| **Postman Collection** | `https://docs.safemove.ai/postman/safemove-v1.json` |

### FastAPI Auto-Generation

The spec is generated directly from FastAPI route definitions:

```python
from fastapi import FastAPI, Query, Depends
from pydantic import BaseModel
from datetime import datetime

app = FastAPI(
    title="SafeMove AI API",
    description="AI-powered traffic optimization and logistics intelligence",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

class TrafficFlowResponse(BaseModel):
    """Traffic flow data for road segments in a zone."""
    zone: str
    granularity: str
    segments: list[SegmentReading]

    class Config:
        json_schema_extra = {
            "example": {
                "zone": "downtown",
                "granularity": "5m",
                "segments": []
            }
        }

@app.get(
    "/api/v1/traffic/flow",
    response_model=APIResponse[TrafficFlowResponse],
    tags=["Traffic"],
    summary="Get current traffic flow",
    description="Returns real-time traffic flow readings for all road segments in the specified zone.",
)
async def get_traffic_flow(
    zone: str = Query(..., description="Zone identifier"),
    granularity: str = Query("5m", regex="^(1m|5m|15m|1h)$"),
    from_time: datetime = Query(None, alias="from"),
    to_time: datetime = Query(None, alias="to"),
    auth: AuthContext = Depends(require_scope("traffic:read")),
):
    ...
```

---

## 13. Request / Response Flow

```
Client                    API Gateway              Service Layer           Data Layer
  │                          │                          │                      │
  │  POST /routes/optimize   │                          │                      │
  ├─────────────────────────►│                          │                      │
  │                          │  Authenticate (JWT)      │                      │
  │                          │  Rate Limit Check        │                      │
  │                          │  Validate Request Body   │                      │
  │                          │                          │                      │
  │                          │  Forward to Route Svc    │                      │
  │                          ├─────────────────────────►│                      │
  │                          │                          │  Query Traffic DB    │
  │                          │                          ├─────────────────────►│
  │                          │                          │◄─────────────────────┤
  │                          │                          │                      │
  │                          │                          │  Run Optimization    │
  │                          │                          │  (OSRM + ML Model)  │
  │                          │                          │                      │
  │                          │  Return Optimized Route  │                      │
  │                          │◄─────────────────────────┤                      │
  │                          │                          │                      │
  │  200 OK (JSON)           │                          │                      │
  │◄─────────────────────────┤                          │                      │
  │                          │                          │                      │
```

---

## Appendix: Header Reference

| Header | Direction | Description |
|--------|-----------|-------------|
| `Authorization` | Request | `Bearer <JWT>` or API key via `X-API-Key` |
| `X-API-Key` | Request | API key for server-to-server auth |
| `Idempotency-Key` | Request | Unique key for safe retries on mutating endpoints |
| `X-Request-ID` | Both | Request correlation ID (generated if not provided) |
| `X-RateLimit-*` | Response | Rate limit metadata (see section 7) |
| `Sunset` | Response | Deprecation date for the endpoint |
| `Content-Type` | Both | Always `application/json` for REST |
| `Accept` | Request | `application/json` (default) or `text/event-stream` for SSE |
