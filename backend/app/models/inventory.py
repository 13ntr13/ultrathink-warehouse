from sqlalchemy import Column, String, Integer, Float, ForeignKey
from app.models.base import BaseModel

class Inventory(BaseModel):
    __tablename__ = "inventory"

    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False, default=0)
    location = Column(String)
    last_updated = Column(String)
    status = Column(String)  # "in_stock", "low_stock", "out_of_stock" 