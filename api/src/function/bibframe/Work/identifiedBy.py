from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def IdentifiedBy(g, request, uri, BF):

    if request.issn:
        issn = BNode()
        g.add((uri, BF.identifiedBy, issn))
        g.add((issn, RDF.type, BF.Issn))
        g.add((issn, RDF.value, Literal(request.issn)))
    
    return g