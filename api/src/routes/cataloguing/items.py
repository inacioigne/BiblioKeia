from fastapi import APIRouter
from src.function.bibframe.Instance.hasItem import HasItem
from src.function.bibframe.Item.graphItem import MakeGraphItems
from src.schemas.bibframe.items import Items_Schema
from pyfuseki import FusekiUpdate
from src.function.solr.docItem import DocItem
from src.function.cataloguing.generate_id import GenerateId
from src.schemas.settings import Settings
from pysolr import Solr
from datetime import datetime

settings = Settings()

collection = FusekiUpdate(f'{settings.url}:3030', 'collection')
solrAcervo = Solr(f'{settings.url}:8983/solr/collection/', timeout=10)

router = APIRouter()

@router.post("/items", status_code=201)
async def create_items(request: Items_Schema):

    for item in request.items: 
        item.adminMetadata.generationDate = datetime.now()
        response = GenerateId()
        id = response['id']
        graph = MakeGraphItems(item, request.itemOf, id)
        responseItem = collection.run_sparql(graph)
        upInstance = HasItem(request.itemOf.uri, id)
        responseInstance = collection.run_sparql(upInstance)
        DocItem(item, request.itemOf, id)

    return {'Item': responseItem.convert(),
            'Instance': responseInstance.convert()} 

@router.delete("/items", status_code=200)
async def create_items(id: str):
    item = f'https://bibliokeia.com/resources/item/{id}'

    deleteItem = f"""DELETE {{ graph <{item}> 
        {{ ?s ?p ?o }} }} 
        WHERE {{
        graph ?g {{ ?s ?p ?o. }}
        }}"""
    responseDelete = collection.run_sparql(deleteItem)

    # Solr 
    responseSolr = solrAcervo.delete(q=f"id:{id}",  commit=True)
    
    return {'Jena': responseDelete,
            'Solr': responseSolr
            }