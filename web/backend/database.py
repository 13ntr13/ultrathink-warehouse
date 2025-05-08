from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()
DB_URL = os.getenv("DB_URL")

engine = create_async_engine(DB_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Для миграции
from sqlalchemy import text

async def init_db():
    async with engine.begin() as conn:
        await conn.execute(text("""
            CREATE TABLE IF NOT EXISTS products (
                sku TEXT PRIMARY KEY,
                brand TEXT NOT NULL,
                name TEXT NOT NULL,
                category TEXT,
                rack TEXT,
                quantity INTEGER DEFAULT 0
            );
        """))