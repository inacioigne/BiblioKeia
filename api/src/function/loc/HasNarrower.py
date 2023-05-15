from .graphExist import GraphExist

def GetHasNarrower(authority, graph, obj):

    ask = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            SELECT * WHERE  {{
              <{authority}> madsrdf:hasNarrowerAuthority ?value .
              ?value madsrdf:authoritativeLabel ?label
              }}"""
    response = graph.query(ask)
    if len(response.bindings) > 0:
        external = list()
        internal = list()
        for i in response.bindings:
           url = i.get('value')
           exist = GraphExist(url)
           if exist:
                uri = {
                   "value": exist['uri']['value'],
                   "base": "bk",
                   "label": {
                       "value": exist['label']['value'],
                       "lang": "pt" } }
                internal.append(uri)
           else:
               uri = {
                   "value": url,
                   "base": "loc",
                   "label": {
                       "value": i.get('label').value,
                       "lang": i.get('label').language } }
               external.append(uri)
        if len(internal) > 0:
            obj['hasNarrowerAuthority'] = internal
        if len(external) > 0:
            obj['hasNarrowerExternalAuthority'] = external
    return obj

def GetHasNarrowerExternal(authority, graph, obj):

    query = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            SELECT * WHERE  {{
              <{authority}> madsrdf:hasNarrowerExternalAuthority ?value .
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
        return external
    else:
        return False
