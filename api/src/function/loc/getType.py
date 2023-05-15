def GetType(graph, authority):

  qtype = f"""PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
              PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
              PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
              SELECT ?type WHERE {{ 
                  <{authority}> rdf:type ?type .
                  FILTER ( ?type != madsrdf:Authority ) 
                  FILTER ( ?type != skos:Concept )
                  }}"""
  r = graph.query(qtype)
  tipo = r.bindings[0].get('type').split("#")[1]
  
  return tipo