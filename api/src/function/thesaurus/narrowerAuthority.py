from rdflib import URIRef, Literal
from rdflib.namespace import RDF
from src.function.thesaurus.graphExist import GraphExist
from src.function.thesaurus.update import UpdateThesarus

def NarrowerAuthority(g, uri, MADSRDF, request):

    for authority in request.narrower:

        #narrower = URIRef(authority.uri)
        token = authority.uri.split("/")[-1]
        graph = GraphExist(token) 
        if graph:
            authority_uri = URIRef(
                f'https://bibliokeia.com/authorities/subjects/{token}')
            collection = URIRef(
                'https://bibliokeia.com/authorities/subjects/collection_BKSH_General') 
            UpdateThesarus(
                token, "hasBroaderAuthority", request.tokenLSCH)
        else:
            authority_uri = URIRef(authority.uri)
            collection = URIRef('http://id.loc.gov/authorities/subjects/collection_LCSH_General') 

        label = Literal(authority.value, lang=authority.lang)
        g.add((uri, 
        MADSRDF.hasNarrowerAuthority, 
        authority_uri))

        g.add((authority_uri, RDF.type, MADSRDF.Authority))
        g.add((authority_uri, MADSRDF.authoritativeLabel, label))
        # collection = URIRef(
        # "http://id.loc.gov/authorities/subjects/collection_LCSH_General")
        g.add((authority_uri, MADSRDF.isMemberOfMADSCollection, collection))
    
    return g 