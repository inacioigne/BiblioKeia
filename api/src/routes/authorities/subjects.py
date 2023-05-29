from fastapi import APIRouter, HTTPException
# import httpx
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.solr.docSubject import UpdateDelete
from src.function.authorities.subject.uri import PostUriSol
from src.function.authorities.subject.editElementValue import EditElementValue
from src.function.authorities.subject.variant import EditVariant, DeleteVariant, PostVariant, VariantSolr
from src.function.authorities.subject.uri import DeleteUri, PostUri, UpdatePostUri, UpdateDeleteUri
from src.function.authorities.upadeteAuthority import UpadeteAuthority
from src.function.authorities.makeGraph import MakeGraphSubject
from src.function.authorities.generateID import GenerateId
from src.function.solr.docSubject import MakeDocSubject, DeleteDoc
from src.schemas.authorities.subject import Subject, Value, VariantEdit, VariantPost, UriEdit, UriDelete

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

# Add Autority
@router.post("/subject/", status_code=201) 
async def post_subject(request: Subject):
  
    id = GenerateId()
    graph = MakeGraphSubject(request, id)
    response = fuseki_update.run_sparql(graph)

    doc = MakeDocSubject(request, id)
    responseSolr = solr.add([doc], commit=True)

    UpadeteAuthority(request, id)

    return {
        "id": id,
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 

# Post URI
@router.post("/subject/uri", status_code=200) 
async def post_uri(request: UriEdit):
    
    uri = PostUri(request)
    responseJena = fuseki_update.run_sparql(uri)
    PostUriSol(request)
    
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
    response.update(update)
      
    return response

# Delete URI
@router.delete("/subject/uri", status_code=200) 
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

# # Edit Element
# @router.put("/subject/elementValue", status_code=200) 
# async def edit_elementValue(request: Value):

#     elementValue = EditElementValue(request)
#     response = fuseki_update.run_sparql(elementValue)
#     auId = request.authority.split("/")[-1]
#     doc = {
#         "id": auId,
#         "label":{ "set": request.value}
#         }
#     responseSolr = solr.add([doc], commit=True)

#     return {
#         "jena": response.convert()['message'],
#         "solr": responseSolr
#         } 

# Edit Variant
@router.put("/subject/variant", status_code=200) 
async def edit_variant(request: VariantEdit):

    variant = EditVariant(request)
    response = fuseki_update.run_sparql(variant)
    responseSolr = VariantSolr(request)
    
    return {
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 

# Delete Variant
@router.delete("/subject/variant", status_code=200) 
async def delete_variant(request: Value):

    variant = DeleteVariant(request)
    response = fuseki_update.run_sparql(variant)
    idUri = request.authority.split("/")[-1]
    remove = {
        "id":idUri,
        "variant":{ "remove": request.value}
        }
    responseSolr = solr.add([remove], commit=True)
    
    return {
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 

# Add Variant
@router.post("/subject/variant", status_code=200) 
async def post_variant(request: VariantPost):

    variant = PostVariant(request)
    response = fuseki_update.run_sparql(variant)
    idUri = request.authority.split("/")[-1]
    add = {
        "id":idUri,
        "variant":{ "add": request.value}
        }
    responseSolr = solr.add([add], commit=True)
    
    return {
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 

