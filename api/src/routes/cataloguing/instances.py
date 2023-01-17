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

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'acervo')

@router.post("/instance", status_code=201)
async def create_instance(request: Instance_Schema):

    g = BfInstance(request)
    g.serialize("instance.nt") 
    nt = g.serialize(format='nt')

    G = """PREFIX bk: <https://bibliokeia.com/authorities/subjects/>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    INSERT DATA {
        GRAPH <http://bibliokeia.com/bibframe/instance/"""+str(request.instanceOf)+""">
        { \n"""+nt+"} }" 
    
    fuseki_update.run_sparql(G)
    DocInstance(request)

    return { "instance": request.instanceOf }
