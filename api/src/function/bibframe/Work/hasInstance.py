from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate

settings = Settings()

collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')

def HasInstance(element, id):

    uri = f'https://bibliokeia.com/resources/instance/{id}'
    sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                INSERT DATA
                {{ GRAPH <{element.uri}> {{ 
                    <{element.uri}>  bf:hasInstance <{uri}> }} }} ; """
    responseJena = collectionUpdate.run_sparql(sparql)
    
    return responseJena.convert()