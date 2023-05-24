def GetOccuption(rwo, graph, obj):

    q = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    SELECT ?occupation ?label
    WHERE  {{      	
    <{rwo}> madsrdf:occupation ?occupation .
   ?occupation madsrdf:authoritativeLabel ?label  }} """
    result = graph.query(q)
    if len(result.bindings) > 0:
       occupations = list()
       for i in result.bindings:
        value = i.get('occupation').toPython()
        base = value.split('//')[1].split("/")[0]
        occupation = {'value': value,
                     'label': i.get('label').value,
                     'base': base}
        occupations.append(occupation)
    obj['occupation'] = occupations
    
    return obj