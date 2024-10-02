from pydantic import BaseModel

class Camera(BaseModel):
    name: str
    url: str