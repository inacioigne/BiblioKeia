from rdflib.namespace import RDF, RDFS
from rdflib import Graph, BNode, URIRef, Literal

def Note(g, InstanceMarc, BFinstance, BF):
    note = BNode()
    g.add((BFinstance, BF.note, note))
    g.add((note, RDF.type, BF.Note))
    g.add((note, RDFS.label, Literal(InstanceMarc.Note())))

    return g