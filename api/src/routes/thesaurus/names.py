from pyfuseki import FusekiUpdate
from fastapi import APIRouter
from src.schemas.thesaurus.name import Name_Schema
from rdflib import Graph, URIRef

def Make_Graph(nt, token ):
    G1 = """PREFIX bk: <https://bibliokeia.com/authorities/names/>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    INSERT DATA {
        GRAPH bk:"""

    G2 = " {"

    G3 = """}
    }"""

    G = G1+str(token)+" { \n"+nt+"}}"



    return G

router = APIRouter()
fuseki_update = FusekiUpdate('http://localhost:3030', 'authority')

@router.post("/name", status_code=201) 
async def create_name(request: Name_Schema):
    


    G = Make_Graph(request.nt, request.token )

    fuseki_update.run_sparql(G)


    return {'msg': 'registro salvo com sucesso!!'}

@router.post("/name/import/lcnaf/{token}", status_code=201)
async def create_name(token: str):
    g = Graph()
    g.parse(f'https://id.loc.gov/authorities/names/{token}.rdf')
    contributorTo = URIRef('http://id.loc.gov/ontologies/bflc/contributorTo')

    #REMOVE CONTRIBUTIONS
    for s, p, o in g:
        if p == contributorTo:
            g.remove((o, None, None))
            print(s, o)
    g.remove((None, contributorTo, None))

    #REMOVE SUBJECTOF
    subjectOf = URIRef('http://id.loc.gov/ontologies/bflc/subjectOf')
    for s, p, o in g:
        if p == subjectOf:
            g.remove((o, None, None))
            print(s, o)
    g.remove((None, subjectOf, None))

    nt = g.serialize(format='nt')
    G = Make_Graph(nt, token )
    fuseki_update.run_sparql(G)
    g.serialize('name.nt')
    return {'msg': 'registro importado com sucesso!!'}

