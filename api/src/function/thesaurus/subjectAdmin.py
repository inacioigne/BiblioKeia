from rdflib import URIRef, BNode, Literal, XSD
from rdflib.namespace import RDF
from datetime import datetime, date

def SubjectAdmin(g, uri, MADSRDF, RI):

    RecordInfo = BNode() 

    g.add((uri, MADSRDF.adminMetadata, RecordInfo))
    g.add((RecordInfo, RDF.type, RI.RecordInfo))
    g.add((RecordInfo, RI.recordContentSource, 
    URIRef("http://id.loc.gov/vocabulary/organizations/brmninpa")))
    g.add((RecordInfo, RI.recordStatus, 
    Literal("new", datatype=XSD.string)))
    g.add((RecordInfo, RI.recordChangeDate, 
    Literal(datetime.now(), datatype=XSD.dateTime)))

    return g
