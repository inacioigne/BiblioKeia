from fastapi import APIRouter, HTTPException
from src.schemas.authorities.authority import Authority
from src.schemas.authorities.topic import Topic, Uri, EditVariant
from src.function.authorities.topic.create_topic import MakeGraph, MakeDoc
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.authorities.topic.edit_authority import EditAuthority
from src.function.authorities.topic.delete_topic import DeleteGraph
#from src.function.authorities.topic.edit_mads import DelMads, PostMads
from src.function.authorities.topic.edit_variant import editVariant, deleteVariant, addVariant

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

# Create Graph
@router.post("/topic", status_code=201) 
async def create_topic(request: Topic):
    
    graph = MakeGraph(request)
    responseJena = fuseki_update.run_sparql(graph)
    doc = MakeDoc(request)
    responseSolr = solr.add([doc], commit=True)

    return {
        'jena': responseJena.convert(), 
        'solr': responseSolr }

# Delete Graph
@router.delete("/topic", status_code=201) 
async def delete_topic(id: str):
    upTopic = DeleteGraph(id)
    responseSolr = solr.delete(q=f"id:{id}",  commit=True)
    
    responseJena = fuseki_update.run_sparql(upTopic)
    return {
        'jena': responseJena.convert(), 
        'solr': responseSolr 
        }

# Edit Authority
@router.put("/topic/authority", status_code=200) 
async def edit_authority(id:str, request: Authority):

    upLabel, upElementValue = EditAuthority(id, request)

    responseLabel = fuseki_update.run_sparql(upLabel)
    responseElement = fuseki_update.run_sparql(upElementValue)

    doc = {
    'id': id,
    'label': {"set": request.value},
    'lang': {"set": request.lang} }
    
    responseSolr = solr.add([doc], commit=True)

    return {
        "label": responseLabel.convert()['message'],
        "element": responseElement.convert()['message'],
        'solr': responseSolr }

# Edit Variant
@router.put("/topic/variant", status_code=201) 
async def edit_variant(id:str, request: EditVariant):

    variant = editVariant(id, request)
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
@router.delete("/topic/variant", status_code=200) 
async def delete_variant(id:str, request: Authority):

    variant = deleteVariant(id, request)
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
@router.post("/topic/variant", status_code=201) 
async def add_variant(id:str, request: Authority):

    variant = addVariant(id, request)
    response = fuseki_update.run_sparql(variant)

    if request.type == 'Topic':
        doc = {
        'id': id,
        'hasVariant': {"add": request.value } }
    elif request.type == 'ComplexSubject':
        label = "--".join(request.value)
        doc = {
        'id': id,
        'hasVariant': {"add": label } }

    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 
