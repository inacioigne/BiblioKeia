from pysolr import Solr
from pyfuseki import FusekiUpdate

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
    fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
    
    uri = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            INSERT DATA 
            {{ GRAPH  <{request.uri}>
            {{
            <{request.uri}> madsrdf:{metadata} <{request.authority}> 
            }} }}"""
    responseJena = fuseki_update.run_sparql(uri)
    
    idUri = request.uri.split("/")[-1]
    auId = request.authority.split("/")[-1]
    r = solr.search(q=f'id:{auId}')
    [rdoc] = r.docs
    [label] = rdoc['label']

    doc = {
        "id": idUri,
        f"{metadata}": {
            "add":  {
                "id": f"{idUri}/{metadata}#{auId}",
                "uri": request.authority,
                "label": label,
                "lang": "pt",
                "base": "bk"
                
            }
        } }
    responseSolr = solr.add([doc], commit=True)
    
    return {'JenaUpdate':responseJena.convert()['message'], 'SolrUpdate': responseSolr}

def UpdateDeleteUri(request, metadata):
    fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
    solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)
    uri = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            DELETE DATA 
            {{ GRAPH  <{request.uri}>
            {{
            <{request.uri}> madsrdf:{metadata} <{request.authority}> 
            }} }}"""
    response = fuseki_update.run_sparql(uri)

    # Update solr
    uriID= request.uri.split("/")[-1]
    auID = request.authority.split("/")[-1]
    responseSolr = solr.delete(q=f"id:{uriID}/{request.type}#{auID}",  commit=True)


    # responseSolr = solr.delete(q=f"id:{auId}/{request.type}#{uriId}",  commit=True)
    
    return {
        'updateJena': response.convert()['message'],
        'updateSolr': responseSolr
        }