def GetUriBF(graph, uri, bf, obj):
    
  q = f"""PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
                SELECT ?uri ?label ?type
                  WHERE {{ 
                    <{uri}> bf:{bf} ?uri .
                    ?uri rdfs:label ?label .
                    ?uri rdf:type ?type
                    }}"""
  response = graph.query(q)
  bindings = response.bindings
  if len(bindings) > 0:
      forms = list()
      for binding in bindings:
         label = binding.get('label')
         f = {
            'label': label.value,
            'lang': label.language if label.language else None,
            'uri': binding.get('uri').toPython(),
            'type': binding.get('type').toPython()}
         forms.append(f)       
      obj[bf] = forms
      
  return obj