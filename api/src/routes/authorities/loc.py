from fastapi import APIRouter, HTTPException
from rdflib import Graph
from src.schemas.authorities.agents import Agents
from src.function.loc.agents.parserAgents import ParserAgents
from src.function.loc.makeTranslateLoc import MakeTranslateLoc
from src.function.loc.graphExist import GraphExist
from src.routes.translate.makeTranslate import MakeTranslate
from src.function.loc.parserSubject import ParserSubject
from src.schemas.authorities.subject import Subject

from src.function.authorities.generateID import GenerateId

router = APIRouter()


# LC Subject Headings (LCSH)
@router.get("/import/loc/subjects", status_code=200, response_model=Subject) 
async def get_subject(uri: str):

    exist = GraphExist(uri)
    if exist:
        raise HTTPException(status_code=409, detail="Esse registro já existe")
    graph = Graph()
    graph.parse(f'{uri}.rdf')

    subject = ParserSubject(graph, uri)


    return subject.dict()

# LC Name Authority File (LCNAF)
@router.get("/import/loc/agents", status_code=200, response_model=Agents) 
async def get_agents(authority: str):

    exist = GraphExist(authority)
    if exist:
        raise HTTPException(status_code=409, detail="Esse registro já existe")

    graph = Graph()
    graph.parse(f'{authority}.rdf')
    response = ParserAgents(graph, authority)

    return response.dict()
