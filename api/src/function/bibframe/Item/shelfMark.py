from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS


def ShelfMarkDdc(g, item, uri, BF):
    shelfMark = BNode()
    g.add((uri, BF.shelfMark, shelfMark))
    g.add((shelfMark, RDF.type, BF.))

