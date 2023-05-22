from fastapi import APIRouter, HTTPException
from rdflib import Graph
from src.function.loc.makeTranslateLoc import MakeTranslateLoc
from src.function.loc.graphExist import GraphExist
from src.routes.translate.makeTranslate import MakeTranslate
# from src.function.authorities.subject import ParserSubject
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
@router.get("/import/loc/agents", status_code=200) #, response_model=Subject) 
async def get_agents(uri: str):

    return { 'msg': 'ok'}
