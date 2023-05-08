from fastapi import APIRouter, HTTPException
from rdflib import Graph
from src.function.authorities.makeGraph import MakeGraph

from src.function.authorities.subject import ParserSubject
from src.schemas.authorities.subject import Subject

router = APIRouter()

# Get Authority Loc
@router.get("/loc/subject", status_code=200, response_model=Subject) 
async def get_subject(uri: str):
    graph = Graph()
    graph.parse(f'{uri}.rdf')
    response = ParserSubject(graph, uri)

    # graph = MakeGraph(response, id)
    # response = fuseki_update.run_sparql(graph)
    # doc = MakeDoc(request, id)
    # responseSolr = solr.add([doc], commit=True)

    return response.dict()