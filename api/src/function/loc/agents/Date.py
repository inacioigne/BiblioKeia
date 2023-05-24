def GetDate(rwo, typeDate, graph, obj):

    q = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    SELECT ?date
    WHERE  {{      	
    <{rwo}> madsrdf:{typeDate} ?date . }}"""
    result = graph.query(q)

    if len(result.bindings) > 0:
        [birthDate] = result.bindings
        obj[typeDate] = birthDate.get('date').n3().split('"')[1]
        
    return obj