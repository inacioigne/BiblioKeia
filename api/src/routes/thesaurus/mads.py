from fastapi import APIRouter

from src.schemas.thesaurus.mads import Authority

router = APIRouter() 

# Post Authority
@router.post("/create", status_code=200) 
async def post_authority(request: Authority):
    return request.model_dump()