from sqlalchemy import Boolean, Column, String, Enum, DateTime
from app.models.base import BaseModel
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    WAREHOUSE = "warehouse"
    CASHIER = "cashier"

class User(BaseModel):
    __tablename__ = "users"
    __table_args__ = {"schema": "warehouse"}

    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(100), nullable=False)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.WAREHOUSE)
    is_active = Column(Boolean, default=True)
    full_name = Column(String(100))
    phone = Column(String(20))
    last_login = Column(DateTime, nullable=True)
    password_reset_token = Column(String(100), nullable=True)
    password_reset_expires = Column(DateTime, nullable=True) 