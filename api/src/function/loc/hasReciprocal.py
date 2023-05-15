from .graphExist import GraphExist

def GetHasReciprocal(authority, graph, obj):

    query = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            SELECT * WHERE  {{
              <{authority}> madsrdf:hasReciprocalAuthority ?value .
              ?value madsrdf:authoritativeLabel ?label
              }}"""
    response = graph.query(query)
    if len(response.bindings) > 0:
        external = list()
        for i in response.bindings:
           url = i.get('value')
           exist = GraphExist(url)
           if exist:
               print(exist)
           else:
               uri = {
                   "value": url,
                   "base": "loc",
                   "label": {
                       "value": i.get('label').value,
                       "lang": i.get('label').language } }
               external.append(uri)
        if len(external) > 0:
            obj['hasReciprocalExternalAuthority'] = external
    return obj