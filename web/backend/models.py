from sqlalchemy import Column, String, Integer
from db.database import Base

class Product(Base):
    __tablename__ = 'products'
    sku = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    category = Column(String)
    quantity = Column(Integer, default=0)
    rack = Column(String)