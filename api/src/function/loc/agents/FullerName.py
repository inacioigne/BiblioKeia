def GetFullerName(graph, authority, obj):
    
  qFullerName = f"""PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    SELECT ?type ?value 
    WHERE  {{
    <{authority}> madsrdf:fullerName ?fullerName .
      ?fullerName rdf:type ?type .
      ?fullerName rdfs:label ?value
      }}"""
  r = graph.query(qFullerName)
  bindings = r.bindings
  if len(bindings) > 0:
    result = bindings[0]
    element = {
              "type": result.get('type').split("#")[1],
            "elementValue": {
              "value": result.get('value').toPython(),
              "lang": result.get('lang')
            }
          }
    obj['fullerName'] = element
    
  return obj