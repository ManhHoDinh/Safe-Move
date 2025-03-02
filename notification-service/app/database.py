from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = 'postgresql://notification_db_qp7m_user:6cr1PzU6oKptL8pndyMUh2AuqYAjCs4W@dpg-cum61ohopnds73d83ftg-a.singapore-postgres.render.com/notification_db_qp7m'

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
