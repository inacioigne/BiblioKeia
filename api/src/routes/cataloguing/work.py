from fastapi import APIRouter
from src.schemas.bibframe.work import Work_Schema
from rdflib import Graph, Namespace, URIRef
from src.function.cataloguing.generate_id import GenerateId
from src.function.bibframe.Work.work import BfWork

router = APIRouter()

def Work(request):
    work_id = GenerateId()
    #work_uri = URIRef(f"http://bibliokeia.com/bibframe/work/{work_id}") 
    g = BfWork(request, work_id )

    return g


@router.post("/work", status_code=201)
async def create_work(request: Work_Schema):
    g = Work(request)
    g.serialize("work.nt")
    
    

    return request.dict()
