from typing import List, Optional
from app.api.db import flood_information
from app.api.models import FloodInformation, FloodInformationCreate
from databases import Database
from sqlalchemy import or_, select, insert, update, delete, cast, Text, and_
from uuid import uuid4
from fastapi import HTTPException


async def get_flood_information(
    db: Database,
    search: Optional[str] = None,
    status: Optional[str] = None
) -> List[FloodInformation]:
    query = select([flood_information])

    conditions = []

    # Add search condition if it exists
    if search:
        search_pattern = f"%{search}%"
        conditions.append(
            or_(
                flood_information.c.locationName.ilike(search_pattern),
                flood_information.c.userName.ilike(search_pattern)
            )
        )

    # Add status condition if it exists
    if status:
        conditions.append(cast(flood_information.c.status,
                          Text).ilike(status))  # Cast enum to text

    # If there are conditions, combine them with AND using `and_`
    if conditions:
        query = query.where(and_(*conditions))  # Combine conditions using AND

    results = await db.fetch_all(query)
    return [FloodInformation(**result) for result in results]


async def create_flood_information(db: Database, flood_info: FloodInformationCreate):
    new_flood_info = {
        "_id": str(uuid4()),
        "userName": flood_info.userName,
        "userId": flood_info.userId,
        "location": flood_info.location.dict(),
        "locationName": flood_info.locationName,
        "status": flood_info.status,
        "floodLevel": flood_info.floodLevel,
        "date": flood_info.date,
    }
    print('new_flood_info', new_flood_info)

    query = insert(flood_information).values(new_flood_info)
    await db.execute(query)

    return FloodInformation(**new_flood_info)


async def update_flood_information(db: Database, _id: str, flood_info: FloodInformation):
    query = (
        update(flood_information)
        .where(flood_information.c._id == _id)
        .values(
            userName=flood_info.userName,
            userId=flood_info.userId,
            location=flood_info.location.dict(),
            locationName=flood_info.locationName,
            status=flood_info.status,
            floodLevel=flood_info.floodLevel,
            date=flood_info.date
        )
        .returning(flood_information)
    )

    # Execute the query and fetch the updated result
    result = await db.fetch_one(query)

    if result is None:
        raise HTTPException(
            status_code=404, detail="Flood information not found"
        )

    return FloodInformation(**result)


async def delete_flood_information(db: Database, _id: str):
    query = delete(flood_information).where(flood_information.c._id == _id)

    # Execute the query and get the result
    result = await db.execute(query)

    if result == 0:  # No rows were deleted
        raise HTTPException(
            status_code=404, detail="Flood information not found"
        )

    return {"message": "Flood information deleted successfully"}
