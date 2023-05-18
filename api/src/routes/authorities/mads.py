from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.authorities.subject.editElementValue import EditElementValue
from src.function.authorities.subject.variant import EditVariant, DeleteVariant, PostVariant
from src.function.authorities.subject.uri import DeleteUri, PostUri, UpdatePostUri, UpdateDeleteUri
from src.function.authorities.upadeteAuthority import UpadeteAuthority
from src.schemas.authorities.mads import Uri
from src.schemas.authorities.authority import Authority
from src.function.authorities.edit_uri import DelMads, PostMads
from src.function.authorities.personalName.docPersonalName import GetLabelLoc
from src.function.authorities.makeGraph import MakeGraphSubject
from src.function.authorities.generateID import GenerateId
from src.function.solr.docSubject import MakeDocSubject
from src.schemas.authorities.subject import Subject, Value, VariantEdit, VariantPost, UriEdit

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

# Post External URI
@router.post("/subject/uri", status_code=200) 
async def post_uri(request: UriEdit):

    uri = PostUri(request)
    response = fuseki_update.run_sparql(uri)
    if request.type == 'hasBroaderAuthority':
        uri = UpdatePostUri(request, "hasNarrowerAuthority")
        response = fuseki_update.run_sparql(uri)
    if request.type == 'hasNarrowerAuthority':
        uri = UpdatePostUri(request, "hasBroaderAuthority")
        response = fuseki_update.run_sparql(uri)
    if request.type == 'hasReciprocalAuthority':
        uri = UpdatePostUri(request, "hasReciprocalAuthority")
        response = fuseki_update.run_sparql(uri)
      
    return {
        "jena": response.convert()['message'],
        # "solr": responseSolr
        } 

# External URI
@router.delete("/subject/uri", status_code=200) 
async def delete_uri(request: UriEdit):

    uri = DeleteUri(request)
    response = fuseki_update.run_sparql(uri)
    if request.type == 'hasBroaderAuthority':
        uri = UpdateDeleteUri(request, "hasNarrowerAuthority")
        response = fuseki_update.run_sparql(uri)
    if request.type == 'hasNarrowerAuthority':
        uri = UpdateDeleteUri(request, "hasBroaderAuthority")
        response = fuseki_update.run_sparql(uri)
    if request.type == 'hasReciprocalAuthority':
        uri = UpdateDeleteUri(request, "hasReciprocalAuthority")
        response = fuseki_update.run_sparql(uri)


    return {
        "jena": response.convert()['message'],
        # "solr": responseSolr
        } 

# Edit Element
@router.put("/subject/elementValue", status_code=200) 
async def edit_elementValue(request: Value):

    elementValue = EditElementValue(request)
    response = fuseki_update.run_sparql(elementValue)

    return {
        "jena": response.convert()['message'],
        # "solr": responseSolr
        } 

# Edit Variant
@router.put("/subject/variant", status_code=200) 
async def edit_variant(request: VariantEdit):

    variant = EditVariant(request)
    response = fuseki_update.run_sparql(variant)
    
    return {
        "jena": response.convert()['message'],
        # "solr": responseSolr
        } 

# Delete Variant
@router.delete("/subject/variant", status_code=200) 
async def delete_variant(request: Value):

    variant = DeleteVariant(request)
    response = fuseki_update.run_sparql(variant)
    
    return {
        "jena": response.convert()['message'],
        # "solr": responseSolr
        } 

# Add Variant
@router.post("/subject/variant", status_code=200) 
async def delete_variant(request: VariantPost):

    variant = PostVariant(request)
    response = fuseki_update.run_sparql(variant)
    
    return {
        "jena": response.convert()['message'],
        # "solr": responseSolr
        } 

# Add Autority
@router.post("/subject/", status_code=201) 
async def post_subject(request: Subject):
  
    id = GenerateId()

    graph = MakeGraphSubject(request, id)
    response = fuseki_update.run_sparql(graph)
    UpadeteAuthority(request, id)

    # doc = MakeDocSubject(request, id)
    # responseSolr = solr.add([doc], commit=True)

    return {
        "id": id,
        "jena": response.convert()['message'],
        # "solr": responseSolr
        } 



# # Delete URI
# @router.delete("/uri", status_code=200) 
# async def delete_mads(request: Uri):

#     upMads = DelMads(request)
#     responseUpMads = fuseki_update.run_sparql(upMads)

#     # doc = {
#     # 'id': id,
#     # f'{request.mads}': {"remove": request.uri}
#     #   }
#     # responseSolr = solr.add([doc], commit=True)
#     child = request.uri.split("/")[-1]
#     q = f"id:{request.id}!{child}"
#     responseSolr = solr.delete(q=q, commit=True)

#     return {
#         "jena": responseUpMads.convert()['message'],
#         "solr": responseSolr
#         } 

# # # Add URI
# @router.post("/uri", status_code=201) 
# async def post_mads(request: Uri):

#     upMads = PostMads(request)
#     if upMads:
#         responseUpMads = fuseki_update.run_sparql(upMads)

#         # doc = {'id': request.id,
#         #         f'{request.mads}': {"add": request.uri}  }
#         # label = GetLabelLoc(request.uri)
#         child = request.uri.split("/")[-1]
        
#         uri = {'id': f'{request.id}!{child}',
#         'collection': request.collection,
#         'label': request.label,
#         'uri': request.uri}

#         doc = {'id': request.id,
#                 f'{request.mads}': {"add": uri}  }
#         responseSolr = solr.add([doc], commit=True)

#         return {
#         "jena": responseUpMads.convert()['message'],
#         "solr": responseSolr
#         } 
#     else:
#         raise HTTPException(status_code=409, detail="Metadado já existe")
