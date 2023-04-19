from fastapi import APIRouter, HTTPException
from src.function.bibframe.Work.contributionOf import ContributionOf
from src.function.bibframe.Work.subjectOf import SubjectOf
from src.schemas.bibframe._work import Work_Schema, Work_Edit, Work_Response
from src.schemas.bibframe.work import Work
from rdflib import Graph, Namespace, URIRef
from src.function.cataloguing.generate_id import GenerateId
from src.function.bibframe.Work.work import BfWork
from pyfuseki import FusekiUpdate, FusekiQuery
from src.function.solr.docWork import DocWork, EditDocWork
from src.function.bibframe.Work.editWork import EditWork
from src.function.cataloguing.queryWork import QueryWork
from src.function.bibframe.Work.graph import MakeGraph

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'acervo')
acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')

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
    work_id = response['id']


    G = MakeGraph(request, work_id)
    # Jena
    response = fuseki_update.run_sparql(G)
    # Update Sujects
    SubjectOf(request.subject, 'work', work_id)
    
    # Update Contributions
    ContributionOf(request.contribution, 'work', work_id)

    
    
    # # Solr
    DocWork(request, work_id)

    return {
        #"id": work_id, 
        "jena": response.convert() }
    # return request.dict()

# PUT
@router.put("/work", status_code=201)
async def update_work(request: Work_Edit, work_id: str):

    EditWork(request, work_id)
    EditDocWork(request, work_id)

    return {'msg': 'Item editado com sucesso!'}

# DELETE
@router.delete("/work", status_code=200)
async def delete_work(work_id: str):

    delete = "DELETE { graph <https://bibliokeia.com/resources/work/"+work_id+"""> 
        { ?s ?p ?o } } 
        WHERE {
        graph ?g {?s ?p ?o.}
        }"""
    response = fuseki_update.run_sparql(delete)

    return response.convert()
