from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def SeriesStatement(g, request, uri, BF):

    if request.series:
        g.add((uri, BF.seriesStatement, Literal(request.series)))
    return g
