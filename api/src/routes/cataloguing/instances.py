from fastapi import APIRouter
from pyfuseki import FusekiUpdate
from src.function.bibframe.Instance.editInstance import EditInstance
from src.function.bibframe.Work.hasInstance import HasInstance
from src.function.bibframe.Instance.graphInstance import MakeGraphInstance
from src.function.solr.docInstance import DocInstance
from src.function.cataloguing.generate_id import GenerateId
from src.schemas.metadata.bibframe.instance import Instance
from src.schemas.cataloguing.edit import BfEdit

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
    # for element in request.instanceOf:
    #     HasInstance(element, id)
    HasInstance(request.instanceOf, id)

    responseSolr = DocInstance(request, id)

    return {
        "id": id, 
        "jena": responseJena.convert(),
        "solr":  responseSolr 
        }

# PUT
@router.put("/instance", status_code=200)
async def update_instance(request: BfEdit, id: str):

    EditInstance(request, id)
    # EditDocWork(request, work_id)

    return {'msg': 'Item editado com sucesso!'}
