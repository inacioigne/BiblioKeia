def GetLiteral(graph, uri, bf, obj):
    
  q = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT ?label WHERE {{
        <{uri}> bf:{bf} ?o .
        ?o rdfs:label ?label
        }}"""
  
  response = graph.query(q)
  bindings = response.bindings
  if len(bindings) > 0:
      binding = bindings[0]
      label = binding.get('label').value
      obj[bf] = label         
      
  return obj