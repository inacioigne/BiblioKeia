from fastapi import APIRouter
from src.function.rdf.thesarus.makeGraphName import MakeGraphName
from src.function.solr.docAgents import MakeDocAgents
from src.function.authorities.nextId import GenerateId
from pyfuseki import FusekiUpdate
from src.schemas.settings import Settings
from src.db.init_db import session
from src.db.models import Authority
from pysolr import Solr

from src.schemas.thesaurus.mads import SchemaMads

settings = Settings()
authorityUpdate = FusekiUpdate(f'{settings.url}:3030', 'authority')
solr = Solr(f'{settings.url}:8983/solr/authority/', timeout=10)

router = APIRouter() 

# Post Authority
@router.post("/create", status_code=200) 
async def post_authority(request: SchemaMads):
    item_id = GenerateId()
    uri = f'https://bibliokeia.com/authority/{request.type}/{item_id}'

    # MariaDB
    a = Authority(id=item_id, type=request.type, uri=uri)
    session.add(a) 
    session.commit()
    
    # Jena
    graph = MakeGraphName(request, item_id)
    response = authorityUpdate.run_sparql(graph)

    doc = MakeDocAgents(request, item_id)
    print(doc)
    responseSolr = solr.add([doc], commit=True)

    return {
        "id": item_id,
         "jena": response.convert()['message'],
        "solr": responseSolr
        } 