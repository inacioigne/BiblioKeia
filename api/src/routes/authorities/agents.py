from fastapi import APIRouter
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.authorities.upadeteAuthority import UpadeteAuthority
from src.function.authorities.agents.hasVariant import DeleteVariant
from src.schemas.authorities.mads import Variant
from src.function.authorities.agents.hasVariant import EditVariant
from src.schemas.authorities.mads import VariantEdit
from src.function.solr.docAgents import MakeDocAgents
from src.function.authorities.agents.makeGraph import MakeGraphAgents
from src.function.authorities.generateID import GenerateId

from src.schemas.authorities.agents import Agents
from src.schemas.settings import Settings

settings = Settings()

router = APIRouter()
authorityUpdate = FusekiUpdate(f'{settings.url}:3030', 'authority')

solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

# Add Autority
@router.post("/agents/", status_code=201) 
async def post_agents(request: Agents):
  
    id = GenerateId()
    graph = MakeGraphAgents(request, id)
    response = authorityUpdate.run_sparql(graph)

    doc = MakeDocAgents(request, id)
    responseSolr = solr.add([doc], commit=True)

    # UpadeteAuthority(request, id)

    return {
        "id": id,
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 
