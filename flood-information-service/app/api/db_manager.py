import random
from typing import List, Optional
from fastapi import Depends
from app.api.db import flood_information
from app.api.models import FloodInformation, FloodInformationCreate, EStatus
from databases import Database
from sqlalchemy import or_, select, insert, update, delete, cast, Text, and_
from uuid import uuid4
from fastapi import HTTPException, File, UploadFile
from supabase import create_client, Client
import uuid
import json
from datetime import datetime
from app.api.flood_point_db import flood_point_table, FloodPointCreate, get_flood_point_db
import httpx
SUPABASE_URL = "https://evrsgjzzvkcfhtmntiul.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2cnNnanp6dmtjZmh0bW50aXVsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTk4MTg0NSwiZXhwIjoyMDQ3NTU3ODQ1fQ.AS6I-5rlQGzgbOazdegBFBB_yU68l7odtIcd0_TAr3w"
SUPABASE_BUCKET = "flood-image"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


async def create_or_update_flood_point(point: FloodPointCreate):
    flood_db = get_flood_point_db()  # Kết nối cơ sở dữ liệu
    # Tìm điểm hiện có
    existing_query = flood_point_table.select().where(
        (flood_point_table.c.latitude == point.latitude) &
        (flood_point_table.c.longitude == point.longitude)
    )

    existing_point = await flood_db.fetch_one(existing_query)
    # Nếu tồn tại, cập nhật
    if existing_point:
        update_query = (
            flood_point_table.update()
            .where(
                (flood_point_table.c.latitude == point.latitude) &
                (flood_point_table.c.longitude == point.longitude)
            )
            .values(
                name=point.name,
                flood_level=int(point.flood_level),
                expiration_time=point.expiration_time,
            )
        )
        await flood_db.execute(update_query)
    else:
        # Nếu không tồn tại, thêm mới
        insert_query = flood_point_table.insert().values(
            name=point.name,
            latitude=point.latitude,
            longitude=point.longitude,
            flood_level=int(point.flood_level),
            expiration_time=point.expiration_time,
        )
        await flood_db.execute(insert_query)


async def call_flood_detection_api(file: UploadFile = File(...)):
    url = 'https://flooded-traffic-ai-api-new.onrender.com/predict/'
    headers = {'accept': 'application/json'}
    files = {'file': (file.filename, file.file, file.content_type)}

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, files=files)
        if response.status_code == 200:
            return response.json()  # Assuming the response contains flood data
        # else:
        #     raise Exception(f"Failed to get flood status: {
        #                     response.status_code}, {response.text}")


async def create_upload_file(file: UploadFile = File(...)):
    try:
        print(file)
        # Read the file content
        file_content = await file.read()

        # Generate a unique filename to avoid duplication
        unique_filename = f"uploads/{uuid.uuid4()}_{file.filename}"

        # Upload the file to Supabase Storage
        response = supabase.storage.from_(SUPABASE_BUCKET).upload(
            unique_filename, file_content, file_options={
                "contentType": file.content_type}
        )

        # Check if the response has an 'error' attribute or if the upload was successful
        if hasattr(response, 'error') and response.error:
            raise HTTPException(
                status_code=500,
                detail=f"Error uploading file: {response.error['message']}"
            )

        # Get the public URL of the uploaded file
        public_url = supabase.storage.from_(
            SUPABASE_BUCKET).get_public_url(unique_filename)
        print(public_url)
        return {"file_url": public_url}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
        )


async def get_flood_information(
    db: Database,
    search: Optional[str] = None,
    status: Optional[str] = None,
    userId: Optional[str] = None
) -> List[FloodInformation]:
    query = select(flood_information)

    conditions = []

    if search:
        search_pattern = f"%{search}%"
        conditions.append(
            or_(
                flood_information.c.locationName.ilike(search_pattern),
                flood_information.c.userName.ilike(search_pattern)
            )
        )

    if status:
        conditions.append(cast(flood_information.c.status, Text).ilike(status))

    if userId:
        conditions.append(flood_information.c.userId == userId)

    if conditions:
        query = query.where(and_(*conditions))

    results = await db.fetch_all(query)
    processed_results = []

    for result in results:
        result_dict = dict(result)
        if result_dict.get("date") is None:
            result_dict["date"] = datetime.utcnow()
        processed_results.append(result_dict)

    return [FloodInformation(**result) for result in processed_results]


async def create_flood_information(db: Database, flood_info: str, file: UploadFile = File(...)):
    try:
        upload_response = await create_upload_file(file)
        flood_info_data = json.loads(flood_info)
        flood_info_model = FloodInformationCreate(**flood_info_data)
        floodStatus = await call_flood_detection_api(file)
        flood_level = 0 if floodStatus['prediction'] == 'Normal' else 1

        file_url = upload_response["file_url"]
        flood_point = FloodPointCreate(
            name=flood_info_model.locationName,
            latitude=flood_info_model.latitude,
            longitude=flood_info_model.longitude,
            flood_level=flood_level,
            expiration_time=datetime.utcnow()
        )

        status = EStatus.PENDING
        if floodStatus['prediction'] == 'Flooding':
            status = EStatus.APPROVED
        new_flood_info = {
            "_id": str(uuid4()),
            "userName": flood_info_model.userName,
            "userId": flood_info_model.userId,
            "latitude": flood_info_model.latitude,
            "longitude": flood_info_model.longitude,
            "locationName": flood_info_model.locationName,
            "status": status,
            "floodLevel": 1,
            "message": flood_info_model.message,
            "modelDetectFloodLevel": flood_level,
            "url": file_url,
            "date": datetime.utcnow()
        }
        print(new_flood_info)
        query = insert(flood_information).values(new_flood_info)

        await db.execute(query)

        return FloodInformation(**new_flood_info)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


async def update_flood_information(db: Database, _id: str, flood_info: FloodInformation):
    query = (
        update(flood_information)
        .where(flood_information.c._id == _id)
        .values(
            userName=flood_info.userName,
            userId=flood_info.userId,
            latitude=flood_info.latitude,
            longitude=flood_info.longitude,
            locationName=flood_info.locationName,
            status=flood_info.status,
            message=flood_info.message,
            modelDetectFloodLevel=flood_info.modelDetectFloodLevel,
            url=flood_info.url,
            floodLevel=flood_info.floodLevel,
            date=flood_info.date
        )
        .returning(flood_information)
    )

    result = await db.fetch_one(query)

    if result is None:
        raise HTTPException(
            status_code=404, detail="Flood information not found"
        )
    if flood_info.status == EStatus.APPROVED:
        flood_point = FloodPointCreate(
            name=flood_info.locationName,
            latitude=flood_info.latitude,
            longitude=flood_info.longitude,
            flood_level=flood_info.floodLevel,
            expiration_time=flood_info.date
        )
        await create_or_update_flood_point(flood_point)

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
