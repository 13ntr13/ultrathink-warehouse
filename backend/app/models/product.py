from sqlalchemy import Column, String, Integer, Float, ForeignKey
from app.models.base import BaseModel

class Product(BaseModel):
    __tablename__ = "products"
    __table_args__ = {"schema": "warehouse"}

    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, default=0)
    category = Column(String)
    supplier = Column(String)
    location = Column(String)
    barcode = Column(String, unique=True)
    sku = Column(String, unique=True) 