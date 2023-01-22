from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
from datetime import datetime
from pyfuseki import FusekiQuery

def GenerateId():

    # year = datetime.now().year 
    # year = str(year)[2:]

    # store = SPARQLUpdateStore(update_endpoint='http://localhost:3030/acervo/update')
    # query_endpoint = 'http://localhost:3030/acervo/query'
    # update_endpoint = 'http://localhost:3030/acervo/update'
    # store.open((query_endpoint, update_endpoint))
    
    # q = """SELECT ?g  
    #     {graph ?g {?s ?p ?o}} 
    #     group by ?g 
    #     ORDER BY DESC(?g)
    #     LIMIT 1"""
    
    # r = store.query(q)
    
    # bindings = r.bindings
    # if len(bindings) == 0:
    #     register = f'bk-{year}-1'
    #     return register

    # for i in r:
    #     uri = i[0].toPython()
    # bk = uri.split('/')[-1]
    # count = bk.split('-')[-1]
    # count = int(count) + 1  

    
    # register = f'bk-{year}-{count}'

    queryAcervo = FusekiQuery('http://localhost:3030', 'acervo')

    # q = """SELECT ?g  
    #     {graph ?g {?s ?p ?o}} 
    #     group by ?g 
    #     ORDER BY DESC(?g)
    #     LIMIT 1"""
    q = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
SELECT ?g
{graph ?g {?s bf:generationDate ?o}} 
ORDER BY DESC(?o)
LIMIT 1"""
    
    response = queryAcervo.run_sparql(q)
    r = response.convert()
    bindings = r['results']['bindings']

    if len(bindings) == 0:
        return { 'id': "bk-1" }
    else:
        value = bindings[0]['g']['value']
        bk = int(value.split("-")[1]) + 1
        return { 'id': "bk-"+str(bk) }