from pydantic import BaseModel
from typing import Optional
from enum import Enum

class FloodLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    danger = "danger"

class Camera(BaseModel):
    id: Optional[str]
    name: str
    url: str
    createdAt: Optional[str] 
    updatedAt: Optional[str]
    isActive: bool
    location: tuple
    address: Optional[str]
    floodLevel: FloodLevel
