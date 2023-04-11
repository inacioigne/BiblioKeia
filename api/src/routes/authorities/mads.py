from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.schemas.authorities.authority import Uri
from src.function.authorities.edit_uri import DelMads, PostMads

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

# Delete URI
@router.delete("/uri", status_code=200) 
async def delete_mads(request: Uri):

    upMads = DelMads(request)
    responseUpMads = fuseki_update.run_sparql(upMads)

    doc = {
    'id': id,
    f'{request.mads}': {"remove": request.uri}
      }
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": responseUpMads.convert()['message'],
        "solr": responseSolr
        } 

# # Add URI
@router.post("/uri", status_code=201) 
async def post_mads(request: Uri):

    upMads = PostMads(request)
    if upMads:
        responseUpMads = fuseki_update.run_sparql(upMads)
        doc = {'id': request.id,
                f'{request.mads}': {"add": request.uri}  }
        responseSolr = solr.add([doc], commit=True)

        return {
        "jena": responseUpMads.convert()['message'],
        "solr": responseSolr
        } 
    else:
        raise HTTPException(status_code=409, detail="Metadado já existe")
