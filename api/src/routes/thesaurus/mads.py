from fastapi import APIRouter
from src.schemas.thesaurus.deleteAuthority import SchemaDeleteAuthority
from src.function.rdf.thesarus.makeGraphName import MakeGraphName
from src.function.solr.docAgents import MakeDocAgents
from src.function.authorities.nextId import GenerateId
from pyfuseki import FusekiUpdate
from src.schemas.settings import Settings
from src.db.init_db import session
from src.db.models import Authority
from pysolr import Solr
from src.function.solr.deleteAuthority import DeleteAuthoritySolr
from src.function.solr.docSubject import UpdateDelete
from src.schemas.thesaurus.mads import SchemaMads
from datetime import datetime 

settings = Settings()
authorityUpdate = FusekiUpdate(f'{settings.url}:3030', 'authority')
solr = Solr(f'{settings.url}:8983/solr/authority/', timeout=10)

router = APIRouter() 

# Post Authority
@router.post("/create", status_code=200) 
async def post_authority(request: SchemaMads):
    item_id = GenerateId()
    uri = f'https://bibliokeia.com/authority/{request.type}/{item_id}'

    # MariaDB
    a = Authority(id=item_id, type=request.type, uri=uri)
    session.add(a) 
    session.commit()
    
    # Jena
    graph = MakeGraphName(request, item_id)
    response = authorityUpdate.run_sparql(graph)

    # Solr
    doc = MakeDocAgents(request, item_id)
    responseSolr = solr.add([doc], commit=True)

    return {
        "id": item_id,
         "jena": response.convert()['message'],
        "solr": responseSolr
        } 

# Delete Autority
@router.delete("/delete", status_code=200) 
async def delete_authority(request: SchemaDeleteAuthority ):
    # Jena
    authority = f'https://bibliokeia.com/authority/{request.type.value}/{request.id}'
    d = f"""DELETE {{ graph <{authority}> {{ ?s ?p ?o }} }}
            WHERE {{
            graph <{authority}> {{ ?s ?p ?o. }}
            }}"""
    responseJena = authorityUpdate.run_sparql(d)
    
    # Solr
    r = solr.search(q=f'id:{request.id}', **{'fl': '*,[child]'})
    [doc] = r.docs
    responseSolr = DeleteAuthoritySolr(doc) 
    response = {'jena': responseJena.convert()['message'], 'solr': responseSolr}
    response = UpdateDelete(doc, response, authority)

    return response

# Delete Autority
@router.put("/edit", status_code=200) 
async def edit_authority(request: SchemaMads ):
    authority = f'https://bibliokeia.com/authority/{request.type}/{request.identifiersLocal}'
    request.adminMetadata.changeDate = datetime.now()
    request.adminMetadata.status.label = 'Editado'
    request.adminMetadata.status.value = 'e'
    graph = MakeGraphName(request, request.identifiersLocal)
    deleteGraph = f"""DELETE {{ graph <{authority}> {{ ?s ?p ?o }} }}
            WHERE {{
            graph <{authority}> {{ ?s ?p ?o. }}
            }}"""
    deleteJena = authorityUpdate.run_sparql(deleteGraph)
    postJena = authorityUpdate.run_sparql(graph)

    # # Solr
    doc = MakeDocAgents(request, request.identifiersLocal)
    responseSolr = solr.add([doc], commit=True)
    
    # print(graph)
    return {
        'jena': {'deleteGraph': deleteJena.convert()['message'],
                 'postGraph': postJena.convert()['message']},
        'solr': responseSolr 
            }