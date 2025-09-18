from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db, engine
from app.models import Base, Item
from sqlalchemy.future import select

import asyncio

app = FastAPI(title="CI/CD Demo API")

# Create tables
async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

asyncio.run(init_models())

@app.get("/items")
async def read_items(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Item))
    items = result.scalars().all()
    return items

@app.post("/items")
async def create_item(name: str, db: AsyncSession = Depends(get_db)):
    item = Item(name=name)
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return item