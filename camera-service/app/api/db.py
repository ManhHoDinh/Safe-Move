import os

from sqlalchemy import (Column, DateTime, Integer, MetaData, String, Table,
                        create_engine, ARRAY)

from databases import Database

DATABASE_URI = 'postgresql://movie-service-database_owner:DcMx0NO8ShfQ@ep-muddy-scene-a1mdwe61.ap-southeast-1.aws.neon.tech/movie-service-database?sslmode=require'

engine = create_engine(DATABASE_URI)
metadata = MetaData()

cameras = Table(
    'cameras',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String(50)),
    Column('url', String(250))
)

database = Database(DATABASE_URI)