from fastapi import APIRouter
from pyfuseki import FusekiUpdate
from src.function.bibframe.Instance.editInstance import EditInstance
from src.function.bibframe.Work.hasInstance import HasInstance
from src.function.bibframe.Instance.graphInstance import MakeGraphInstance
from src.function.solr.docInstance import DocInstance
from src.function.cataloguing.generate_id import GenerateId
from src.schemas.metadata.bibframe.instance import Instance
from src.schemas.cataloguing.edit import BfEdit
from pysolr import Solr

from src.schemas.settings import Settings

settings = Settings()

collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')
solrAcervo = Solr(f'{settings.url}:8983/solr/collection/', timeout=10)
router = APIRouter()

@router.post("/instance", status_code=201)
async def create_instance(request: Instance):

    response = GenerateId()
    id = response['id']
    graph = MakeGraphInstance(request, id)
    responseJena = collectionUpdate.run_sparql(graph)

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

# DELETE
@router.delete("/instance", status_code=200)
async def delete_instance(id: str):

    instance = f'https://bibliokeia.com/resources/instance/{id}'

    deleteInstance = f"""DELETE {{ graph <{instance}> 
        {{ ?s ?p ?o }} }} 
        WHERE {{
        graph ?g {{ ?s ?p ?o. }}
        }}"""
    responseDelete = collectionUpdate.run_sparql(deleteInstance)
    
    upWork = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/> 
        DELETE {{ graph ?g
        {{ ?s  bf:hasInstance <{instance}>  }} }} 
        WHERE {{
        graph ?g {{ ?s  bf:hasInstance <{instance}>  }}
        }}"""
    responseUpWork = collectionUpdate.run_sparql(upWork)

    # Solr
    responseSolr = solrAcervo.delete(q="id:bkc-3",  commit=True)

    return { 'delete': responseDelete.convert(),
            'upWork': responseUpWork.convert(), 
            'Solr': responseSolr}
