from datetime import datetime
from pyfuseki import FusekiQuery

def GenerateId():

    queryAcervo = FusekiQuery('http://localhost:3030', 'authorities')

    q = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    SELECT ?g
    {graph ?g {?s bf:generationDate ?o}} 
    ORDER BY DESC(?o)
    LIMIT 1"""
    
    response = queryAcervo.run_sparql(q)
    r = response.convert()
    bindings = r['results']['bindings']

    if len(bindings) == 0:
        return "bkau-1"
    else:
        value = bindings[0]['g']['value']
        bk = int(value.split("-")[1]) + 1
        return "bkau-"+str(bk)