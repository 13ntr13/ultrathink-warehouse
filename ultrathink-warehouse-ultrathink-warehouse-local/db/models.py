from sqlalchemy import Column, Integer, String
from db.database import Base

class Product(Base):
    __tablename__ = "products"
    sku = Column(String, primary_key=True)
    brand = Column(String)
    name = Column(String, nullable=False)
    category = Column(String)
    rack = Column(String)
    quantity = Column(Integer, default=0)