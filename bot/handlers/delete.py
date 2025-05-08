from aiogram import Dispatcher, F
from aiogram.types import Message
from db.models import Product
from db.database import AsyncSessionLocal

async def delete_product(message: Message):
    args = message.text.split()
    if len(args) != 2:
        await message.reply("❌ Использование: /удалить [sku]")
        return
    sku = args[1]
    async with AsyncSessionLocal() as session:
        async with session.begin():
            product = await session.get(Product, sku)
            if product:
                await session.delete(product)
                await session.commit()
                await message.reply(f"✅ Товар {sku} удален.")
            else:
                await message.reply("❌ Товар не найден.")

def register_delete_handler(dp: Dispatcher):
    dp.message.register(delete_product, commands={"удалить"})