def GetUriBF(graph, uri, bf, obj):
    
  q = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
         PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                SELECT ?uri ?label
                  WHERE {{ 
                    <{uri}> bf:{bf} ?uri .
                    ?uri rdfs:label ?label .
                    FILTER isIRI(?uri)
                    }}"""
  
  response = graph.query(q)
  bindings = response.bindings
  if len(bindings) > 0:
      elements = list()
      for binding in bindings:
         label = binding.get('label')
         e = {'label': label.value,
               'lang': label.language if label.language else None,
               'uri': binding.get('uri').toPython()}
         elements.append(e)

      for e in elements:
         q = f"""PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            SELECT ?type WHERE {{
                <{e['uri']}> rdf:type ?type .
            }} """
         response = graph.query(q)
         bindings = response.bindings
         types = [i.get('type').toPython() for i in bindings]
         e['type'] = types
      obj[bf] = elements
      
  return obj