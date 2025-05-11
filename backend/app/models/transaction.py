from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime
from app.models.base import BaseModel

class Transaction(BaseModel):
    __tablename__ = "transactions"
    __table_args__ = {"schema": "warehouse"}

    product_id = Column(Integer, ForeignKey("warehouse.products.id"), nullable=False)
    transaction_type = Column(String, nullable=False)  # "in" или "out"
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    total_amount = Column(Float, nullable=False)
    notes = Column(String)
    transaction_date = Column(DateTime, nullable=False) 