from rdflib.namespace import RDF, RDFS
from rdflib import Graph, BNode, URIRef, Literal

def Extent(g, InstanceMarc, BFinstance, BF):
    extent = BNode()
    g.add((BFinstance, BF.extent, extent))
    g.add((extent, RDF.type, BF.Extent))
    g.add((extent, RDFS.label, Literal(InstanceMarc.Extent())))

    return g