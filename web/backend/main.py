from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import pandas as pd
from io import BytesIO
from db.database import AsyncSessionLocal
from db.models import Product
from sqlalchemy import select

app = FastAPI()

@app.get("/api/products")
async def get_products():
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(Product))
        products = result.scalars().all()

    return [{
        "sku": p.sku,
        "name": p.name,
        "category": p.category,
        "quantity": p.quantity,
        "price": p.price
    } for p in products]

@app.get("/api/report/excel")
async def export_excel():
    data = await get_products()
    df = pd.DataFrame(data)

    bio = BytesIO()
    with pd.ExcelWriter(bio, engine='xlsxwriter') as writer:
        df.to_excel(writer, index=False, sheet_name='Склад')

    excel_data = bio.getvalue()
    response = StreamingResponse(iter([excel_data]), media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    response.headers["Content-Disposition"] = "attachment; filename=отчет_по_складу.xlsx"
    return response