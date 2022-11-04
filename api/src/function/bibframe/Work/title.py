from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def Title(g, request, work_uri, BF):
    title = BNode()
    g.add((work_uri, BF.title, title))
    g.add((title, RDF.type, BF.Title))
    g.add((title, BF.mainTitle, Literal(request.mainTitle)))
    label = request.mainTitle
    if request.subtitle:
        label = request.mainTitle+request.subtitle
        g.add(( title, BF.subtitle, Literal(request.subtitle) ))
    g.add((title, RDFS.label, Literal(label)))
    # if marc.Title().get('subtitle'):
    #     g.add((title, BF.subtitle, Literal(marc.Title().get('subtitle'))))    

    return g