def GetTitle(graph, uri): 

  q = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
              SELECT ?mainTitle 
                WHERE {{ 
                  <{uri}> bf:title ?title .
                ?title bf:mainTitle ?mainTitle
                  }}"""
  response = graph.query(q)
  [binding] = response.bindings
  mainTitle = binding.get('mainTitle').value
  title = {
    'mainTitle':mainTitle
  }
  
  return title