from fastapi import APIRouter
from src.schemas.bibframe.work import Work_Schema
from rdflib import Graph, Namespace, URIRef
from src.function.cataloguing.generate_id import GenerateId
from src.function.bibframe.Work.work import BfWork
from pyfuseki import FusekiUpdate
from src.function.solr.docWork import DocWork

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
    g = BfWork(request, work_id )
    nt = g.serialize(format='nt')
    up = """
        WITH <https://bibliokeia.com/resources/work/bk-19> 
        DELETE { ?a ?b ?c } 
        INSERT {"""+nt+"""}
        WHERE {?a ?b ?c }
        """
    fuseki_update.run_sparql(up)

    g.serialize("put.ttl") 

    return request.dict()
