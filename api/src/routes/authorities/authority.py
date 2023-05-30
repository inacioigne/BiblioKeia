from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.authorities.subject.uri import UpdateDeleteUri
from src.function.authorities.subject.uri import DeleteUri
from src.schemas.authorities.subject import UriDelete
from src.schemas.authorities.authority import UriEdit
from src.function.authorities.subject.uri import PostUriJena, PostUriSolr, UpdatePostUri
from src.function.authorities.editAuthority import AddDataSolr
from src.function.authorities.editAuthority import DeleteDataJena, AddDataJena, DeleteDataSolr
from src.schemas.authorities.authority import EditMads
from src.function.authorities.subject.editElementValue import EditElementValue
from src.schemas.authorities.subject import Value
from src.function.solr.docSubject import UpdateDelete

from src.function.solr.deleteAuthority import DeleteAuthoritySolr

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

# Delete Autority
@router.delete("/", status_code=200) 
async def delete_authority(authority: str):

    id = authority.split("/")[-1] 
    r = solr.search(q=f'id:{id}', **{'fl': '*,[child]'})
    [doc] = r.docs

    d = f"""DELETE {{ graph <{authority}> {{ ?s ?p ?o }} }}
            WHERE {{
            graph <{authority}> {{ ?s ?p ?o. }}
            }}"""
            
    responseJena = fuseki_update.run_sparql(d)
    responseSolr = DeleteAuthoritySolr(id)
    response = {'jena': responseJena.convert()['message'], 'solr': responseSolr}
    response = UpdateDelete(doc, response, authority)
    
    return response

# Edit Element
@router.put("/elementValue", status_code=200) 
async def edit_elementValue(request: Value):

    elementValue = EditElementValue(request)
    response = fuseki_update.run_sparql(elementValue)
    auId = request.authority.split("/")[-1]
    doc = {
        "id": auId,
        "label":{ "set": request.value}
        }
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 

# Edit Mads Autority
@router.put("/mads", status_code=200) 
async def edit_authority(authority: str, request:EditMads):

    if request.action == 'remove':
        jenaResponse = DeleteDataJena(authority, request)
        solrResponse = DeleteDataSolr(authority, request)
    elif request.action == 'add':
        jenaResponse = AddDataJena(authority, request)
        solrResponse = AddDataSolr(authority, request)

    return {'jena': jenaResponse, 
    # 'solr': solrResponse
    }

# Post Mads URI
@router.post("/mads/uri", status_code=200) 
async def post_uri(request: UriEdit):
    
    responseJena = PostUriJena(request)
    
    PostUriSolr(request)

    update = None    
    if request.type == 'hasBroaderAuthority':
        update = UpdatePostUri(request, "hasNarrowerAuthority")
        # response = fuseki_update.run_sparql(uri)
    if request.type == 'hasNarrowerAuthority':
        update = UpdatePostUri(request, "hasBroaderAuthority")
        # response = fuseki_update.run_sparql(uri)
    if request.type == 'hasReciprocalAuthority':
        update = UpdatePostUri(request, "hasReciprocalAuthority")
        # response = fuseki_update.run_sparql(uri)

    response = {'jena': responseJena.convert()['message'] }
    if update:
        response.update(update)
      
    return response

# Delete URI
@router.delete("/mads/uri", status_code=200) 
async def delete_uri(request: UriDelete):

    uri = DeleteUri(request)
    auId = request.authority.split("/")[-1]
    uriId = request.uri.split("/")[-1]
    responseSolr = solr.delete(q=f"id:{auId}/{request.type}#{uriId}",  commit=True)
    
    responseJena = fuseki_update.run_sparql(uri)
    response = {
        "jena": responseJena.convert()['message'],
        "solr": responseSolr
        } 

    if request.type == 'hasBroaderAuthority':
        resposneUpdate = UpdateDeleteUri(request, "hasNarrowerAuthority")
        response.update(resposneUpdate)

    if request.type == 'hasNarrowerAuthority':
        resposneUpdate = UpdateDeleteUri(request, "hasBroaderAuthority")
        response.update(resposneUpdate)

    if request.type == 'hasReciprocalAuthority':
        resposneUpdate = UpdateDeleteUri(request, "hasReciprocalAuthority")
        response.update(resposneUpdate)

    return response


