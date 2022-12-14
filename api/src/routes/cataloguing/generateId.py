from fastapi import APIRouter
# from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
# from datetime import date, datetime
from src.function.cataloguing.generate_id import GenerateId

router = APIRouter()

@router.get("/next_id")
async def generate_id():

    register = GenerateId()

    return { 'id': register }