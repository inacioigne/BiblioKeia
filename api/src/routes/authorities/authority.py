from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.authorities.editAuthority import AddDataSolr
from src.function.authorities.editAuthority import DeleteDataJena, AddDataJena, DeleteDataSolr
from src.schemas.authorities.authority import EditAuthority
from src.function.authorities.subject.editElementValue import EditElementValue
from src.schemas.authorities.subject import Value
from src.function.solr.docSubject import UpdateDelete

from src.function.solr.deleteAuthority import DeleteAuthoritySolr

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

# Delete Autority
@router.delete("/", status_code=200) 
async def delete_authority(authority: str):

    id = authority.split("/")[-1] 
    r = solr.search(q=f'id:{id}', **{'fl': '*,[child]'})
    [doc] = r.docs

    d = f"""DELETE {{ graph <{authority}> {{ ?s ?p ?o }} }}
            WHERE {{
            graph <{authority}> {{ ?s ?p ?o. }}
            }}"""
            
    responseJena = fuseki_update.run_sparql(d)
    responseSolr = DeleteAuthoritySolr(id)
    response = {'jena': responseJena.convert()['message'], 'solr': responseSolr}
    response = UpdateDelete(doc, response, authority)
    
    return response

# Edit Autority
@router.put("/", status_code=200) 
async def edit_authority(authority: str, request:EditAuthority):

    if request.action == 'remove':
        jenaResponse = DeleteDataJena(authority, request)
        solrResponse = DeleteDataSolr(authority, request)
    elif request.action == 'add':
        jenaResponse = AddDataJena(authority, request)
        solrResponse = AddDataSolr(authority, request)


    
    return {'jena': jenaResponse, 
    # 'solr': solrResponse
    }

# Edit Element
@router.put("/elementValue", status_code=200) 
async def edit_elementValue(request: Value):

    elementValue = EditElementValue(request)
    response = fuseki_update.run_sparql(elementValue)
    auId = request.authority.split("/")[-1]
    doc = {
        "id": auId,
        "label":{ "set": request.value}
        }
    responseSolr = solr.add([doc], commit=True)

    return {
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 