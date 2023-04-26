from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.schemas.authorities.mads import Uri
from src.schemas.authorities.authority import Authority
from src.function.authorities.edit_uri import DelMads, PostMads
from src.function.authorities.personalName.docPersonalName import GetLabelLoc
from src.function.authorities.makeGraph import MakeGraph
from src.function.authorities.generateID import GenerateId

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

# Add Autority
@router.post("/", status_code=201) 
async def post_authority(request: Authority):
    id = GenerateId()

    graph = MakeGraph(request, id)
    response = fuseki_update.run_sparql(graph)

    return {
        "jena": response.convert()['message'],
        # "solr": responseSolr
        } 

# Delete URI
@router.delete("/uri", status_code=200) 
async def delete_mads(request: Uri):

    upMads = DelMads(request)
    responseUpMads = fuseki_update.run_sparql(upMads)

    # doc = {
    # 'id': id,
    # f'{request.mads}': {"remove": request.uri}
    #   }
    # responseSolr = solr.add([doc], commit=True)
    child = request.uri.split("/")[-1]
    q = f"id:{request.id}!{child}"
    responseSolr = solr.delete(q=q, commit=True)

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

        # doc = {'id': request.id,
        #         f'{request.mads}': {"add": request.uri}  }
        # label = GetLabelLoc(request.uri)
        child = request.uri.split("/")[-1]
        
        uri = {'id': f'{request.id}!{child}',
        'collection': request.collection,
        'label': request.label,
        'uri': request.uri}

        doc = {'id': request.id,
                f'{request.mads}': {"add": uri}  }
        responseSolr = solr.add([doc], commit=True)

        return {
        "jena": responseUpMads.convert()['message'],
        "solr": responseSolr
        } 
    else:
        raise HTTPException(status_code=409, detail="Metadado já existe")
