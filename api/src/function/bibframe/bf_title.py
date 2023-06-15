def GetTitle(graph, uri): 

  q = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
            SELECT ?mainTitle ?subtitle ?label
            WHERE {{ 
                <{uri}> bf:title ?title .
                 ?title rdfs:label ?label .
  ?title bf:mainTitle ?mainTitle .
  OPTIONAL {{ ?title bf:subtitle ?subtitle }}
                  }}"""
  response = graph.query(q)
  [binding] = response.bindings
  mainTitle = binding.get('mainTitle').value

  title = {
    'mainTitle':mainTitle,
    'subtitle': binding.get('subtitle').value,
    'label': binding.get('label').value,
  }
  
  return title