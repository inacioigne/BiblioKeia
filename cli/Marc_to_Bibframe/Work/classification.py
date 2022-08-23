from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF

def Classification(g, work, marc, BF):

    classification = BNode()
    g.add((work, BF.classification, classification))
    g.add((classification, RDF.type, BF.ClassificationDdc))
    g.add((classification, BF.classificationPortion, Literal(marc.cdd)))

    return g