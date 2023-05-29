from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr

from src.function.authorities.personalName.create_graph import MakePersonalGraph
from src.function.authorities.personalName.docPersonalName import MakeDocPersonalName
from src.function.authorities.personalName.deletePersonalName import DeleteGraphPersonalName
from src.function.authorities.personalName.editPersonalName import EditAuthorityPersonalName, EditFullerName, DeleteFullerName, PostFullerName
from src.function.authorities.personalName.datesPersonalName import EditDatePersonalName, DeleteDatePersonalName, PostDatePersonalName
from src.function.authorities.personalName.variantPersonalName import editVariantPersonalName, deleteVariantPersonalName, addVariantPersonalName
from src.schemas.authorities.mads import Authority, EditVariant
from src.schemas.authorities.personalName import PersonalName, Dates


router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

# Get Personal Name
@router.get("/personalName", status_code=200) 
async def get_personalName(id: str):
    response = solr.search(q=f"id:{id}")
    [doc] = response.docs
    return doc


# Create Graph
@router.post("/personalName", status_code=201) 
async def create_graph(request: PersonalName):

    personalGraph = MakePersonalGraph(request)
    responseJena = fuseki_update.run_sparql(personalGraph)

    doc = MakeDocPersonalName(request)
    responseSolr = solr.add([doc], commit=True)

    return {
        'jena': responseJena.convert(), 
        'solr': responseSolr }

# Delete Graph
@router.delete("/personalName", status_code=201) 
async def delete_topic(id: str):

    deleteName = DeleteGraphPersonalName(id)
    responseJena = fuseki_update.run_sparql(deleteName)
    responseSolr = solr.delete(q=f"id:{id}",  commit=True)
    
    return {
        'jena': responseJena.convert(), 
        'solr': responseSolr 
        }

# Edit Authority
@router.put("/personalName/authority", status_code=200) 
async def edit_authority(id:str, request: Authority):

    updates = EditAuthorityPersonalName(id, request)
    for i in updates:
        response = fuseki_update.run_sparql(i)

    doc = {
    'id': id,
    'label': {"set": request.value}}
    if request.date:
        doc['date'] = {"set": request.date}
    
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": response.convert()['message'],
        'solr': responseSolr }

# Edit fullerName
@router.put("/personalName/fullerName", status_code=200) 
async def edit_fullerName(id:str, request: Authority):

    name = EditFullerName(id, request)
    response = fuseki_update.run_sparql(name)

    doc = {
        'id': id,
        'fullerName': {"set": request.value}}
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": response.convert()['message'],
        'solr': responseSolr 
        }

# Delete fullerName
@router.delete("/personalName/fullerName", status_code=200) 
async def delete_fullerName(id:str, request: Authority):

    name = DeleteFullerName(id, request)
    response = fuseki_update.run_sparql(name)

    doc = {
        'id': id,
        'fullerName': {"remove": request.value}}
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": response.convert()['message'],
        'solr': responseSolr 
        }

# Post fullerName
@router.post("/personalName/fullerName", status_code=201) 
async def post_fullerName(id:str, request: Authority):

    name = PostFullerName(id, request)
    response = fuseki_update.run_sparql(name)

    doc = {
        'id': id,
        'fullerName': {"set": request.value}}
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": response.convert()['message'],
        'solr': responseSolr 
        }

# Edit Dates
@router.put("/personalName/date", status_code=200) 
async def edit_date(id:str, request: Dates):

    date = EditDatePersonalName(id, request)
    response = fuseki_update.run_sparql(date)

    doc = {
    'id': id,
    f'{request.type}': {"set": request.value}}
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": response.convert()['message'],
        'solr': responseSolr 
        }

# Delete Dates
@router.delete("/personalName/date", status_code=200) 
async def delete_date(id:str, request: Dates):

    date = DeleteDatePersonalName(id, request)
    response = fuseki_update.run_sparql(date)

    doc = {
    'id': id,
    f'{request.type}': {"remove": request.value}}
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": response.convert()['message'],
        'solr': responseSolr 
        }

# Post Dates
@router.post("/personalName/date", status_code=201) 
async def post_date(id:str, request: Dates):

    date = PostDatePersonalName(id, request)
    response = fuseki_update.run_sparql(date)

    doc = {
    'id': id,
    f'{request.type}': {"set": request.value}}
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": response.convert()['message'],
        'solr': responseSolr 
        }

# Edit Variant
@router.put("/personalName/variant", status_code=200) 
async def edit_variant(id:str, request: EditVariant):

    variant = editVariantPersonalName(id, request)
    response = fuseki_update.run_sparql(variant)

    remove = {
    'id': id,
    'hasVariant': {"remove": request.oldVariant.value } }
    add = {
    'id': id,
    'hasVariant': {"add": request.newVariant.value } }
    
    responseSolr = solr.add([remove, add], commit=True)

    return {
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 

# Delete Variant
@router.delete("/personalName/variant", status_code=200) 
async def delete_variant(id:str, request: Authority):

    variant = deleteVariantPersonalName(id, request)
    response = fuseki_update.run_sparql(variant)

    doc = {
        'id': id,
        'hasVariant': {"remove": request.value } }
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 

# Add Variant
@router.post("/personalName/variant", status_code=201) 
async def add_variant(id:str, request: Authority):

    variant = addVariantPersonalName(id, request)
    response = fuseki_update.run_sparql(variant)
    
    doc = {
        'id': id,
        'hasVariant': {"add": request.value } }
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 
