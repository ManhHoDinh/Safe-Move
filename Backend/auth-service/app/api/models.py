from sqlalchemy import Boolean, Column, Integer, String, BigInteger
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    isActive = Column(Boolean, default=True)
    createdAt = Column(BigInteger)
    name = Column(String)
    role = Column(String)
    phone = Column(String, unique=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    avatarLink = Column(String)
    location = Column(String)  # Có thể cần tùy chỉnh thêm để sử dụng kiểu dữ liệu `Point`
