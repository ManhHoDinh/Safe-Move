from sqlalchemy import Column, Integer, String, DateTime
from .database import Base
from datetime import datetime
from zoneinfo import ZoneInfo

HANOI_TZ = ZoneInfo('Asia/Ho_Chi_Minh')

class Notification(Base):
    __tablename__ = "notifications_db"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    title = Column(String, index=True)
    message = Column(String)
    timestamp = Column(
        DateTime(timezone=True), 
        default=lambda: datetime.now(HANOI_TZ), 
        nullable=False
    )
