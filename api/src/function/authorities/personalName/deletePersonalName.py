def DeleteGraphPersonalName(id):
    name = """PREFIX name: <https://bibliokeia.com/authorities/name/>
            PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            
            WITH name:{}
            DELETE {{ ?s ?p ?o  }}
            WHERE {{ ?s ?p ?o  }}"""


    deleteName = name.format(id)
    
    return deleteName
from pyfuseki import FusekiUpdate
from src.schemas.settings import Settings

settings = Settings()
authorityUpdate = FusekiUpdate(f'{settings.url}:3030', 'authority')

def DeletePersonalName(item_id):
    authority = f'https://bibliokeia.com/authorities/PersonalName/{item_id}'
    d = f"""DELETE {{ graph <{authority}> {{ ?s ?p ?o }} }}
            WHERE {{
            graph <{authority}> {{ ?s ?p ?o. }}
            }}"""
    deleteJena = authorityUpdate.run_sparql(d)
    

    