from fastapi import FastAPI
from app.api.floodPointAPI import router as flood_point_router
from app.api.database import engine, Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(flood_point_router)

