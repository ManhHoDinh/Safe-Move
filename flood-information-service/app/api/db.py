from datetime import datetime
from databases import Database
from sqlalchemy import (Column, DateTime, Integer, Float,
                        MetaData, String, Table, create_engine)
from app.api.models import EStatus
from sqlalchemy import Enum as SQLAlchemyEnum

DATABASE_URI = 'postgresql://cameras_owner:vgQ6znmdqUo4@ep-holy-unit-a168mnk4.ap-southeast-1.aws.neon.tech/cameras?sslmode=require'

engine = create_engine(DATABASE_URI)
metadata = MetaData()

flood_information = Table(
    'flood_information_dbb',
    metadata,
    Column('_id', String, primary_key=True),
    Column('userName', String(100), nullable=False),
    Column('userId', String, nullable=False),
    Column('latitude', Float, nullable=False),
    Column('longitude', Float, nullable=False),
    Column('locationName', String(100)),
    Column('date', DateTime, default=datetime.utcnow),
    Column('status', SQLAlchemyEnum(
        EStatus, name="status_enum"), nullable=False),
    Column('floodLevel', Integer, nullable=False),
    Column('modelDetectFloodLevel', Integer, nullable=False),
    Column('message', String, nullable=False),
    Column('url', String, nullable=False),
)

database = Database(DATABASE_URI)


async def get_db():
    return database
