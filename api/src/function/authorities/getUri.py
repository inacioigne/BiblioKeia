def GetUri(obj, metadado, authority, graph):
    query = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            SELECT * WHERE  {{
              <{authority}> madsrdf:{metadado} ?value .
              ?value madsrdf:authoritativeLabel ?label
              }}"""
    response = graph.query(query)
    if len(response.bindings) > 0:
        uris = list()
        for i in response.bindings:
          uri = {
                  "value": i.get('value').n3().replace('<','').replace('>',''),
              "label": {
                "value": i.get('label').value,
                "lang": i.get('label').language
              } }
          uris.append(uri)
        obj[metadado] = uris
    return obj