from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.function.solr.docSubject import UpdateDelete
from src.function.solr.deleteAuthority import DeleteAuthoritySolr
from src.function.solr.docAgents import MakeDocAgents
from src.function.authorities.agents.makeGraph import MakeGraphAgents
from src.function.authorities.generateID import GenerateId
from src.schemas.authorities.personalName import PersonalName
from src.schemas.settings import Settings
from src.function.loc.graphExistLoc import GraphExistLoc
from src.db.init_db import session
from src.db.models import Authority
from datetime import datetime 

settings = Settings()

router = APIRouter()
authorityUpdate = FusekiUpdate(f'{settings.url}:3030', 'authority')

solr = Solr(f'{settings.url}:8983/solr/authority/', timeout=10)


# Add Autority
@router.post("/personalName/", status_code=201) 
async def post_personalName(request: PersonalName): 
    
    if request.identifiersLccn:
        exist = GraphExistLoc(request.identifiersLccn)
        if exist:
            raise HTTPException(status_code=409, detail="Esse registro já existe")
  
    # id = GenerateId() 
    authority = session.query(Authority).order_by(Authority.id.desc()).first()
    if authority:
        id = authority.id + 1
        uri = f'https://bibliokeia.com/authorities/{request.type}/{id}'
    else:
        id = 1
        uri = f'https://bibliokeia.com/authorities/{request.type}/{id}'

    a = Authority(id=id, type=request.type, uri=uri)
    session.add(a) 
    session.commit()

    graph = MakeGraphAgents(request, id)
    response = authorityUpdate.run_sparql(graph)

    doc = MakeDocAgents(request, id)
    responseSolr = solr.add([doc], commit=True)

    # UpadeteAuthority(request, id)

    return {
        "id": id,
        "jena": response.convert()['message'],
        "solr": responseSolr
        } 

# Put Autority
@router.put("/personalName/{item_id}", status_code=201) 
async def edit_personalName(item_id: int, request: PersonalName):
    authority = f'https://bibliokeia.com/authorities/PersonalName/{item_id}'
    request.adminMetadata.changeDate = datetime.now()
    request.adminMetadata.status.label = 'Editado'
    request.adminMetadata.status.value = 'e'
    graph = MakeGraphAgents(request, item_id)

    d = f"""DELETE {{ graph <{authority}> {{ ?s ?p ?o }} }}
            WHERE {{
            graph <{authority}> {{ ?s ?p ?o. }}
            }}"""
            
    deleteJena = authorityUpdate.run_sparql(d)
    postJena = authorityUpdate.run_sparql(graph)

    # # Solr
    doc = MakeDocAgents(request, item_id)
    responseSolr = solr.add([doc], commit=True)

    # print(responseSolr) 
    return {'jena': [deleteJena.convert()['message'], postJena.convert()['message']],
            'solr': responseSolr }

# Put Autority
@router.delete("/personalName/{item_id}", status_code=200) 
async def delete_personalName(item_id: int):
    authority = f'https://bibliokeia.com/authorities/PersonalName/{item_id}'
    d = f"""DELETE {{ graph <{authority}> {{ ?s ?p ?o }} }}
            WHERE {{
            graph <{authority}> {{ ?s ?p ?o. }}
            }}"""
    responseJena = authorityUpdate.run_sparql(d)

    r = solr.search(q=f'id:{item_id}', **{'fl': '*,[child]'})
    [doc] = r.docs
    responseJena = authorityUpdate.run_sparql(d)
    responseSolr = DeleteAuthoritySolr(item_id) 
    response = {'jena': responseJena.convert()['message'], 'solr': responseSolr}
    response = UpdateDelete(doc, response, authority)

    return response