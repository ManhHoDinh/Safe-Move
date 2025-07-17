from fastapi import FastAPI
from app.api.auth import router as auth_router
from app.api.database import engine, Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
