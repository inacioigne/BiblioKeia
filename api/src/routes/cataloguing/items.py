from fastapi import APIRouter
from src.schemas.bibframe.items import Items_Schema
from src.function.bibframe.Item.item import BfItem
from pyfuseki import FusekiUpdate
from src.function.solr.docItem import DocItem
from src.function.bibframe.Instance.updateInstance import UpdateInstance

router = APIRouter()

@router.post("/items", status_code=201)
async def create_items(request: Items_Schema):
    fuseki_update = FusekiUpdate('http://localhost:3030', 'acervo')

    c = 1
    for item in request.items:
        g = BfItem(item, request.itemOf)
        nt = g.serialize(format='nt')
        G = """
    INSERT DATA {
        GRAPH <https://bibliokeia.com/resources/item/"""+item.item+""">
        { \n"""+nt+"} }" 

        response = fuseki_update.run_sparql(G)
        DocItem(item, request.itemOf)
        UpdateInstance(request.itemOf, item.item)
        #print("ITEM", response.convert())
        g.serialize(f"item{c}.nt")
        #

    return {'msg': 'item criados com sucesso'}