from fastapi import APIRouter
from src.schemas.thesaurus.subject import Subject_Schema
from src.routes.thesaurus.create import Make_Graph
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
    
 
  