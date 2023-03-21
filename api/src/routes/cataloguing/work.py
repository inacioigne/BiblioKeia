from fastapi import APIRouter
from src.schemas.bibframe.work import Work_Schema, Work_Edit, Work_Response
from rdflib import Graph, Namespace, URIRef
from src.function.cataloguing.generate_id import GenerateId
from src.function.bibframe.Work.work import BfWork
from pyfuseki import FusekiUpdate, FusekiQuery
from src.function.solr.docWork import DocWork, EditDocWork
from src.function.bibframe.Work.editWork import EditWork
from src.function.cataloguing.queryWork import QueryWork

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'acervo')
acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')

@router.get("/work", status_code=201)
async def create_work(id: str) -> Work_Response:
    bkDict = QueryWork(id)
    #return bkDict
    return  Work_Response(**bkDict)


@router.post("/work", status_code=201)
async def create_work(request: Work_Schema):
    response = GenerateId()
    work_id = response['id']

    g = BfWork(request, work_id )
    g.serialize("work.ttl") 
    nt = g.serialize(format='nt')

    G = """
    INSERT DATA {
        GRAPH <https://bibliokeia.com/resources/work/"""+work_id+""">
        { \n"""+nt+"} }" 
    
    # Jena
    response = fuseki_update.run_sparql(G)
    # Solr
    DocWork(request, work_id)

    return {"id": work_id, "jena": response.convert() }


@router.put("/work", status_code=201)
async def update_work(request: Work_Edit, work_id: str):

    EditWork(request, work_id)
    EditDocWork(request, work_id)
    #fuseki_update.run_sparql(up)

    return {'msg': 'Item editado com sucesso!'}
