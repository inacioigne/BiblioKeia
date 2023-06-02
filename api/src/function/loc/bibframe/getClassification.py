def GetClassification(graph, uri, obj):

  q = f"""PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
              PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
              PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
              SELECT ?classificationPortion ?itemPortion ?edition WHERE {{ 
                  <{uri}> bf:classification ?classification .
                  ?classification rdf:type ?type .
                  ?classification bf:classificationPortion ?classificationPortion .
                  ?classification bf:edition ?edition .
                  OPTIONAL{{ ?classification bf:itemPortion ?itemPortion }}
                  FILTER(?type = bf:ClassificationDdc) 
                  }}"""
  response = graph.query(q)
  bindings = response.bindings
  if len(bindings) > 0:
    binding = bindings[0]
    c = {
      'type': 'ClassificationDdc',
      'classificationPortion': binding.get('classificationPortion').toPython(),
      'itemPortion': binding.get('itemPortion').toPython() if binding.get('itemPortion') else None,
      'edition': binding.get('edition').toPython() if binding.get('edition') else None }
    obj['classification'] = c
    
  return obj