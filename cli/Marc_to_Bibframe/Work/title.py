from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def Title(g, work, marc, BF):
    title = BNode()
    g.add((work, BF.title, title))
    g.add((title, RDF.type, BF.Title))
    g.add((title, RDFS.label, Literal(marc.Title().get('label'))))
    g.add((title, BF.mainTitle, Literal(marc.Title().get('title'))))
    if marc.Title().get('subtitle'):
        g.add((title, BF.subtitle, Literal(marc.Title().get('subtitle'))))    

    return g