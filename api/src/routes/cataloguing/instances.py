from fastapi import APIRouter
from src.schemas.bibframe.instance import Instance_Schema
from rdflib import Graph, Namespace, URIRef, Literal
from rdflib.namespace import RDF, RDFS
from src.function.bibframe.Work.title import Title
from src.function.bibframe.Work.workAdmin import WorkAdmin
from src.function.bibframe.Instance.extent import Extent
from src.function.bibframe.Instance.instance import BfInstance

router = APIRouter()


@router.post("/instance", status_code=201)
async def create_instance(request: Instance_Schema):

    g = BfInstance(request)
    g.serialize("instance.nt")

    return request.dict()
