from rdflib import URIRef, BNode, Literal, XSD
from rdflib.namespace import DC, RDF, RDFS
from Marc_to_Bibframe.Marc.marcWork import MarcWork
from Marc_to_Bibframe.generationProcess import GenerationProcess
from Marc_to_Bibframe.identifiedBy import IdentifiedBy

def Admin(g, count, workMarc, BFinstance, BF):
    adm = BNode()
    g.add((BFinstance, BF.adminMetadata, adm))
    g.add((adm, RDF.type, BF.AdminMetadata))
    g.add((adm, BF.assigner, URIRef("http://id.loc.gov/vocabulary/organizations/brmninpa")))
    #creationDate
    g.add((adm, BF.creationDate, Literal(workMarc.creationDate(), datatype=XSD.date)))
    g = GenerationProcess(g, adm, BF)
    g = IdentifiedBy(g, count, adm, BF)
    g.add((adm, BF.status, URIRef("http://id.loc.gov/vocabulary/mstatus/n")))

    return g