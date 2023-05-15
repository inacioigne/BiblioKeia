from pyfuseki import FusekiQuery

fuseki_query = FusekiQuery('http://localhost:3030', 'authorities')

def GraphExist(uri): 
    
    token = uri.split("/")[-1]

    query = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            SELECT ?uri ?label WHERE {{ graph ?g {{
            ?sub bf:identifiedBy ?identifiedBy .
    ?identifiedBy rdf:value "{token}" .
    ?uri madsrdf:authoritativeLabel ?label .   
                }} }} """
    responseQuery = fuseki_query.run_sparql(query)
    bindings = responseQuery.convert()['results']['bindings']
    if len(bindings) > 0:
        return bindings[0]
    else: None
    