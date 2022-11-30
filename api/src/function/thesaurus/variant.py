from rdflib import Graph, URIRef, BNode, Literal

def Variant(g, uri):

    variantList = BNode()

    g.add((uri, MADSRDF.adminMetadata, RecordInfo))