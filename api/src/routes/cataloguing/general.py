from fastapi import APIRouter, HTTPException
from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate, FusekiQuery

settings = Settings()

collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')
acervoQuery = FusekiQuery(f'{settings.url}:3030', 'collection')
router = APIRouter()

# DELETE
@router.delete("/resources", status_code=200)
async def delete_resources(uri: str):

    # uri = f'https://bibliokeia.com/resources/work/{id}'

    sparql = f"""DELETE {{ graph <{uri}> 
        {{ ?s ?p ?o }} }} 
        WHERE {{
        graph ?g {{ ?s ?p ?o. }}
        }}"""
    response = collectionUpdate.run_sparql(sparql)

    return response.convert()