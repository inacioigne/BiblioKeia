from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF

def Chamada(g,BFwork,  workMarc, BF):

    identifiedBy = BNode()
    g.add((BFwork, BF.identifiedBy, identifiedBy))
    g.add((identifiedBy, RDF.type, BF.Local))
    g.add((identifiedBy, BF.assigner, URIRef("http://id.loc.gov/vocabulary/organizations/brmninpa")))
    g.add((identifiedBy, RDF.value, Literal(workMarc.Classification()+" "+workMarc.Cutter())))

    return g