from fastapi import APIRouter, HTTPException

router = APIRouter()

# Import Loc
@router.post("/import/loc", status_code=200) 
async def post_authority(uri: str):
    # id = GenerateId()

    # graph = MakeGraph(request, id)
    # response = fuseki_update.run_sparql(graph)
    # doc = MakeDoc(request, id)
    # responseSolr = solr.add([doc], commit=True)

    return {
        "uri": uri,
        
        } 
