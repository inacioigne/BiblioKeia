from fastapi import APIRouter
from src.schemas.thesaurus.subject import Subject_Schema, Update_Thesarus, Subject_Edit
from src.function.thesaurus.subjects.makeGraph import Make_Graph
from src.function.thesaurus.subjects.subject import CreateSubject
from src.function.solr.docSubject import DocSubject
from src.function.thesaurus.subjects.editSubject import EditSuject
from src.function.solr.docSubject import EditDocSubject
from pyfuseki import FusekiUpdate


router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')

@router.post("/subject", status_code=201) 
async def create_subject(request: Subject_Schema):

    nt = CreateSubject(request)
    G = Make_Graph(nt, request.tokenLSCH)

    fuseki_update.run_sparql(G)
    DocSubject(request)

    return {'uri': f'https://bibliokeia.com/authorities/subjects/{request.tokenLSCH}'}
    

@router.get("/subject/{tokenBK}", status_code=200) 
async def get_subject(tokenBK: str):
    q = """PREFIX madsrdf:  <http://www.loc.gov/mads/rdf/v1#> 
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX bk: <https://bibliokeia.com/authorities/subjects/>
        SELECT *
        WHERE { GRAPH  bk:sh85084414
        {?s ?p ?o }
        }
        LIMIT 10"""
    return {'subject': tokenBK}

# PUT
@router.put("/subject", status_code=201)
async def update_work(request: Subject_Edit, subject_id: str):
    EditSuject(request, subject_id)
    EditDocSubject(request, subject_id)

    return { "msg": "item atualizado com sucesso"}

@router.put("/update", status_code=201) 
async def update(request: Update_Thesarus):

    prefix = "PREFIX madsrdf:  <http://www.loc.gov/mads/rdf/v1#>\n \
        PREFIX bk: <https://bibliokeia.com/authorities/subjects/>\n \
        PREFIX lc: <http://id.loc.gov/authorities/subjects/>\n"

    for data in request.data:
        
        q1 = prefix + "WITH bk:" + request.graph + "\n \
        DELETE {?s madsrdf:" + data.metadata + " lc:" + data.token + "}\n \
        INSERT { ?s madsrdf:" + data.metadata + " bk:" + data.token + "}\n \
        WHERE { ?s madsrdf:" + data.metadata + " lc:" + data.token + "}\n"

        fuseki_update.run_sparql(q1)

        q2 = prefix + "WITH bk:" + request.graph + "\n \
            DELETE { lc:" + data.metadata + " ?p ?o }\n \
                INSERT { bk:" + data.metadata + " ?p ?o }\n \
                    WHERE { lc:" + data.metadata + "?p ?o }"

        fuseki_update.run_sparql(q2)

        q3 = prefix + "WITH bk:" + request.graph + "\n \
            DELETE { lc:" + data.metadata + " madsrdf:isMemberOfMADSCollection ?o }\n \
                INSERT { bk:" + data.metadata + " madsrdf:isMemberOfMADSCollection bk:collection_BKSH_General }\n \
                    WHERE { lc:" + data.metadata + " madsrdf:isMemberOfMADSCollection ?o }"
        
        fuseki_update.run_sparql(q3)

    return {'msg': "registro atualizado com sucesso"}
    
 
  