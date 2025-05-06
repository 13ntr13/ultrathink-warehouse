from aiogram import Bot, Dispatcher
from aiogram.fsm.storage.memory import MemoryStorage
from dotenv import load_dotenv
import os

# Загрузка переменных из .env
load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")

# Инициализация бота
bot = Bot(token=BOT_TOKEN)
storage = MemoryStorage()
dp = Dispatcher(storage=storage)

# Регистрация обработчиков
from bot.handlers.search import register_search_handler
from bot.handlers.income import register_income_handler
from bot.handlers.outcome import register_outcome_handler
from bot.handlers.add_product import register_add_handler
from bot.handlers.delete import register_delete_handler

register_search_handler(dp)
register_income_handler(dp)
register_outcome_handler(dp)
register_add_handler(dp)
register_delete_handler(dp)

# Запуск бота
if __name__ == "__main__":
    dp.run_polling(bot)