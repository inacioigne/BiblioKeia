from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def ResponsibilityStatement(g, request, uri, BF):
    g.add((uri, BF.responsibilityStatement, Literal(request.responsibility)))
    
    return g
    