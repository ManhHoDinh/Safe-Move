# LLM Flood Evaluation Engine — System Design

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture](#2-architecture)
3. [Data Flow](#3-data-flow)
4. [Data Model](#4-data-model)
5. [Core Components](#5-core-components)
6. [Algorithms / Decision Logic](#6-algorithms--decision-logic)
7. [Interfaces / APIs](#7-interfaces--apis)
8. [Scaling & Performance](#8-scaling--performance)
9. [Failure Modes & Mitigation](#9-failure-modes--mitigation)
10. [Observability](#10-observability)
11. [Future Improvements](#11-future-improvements)

---

## 1. Overview

### Purpose

The LLM Flood Evaluation Engine transforms raw, heterogeneous data from multiple sources — cameras, weather APIs, news feeds, crowdsourced user reports, and historical flood records — into structured, explainable flood severity assessments. These assessments drive downstream routing decisions and public safety alerts within the SafeMove AI platform.

### Role in the System

The engine sits as the core intelligence layer between the Data Processing tier (which ingests and normalizes raw signals) and the Routing/Alert tier (which consumes severity scores to reroute traffic and issue warnings). It is the single authority for answering the question: "How severe is the flooding at this location right now, and what should we do about it?"

### Key Capabilities

- **Multi-source fusion.** Ingests five distinct signal types — camera feeds, weather telemetry, news articles, user reports, and historical patterns — and reconciles them into a unified assessment.
- **LLM-powered reasoning.** Uses large language models to interpret ambiguous or conflicting signals that deterministic rules cannot resolve (e.g., a news headline mentioning a street name near but not at the target location).
- **Hybrid scoring.** Combines rule-based heuristics, LLM judgments, and community feedback into a single severity score with explicit weight attribution.
- **Explainable output.** Every evaluation includes a human-readable explanation and a breakdown of which sources contributed what weight, so that traffic operators can audit and override decisions.
- **Cost-aware LLM routing.** Skips LLM calls entirely when rule-based confidence is high enough, reducing API costs by an estimated 40%.

---

## 2. Architecture

### High-Level Pipeline

```
┌──────────────────────────────────────────────────────────────────────────┐
│                     LLM FLOOD EVALUATION ENGINE                        │
│                                                                        │
│  ┌───────────┐   ┌───────────────┐   ┌──────────────┐   ┌───────────┐ │
│  │  Multi-   │   │ Preprocessing │   │     LLM      │   │  Hybrid   │ │
│  │  Source   │──▶│   Pipeline    │──▶│ Orchestrator  │──▶│  Scoring  │ │
│  │  Input    │   │               │   │              │   │  Engine   │ │
│  └───────────┘   └───────────────┘   └──────────────┘   └─────┬─────┘ │
│       ▲                                                       │       │
│       │                                                       ▼       │
│  ┌────┴──────────────────────────────────────────────────────────────┐ │
│  │                        Input Aggregator                          │ │
│  │  camera | weather | news | user_reports | history                │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                       │               │
│                                                       ▼               │
│                                              ┌──────────────┐        │
│                                              │    Output     │        │
│                                              │  Formatter    │        │
│                                              └──────┬───────┘        │
│                                                     │                │
└─────────────────────────────────────────────────────┼────────────────┘
                                                      │
                              ┌────────────────────────┼──────────────────┐
                              ▼                        ▼                  ▼
                     ┌──────────────┐        ┌──────────────┐   ┌──────────────┐
                     │  Flood Point │        │   Routing    │   │    Alert     │
                     │     DB       │        │   Engine     │   │   Service    │
                     └──────────────┘        └──────────────┘   └──────────────┘
```

### Sub-Components

| Component | Responsibility |
|---|---|
| **Input Aggregator** | Collects raw signals from all five data sources, validates that at least two sources are present, assigns source reliability scores, and packages them into a unified `FloodEvaluationRequest`. |
| **Preprocessing Pipeline** | Normalizes text (news, user reports), converts images to captions, extracts flood-relevant keywords, compresses context to fit within LLM token budgets, and engineers features (rainfall trends, drainage risk). |
| **LLM Orchestrator** | Selects the appropriate model (GPT-4o vs. GPT-4o-mini), constructs the prompt, calls the LLM API, parses the structured JSON response, validates output ranges, manages caching, and handles fallback to rule-based scoring on failure. |
| **Hybrid Scoring Engine** | Combines rule-based score, LLM score, and feedback score using weighted formula. Dynamically adjusts weights based on confidence levels and feedback volume. Normalizes the final score to [0, 1]. |
| **Output Formatter** | Maps the numeric severity score to a discrete severity level and recommended action, generates the human-readable explanation, attributes signal contributions, and structures the final `FloodEvaluationResponse`. |

---

## 3. Data Flow

### Step-by-Step Processing

**Step 1 — Signal Arrival.** Raw data arrives from five independent sources, each on its own ingestion cadence:

| Source | Cadence | Example Signal |
|---|---|---|
| Camera feed | Every 30s per camera | JPEG frame + on-device water detection confidence |
| Weather API | Every 5 min | Rainfall rate 32mm/h, humidity 94%, forecast: heavy rain next 2h |
| News feed | Every 2 min (RSS poll) | "Flash flooding reported on Sukhumvit Soi 21 — Thai PBS" |
| User reports | Real-time (push) | User #4821 reports severity 4/5 at lat 13.7401, lng 100.5607 |
| Historical DB | On-demand lookup | This grid cell flooded 12 times in the past 3 years, avg severity 0.6, drainage class C |

**Step 2 — Preprocessing.** Each signal is normalized into a common intermediate representation:

- Text normalization: lowercase, strip HTML, transliterate Thai to romanized form for keyword matching, truncate to 200 chars.
- Image-to-caption: if the camera source provides a raw image instead of a pre-computed description, run it through a lightweight captioning model (BLIP-2) to produce a text description like "street with 20cm standing water covering both lanes."
- Keyword extraction: from news headlines, extract location names and severity indicators using a regex-backed NER pass. Example output: `{location: "Sukhumvit Soi 21", severity_words: ["flash flooding"]}`.
- Context compression: concatenate all normalized signals into a single context block, then truncate to 1500 tokens max. If over budget, drop the lowest-reliability source first.
- Feature engineering: compute `rainfall_trend_1h` (delta over last hour), `rainfall_trend_3h`, `rainfall_trend_6h`, `flood_frequency_score` (normalized 0-1 from historical count), `drainage_risk` (A=0.0, B=0.1, C=0.3, D=0.5).

**Step 3 — LLM Evaluation.** The preprocessed context is injected into a structured prompt (see Section 6) and sent to the selected LLM. The LLM returns a JSON object containing `severity_score`, `confidence`, and `explanation`.

**Step 4 — Hybrid Scoring.** The LLM score is combined with the rule-based score (computed in parallel during preprocessing) and the feedback score (aggregated from recent user confirmations/denials at this location). The formula and weight adjustment logic are detailed in Section 5.4.

**Step 5 — Output Construction.** The final score is mapped to a severity level and recommended action. The explanation is cleaned up and the signal attribution list is assembled. The complete `FloodEvaluationResponse` is returned.

**Step 6 — Persistence and Downstream Trigger.** The evaluation is written to the Flood Point DB (PostGIS). If `severity_level >= MEDIUM`, a routing invalidation event is published to the Routing Engine's message queue. If `severity_level >= HIGH`, an alert is pushed to the Alert Service.

### Flow Diagram

```
Camera ──┐
Weather ─┤                    ┌─────────────────────┐
News ────┼──▶ Input Aggregator│  Validate sources   │
Reports ─┤   (>= 2 required) │  Assign reliability  │
History ─┘                    └─────────┬───────────┘
                                        │
                                        ▼
                              ┌─────────────────────┐
                              │ Preprocessing Pipeline│
                              │                     │
                              │ • Normalize text    │
                              │ • Image → caption   │
                              │ • Extract keywords  │
                              │ • Compress context   │
                              │ • Engineer features  │
                              └────────┬────────────┘
                                       │
                          ┌────────────┼────────────┐
                          ▼                         ▼
                 ┌──────────────┐          ┌──────────────┐
                 │  Rule-Based  │          │     LLM      │
                 │   Scoring    │          │ Orchestrator  │
                 │              │          │              │
                 │ Deterministic│          │ GPT-4o /     │
                 │ heuristics   │          │ GPT-4o-mini  │
                 └──────┬───────┘          └──────┬───────┘
                        │                         │
                        ▼                         ▼
                 ┌────────────────────────────────────────┐
                 │         Hybrid Scoring Engine          │
                 │                                       │
                 │ Final = w1*Rule + w2*LLM + w3*Feedback│
                 │ Dynamic weight adjustment             │
                 └───────────────┬────────────────────────┘
                                 │
                                 ▼
                        ┌──────────────┐
                        │   Output     │
                        │  Formatter   │
                        │              │
                        │ Score → Level│
                        │ Level → Action│
                        │ Explanation  │
                        └──────┬───────┘
                               │
              ┌────────────────┼─────────────────┐
              ▼                ▼                  ▼
       Flood Point DB    Routing Engine     Alert Service
```

---

## 4. Data Model

### FloodEvaluationRequest

```json
{
  "request_id": "req-20260322-143022-a7f3",
  "location": {
    "lat": 13.7401,
    "lng": 100.5607,
    "grid_cell_id": "bkk-13740-10056",
    "display_name": "Sukhumvit Soi 21, Khlong Toei"
  },
  "timestamp": "2026-03-22T14:30:22Z",
  "weather": {
    "rainfall_mm_per_hour": 48.5,
    "rainfall_trend_1h": 12.3,
    "rainfall_trend_3h": 35.1,
    "rainfall_trend_6h": 42.0,
    "humidity_percent": 94,
    "forecast_severity": "heavy",
    "forecast_duration_hours": 3
  },
  "camera": {
    "camera_id": "cam-sukhumvit-021-north",
    "description": "Standing water approximately 15cm deep covering both lanes, vehicles moving slowly",
    "water_detected": true,
    "confidence": 0.87,
    "image_url": "https://cdn.safemove.ai/captures/cam-021/2026-03-22T143015Z.jpg",
    "captured_at": "2026-03-22T14:30:15Z"
  },
  "news": [
    {
      "headline": "Flash flooding reported on Sukhumvit Soi 21 disrupts evening commute",
      "source": "Thai PBS",
      "published_at": "2026-03-22T14:15:00Z",
      "relevance_score": 0.92,
      "extracted_location": "Sukhumvit Soi 21",
      "severity_keywords": ["flash flooding", "disrupts"]
    },
    {
      "headline": "Bangkok braces for continued heavy rain through Wednesday",
      "source": "Bangkok Post",
      "published_at": "2026-03-22T13:00:00Z",
      "relevance_score": 0.55,
      "extracted_location": "Bangkok",
      "severity_keywords": ["heavy rain"]
    }
  ],
  "history": {
    "flood_frequency_3yr": 12,
    "flood_frequency_score": 0.72,
    "past_severity_avg": 0.58,
    "last_flood_date": "2025-10-14",
    "drainage_risk_class": "C",
    "drainage_risk_score": 0.3,
    "elevation_m": 1.2
  },
  "user_reports": [
    {
      "report_id": "rpt-88214",
      "user_id": "usr-4821",
      "severity_reported": 4,
      "severity_normalized": 0.8,
      "description": "Water up to my ankle near Soi 21 intersection",
      "timestamp": "2026-03-22T14:22:00Z",
      "user_reliability_score": 0.85
    },
    {
      "report_id": "rpt-88219",
      "user_id": "usr-7103",
      "severity_reported": 3,
      "severity_normalized": 0.6,
      "description": "Some flooding on the road, cars still passing",
      "timestamp": "2026-03-22T14:28:00Z",
      "user_reliability_score": 0.70
    }
  ]
}
```

### FloodEvaluationResponse

```json
{
  "evaluation_id": "eval-20260322-143022-b9e1",
  "request_id": "req-20260322-143022-a7f3",
  "location": {
    "lat": 13.7401,
    "lng": 100.5607,
    "grid_cell_id": "bkk-13740-10056",
    "display_name": "Sukhumvit Soi 21, Khlong Toei"
  },
  "timestamp": "2026-03-22T14:30:22Z",
  "evaluated_at": "2026-03-22T14:30:24Z",
  "severity_score": 0.71,
  "severity_level": "HIGH",
  "confidence": 0.88,
  "explanation": "High flood severity at Sukhumvit Soi 21. Camera confirms 15cm standing water. Rainfall at 48.5mm/h with upward trend. News corroborates active flooding. This location has flooded 12 times in 3 years with poor drainage (class C). Two user reports confirm ankle-deep water.",
  "recommended_action": "avoid_route",
  "signals_used": [
    { "source": "camera", "weight": 0.30, "value": 0.87, "detail": "Water detected, 15cm standing water" },
    { "source": "weather", "weight": 0.25, "value": 0.72, "detail": "48.5mm/h rainfall, heavy forecast" },
    { "source": "news", "weight": 0.15, "value": 0.92, "detail": "Direct mention of flash flooding at location" },
    { "source": "user_reports", "weight": 0.15, "value": 0.70, "detail": "2 reports, avg severity 0.7" },
    { "source": "history", "weight": 0.15, "value": 0.65, "detail": "High flood frequency, poor drainage" }
  ],
  "hybrid_score_breakdown": {
    "rule_score": 0.68,
    "rule_weight": 0.30,
    "llm_score": 0.74,
    "llm_weight": 0.50,
    "feedback_score": 0.70,
    "feedback_weight": 0.20,
    "final_score": 0.71
  },
  "processing_time_ms": 1847,
  "model_version": "flood-eval-v2.3",
  "llm_model_used": "gpt-4o-mini",
  "cache_hit": false
}
```

### HybridScoreBreakdown

```json
{
  "rule_score": 0.68,
  "rule_weight": 0.30,
  "llm_score": 0.74,
  "llm_weight": 0.50,
  "feedback_score": 0.70,
  "feedback_weight": 0.20,
  "final_score": 0.71,
  "weight_adjustment_reason": "default weights applied — LLM confidence (0.88) above threshold, feedback volume (2 reports) below high-volume threshold",
  "rule_score_components": {
    "rainfall_component": 0.55,
    "flood_zone_component": 0.20,
    "drainage_component": 0.15,
    "camera_component": 0.87,
    "raw_sum": 1.77,
    "normalized": 0.68
  }
}
```

### FloodPoint (DB Record)

```json
{
  "point_id": "fp-bkk-13740-10056",
  "grid_cell_id": "bkk-13740-10056",
  "location": {
    "type": "Point",
    "coordinates": [100.5607, 13.7401]
  },
  "current_severity_score": 0.71,
  "current_severity_level": "HIGH",
  "current_confidence": 0.88,
  "last_evaluated_at": "2026-03-22T14:30:24Z",
  "evaluation_id": "eval-20260322-143022-b9e1",
  "ttl_seconds": 1800,
  "expires_at": "2026-03-22T15:00:24Z",
  "evaluation_count_24h": 47,
  "trend": "worsening"
}
```

---

## 5. Core Components

### 5.1 Input Aggregator

**Objective:** Collect raw signals from all available data sources, validate that the minimum source threshold is met, assign reliability scores, and produce a unified `FloodEvaluationRequest`.

**Inputs:**

| Source | Protocol | Format | Reliability Baseline |
|---|---|---|---|
| Camera feed | gRPC stream / REST poll | JSON (description + confidence) or JPEG | 0.85 (on-device ML) |
| Weather API | REST (OpenWeatherMap / TMD) | JSON | 0.90 (government source) |
| News feed | RSS / webhook | Text (headline + body snippet) | 0.60 (variable accuracy) |
| User reports | WebSocket / REST | JSON (structured report) | 0.50 (unverified by default) |
| Historical DB | PostgreSQL query | Row data | 0.95 (ground truth) |

**Outputs:** A fully populated `FloodEvaluationRequest` with all available source data and reliability metadata.

**Internal Logic:**

1. For a given `(lat, lng)`, compute the `grid_cell_id` by snapping to the nearest 100m grid: `grid_cell_id = f"{city_prefix}-{int(lat*1000)}-{int(lng*1000)}"`.
2. Query each source adapter in parallel with a 2-second timeout per source.
3. Count how many sources returned valid data. If fewer than 2 sources respond, reject the evaluation request with HTTP 422 and reason `"insufficient_sources"`.
4. For each source that responded, assign a reliability score:
   - Start from the baseline (table above).
   - Adjust for staleness: if data is older than 10 minutes, multiply reliability by `max(0.5, 1.0 - (age_minutes - 10) * 0.05)`.
   - For user reports, adjust by the reporting user's historical accuracy score.
   - For news, adjust by `relevance_score` (how closely the extracted location matches the target location).
5. Attach all source data and reliability metadata to the request object.

**Edge Cases:**

| Scenario | Handling |
|---|---|
| Only 1 source available | Reject with 422. Do not guess. |
| Camera returns image but no description | Route through image-to-caption in Preprocessing. Mark camera confidence as 0.5 (pending caption). |
| Conflicting signals (camera says dry, user says flooded) | Pass both signals to LLM. Flag `conflict_detected: true` so LLM prompt includes conflict resolution instructions. |
| Stale data (> 30 min old) | Accept but reduce reliability. If all sources are stale, set `data_freshness_warning: true` in response. |
| Duplicate user reports from same user | Deduplicate by `user_id` within a 15-minute window. Keep the most recent report. |

---

### 5.2 Preprocessing Pipeline

**Objective:** Normalize all raw signals into a compact, LLM-friendly intermediate representation while extracting engineered features for the rule-based scorer.

**Inputs:** Raw source data from the Input Aggregator.

**Outputs:**
- `preprocessed_context`: a text block (max 1500 tokens) structured for LLM consumption.
- `engineered_features`: a dict of numeric features for rule-based scoring.
- `source_summaries`: per-source one-line summaries for the output explanation.

**Internal Logic:**

1. **Text normalization (news + user reports):**
   - Strip HTML tags and special characters (retain alphanumeric, spaces, basic punctuation).
   - Transliterate Thai script to romanized form using `pythainlp.transliterate` for keyword matching.
   - Lowercase all text.
   - Truncate each text field to 200 characters.
   - Sanitize against prompt injection: strip sequences matching `\b(ignore|forget|disregard)\b.*\b(instructions|above|previous)\b` (case-insensitive).

2. **Image-to-caption conversion:**
   - If the camera source provides `image_url` but no `description` (or confidence < 0.5), download the image and run it through a captioning service (BLIP-2 hosted on internal GPU cluster).
   - Caption format: "{scene description}, water level approximately {X}cm, {traffic condition}."
   - Timeout: 3 seconds. On timeout, use fallback description: "Camera image could not be processed. Water detection confidence: {confidence}."

3. **Keyword extraction from news:**
   - Run regex-backed NER to extract:
     - Location names: match against a gazetteer of 12,000 Bangkok street names, soi numbers, and landmarks.
     - Severity indicators: match against a curated list of 85 severity terms (e.g., "flash flood", "submerged", "impassable", "ankle-deep", "waist-deep").
   - Compute `location_match_distance`: geodesic distance between the extracted news location and the target location. If > 500m, reduce `relevance_score` by 50%.

4. **Context compression:**
   - Assemble the preprocessed data into structured sections (see prompt template in Section 6).
   - Estimate token count using the `tiktoken` cl100k_base encoder.
   - If over 1500 tokens, iteratively drop sources in ascending reliability order until under budget.
   - Always retain weather and the highest-reliability source.

5. **Feature engineering:**
   - `rainfall_trend_1h`: current rainfall minus rainfall 1 hour ago. Positive = increasing.
   - `rainfall_trend_3h`: current rainfall minus rainfall 3 hours ago.
   - `rainfall_trend_6h`: current rainfall minus rainfall 6 hours ago.
   - `flood_frequency_score`: `min(1.0, flood_frequency_3yr / 15)`. A location that flooded 15+ times in 3 years gets a score of 1.0.
   - `drainage_risk_score`: A=0.0, B=0.1, C=0.3, D=0.5.
   - `user_report_consensus`: if >= 2 user reports within 30 min, average their normalized severity. Otherwise, use the single report value (or 0 if none).

**Edge Cases:**

| Scenario | Handling |
|---|---|
| Garbled text (encoding issues) | Detect via `chardet`. If confidence < 0.7, discard the text field and reduce source reliability to 0.3. |
| Non-flood news matched incorrectly | The severity keyword list is curated to minimize false positives. If no severity keywords are found but `relevance_score > 0.5`, include the news but flag `severity_uncertain: true`. The LLM is instructed to treat uncertain news with skepticism. |
| Image download fails | Use the camera's on-device `confidence` and `water_detected` boolean only. Set description to a generic template. |
| Token budget exceeded even after dropping sources | Hard-truncate the remaining context at 1500 tokens. This is a rare edge case that should trigger an observability alert. |

---

### 5.3 LLM Orchestrator

**Objective:** Route the evaluation to the appropriate LLM model, construct a well-structured prompt, call the model, parse and validate the response, manage caching, and handle failures gracefully.

**Inputs:**
- `preprocessed_context` from Preprocessing Pipeline.
- `engineered_features` for routing decisions.
- `rule_based_score` and `rule_based_confidence` from the parallel rule-based scorer.

**Outputs:**
- `llm_score`: float in [0, 1].
- `llm_confidence`: float in [0, 1].
- `llm_explanation`: string, max 200 characters.
- `llm_model_used`: string identifying the model.
- `llm_latency_ms`: int.

**Internal Logic:**

1. **LLM skip check:** If `rule_based_confidence > 0.9`, skip the LLM call entirely. Set `llm_score = rule_based_score`, `llm_confidence = rule_based_confidence * 0.9` (discount slightly), `llm_explanation = "Assessment based on deterministic rules (high confidence)."`, `llm_model_used = "rule-only"`. Return immediately. This saves approximately 40% of LLM API calls during clear-cut situations (e.g., no rain, no reports, no camera detection).

2. **Model selection:**
   - Use **GPT-4o** when any of the following conditions are true:
     - `conflict_detected` is true (sources disagree).
     - More than 3 news articles are relevant (complex information synthesis required).
     - `rule_based_confidence < 0.5` (the deterministic system is uncertain).
   - Use **GPT-4o-mini** for all other cases (standard evaluations with mostly agreeing sources).

3. **Cache lookup:**
   - Compute cache key: `f"{grid_cell_id}:{weather_bucket}:{time_window}"`.
     - `weather_bucket`: "none" (< 5mm/h), "light" (5-20mm/h), "moderate" (20-50mm/h), "heavy" (> 50mm/h).
     - `time_window`: floor current timestamp to the nearest 30-minute mark.
   - If cache hit, return the cached LLM result. Increment `cache_hit_counter`.
   - Cache entries are tagged with `model_version` and expire after 30 minutes (TTL).

4. **Prompt construction:** Assemble the system prompt and user prompt as defined in Section 6.

5. **API call:**
   - Timeout: 8 seconds.
   - Temperature: 0.1 (near-deterministic).
   - Max tokens: 300.
   - Response format: `json_object`.

6. **Response parsing:**
   - Parse the returned string as JSON.
   - Validate required fields: `severity_score`, `confidence`, `explanation`.
   - Validate ranges: `severity_score` in [0, 1], `confidence` in [0, 1].
   - Validate `explanation` length: must be <= 200 characters. If longer, truncate at the last complete sentence before 200 chars.
   - If JSON parsing fails, attempt regex extraction: `/"severity_score"\s*:\s*([\d.]+)/`.
   - If validation fails after extraction attempts, fall back to rule-based scoring.

7. **Cache write:** If the call succeeded and validation passed, write the result to the cache.

**Edge Cases:**

| Scenario | Handling |
|---|---|
| LLM timeout (> 8s) | Log timeout, return rule-based score with `confidence *= 0.85`. Set `llm_model_used = "timeout-fallback"`. |
| LLM rate limit (429) | Retry once after 1 second. If still rate-limited, fall back to rule-based. Trigger alert if rate limit persists > 5 minutes. |
| Malformed output (invalid JSON) | Attempt regex extraction. If that fails, fall back to rule-based. Log the raw LLM output for debugging. |
| Hallucination (severity_score > 1.0 or < 0.0) | Clamp to [0, 1]. Log the anomaly. If the clamped value differs from the original by > 0.3, discard the LLM result and use rule-based. |
| LLM returns explanation referencing non-existent data | Cross-check explanation keywords against input sources. If the explanation mentions a source not present in the input, strip that sentence from the explanation and reduce `llm_confidence` by 0.1. |
| Cost spike (> $50/hour in LLM calls) | Circuit breaker activates: switch all evaluations to rule-only mode. Alert on-call engineer. Auto-reset after 15 minutes if cost drops below threshold. |

---

### 5.4 Hybrid Scoring Engine

**Objective:** Combine the rule-based score, LLM score, and community feedback score into a single final severity score using weighted averaging with dynamic weight adjustment.

**Inputs:**
- `rule_score`: float [0, 1] from the rule-based scorer.
- `llm_score`: float [0, 1] from the LLM Orchestrator.
- `feedback_score`: float [0, 1] from the Feedback Aggregator (average of recent user confirmations/denials at this location).
- `llm_confidence`: float [0, 1].
- `feedback_volume`: int (number of feedback signals in the last 30 minutes).

**Outputs:**
- `final_score`: float [0, 1].
- `HybridScoreBreakdown`: detailed breakdown of all components and weights.

**Internal Logic:**

1. **Default weights:** `w1 = 0.30` (rule), `w2 = 0.50` (LLM), `w3 = 0.20` (feedback).

2. **Dynamic weight adjustment:**

   ```
   if llm_confidence < 0.5:
       # LLM is uncertain — trust rules more
       w1 += 0.15
       w2 -= 0.15

   if llm_confidence < 0.3:
       # LLM is very uncertain — heavily favor rules
       w1 += 0.10  (total shift: +0.25)
       w2 -= 0.10  (total shift: -0.25)

   if feedback_volume >= 10:
       # High feedback volume — community signal is strong
       w3 += 0.10
       w2 -= 0.05
       w1 -= 0.05

   if feedback_volume >= 25:
       # Very high feedback volume — community signal dominates
       w3 += 0.10  (total shift: +0.20)
       w2 -= 0.05  (total shift: -0.10)
       w1 -= 0.05  (total shift: -0.10)

   # Ensure weights sum to 1.0
   total = w1 + w2 + w3
   w1, w2, w3 = w1/total, w2/total, w3/total
   ```

3. **Score computation:**
   ```
   final_score = w1 * rule_score + w2 * llm_score + w3 * feedback_score
   final_score = clamp(final_score, 0.0, 1.0)
   ```

4. **Rule-based scoring details:**
   The rule-based scorer runs deterministic heuristics:

   ```
   rule_score = 0.0

   # Rainfall component
   if rainfall_mm_per_hour > 100:
       rule_score += 0.90
   elif rainfall_mm_per_hour > 50:
       rule_score += 0.70
   elif rainfall_mm_per_hour > 25:
       rule_score += 0.45
   elif rainfall_mm_per_hour > 10:
       rule_score += 0.25
   elif rainfall_mm_per_hour > 5:
       rule_score += 0.10

   # Rainfall trend bonus
   if rainfall_trend_1h > 20:
       rule_score += 0.10  # rapidly increasing

   # Known flood zone
   if flood_frequency_score > 0.5:
       rule_score += 0.20

   # Drainage risk
   rule_score += drainage_risk_score  # 0.0 to 0.5

   # Camera detection
   if camera.water_detected and camera.confidence > 0.7:
       rule_score += 0.25

   # User report consensus
   if user_report_consensus > 0.6:
       rule_score += 0.15

   # Normalize to [0, 1]
   rule_score = clamp(rule_score / 1.50, 0.0, 1.0)
   # 1.50 is the practical maximum sum of components

   # Rule confidence: based on number of agreeing sources
   agreeing_sources = count sources where individual_signal > 0.5
   rule_confidence = min(1.0, 0.4 + agreeing_sources * 0.15)
   ```

5. **Score normalization:** The final score is clamped to [0, 1]. No further normalization is applied because each input score is already in [0, 1] and the weights sum to 1.0.

**Edge Cases:**

| Scenario | Handling |
|---|---|
| All sources disagree (rule=0.2, LLM=0.8, feedback=0.5) | The weighted average mediates. But also set `confidence *= 0.7` to reflect disagreement. Add `"conflict_note"` to the explanation. |
| Feedback contradicts LLM (feedback=0.1, LLM=0.9) | If `feedback_volume >= 10`, trust feedback more (weights shift). If `feedback_volume < 5`, trust LLM. Log the discrepancy for review. |
| No feedback available | Set `feedback_score = 0.5` (neutral). Redistribute `w3` to `w1` and `w2` proportionally: `w1 = 0.30/0.80 * 1.0 = 0.375`, `w2 = 0.50/0.80 * 1.0 = 0.625`, `w3 = 0.0`. |
| LLM was skipped (rule-only mode) | `w2 = 0`, redistribute to `w1` and `w3`. `w1 = 0.30/0.50 * 1.0 = 0.60`, `w3 = 0.20/0.50 * 1.0 = 0.40`. If no feedback either, `w1 = 1.0`. |

---

### 5.5 Output Formatter

**Objective:** Map the numeric severity score to a discrete severity level and recommended action, assemble the human-readable explanation, attribute signal contributions, and produce the final `FloodEvaluationResponse`.

**Inputs:**
- `final_score`: float [0, 1] from Hybrid Scoring Engine.
- `HybridScoreBreakdown`.
- `llm_explanation`: string from LLM Orchestrator.
- `source_summaries`: per-source one-line summaries from Preprocessing.
- Original `FloodEvaluationRequest`.

**Outputs:** Complete `FloodEvaluationResponse`.

**Internal Logic:**

1. **Score to severity level mapping:**

   | Score Range | Severity Level | Color Code |
   |---|---|---|
   | 0.00 - 0.20 | NONE | Green |
   | 0.20 - 0.40 | LOW | Yellow |
   | 0.40 - 0.60 | MEDIUM | Orange |
   | 0.60 - 0.80 | HIGH | Red |
   | 0.80 - 1.00 | CRITICAL | Dark Red |

   Boundary handling: scores exactly on a boundary (e.g., 0.40) round up to the higher level.

2. **Severity to recommended action mapping:**

   | Severity Level | Recommended Action | Routing Behavior |
   |---|---|---|
   | NONE | `ignore` | No routing impact |
   | LOW | `warn` | Display advisory; do not alter route |
   | MEDIUM | `warn` | Display warning; suggest alternatives if available |
   | HIGH | `avoid_route` | Route around this segment; increase cost weight by 5x |
   | CRITICAL | `block_road` | Treat segment as impassable; hard block in routing graph |

3. **Explanation generation:**
   - Start with the LLM-generated explanation.
   - If LLM was skipped, generate a template-based explanation:
     ```
     "{severity_level} flood risk at {display_name}. Rainfall at {rainfall}mm/h.
     {camera_summary}. {history_summary}."
     ```
   - Ensure explanation is <= 200 characters. Truncate at the last complete sentence if necessary.

4. **Signal attribution:**
   - For each source that contributed to the evaluation, compute its effective contribution:
     ```
     contribution = source_reliability * source_signal_strength
     ```
   - Normalize contributions to sum to 1.0.
   - Sort by contribution descending.
   - Include the top contributing source's detail in the explanation if not already mentioned.

5. **Response assembly:**
   - Generate `evaluation_id` as `f"eval-{date}-{time}-{random_hex(4)}"`.
   - Compute `processing_time_ms` as the difference between request receipt and response assembly.
   - Set `model_version` from the deployment configuration.
   - Package everything into the `FloodEvaluationResponse` schema.

**Edge Cases:**

| Scenario | Handling |
|---|---|
| Score is exactly 0.0 | Severity level = NONE, action = ignore. Explanation: "No flood indicators detected at this location." |
| Score is exactly 1.0 | Severity level = CRITICAL, action = block_road. Ensure alert is triggered. |
| LLM explanation is empty | Fall back to template-based explanation. Log the anomaly. |
| Processing time exceeds 5s | Return the response anyway but flag `"slow_evaluation": true`. Trigger latency alert. |

---

## 6. Algorithms / Decision Logic

### 6.1 LLM Prompt Design Strategy

The prompt follows a three-part structure: system prompt (role + constraints + output format), user prompt (structured data), and output guardrails.

**Design principles:**
- The system prompt is static and cached across calls.
- The user prompt is dynamically constructed from preprocessed data.
- Output is constrained to strict JSON to eliminate free-text parsing ambiguity.
- The prompt explicitly instructs the model on how to handle conflicts and missing data.

#### Full Production Prompt

**System Prompt:**

```
You are a flood severity assessment engine for an urban traffic intelligence system
operating in Bangkok, Thailand. Your task is to analyze multi-source data about a
specific location and produce a flood severity assessment.

ROLE: You are a hydrological analyst. You must be conservative — when uncertain,
lean toward higher severity to protect public safety.

CONSTRAINTS:
- Base your assessment ONLY on the data provided. Do not invent or assume
  information not present in the input.
- If sources conflict, weight camera and weather data more heavily than news or
  user reports, as they are more objective.
- Consider historical flood patterns: locations with high flood frequency and
  poor drainage are more likely to flood severely.
- Rainfall above 50mm/h is considered heavy. Above 100mm/h is extreme.
- Account for rainfall trend: increasing rainfall suggests worsening conditions.

OUTPUT FORMAT: Respond with a JSON object containing exactly these fields:
{
  "severity_score": <float 0.0 to 1.0>,
  "confidence": <float 0.0 to 1.0>,
  "explanation": "<string, max 200 characters>"
}

SCORING GUIDANCE:
- 0.0-0.2: No flooding. Dry conditions or negligible water.
- 0.2-0.4: Minor water accumulation. Passable with caution.
- 0.4-0.6: Moderate flooding. Some lanes affected. Slow traffic.
- 0.6-0.8: Significant flooding. Most lanes affected. Vehicles at risk.
- 0.8-1.0: Severe/critical flooding. Road impassable. Safety hazard.

CONFIDENCE GUIDANCE:
- 1.0: All sources agree, data is fresh, high-reliability sources confirm.
- 0.7-0.9: Most sources agree, minor gaps in data.
- 0.4-0.6: Sources partially conflict or key data is missing.
- Below 0.4: Major conflicts or most data is stale/missing.

Do not include any text outside the JSON object.
```

**User Prompt Template:**

```
Assess flood severity at the following location based on the data below.

LOCATION: {display_name} (lat: {lat}, lng: {lng})
TIME: {timestamp}

--- WEATHER DATA ---
Current rainfall: {rainfall_mm_per_hour} mm/h
Rainfall trend (1h): {rainfall_trend_1h:+.1f} mm/h ({"increasing" if > 0 else "decreasing"})
Rainfall trend (3h): {rainfall_trend_3h:+.1f} mm/h
Humidity: {humidity_percent}%
Forecast: {forecast_severity} rain for next {forecast_duration_hours}h

--- CAMERA DATA ---
Camera ID: {camera_id}
Water detected: {water_detected}
Detection confidence: {camera_confidence}
Description: {camera_description}

--- NEWS ({len(news)} articles) ---
{for article in news:}
- [{source}] "{headline}" (relevance: {relevance_score})
{endfor}

--- USER REPORTS ({len(user_reports)} reports) ---
{for report in user_reports:}
- Severity {severity_reported}/5: "{description}" (user reliability: {user_reliability_score})
{endfor}

--- HISTORICAL DATA ---
Flood frequency (3yr): {flood_frequency_3yr} events
Past average severity: {past_severity_avg}
Drainage risk class: {drainage_risk_class}
Elevation: {elevation_m}m

--- INSTRUCTIONS ---
{if conflict_detected:}
NOTE: Sources show conflicting signals. Carefully weigh each source's reliability
and recency. Explain which source you trust more and why.
{endif}

Provide your flood severity assessment as a JSON object.
```

**Example populated user prompt (matching the sample request):**

```
Assess flood severity at the following location based on the data below.

LOCATION: Sukhumvit Soi 21, Khlong Toei (lat: 13.7401, lng: 100.5607)
TIME: 2026-03-22T14:30:22Z

--- WEATHER DATA ---
Current rainfall: 48.5 mm/h
Rainfall trend (1h): +12.3 mm/h (increasing)
Rainfall trend (3h): +35.1 mm/h
Humidity: 94%
Forecast: heavy rain for next 3h

--- CAMERA DATA ---
Camera ID: cam-sukhumvit-021-north
Water detected: true
Detection confidence: 0.87
Description: Standing water approximately 15cm deep covering both lanes, vehicles moving slowly

--- NEWS (2 articles) ---
- [Thai PBS] "Flash flooding reported on Sukhumvit Soi 21 disrupts evening commute" (relevance: 0.92)
- [Bangkok Post] "Bangkok braces for continued heavy rain through Wednesday" (relevance: 0.55)

--- USER REPORTS (2 reports) ---
- Severity 4/5: "Water up to my ankle near Soi 21 intersection" (user reliability: 0.85)
- Severity 3/5: "Some flooding on the road, cars still passing" (user reliability: 0.70)

--- HISTORICAL DATA ---
Flood frequency (3yr): 12 events
Past average severity: 0.58
Drainage risk class: C
Elevation: 1.2m

Provide your flood severity assessment as a JSON object.
```

#### Output Guardrails

After parsing the LLM response, apply these validation checks:

```python
def validate_llm_output(response: dict) -> dict:
    # Required fields
    assert "severity_score" in response
    assert "confidence" in response
    assert "explanation" in response

    # Range validation
    response["severity_score"] = clamp(float(response["severity_score"]), 0.0, 1.0)
    response["confidence"] = clamp(float(response["confidence"]), 0.0, 1.0)

    # Explanation length
    if len(response["explanation"]) > 200:
        # Truncate at last sentence boundary before 200 chars
        truncated = response["explanation"][:200]
        last_period = truncated.rfind(".")
        if last_period > 100:
            response["explanation"] = truncated[:last_period + 1]
        else:
            response["explanation"] = truncated.rstrip() + "..."

    return response
```

### 6.2 Hybrid Scoring Algorithm (Pseudocode)

```python
def compute_hybrid_score(
    rule_score: float,
    llm_score: float,
    feedback_score: float,
    llm_confidence: float,
    feedback_volume: int,
    llm_available: bool,
    feedback_available: bool
) -> HybridScoreBreakdown:

    # Base weights
    w_rule = 0.30
    w_llm = 0.50
    w_feedback = 0.20

    # Handle missing components
    if not llm_available:
        w_llm = 0.0
    if not feedback_available:
        w_feedback = 0.0
        feedback_score = 0.0

    # Dynamic adjustment: LLM confidence
    if llm_available and llm_confidence < 0.5:
        shift = 0.15
        w_rule += shift
        w_llm -= shift
    if llm_available and llm_confidence < 0.3:
        shift = 0.10
        w_rule += shift
        w_llm -= shift

    # Dynamic adjustment: feedback volume
    if feedback_available and feedback_volume >= 10:
        w_feedback += 0.10
        w_llm -= 0.05
        w_rule -= 0.05
    if feedback_available and feedback_volume >= 25:
        w_feedback += 0.10
        w_llm -= 0.05
        w_rule -= 0.05

    # Normalize weights to sum to 1.0
    total = w_rule + w_llm + w_feedback
    if total == 0:
        return error("No scoring components available")
    w_rule /= total
    w_llm /= total
    w_feedback /= total

    # Compute final score
    final = w_rule * rule_score + w_llm * llm_score + w_feedback * feedback_score
    final = clamp(final, 0.0, 1.0)

    return HybridScoreBreakdown(
        rule_score=rule_score,
        rule_weight=round(w_rule, 3),
        llm_score=llm_score,
        llm_weight=round(w_llm, 3),
        feedback_score=feedback_score,
        feedback_weight=round(w_feedback, 3),
        final_score=round(final, 4)
    )
```

### 6.3 Decision Threshold Table

| Final Score | Severity | Action | Routing Impact | Alert Triggered |
|---|---|---|---|---|
| 0.00 - 0.19 | NONE | ignore | None | No |
| 0.20 - 0.39 | LOW | warn | Advisory displayed | No |
| 0.40 - 0.59 | MEDIUM | warn | Suggest alternatives | Yes (low priority) |
| 0.60 - 0.79 | HIGH | avoid_route | 5x cost penalty on segment | Yes (high priority) |
| 0.80 - 1.00 | CRITICAL | block_road | Segment removed from graph | Yes (critical, push notification) |

### 6.4 Confidence Calibration

```python
def calibrate_confidence(
    base_confidence: float,
    source_signals: list[float],
    num_sources: int
) -> float:
    """
    Adjust confidence based on source agreement.
    source_signals: list of per-source severity signals (0-1).
    """
    if num_sources < 2:
        return base_confidence * 0.7  # Low confidence with single source

    # Compute agreement: standard deviation of source signals
    mean_signal = sum(source_signals) / len(source_signals)
    variance = sum((s - mean_signal) ** 2 for s in source_signals) / len(source_signals)
    std_dev = variance ** 0.5

    # Agreement factor: low std_dev = high agreement
    # std_dev of 0 -> factor = 1.2 (boost)
    # std_dev of 0.3 -> factor = 1.0 (neutral)
    # std_dev of 0.5+ -> factor = 0.7 (penalty)
    agreement_factor = max(0.7, min(1.2, 1.2 - std_dev * 1.0))

    calibrated = base_confidence * agreement_factor
    return clamp(calibrated, 0.0, 1.0)
```

---

## 7. Interfaces / APIs

All endpoints are served from the Flood Evaluation Service at base URL `/api/flood`.

### 7.1 POST /api/flood/evaluate

Evaluate flood severity for a single location.

**Request:**

```http
POST /api/flood/evaluate HTTP/1.1
Content-Type: application/json
Authorization: Bearer <service-token>
X-Request-ID: req-20260322-143022-a7f3

{
  "location": {
    "lat": 13.7401,
    "lng": 100.5607
  },
  "timestamp": "2026-03-22T14:30:22Z",
  "sources": ["camera", "weather", "news", "user_reports", "history"],
  "options": {
    "force_llm": false,
    "skip_cache": false,
    "max_latency_ms": 3000
  }
}
```

Note: The service fetches source data internally based on the location. Callers do not need to provide raw source data. The `sources` field specifies which sources to query (defaults to all five).

**Response (200 OK):**

```json
{
  "evaluation_id": "eval-20260322-143022-b9e1",
  "location": {
    "lat": 13.7401,
    "lng": 100.5607,
    "grid_cell_id": "bkk-13740-10056",
    "display_name": "Sukhumvit Soi 21, Khlong Toei"
  },
  "severity_score": 0.71,
  "severity_level": "HIGH",
  "confidence": 0.88,
  "explanation": "High flood severity at Sukhumvit Soi 21. Camera confirms 15cm standing water. Rainfall at 48.5mm/h with upward trend. Historical data shows frequent flooding with poor drainage.",
  "recommended_action": "avoid_route",
  "signals_used": [
    { "source": "camera", "weight": 0.30, "value": 0.87 },
    { "source": "weather", "weight": 0.25, "value": 0.72 },
    { "source": "news", "weight": 0.15, "value": 0.92 },
    { "source": "user_reports", "weight": 0.15, "value": 0.70 },
    { "source": "history", "weight": 0.15, "value": 0.65 }
  ],
  "processing_time_ms": 1847,
  "cache_hit": false,
  "model_version": "flood-eval-v2.3"
}
```

**Response (422 Unprocessable Entity):**

```json
{
  "error": "insufficient_sources",
  "message": "At least 2 data sources are required. Only 1 source (weather) returned valid data.",
  "available_sources": ["weather"],
  "failed_sources": [
    { "source": "camera", "reason": "timeout" },
    { "source": "news", "reason": "no_relevant_articles" },
    { "source": "user_reports", "reason": "none_in_area" },
    { "source": "history", "reason": "no_record_for_grid_cell" }
  ]
}
```

### 7.2 GET /api/flood/evaluation/{id}

Retrieve a previously computed evaluation by its ID.

**Request:**

```http
GET /api/flood/evaluation/eval-20260322-143022-b9e1 HTTP/1.1
Authorization: Bearer <service-token>
```

**Response (200 OK):**

```json
{
  "evaluation_id": "eval-20260322-143022-b9e1",
  "location": {
    "lat": 13.7401,
    "lng": 100.5607,
    "grid_cell_id": "bkk-13740-10056",
    "display_name": "Sukhumvit Soi 21, Khlong Toei"
  },
  "severity_score": 0.71,
  "severity_level": "HIGH",
  "confidence": 0.88,
  "explanation": "High flood severity at Sukhumvit Soi 21. Camera confirms 15cm standing water. Rainfall at 48.5mm/h with upward trend. Historical data shows frequent flooding with poor drainage.",
  "recommended_action": "avoid_route",
  "signals_used": [
    { "source": "camera", "weight": 0.30, "value": 0.87 },
    { "source": "weather", "weight": 0.25, "value": 0.72 },
    { "source": "news", "weight": 0.15, "value": 0.92 },
    { "source": "user_reports", "weight": 0.15, "value": 0.70 },
    { "source": "history", "weight": 0.15, "value": 0.65 }
  ],
  "hybrid_score_breakdown": {
    "rule_score": 0.68,
    "rule_weight": 0.30,
    "llm_score": 0.74,
    "llm_weight": 0.50,
    "feedback_score": 0.70,
    "feedback_weight": 0.20,
    "final_score": 0.71
  },
  "processing_time_ms": 1847,
  "cache_hit": false,
  "model_version": "flood-eval-v2.3",
  "llm_model_used": "gpt-4o-mini",
  "created_at": "2026-03-22T14:30:24Z",
  "expires_at": "2026-03-22T15:00:24Z"
}
```

**Response (404 Not Found):**

```json
{
  "error": "not_found",
  "message": "Evaluation eval-20260322-999999-xxxx not found or has expired."
}
```

### 7.3 POST /api/flood/batch-evaluate

Evaluate flood severity for multiple locations in a single request.

**Request:**

```http
POST /api/flood/batch-evaluate HTTP/1.1
Content-Type: application/json
Authorization: Bearer <service-token>

{
  "locations": [
    { "lat": 13.7401, "lng": 100.5607 },
    { "lat": 13.7455, "lng": 100.5340 },
    { "lat": 13.7280, "lng": 100.5150 },
    { "lat": 13.7520, "lng": 100.5420 }
  ],
  "timestamp": "2026-03-22T14:30:22Z",
  "options": {
    "max_locations": 50,
    "parallel": true,
    "max_latency_ms": 10000
  }
}
```

**Response (200 OK):**

```json
{
  "batch_id": "batch-20260322-143022-c4d2",
  "total_locations": 4,
  "completed": 4,
  "failed": 0,
  "results": [
    {
      "evaluation_id": "eval-20260322-143022-b9e1",
      "location": { "lat": 13.7401, "lng": 100.5607 },
      "severity_score": 0.71,
      "severity_level": "HIGH",
      "confidence": 0.88,
      "recommended_action": "avoid_route",
      "cache_hit": false
    },
    {
      "evaluation_id": "eval-20260322-143023-e3a7",
      "location": { "lat": 13.7455, "lng": 100.5340 },
      "severity_score": 0.35,
      "severity_level": "LOW",
      "confidence": 0.92,
      "recommended_action": "warn",
      "cache_hit": true
    },
    {
      "evaluation_id": "eval-20260322-143023-f1b0",
      "location": { "lat": 13.7280, "lng": 100.5150 },
      "severity_score": 0.12,
      "severity_level": "NONE",
      "confidence": 0.95,
      "recommended_action": "ignore",
      "cache_hit": true
    },
    {
      "evaluation_id": "eval-20260322-143024-a2c8",
      "location": { "lat": 13.7520, "lng": 100.5420 },
      "severity_score": 0.83,
      "severity_level": "CRITICAL",
      "confidence": 0.79,
      "recommended_action": "block_road",
      "cache_hit": false
    }
  ],
  "total_processing_time_ms": 4231,
  "llm_calls_made": 2,
  "cache_hits": 2
}
```

**Response (400 Bad Request):**

```json
{
  "error": "too_many_locations",
  "message": "Batch requests are limited to 50 locations. Received 73.",
  "max_allowed": 50
}
```

### 7.4 GET /api/flood/cache/stats

Return cache performance statistics.

**Request:**

```http
GET /api/flood/cache/stats?window=1h HTTP/1.1
Authorization: Bearer <service-token>
```

**Response (200 OK):**

```json
{
  "window": "1h",
  "window_start": "2026-03-22T13:30:00Z",
  "window_end": "2026-03-22T14:30:00Z",
  "total_requests": 1247,
  "cache_hits": 831,
  "cache_misses": 416,
  "hit_rate": 0.666,
  "cache_size": 3482,
  "cache_max_size": 10000,
  "evictions": 14,
  "avg_cached_response_time_ms": 12,
  "avg_uncached_response_time_ms": 1923,
  "estimated_cost_saved_usd": 8.32,
  "llm_calls_skipped_by_rules": 187,
  "entries_by_weather_bucket": {
    "none": 102,
    "light": 890,
    "moderate": 1456,
    "heavy": 1034
  }
}
```

---

## 8. Scaling & Performance

### Latency Targets

| Operation | Target (p50) | Target (p95) | Target (p99) |
|---|---|---|---|
| Single evaluation (cache hit) | 15ms | 50ms | 100ms |
| Single evaluation (rule-only, LLM skipped) | 200ms | 500ms | 800ms |
| Single evaluation (with LLM call) | 1500ms | 2500ms | 3500ms |
| Batch evaluation (50 locations) | 5000ms | 8000ms | 12000ms |

### LLM Caching Strategy

Cache key computation:

```python
def compute_cache_key(location, weather, timestamp):
    grid_cell = snap_to_grid(location.lat, location.lng, resolution_m=100)
    weather_bucket = classify_weather(weather.rainfall_mm_per_hour)
    # "none" < 5, "light" 5-20, "moderate" 20-50, "heavy" > 50
    time_window = floor_to_interval(timestamp, minutes=30)
    return f"{grid_cell}:{weather_bucket}:{time_window}"
```

- **Grid resolution:** 100m. Bangkok metro area has approximately 50,000 grid cells. During a flood event, roughly 2,000-5,000 cells are actively monitored.
- **Weather buckets:** 4 discrete levels to prevent cache fragmentation from minor rainfall fluctuations.
- **Time window:** 30-minute windows. A cache entry computed at 14:05 is valid until 14:30.
- **Expected cache hit rate:** 60-70% during active flood events (many requests for the same hot-spot locations within the same weather window).
- **Cache storage:** Redis with LRU eviction. Max 10,000 entries. Each entry is approximately 1KB. Total memory: ~10MB.
- **TTL:** 30 minutes (aligned with time window boundaries).
- **Version tagging:** Each cache entry includes `model_version`. On model update, all cached entries with the old version are invalidated.

### Cost Optimization

| Optimization | Mechanism | Estimated Savings |
|---|---|---|
| Rule-based skip | Skip LLM when rule confidence > 0.9 | ~40% of LLM calls |
| LLM caching | Cache by grid+weather+time | ~60-70% of remaining calls |
| Model routing | Use GPT-4o-mini for simple cases | ~75% cost reduction per call vs GPT-4o |
| Token compression | Limit context to 1500 tokens | ~30% fewer input tokens |

**Estimated cost at scale:**
- 10,000 evaluations/day during a major flood event.
- After optimizations: ~1,800 actual LLM calls/day.
- ~1,500 GPT-4o-mini calls ($0.15/1K input + $0.60/1K output, ~800 input + 150 output tokens): ~$0.31/day.
- ~300 GPT-4o calls ($2.50/1K input + $10.00/1K output, ~800 input + 150 output tokens): ~$1.05/day.
- Total estimated LLM cost: ~$1.36/day during active events. ~$0.20/day during quiet periods.

### Rate Limiting

- **LLM API calls:** Max 100 calls/minute to OpenAI. Enforced by a token bucket with burst capacity of 20.
- **Evaluation API:** Max 500 requests/minute per client. Max 2,000 requests/minute globally.
- **Batch API:** Max 10 batch requests/minute per client. Each batch limited to 50 locations.

### Horizontal Scaling

The Flood Evaluation Service is stateless. All state lives in:
- Redis (cache).
- PostgreSQL/PostGIS (flood points, historical data).
- External APIs (weather, camera, news).

Scaling strategy:
- Deploy behind a load balancer (Kubernetes Ingress or AWS ALB).
- Auto-scale pods based on request queue depth and p95 latency.
- Minimum 2 replicas for availability. Scale to 10 during major events.
- Each replica can handle ~200 evaluations/minute (bottleneck is LLM call latency).

---

## 9. Failure Modes & Mitigation

| Failure Mode | Detection | Impact | Mitigation | Recovery |
|---|---|---|---|---|
| **LLM API timeout** | Response time > 8s | Evaluation delayed | Return rule-based score immediately with `confidence *= 0.85`. Set `llm_model_used = "timeout-fallback"`. | Automatic. LLM calls resume on next request. |
| **LLM API down** | 3 consecutive failures or error rate > 50% in 1 min | No LLM scoring | Circuit breaker opens. All evaluations use rule-only mode. | Circuit breaker half-opens after 60s. Probe with single request. Close if successful. |
| **LLM hallucination** | Output validation fails (score out of range, nonsensical explanation) | Incorrect severity | Clamp score to [0, 1]. If delta > 0.3 from expected range, discard LLM result. Cross-check explanation against input data. | Log for prompt engineering review. |
| **All data sources unavailable** | Source count < 2 | Cannot evaluate | Return HTTP 422 with `"insufficient_sources"`. Do NOT cache. Do NOT update Flood Point DB. | Retry on next evaluation cycle (typically 30s-5min). |
| **Single source unavailable** | Source adapter returns error/timeout | Reduced accuracy | Proceed with available sources. Reduce confidence proportionally. Note missing source in response. | Automatic on next cycle. |
| **Cache poisoning** | Stale or incorrect data served from cache | Wrong severity propagated | TTL-based expiry (30 min). Version-tagged entries invalidated on model update. Manual cache flush endpoint for operators. | Flush affected cache entries. Re-evaluate. |
| **Cost spike** | LLM spend > $50/hour (monitored via billing API) | Budget exceeded | Circuit breaker for cost: switch to rule-only mode. Alert on-call engineer via PagerDuty. | Auto-reset after 15 min if cost drops below $25/hour. Manual override available. |
| **Prompt injection via news/user report** | Regex detection of injection patterns | LLM produces manipulated output | Sanitize all text inputs: strip special characters, remove instruction-like sequences. Validate LLM output against expected ranges. | Log the injection attempt. Quarantine the source. |
| **Database unavailable (PostGIS)** | Connection pool exhausted or query timeout | Cannot store evaluations, cannot fetch history | Serve evaluations without historical data (reduced accuracy). Buffer evaluation results in Redis, flush to DB on recovery. | Automatic reconnection with exponential backoff. |
| **Stale weather data** | Weather API returns data > 15 min old | Assessment based on outdated conditions | Accept but mark `data_freshness_warning: true`. Reduce weather reliability by 50%. | Automatic on next weather API poll. |

### Degradation Hierarchy

When components fail, the system degrades gracefully in this order:

```
Full System (all 5 sources + LLM + feedback)
    ↓ LLM fails
Rule-based + Feedback (3 components, reduced accuracy)
    ↓ Feedback unavailable
Rule-based only (deterministic, lower confidence)
    ↓ Fewer than 2 sources
Service unavailable (return 422, routing uses last known state)
```

At each degradation level, the response includes a `degradation_level` field (`"full"`, `"no_llm"`, `"rule_only"`, `"unavailable"`) so downstream consumers can adjust their behavior.

---

## 10. Observability

### Metrics (Prometheus)

| Metric Name | Type | Labels | Description |
|---|---|---|---|
| `flood_eval_requests_total` | Counter | `endpoint`, `status` | Total evaluation requests |
| `flood_eval_latency_ms` | Histogram | `endpoint`, `cache_hit`, `llm_used` | End-to-end evaluation latency |
| `flood_eval_llm_calls_total` | Counter | `model`, `status` | LLM API calls (success/failure/timeout) |
| `flood_eval_llm_latency_ms` | Histogram | `model` | LLM call latency only |
| `flood_eval_cache_hits_total` | Counter | `weather_bucket` | Cache hit count |
| `flood_eval_cache_misses_total` | Counter | `weather_bucket` | Cache miss count |
| `flood_eval_severity_score` | Histogram | `grid_cell_region` | Distribution of severity scores |
| `flood_eval_confidence` | Histogram | `source_count` | Distribution of confidence values |
| `flood_eval_sources_available` | Histogram | — | Distribution of available source count per request |
| `flood_eval_rule_skip_total` | Counter | — | Times LLM was skipped due to high rule confidence |
| `flood_eval_cost_usd` | Counter | `model` | Estimated LLM cost in USD |
| `flood_eval_degradation_total` | Counter | `level` | Count of degraded evaluations |

### Structured Logging

Every evaluation produces a structured log entry:

```json
{
  "level": "info",
  "service": "flood-evaluation-engine",
  "event": "evaluation_complete",
  "evaluation_id": "eval-20260322-143022-b9e1",
  "grid_cell_id": "bkk-13740-10056",
  "severity_score": 0.71,
  "severity_level": "HIGH",
  "confidence": 0.88,
  "llm_model_used": "gpt-4o-mini",
  "cache_hit": false,
  "sources_available": 5,
  "processing_time_ms": 1847,
  "llm_latency_ms": 1203,
  "rule_score": 0.68,
  "llm_score": 0.74,
  "feedback_score": 0.70,
  "degradation_level": "full",
  "timestamp": "2026-03-22T14:30:24Z"
}
```

LLM prompts and responses are logged separately at `debug` level with PII/location data redacted in production. Full prompts are available in staging/dev environments for debugging.

### Alerts (PagerDuty / Slack)

| Alert | Condition | Severity | Channel |
|---|---|---|---|
| High evaluation latency | p95 latency > 5s for 5 min | Warning | Slack #flood-eval-alerts |
| LLM error rate spike | LLM error rate > 5% for 3 min | Critical | PagerDuty on-call |
| Low cache hit rate | Cache hit rate < 40% for 15 min | Warning | Slack #flood-eval-alerts |
| Cost budget exceeded | LLM cost > $50/hour | Critical | PagerDuty on-call + Slack #cost-alerts |
| Service degradation | Degradation level != "full" for > 10 min | Warning | Slack #flood-eval-alerts |
| Source outage | Any source unavailable for > 5 min | Warning | Slack #data-sources |
| Evaluation volume spike | > 3x normal volume for time of day | Info | Slack #flood-eval-alerts |
| Severity distribution anomaly | > 80% of evaluations are HIGH/CRITICAL for > 30 min | Warning | Slack #flood-eval-alerts (may indicate real event or system error) |

### Dashboards (Grafana)

**Dashboard 1: Real-Time Evaluation Map**
- Geographic heatmap of Bangkok showing severity scores by grid cell.
- Color-coded: green (NONE), yellow (LOW), orange (MEDIUM), red (HIGH), dark red (CRITICAL).
- Updated every 30 seconds.
- Click on a cell to see full evaluation details.

**Dashboard 2: System Health**
- Panel 1: Request rate (requests/minute) with cache hit overlay.
- Panel 2: Latency percentiles (p50, p95, p99) over time.
- Panel 3: LLM call rate and error rate.
- Panel 4: Degradation level timeline.
- Panel 5: Cost accumulation (hourly, daily).

**Dashboard 3: Score Analytics**
- Panel 1: Severity score distribution histogram (last 1h, 6h, 24h).
- Panel 2: Confidence distribution histogram.
- Panel 3: Source contribution pie chart (average weight per source across all evaluations).
- Panel 4: Rule vs. LLM vs. Feedback score agreement scatter plot.
- Panel 5: Cache hit rate over time by weather bucket.

---

## 11. Future Improvements

### Short-Term (1-3 months)

- **Fine-tuned flood model.** Distill a small flood-specific model from GPT-4o outputs. Train on 50K+ historical evaluation pairs. Expected benefits: 10x cost reduction, 3x latency reduction, comparable accuracy for common cases. Keep GPT-4o as fallback for edge cases.
- **Prompt optimization via A/B testing.** Run parallel prompt variants on 10% of traffic. Measure accuracy against ground-truth severity (from post-event surveys and satellite imagery). Iterate on prompt wording, scoring guidance, and output format.
- **Feedback loop closure.** Automatically compare predicted severity with actual outcomes (was the road actually flooded? did rerouted users report success?). Use this to recalibrate the hybrid scoring weights weekly.

### Medium-Term (3-6 months)

- **Multi-modal LLM input.** Replace the image-to-caption pipeline with direct image input to GPT-4o's vision capability. This eliminates the captioning bottleneck and lets the LLM reason directly about water levels, vehicle conditions, and road visibility from camera frames.
- **LLM ensemble.** Run 2-3 different models (GPT-4o, Claude, Gemini) in parallel for high-stakes evaluations (rule confidence < 0.4). Take the median severity score. This reduces single-model hallucination risk at the cost of higher latency and spend. Reserve for CRITICAL-adjacent scores only.
- **Streaming evaluation for video.** Instead of evaluating single frames every 30 seconds, process a continuous video stream with a lightweight on-device model that triggers LLM evaluation only when significant changes are detected (water level increase, new vehicle stall, etc.).

### Long-Term (6-12 months)

- **Edge deployment.** Deploy a quantized flood-specific model (from the fine-tuning effort) to edge devices co-located with cameras. Run local evaluation with < 100ms latency. Sync results to the central system. Fall back to cloud LLM for ambiguous cases.
- **Predictive flooding.** Extend the evaluation from "what is the current severity" to "what will the severity be in 1h/3h/6h." Combine weather forecasts, drainage models, and upstream water level sensors. This enables proactive rerouting before flooding occurs.
- **Cross-city generalization.** Abstract the Bangkok-specific components (gazetteer, drainage maps, grid system) into a configuration layer. Deploy the same engine for other flood-prone cities (Jakarta, Mumbai, Ho Chi Minh City) with city-specific configs.
- **Autonomous calibration.** Build a reinforcement learning loop that continuously adjusts hybrid scoring weights, LLM model selection thresholds, and cache TTLs based on evaluation accuracy feedback. Remove the need for manual tuning.
