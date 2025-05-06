from sqlalchemy import Column, String, Integer, Text
from sqlalchemy.ext.asyncio import AsyncAttrs
from db.database import Base

class Product(AsyncAttrs, Base):
    __tablename__ = 'products'
    sku = Column(String(255), primary_key=True)
    name = Column(Text, nullable=False)
    category = Column(Text)
    brand = Column(String(255))
    rack = Column(String(255))
    quantity = Column(Integer, default=0)