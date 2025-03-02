from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import engine, SessionLocal
import uvicorn

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Notification Service")

# Dependency để lấy session database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/notifications/", response_model=schemas.NotificationOut)
def send_notification(notification: schemas.NotificationCreate, db: Session = Depends(get_db)):
    return crud.create_notification(db=db, notification=notification)

@app.get("/notifications/{user_id}", response_model=list[schemas.NotificationOut])
def read_notifications(user_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    notifications = crud.get_notifications(db, user_id=user_id, skip=skip, limit=limit)
    if notifications is None:
        raise HTTPException(status_code=404, detail="Notifications not found")
    return notifications

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
