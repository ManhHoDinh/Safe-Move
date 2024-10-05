from sqlalchemy import (
    Table,
    Column,
    Integer,
    String,
    Date,
    Boolean,
    Enum,
    MetaData
)
from sqlalchemy.dialects.postgresql import POINT 
import enum

class FloodLevel(enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    danger = "danger"

metadata = MetaData()

cameras = Table(
    'cameras',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String(50)),
    Column('url', String(250)),
    Column('createdAt', Date),
    Column('updatedAt', Date),
    Column('isActive', Boolean),
    Column('location', POINT), 
    Column('address', String(250)),
    Column('floodLevel', Enum(FloodLevel)) 
)
