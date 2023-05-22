from pysolr import Solr

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

def PostUriSol(request):
    solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)
    id = request.authority.split("/")[-1]
    idUri = request.uri.split("/")[-1]
    doc = {
        "id": id,
        f"{request.type}": {
            "add":  {
                "id": f"{id}/{request.type}#{idUri}",
                "uri": request.uri,
                "label":request.value,
                "lang": request.lang,
                "base": request.base                
            }
        } }
    solr.add([doc], commit=True)
    

def UpdatePostUri(request, metadata):
    solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)
    
    uri = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            INSERT DATA 
            {{ GRAPH  <{request.uri}>
            {{
            <{request.uri}> madsrdf:{metadata} <{request.authority}> 
            }} }}"""
    
    auId = request.uri.split("/")[-1]
    idUri = request.authority.split("/")[-1]

    doc = {
        "id": id,
        f"{metadata}": {
            "add":  {
                "uri": request.authority,
                "label":request.value,
                "lang": request.lang,
                "id": f"{auId}/{metadata}#{idUri}",
            }
        } }
    solr.add([doc], commit=True)
    
    return uri

def UpdateDeleteUri(request, metadata):
    solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)
    uri = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            DELETE DATA 
            {{ GRAPH  <{request.uri}>
            {{
            <{request.uri}> madsrdf:{metadata} <{request.authority}> 
            }} }}"""
    auId = request.uri.split("/")[-1]
    idUri = request.authority.split("/")[-1]
    responseSolr = solr.delete(q=f"id:{auId}/{request.type}#{idUri}",  commit=True)
    return uri