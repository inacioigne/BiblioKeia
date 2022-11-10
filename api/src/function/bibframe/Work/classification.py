from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF

def Classification(g, request, work_uri, BF): 

    classification = BNode()
    g.add((work_uri, BF.classification, classification))
    g.add((classification, RDF.type, BF.ClassificationDdc))
    g.add((classification, BF.classificationPortion, Literal(request.cdd)))
    g.add((classification, BF.itemPortion, Literal(request.cutter)))

    return g