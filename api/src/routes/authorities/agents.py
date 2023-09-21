from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.solr.docAgents import MakeDocAgents
from src.function.authorities.agents.makeGraph import MakeGraphAgents
from src.function.authorities.generateID import GenerateId

from src.schemas.authorities.agents import Agents
from src.schemas.settings import Settings
from src.function.loc.graphExist import GraphExist
from src.db.init_db import session
from src.db.models import Authority

settings = Settings()

router = APIRouter()
authorityUpdate = FusekiUpdate(f'{settings.url}:3030', 'authority')

solr = Solr(f'{settings.url}:8983/solr/authority/', timeout=10)


# Add Autority
@router.post("/agents/", status_code=201) 
async def post_agents(request: Agents): 

    if request.identifiersLccn:
        exist = GraphExist(request.identifiersLccn)
        if exist:
            raise HTTPException(status_code=409, detail="Esse registro já existe")
  
    # id = GenerateId() 
    authority = session.query(Authority).order_by(Authority.id.desc()).first()
    if authority:
        id = authority.id + 1
        uri = f'https://bibliokeia.com/authorities/{request.type}/{id}'
    else:
        id = 1
        uri = f'https://bibliokeia.com/authorities/{request.type}/{id}'

    a = Authority(id=id, type=request.type, uri=uri)
    session.add(a) 
    session.commit()

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
