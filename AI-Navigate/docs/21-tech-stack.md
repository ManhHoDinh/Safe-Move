# Technical Stack

> SafeMove AI's technology choices are driven by three non-negotiable requirements: **sub-second latency** for real-time traffic decisions, **horizontal scalability** to serve city-scale deployments, and **ML-native architecture** that treats models as first-class citizens alongside application code.

---

## Stack Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                │
│  Vite.js + React + TypeScript + TailwindCSS + Mapbox GL + D3.js    │
├─────────────────────────────────────────────────────────────────────┤
│                        API GATEWAY                                  │
│         FastAPI  ·  WebSocket  ·  gRPC  ·  GraphQL                 │
├─────────────────────────────────────────────────────────────────────┤
│                    APPLICATION LAYER                                 │
│   FastAPI Services  ·  Celery Workers  ·  LangChain Agents         │
├──────────────┬──────────────┬───────────────┬───────────────────────┤
│   AI / ML    │   Streaming  │   Data Store  │    Geo / Maps         │
│  PyTorch     │  Kafka       │  PostgreSQL   │  Mapbox               │
│  TensorFlow  │  Redis Pub/  │  TimescaleDB  │  OpenStreetMap        │
│  scikit      │   Sub        │  Redis        │  OSRM                 │
│  LangChain   │  MQTT        │  MinIO (S3)   │  PostGIS              │
│  ONNX        │              │  Spark        │  Turf.js              │
├──────────────┴──────────────┴───────────────┴───────────────────────┤
│                     INFRASTRUCTURE                                   │
│   Docker · Kubernetes · Terraform · GitHub Actions · ArgoCD         │
├─────────────────────────────────────────────────────────────────────┤
│                      OBSERVABILITY                                   │
│   Prometheus · Grafana · Sentry · OpenTelemetry · Loki              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Detailed Stack by Layer

### Frontend

| Technology | Version | Purpose | Why We Chose It |
|---|---|---|---|
| **Vite.js** | 5.x | Build tool & dev server | Sub-second HMR and optimized production builds make iteration fast across a 200+ component codebase. |
| **React** | 18.x | UI framework | Component model, concurrent rendering, and the largest ecosystem of mapping/charting libraries available. |
| **TypeScript** | 5.x | Type-safe JavaScript | Catches integration bugs at compile time — critical when frontend consumes 20+ real-time API endpoints. |
| **TailwindCSS** | 3.x | Utility-first CSS | Enables consistent, responsive design without CSS bloat; pairs well with component-driven architecture. |
| **Mapbox GL JS** | 3.x | Interactive maps | GPU-accelerated vector tile rendering handles 100K+ simultaneous traffic segments at 60 fps. |
| **D3.js** | 7.x | Custom data visualizations | Provides low-level control for bespoke traffic flow diagrams and network topology visualizations that charting libraries cannot produce. |
| **Recharts** | 2.x | Standard charts & dashboards | Declarative React chart components for KPI dashboards, trend lines, and comparison views. |
| **Framer Motion** | 11.x | Animation library | Smooth, physics-based transitions for map overlays, panel reveals, and data loading states. |
| **Zustand** | 4.x | State management | Lightweight, boilerplate-free global state — ideal for sharing real-time traffic data across dozens of components. |
| **React Query (TanStack)** | 5.x | Server state management | Automatic caching, background refetching, and optimistic updates for API-driven data. |

### Backend

| Technology | Version | Purpose | Why We Chose It |
|---|---|---|---|
| **Python** | 3.11+ | Primary language | Dominant language in the ML ecosystem; async support and type hints make it production-grade. |
| **FastAPI** | 0.110+ | Web framework | Native async, automatic OpenAPI docs, Pydantic validation — the fastest Python framework for API-heavy workloads. |
| **Celery** | 5.x | Task queue | Battle-tested distributed task execution for simulation runs, batch predictions, and report generation. |
| **SQLAlchemy** | 2.x | ORM / database toolkit | Mature async support, flexible query builder, and seamless integration with PostgreSQL-specific features. |
| **Pydantic** | 2.x | Data validation | Rust-powered validation at the API boundary ensures malformed requests never reach business logic. |
| **Uvicorn** | 0.29+ | ASGI server | High-performance async server that handles thousands of concurrent WebSocket connections per pod. |
| **gRPC / Protobuf** | 1.60+ | Inter-service communication | 10x lower latency than REST for internal service-to-service calls (prediction service, signal controller). |

### AI / ML

| Technology | Version | Purpose | Why We Chose It |
|---|---|---|---|
| **PyTorch** | 2.x | Deep learning framework | Dynamic computation graphs enable rapid experimentation; dominant in research, so new architectures arrive here first. |
| **TensorFlow** | 2.16+ | Production inference | TF Serving provides battle-tested, GPU-optimized model serving with batching and model versioning out of the box. |
| **scikit-learn** | 1.4+ | Classical ML | Feature engineering pipelines, ensemble methods, and baseline models where deep learning is overkill. |
| **LangChain** | 0.2+ | LLM orchestration | Chains, agents, and retrieval-augmented generation for the natural-language query and report interfaces. |
| **Hugging Face Transformers** | 4.x | Pre-trained models | Access to thousands of fine-tunable models for NER (incident extraction), text classification, and embeddings. |
| **ONNX Runtime** | 1.17+ | Optimized inference | Converts PyTorch/TF models to a single optimized format; 2-5x speedup on CPU inference at the edge. |
| **Ray** | 2.x | Distributed computing | Scales hyperparameter tuning and distributed training across GPU clusters without rewriting training loops. |
| **MLflow** | 2.x | Experiment tracking | Tracks every training run, metric, and artifact — essential for reproducibility and model governance. |

### Data

| Technology | Version | Purpose | Why We Chose It |
|---|---|---|---|
| **PostgreSQL** | 16 | Primary relational database | ACID compliance, mature ecosystem, and PostGIS extension make it the foundation for spatial + relational data. |
| **TimescaleDB** | 2.x | Time-series extension | Automatic partitioning of time-series traffic data delivers 10-100x query speedup over vanilla PostgreSQL for temporal queries. |
| **Redis** | 7.x | Cache & real-time state | Sub-millisecond reads for traffic state, session tokens, rate limits, and pub/sub for WebSocket fan-out. |
| **Apache Kafka** | 3.x | Event streaming | Durable, ordered event log handles 500K+ sensor events/second with exactly-once semantics for critical traffic data. |
| **Apache Spark** | 3.5+ | Batch analytics | Processes terabytes of historical traffic data for model training, trend analysis, and city-wide reporting. |
| **MinIO** | Latest | Object storage (S3-compatible) | Self-hosted S3 API for model artifacts, simulation results, and geospatial tile caches without cloud vendor lock-in. |
| **Alembic** | 1.13+ | Database migrations | Version-controlled schema changes tightly integrated with SQLAlchemy models. |

### Infrastructure

| Technology | Version | Purpose | Why We Chose It |
|---|---|---|---|
| **Docker** | 25+ | Containerization | Reproducible builds across dev, staging, and production; basis for Kubernetes deployments. |
| **Kubernetes** | 1.29+ | Container orchestration | Auto-scaling, self-healing, and declarative infrastructure for a microservices architecture spanning 12+ services. |
| **Terraform** | 1.7+ | Infrastructure as code | Cloud-agnostic provisioning of managed databases, networking, and Kubernetes clusters across AWS/GCP/Azure. |
| **GitHub Actions** | - | CI/CD pipeline | Native integration with our GitHub monorepo; matrix builds test across Python versions and run ML validation. |
| **ArgoCD** | 2.x | GitOps deployment | Syncs Kubernetes manifests from Git — every deployment is auditable, reversible, and declarative. |
| **Helm** | 3.x | Kubernetes packaging | Templatized deployments for each microservice with environment-specific value overrides. |

### Monitoring & Observability

| Technology | Version | Purpose | Why We Chose It |
|---|---|---|---|
| **Prometheus** | 2.x | Metrics collection | Pull-based metrics with powerful PromQL for alerting on traffic processing latency and throughput. |
| **Grafana** | 10.x | Dashboards & visualization | Unified dashboards combining infrastructure metrics, ML model performance, and business KPIs in one pane. |
| **Sentry** | Latest | Error tracking | Real-time error aggregation with stack traces, breadcrumbs, and release tracking for rapid incident response. |
| **OpenTelemetry** | 1.x | Distributed tracing | Vendor-neutral tracing across FastAPI, Celery, Kafka, and ML inference — shows end-to-end request flow. |
| **Loki** | 2.x | Log aggregation | Lightweight, label-based log indexing that pairs natively with Grafana without the overhead of Elasticsearch. |

### Maps & Geospatial

| Technology | Version | Purpose | Why We Chose It |
|---|---|---|---|
| **Mapbox** | - | Map tiles & geocoding | Best-in-class vector tiles, custom styling, and global coverage for the primary map interface. |
| **OpenStreetMap** | - | Open map data | Community-maintained road network data provides a free, detailed base layer for routing algorithms. |
| **OSRM** | 5.x | Routing engine | Open-source, self-hosted routing engine processes 10K+ route requests/second with real-time traffic integration. |
| **Turf.js** | 7.x | Client-side geospatial analysis | Performs buffer zones, intersections, and distance calculations in the browser without server round-trips. |
| **PostGIS** | 3.x | Spatial database extension | SQL-native geospatial queries (nearest neighbor, polygon containment) on millions of road segments. |
| **H3** | 4.x | Hexagonal spatial indexing | Uber's hierarchical grid system enables consistent spatial aggregation for congestion heatmaps. |

### Communication Protocols

| Technology | Purpose | Why We Chose It |
|---|---|---|
| **WebSocket** | Real-time browser updates | Bidirectional, persistent connections for live traffic map updates and simulation progress. |
| **gRPC** | Internal service-to-service | Binary protocol with code generation; 10x lower latency and 5x smaller payloads than REST for high-frequency internal calls. |
| **MQTT** | IoT sensor ingestion | Lightweight pub/sub protocol designed for constrained IoT devices (traffic sensors, cameras, signal controllers). |
| **Server-Sent Events (SSE)** | One-way streaming to clients | Simpler than WebSocket for scenarios that only need server-to-client push (alert feeds, build status). |

---

## Architecture Decision Records

### ADR-001: FastAPI over Django REST Framework

**Date:** 2025-10-15
**Status:** Accepted

**Context:** We needed a Python web framework capable of handling 10K+ concurrent WebSocket connections per node, native async database queries, and automatic API documentation generation.

**Decision:** Chose FastAPI over Django REST Framework.

**Rationale:**
- FastAPI's native async/await support delivers 3-5x higher throughput under concurrent load compared to DRF's synchronous request handling.
- Automatic OpenAPI 3.1 schema generation from Pydantic models eliminates spec drift — the spec is always in sync with the code.
- Dependency injection system is simpler and more composable than Django's middleware stack for our auth, rate-limiting, and telemetry concerns.
- DRF's ORM-centric design (Django ORM) adds overhead we don't need since we already chose SQLAlchemy for its async support and raw SQL escape hatches.

**Trade-offs:**
- Smaller ecosystem than Django (no built-in admin panel, fewer batteries). Mitigated by using SQLAlchemy Admin and purpose-built tooling.
- Team had to ramp up on async Python patterns. Invested in internal training sessions.

---

### ADR-002: TimescaleDB over InfluxDB for Time-Series Data

**Date:** 2025-11-02
**Status:** Accepted

**Context:** Traffic sensor data arrives at 500K+ events/second and must be queryable at multiple time granularities (1-minute, 5-minute, hourly, daily) with sub-second response times for dashboard queries.

**Decision:** Chose TimescaleDB (PostgreSQL extension) over InfluxDB.

**Rationale:**
- TimescaleDB runs as a PostgreSQL extension, meaning we use one database engine for relational data AND time-series data. This eliminates an entire operational dependency and simplifies joins between traffic readings and road segment metadata.
- Continuous aggregation (materialized views that auto-refresh) provides pre-computed rollups at 5m/15m/1h granularities without application-level ETL.
- Full SQL compatibility means our team's existing PostgreSQL expertise transfers directly. InfluxQL/Flux is a learning curve with a smaller talent pool.
- PostGIS + TimescaleDB in the same database enables spatio-temporal queries (e.g., "average speed within 2km of intersection X over the last hour") in a single query.

**Trade-offs:**
- InfluxDB has slightly better write throughput at extreme scale (1M+ writes/sec). Mitigated by buffering through Kafka and batch-inserting.
- TimescaleDB licensing changed in 2023; we use the Apache 2.0-licensed core features.

---

### ADR-003: PyTorch for Research, ONNX Runtime for Production Inference

**Date:** 2025-11-20
**Status:** Accepted

**Context:** Our ML team needs rapid experimentation capabilities for new traffic prediction architectures, but production inference must be optimized for low latency on both GPU and CPU targets.

**Decision:** Use PyTorch for training and research; export models to ONNX format and serve via ONNX Runtime in production.

**Rationale:**
- PyTorch's eager execution and dynamic graphs let researchers iterate on model architectures in hours rather than days. It dominates in published research, meaning new techniques (graph neural networks for road topology, transformers for sequence prediction) are available as PyTorch code first.
- ONNX Runtime provides hardware-agnostic optimization (CPU, GPU, TensorRT, OpenVINO) from a single exported model, delivering 2-5x inference speedup over native PyTorch on the same hardware.
- Decouples the research workflow from the production serving stack: researchers ship `.onnx` files, infrastructure engineers deploy them without touching Python training code.
- TensorFlow Serving remains available for legacy models that were originally trained in TF.

**Trade-offs:**
- Not all PyTorch operations export cleanly to ONNX. Mitigated by maintaining an "ONNX-exportable" model interface and testing export in CI.
- Two-step workflow (train in PyTorch, serve in ONNX) adds process overhead. MLflow pipeline automates the export-validate-register cycle.

---

### ADR-004: Kafka over RabbitMQ for Event Streaming

**Date:** 2025-12-05
**Status:** Accepted

**Context:** Traffic sensor data, agent decisions, and simulation events must be streamed to multiple consumers (real-time dashboard, ML training pipeline, analytics warehouse, alert engine) with ordering guarantees and the ability to replay historical events.

**Decision:** Chose Apache Kafka over RabbitMQ.

**Rationale:**
- Kafka's persistent, append-only log allows any consumer to replay events from any point in time — essential for ML training pipelines that re-process historical sensor data when models are retrained.
- Partition-based parallelism scales linearly: adding partitions and consumers increases throughput without architectural changes. We currently run 64 partitions on the `traffic.sensor.raw` topic handling 500K events/second.
- Exactly-once semantics (Kafka Transactions) guarantee that traffic signal commands are never duplicated — a safety-critical requirement.
- RabbitMQ's message-queue model (consume-and-delete) would require a separate data lake for event replay, adding architectural complexity.

**Trade-offs:**
- Kafka has higher operational complexity (ZooKeeper/KRaft, partition rebalancing, consumer group management). Mitigated by using Strimzi Kafka Operator on Kubernetes.
- Higher minimum resource footprint than RabbitMQ. Acceptable given our data volumes.

---

## Version Compatibility Matrix

```
┌─────────────────────┬────────────────┬──────────────────┐
│ Component           │ Min Version    │ Tested Up To     │
├─────────────────────┼────────────────┼──────────────────┤
│ Python              │ 3.11           │ 3.12             │
│ Node.js             │ 20 LTS         │ 22 LTS           │
│ PostgreSQL          │ 15             │ 16               │
│ Redis               │ 7.0            │ 7.2              │
│ Kafka               │ 3.5            │ 3.7              │
│ Kubernetes          │ 1.28           │ 1.29             │
│ Docker              │ 24             │ 25               │
│ CUDA (GPU nodes)    │ 12.1           │ 12.3             │
└─────────────────────┴────────────────┴──────────────────┘
```

---

## Development Environment Setup

```bash
# Clone and bootstrap
git clone https://github.com/safemove-ai/safemove.git
cd safemove

# Start all dependencies (PostgreSQL, Redis, Kafka, MinIO)
docker compose up -d

# Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
alembic upgrade head
uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend
npm install
npm run dev   # Vite dev server on :5173

# ML pipeline
cd ml
pip install -e ".[train]"
python train.py --config configs/traffic_prediction.yaml
```

---

## Dependency Governance

| Practice | Tool | Frequency |
|---|---|---|
| Vulnerability scanning | Dependabot + Snyk | Every PR + daily scan |
| License compliance | FOSSA | Every PR |
| Python lock file | `pip-tools` (`requirements.in` -> `requirements.txt`) | Every dependency change |
| Node lock file | `package-lock.json` (npm) | Every dependency change |
| Container scanning | Trivy | Every Docker build |
| SBOM generation | Syft | Every release |
