def GetContent(graph, uri, obj):

  labels = { 'txt': 'Texto'}

  q = f"""PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
              PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
              PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
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