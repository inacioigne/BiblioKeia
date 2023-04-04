from fastapi import APIRouter, HTTPException
from src.schemas.authorities.topic import Topic, Authority, Uri
from src.function.authorities.topic.create_topic import MakeGraph, MakeDoc
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.authorities.topic.edit_authority import EditAuthority
from src.function.authorities.topic.delete_topic import DeleteGraph
from src.function.authorities.topic.edit_mads import DelMads, PostMads

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

@router.post("/topic", status_code=201) 
async def create_topic(request: Topic):
    
    graph = MakeGraph(request)
    responseJena = fuseki_update.run_sparql(graph)
    doc = MakeDoc(request)
    responseSolr = solr.add([doc], commit=True)

    return {
        'jena': responseJena.convert(), 
        'solr': responseSolr }

@router.delete("/topic", status_code=201) 
async def delete_topic(id: str):
    upTopic = DeleteGraph(id)
    
    responseJena = fuseki_update.run_sparql(upTopic)
    return {
        'jena': responseJena.convert(), 
        # 'solr': responseSolr 
        }

@router.put("/topic/authority", status_code=201) 
async def edit_authority(id:str, request: Authority):

    upLabel, upElementValue = EditAuthority(id, request)

    responseLabel = fuseki_update.run_sparql(upLabel)
    responseElement = fuseki_update.run_sparql(upElementValue)

    doc = {
    'id': 'sh85017405',
    'label': {"set": request.value},
    'lang': {"set": request.lang} }
    
    responseSolr = solr.add([doc], commit=True)

    return {
        "label": responseLabel.convert()['message'],
        "element": responseElement.convert()['message'],
        'solr': responseSolr }

@router.delete("/topic/mads", status_code=201) 
async def delete_mads(id:str, request: Uri):

    upMads = DelMads(id, request)
    responseUpMads = fuseki_update.run_sparql(upMads)

    doc = {
    'id': id,
    f'{request.mads}': {"remove": request.uri}
      }
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": responseUpMads.convert()['message'],
        "solr": responseSolr
        } 

@router.post("/topic/mads", status_code=201) 
async def post_mads(id:str, request: Uri):

    upMads = PostMads(id, request)
    if upMads:
        responseUpMads = fuseki_update.run_sparql(upMads)
        doc = {'id': id,
                f'{request.mads}': {"add": request.uri}  }
        responseSolr = solr.add([doc], commit=True)

        return {
        "jena": responseUpMads.convert()['message'],
        "solr": responseSolr
        } 
    else:
        raise HTTPException(status_code=409, detail="Metadado já existe")

    

