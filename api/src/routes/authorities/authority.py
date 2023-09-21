from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.authorities.nextId import GenerateId
from src.schemas.authorities.authority import DeleteAuthority
from src.function.authorities.makeElement import MakeElement
from src.function.authorities.makeLabel import MakeLabel
from src.function.authorities.makeVariant import MakeSparqlVariant, EditVariantJena
from src.schemas.authorities.authority import Variant, EditVariant
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
from src.schemas.settings import Settings

settings = Settings()

router = APIRouter() 
authorityUpdate = FusekiUpdate(f'{settings.url}:3030', 'authority')
solr = Solr(f'{settings.url}:8983/solr/authority/', timeout=10)

# Delete Autority
@router.delete("/", status_code=200) 
async def delete_authority(request: DeleteAuthority):

    # id = authority.split("/")[-1] 
    authority = f'https://bibliokeia.com/authorities/{request.type}/{request.id}'
    r = solr.search(q=f'id:{request.id}', **{'fl': '*,[child]'})
    [doc] = r.docs

    d = f"""DELETE {{ graph <{authority}> {{ ?s ?p ?o }} }}
            WHERE {{
            graph <{authority}> {{ ?s ?p ?o. }}
            }}"""
            
    responseJena = authorityUpdate.run_sparql(d)
    responseSolr = DeleteAuthoritySolr(request.id) 
    response = {'jena': responseJena.convert()['message'], 'solr': responseSolr}
    response = UpdateDelete(doc, response, authority)
    
    return response

# Delete Autority
@router.get("/next", status_code=200) 
async def next_id():

    nextID = GenerateId()

    return nextID

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

# Post Variant
@router.post("/mads/variant", status_code=200) 
async def post_variant(authority: str, request: Variant):

    label = MakeLabel(request.elementList)
    
    variant = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        INSERT DATA 
        {{ GRAPH <{authority}> 
        {{ <{authority}> madsrdf:hasVariant [ a madsrdf:{request.type},
                        madsrdf:Variant ;
                    madsrdf:elementList ( {MakeElement(request.elementList)} ) ;
                    madsrdf:variantLabel "{label}" ] }} 
        }}"""
    responseJena = fuseki_update.run_sparql(variant)
    # Solr
    idUri = authority.split("/")[-1]
    add = {
        "id":idUri,
        "variant":{ "add": label}
        }
    responseSolr = solr.add([add], commit=True)
    response = {
        "jena": responseJena.convert()['message'],
        "solr": responseSolr
        } 
    return response   

# Delete Variant
@router.delete("/mads/variant", status_code=200) 
async def delete_uri(authority: str, request: Variant):

    qVariant = MakeSparqlVariant(authority, request)
    deleteVariant = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        WITH <{authority}> 
        DELETE {{{qVariant}}}
        WHERE {{ {qVariant}}}"""
    responseJena = fuseki_update.run_sparql(deleteVariant)
    # SOLR
    label = [i.elementValue.value for i in request.elementList]
    label = " ".join(label)
    idSolr = authority.split("/")[-1]
    doc = {
        'id':idSolr,
        "variant": {"remove": label}
    }
    responseSolr = solr.add([doc], commit=True)

    response = {
        "jena": responseJena.convert()['message'],
        "solr": responseSolr
        } 
    
    return response

# Delete Variant
@router.put("/mads/variant", status_code=200) 
async def put_uri(authority: str, request: EditVariant):

    responseJena = EditVariantJena(authority, request)
    # Solr
    idSolr = authority.split("/")[-1]
    oldLabel = [i.elementValue.value for i in request.old.elementList]
    oldLabel = " ".join(oldLabel)
    oldDoc = {
        'id':idSolr,
        "variant": {"remove": oldLabel}
    }
    newLabel = [i.elementValue.value for i in request.new.elementList]
    newLabel = " ".join(newLabel)
    newDoc = {
        'id':idSolr,
        "variant": {"add": newLabel}
    }
    responseSolr = solr.add([oldDoc, newDoc], commit=True)

    response = {
        "jena": responseJena['message'],
        "solr": responseSolr
        }
    return response




