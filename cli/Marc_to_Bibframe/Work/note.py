from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def Note(g, BFwork, label, BF): 

    note = BNode()
    g.add((BFwork, BF.note, note))
    g.add((note, RDF.type, BF.Note))
    g.add((note, RDFS.label, Literal(label.get('label'))))

    return g