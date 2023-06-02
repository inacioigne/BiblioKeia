from fastapi import APIRouter
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.authorities.agents.hasVariant import DeleteVariant
from src.schemas.authorities.mads import Variant
from src.function.authorities.agents.hasVariant import EditVariant
from src.schemas.authorities.mads import VariantEdit
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

# # Edit Variant
# @router.delete("/agents/variant", status_code=200) 
# async def edit_variant(authority:str, request: Variant):

#     response = DeleteVariant("https://bibliokeia.com/authorities/PersonalName/bkau-1", request)

#     return response



# # Edit Variant
# @router.put("/agents/variant", status_code=200) 
# async def edit_variant(authority:str, request: VariantEdit):

#     responseJena = EditVariant(authority, request)

#     # id = authority.split("/")[-1]

#     # remove = {
#     # 'id': id,
#     # 'hasVariant': {"remove": request.oldVariant.value } }
#     # add = {
#     # 'id': id,
#     # 'hasVariant': {"add": request.newVariant.value } }
    
#     # responseSolr = solr.add([remove, add], commit=True)

#     return {
#         "jena": responseJena,
#         # "solr": responseSolr
#         } 

