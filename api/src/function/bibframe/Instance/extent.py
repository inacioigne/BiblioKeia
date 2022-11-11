from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def Extent(g, request, uri, BF):
    extent = BNode()
    g.add((uri, BF.extent, extent))
    g.add((extent, RDF.type, BF.Extent))
    g.add((extent, RDFS.label, Literal(request.extent)))

    return g

