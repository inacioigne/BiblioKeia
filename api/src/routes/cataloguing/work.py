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

    #print("WORK: ", work_id)
    g = BfWork(request, work_id )
    g.serialize("work.ttl") 
    nt = g.serialize(format='nt')

    G = """
    INSERT DATA {
        GRAPH <https://bibliokeia.com/resources/work/"""+work_id+""">
        { \n"""+nt+"} }" 

    response = fuseki_update.run_sparql(G)

    DocWork(request, work_id)

    return {"id": work_id, "jena": response.convert() }
    #return request.dict()
