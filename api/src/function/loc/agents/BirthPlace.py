def GetBirthPlace(rwo, graph, obj):

    q = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT ?label
    WHERE  {{      	
    <{rwo}> madsrdf:birthPlace ?birthPlace .
  ?birthPlace rdfs:label ?label }}"""
    result = graph.query(q)

    if len(result.bindings) > 0:
        [birthPlace] = result.bindings
        obj['birthPlace'] = birthPlace.get('label').toPython()
        
    return obj