from pyfuseki import FusekiQuery

fuseki_query = FusekiQuery('http://localhost:3030', 'authorities')

def GraphExist(uri):
    
    token = uri.split("/")[-1]
    ask = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    ASK WHERE {{ graph ?g {{
    ?sub bf:identifiedBy ?identifiedBy .
        ?identifiedBy rdf:value "{token}"
        FILTER EXISTS {{ ?identifiedBy bf:assigner <http://id.loc.gov/vocabulary/organizations/dlc> }}
    }} }} """
    response = fuseki_query.run_sparql(ask)
    return response.convert()['boolean']