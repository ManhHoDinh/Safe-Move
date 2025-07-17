from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer  # Import bổ sung
from starlette import status

from sqlalchemy.orm import Session
from . import models, schemas, utils
from .database import get_db
from datetime import datetime, timedelta
router = APIRouter()

@router.post("/register", response_model=schemas.UserOut)
def register(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_password = utils.hash_password(user_data.password)
    
    existing_user = db.query(models.User).filter(models.User.phone == user_data.phone).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Phone number already exists")
    
    existing_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    user = models.User(
        name=user_data.name,
        email=user_data.email,
        phone=user_data.phone,
        password=hashed_password,
        role=user_data.role,
        createdAt=int(datetime.now().timestamp())
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user or not utils.verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = utils.create_access_token({"email": user.email, "role": user.role})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/verify-token")
def verify_user_token(token: str):
    # Xác minh token
    token_data = utils.verify_token(token)
    return {"message": "Token is valid", "token_data": token_data, "isActive":True}