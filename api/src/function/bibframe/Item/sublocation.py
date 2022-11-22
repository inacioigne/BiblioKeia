from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS


def Sublocation(g, item, uri, BF):
    sublocation = BNode()
    g.add((uri, BF.sublocation, sublocation))
    g.add((sublocation, RDF.type, BF.Sublocation))
    label = Literal(item.sublocation)
    g.add((sublocation, RDFS.label, label))

    return g