from fastapi import APIRouter
from src.function.bibframe.Instance.hasItem import HasItem
from src.function.bibframe.Item.graphItem import MakeGraphItems
from src.schemas.bibframe.items import Items_Schema
from src.function.bibframe.Item.item import BfItem
from pyfuseki import FusekiUpdate
from src.function.solr.docItem import DocItem
from src.function.bibframe.Instance.updateInstance import UpdateInstance
from src.schemas.settings import Settings
from pysolr import Solr

settings = Settings()

collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')
solrAcervo = Solr(f'{settings.url}:8983/solr/acervo/', timeout=10)

router = APIRouter()

@router.post("/items", status_code=201)
async def create_items(request: Items_Schema):

    for item in request.items:
        graph = MakeGraphItems(item, request.itemOf)
        responseItem = collectionUpdate.run_sparql(graph)
        upInstance = HasItem(request.itemOf, item.barcode)
        responseInstance = collectionUpdate.run_sparql(upInstance)
        DocItem(item, request.itemOf)

    # fuseki_update = FusekiUpdate('http://localhost:3030', 'acervo')

    # c = 1
    # for item in request.items:
    #     g = BfItem(item, request.itemOf)
    #     nt = g.serialize(format='nt')
    #     G = """
    # INSERT DATA {
    #     GRAPH <https://bibliokeia.com/resources/item/"""+item.item+""">
    #     { \n"""+nt+"} }" 

    #     response = fuseki_update.run_sparql(G)
    #     DocItem(item, request.itemOf)
    #     UpdateInstance(request.itemOf, item.item)
    #     #print("ITEM", response.convert())
    #     g.serialize(f"item{c}.nt")
    #     #


    return {'Item': responseItem.convert(),
            'Instance': responseInstance.convert()} 