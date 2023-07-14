from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.authorities.upadeteAuthority import UpadeteAuthority
from src.function.authorities.makeGraph import MakeGraphSubject
from src.function.authorities.generateID import GenerateId
from src.function.solr.docSubject import MakeDocSubject #, DeleteDoc
from src.schemas.authorities.subject import Subject

from src.schemas.settings import Settings

settings = Settings()

router = APIRouter()

solr = Solr(f'{settings.url}:8983/solr/authority/', timeout=10)

authorityUpdate = FusekiUpdate(f'{settings.url}:3030', 'authority')



# Add Autority
@router.post("/subject/", status_code=201) 
async def post_subject(request: Subject):
  
    id = GenerateId() 
    graph = MakeGraphSubject(request, id)
    response = authorityUpdate.run_sparql(graph)

    doc = MakeDocSubject(request, id)
    responseSolr = solr.add([doc], commit=True)

    UpadeteAuthority(request, id)

    return {
        "id": id,
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 

