from api.src.function.loc.graphExistLoc import GraphExist
from pyfuseki import FusekiQuery

fuseki_query = FusekiQuery('http://localhost:3030', 'authorities')

def GetUriBK(url):
    token = url.split("/")[-1]
    queryBK = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
      PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
      SELECT ?uri ?label WHERE {{ graph ?g {{
          ?uri madsrdf:authoritativeLabel ?label .
        ?sub bf:identifiedBy ?identifiedBy .
          ?identifiedBy rdf:value "{token}"
          FILTER EXISTS {{ ?identifiedBy bf:assigner <http://id.loc.gov/vocabulary/organizations/dlc> }}
      }} }} """
    response = fuseki_query.run_sparql(queryBK)
    [binding] = response.convert()['results']['bindings']
    uri = {"value": binding['uri']['value'],
              "label": {
                "value": binding['label']['value'],
                "lang": "pt"
              } }
    return uri

def GetUri(obj, metadado, authority, graph):
    query = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            SELECT * WHERE  {{
              <{authority}> madsrdf:{metadado} ?value .
              ?value madsrdf:authoritativeLabel ?label
              }}"""
    response = graph.query(query)
    if len(response.bindings) > 0:
        uris = list()
        for i in response.bindings:
          url = i.get('value')
          if metadado in ['hasBroaderAuthority', 'hasNarrowerAuthority']:
            exist = GraphExist(url)
            if exist:
              uri = GetUriBK(url)
            else:
              uri = {
                    "value": url,
                    "label": {
                  "value": i.get('label').value,
                  "lang": i.get('label').language
                } }
          else:
            uri = {
                  "value": url,
                   "label": {
                "value": i.get('label').value,
                "lang": i.get('label').language
              } }
          uris.append(uri)
        obj[metadado] = uris
    return obj