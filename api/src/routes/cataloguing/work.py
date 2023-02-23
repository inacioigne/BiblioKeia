from fastapi import APIRouter
from src.schemas.bibframe.work import Work_Schema
from rdflib import Graph, Namespace, URIRef
from src.function.cataloguing.generate_id import GenerateId
from src.function.bibframe.Work.work import BfWork
from pyfuseki import FusekiUpdate
from src.function.solr.docWork import DocWork
from src.function.bibframe.Work.editWork import EditWork

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'acervo')


@router.post("/work", status_code=201)
async def create_work(request: Work_Schema):
    response = GenerateId()
    work_id = response['id']

    g = BfWork(request, work_id )
    g.serialize("work1.ttl") 
    nt = g.serialize(format='nt')

    G = """
    INSERT DATA {
        GRAPH <https://bibliokeia.com/resources/work/"""+work_id+""">
        { \n"""+nt+"} }" 

    response = fuseki_update.run_sparql(G)

    DocWork(request, work_id)

    return {"id": work_id, "jena": response.convert() }

@router.put("/work", status_code=201)
async def update_work(request: Work_Schema, work_id: str):
    EditWork(request, work_id)

    #fuseki_update.run_sparql(up)


    return {'msg': 'Item editado com sucesso!'}
