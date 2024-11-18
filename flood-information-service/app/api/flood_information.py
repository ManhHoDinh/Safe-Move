from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from app.api.models import FloodInformation, FloodInformationCreate, EStatus
from app.api import db_manager
from app.api.db import get_db
from sqlalchemy.exc import SQLAlchemyError

flood_information = APIRouter()


@flood_information.get("/", response_model=List[FloodInformation])
async def list_flood_information(
    search: Optional[str] = None,
    status: Optional[EStatus] = None,
    db=Depends(get_db)
) -> List[FloodInformation]:
    return await db_manager.get_flood_information(db, search, status)


@flood_information.post("/", response_model=FloodInformation)
async def create_flood_info(
    flood_info: FloodInformationCreate, db=Depends(get_db)
):
    try:
        new_flood_info = await db_manager.create_flood_information(db, flood_info)
        return new_flood_info
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@flood_information.put("/{_id}", response_model=FloodInformation)
async def update_flood_info(
    _id: str, flood_info: FloodInformation, db=Depends(get_db)
):
    updated_flood_info = await db_manager.update_flood_information(db, _id, flood_info)
    if not updated_flood_info:
        raise HTTPException(
            status_code=404, detail="Flood information not found")
    return updated_flood_info

# Delete flood information entry by id


@flood_information.delete("/{_id}")
async def delete_flood_info(_id: str, db=Depends(get_db)):
    deleted = await db_manager.delete_flood_information(db, _id)
    if not deleted:
        raise HTTPException(
            status_code=404, detail="Flood information not found")
    return {"message": "Flood information deleted successfully"}
