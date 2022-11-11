from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def Title(g, request, uri, label, BF):
    title = BNode()
    g.add((uri, BF.title, title))
    g.add((title, RDF.type, BF.Title))
    g.add((title, BF.mainTitle, Literal(request.mainTitle)))
    if request.subtitle: 
        g.add((title, BF.subtitle, Literal(request.subtitle)))

    # label = request.mainTitle
    # if request.subtitle:
    #     label = request.mainTitle+request.subtitle
    #     g.add(( title, BF.subtitle, Literal(request.subtitle) ))
    g.add((title, RDFS.label, label))
    
    return g