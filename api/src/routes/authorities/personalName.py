from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.schemas.authorities.personalName import PersonalName
from src.function.authorities.personalName.create_graph import MakePersonalGraph
from src.function.authorities.personalName.docPersonalName import MakeDocPersonalName
from src.function.authorities.personalName.deletePersonalName import DeleteGraphPersonalName
from src.function.authorities.personalName.editPersonalName import EditAuthorityPersonalName
from src.schemas.authorities.authority import Authority

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

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

    name = EditAuthorityPersonalName(id, request)

    responseJena = fuseki_update.run_sparql(name)

    doc = {
    'id': id,
    'label': {"set": request.value}}
    if request.date:
        doc['date'] = {"set": request.date}
    
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": responseJena.convert()['message'],
        'solr': responseSolr }



