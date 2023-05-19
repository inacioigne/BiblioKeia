from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.authorities.subject.uri import PostUriSol
from src.function.authorities.subject.editElementValue import EditElementValue
from src.function.authorities.subject.variant import EditVariant, DeleteVariant, PostVariant
from src.function.authorities.subject.uri import DeleteUri, PostUri, UpdatePostUri, UpdateDeleteUri
from src.function.authorities.upadeteAuthority import UpadeteAuthority
from src.function.authorities.makeGraph import MakeGraphSubject
from src.function.authorities.generateID import GenerateId
from src.function.solr.docSubject import MakeDocSubject
from src.schemas.authorities.subject import Subject, Value, VariantEdit, VariantPost, UriEdit

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

# Add Autority
@router.post("/subject/", status_code=201) 
async def post_subject(request: Subject):
  
    id = GenerateId()

    graph = MakeGraphSubject(request, id)
    response = fuseki_update.run_sparql(graph)
    UpadeteAuthority(request, id)

    doc = MakeDocSubject(request, id)
    responseSolr = solr.add([doc], commit=True)

    return {
        "id": id,
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 

# Post URI
@router.post("/subject/uri", status_code=200) 
async def post_uri(request: UriEdit):
    

    uri = PostUri(request)
    response = fuseki_update.run_sparql(uri)
    PostUriSol(request)
    
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

# Delete URI
@router.delete("/subject/uri", status_code=200) 
async def delete_uri(request: UriEdit):

    uri = DeleteUri(request)
    auId = request.authority.split("/")[-1]
    uriId = request.uri.split("/")[-1]
    responseSolr = solr.delete(q=f"id:{auId}/{request.type}#{uriId}",  commit=True)
    
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
        "solr": responseSolr
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
@router.delete("/subject/", status_code=200) 
async def delete_subject(uri: str):

    d = f"""DELETE {{ graph <{uri}> {{ ?s ?p ?o }} }}
            WHERE {{
            graph <{uri}> {{ ?s ?p ?o. }}
            }}"""

    response = fuseki_update.run_sparql(d)
    response.convert()
    