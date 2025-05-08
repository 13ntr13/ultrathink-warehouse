from aiogram import Dispatcher, F
from aiogram.types import Message
from db.models import Product
from db.database import AsyncSessionLocal

async def increase_stock(message: Message):
    args = message.text.split()
    if len(args) != 3:
        await message.reply("❌ Использование: /приход [sku] [кол-во]")
        return
    sku, amount = args[1], int(args[2])
    async with AsyncSessionLocal() as session:
        async with session.begin():
            product = await session.get(Product, sku)
            if product:
                product.quantity += amount
                await session.commit()
                await message.reply(f"✅ Остаток {sku} увеличен на {amount}.")
            else:
                await message.reply("❌ Товар не найден.")

def register_income_handler(dp: Dispatcher):
    dp.message.register(increase_stock, commands={"приход"})