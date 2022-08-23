from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF

def Chamada(g, work, marc, BF):

    identifiedBy = BNode()
    g.add((work, BF.identifiedBy, identifiedBy))
    g.add((identifiedBy, RDF.type, BF.Local))
    g.add((identifiedBy, BF.assigner, URIRef("http://id.loc.gov/vocabulary/organizations/brmninpa")))
    g.add((identifiedBy, RDF.value, Literal(marc.Chamada())))

    return g