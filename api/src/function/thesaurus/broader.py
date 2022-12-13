from rdflib import URIRef, Literal
from rdflib.namespace import RDF

def Broader(g, uri, MADSRDF, authoritys):

    for authority in authoritys:
        broader = URIRef(authority.uri)

        g.add((uri, 
        MADSRDF.hasBroaderAuthority, 
        URIRef(authority.uri)))

        g.add((broader, RDF.type, MADSRDF.Authority))
        g.add((broader, MADSRDF.authoritativeLabel, Literal(authority.value, lang=authority.lang)))
        collection = URIRef(
        "http://id.loc.gov/authorities/subjects/collection_LCSH_General")
        g.add((broader, MADSRDF.isMemberOfMADSCollection, collection))

    return g

