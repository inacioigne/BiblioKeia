from fastapi import APIRouter
from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
from datetime import date, datetime

router = APIRouter()

@router.get("/next_id")
async def generate_id():

    store = SPARQLUpdateStore(update_endpoint='http://localhost:3030/acervo/update')
    query_endpoint = 'http://localhost:3030/acervo/query'
    update_endpoint = 'http://localhost:3030/acervo/update'
    store.open((query_endpoint, update_endpoint))
    

    q = """SELECT ?g  
        {graph ?g {?s ?p ?o}} 
        group by ?g 
        ORDER BY DESC(?g)
        LIMIT 1"""
    
    r = store.query(q)
    for i in r:
        uri = i[0].toPython()
    bk = uri.split('/')[-1]
    count = bk.split('-')[-1]
    count = int(count) + 1  
    year = datetime.now().year 
    year = str(year)[2:]
    register = f'bk-{year}-{count}'
    #print(count)

    return { 'id': register }