from fastapi import APIRouter
from src.schemas.bibframe.work import Work_Schema
from rdflib import Graph, Namespace, URIRef
from src.function.cataloguing.generate_id import GenerateId
from src.function.bibframe.Work.work import BfWork
from pyfuseki import FusekiUpdate

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'acervo')

def Work(request):
    work_id = GenerateId()
    g = BfWork(request, work_id )

    return g


@router.post("/work", status_code=201)
async def create_work(request: Work_Schema):
    work_id = GenerateId()
    g = Work(request)
    g.serialize("work1.nt") 
    nt = g.serialize(format='nt')

    G = """PREFIX bk: <https://bibliokeia.com/authorities/subjects/>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    INSERT DATA {
        GRAPH <http://bibliokeia.com/bibframe/work/"""+work_id+""">
        { \n"""+nt+"} }" 

    fuseki_update.run_sparql(G)
    
    return {"msg": work_id}
