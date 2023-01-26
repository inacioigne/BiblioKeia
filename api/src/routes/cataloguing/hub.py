from fastapi import APIRouter
from src.schemas.bibframe.hub import Hub_Schema
from rdflib import Graph, Namespace, URIRef
from src.function.cataloguing.generate_id import GenerateId
from src.function.bibframe.Hub.hub import BfHub
from pyfuseki import FusekiUpdate
from src.function.solr.hub import DocSerie

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'acervo')


@router.post("/serie", status_code=201)
async def create_hub(request: Hub_Schema):
    response = GenerateId()
    hub_id = response['id']
    g = BfHub(request, hub_id )
    # g.serialize("hub.ttl") 
    nt = g.serialize(format='nt')
    G = """
    INSERT DATA {
        GRAPH <https://bibliokeia.com/resources/hub/"""+hub_id+""">
        { \n"""+nt+"} }" 
    response = fuseki_update.run_sparql(G)
    DocSerie(request, hub_id)


    return {'id': hub_id, "msg": "Registro salvo com sucesso!" }
   