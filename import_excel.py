import pandas as pd
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

# Загрузка переменных окружения
load_dotenv()

# Подключение к БД
DB_URL = os.getenv("DB_URL")
engine = create_engine(DB_URL)

# Путь к Excel-файлу и лист
file_path = "склад сезон 2025.xlsx"
sheet_name = "Лист3"  # замени, если нужно

# Чтение Excel без шапки
df = pd.read_excel(file_path, sheet_name=sheet_name, header=None)

# Поиск строки с заголовками (например, "SNP", "Наименование")
header_row = None
for i, row in df.iterrows():
    if 'snp' in str(row[0]).lower() or 'sku' in str(row[0]).lower():
        header_row = i
        break

if header_row is not None:
    df.columns = df.iloc[header_row]
    df = df.iloc[header_row + 1:]
else:
    df.columns = [f"col_{i}" for i in range(len(df.columns))]

# Простановка категорий по диапазонам строк Excel
def assign_category(index):
    row_number = index + header_row + 1  # переводим индекс в номер строки в Excel
    if 3 <= row_number <= 19:
        return "Циф.обор."
    elif 21 <= row_number <= 31:
        return "Э.м. клапан"
    elif (33 <= row_number <= 47) or (92 <= row_number <= 120) or (200 <= row_number <= 207):
        return "Муфта"
    elif (48 <= row_number <= 58) or (75 <= row_number <= 76) or (131 <= row_number <= 154) or \
         (159 <= row_number <= 160) or (208 <= row_number <= 214):
        return "Отвод"
    elif (73 <= row_number <= 74) or (155 <= row_number <= 155) or (171 <= row_number <= 175) or \
         (198 <= row_number <= 199):
        return "Заглушка"
    elif (59 <= row_number <= 72) or (78 <= row_number <= 91) or (157 <= row_number <= 158) or \
         (188 <= row_number <= 189) or (191 <= row_number <= 197):
        return "Тройник"
    elif (216 <= row_number <= 219) or (121 <= row_number <= 130):
        return "Седло"
    elif (161 <= row_number <= 170) or (177 <= row_number <= 186):
        return "Ниппель"
    elif 232 <= row_number <= 253:
        return "Ротор Спрей"
    elif 255 <= row_number <= 290:
        return "Сопло Форсунка"
    elif (5221 <= row_number <= 230) or (292 <= row_number <= 316) or (318 <= row_number <= 340):
        return "Кап.Полив"
    elif 342 <= row_number <= 346:
        return "Фильтр"
    elif 348 <= row_number <= 360:
        return "Короб"
    elif 362 <= row_number <= 364:
        return "Кран Шар."
    elif 366 <= row_number <= 378:
        return "Расходники"
    else:
        return "Разное"

# Назначаем нужные столбцы по индексу
df['brand'] = df.iloc[:, 0]     # A — бренд
df['name'] = df.iloc[:, 1]      # B — наименование
df['rack'] = df.iloc[:, 2]       # C — стеллаж
df['quantity'] = df.iloc[:, 10]  # K — остаток
df['category'] = df.reset_index().index.map(assign_category)  # назначаем категорию по строке

# Выбор только нужных колонок
df = df[['brand', 'name', 'rack', 'quantity', 'category']].copy()

# Очистка данных
df.dropna(subset=['brand', 'name'], inplace=True)
df['quantity'] = pd.to_numeric(df['quantity'], errors='coerce').fillna(0).astype(int)

# Генерация SKU (временно уникальный ID)
df['sku'] = df.index.astype(str).str.zfill(6)

# Переставляем колонки под таблицу products
df = df[['sku', 'brand', 'name', 'category', 'rack', 'quantity']].copy()

# Удаление старой таблицы и создание новой (если нужно)
with engine.connect() as conn:
    conn.execute(text("DROP TABLE IF EXISTS products;"))
    conn.execute(text("""
        CREATE TABLE products (
            sku TEXT PRIMARY KEY,
            brand TEXT NOT NULL,
            name TEXT NOT NULL,
            category TEXT,
            rack TEXT,
            quantity INTEGER DEFAULT 0
        );
    """))

# Сохранение в БД
df.to_sql("products", engine, if_exists="append", index=False)

print("✅ Данные успешно импортированы в таблицу `products`!")