from fastapi import APIRouter
# from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
# from datetime import date, datetime
from src.function.cataloguing.generate_id import GenerateId
from pyfuseki import FusekiQuery

router = APIRouter()

@router.get("/next_id")
async def generate_id():

    queryAcervo = FusekiQuery('http://localhost:3030', 'acervo')

    # register = GenerateId()

    q = """SELECT ?g  
        {graph ?g {?s ?p ?o}} 
        group by ?g 
        ORDER BY DESC(?g)
        LIMIT 1"""
    
    response = queryAcervo.run_sparql(q)
    r = response.convert()
    bindings = r['results']['bindings']

    if len(bindings) == 0:
        return { 'id': 1 }
    else:
        return { 'id': 0 }