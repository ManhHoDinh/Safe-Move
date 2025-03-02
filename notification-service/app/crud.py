from http.client import HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from sqlalchemy import desc
from zoneinfo import ZoneInfo  # Requires Python 3.9+
from datetime import datetime

HANOI_TZ = ZoneInfo('Asia/Ho_Chi_Minh')

def create_notification(db: Session, notification: schemas.NotificationCreate):
    # Convert the incoming data to a dictionary
    notification_data = notification.dict()
    
    # Explicitly set the timestamp to the current time in UTC+7
    notification_data['timestamp'] = datetime.now(HANOI_TZ)
    print(notification_data)
    # Create a Notification instance with the data
    db_notification = models.Notification(**notification_data)
    
    # Add and commit the new notification to the database
    db.add(db_notification)
    db.commit()
    
    # Refresh to get the updated notification (including the generated ID)
    db.refresh(db_notification)
    
    return db_notification
def get_notifications(db: Session, user_id: str, skip: int = 0, limit: int = 100):
    try:
        notifications = db.query(models.Notification)\
            .filter(models.Notification.user_id == user_id)\
            .order_by(models.Notification.timestamp.desc())\
            .offset(0)\
            .limit(100)\
            .all()
        
        for notification in notifications:
            if notification.timestamp:
                notification.timestamp = notification.timestamp.astimezone(HANOI_TZ)
        
        return notifications
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")