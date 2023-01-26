from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF

def Classification(g, request, uri, BF): 

    classification = BNode()
    g.add((uri, BF.classification, classification))
    g.add((classification, RDF.type, BF.ClassificationDdc))
    g.add((classification, BF.classificationPortion, Literal(request.cdd)))
    if request.cutter != "":
        g.add((classification, BF.itemPortion, Literal(request.cutter)))

    return g