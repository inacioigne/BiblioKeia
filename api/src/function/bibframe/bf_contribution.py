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