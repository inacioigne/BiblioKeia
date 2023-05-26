from fastapi import APIRouter
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.solr.docAgents import MakeDocAgents
from src.function.authorities.agents.makeGraph import MakeGraphAgents
from src.function.authorities.generateID import GenerateId

from src.schemas.authorities.agents import Agents

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

# Add Autority
@router.post("/agents/", status_code=201) 
async def post_agents(request: Agents):
  
    id = GenerateId()
    graph = MakeGraphAgents(request, id)
    response = fuseki_update.run_sparql(graph)

    doc = MakeDocAgents(request, id)
    responseSolr = solr.add([doc], commit=True)

    # UpadeteAuthority(request, id)

    return {
        "id": id,
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 
    # return {'id': id, 'agent': request.dict()}
