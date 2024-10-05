from sqlalchemy import insert, update, delete, select
from app.api.models import Camera
from app.api.database import database, cameras

async def get_all_cameras():
    query = cameras.select()
    return await database.fetch_all(query=query)

async def get_camera(id: string):
    query = cameras.select().where(cameras.c.id == id)
    return await database.fetch_one(query=query)

async def create_camera(payload: Camera):
    query = insert(cameras).values(
        name=payload.name,
        url=payload.url,
        createdAt=payload.createdAt,
        updatedAt=payload.updatedAt,
        isActive=payload.isActive,
        location=payload.location,
        address=payload.address,
        floodLevel=payload.floodLevel.value
    )
    camera_id = await database.execute(query)
    return {**payload.dict(), "id": camera_id}

async def update_camera(id: int, payload: Camera):
    query = (
        update(cameras)
        .where(cameras.c.id == id)
        .values(
            name=payload.name,
            url=payload.url,
            updatedAt=payload.updatedAt,
            isActive=payload.isActive,
            location=payload.location,
            address=payload.address,
            floodLevel=payload.floodLevel.value
        )
    )
    await database.execute(query)
    return {**payload.dict(), "id": id}

async def delete_camera(id: int):
    query = delete(cameras).where(cameras.c.id == id)
    await database.execute(query)
    return {"message": "Camera deleted successfully"}
