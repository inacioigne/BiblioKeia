from fastapi import APIRouter, HTTPException
from rdflib import Graph
from src.routes.translate.makeTranslate import MakeTranslate
# from src.function.authorities.makeGraph import MakeGraphSubject

from src.function.authorities.subject import ParserSubject
from src.schemas.authorities.subject import Subject

from src.function.authorities.generateID import GenerateId

router = APIRouter()

# Get Authority Loc
@router.get("/loc/subject", status_code=200, response_model=Subject) 
async def get_subject(uri: str):
    graph = Graph()
    graph.parse(f'{uri}.rdf')
    # id = GenerateId()
    response = ParserSubject(graph, uri)
    # MakeTranslate
    translator = MakeTranslate(
            source_language='en',
            target_language='pt',
            timeout=10
        )
    for k, v in response:
        if k == 'elementList':
            for j in v:
                term = j.elementValue.value
                result = translator.translate(term)
                j.elementValue.value = result.capitalize()
                j.elementValue.lang = 'pt'


    return response.dict()