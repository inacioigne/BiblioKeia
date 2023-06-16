from fastapi import APIRouter
from src.function.bibframe.Work.hasInstance import HasInstance
from src.function.bibframe.Instance.graphInstance import MakeGraphInstance
from pyfuseki import FusekiUpdate
from src.function.solr.docInstance import DocInstance
from src.function.cataloguing.generate_id import GenerateId
from src.schemas.metadata.bibframe.instance import Instance

from src.schemas.settings import Settings

settings = Settings()

collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')
router = APIRouter()


@router.post("/instance", status_code=201)
async def create_instance(request: Instance):

    response = GenerateId()
    id = response['id']
    graph = MakeGraphInstance(request, id)
    responseJena = collectionUpdate.run_sparql(graph)
    for element in request.instanceOf:
        HasInstance(element, id)

    return {
        "id": id, 
        "jena": responseJena.convert(),
        # "solr":  responseSolr 
        }

    # g.serialize("instance.nt")  
    # nt = g.serialize(format='nt')

    # G = """
    # INSERT DATA {
    #     GRAPH <https://bibliokeia.com/resources/instance/"""+instance_id+""">
    #     { \n"""+nt+"} }" 
    
    # response = fuseki_update.run_sparql(G)
    # DocInstance(request, instance_id)

    # return {"id": instance_id, "jena": response.convert() }
