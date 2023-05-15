def GetCloseExternal(authority, graph, obj):

    query = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            SELECT * WHERE  {{
              <{authority}> madsrdf:hasCloseExternalAuthority ?value .
              ?value madsrdf:authoritativeLabel ?label
              }}"""
    response = graph.query(query)
    if len(response.bindings) > 0:
        external = list()
        for i in response.bindings:
           url = i.get('value')
           base = url.split("//")[1].split("/")[0]
           uri = {
                   "value": url,
                   "base": base,
                   "label": {
                       "value": i.get('label').value,
                       "lang": i.get('label').language } }
           external.append(uri)
        obj['hasCloseExternalAuthority'] = external
    
    return obj
