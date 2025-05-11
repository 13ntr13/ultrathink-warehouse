from sqlalchemy.orm import Session
from app.models.base import Base
from app.db.session import engine
from app.models.user import User, UserRole
from app.core.auth import get_password_hash

def init_db() -> None:
    # Создаем все таблицы
    Base.metadata.create_all(bind=engine)

def init_db_data(db: Session) -> None:
    # Проверяем, существует ли уже админ
    admin = db.query(User).filter(User.username == "admin").first()
    if not admin:
        # Создаем начального админа
        admin = User(
            username="admin",
            email="admin@example.com",
            hashed_password=get_password_hash("admin123"),  # В продакшене заменить на безопасный пароль
            full_name="System Administrator",
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(admin)
        db.commit()
        print("Created initial admin user") 