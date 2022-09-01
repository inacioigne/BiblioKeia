from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF

def Classification(g, work, workMarc, BF): 

    classification = BNode()
    g.add((work, BF.classification, classification))
    g.add((classification, RDF.type, BF.ClassificationDdc))
    g.add((classification, BF.classificationPortion, Literal(workMarc.Classification())))

    return g