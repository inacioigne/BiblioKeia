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

# Delete Autority
@router.post("/agents/birthDate", status_code=200) 
async def delete_subject(uri: str):

    uriID = uri.split("/")[-1]
    r = solr.search(q=f'id:{uriID}', **{'fl': '*,[child]'})
    [doc] = r.docs

    d = f"""DELETE {{ graph <{uri}> {{ ?s ?p ?o }} }}
            WHERE {{
            graph <{uri}> {{ ?s ?p ?o. }}
            }}"""
            
    responseJena = fuseki_update.run_sparql(d)
    responseSolr = DeleteDoc(uri)
    response = {'jena': responseJena.convert()['message'], 'solr': responseSolr}
    response = UpdateDelete(doc, response, uri)
    
    return response

