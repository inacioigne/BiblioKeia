from fastapi import APIRouter
from src.schemas.bibframe.items import Items_Schema
from src.function.bibframe.Item.item import BfItem

router = APIRouter()

@router.post("/items", status_code=201)
async def create_items(request: Items_Schema):

    c = 1
    for item in request.items:
        g = BfItem(item)
        g.serialize(f"item{c}.nt")
        c += 1

    return {'msg': 'item criados com sucesso'}