from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def Edition(g, request, uri, BF):
    g.add((uri, BF.editionStatement, Literal(request.edition)))

    return g