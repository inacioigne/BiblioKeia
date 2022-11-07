from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def Subject(g, subject, work_uri, BF, MADSRDF):

    scheme = URIRef(subject['schema'])

    BNsubject = BNode()
    g.add((work_uri, BF.subject, BNsubject))
    g.add((BNsubject, RDF.type, BF.Topic))
    g.add((BNsubject, RDF.type, MADSRDF.Topic))
    g.add((BNsubject, RDFS.label, Literal(subject['label'])))
    g.add((BNsubject, MADSRDF.authoritativeLabel, Literal(subject['label'], lang=subject['lang'])))
    g.add((BNsubject, MADSRDF.isMemberOfMADSScheme, scheme))

    return g



