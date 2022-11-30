from rdflib import Graph, URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def ElementList(g, uri, label, MADSRDF ):

    elementList = BNode()
    g.add((uri, MADSRDF.elementList, elementList))
    element = BNode()
    g.add((elementList, RDF.first, element))
    g.add((element, RDF.type, MADSRDF.TopicElement))
    g.add((element, MADSRDF.elementValue, Literal(label)))
    g.add((elementList, RDF.rest, RDF.nil))

    return g


