def GetType(graph, uri):

  qtype = f"""PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
              PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
              PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
              SELECT ?type WHERE {{ 
                  <{uri}> rdf:type ?type .
                 
                  }}"""
  response = graph.query(qtype)
  tipos = list()
  for i in response.bindings:
    tipo = i.get('type').split("/")[-1]
    tipos.append(tipo)
  
  return tipos