from rdflib import URIRef, BNode, Literal, XSD
from rdflib.namespace import RDF, RDFS

def IdentifiedBy(g, count, adm, BF):
    identifiedBy = BNode()
    g.add((adm, BF.identifiedBy, identifiedBy))
    g.add((identifiedBy, RDF.type, BF.Local))
    g.add((identifiedBy, BF.assigner, URIRef("http://id.loc.gov/vocabulary/organizations/brmninpa")))
    g.add((identifiedBy, RDF.value, Literal(count)))

    return g
