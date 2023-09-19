from fastapi import APIRouter
from src.function.cataloguing.generate_id import GenerateId


router = APIRouter()

@router.get("/next_id")
async def generate_id():

    

    register = GenerateId() 

    return register

   