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