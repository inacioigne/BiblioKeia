from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate

settings = Settings()

collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')

def GetContribution(graph, uri, obj):
    
  q = f"""PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
                SELECT ?type ?role ?agent ?label
                  WHERE {{ 
                    <{uri}> bf:contribution ?contribution .
                      ?contribution rdf:type ?type .
                      ?contribution bf:role ?role .
                      ?contribution bf:agent ?agent .
                      ?agent rdfs:label ?label
                      FILTER ( ?type != bf:Contribution )
                    }}"""
  response = graph.query(q)
  bindings = response.bindings
  if len(bindings) > 0:
      contributions = list()
      for binding in bindings:
         c = {'type': [binding.get('type').toPython()],
          'agent': binding.get('agent').toPython(),
          'label': binding.get('label').toPython(),
          'role': binding.get('role').toPython()}
         contributions.append(c)
      obj['contribution'] = contributions
      
  return obj

def EditContribution(uri, data):

    prefix = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX bflc:    <http://id.loc.gov/ontologies/bflc/>"""

    if data.action == 'edit':
        sparql = f"""{prefix}
        WITH <{uri}>
        DELETE {{  <{uri}> bf:contribution ?o .
                        ?o ?p ?s }}
        INSERT {{ <{uri}> bf:contribution ?o .
                  ?o rdf:type {", ".join(data.value.get('type'))} .
                  ?o bf:agent  <{data.value.get('agent')}> .
                  { f'?o bf:role "{data.value.get("role")}"' if data.value.get('role') else '' }
                }}
        WHERE {{ <{uri}> bf:contribution ?o .
                    ?o bf:agent  <{data.value.get('agent')}> .}} """
        response = collectionUpdate.run_sparql(sparql)
        print(response.convert())

    elif data.action == 'remove':
        sparql = f"""{prefix}
        WITH <{uri}>
        DELETE {{ <{uri}> bf:contribution ?contribution .
                      ?contribution bf:agent <{data.value.get('agent')}> .
                      ?contribution rdf:type ?type .
                      ?contribution bf:role ?role . }}
        WHERE {{ <{uri}> bf:contribution ?contribution .
                    ?contribution bf:agent  <{data.value.get('agent')}> .
                    ?contribution rdf:type ?type .
                    ?contribution bf:role ?role . }} """
        response = collectionUpdate.run_sparql(sparql)
        print(response.convert())

    elif data.action == 'add':
        sparql = f"""{prefix}
            INSERT DATA
            {{ GRAPH <{uri}>
            {{ <{uri}> bf:contribution [ a { ", ".join([i for i in data.value['type']]) } ;
                bf:agent <{data.value['agent']}> ; 
                bf:role <{data.value['role']}> ] ; }} }} ; """
        response = collectionUpdate.run_sparql(sparql)
        print(response.convert() )  
