from pydantic import BaseModel
from datetime import datetime

class FloodPointCreate(BaseModel):
    name: str
    latitude: float
    longitude: float
    flood_level: int
    expiration_time: datetime  # Thời gian hết hạn
    flood_information_id: str = None

class FloodPointResponse(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    flood_level: int
    expiration_time: datetime
    flood_information_id: str = None
    class Config:
        orm_mode = True
