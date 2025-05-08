from aiogram import Dispatcher, F
from aiogram.types import Message
from db.models import Product
from db.database import AsyncSessionLocal

async def decrease_stock(message: Message):
    args = message.text.split()
    if len(args) != 3:
        await message.reply("❌ Использование: /расход [sku] [кол-во]")
        return
    sku, amount = args[1], int(args[2])
    async with AsyncSessionLocal() as session:
        async with session.begin():
            product = await session.get(Product, sku)
            if product:
                if product.quantity >= amount:
                    product.quantity -= amount
                    await session.commit()
                    await message.reply(f"✅ Остаток {sku} уменьшен на {amount}.")
                else:
                    await message.reply("❌ Недостаточно товара на складе.")
            else:
                await message.reply("❌ Товар не найден.")

def register_outcome_handler(dp: Dispatcher):
    dp.message.register(decrease_stock, commands={"расход"})