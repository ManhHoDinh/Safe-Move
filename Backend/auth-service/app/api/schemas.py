from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: str
    phone: str
    password: str
    role: Optional[str]

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: Optional[str]
    class Config:
        orm_mode = True
