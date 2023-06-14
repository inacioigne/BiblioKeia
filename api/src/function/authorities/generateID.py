from datetime import datetime
from pyfuseki import FusekiQuery
from src.schemas.settings import Settings

settings = Settings()

authorityQuery = FusekiQuery(f'{settings.url}:3030', 'authority')

def GenerateId():

    q = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    SELECT ?g
    {graph ?g {?s bf:generationDate ?o}} 
    ORDER BY DESC(?o)
    LIMIT 1"""
    
    response = authorityQuery.run_sparql(q)
    r = response.convert()
    bindings = r['results']['bindings']

    if len(bindings) == 0:
        return "bkau-1"
    else:
        value = bindings[0]['g']['value']
        bk = int(value.split("-")[1]) + 1
        return "bkau-"+str(bk)