# SafeMove AI — AWS Deployment Architecture

> Production deployment on Amazon Web Services.
> Cloud-native, auto-scaling, multi-region ready.

---

## 1. Deployment Overview

SafeMove AI is hosted entirely on AWS, leveraging managed services to minimize operational overhead and maximize scalability.

```
                         INTERNET
                            │
                    ┌───────▼────────┐
                    │   CloudFront   │  Global CDN
                    │   (Edge Cache) │  Static assets + API acceleration
                    └───────┬────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
      ┌───────▼──────┐ ┌───▼────┐ ┌──────▼───────┐
      │  S3 + Amplify │ │  ALB   │ │ API Gateway  │
      │  (Frontend)   │ │        │ │ (WebSocket)  │
      └──────────────┘ └───┬────┘ └──────┬───────┘
                           │             │
                    ┌──────▼─────────────▼──────┐
                    │     ECS Fargate Cluster     │
                    │  ┌────────┐ ┌────────────┐ │
                    │  │ API    │ │ Detection  │ │
                    │  │ Service│ │ Service    │ │
                    │  └────────┘ └────────────┘ │
                    │  ┌────────┐ ┌────────────┐ │
                    │  │ Routing│ │ Agent      │ │
                    │  │ Service│ │ Service    │ │
                    │  └────────┘ └────────────┘ │
                    │  ┌────────┐ ┌────────────┐ │
                    │  │Predict │ │ Report     │ │
                    │  │Service │ │ Service    │ │
                    │  └────────┘ └────────────┘ │
                    └──────────┬─────────────────┘
                               │
        ┌──────────┬───────────┼───────────┬──────────┐
        │          │           │           │          │
   ┌────▼───┐ ┌───▼────┐ ┌───▼────┐ ┌───▼───┐ ┌───▼────┐
   │  MSK   │ │ Sage-  │ │ Elasti-│ │  RDS  │ │   S3   │
   │(Kafka) │ │ Maker  │ │ Cache  │ │(Pg/TS)│ │(Archive)│
   └────────┘ └────────┘ └────────┘ └───────┘ └────────┘
```

---

## 2. AWS Service Mapping

### 2.1 Frontend & CDN

| Component | AWS Service | Purpose |
|-----------|-------------|---------|
| Static Frontend | **S3 + CloudFront** | Vite/React build deployed to S3, served via CloudFront CDN globally |
| CI/CD | **AWS Amplify** | Auto-deploy from GitHub on push to main |
| SSL/TLS | **ACM (Certificate Manager)** | Free TLS certificates, auto-renewal |
| DNS | **Route 53** | Custom domain management |

**Why CloudFront + S3:**
- Sub-100ms global latency for static assets
- No server to manage
- Pay only for bandwidth ($0.085/GB)
- Auto-scales to any traffic level

### 2.2 API Layer

| Component | AWS Service | Purpose |
|-----------|-------------|---------|
| REST API | **Application Load Balancer (ALB)** | Route traffic to ECS services |
| WebSocket | **API Gateway (WebSocket)** | Real-time flood alerts, live dashboard updates |
| Authentication | **Cognito** | OAuth 2.0 / JWT, user pools, API key management |
| Rate Limiting | **WAF (Web Application Firewall)** | DDoS protection, rate limiting, IP blocking |

### 2.3 Application Services

| Component | AWS Service | Purpose |
|-----------|-------------|---------|
| Microservices | **ECS Fargate** | Serverless containers — no EC2 management |
| ML Inference | **SageMaker Endpoints** | GPU-accelerated model serving (flood detection, prediction) |
| LLM Calls | **Lambda + Bedrock** | Serverless LLM invocation (Claude via Bedrock) or external API |
| Background Jobs | **Lambda + SQS** | Async tasks: report generation, news crawling |
| Orchestration | **Step Functions** | Multi-step workflows: detect → assess → route → alert |

**Why ECS Fargate over EKS:**
- No cluster management overhead
- Auto-scales per service independently
- Lower operational complexity for a startup
- Trade-off: less flexibility than Kubernetes, but faster time-to-production

### 2.4 Data Processing

| Component | AWS Service | Purpose |
|-----------|-------------|---------|
| Event Streaming | **Amazon MSK (Managed Kafka)** | 100K+ events/sec, event replay, multi-consumer |
| Real-time Processing | **Amazon Kinesis Data Analytics** | Flink-compatible stream processing |
| Batch Processing | **Amazon EMR (Spark)** | Historical analysis, model retraining |
| ETL Orchestration | **Step Functions + EventBridge** | Schedule and coordinate data pipelines |

**Why MSK (Kafka) over Kinesis:**
- Kafka's log-based storage enables event replay — critical when deploying new prediction models
- Kafka ecosystem (Schema Registry, Connect) for data integration
- Trade-off: higher cost than Kinesis ($0.10/hr per broker), but replay capability is worth it

### 2.5 Storage

| Component | AWS Service | Tier | Purpose |
|-----------|-------------|------|---------|
| Hot Cache | **ElastiCache (Redis)** | Real-time | Active flood points, route cache, session state |
| Warm DB | **RDS PostgreSQL + TimescaleDB** | Minutes-days | Flood events, predictions, route history |
| Geospatial | **RDS + PostGIS extension** | Queries | Spatial joins (event → road segment mapping) |
| Cold Archive | **S3 + Parquet** | Historical | Raw camera frames, news archives, model training data |
| ML Models | **S3 + SageMaker Model Registry** | Versioned | Model artifacts, A/B test configurations |

**Storage tier strategy:**
```
0-5 min   → Redis (ElastiCache)     ~$150/month
5 min-90d → TimescaleDB (RDS)       ~$300/month
90d+      → S3 Parquet (compressed) ~$23/TB/month
```

### 2.6 AI/ML Infrastructure

| Component | AWS Service | Purpose |
|-----------|-------------|---------|
| CV Model Serving | **SageMaker Endpoints** | YOLOv8 flood detection, GPU inference |
| LLM (Severity) | **Bedrock (Claude)** | Flood severity assessment via managed LLM |
| LLM (Fallback) | **Lambda + API calls** | External LLM API when Bedrock unavailable |
| Model Training | **SageMaker Training Jobs** | Periodic retraining with new labeled data |
| Feature Store | **SageMaker Feature Store** | Shared features across prediction models |
| Experiment Tracking | **SageMaker Experiments** | Track model versions, A/B test results |

**Why Bedrock over self-hosted LLM:**
- Zero GPU management for LLM inference
- Pay-per-token ($0.003-0.015 per 1K tokens)
- Automatic scaling, no cold starts with provisioned throughput
- Trade-off: vendor lock-in, but Claude/GPT quality >>> self-hosted 8B models for severity assessment

### 2.7 Observability

| Component | AWS Service | Purpose |
|-----------|-------------|---------|
| Metrics | **CloudWatch Metrics** | System + custom application metrics |
| Logs | **CloudWatch Logs** | Centralized log aggregation |
| Tracing | **X-Ray** | Distributed tracing across microservices |
| Alerts | **CloudWatch Alarms + SNS** | PagerDuty integration for on-call |
| Dashboards | **CloudWatch Dashboards** | Operational monitoring |

### 2.8 Security

| Component | AWS Service | Purpose |
|-----------|-------------|---------|
| Authentication | **Cognito** | User pools, MFA, OAuth 2.0 |
| API Keys | **API Gateway Usage Plans** | Rate-limited keys for B2B partners |
| Secrets | **Secrets Manager** | API keys, DB credentials, LLM tokens |
| Encryption | **KMS** | At-rest encryption for all storage |
| Network | **VPC + Security Groups** | Private subnets for DB/processing, public for API |
| WAF | **AWS WAF** | OWASP top-10 protection, rate limiting |

---

## 3. Deployment Pipeline

```
GitHub Push (main)
      │
      ▼
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Amplify    │    │  CodePipeline │    │  CodeBuild  │
│  (Frontend) │    │  (Backend)    │    │  (Docker)   │
│  Auto-build │    │  Triggered    │    │  Build +    │
│  + deploy   │    │  by push      │    │  push to ECR│
└─────────────┘    └──────┬───────┘    └──────┬──────┘
                          │                   │
                   ┌──────▼───────────────────▼──────┐
                   │        ECS Fargate                │
                   │   Rolling deployment (blue/green) │
                   │   Zero-downtime updates           │
                   └──────────────────────────────────┘
```

- **Frontend:** Amplify auto-builds on GitHub push → deploys to S3 → invalidates CloudFront cache
- **Backend:** CodePipeline triggers CodeBuild → builds Docker images → pushes to ECR → ECS rolling deploy
- **ML Models:** SageMaker Pipelines → train → evaluate → deploy to endpoint (canary rollout)

---

## 4. Cost Estimation (Monthly)

### Phase 1: Pilot (1 city, MVP)

| Service | Estimated Cost |
|---------|---------------|
| ECS Fargate (6 services) | $200-400 |
| RDS PostgreSQL (db.t3.medium) | $100 |
| ElastiCache Redis (cache.t3.small) | $50 |
| MSK Kafka (2 brokers, kafka.t3.small) | $150 |
| SageMaker Endpoints (1 GPU) | $300 |
| Bedrock (LLM calls, ~10K/day) | $100-300 |
| S3 + CloudFront | $30 |
| CloudWatch + Monitoring | $50 |
| API Gateway (WebSocket) | $30 |
| **Total** | **$1,000 - $1,400/month** |

### Phase 2: Scale (3-5 cities)

| Service | Estimated Cost |
|---------|---------------|
| ECS Fargate (scaled) | $800-1,200 |
| RDS PostgreSQL (db.r5.large) | $400 |
| ElastiCache Redis (cluster) | $200 |
| MSK Kafka (3 brokers) | $400 |
| SageMaker Endpoints (2 GPUs) | $600 |
| Bedrock (50K calls/day) | $500-1,000 |
| EMR Spark (batch, spot instances) | $200 |
| S3 + CloudFront (multi-region) | $100 |
| **Total** | **$3,200 - $4,100/month** |

### Phase 3: City-Scale (10+ cities)

| Service | Estimated Cost |
|---------|---------------|
| ECS Fargate (auto-scaled) | $3,000-5,000 |
| RDS PostgreSQL (multi-AZ, r5.xlarge) | $1,200 |
| ElastiCache (cluster, multi-AZ) | $600 |
| MSK Kafka (6 brokers) | $1,200 |
| SageMaker (4 GPU endpoints) | $2,400 |
| Bedrock (200K calls/day) | $2,000-4,000 |
| EMR Spark + Kinesis | $800 |
| S3 + CloudFront (global) | $300 |
| **Total** | **$11,500 - $15,500/month** |

---

## 5. Multi-Region Strategy

```
Phase 1: ap-southeast-1 (Singapore)
         └─ Covers: Vietnam, Thailand, Indonesia, Philippines

Phase 2: ap-south-1 (Mumbai)
         └─ Covers: India, Bangladesh, Sri Lanka

Phase 3: us-east-1 (Virginia)
         └─ Covers: US Gulf Coast, East Coast

Phase 4: eu-west-1 (Ireland)
         └─ Covers: Europe, Middle East, Africa
```

- CloudFront provides global edge for frontend from day 1
- Backend services deploy per-region when latency requirements demand it
- RDS read replicas across regions for analytics
- S3 cross-region replication for disaster recovery

---

## 6. Key AWS Architecture Decisions

### Decision 1: ECS Fargate over EKS

**Chosen:** ECS Fargate (serverless containers)
**Alternative:** EKS (managed Kubernetes)
**Trade-off:** Less flexibility, but zero cluster management. For a startup team of 6-8, ECS operational overhead is 70% lower than EKS.
**Revisit when:** Team exceeds 20 engineers or need multi-cloud portability.

### Decision 2: Bedrock over Self-Hosted LLM

**Chosen:** Amazon Bedrock (Claude) for LLM severity assessment
**Alternative:** Self-hosted Llama 3 on SageMaker GPU instances
**Trade-off:** Higher per-call cost ($0.01 vs ~$0.002), but zero GPU management and 3x better reasoning quality for flood severity.
**Revisit when:** Monthly LLM cost exceeds $5K and custom fine-tuned model achieves comparable accuracy.

### Decision 3: MSK (Kafka) over Kinesis

**Chosen:** Amazon MSK (Managed Kafka)
**Alternative:** Kinesis Data Streams
**Trade-off:** Higher base cost (~$300/month minimum), but event replay is critical for reprocessing when deploying new prediction models.
**Revisit when:** Never. Event replay is a core architectural requirement.

### Decision 4: Amplify for Frontend

**Chosen:** AWS Amplify for frontend CI/CD + hosting
**Alternative:** Manual S3 + CodePipeline
**Trade-off:** Less customization, but 5-minute setup, auto-preview deployments for PRs, built-in monitoring.
**Revisit when:** Need advanced build pipeline (monorepo, custom caching).

---

## 7. Security & Compliance

- **VPC:** All backend services in private subnets. Only ALB and API Gateway public-facing.
- **Encryption:** KMS-managed keys. All data encrypted at rest (RDS, S3, ElastiCache, MSK).
- **Transit:** TLS 1.3 everywhere. Internal service mesh uses mTLS via App Mesh.
- **Secrets:** Secrets Manager with automatic rotation.
- **IAM:** Least-privilege policies. Service-specific task roles.
- **Audit:** CloudTrail for API audit log. Config for compliance drift detection.
- **SOC 2:** Roadmap via AWS Audit Manager. All infrastructure-as-code via Terraform.
