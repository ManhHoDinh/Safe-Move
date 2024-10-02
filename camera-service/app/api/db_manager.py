from app.api.db import cameras, database
from app.api.models import Camera


async def get_all_cameras():
    query = cameras.select()
    return await database.fetch_all(query=query)


async def get_camera(id: int):
    # TODO: get camera from database
    return


async def create_camera(payload: Camera):
    # TODO: insert camera to database
    return


async def update_camera(id: int, payload: Camera):
    # TODO: update camera to database
    return
