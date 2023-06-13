from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate, FusekiQuery

settings = Settings()

collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')
# collectionQuery = FusekiQuery(f'{settings.url}:3030', 'collection')

def GetContent(graph, uri, obj):

  labels = { 'txt': 'Texto'}

  q = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
          SELECT ?content 
          WHERE {{ 
                  <{uri}> bf:content ?content
                  }}"""
  response = graph.query(q)
  bindings = response.bindings
  if len(bindings) > 0:
    binding = bindings[0]
    valeu = binding.get('content').toPython()
    code = valeu.split('/')[-1]
    content = {
      'value': valeu,
      'label': labels[code]
      }
    obj['content'] = content
    
  return obj

def EditContent(uri, data):

    if data.action == 'remove':
        sparql = f"""PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                DELETE DATA
                {{ GRAPH <{uri}>
                {{ <{uri}> bf:content <{data.value.get('uri')}> }} }} ; """
        response = collectionUpdate.run_sparql(sparql)
        print(response.convert())
    if data.action == 'add':
        sparql = f"""PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                INSERT DATA
                {{ GRAPH <{uri}>
                {{ <{uri}> bf:content <{data.value.get('uri')}> }} }} ; """
        response = collectionUpdate.run_sparql(sparql)
        print(response.convert())