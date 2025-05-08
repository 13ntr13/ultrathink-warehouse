from sqlalchemy import Boolean, Column, String
from app.models.base import BaseModel

class User(BaseModel):
    __tablename__ = "users"
    __table_args__ = {"schema": "warehouse"}

    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(100), nullable=False)
    is_active = Column(Boolean, default=True) 