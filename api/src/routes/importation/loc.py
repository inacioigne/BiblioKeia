from fastapi import APIRouter, HTTPException
from rdflib import Graph
from src.function.loc.parserInstance import ParserInstance
from src.function.loc.parserWork import ParserWork
from src.schemas.authorities.personalName import PersonalName
from src.function.loc.agents.parserAgents import ParserAgents
from src.function.loc.graphExist import GraphExist
from src.function.loc.parserSubject import ParserSubject
from src.schemas.authorities.subject import Subject
from src.schemas.metadata.bibframe.work import Work
from src.schemas.metadata.bibframe.instance import Instance

from pyfuseki import FusekiQuery
from src.schemas.settings import Settings
settings = Settings()

router = APIRouter()
query = FusekiQuery(f'{settings.url}:3030', 'authority') 

# Graph Exist
@router.get("/exist/{identifiersLccn}", status_code=200) 
async def loc_exist(identifiersLccn: str):

    ask = f"""PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
ASK {{ graph ?g {{ ?s identifiers:lccn "{identifiersLccn}" }} }}"""

    res = query.run_sparql(ask)
    exist = res.convert()['boolean']
    
    return exist


# # LC Subject Headings (LCSH)
# @router.get("/subjects", status_code=200, response_model=Subject) 
# async def get_subject(uri: str):

#     exist = GraphExist(uri)
#     if exist:
#         raise HTTPException(status_code=409, detail="Esse registro já existe")
#     graph = Graph()
#     graph.parse(f'{uri}.rdf') 

#     subject = ParserSubject(graph, uri)

#     return subject.model_dump()

# # LC Name Authority File (LCNAF)
# @router.get("/agents", status_code=200, response_model=PersonalName) 
# async def get_agents(uri: str):
#     token = uri.split("/")[-1]

#     exist = GraphExist(token)
#     if exist:
#         raise HTTPException(status_code=409, detail="Esse registro já existe")

#     graph = Graph()
#     graph.parse(f'{uri}.rdf') 
#     response = ParserAgents(graph, uri)

#     return response.model_dump()

# # Works
# @router.get("/works", status_code=200, response_model=Work) 
# async def get_works(uri: str):
    
#     graph = Graph()
#     graph.parse(f'{uri}.rdf')
#     response = ParserWork(graph, uri) 

#     return response

# # Instance
# @router.get("/instances", status_code=200, response_model=Instance) 
# async def get_instances(uri: str):
    
    graph = Graph()
    graph.parse(f'{uri}.rdf')
    response = ParserInstance(graph, uri)

    return response