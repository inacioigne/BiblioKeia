from rdflib import Graph, URIRef, BNode, Literal
from rdflib.namespace import RDF

def ComponentList(g, uri, label, MADSRDF):

    componentList = BNode()
    g.add((uri, MADSRDF.componentList, componentList))
    element1 = BNode()
    g.add((componentList, RDF.first, element1))
    g.add((element1, RDF.type, MADSRDF.Topic))
    element2 = BNode() 
    g.add((element1, RDF.rest, element2))  

    
    g.add((element2, RDF.rest, RDF.nil))
    
    return g