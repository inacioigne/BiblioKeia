from fastapi import APIRouter
from src.schemas.thesaurus.subject import Subject_Schema
from src.routes.thesaurus.create import CreateSubject, Make_Graph
from pyfuseki import FusekiUpdate

router = APIRouter()

@router.post("/thesaurus/subject", status_code=201) 
async def create_subject(
    request: Subject_Schema):
    
    fuseki_update = FusekiUpdate('http://localhost:3030', 'thesaurus')

    objParser = request.dict()
    token = objParser.get('tokenLSCH')
    g = CreateSubject(objParser)
    nt = g.serialize(format='nt')
    G = Make_Graph(nt, token)
    fuseki_update.run_sparql(G)

    return {'subject': f'http://localhost:3030/thesaurus?graph=https:%2F%2Fbibliokeia.com%2Fauthorities%2Fsubjects%2F{token}'}
  