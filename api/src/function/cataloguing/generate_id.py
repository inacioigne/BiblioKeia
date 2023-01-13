from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
from datetime import date, datetime

def GenerateId():

    year = datetime.now().year 
    year = str(year)[2:]

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
    
    bindings = r.bindings
    if len(bindings) == 0:
        register = f'bk-{year}-1'
        return register

    for i in r:
        uri = i[0].toPython()
    bk = uri.split('/')[-1]
    count = bk.split('-')[-1]
    count = int(count) + 1  

    
    register = f'bk-{year}-{count}'

    return register