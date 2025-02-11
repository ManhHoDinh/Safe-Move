from fastapi import FastAPI
from app.api.camera import cameras
from app.api.db import metadata, database, engine
from fastapi.middleware.cors import CORSMiddleware
from app.api.kafka import consumer
from app.api.camera import send_email
metadata.create_all(engine)
import asyncio
app = FastAPI(openapi_url="/api/v1/cameras/openapi.json",
              docs_url="/docs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    print("starting up")
    asyncio.create_task(timer_task())
    await database.connect()

async def timer_task():
    while True:
        print("Polling for messages using SASL")
        for message in consumer.poll().values():
            send_email(message[0].value.decode('utf-8'))
            print("Sent email to camera ID: " + message[0].value.decode('utf-8'))
           
        await asyncio.sleep(5) 

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


app.include_router(cameras, tags=['cameras'])
