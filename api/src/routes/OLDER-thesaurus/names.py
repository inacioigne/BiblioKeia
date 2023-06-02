from pyfuseki import FusekiUpdate
from fastapi import APIRouter, HTTPException
from src.schemas.thesaurus.name import Name_Schema
from rdflib import Graph, URIRef
from src.function.thesaurus.names.import_names import Import_Authority
from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore

router = APIRouter()

def GraphExist(token):
    store = SPARQLUpdateStore()
    query_endpoint = 'http://localhost:3030/authorities/query'
    update_endpoint = 'http://localhost:3030/authorities/update'
    store.open((query_endpoint, update_endpoint))


    query = "PREFIX bk: <https://bibliokeia.com/authorities/names/>\n \
                ASK WHERE { GRAPH bk:" + token +" { ?s ?p ?o } }"
  
    response = store.query(query)

    return response.askAnswer


@router.post("/name/import/lcnaf/{token}", status_code=201)
async def create_name(token: str):

    response = GraphExist(token)
   
    if response:
        raise HTTPException(status_code=409, detail="Registro ja existe no Thesaurs")
    else:
        status = Import_Authority(token)
        if status == 200:
            return {'msg': 'registro importado com sucesso!!'}
        else:
            raise HTTPException(status_code=status, detail="Erro ao importar registro")
     

