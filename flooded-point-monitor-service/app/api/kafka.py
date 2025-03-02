from kafka import KafkaProducer
from kafka import KafkaConsumer
TOPIC_NAME = "send_mail"
# Choose an appropriate SASL mechanism, for instance:
SASL_MECHANISM = 'SCRAM-SHA-256'

producer = KafkaProducer(
    bootstrap_servers=f"kafka-ccea16f-safe-move.b.aivencloud.com:11301",
    sasl_mechanism = SASL_MECHANISM,
    sasl_plain_username = "avnadmin",
    sasl_plain_password = "AVNS_OsP-68XTePwi3PCYavL",
    security_protocol="SASL_SSL",
    ssl_cafile="ca.pem",
)

consumer = KafkaConsumer(
    TOPIC_NAME,
    auto_offset_reset="earliest",
    bootstrap_servers=f"kafka-ccea16f-safe-move.b.aivencloud.com:11301",
    client_id = "CONSUMER_CLIENT_ID",
    group_id = "CONSUMER_GROUP_ID",
    sasl_mechanism = SASL_MECHANISM,
    sasl_plain_username = "avnadmin",
    sasl_plain_password = "AVNS_OsP-68XTePwi3PCYavL",
    security_protocol = "SASL_SSL",
    ssl_cafile = "ca.pem"
)