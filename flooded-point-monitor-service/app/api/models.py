from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from .database import Base

class FloodPoint(Base):
    __tablename__ = 'flood_points_dbb'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    flood_level = Column(Integer, nullable=False)
    expiration_time = Column(DateTime, default=datetime.utcnow)
    flood_information_id = Column(String, nullable=True)