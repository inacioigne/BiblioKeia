from fastapi import APIRouter
from src.schemas.authorities.topic import Topic, Authority
from src.function.authorities.topic import MakeGraph, MakeDoc
from pyfuseki import FusekiUpdate
from pysolr import Solr

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

@router.put("/topic/authority", status_code=201) 
async def edit_authority(id:str, request: Authority):

    label = """PREFIX topic: <https://bibliokeia.com/authorities/topic/>
                PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
                
                WITH topic:{id}
                DELETE {{ topic:{id} madsrdf:authoritativeLabel ?o  }}
                INSERT {{ topic:{id} madsrdf:authoritativeLabel '{value}'@{lang} }}
                WHERE {{ topic:{id} madsrdf:authoritativeLabel ?o }}"""

    elementValue = """PREFIX topic: <https://bibliokeia.com/authorities/topic/>
            PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            
            WITH topic:{id}
            DELETE {{ topic:{id} madsrdf:elementList ?elementList .
                        ?elementList rdf:rest rdf:nil .
                        ?elementList rdf:first ?element .
                        ?element rdf:type madsrdf:TopicElement .
                        ?element madsrdf:elementValue ?value  }}
            INSERT {{ topic:{id} madsrdf:elementList ?elementList .
                        ?elementList rdf:rest rdf:nil .
                        ?elementList rdf:first ?element .
                        ?element rdf:type madsrdf:TopicElement .
                        ?element madsrdf:elementValue '{value}'@{lang} }}
            WHERE {{ topic:{id} madsrdf:elementList ?elementList .
                        ?elementList rdf:rest rdf:nil .
                        ?elementList rdf:first ?element .
                        ?element rdf:type madsrdf:TopicElement .
                        ?element madsrdf:elementValue ?value }}"""

    d = request.dict()
    d['id'] = id
    upLabel = label.format(**d)

    responseLabel = fuseki_update.run_sparql(upLabel)

    upElementValue = elementValue.format(**d)
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
