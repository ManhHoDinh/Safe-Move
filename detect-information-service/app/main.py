# main.py
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import datetime

# Database configuration
DATABASE_URL = "postgresql://neondb_owner:KdTQR4Oj2Gzk@ep-bold-moon-a1h2r6vc.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Model definition
class Detection(Base):
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
Base.metadata.create_all(bind=engine)

# FastAPI instance
app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/detections/", response_model=DetectionResponse)
def create_or_update_detection(detection: DetectionCreate, db: Session = Depends(get_db)):
    db_detection = db.query(Detection).filter(Detection.camera_id == detection.camera_id).first()
    if db_detection:
        db_detection.result = detection.result
        db_detection.timestamp = datetime.datetime.utcnow()
    else:
        db_detection = Detection(result=detection.result, camera_id=detection.camera_id)
        db.add(db_detection)
    db.commit()
    db.refresh(db_detection)
    return db_detection

@app.get("/detections/", response_model=list[DetectionResponse])
def get_all_detections(db: Session = Depends(get_db)):
    detections = db.query(Detection).all()
    return detections

@app.get("/detections/camera/{camera_id}", response_model=list[DetectionResponse])
def get_detections_by_camera(camera_id: str, db: Session = Depends(get_db)):
    detections = db.query(Detection).filter(Detection.camera_id == camera_id).all()
    return detections
