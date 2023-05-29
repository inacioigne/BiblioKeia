def GetFieldOfActivity(rwo, graph, obj):

    q = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    SELECT ?fieldOfActivity ?label
    WHERE  {{      	
    <{rwo}> madsrdf:fieldOfActivity ?fieldOfActivity .
   ?fieldOfActivity madsrdf:authoritativeLabel ?label  }} """
    result = graph.query(q)
    if len(result.bindings) > 0:
        fields = list()
        for i in result.bindings:
            value = i.get('fieldOfActivity').toPython()
            base = value.split('//')[1].split("/")[0]
            field = {'value': value,
                        'label': i.get('label').value,
                        'base': base}
            fields.append(field)
        obj['fieldOfActivity'] = fields
    
    return obj