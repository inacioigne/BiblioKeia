from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS


def ShelfMarkDdc(g, item, uri, BF):
    shelfMark = BNode()
    g.add((uri, BF.shelfMark, shelfMark))
    g.add((shelfMark, RDF.type, BF.ShelfMarkDdc))
    label = Literal(item.call)
    g.add((shelfMark, RDFS.label, label))
    g.add((shelfMark, BF.assigner, URIRef("http://id.loc.gov/vocabulary/organizations/brmninpa")))

    return g

