from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class FloodPoint(Base):
    __tablename__ = "flood_points"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    flood_level = Column(Integer, nullable=False)
    expiration_time = Column(datetime, nullable=False)  # Thời gian hết hạn
