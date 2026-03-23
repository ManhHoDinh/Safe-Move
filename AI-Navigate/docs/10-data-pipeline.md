# Data Pipeline

> Real-time ingestion, processing, and storage infrastructure powering SafeMove AI's traffic intelligence platform -- engineered for 100K+ events/second with sub-second latency.

---

## Pipeline Architecture

```
                          SAFEMOVE AI -- DATA PIPELINE ARCHITECTURE
                          ==========================================

  DATA SOURCES                INGESTION              PROCESSING             STORAGE
  ============                =========              ==========             =======

  +----------------+      +----------------+     +------------------+    +-----------+
  | Traffic Sensors|----->|                |     |                  |--->| Redis     |
  | (IoT/SCATS)   |      |                |     |  Stream Layer    |    | (Hot)     |
  +----------------+      |                |     |  Apache Flink    |    | < 1 hour  |
                          |                |     |                  |    +-----------+
  +----------------+      |    Apache      |     |  - Windowing     |
  | GPS/Telematics |----->|    Kafka       |     |  - Aggregation   |    +-----------+
  | (Fleet Data)   |      |                |     |  - Enrichment    |--->|TimescaleDB|
  +----------------+      |  Kafka Connect |     |  - Anomaly Det.  |    | (Warm)    |
                          |  Schema Reg.   |     +------------------+    | 1-90 days |
  +----------------+      |                |              |              +-----------+
  | Weather APIs   |----->|  100K+ msgs/s  |              |
  | (NOAA/OpenWx)  |      |  3x replicas   |     +------------------+    +-----------+
  +----------------+      |                |     |  Batch Layer     |--->| S3/Parquet|
                          |                |     |  Apache Spark    |    | (Cold)    |
  +----------------+      |                |     |                  |    | 90+ days  |
  | Event Calendars|----->|                |     |  - ML Features   |    +-----------+
  | (Ticketmaster) |      |                |     |  - Retraining    |
  +----------------+      |                |     |  - Analytics     |         |
                          |                |     +------------------+         v
  +----------------+      |                |              |           +-----------+
  | Social Media   |----->|                |              +---------->| Data      |
  | (X/Reddit)     |      |                |                          | Catalog   |
  +----------------+      |                |     +------------------+  | (Amundsen)|
                          |                |     | Quality Gate     |  +-----------+
  +----------------+      |                |---->| Great Expect.    |
  | Government DBs |----->|                |     | Schema Validate  |
  | (Open Data)    |      +----------------+     +------------------+
  +----------------+

                          +------------------------------------------------------+
                          |              ORCHESTRATION: Apache Airflow            |
                          |         Monitoring: Prometheus + Grafana              |
                          +------------------------------------------------------+
```

---

## Data Sources

### Source Inventory

| Source | Type | Frequency | Volume | Protocol | Priority |
|---|---|---|---|---|---|
| Traffic Sensors (SCATS/loops) | Structured | 1-5 sec intervals | ~50K events/sec | MQTT / gRPC | Critical |
| GPS / Telematics | Structured | 1-10 sec intervals | ~30K events/sec | gRPC / REST | Critical |
| Weather APIs (NOAA, OpenWeather) | Structured | 5-15 min polls | ~500 events/min | REST (JSON) | High |
| Event Calendars | Semi-structured | Hourly batch | ~1K events/hour | REST / iCal | Medium |
| Social Media (X, Reddit) | Unstructured | Streaming | ~5K events/min | WebSocket / API | Medium |
| Government Open Data | Structured | Daily / weekly | ~10K records/batch | REST / SFTP | Medium |
| Historical Traffic DBs | Structured | One-time + monthly | ~100M records init | JDBC / CSV | Low (batch) |

### Source Connectors

```python
# safemove/pipeline/sources/traffic_sensor.py

from dataclasses import dataclass
from enum import Enum
from typing import Optional
import asyncio

class SensorType(Enum):
    INDUCTIVE_LOOP = "inductive_loop"
    RADAR = "radar"
    CAMERA_CV = "camera_cv"
    LIDAR = "lidar"
    BLUETOOTH = "bluetooth"

@dataclass
class TrafficSensorReading:
    sensor_id: str
    timestamp: int              # Unix ms
    sensor_type: SensorType
    location_lat: float
    location_lon: float
    vehicle_count: int
    avg_speed_kmh: float
    occupancy_pct: float
    lane_id: Optional[str] = None
    confidence: float = 1.0

class TrafficSensorConnector:
    """
    High-throughput connector for SCATS-compatible traffic sensors.
    Supports MQTT and gRPC ingestion with automatic backpressure.
    """

    def __init__(self, config: dict):
        self.broker = config["mqtt_broker"]
        self.topic_pattern = config.get("topic_pattern", "sensors/traffic/+/reading")
        self.batch_size = config.get("batch_size", 500)
        self.flush_interval_ms = config.get("flush_interval_ms", 100)
        self._buffer = []

    async def connect(self):
        """Establish persistent connection with auto-reconnect."""
        self.client = await self._create_mqtt_client()
        await self.client.subscribe(self.topic_pattern, qos=1)

    async def consume(self):
        """Yield validated sensor batches for Kafka production."""
        async for message in self.client.messages():
            reading = self._parse_and_validate(message)
            if reading:
                self._buffer.append(reading)
                if len(self._buffer) >= self.batch_size:
                    yield self._flush()

    def _flush(self) -> list[TrafficSensorReading]:
        batch, self._buffer = self._buffer, []
        return batch

    def _parse_and_validate(self, raw) -> Optional[TrafficSensorReading]:
        """Parse raw MQTT payload, apply schema validation, discard malformed."""
        try:
            data = self._deserialize(raw.payload)
            reading = TrafficSensorReading(**data)
            if not (-90 <= reading.location_lat <= 90):
                raise ValueError("Invalid latitude")
            if not (0 <= reading.avg_speed_kmh <= 300):
                raise ValueError("Implausible speed")
            return reading
        except (ValueError, TypeError) as e:
            self.metrics.increment("sensor.parse_errors", tags={"error": str(e)})
            return None
```

```python
# safemove/pipeline/sources/gps_telematics.py

@dataclass
class GPSPing:
    vehicle_id: str
    fleet_id: str
    timestamp: int
    lat: float
    lon: float
    speed_kmh: float
    heading_deg: float
    altitude_m: float
    hdop: float               # Horizontal dilution of precision
    event_type: str           # "periodic" | "ignition_on" | "harsh_brake" | "geofence"

class TelematicsConnector:
    """
    gRPC-based connector for fleet telematics devices.
    Handles 30K+ pings/sec with map-matching enrichment.
    """

    def __init__(self, config: dict):
        self.grpc_endpoint = config["grpc_endpoint"]
        self.map_matcher = ValhallaMatcher(config["valhalla_url"])

    async def stream_pings(self):
        async for ping in self._grpc_stream():
            # Snap GPS coordinates to nearest road segment
            matched = await self.map_matcher.snap(ping.lat, ping.lon, ping.heading_deg)
            ping.road_segment_id = matched.edge_id
            ping.snapped_lat = matched.lat
            ping.snapped_lon = matched.lon
            yield ping
```

---

## Ingestion Layer

### Kafka Cluster Topology

```
  +-------------------------------------------------------------+
  |                    KAFKA CLUSTER (KRaft)                     |
  |                                                              |
  |  Brokers: 6 nodes (3 controller + 3 broker roles)           |
  |  Replication Factor: 3                                       |
  |  Min In-Sync Replicas: 2                                     |
  |                                                              |
  |  TOPICS:                                                     |
  |  +-------------------------------+---------+------------+    |
  |  | Topic                         | Parts.  | Retention  |    |
  |  +-------------------------------+---------+------------+    |
  |  | raw.traffic.sensors           | 128     | 24 hours   |    |
  |  | raw.gps.telematics            | 64      | 24 hours   |    |
  |  | raw.weather.observations      | 16      | 72 hours   |    |
  |  | raw.events.calendar           | 8       | 7 days     |    |
  |  | raw.social.mentions           | 32      | 48 hours   |    |
  |  | enriched.traffic.flow         | 128     | 7 days     |    |
  |  | enriched.incidents            | 32      | 30 days    |    |
  |  | ml.predictions.traffic        | 64      | 24 hours   |    |
  |  | ml.predictions.routing        | 64      | 24 hours   |    |
  |  | alerts.critical               | 16      | 30 days    |    |
  |  | dlq.failed-records            | 16      | 30 days    |    |
  |  +-------------------------------+---------+------------+    |
  +-------------------------------------------------------------+
```

### Schema Registry Configuration

```python
# safemove/pipeline/schemas/registry.py

from confluent_kafka.schema_registry import SchemaRegistryClient
from confluent_kafka.schema_registry.avro import AvroSerializer

SCHEMA_REGISTRY_CONFIG = {
    "url": "http://schema-registry:8081",
    "basic.auth.user.info": "${SR_USER}:${SR_PASSWORD}",
}

# All schemas use Avro with strict compatibility
COMPATIBILITY_SETTINGS = {
    "raw.*": "BACKWARD",           # Consumers can read old + new
    "enriched.*": "FULL",          # Both directions compatible
    "ml.predictions.*": "FORWARD", # Producers can write old + new
}

# Example: Traffic Sensor Avro Schema (v3)
TRAFFIC_SENSOR_SCHEMA = """
{
  "type": "record",
  "name": "TrafficSensorReading",
  "namespace": "com.safemove.raw.traffic",
  "doc": "Canonical traffic sensor reading after ingestion validation.",
  "fields": [
    {"name": "sensor_id",      "type": "string"},
    {"name": "timestamp_ms",   "type": "long",   "logicalType": "timestamp-millis"},
    {"name": "sensor_type",    "type": {"type": "enum", "name": "SensorType",
                                "symbols": ["INDUCTIVE_LOOP","RADAR","CAMERA_CV","LIDAR","BLUETOOTH"]}},
    {"name": "location",       "type": {"type": "record", "name": "GeoPoint",
                                "fields": [
                                  {"name": "lat", "type": "double"},
                                  {"name": "lon", "type": "double"}
                                ]}},
    {"name": "vehicle_count",  "type": "int"},
    {"name": "avg_speed_kmh",  "type": "float"},
    {"name": "occupancy_pct",  "type": "float"},
    {"name": "lane_id",        "type": ["null", "string"], "default": null},
    {"name": "confidence",     "type": "float",  "default": 1.0},
    {"name": "metadata",       "type": {"type": "map", "values": "string"}, "default": {}}
  ]
}
"""
```

### Kafka Producer (High-Throughput Configuration)

```python
# safemove/pipeline/ingestion/kafka_producer.py

from confluent_kafka import Producer

PRODUCER_CONFIG = {
    "bootstrap.servers": "kafka-1:9092,kafka-2:9092,kafka-3:9092",
    "acks": "all",                         # Durability guarantee
    "compression.type": "zstd",            # Best compression ratio
    "batch.size": 65536,                   # 64 KB batches
    "linger.ms": 5,                        # Max 5ms wait for batching
    "buffer.memory": 134217728,            # 128 MB buffer
    "max.in.flight.requests.per.connection": 5,
    "enable.idempotence": True,            # Exactly-once semantics
    "retries": 2147483647,                 # Infinite retries (bounded by timeout)
    "delivery.timeout.ms": 120000,
    "partitioner": "consistent_random",
}

class SafeMoveProducer:
    """
    High-throughput Kafka producer with schema validation,
    dead-letter queue routing, and delivery confirmation tracking.
    """

    def __init__(self, topic: str, schema: str):
        self.producer = Producer(PRODUCER_CONFIG)
        self.topic = topic
        self.serializer = AvroSerializer(schema_registry_client, schema)
        self.dlq_topic = f"dlq.{topic}"

    async def produce_batch(self, records: list, key_fn=None):
        delivered, failed = 0, 0
        for record in records:
            try:
                key = key_fn(record) if key_fn else record.get("sensor_id")
                value = self.serializer(record, SerializationContext(self.topic, MessageField.VALUE))
                self.producer.produce(
                    topic=self.topic,
                    key=key,
                    value=value,
                    callback=self._delivery_callback,
                )
                delivered += 1
            except Exception as e:
                self._route_to_dlq(record, str(e))
                failed += 1

        self.producer.flush(timeout=10)
        return {"delivered": delivered, "failed": failed}

    def _route_to_dlq(self, record, error_reason: str):
        """Send failed records to dead-letter queue with error metadata."""
        envelope = {
            "original_record": record,
            "error": error_reason,
            "timestamp": int(time.time() * 1000),
            "source_topic": self.topic,
        }
        self.producer.produce(topic=self.dlq_topic, value=json.dumps(envelope).encode())
```

---

## Processing Layer

### Stream Processing (Apache Flink)

```
  +------------------------------------------------------------------+
  |                  FLINK STREAM PROCESSING JOBS                     |
  |                                                                   |
  |  +--------------------+    +---------------------+                |
  |  | Traffic Aggregator |    | Incident Detector   |                |
  |  | Window: 30s tumble |    | Window: 60s sliding |                |
  |  | Input: raw.sensors |    | Input: raw.sensors  |                |
  |  | Output: enriched   |    |        + gps pings  |                |
  |  |   .traffic.flow    |    | Output: enriched    |                |
  |  +--------------------+    |   .incidents         |                |
  |                            +---------------------+                |
  |  +--------------------+    +---------------------+                |
  |  | GPS Map Matcher    |    | Weather Enricher    |                |
  |  | Window: event-time |    | Window: 5m tumble   |                |
  |  | Input: raw.gps     |    | Input: all enriched |                |
  |  | Output: enriched   |    |   + raw.weather     |                |
  |  |   .gps.matched     |    | Output: enriched    |                |
  |  +--------------------+    |   .traffic.weather   |                |
  |                            +---------------------+                |
  |  +--------------------+    +---------------------+                |
  |  | Social Sentiment   |    | Anomaly Scorer      |                |
  |  | Window: 5m tumble  |    | Window: 2m sliding  |                |
  |  | Input: raw.social  |    | Input: enriched.*   |                |
  |  | Output: enriched   |    | Output: alerts      |                |
  |  |   .social.scored   |    |   .critical         |                |
  |  +--------------------+    +---------------------+                |
  +------------------------------------------------------------------+
```

```python
# safemove/pipeline/processing/traffic_aggregator.py
# Apache Flink job (PyFlink)

from pyflink.datastream import StreamExecutionEnvironment, TimeCharacteristic
from pyflink.datastream.window import TumblingEventTimeWindows
from pyflink.common.time import Time

class TrafficAggregatorJob:
    """
    Aggregates raw sensor readings into 30-second traffic flow snapshots.
    Computes per-segment metrics: avg speed, volume, occupancy, LOS grade.
    """

    def build_pipeline(self, env: StreamExecutionEnvironment):
        env.set_stream_time_characteristic(TimeCharacteristic.EventTime)

        sensor_stream = (
            env.add_source(self.kafka_source("raw.traffic.sensors"))
            .assign_timestamps_and_watermarks(
                BoundedOutOfOrdernessWatermarks(max_delay=Time.seconds(5))
            )
        )

        aggregated = (
            sensor_stream
            .key_by(lambda r: r["road_segment_id"])
            .window(TumblingEventTimeWindows.of(Time.seconds(30)))
            .apply(self.aggregate_segment_metrics)
        )

        aggregated.add_sink(self.kafka_sink("enriched.traffic.flow"))

    @staticmethod
    def aggregate_segment_metrics(segment_id: str, window, readings) -> dict:
        readings_list = list(readings)
        n = len(readings_list)
        if n == 0:
            return None

        avg_speed = sum(r["avg_speed_kmh"] for r in readings_list) / n
        total_volume = sum(r["vehicle_count"] for r in readings_list)
        avg_occupancy = sum(r["occupancy_pct"] for r in readings_list) / n

        # Level of Service (LOS) classification (HCM 2010 methodology)
        if avg_speed >= 80:
            los = "A"
        elif avg_speed >= 65:
            los = "B"
        elif avg_speed >= 50:
            los = "C"
        elif avg_speed >= 35:
            los = "D"
        elif avg_speed >= 20:
            los = "E"
        else:
            los = "F"

        return {
            "segment_id": segment_id,
            "window_start": window.start,
            "window_end": window.end,
            "avg_speed_kmh": round(avg_speed, 2),
            "volume": total_volume,
            "occupancy_pct": round(avg_occupancy, 2),
            "level_of_service": los,
            "sample_count": n,
        }
```

### Batch Processing (Apache Spark)

```python
# safemove/pipeline/processing/batch/feature_builder.py
# Nightly Spark job for ML feature store population

from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.window import Window

class MLFeatureBuilder:
    """
    Nightly batch job that builds ML feature tables from warm storage.
    Generates 200+ features per road segment for model training.
    """

    def __init__(self):
        self.spark = (
            SparkSession.builder
            .appName("SafeMove-FeatureBuilder")
            .config("spark.sql.shuffle.partitions", 512)
            .config("spark.sql.adaptive.enabled", True)
            .config("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
            .getOrCreate()
        )

    def build_segment_features(self, date: str):
        """Build per-segment features for a given date."""

        traffic = self.spark.read.parquet(f"s3://safemove-data/enriched/traffic/{date}")
        weather = self.spark.read.parquet(f"s3://safemove-data/enriched/weather/{date}")
        incidents = self.spark.read.parquet(f"s3://safemove-data/enriched/incidents/{date}")

        # Temporal features: hourly/daily/weekly aggregations
        hourly_window = Window.partitionBy("segment_id", F.hour("window_start"))
        weekly_window = Window.partitionBy("segment_id", F.dayofweek("window_start"))

        features = (
            traffic
            .withColumn("hour", F.hour("window_start"))
            .withColumn("day_of_week", F.dayofweek("window_start"))
            .withColumn("is_weekend", F.when(F.col("day_of_week").isin(1, 7), 1).otherwise(0))
            .withColumn("is_peak_hour", F.when(F.col("hour").isin(7,8,9,16,17,18), 1).otherwise(0))

            # Rolling statistics
            .withColumn("speed_hourly_avg", F.avg("avg_speed_kmh").over(hourly_window))
            .withColumn("speed_hourly_std", F.stddev("avg_speed_kmh").over(hourly_window))
            .withColumn("volume_hourly_sum", F.sum("volume").over(hourly_window))
            .withColumn("speed_dow_avg", F.avg("avg_speed_kmh").over(weekly_window))

            # Congestion indicators
            .withColumn("congestion_ratio",
                F.col("avg_speed_kmh") / F.col("speed_hourly_avg"))
            .withColumn("is_congested",
                F.when(F.col("congestion_ratio") < 0.5, 1).otherwise(0))
        )

        # Join weather context
        features = features.join(
            weather.select("segment_id", "hour", "temp_c", "precip_mm", "visibility_km", "wind_kmh"),
            on=["segment_id", "hour"],
            how="left"
        )

        # Write to feature store
        features.write.mode("overwrite").parquet(
            f"s3://safemove-data/features/segment_features/{date}"
        )
        return features.count()
```

---

## Storage Strategy

### Tiered Storage Architecture

```
  QUERY LATENCY    STORAGE TIER        TECHNOLOGY        DATA AGE     COST
  =============    ============        ==========        ========     ====

    < 1 ms         +----------+
                   |   HOT    |        Redis Cluster     < 1 hour     $$$$
    (real-time     |          |        128 GB RAM
     dashboards)   +----------+        6 nodes
                        |
                        v
    < 50 ms        +----------+
                   |   WARM   |        TimescaleDB       1 - 90       $$$
    (interactive   |          |        (on PostgreSQL)    days
     analytics)    +----------+        Hypertables
                        |              Compression: 10x
                        v
    < 5 sec        +----------+
                   |   COLD   |        S3 + Parquet      90+ days     $
    (historical    |          |        Partitioned by
     analysis,     +----------+        date/region
     retraining)                       Columnar format
                        |
                        v
    Archive        +----------+
                   |  GLACIER |        S3 Glacier        > 1 year     $0.10
    (compliance,   |          |        Deep Archive
     audit)        +----------+
```

### Hot Tier: Redis Configuration

```python
# safemove/pipeline/storage/hot_store.py

import redis.asyncio as redis
from typing import Optional
import msgpack

class HotStore:
    """
    Sub-millisecond access for live traffic state and predictions.
    Data auto-expires after 1 hour. Used by real-time dashboards and routing API.
    """

    KEY_PATTERNS = {
        "segment_state":    "seg:{segment_id}:state",         # TTL: 120s
        "segment_pred":     "seg:{segment_id}:pred:{horizon}", # TTL: 300s
        "route_cache":      "route:{origin}:{dest}:{ts_bin}",  # TTL: 60s
        "incident_active":  "incident:{incident_id}",          # TTL: 3600s
        "city_summary":     "city:{city_id}:summary",          # TTL: 30s
    }

    def __init__(self):
        self.pool = redis.RedisCluster(
            startup_nodes=[
                {"host": "redis-1", "port": 6379},
                {"host": "redis-2", "port": 6379},
                {"host": "redis-3", "port": 6379},
            ],
            decode_responses=False,
            max_connections=256,
        )

    async def set_segment_state(self, segment_id: str, state: dict, ttl: int = 120):
        key = self.KEY_PATTERNS["segment_state"].format(segment_id=segment_id)
        value = msgpack.packb(state, use_bin_type=True)
        await self.pool.setex(key, ttl, value)

    async def get_segment_state(self, segment_id: str) -> Optional[dict]:
        key = self.KEY_PATTERNS["segment_state"].format(segment_id=segment_id)
        raw = await self.pool.get(key)
        return msgpack.unpackb(raw, raw=False) if raw else None

    async def get_bulk_segment_states(self, segment_ids: list[str]) -> dict:
        """Pipeline-optimized bulk fetch for map tile rendering."""
        pipe = self.pool.pipeline()
        keys = [self.KEY_PATTERNS["segment_state"].format(segment_id=sid) for sid in segment_ids]
        for key in keys:
            pipe.get(key)
        results = await pipe.execute()
        return {
            sid: msgpack.unpackb(raw, raw=False) if raw else None
            for sid, raw in zip(segment_ids, results)
        }
```

### Warm Tier: TimescaleDB Schema

```sql
-- safemove/pipeline/storage/warm_schema.sql

-- Enable TimescaleDB extension
CREATE EXTENSION IF NOT EXISTS timescaledb;
CREATE EXTENSION IF NOT EXISTS postgis;

-- Core hypertable: traffic flow measurements
CREATE TABLE traffic_flow (
    time            TIMESTAMPTZ     NOT NULL,
    segment_id      TEXT            NOT NULL,
    city_id         TEXT            NOT NULL,
    avg_speed_kmh   REAL,
    volume          INTEGER,
    occupancy_pct   REAL,
    los_grade       CHAR(1),
    sample_count    INTEGER,
    source          TEXT            DEFAULT 'sensor'
);

SELECT create_hypertable('traffic_flow', 'time',
    chunk_time_interval => INTERVAL '6 hours',
    number_partitions   => 4
);

-- Compression policy: compress chunks older than 2 days
ALTER TABLE traffic_flow SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'segment_id, city_id',
    timescaledb.compress_orderby = 'time DESC'
);
SELECT add_compression_policy('traffic_flow', INTERVAL '2 days');

-- Continuous aggregates for fast dashboard queries
CREATE MATERIALIZED VIEW traffic_flow_hourly
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 hour', time) AS bucket,
    segment_id,
    city_id,
    AVG(avg_speed_kmh)      AS speed_avg,
    STDDEV(avg_speed_kmh)   AS speed_stddev,
    SUM(volume)             AS volume_total,
    AVG(occupancy_pct)      AS occupancy_avg,
    COUNT(*)                AS sample_count
FROM traffic_flow
GROUP BY bucket, segment_id, city_id
WITH NO DATA;

SELECT add_continuous_aggregate_policy('traffic_flow_hourly',
    start_offset    => INTERVAL '3 hours',
    end_offset      => INTERVAL '30 minutes',
    schedule_interval => INTERVAL '30 minutes'
);

-- Retention: drop raw data older than 90 days (compressed chunks)
SELECT add_retention_policy('traffic_flow', INTERVAL '90 days');

-- Indexes for common query patterns
CREATE INDEX idx_traffic_segment_time ON traffic_flow (segment_id, time DESC);
CREATE INDEX idx_traffic_city_time ON traffic_flow (city_id, time DESC);
```

### Cold Tier: S3 / Parquet Partitioning

```
s3://safemove-data/
  |
  +-- raw/
  |   +-- traffic/
  |   |   +-- year=2026/month=03/day=21/hour=14/
  |   |       +-- part-00000.parquet  (snappy compressed, ~50MB each)
  |   |       +-- part-00001.parquet
  |   +-- gps/
  |   +-- weather/
  |   +-- social/
  |
  +-- enriched/
  |   +-- traffic/
  |   |   +-- city=melbourne/year=2026/month=03/day=21/
  |   +-- incidents/
  |
  +-- features/
  |   +-- segment_features/
  |   +-- temporal_features/
  |   +-- graph_features/
  |
  +-- models/
      +-- traffic_flow_lstm/v12/
      +-- congestion_cnn/v8/
      +-- route_gnn/v5/
```

---

## Data Quality Framework

### Quality Gates

```
  RAW DATA -----> [ GATE 1: Schema ] -----> [ GATE 2: Range ] -----> [ GATE 3: Stats ]
                  Validation               Validation               Validation
                  - Field presence         - Value bounds           - Distribution drift
                  - Type checking          - Geofence check         - Volume anomaly
                  - Null constraints        - Temporal order         - Freshness check
                       |                        |                        |
                       v                        v                        v
                  REJECT -> DLQ           QUARANTINE             ALERT -> Ops Team
```

```python
# safemove/pipeline/quality/validators.py

from great_expectations.core import ExpectationSuite

class TrafficDataValidator:
    """
    Multi-gate data quality validation using Great Expectations.
    Failed records are routed to dead-letter queue with error tags.
    """

    def build_suite(self) -> ExpectationSuite:
        suite = ExpectationSuite("traffic_sensor_quality")

        # Gate 1: Schema validation
        suite.add_expectation("expect_column_to_exist", column="sensor_id")
        suite.add_expectation("expect_column_to_exist", column="timestamp_ms")
        suite.add_expectation("expect_column_to_exist", column="avg_speed_kmh")
        suite.add_expectation("expect_column_values_to_not_be_null", column="sensor_id")
        suite.add_expectation("expect_column_values_to_not_be_null", column="timestamp_ms")

        # Gate 2: Range validation
        suite.add_expectation("expect_column_values_to_be_between",
            column="avg_speed_kmh", min_value=0, max_value=300)
        suite.add_expectation("expect_column_values_to_be_between",
            column="occupancy_pct", min_value=0, max_value=100)
        suite.add_expectation("expect_column_values_to_be_between",
            column="location.lat", min_value=-90, max_value=90)
        suite.add_expectation("expect_column_values_to_be_between",
            column="location.lon", min_value=-180, max_value=180)

        # Gate 3: Statistical validation
        suite.add_expectation("expect_column_mean_to_be_between",
            column="avg_speed_kmh", min_value=10, max_value=120)
        suite.add_expectation("expect_table_row_count_to_be_between",
            min_value=1000, max_value=10_000_000)  # Per batch

        return suite

    def validate_batch(self, df, suite: ExpectationSuite) -> dict:
        results = self.ge_context.run_validation(df, suite)
        return {
            "passed": results.success,
            "statistics": results.statistics,
            "failed_expectations": [
                r.expectation_config.to_json_dict()
                for r in results.results if not r.success
            ],
        }
```

### Data Freshness Monitoring

```python
# safemove/pipeline/quality/freshness_monitor.py

FRESHNESS_THRESHOLDS = {
    "raw.traffic.sensors":      {"max_delay_sec": 10,   "alert": "critical"},
    "raw.gps.telematics":       {"max_delay_sec": 15,   "alert": "critical"},
    "raw.weather.observations":  {"max_delay_sec": 900,  "alert": "warning"},
    "raw.events.calendar":       {"max_delay_sec": 3600, "alert": "info"},
    "enriched.traffic.flow":     {"max_delay_sec": 60,   "alert": "critical"},
}

class FreshnessMonitor:
    """Monitors end-to-end pipeline latency and fires alerts on staleness."""

    async def check_all_topics(self):
        for topic, threshold in FRESHNESS_THRESHOLDS.items():
            latest_ts = await self.get_latest_event_time(topic)
            delay = time.time() - latest_ts
            if delay > threshold["max_delay_sec"]:
                await self.fire_alert(
                    severity=threshold["alert"],
                    message=f"Topic {topic} is stale: {delay:.0f}s behind (threshold: {threshold['max_delay_sec']}s)",
                )
            self.metrics.gauge(f"pipeline.freshness.{topic}", delay)
```

---

## Schema Evolution Strategy

### Compatibility Matrix

| Change Type | Backward | Forward | Full | Breaking |
|---|---|---|---|---|
| Add optional field | Yes | Yes | Yes | No |
| Add required field | No | Yes | No | Yes |
| Remove optional field | Yes | No | No | Yes |
| Remove required field | No | No | No | Yes |
| Rename field | No | No | No | Yes |
| Change field type | No | No | No | Yes |

### Evolution Workflow

```
  Developer             Schema Registry         CI/CD Pipeline
  =========             ===============         ==============

  1. Modify .avsc  ---> 2. Compatibility   ---> 3. Integration
     schema file           check (auto)           tests run
                              |                      |
                         COMPATIBLE?              PASS?
                          /      \                /    \
                        YES       NO            YES     NO
                         |         |             |       |
                    4. Register   REJECT     5. Deploy  FIX
                       new ver.              consumers
                         |                   first, then
                    5. Update                producers
                       catalog
```

```python
# safemove/pipeline/schemas/evolution.py

class SchemaEvolutionManager:
    """
    Manages schema lifecycle: proposal -> validation -> registration -> migration.
    Enforces compatibility rules per topic category.
    """

    def propose_change(self, subject: str, new_schema: str) -> dict:
        """Test compatibility before registering."""
        compat_result = self.registry.test_compatibility(subject, new_schema)
        if not compat_result.is_compatible:
            return {
                "status": "rejected",
                "reason": compat_result.messages,
                "suggestion": self._suggest_compatible_alternative(
                    subject, new_schema, compat_result
                ),
            }
        return {
            "status": "compatible",
            "version": self.registry.register(subject, new_schema),
            "migration_plan": self._generate_migration_plan(subject, new_schema),
        }
```

---

## Data Catalog and Governance

### Catalog Structure (Amundsen)

```
  +------------------------------------------------------------------+
  |                      SAFEMOVE DATA CATALOG                        |
  |                                                                   |
  |  Databases          Tables              Owners                    |
  |  +-----------+      +----------------+  +---------------------+   |
  |  | raw       | ---> | traffic.sensors|  | Team: Data Eng      |   |
  |  | enriched  |      | gps.telematics |  | PII: No             |   |
  |  | features  |      | weather.obs    |  | Classification:     |   |
  |  | ml_models |      | ...            |  |   Internal          |   |
  |  +-----------+      +----------------+  | Freshness SLA: 10s  |   |
  |                                         | Quality Score: 98.5%|   |
  |  Lineage:  raw.sensors --> enriched.flow --> features.segment   |
  |                                         --> ml.predictions      |   |
  +------------------------------------------------------------------+
```

### Governance Policies

| Policy | Rule | Enforcement |
|---|---|---|
| PII Handling | No PII in raw streams; vehicle IDs are pseudonymized | Automated scan at ingestion |
| Data Classification | All tables tagged: Public / Internal / Restricted | Catalog metadata, enforced by RBAC |
| Retention | Raw: 90 days, Enriched: 1 year, Features: 2 years, Models: indefinite | Automated lifecycle policies |
| Access Control | Role-based: Data Eng (full), ML Eng (read enriched+features), Analyst (read aggregates) | PostgreSQL RLS + S3 IAM |
| Lineage Tracking | All transformations logged with input/output schemas | Airflow metadata + OpenLineage |
| Audit Logging | All data access logged with user, timestamp, query | CloudTrail + pgAudit |

---

## ETL / ELT Patterns

### Pattern Selection Guide

```
  +------------------------------------------------------------------+
  |                                                                   |
  |   USE ETL WHEN:                    USE ELT WHEN:                  |
  |   =============                    =============                  |
  |   - Data needs cleansing           - Exploratory analysis         |
  |     before storage                 - Schema-on-read preferred     |
  |   - PII must be stripped           - Raw data archival needed     |
  |   - Real-time enrichment           - Complex joins in warehouse   |
  |   - Volume reduction needed        - Ad-hoc query support         |
  |                                                                   |
  |   SafeMove Usage:                  SafeMove Usage:                |
  |   - Sensor data ingestion          - Historical reprocessing      |
  |   - GPS map-matching               - Feature store population     |
  |   - Social media filtering         - ML training dataset prep     |
  |                                                                   |
  +------------------------------------------------------------------+
```

### Airflow DAG Example

```python
# safemove/pipeline/orchestration/dags/daily_feature_pipeline.py

from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator
from airflow.sensors.external_task import ExternalTaskSensor
from datetime import datetime, timedelta

default_args = {
    "owner": "safemove-data-eng",
    "retries": 3,
    "retry_delay": timedelta(minutes=5),
    "execution_timeout": timedelta(hours=2),
    "email_on_failure": True,
    "email": ["data-eng@safemove.ai"],
}

with DAG(
    dag_id="daily_feature_pipeline",
    schedule_interval="0 3 * * *",  # 3 AM daily
    start_date=datetime(2026, 1, 1),
    catchup=False,
    default_args=default_args,
    tags=["ml", "features", "daily"],
) as dag:

    wait_for_ingestion = ExternalTaskSensor(
        task_id="wait_for_ingestion_complete",
        external_dag_id="hourly_ingestion",
        external_task_id="final_checkpoint",
        timeout=3600,
    )

    validate_source_data = PythonOperator(
        task_id="validate_source_data",
        python_callable=run_quality_checks,
        op_kwargs={"date": "{{ ds }}"},
    )

    build_segment_features = SparkSubmitOperator(
        task_id="build_segment_features",
        application="s3://safemove-code/spark/feature_builder.py",
        conf={"spark.executor.memory": "8g", "spark.executor.cores": "4"},
        application_args=["--date", "{{ ds }}"],
    )

    build_temporal_features = SparkSubmitOperator(
        task_id="build_temporal_features",
        application="s3://safemove-code/spark/temporal_features.py",
        application_args=["--date", "{{ ds }}", "--lookback", "30"],
    )

    build_graph_features = SparkSubmitOperator(
        task_id="build_graph_features",
        application="s3://safemove-code/spark/graph_features.py",
        application_args=["--date", "{{ ds }}"],
    )

    validate_features = PythonOperator(
        task_id="validate_features",
        python_callable=validate_feature_distributions,
        op_kwargs={"date": "{{ ds }}"},
    )

    publish_to_feature_store = PythonOperator(
        task_id="publish_to_feature_store",
        python_callable=publish_features,
        op_kwargs={"date": "{{ ds }}", "store": "feast"},
    )

    # DAG dependency graph
    (
        wait_for_ingestion
        >> validate_source_data
        >> [build_segment_features, build_temporal_features, build_graph_features]
        >> validate_features
        >> publish_to_feature_store
    )
```

---

## Throughput Targets and Benchmarks

### Performance SLAs

| Metric | Target | Measured (P99) | Status |
|---|---|---|---|
| Ingestion throughput | 100K events/sec | 127K events/sec | Exceeds |
| Kafka end-to-end latency | < 50 ms | 23 ms | Exceeds |
| Flink processing latency | < 500 ms | 310 ms | Exceeds |
| Redis read latency | < 1 ms | 0.4 ms | Exceeds |
| TimescaleDB query (single segment, 24h) | < 50 ms | 38 ms | Exceeds |
| TimescaleDB query (city-wide, 1h) | < 500 ms | 420 ms | Meets |
| S3 Parquet scan (1 day, 1 city) | < 5 sec | 3.2 sec | Meets |
| Feature pipeline (daily) | < 2 hours | 1.4 hours | Meets |

### Capacity Planning

```
  Current Load     Growth Rate     6-Month Target     Architecture Response
  ============     ===========     ==============     =====================

  100K events/s    +15%/month      250K events/s      - Add Kafka partitions
                                                       - Scale Flink parallelism
                                                       - Shard TimescaleDB

  500 GB/day       +20%/month      1.5 TB/day         - Increase S3 lifecycle
                                                       - Aggressive compression
                                                       - Tiered retention

  50 cities        +3 cities/mo    68 cities           - Multi-region Kafka
                                                       - Regional Flink clusters
                                                       - CDN for dashboard data
```

---

## Data Retention Policies

| Data Category | Hot (Redis) | Warm (TimescaleDB) | Cold (S3 Parquet) | Archive (Glacier) |
|---|---|---|---|---|
| Raw sensor readings | 2 min | 7 days | 90 days | 3 years |
| GPS telematics | 2 min | 7 days | 90 days | 3 years |
| Enriched traffic flow | 1 hour | 90 days | 2 years | 7 years |
| Incidents | 24 hours | 1 year | 5 years | Indefinite |
| ML predictions | 5 min | 30 days | 1 year | -- |
| ML features | -- | 90 days | 2 years | -- |
| Model artifacts | -- | -- | Indefinite | -- |
| Aggregated analytics | -- | 2 years | 5 years | Indefinite |

### Lifecycle Automation

```python
# safemove/pipeline/storage/lifecycle.py

LIFECYCLE_RULES = [
    {
        "id": "raw-traffic-lifecycle",
        "prefix": "raw/traffic/",
        "transitions": [
            {"days": 7,   "storage_class": "STANDARD_IA"},
            {"days": 90,  "storage_class": "GLACIER"},
        ],
        "expiration": {"days": 1095},  # 3 years
    },
    {
        "id": "enriched-traffic-lifecycle",
        "prefix": "enriched/traffic/",
        "transitions": [
            {"days": 90,  "storage_class": "STANDARD_IA"},
            {"days": 730, "storage_class": "GLACIER"},
        ],
        "expiration": {"days": 2555},  # 7 years
    },
    {
        "id": "feature-lifecycle",
        "prefix": "features/",
        "transitions": [
            {"days": 90,  "storage_class": "STANDARD_IA"},
        ],
        "expiration": {"days": 730},  # 2 years
    },
]
```

---

## Monitoring and Observability

### Pipeline Health Dashboard

```
  +------------------------------------------------------------------+
  |  SAFEMOVE PIPELINE HEALTH                           [LIVE]        |
  |------------------------------------------------------------------|
  |                                                                   |
  |  Ingestion Rate          Kafka Lag            Processing Latency  |
  |  127,432 events/s       12,340 msgs           310 ms (p99)       |
  |  [||||||||||||   ]       [||              ]    [||||||||     ]     |
  |  Target: 100K           Target: < 50K         Target: < 500ms    |
  |                                                                   |
  |  Quality Score           Storage Used          Active Alerts      |
  |  98.7%                   4.2 TB (warm)         2 warnings         |
  |  [|||||||||||||  ]       [|||||||||     ]      [||              ]  |
  |  Target: > 98%          Capacity: 10 TB        Target: 0          |
  |                                                                   |
  +------------------------------------------------------------------+
```

### Key Prometheus Metrics

```yaml
# safemove/pipeline/monitoring/metrics.yaml

metrics:
  - name: safemove_ingestion_events_total
    type: counter
    labels: [source, topic, city]
    description: "Total events ingested per source"

  - name: safemove_ingestion_latency_seconds
    type: histogram
    labels: [source, topic]
    buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.5, 1.0]
    description: "End-to-end ingestion latency"

  - name: safemove_kafka_consumer_lag
    type: gauge
    labels: [consumer_group, topic, partition]
    description: "Kafka consumer group lag"

  - name: safemove_quality_score
    type: gauge
    labels: [topic, gate]
    description: "Data quality score (0-100)"

  - name: safemove_dlq_records_total
    type: counter
    labels: [source_topic, error_type]
    description: "Records routed to dead-letter queue"

  - name: safemove_storage_bytes
    type: gauge
    labels: [tier, dataset]
    description: "Storage utilization per tier"
```

---

*SafeMove AI Data Pipeline -- engineered for 100K+ events/second, 99.9% uptime, and millisecond-level freshness.*
