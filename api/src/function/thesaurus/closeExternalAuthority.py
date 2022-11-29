from rdflib import Graph, URIRef, BNode, Literal, Namespace
from rdflib.namespace import RDF, RDFS

def CloseExternalAuthority(g, uri, MADSRDF, ExternalAuthority):

    for authority in ExternalAuthority:
        g.add((uri, 
        MADSRDF.hasCloseExternalAuthority, 
        URIRef(authority)))
    
    return g


    
