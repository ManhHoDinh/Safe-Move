# System Architecture

> SafeMove AI Platform -- Cloud-Native, Event-Driven, Built for Scale

---

## 1. High-Level Architecture

```
+-----------------------------------------------------------------------------------+
|                              SAFEMOVE AI PLATFORM                                 |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +-----------+   +-------------+   +--------------+   +---------------------+     |
|  | INGESTION |-->| PROCESSING  |-->| INTELLIGENCE |-->|    PRESENTATION     |     |
|  |   LAYER   |   |    LAYER    |   |    LAYER     |   |       LAYER         |     |
|  +-----------+   +-------------+   +--------------+   +---------------------+     |
|       |                |                  |                     |                  |
|       v                v                  v                     v                  |
|  +-----------+   +-------------+   +--------------+   +---------------------+     |
|  | Kafka     |   | Stream Proc |   | ML Models    |   | React Dashboard    |     |
|  | Ingestors |   | TimescaleDB |   | Agent System |   | REST/WS APIs       |     |
|  | IoT Gw    |   | Redis Cache |   | Simulation   |   | Mobile SDK         |     |
|  +-----------+   +-------------+   +--------------+   +---------------------+     |
|                                                                                   |
|  +------------------+  +-------------------+  +-------------------+               |
|  | INFRASTRUCTURE   |  | SECURITY          |  | OBSERVABILITY     |               |
|  | Kubernetes / EKS |  | OAuth 2.0 / mTLS  |  | Prometheus/Grafana|               |
|  | Terraform / Helm |  | Vault / OPA       |  | ELK / Jaeger      |               |
|  +------------------+  +-------------------+  +-------------------+               |
+-----------------------------------------------------------------------------------+
```

---

## 2. Core Layers

### 2.1 Ingestion Layer

The ingestion layer is the nervous system of SafeMove AI. It captures data from thousands of heterogeneous sources in real time and normalizes it into a unified event stream.

```
 Traffic Sensors    GPS Feeds     Weather APIs    Event Calendars    Social Media
      |                |              |                 |                 |
      v                v              v                 v                 v
 +--------+      +--------+     +--------+        +--------+       +--------+
 | IoT GW |      | GPS    |     | REST   |        | Webhook|       | Stream |
 | (MQTT) |      | Decode |     | Poller |        | Recv   |       | Ingest |
 +--------+      +--------+     +--------+        +--------+       +--------+
      |                |              |                 |                 |
      +-------+--------+--------------+---------+-------+-----------------+
              |                                 |
              v                                 v
      +---------------+                +----------------+
      |  Schema       |                |  Kafka Cluster |
      |  Registry     |                |  (partitioned) |
      |  (Avro/Proto) |                |                |
      +---------------+                +----------------+
```

**Key Components:**

| Component | Technology | Throughput |
|---|---|---|
| IoT Gateway | EMQX / Mosquitto (MQTT 5.0) | 100K msgs/sec |
| GPS Decoder | Custom Python, Protobuf | 50K vehicles/sec |
| REST Pollers | FastAPI async workers | 10K req/sec |
| Event Bus | Apache Kafka (3 brokers, RF=3) | 500K events/sec |
| Schema Registry | Confluent Schema Registry | Avro + Protobuf |

### 2.2 Processing Layer

Raw events are enriched, deduplicated, and stored in purpose-built data stores optimized for time-series analytics and spatial queries.

```
                         Kafka Topics
                              |
              +---------------+---------------+
              |               |               |
              v               v               v
      +---------------+ +----------+  +-------------+
      | Flink / Spark | | Enricher |  | Dedup       |
      | Streaming     | | Service  |  | Service     |
      +---------------+ +----------+  +-------------+
              |               |               |
              +-------+-------+-------+-------+
                      |               |
                      v               v
              +---------------+ +---------------+
              | TimescaleDB   | | Redis Cluster |
              | (time-series) | | (hot cache)   |
              +---------------+ +---------------+
                      |
                      v
              +---------------+
              | PostGIS       |
              | (geospatial)  |
              +---------------+
```

**Processing Modes:**

- **Real-Time Stream Processing:** Apache Flink jobs consume Kafka topics, apply windowed aggregations (tumbling 30s, sliding 5min), and emit enriched events within 200ms p99 latency.
- **Batch Processing:** Nightly Spark jobs compute historical baselines, retrain feature pipelines, and generate aggregate reports stored in Parquet on S3.
- **Micro-Batch:** 1-minute interval rollups for dashboard metrics, combining the freshness of streaming with the efficiency of batch.

### 2.3 Intelligence Layer

The AI core of the platform. This layer hosts ML models, the multi-agent system, and the simulation engine.

```
      +-----------------------------------------------------------+
      |                   INTELLIGENCE LAYER                      |
      |                                                           |
      |  +----------------+  +----------------+  +--------------+ |
      |  | ML Inference   |  | Agent          |  | Simulation   | |
      |  | Cluster        |  | Orchestrator   |  | Engine       | |
      |  |                |  |                |  |              | |
      |  | - Prediction   |  | - Crawlers     |  | - Digital    | |
      |  | - Optimization |  | - Analyzers    |  |   Twin       | |
      |  | - NLP/LLM      |  | - Decisioners  |  | - What-If    | |
      |  +----------------+  +----------------+  +--------------+ |
      |          |                    |                  |         |
      |          +--------------------+------------------+         |
      |                               |                            |
      |                    +----------+----------+                 |
      |                    | Decision Fusion     |                 |
      |                    | Engine              |                 |
      |                    +---------------------+                 |
      +-----------------------------------------------------------+
```

### 2.4 Presentation Layer

The user-facing surface: dashboards, APIs, and integrations that deliver intelligence to operators, city planners, and downstream systems.

```
      +------------------------------------------------------------------+
      |                     PRESENTATION LAYER                           |
      |                                                                  |
      |  +------------------+  +-----------------+  +-----------------+  |
      |  | React Dashboard  |  | REST API        |  | WebSocket       |  |
      |  | (Vite.js)        |  | (FastAPI)       |  | Server          |  |
      |  |                  |  |                 |  | (real-time)     |  |
      |  | - Traffic Map    |  | - /api/v1/*     |  | - Live updates  |  |
      |  | - Analytics      |  | - OpenAPI 3.1   |  | - Alerts        |  |
      |  | - Scenario Lab   |  | - Rate limited  |  | - Map streams   |  |
      |  +------------------+  +-----------------+  +-----------------+  |
      |                                                                  |
      |  +------------------+  +-----------------+                       |
      |  | Mobile SDK       |  | Webhook/Push    |                       |
      |  | (React Native)   |  | Integrations    |                       |
      |  +------------------+  +-----------------+                       |
      +------------------------------------------------------------------+
```

---

## 3. Microservices Breakdown

```
+-------------------------------------------------------------------+
|                     SERVICE MESH (Istio)                           |
|                                                                   |
|  +------------------+  +------------------+  +------------------+ |
|  | ingestion-svc    |  | enrichment-svc   |  | prediction-svc   | |
|  | Port: 8001       |  | Port: 8002       |  | Port: 8003       | |
|  | Replicas: 3-10   |  | Replicas: 2-6    |  | Replicas: 2-8    | |
|  +------------------+  +------------------+  +------------------+ |
|                                                                   |
|  +------------------+  +------------------+  +------------------+ |
|  | routing-svc      |  | simulation-svc   |  | agent-svc        | |
|  | Port: 8004       |  | Port: 8005       |  | Port: 8006       | |
|  | Replicas: 3-12   |  | Replicas: 2-4    |  | Replicas: 3-10   | |
|  +------------------+  +------------------+  +------------------+ |
|                                                                   |
|  +------------------+  +------------------+  +------------------+ |
|  | analytics-svc    |  | notification-svc |  | auth-svc         | |
|  | Port: 8007       |  | Port: 8008       |  | Port: 8009       | |
|  | Replicas: 2-4    |  | Replicas: 2-3    |  | Replicas: 3      | |
|  +------------------+  +------------------+  +------------------+ |
|                                                                   |
|  +------------------+  +------------------+  +------------------+ |
|  | gateway-svc      |  | scheduler-svc    |  | llm-svc          | |
|  | Port: 8080       |  | Port: 8010       |  | Port: 8011       | |
|  | Replicas: 3-6    |  | Replicas: 1-2    |  | Replicas: 2-4    | |
|  +------------------+  +------------------+  +------------------+ |
+-------------------------------------------------------------------+
```

### Service Registry

| Service | Responsibility | Language | Data Store |
|---|---|---|---|
| `ingestion-svc` | Ingest, normalize, validate raw feeds | Python | Kafka |
| `enrichment-svc` | Geospatial enrichment, dedup, join streams | Python | Redis, PostGIS |
| `prediction-svc` | Serve ML model predictions | Python | Model Registry |
| `routing-svc` | Compute optimal routes in real time | Python/Rust | Redis, Neo4j |
| `simulation-svc` | Run traffic simulations and digital twin | Python/C++ | TimescaleDB |
| `agent-svc` | Multi-agent orchestration and lifecycle | Python | Redis, Kafka |
| `analytics-svc` | Aggregate analytics, historical queries | Python | TimescaleDB |
| `notification-svc` | Push alerts, webhooks, email | Python | Redis (pub/sub) |
| `auth-svc` | Authentication, authorization, API keys | Python | PostgreSQL |
| `gateway-svc` | API gateway, rate limiting, routing | Go / Envoy | Redis |
| `scheduler-svc` | Cron jobs, batch pipeline triggers | Python | PostgreSQL |
| `llm-svc` | LangChain-powered NLP and report generation | Python | Vector DB |

---

## 4. Data Flow Architecture

### 4.1 Real-Time Data Flow

```
Sensors/GPS/APIs
       |
       v
[Kafka Ingestion Topics]
       |
       +---> [Flink: Stream Enrichment] ---> [Kafka Enriched Topics]
       |                                            |
       |                                  +---------+---------+
       |                                  |                   |
       |                                  v                   v
       |                          [Redis Hot Cache]   [TimescaleDB]
       |                                  |
       |                                  v
       |                         [prediction-svc]
       |                                  |
       |                                  v
       |                         [Kafka Decision Topics]
       |                                  |
       |                          +-------+-------+
       |                          |               |
       |                          v               v
       |                   [routing-svc]   [notification-svc]
       |                          |               |
       |                          v               v
       |                   [WebSocket]      [Push/Webhook]
       |                          |
       v                          v
[Dashboard]  <-----------  [gateway-svc]
```

**Latency Budget (end-to-end):**

| Stage | Target | P99 |
|---|---|---|
| Ingestion (source to Kafka) | < 50ms | 80ms |
| Enrichment (Kafka to cache) | < 100ms | 150ms |
| Prediction (cache to model) | < 200ms | 350ms |
| Delivery (model to dashboard) | < 100ms | 150ms |
| **Total** | **< 450ms** | **< 730ms** |

### 4.2 Batch Data Flow

```
[TimescaleDB] + [S3 Data Lake]
          |
          v
  [Apache Spark Nightly Jobs]
          |
  +-------+-------+--------+
  |       |       |        |
  v       v       v        v
Model   Feature  Report  Data
Retrain Extract  Gen     Quality
  |       |       |        |
  v       v       v        v
MLflow  Feature  S3/PDF  Alert if
Registry Store           Drift
```

---

## 5. Infrastructure Architecture

### 5.1 Kubernetes Cluster Topology

```
+-----------------------------------------------------------------------+
|                        AWS EKS / GKE Cluster                          |
|                                                                       |
|  +---------------------+  +---------------------+                    |
|  | System Node Pool    |  | GPU Node Pool       |                    |
|  | (m6i.2xlarge x 6)   |  | (g5.2xlarge x 4)   |                    |
|  |                     |  |                     |                    |
|  | - API services      |  | - ML inference      |                    |
|  | - Ingestion         |  | - Simulation engine |                    |
|  | - Agent runtime     |  | - LLM serving       |                    |
|  +---------------------+  +---------------------+                    |
|                                                                       |
|  +---------------------+  +---------------------+                    |
|  | Data Node Pool      |  | Spot Node Pool      |                    |
|  | (r6i.4xlarge x 3)   |  | (m6i.xlarge x 0-20) |                    |
|  |                     |  |                     |                    |
|  | - TimescaleDB       |  | - Batch processing  |                    |
|  | - Redis Cluster     |  | - Model training    |                    |
|  | - Kafka brokers     |  | - Stress tests      |                    |
|  +---------------------+  +---------------------+                    |
|                                                                       |
|  +-------------------+  +-------------------+  +-------------------+ |
|  | Ingress (NGINX)   |  | Service Mesh      |  | Cert Manager      | |
|  | + Cloudflare CDN  |  | (Istio + Envoy)   |  | (Let's Encrypt)   | |
|  +-------------------+  +-------------------+  +-------------------+ |
+-----------------------------------------------------------------------+
```

### 5.2 Infrastructure as Code

```
Infrastructure/
  |-- terraform/
  |     |-- modules/
  |     |     |-- eks-cluster/
  |     |     |-- rds-timescale/
  |     |     |-- elasticache-redis/
  |     |     |-- msk-kafka/
  |     |     |-- s3-data-lake/
  |     |     |-- vpc-networking/
  |     |-- environments/
  |           |-- dev.tfvars
  |           |-- staging.tfvars
  |           |-- prod.tfvars
  |
  |-- helm/
  |     |-- safemove-platform/
  |           |-- charts/
  |           |     |-- ingestion/
  |           |     |-- prediction/
  |           |     |-- routing/
  |           |     |-- simulation/
  |           |-- values-dev.yaml
  |           |-- values-prod.yaml
  |
  |-- docker/
        |-- Dockerfile.api
        |-- Dockerfile.ml
        |-- Dockerfile.simulation
        |-- docker-compose.local.yaml
```

---

## 6. Security Architecture

```
+--------------------------------------------------------------------+
|                        SECURITY LAYERS                             |
|                                                                    |
|  EDGE            NETWORK           APPLICATION       DATA          |
|  +----------+    +----------+      +----------+     +----------+   |
|  |Cloudflare|    |VPC +     |      |OAuth 2.0 |     |AES-256   |   |
|  |WAF + DDoS|    |Security  |      |+ RBAC    |     |at rest   |   |
|  |protection|    |Groups    |      |          |     |          |   |
|  +----------+    +----------+      +----------+     +----------+   |
|  |Rate      |    |mTLS      |      |API Key   |     |TLS 1.3   |   |
|  |Limiting  |    |service-  |      |rotation  |     |in transit|   |
|  |          |    |to-service|      |          |     |          |   |
|  +----------+    +----------+      +----------+     +----------+   |
|  |GeoIP     |    |Network   |      |OPA Policy|     |HashiCorp |   |
|  |Filtering |    |Policies  |      |Engine    |     |Vault     |   |
|  +----------+    +----------+      +----------+     +----------+   |
+--------------------------------------------------------------------+
```

### Security Controls

| Layer | Control | Implementation |
|---|---|---|
| **Edge** | DDoS protection | Cloudflare Enterprise |
| **Edge** | WAF rules | OWASP Top 10 ruleset |
| **Network** | Micro-segmentation | Kubernetes NetworkPolicy + Calico |
| **Network** | Service-to-service auth | Istio mTLS (SPIFFE identities) |
| **Application** | Authentication | OAuth 2.0 / OpenID Connect (Keycloak) |
| **Application** | Authorization | OPA (Open Policy Agent) + RBAC |
| **Application** | API security | Rate limiting, JWT validation, input sanitization |
| **Data** | Encryption at rest | AES-256 (AWS KMS managed keys) |
| **Data** | Encryption in transit | TLS 1.3 enforced cluster-wide |
| **Data** | Secrets management | HashiCorp Vault with auto-rotation |
| **Compliance** | Audit logging | Immutable audit trail to S3 + CloudWatch |
| **Compliance** | PII handling | Data masking, anonymization pipeline |

### Authentication Flow

```
Client                    Gateway            Auth-Svc            Vault
  |                          |                   |                 |
  |--- POST /auth/token ---->|                   |                 |
  |                          |--- validate ----->|                 |
  |                          |                   |--- get key ---->|
  |                          |                   |<-- signing key--|
  |                          |<-- JWT (15min) ---|                 |
  |<-- 200 + JWT + refresh --|                   |                 |
  |                          |                   |                 |
  |--- GET /api/v1/traffic ->|                   |                 |
  |    (Bearer JWT)          |--- verify JWT --->|                 |
  |                          |<-- claims --------|                 |
  |                          |--- OPA check ---->|                 |
  |                          |<-- allow/deny ----|                 |
  |<-- 200 traffic data -----|                   |                 |
```

---

## 7. Scalability Design

### 7.1 Horizontal Scaling Strategy

```
                    Load Increase Detected
                            |
                            v
                  +-------------------+
                  | HPA (Horizontal   |
                  | Pod Autoscaler)   |
                  +-------------------+
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
        CPU > 70%    RPS > threshold   Queue depth
              |             |             |
              v             v             v
        Scale pods    Scale pods    Scale consumers
        (2 -> 8)     (3 -> 12)    (3 -> 15)
              |             |             |
              v             v             v
                  +-------------------+
                  | Cluster Autoscaler|
                  | (add nodes if     |
                  |  pods pending)    |
                  +-------------------+
```

**Auto-Scaling Rules:**

| Service | Metric | Scale-Up Threshold | Scale-Down Threshold | Min/Max Replicas |
|---|---|---|---|---|
| `ingestion-svc` | Kafka consumer lag | > 10K messages | < 1K messages | 3 / 10 |
| `prediction-svc` | Request latency P95 | > 250ms | < 100ms | 2 / 8 |
| `routing-svc` | CPU utilization | > 70% | < 30% | 3 / 12 |
| `gateway-svc` | Requests per second | > 5K RPS | < 1K RPS | 3 / 6 |
| `simulation-svc` | GPU utilization | > 80% | < 40% | 2 / 4 |

### 7.2 Data Sharding Strategy

```
+---------------------------------------------------------------------+
|                     TimescaleDB Sharding                            |
|                                                                     |
|  +-------------------+  +-------------------+  +-----------------+  |
|  | Hypertable:       |  | Hypertable:       |  | Hypertable:     |  |
|  | traffic_events    |  | gps_positions     |  | predictions     |  |
|  |                   |  |                   |  |                 |  |
|  | Partition by:     |  | Partition by:     |  | Partition by:   |  |
|  |  time (1 hour)    |  |  time (15 min)    |  |  time (1 day)   |  |
|  |  + region_id      |  |  + vehicle_id     |  |  + model_id     |  |
|  |                   |  |                   |  |                 |  |
|  | Retention: 90d    |  | Retention: 30d    |  | Retention: 1yr  |  |
|  | Compression: 7d+  |  | Compression: 3d+  |  | Compression: 7d+|  |
|  +-------------------+  +-------------------+  +-----------------+  |
+---------------------------------------------------------------------+

Kafka Partitioning:
  traffic-raw       --> 32 partitions (by sensor_id hash)
  traffic-enriched  --> 16 partitions (by region_id hash)
  predictions       --> 8  partitions (by model_type)
  decisions         --> 16 partitions (by zone_id)
```

### 7.3 Caching Architecture

```
                  +------------------------------+
                  |     Redis Cluster (6 nodes)  |
                  |                              |
                  |  +--------+  +--------+      |
                  |  |Primary |  |Primary |      |
                  |  |  Shard |  |  Shard | ...  |
                  |  |   1    |  |   2    |      |
                  |  +---+----+  +---+----+      |
                  |      |           |           |
                  |  +---+----+  +---+----+      |
                  |  |Replica |  |Replica |      |
                  |  |  1a    |  |  2a    |      |
                  |  +--------+  +--------+      |
                  +------------------------------+

Cache Strategy:
  L1: In-process LRU cache   (10ms, 1K entries)
  L2: Redis hot cache         (1-5ms, 100K entries, TTL 30s)
  L3: Redis warm cache        (1-5ms, 1M entries, TTL 5min)
  L4: TimescaleDB             (10-50ms, unlimited)
```

---

## 8. Communication Patterns

### 8.1 Event-Driven Architecture

```
+----------+      +----------+      +----------+      +----------+
| Producer |      | Kafka    |      | Consumer |      | Side     |
| Services |----->| Topics   |----->| Groups   |----->| Effects  |
+----------+      +----------+      +----------+      +----------+

Event Types:
  TrafficEventIngested    --> enrichment-svc, analytics-svc
  TrafficEventEnriched    --> prediction-svc, simulation-svc
  PredictionGenerated     --> routing-svc, notification-svc
  AnomalyDetected         --> agent-svc, notification-svc
  RouteOptimized          --> gateway-svc (push via WebSocket)
  SimulationCompleted     --> analytics-svc, llm-svc
```

### 8.2 Communication Matrix

| Pattern | Use Case | Technology | Latency |
|---|---|---|---|
| **Async Events** | Data pipeline, decoupled processing | Kafka | 10-100ms |
| **Sync RPC** | Service-to-service queries | gRPC (Protobuf) | 1-10ms |
| **Pub/Sub** | Real-time alerts, notifications | Redis Pub/Sub | < 5ms |
| **WebSocket** | Dashboard live updates | FastAPI WebSocket | < 50ms |
| **Request/Reply** | API client calls | REST (HTTP/2) | 10-200ms |
| **Broadcast** | Config changes, cache invalidation | Kafka compact topic | < 500ms |

### 8.3 Event Schema (Example)

```json
{
  "event_id": "evt_a1b2c3d4",
  "event_type": "TrafficEventEnriched",
  "version": "1.2.0",
  "timestamp": "2026-03-21T14:30:00.123Z",
  "source": "enrichment-svc",
  "correlation_id": "corr_x9y8z7",
  "payload": {
    "sensor_id": "sensor_downtown_045",
    "region_id": "region_metro_central",
    "flow_rate": 1247,
    "avg_speed_kmh": 34.2,
    "occupancy_pct": 72.1,
    "congestion_level": "MODERATE",
    "geo": {
      "lat": 37.7749,
      "lng": -122.4194
    }
  },
  "metadata": {
    "enrichments": ["geofence", "historical_baseline", "weather"],
    "processing_time_ms": 42
  }
}
```

---

## 9. Observability Stack

```
+-------------------------------------------------------------------+
|                      OBSERVABILITY                                |
|                                                                   |
|  +----------------+  +----------------+  +---------------------+  |
|  | METRICS        |  | LOGGING        |  | TRACING             |  |
|  |                |  |                |  |                     |  |
|  | Prometheus     |  | Fluentd        |  | Jaeger              |  |
|  | + Thanos       |  | + Elasticsearch|  | + OpenTelemetry     |  |
|  | + Grafana      |  | + Kibana       |  |                     |  |
|  +----------------+  +----------------+  +---------------------+  |
|                                                                   |
|  +----------------+  +----------------+  +---------------------+  |
|  | ALERTING       |  | PROFILING      |  | SLO MONITORING      |  |
|  |                |  |                |  |                     |  |
|  | PagerDuty      |  | Pyroscope      |  | 99.9% uptime        |  |
|  | + Slack        |  | (continuous)   |  | < 500ms P99 latency |  |
|  | + OpsGenie     |  |                |  | < 0.1% error rate   |  |
|  +----------------+  +----------------+  +---------------------+  |
+-------------------------------------------------------------------+
```

### Key SLOs

| Service | Availability | Latency (P99) | Error Rate |
|---|---|---|---|
| API Gateway | 99.95% | < 200ms | < 0.05% |
| Prediction Pipeline | 99.9% | < 500ms | < 0.1% |
| Real-Time Dashboard | 99.9% | < 1s (refresh) | < 0.1% |
| Data Ingestion | 99.99% | < 100ms | < 0.01% |

---

## 10. Disaster Recovery

```
                  PRIMARY (us-east-1)           DR (us-west-2)
                  +------------------+          +------------------+
                  | EKS Cluster      |          | EKS Cluster      |
                  | (active)         |   async  | (warm standby)   |
                  |                  |--------->|                  |
                  | TimescaleDB      |  replic  | TimescaleDB      |
                  | Redis            |  ation   | Redis            |
                  | Kafka            |          | Kafka (MirrorMkr)|
                  +------------------+          +------------------+

RPO: < 5 minutes    |    RTO: < 15 minutes    |    Failover: Automated
```

**DR Strategy:**
- **Active-Passive** with warm standby in secondary region
- Kafka MirrorMaker 2 for cross-region event replication
- TimescaleDB streaming replication with 5-minute lag
- Automated failover via Route 53 health checks
- Weekly DR drills with chaos engineering (LitmusChaos)

---

## Summary

SafeMove AI's architecture is designed for three non-negotiable requirements: **real-time performance** (sub-second end-to-end), **horizontal scalability** (10x traffic with zero downtime), and **operational resilience** (99.95%+ availability). Every component is stateless where possible, event-driven by default, and observable from edge to storage.
