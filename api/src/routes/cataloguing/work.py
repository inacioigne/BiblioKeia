from fastapi import APIRouter, HTTPException
from src.function.cataloguing.work.deleteWork import DeleteWork
from src.schemas.cataloguing.edit import BfEdit
from src.function.bibframe.Work.contributionOf import ContributionOf
from src.function.bibframe.Work.subjectOf import SubjectOf
from src.schemas.bibframe._work import Work_Response
from src.function.cataloguing.generate_id import GenerateId
from pyfuseki import FusekiUpdate, FusekiQuery
from src.function.solr.docWork import DocWork #, EditDocWork
from src.function.bibframe.Work.editWork import EditWork
from src.function.cataloguing.queryWork import QueryWork
from src.function.bibframe.Work.graphWork import MakeGraphWork

from src.schemas.metadata.bibframe.work import Work
from src.schemas.settings import Settings

settings = Settings()

fuseki_update = FusekiUpdate(f'{settings.url}:3030', 'collection')
collectionQuery = FusekiQuery(f'{settings.url}:3030', 'collection')
router = APIRouter()

# GET
@router.get("/work", status_code=200)
async def get_work(id: str) -> Work_Response:
    ask = """ASK WHERE { 
        graph <https://bibliokeia.com/resources/work/"""+id+"""> {
        ?s ?p ?o } }"""

    response = acervoQuery.run_sparql(ask)
    response = response.convert()['boolean']
    if response:
        bkDict = QueryWork(id)
        return  Work_Response(**bkDict)
    else:
        raise HTTPException(status_code=410, detail="O item não existe")

# POST
@router.post("/work", status_code=201)
async def create_work(request: Work): 

    response = GenerateId()
    id = response['id']

    G = MakeGraphWork(request, id)
    # Jena
    responseJena = fuseki_update.run_sparql(G)
    # Update Sujects
    SubjectOf(request, 'work', id)
    
    # Update Contributions
    ContributionOf(request, 'work', id)

    # Solr
    responseSolr = DocWork(request, id) 

    return {
        "id": id, 
        "jena": responseJena.convert(),
        "solr":  responseSolr }

# PUT
@router.put("/work", status_code=200)
async def update_work(request: BfEdit, id: str):

    EditWork(request, id)
    # EditDocWork(request, work_id)

    return {'msg': 'Item editado com sucesso!'}

# DELETE
@router.delete("/work", status_code=200)
async def delete_work(id: str):

    uri = f'https://bibliokeia.com/resources/work/{id}'

    ask = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                ASK {{ graph <{uri}>
                {{ <{uri}> bf:hasInstance ?o }} }}"""

    response = collectionQuery.run_sparql(ask)
    response = response.convert()
    if response['boolean']:
        raise HTTPException(status_code=409, detail="Não é possível excluir um recurso com instâncias associadas a ele")
    else:
        response = DeleteWork(id)



    # sparql = f"""DELETE {{ graph <{uri}> 
    #     {{ ?s ?p ?o }} }} 
    #     WHERE {{
    #     graph ?g {{ ?s ?p ?o. }}
    #     }}"""
    # response = fuseki_update.run_sparql(sparql)

    # Instance Update
    instanceUpdate = " bf:instanceOf     <https://bibliokeia.com/resources/work/bkc-1> ;"

    return response.convert()
