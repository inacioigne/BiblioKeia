from fastapi import APIRouter
from src.schemas.thesaurus.subject import Subject_Schema
from src.function.thesaurus.makeGraph import Make_Graph
from src.function.thesaurus.subject import CreateSubject
from pyfuseki import FusekiUpdate


router = APIRouter()

@router.post("/subject", status_code=201) 
async def create_subject(request: Subject_Schema):

    fuseki_update = FusekiUpdate('http://localhost:3030', 'thesaurus')

    nt = CreateSubject(request)
    G = Make_Graph(nt, request.tokenLSCH)

    fuseki_update.run_sparql(G)

    return {'subject': f'http://localhost:3030/thesaurus?graph=https:%2F%2Fbibliokeia.com%2Fauthorities%2Fsubjects%2F{request.tokenLSCH}'}

@router.get("/subject/{tokenBK}", status_code=200) 
async def get_subject(tokenBK: str):
    q = """PREFIX madsrdf:  <http://www.loc.gov/mads/rdf/v1#> 
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX bk: <https://bibliokeia.com/authorities/subjects/>
        SELECT *
        WHERE { GRAPH  bk:sh85084414
        {?s ?p ?o }
        }
        LIMIT 10"""
    return {'subject': tokenBK}
    
 
  