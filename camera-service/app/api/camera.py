from typing import List
from fastapi import APIRouter

from app.api.models import Camera
from app.api import db_manager

cameras = APIRouter()


@cameras.get('/', response_model=List[Camera])
async def get_cameras():
    return await db_manager.get_all_cameras()


@cameras.get('/{id}', response_model=Camera)
async def get_camera_detail(id: int):
    return await db_manager.get_camera(id)


@cameras.post('/', response_model=Camera, status_code=201)
async def create_camera(payload: Camera):
    return await db_manager.create_camera(payload)


@cameras.put('/{id}', response_model=Camera)
async def update_camera(id: int, payload: Camera):
    return await db_manager.update_camera(id, payload)
