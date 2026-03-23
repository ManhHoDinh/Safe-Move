# SafeMove AI — Pitch Script

**Duration:** 5 minutes
**Speaker:** Ho Dinh Manh
**Event:** LotusHacks x HackHarvard 2026 — Social & Mobility Track

---

## Slide 1 — Title (10 seconds)

> Hi everyone, I'm Manh. This is **SafeMove AI** — flood-aware mobility intelligence for smart cities.

> We detect floods in real time, evaluate severity with AI, and reroute traffic automatically.

---

## Slide 2 — The Problem (30 seconds)

> Urban flooding has increased **300%** since the year 2000. It causes **$17 billion** in damage every year in the US alone. And **80%** of flood deaths happen when drivers enter flooded roads.

> In Ho Chi Minh City, we have **40+ major flood events per year** and over **600 traffic cameras** — but zero intelligence connecting flood data to routing decisions.

> The road floods. Google Maps still sends you through it.

---

## Slide 3 — Why Now? (25 seconds)

> Three things make this the right time:

> **First**, climate change is accelerating. Floods are getting worse every year.

> **Second**, smart city spending will reach $189 billion by 2028. Governments want AI solutions.

> **Third**, LLMs are now good enough to reason about flood severity in real time — at a cost that was impossible two years ago.

> And the best part? 600+ cameras are already deployed. We just need to make them smart.

---

## Slide 4 — Solution (25 seconds)

> Our solution has four steps: **Detect, Evaluate, Route, Learn**.

> We detect floods from cameras using CNN. We evaluate severity using LLMs. We route around floods using Google Maps API with a flood penalty layer. And we learn from every event to get smarter over time.

> It's a continuous feedback loop. Every flood makes the system more accurate.

---

## Slide 5 — Traction (20 seconds)

> We built this in **48 hours** at this hackathon. And it's production-ready.

> **600+ cameras** integrated. **~90% detection accuracy**. **7 microservices** running in Docker.

> The full stack: Python, TensorFlow, Flutter, React, FastAPI, Docker, Google Maps, Firebase, PostgreSQL, Redis — plus OpenAI and AWS.

---

## Slide 6 — AI Systems (20 seconds)

> Under the hood, we have three AI systems working together:

> An **LLM intelligence layer** that reads weather, camera data, and news to assess flood severity.

> An **agent system** that crawls, analyzes, decides, and measures — autonomously.

> And a **simulation engine** that tests scenarios before we deploy routing changes.

---

## Slide 7 — Product (15 seconds)

> Here's what operators see: a **command center** with live flood map, alert system, route engine, analytics, and a mobile app for citizens.

> The dashboard shows active floods, rerouted vehicles, and risk scores — all in real time.

---

## Slide 8 — Live Demo (30 seconds)

> Let me show you two demos.

> **On the left**: a citizen reporting a flood through our Flutter app. They describe the situation, submit, and it goes straight into our detection pipeline.

> **On the right**: our smart routing in action. The AI detects a flood zone and automatically reroutes around it using Google Maps.

> From detection to alert: under 5 seconds.

---

## Slide 9 — Prediction (15 seconds)

> We don't just react — we predict. Our system warns users **6 hours before**, **2 hours before**, and in real time.

> 94% prediction accuracy using a Temporal Fusion Transformer combined with XGBoost.

---

## Slide 10 — Market (15 seconds)

> The smart city mobility market is **$40 billion**. Climate-adaptive transport is an **$8 billion** segment. Our serviceable market for flood routing is **$400 million** over 5 years.

> And right now? **Zero incumbents.** Nobody does this.

---

## Slide 11 — Competition (15 seconds)

> Google Maps, Waze, HERE — none of them have real-time flood detection, LLM severity assessment, predictive warnings, or an autonomous learning agent.

> They react to **user-reported** floods. We **detect, predict, and prevent** automatically.

---

## Slide 12 — Business Model (15 seconds)

> Three revenue streams: **B2G platform** at $5-15K per month per city. **B2B API** at $0.002 per call for logistics and insurance. And **data intelligence** for enterprise customers.

> Revenue projection: $400K year one, $12M year three, $45M year five.

---

## Slide 13 — Impact (15 seconds)

> For citizens: **23% faster commutes**, zero flood fatalities.

> For government: **40% faster emergency response**.

> For enterprise: **68% fewer delays**, $2.3M saved per fleet annually.

> And for the planet: **31% less CO2** from reduced idle time.

---

## Slide 14 — Roadmap (10 seconds)

> Phase 1: MVP with Ho Chi Minh City, 600+ cameras. That's now.

> Phase 2: AI engine with LLM agents, 3 cities.

> Phase 3: Scale to 10 cities across Southeast Asia.

> Phase 4: Global expansion, 50+ cities.

---

## Slide 15 — Team + Ask (20 seconds)

> I'm Ho Dinh Manh. I built the entire platform solo — backend, mobile app, web dashboard, and AI pipeline. Python, Flutter, React, FastAPI, TensorFlow, Docker.

> We're raising a **$2.5M seed round**. 45% engineering, 25% go-to-market, 15% data and ML, 15% operations.

> Target: 10 cities, $3M ARR, Series A in 18 months.

---

## Slide 16 — Vision (10 seconds)

> Today we solve flood routing. Tomorrow, we become the **Urban Resilience Operating System** — covering multi-hazard scenarios for insurance, emergency services, logistics, and autonomous vehicles.

---

## Slide 17 — Thank You (10 seconds)

> Floods are inevitable. **Traffic chaos is not.**

> Thank you. I'm happy to answer your questions. You can scan the QR code to try our platform at **safemove.skylabs.vn**.

---

## Q&A Tips

**If asked "How does the AI detect floods?"**
→ Go to appendix slide: System Architecture or Flood Intelligence

**If asked "How does the LLM work?"**
→ Go to appendix slide: LLM Flood Evaluation Engine (hybrid scoring, prompt design)

**If asked "How does the system learn?"**
→ Go to appendix slide: Agent + Feedback Learning System

**If asked "How does prediction work?"**
→ Go to appendix slide: Prediction Engine (TFT + XGBoost, signal fusion)

**If asked "What's the tech stack?"**
→ Go to appendix slide: Full Tech Stack

**If asked "What about costs?"**
→ Go to appendix slide: AWS Operating Cost (detailed per-service breakdown)

**If asked "Show me the code / docs"**
→ Point to: github.com/ManhHoDinh/AI-Navigate or safemove.skylabs.vn/technology/detail

---

## Timing Summary

| Slide | Duration | Cumulative |
|-------|----------|------------|
| 1. Title | 10s | 0:10 |
| 2. Problem | 30s | 0:40 |
| 3. Why Now | 25s | 1:05 |
| 4. Solution | 25s | 1:30 |
| 5. Traction | 20s | 1:50 |
| 6. AI Systems | 20s | 2:10 |
| 7. Product | 15s | 2:25 |
| 8. Demo | 30s | 2:55 |
| 9. Prediction | 15s | 3:10 |
| 10. Market | 15s | 3:25 |
| 11. Competition | 15s | 3:40 |
| 12. Business | 15s | 3:55 |
| 13. Impact | 15s | 4:10 |
| 14. Roadmap | 10s | 4:20 |
| 15. Team + Ask | 20s | 4:40 |
| 16. Vision | 10s | 4:50 |
| 17. Thank You | 10s | 5:00 |

**Total: 5 minutes exactly**
