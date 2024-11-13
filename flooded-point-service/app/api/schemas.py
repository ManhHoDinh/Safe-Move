from pydantic import BaseModel
from datetime import datetime

class FloodPointCreate(BaseModel):
    name: str
    latitude: float
    longitude: float
    flood_level: int
    expiration_time: datetime  # Thời gian hết hạn

class FloodPointResponse(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    flood_level: int
    expiration_time: datetime
    class Config:
        orm_mode = True
