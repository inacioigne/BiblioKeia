from rdflib import URIRef, BNode, Literal, XSD
from rdflib.namespace import RDF

from Marc_to_Bibframe.generationProcess import GenerationProcess


def WorkAdmin(g, uri, work, numberWork, marc, BF):
    adm = BNode()
    g.add((work, BF.adminMetadata, adm))
    g.add((adm, RDF.type, BF.AdminMetadata))
    #creationDate
    g.add((adm, BF.creationDate, Literal(marc.creationDate(), datatype=XSD.date)))
    g = GenerationProcess(g, adm, BF)
    identifiedBy = BNode()
    g.add((adm, BF.identifiedBy, identifiedBy))
    g.add((identifiedBy, RDF.type, BF.Local))
    g.add((identifiedBy, BF.assigner, URIRef("http://id.loc.gov/vocabulary/organizations/brmninpa")))
    g.add((identifiedBy, RDF.value, Literal(numberWork )))
    g.add((adm, BF.status, URIRef(f"http://id.loc.gov/vocabulary/mstatus/n")))

    return g