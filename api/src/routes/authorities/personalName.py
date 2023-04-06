from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.schemas.authorities.personalName import PersonalName

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

# Create Graph
@router.post("/personalName", status_code=201) 
async def create_topic(request: PersonalName):
    return request.dict()

