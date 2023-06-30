from pyfuseki import FusekiQuery, FusekiUpdate
import pysolr  
from src.schemas.settings import Settings

settings = Settings()
collectionQuery = FusekiQuery(f'{settings.url}:3030', 'collection')
collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')
solrAcervo = pysolr.Solr(f'{settings.url}/solr/acervo/', timeout=10)

def DeleteWork(id):
    uri = f'https://bibliokeia.com/resources/work/{id}'
    # Jena
    sparql = f"""DELETE {{ graph <{uri}> 
        {{ ?s ?p ?o }} }} 
        WHERE {{
        graph ?g {{ ?s ?p ?o. }}
        }}"""
    responseJena = collectionUpdate.run_sparql(sparql)

    # Solr
    responseSolr = solrAcervo.delete(q=f"id:{id}",  commit=True)
    
    return {'responseJena': responseJena, 'responseSolr': responseSolr}

