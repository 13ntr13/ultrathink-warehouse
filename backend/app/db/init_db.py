from sqlalchemy.orm import Session
from app.models.base import Base
from app.db.session import engine

def init_db() -> None:
    # Создаем все таблицы
    Base.metadata.create_all(bind=engine)

def init_db_data(db: Session) -> None:
    # Здесь можно добавить начальные данные
    pass 