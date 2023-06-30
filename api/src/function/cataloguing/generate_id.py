# from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
# from datetime import datetime
from pyfuseki import FusekiQuery

from src.schemas.settings import Settings

settings = Settings()

def GenerateId():

    collection = FusekiQuery(f'{settings.url}:3030', 'collection')

    sparql = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
            SELECT ?g
            {graph ?g {?s bf:generationDate ?o}} 
            ORDER BY DESC(?o)
            LIMIT 1"""
    
    response = collection.run_sparql(sparql)
    response = response.convert()
    bindings = response['results']['bindings']

    if len(bindings) == 0:
        return { 'id': "bkc-1" }
    else:
        value = bindings[0]['g']['value']
        bk = int(value.split("-")[1]) + 1
        return { 'id': "bkc-"+str(bk) } 