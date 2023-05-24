def GetUri(authority, graph, metadata, obj):

    query = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            SELECT * WHERE  {{
              <{authority}> madsrdf:{metadata} ?value .
              ?value madsrdf:authoritativeLabel ?label
              }}"""
    response = graph.query(query)
    if len(response.bindings) > 0:
        external = list()
        for i in response.bindings:
            url = i.get('value').toPython()
            base = url.split("//")[1].split("/")[0]
            uri = {
                   "value": url,
                   "base": base,
                   "label": i.get('label').value }
            external.append(uri)
        obj[metadata] = external
        
    return obj