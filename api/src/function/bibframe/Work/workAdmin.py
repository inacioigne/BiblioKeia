from rdflib import URIRef, BNode, Literal, XSD
from rdflib.namespace import RDF
from datetime import datetime, date
from src.function.bibframe.generationProcess import GenerationProcess


def WorkAdmin(g, uri, ID, BF): 
    adm = BNode()
    g.add((uri, BF.adminMetadata, adm))
    g.add((adm, RDF.type, BF.AdminMetadata))
    #creationDate
    g.add((adm, BF.creationDate, Literal(date.today().strftime("%Y-%m-%d"), datatype=XSD.date)))
    g = GenerationProcess(g, adm, BF)
    identifiedBy = BNode()
    g.add((adm, BF.identifiedBy, identifiedBy))
    g.add((identifiedBy, RDF.type, BF.Local))
    g.add((identifiedBy, BF.assigner, URIRef("http://id.loc.gov/vocabulary/organizations/brmninpa")))
    g.add((identifiedBy, RDF.value, Literal(ID)))
    g.add((adm, BF.status, URIRef(f"http://id.loc.gov/vocabulary/mstatus/n")))

    return g