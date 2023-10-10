from pyfuseki import FusekiQuery
from src.schemas.settings import Settings

settings = Settings()

authorityQuery = FusekiQuery(f'{settings.url}:3030', 'authority')

def GraphExistLoc(identifiersLccn):
    
    ask = f"""PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
                ASK {{ graph ?g {{ ?s identifiers:lccn "{identifiersLccn}" }} }}"""

    res = authorityQuery.run_sparql(ask)
    exist = res.convert()['boolean']
    
    return exist
    
    # token = uri.split("/")[-1]

    # query = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    #         PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    #         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    #         SELECT ?uri ?label WHERE {{ graph ?g {{
    #         ?sub bf:identifiedBy ?identifiedBy .
    # ?identifiedBy rdf:value "{identifiersLccn}" .
    # ?uri madsrdf:authoritativeLabel ?label .   
    #             }} }} """
    # responseQuery = authorityQuery.run_sparql(query)
    # bindings = responseQuery.convert()['results']['bindings']
    # if len(bindings) > 0:
    #     return bindings[0]
    # else: None
    