from rdflib import URIRef, Literal
from rdflib.namespace import RDF
from src.function.thesaurus.elementList import ElementList
from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
from src.function.thesaurus.update import UpdateThesarus

def GraphExist(token):
    store = SPARQLUpdateStore(update_endpoint='http://localhost:3030/thesaurus/update')
    query_endpoint = 'http://localhost:3030/thesaurus/query'
    update_endpoint = 'http://localhost:3030/thesaurus/update'
    store.open((query_endpoint, update_endpoint))

    query = "PREFIX bk: <https://bibliokeia.com/authorities/subjects/>\n \
                ASK WHERE { GRAPH bk:" + token +" { ?s ?p ?o } }"
    
    response = store.query(query)

    return response.askAnswer


def ReciprocalAuthority(g, uri, MADSRDF, request):

    for authority in request.reciprocalAuthority:

        token = authority.uri.split("/")[-1]
        graph = GraphExist(token)
        if graph:
            authority_uri = URIRef(f'https://bibliokeia.com/authorities/subjects/{token}')
            collection = URIRef('https://bibliokeia.com/authorities/subjects/collection_BKSH_General') 
            UpdateThesarus(token, "hasReciprocalAuthority", request.tokenLSCH)

            
        else:
            authority_uri = URIRef(authority.uri)
            collection = URIRef('http://id.loc.gov/authorities/subjects/collection_LCSH_General') 

        
        label = Literal(authority.value, lang=authority.lang)
        g.add((uri, 
            MADSRDF.hasReciprocalAuthority, 
            authority_uri))
        g.add((authority_uri, RDF.type, MADSRDF.Authority))
        g.add((authority_uri, MADSRDF.authoritativeLabel, label)) 
        g.add((authority_uri, MADSRDF.isMemberOfMADSCollection, collection))
    

    return g