def GetElementList(graph, authority, obj):
    
  qElementList = f"""PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    SELECT ?type ?value 
    WHERE  {{
    <{authority}> madsrdf:elementList ?elementList .
    ?elementList rdf:rest* ?rest .
    ?rest rdf:first ?first .
    ?first rdf:type ?type  .
    ?first madsrdf:elementValue ?value
      }}"""
  r = graph.query(qElementList)
  bindings = r.bindings
  elementList = list()

  for i in bindings:
    element = {
            "type": i.get('type').split("#")[1],
          "elementValue": {
            "value":  i.get('value').toPython(),
            "lang": i.get('lang')
          }
        }
    elementList.append(element)
  obj['elementList'] = elementList

  return obj