from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.core.config import settings
from app.db.session import get_db, SessionLocal
from app.db.init_db import init_db, init_db_data

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # В продакшене заменить на конкретные домены
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    # Инициализация базы данных при запуске
    init_db()
    db = SessionLocal()
    try:
        init_db_data(db)
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to UltraThink Warehouse API"}

@app.get("/db-test")
async def test_db(db: Session = Depends(get_db)):
    try:
        # Простой тест подключения к БД
        db.execute("SELECT 1")
        return {"message": "Database connection successful"}
    except Exception as e:
        return {"error": f"Database connection failed: {str(e)}"} 