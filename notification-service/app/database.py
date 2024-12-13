from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = 'postgresql://noticationdb_user:bturvHMDcvk8ZpCPxqjDtoNORyTrff0B@dpg-ctdfrcrqf0us73bqcf5g-a.singapore-postgres.render.com/noticationdb'

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
