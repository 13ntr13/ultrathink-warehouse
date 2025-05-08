from aiogram import Dispatcher, F
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import Message
from db.models import Product
from db.database import AsyncSessionLocal

class AddProduct(StatesGroup):
    sku = State()
    name = State()
    category = State()
    brand = State()
    rack = State()
    quantity = State()

async def start_add(message: Message, state: FSMContext):
    await message.reply("Введите SKU:")
    await state.set_state(AddProduct.sku)

async def process_sku(message: Message, state: FSMContext):
    await state.update_data(sku=message.text)
    await message.reply("Введите название:")
    await state.set_state(AddProduct.name)

async def process_name(message: Message, state: FSMContext):
    await state.update_data(name=message.text)
    await message.reply("Введите категорию:")
    await state.set_state(AddProduct.category)

async def process_category(message: Message, state: FSMContext):
    await state.update_data(category=message.text)
    await message.reply("Введите бренд:")
    await state.set_state(AddProduct.brand)

async def process_brand(message: Message, state: FSMContext):
    await state.update_data(brand=message.text)
    await message.reply("Введите стеллаж:")
    await state.set_state(AddProduct.rack)

async def process_rack(message: Message, state: FSMContext):
    await state.update_data(rack=message.text)
    await message.reply("Введите количество:")
    await state.set_state(AddProduct.quantity)

async def process_quantity(message: Message, state: FSMContext):
    data = await state.get_data()
    try:
        quantity = int(message.text)
        async with AsyncSessionLocal() as session:
            async with session.begin():
                new_product = Product(
                    sku=data["sku"],
                    name=data["name"],
                    category=data["category"],
                    brand=data["brand"],
                    rack=data["rack"],
                    quantity=quantity
                )
                session.add(new_product)
                await session.commit()
                await message.reply("✅ Товар добавлен!")
    except Exception as e:
        await message.reply(f"❌ Ошибка при добавлении товара: {e}")
    await state.clear()

def register_add_handler(dp: Dispatcher):
    dp.message.register(start_add, commands={"добавить"})
    dp.message.register(process_sku, AddProduct.sku)
    dp.message.register(process_name, AddProduct.name)
    dp.message.register(process_category, AddProduct.category)
    dp.message.register(process_brand, AddProduct.brand)
    dp.message.register(process_rack, AddProduct.rack)
    dp.message.register(process_quantity, AddProduct.quantity)