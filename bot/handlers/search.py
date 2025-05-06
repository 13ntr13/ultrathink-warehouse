from aiogram import Dispatcher, F
from aiogram.types import Message
from db.models import Product
from sqlalchemy.future import select
from db.database import AsyncSessionLocal

async def search_product(message: Message):
    args = message.text.split()
    if len(args) < 2:
        await message.reply("❌ Укажите SKU для поиска.")
        return
    sku = args[1]
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(Product).where(Product.sku == sku))
        product = result.scalars().first()
        if product:
            await message.reply(f"✅ Найден товар:\nSKU: {product.sku}\nНазвание: {product.name}\nКатегория: {product.category}\nОстаток: {product.quantity}")
        else:
            await message.reply("❌ Товар не найден.")

def register_search_handler(dp: Dispatcher):
    dp.message.register(search_product, commands={"поиск"})