from rdflib import URIRef, BNode, Literal, XSD
from rdflib.namespace import RDF, RDFS
from datetime import datetime

def GenerationProcess(g, adm, BF):
    generationProcess = BNode()
    g.add((adm, BF.generationProcess, generationProcess))
    g.add((generationProcess, RDF.type, BF.GenerationProcess))
    g.add((generationProcess, RDFS.label, Literal("BiblioKeia")))
    g.add((generationProcess, BF.generationDate, Literal(datetime.now(), datatype=XSD.dateTime )))

    return g