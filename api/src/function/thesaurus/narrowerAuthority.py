from rdflib import URIRef, Literal
from rdflib.namespace import RDF

def NarrowerAuthority(g, uri, MADSRDF, authoritys):

    for authority in authoritys:

        narrower = URIRef(authority.uri)

        g.add((uri, 
        MADSRDF.hasNarrowerAuthority, 
        URIRef(authority.uri)))

        g.add((narrower, RDF.type, MADSRDF.Authority))
        g.add((narrower, MADSRDF.authoritativeLabel, Literal(authority.value, lang=authority.lang)))
        collection = URIRef(
        "http://id.loc.gov/authorities/subjects/collection_LCSH_General")
        g.add((narrower, MADSRDF.isMemberOfMADSCollection, collection))
    
    return g 