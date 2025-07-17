from fastapi import FastAPI
from app.api.floodPointAPI import router as flood_point_router, update_flood_points
from app.api.database import engine, Base
import asyncio

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(flood_point_router)

# Khởi động scheduler khi ứng dụng khởi chạy
@app.on_event("startup")
def start_scheduler():
    asyncio.create_task(timer_task())
    
async def timer_task():
    while True:
        print("Thực hiện nhiệm vụ.")
        await update_flood_points()
        await asyncio.sleep(5) 
        print("Xử lý xong.") # Đợi 60 giây trước khi thực hiện nhiệm vụ tiếp theo
