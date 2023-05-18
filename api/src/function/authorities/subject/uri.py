def DeleteUri(request):
    uri =  f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            DELETE DATA 
            {{ GRAPH  <{request.authority}>
            {{
            <{request.authority}> madsrdf:{request.type} <{request.uri}> 
            }} }}"""
    return uri

def PostUri(request):
    uri =  f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            INSERT DATA 
            {{ GRAPH  <{request.authority}>
            {{
            <{request.authority}> madsrdf:{request.type} <{request.uri}> 
            }} }}"""
    return uri

def UpdatePostUri(request, metadata):
    uri = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            INSERT DATA 
            {{ GRAPH  <{request.uri}>
            {{
            <{request.uri}> madsrdf:{metadata} <{request.authority}> 
            }} }}"""
    return uri

def UpdateDeleteUri(request, metadata):
    uri = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            DELETE DATA 
            {{ GRAPH  <{request.uri}>
            {{
            <{request.uri}> madsrdf:{metadata} <{request.authority}> 
            }} }}"""
    return uri