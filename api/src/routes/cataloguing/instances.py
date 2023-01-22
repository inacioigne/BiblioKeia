from fastapi import APIRouter
from src.schemas.bibframe.instance import Instance_Schema
from rdflib import Graph, Namespace, URIRef, Literal
from rdflib.namespace import RDF, RDFS
from src.function.bibframe.Work.title import Title
from src.function.bibframe.Work.workAdmin import WorkAdmin
from src.function.bibframe.Instance.extent import Extent
from src.function.bibframe.Instance.instance import BfInstance
from pyfuseki import FusekiUpdate
from src.function.solr.docInstance import DocInstance
from src.function.cataloguing.generate_id import GenerateId

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'acervo')

@router.post("/instance", status_code=201)
async def create_instance(request: Instance_Schema):

    instance_id = GenerateId()
    instance_id = instance_id['id']

    g = BfInstance(request, instance_id)
    g.serialize("instance.nt") 
    nt = g.serialize(format='nt')

    

    G = """
    INSERT DATA {
        GRAPH <https://bibliokeia.com/bibframe/instance/"""+instance_id+""">
        { \n"""+nt+"} }" 
    
    response = fuseki_update.run_sparql(G)
    DocInstance(request, instance_id)

    return {"id": instance_id, "jena": response.convert() }
