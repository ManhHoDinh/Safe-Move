from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import datetime

DATABASE_URL = "postgresql://neondb_owner:KdTQR4Oj2Gzk@ep-bold-moon-a1h2r6vc.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

DetectEngine = create_engine(DATABASE_URL)
DetectSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=DetectEngine)
DetectBase = declarative_base()

# Model definition
class Detection(DetectBase):
    __tablename__ = "detections"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    result = Column(String, nullable=False)
    camera_id = Column(String, nullable=False)

# Pydantic schema
class DetectionCreate(BaseModel):
    result: str
    camera_id: str

class DetectionResponse(BaseModel):
    id: int
    timestamp: datetime.datetime
    result: str
    camera_id: str

    class Config:
        orm_mode = True

# Create tables
DetectBase.metadata.create_all(bind=DetectEngine)
# FastAPI instance
app = FastAPI()


async def create_or_update_detection(detection: DetectionCreate):
    dbDetect = DetectSessionLocal()
    db_detection = dbDetect.query(Detection).filter(Detection.camera_id == detection.camera_id).first()
    if db_detection:
        db_detection.result = detection.result
        db_detection.timestamp = datetime.datetime.utcnow()
    else:
        db_detection = Detection(result=detection.result, camera_id=detection.camera_id)
        dbDetect.add(db_detection)
    dbDetect.commit()
    dbDetect.refresh(db_detection)
    return db_detection

