from datetime import datetime, timezone
from typing import Dict, List, Optional

import httpx
from app.api.db import cameras, get_db, follow_camera
from app.api.models import CAMERA_API_URL, Camera, FollowRequest
from databases import Database
from pydantic import ValidationError
from sqlalchemy import insert, or_, select, update, and_, delete
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from fastapi import HTTPException
from uuid import uuid4
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, From, To, TemplateId, Substitution

camera_status = {}


def truncate_string(value: str, max_length: int = 50) -> str:
    if isinstance(value, str) and len(value) > max_length:
        return value[:max_length]
    return value


class DBManager:
    def __init__(self, session: get_db):
        self.session = session

    async def fetch_cameras_from_api(self) -> List[Dict]:
        async with httpx.AsyncClient() as client:
            response = await client.get(CAMERA_API_URL)
            response.raise_for_status()
            data = response.json()
            print(f"Fetched camera data: {data}")
            return data

    async def fetch_cameras(self) -> List[Dict]:
        api_data = await self.fetch_cameras_from_api()

        for camera in api_data:
            stmt = select([cameras.c.id]).where(cameras.c.id == camera['id'])
            result = await self.session.fetch_one(stmt)

            if result is None:
                new_camera_data = {
                    '_id': camera['_id'],
                    'id': camera['id'],
                    'name': truncate_string(camera['name']),
                    'loc': camera['loc'],
                    'values': camera['values'],
                    'dist': truncate_string(camera['dist']),
                    'ptz': camera['ptz'],
                    'angle': camera.get('angle'),
                    'liveviewUrl': truncate_string(camera['liveviewUrl']),
                    'isEnabled': False,
                    'lastmodified':  datetime.utcnow()
                }
                stmt = insert(cameras).values(new_camera_data)
                try:
                    await self.session.execute(stmt)
                except IntegrityError:
                    pass
        stmt = select([cameras])
        result = await self.session.fetch_all(stmt)
        return result


async def get_camera_by_id(db: Database, camera_id: str) -> dict:
    query = select([cameras]).where(cameras.c._id == camera_id)
    result = await db.fetch_one(query)
    return result


async def update_camera_statuses(db: Database, camera_ids: List[str], is_enabled: bool) -> List[dict]:
    updated_cameras = []

    for camera_id in camera_ids:
        query = (
            update(cameras)
            .where(cameras.c.id == camera_id)
            .values(isEnabled=is_enabled, lastmodified=datetime.utcnow())
            .returning(cameras)  # Optional: returns the updated row
        )
        print("3", camera_id)
        result = await db.fetch_one(query)
        if result:
            updated_cameras.append(result)

    return updated_cameras


async def get_camera_list(
    db: Database,
    is_enabled: Optional[bool] = None,
    search: Optional[str] = None
) -> List[Camera]:
    query = select([cameras])

    if is_enabled is not None:
        query = query.where(cameras.c.isEnabled == is_enabled)

    if search:
        search_pattern = f"%{search}%"
        query = query.where(
            or_(
                cameras.c.name.ilike(search_pattern),
                cameras.c.id.ilike(search_pattern),
                cameras.c.dist.ilike(search_pattern)
            )
        )

    results = await db.fetch_all(query)
    return [Camera(**result) for result in results]


async def follow_camera_service(db: Database, request: FollowRequest):
    camera_query = await db.fetch_one(
        select([cameras]).where(cameras.c._id == request.cameraId)
    )
    if camera_query is None:
        raise HTTPException(status_code=404, detail="Camera does not exist")

    follow_query = await db.fetch_one(
        select([follow_camera]).where(
            and_(
                follow_camera.c.cameraId == request.cameraId,
                follow_camera.c.userId == request.userId
            )
        )
    )
    if follow_query is not None:
        raise HTTPException(
            status_code=400, detail="User already following this camera"
        )

    follow_entry = {
        '_id': str(uuid4()),
        'cameraId': request.cameraId,
        'userId': request.userId,
        'userEmail': request.userEmail,
    }
    insert_query = insert(follow_camera).values(follow_entry)
    await db.execute(insert_query)

    return follow_entry


async def unfollow_camera_service(db: Database, _id: str):
    query = delete(follow_camera).where(follow_camera.c._id == _id)

    result = await db.execute(query)

    if result is None:
        raise HTTPException(
            status_code=404, detail="Follow camera  not found"
        )

    return {"message": "Follow camera deleted successfully"}


async def update_flood_status(db: Database, camera_id: str, is_flood: bool):
    # Fetch the camera's current flood status
    camera_query = await db.fetch_one(
        select([cameras]).where(cameras.c._id == camera_id)
    )

    # Check if the camera exists
    if camera_query is None:
        raise HTTPException(status_code=404, detail="Camera does not exist")

    # Extract the current flood status of the camera
    current_flood_status = camera_query.get(
        "is_flood")  # Adjust based on your column name

    # Compare the current flood status with the new `is_flood` parameter
    if current_flood_status == is_flood:
        return {
            "message": "No update needed. The flood status is already up-to-date.",
            "current_status": current_flood_status
        }

    # Update the flood status in the database
    update_query = (
        update(cameras)
        .where(cameras.c._id == camera_id)
        .values(is_flood=is_flood)
    )
    await db.execute(update_query)

    return {
        "message": "Flood status updated successfully.",
        "previous_status": current_flood_status,
        "new_status": is_flood
    }


async def send_email(camera_id: str, db: Database):
    try:
        camera_query = await db.fetch_all(
            select([follow_camera]).where(
                follow_camera.c.cameraId == camera_id)
        )

        if camera_query is None:
            raise HTTPException(
                status_code=404, detail="No matching rows found for the given camera ID")

        # Extract all userEmail addresses from the matching rows
        user_emails = [row["userEmail"]
                       for row in camera_query if "userEmail" in row]

        if user_emails is None:
            raise HTTPException(
                status_code=400, detail="No userEmail addresses found for the given camera ID")

        # Log the matching rows and emails
        print(f"Matching rows: {camera_query}")
        print(f"Emails to send: {user_emails}")

        # Send email to all userEmail addresses
        message = Mail(
            from_email=From('y.levan@ncc.asia', 'Save Move Support'),
            to_emails=[To(email) for email in user_emails],
        )

        message.template_id = 'd-764126dba9db453da61ce904a3afb5b6'

        # Dynamic template data (adjust as per your SendGrid template)
        message.dynamic_template_data = {
            "camera_id": camera_id,
            "message": "This is a notification about the camera you are following.",
        }

        # SendGrid API client
        # Replace with your actual API key
        sg = SendGridAPIClient(
            'SECRECT')
        response = sg.send(message)

        # Log the email response
        print(response.status_code)  # Should print 202 for success
        print(response.body)
        print(response.headers)

        return {
            "message": "Emails sent successfully",
            "email_count": len(user_emails),
            "emails": user_emails,
        }

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send emails")
