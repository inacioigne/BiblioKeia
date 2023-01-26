from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def Title(g, request, uri, label, BF):
    title = BNode()
    g.add((uri, BF.title, title))
    g.add((title, RDF.type, BF.Title))
    g.add((title, BF.mainTitle, Literal(request.mainTitle)))
    if request.subtitle: 
        g.add((title, BF.subtitle, Literal(request.subtitle)))
    g.add((title, RDFS.label, label))

    # VariantTitle 
    if request.variantTitle:
        variantTitle = BNode()
        g.add((uri, BF.title, variantTitle))
        g.add((variantTitle, RDF.type, BF.VariantTitle))
        g.add((variantTitle, BF.mainTitle, Literal(request.variantTitle)))


    
    return g