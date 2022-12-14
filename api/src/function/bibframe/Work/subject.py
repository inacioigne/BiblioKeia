from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def Subject(g, subject, work_uri, BF, MADSRDF):

    scheme = URIRef(subject['schema'])

    BNsubject = BNode()
    g.add((work_uri, BF.subject, BNsubject))
    g.add((BNsubject, RDF.type, BF.Topic))
    if subject["type"] == "SimpleType":
        g.add((BNsubject, RDF.type, MADSRDF.Topic))
        g.add((BNsubject, RDFS.label, Literal(subject['label'])))
        g.add((BNsubject, MADSRDF.authoritativeLabel, Literal(subject['label'], lang=subject['lang'])))
        g.add((BNsubject, MADSRDF.isMemberOfMADSScheme, scheme))
    elif subject["type"] == "ComplexType":
        label = subject['label']
        subjects = label.split("--")
        g.add((BNsubject, RDF.type, MADSRDF.ComplexSubject))
        g.add((BNsubject, RDFS.label, Literal(label, lang=subject['lang'])))
        g.add((BNsubject, MADSRDF.authoritativeLabel, Literal(label, lang=subject['lang'])))
        g.add((BNsubject, MADSRDF.isMemberOfMADSScheme, scheme))
        BNlist1 = BNode()
        g.add((BNsubject, MADSRDF.componentList, BNlist1))
        BNtopic1 = BNode()
        g.add((BNlist1, RDF.first, BNtopic1))
        g.add((BNtopic1, RDF.type, MADSRDF.Topic))
        g.add((BNtopic1, MADSRDF.authoritativeLabel, Literal(subjects[0], lang=subject['lang'])))
        BNlist2 = BNode()
        BNtopic2 = BNode()
        g.add((BNlist1, RDF.rest, BNlist2))
        g.add((BNlist2, RDF.first, BNtopic2))
        g.add((BNtopic2, RDF.type, MADSRDF.Topic))
        g.add((BNtopic2, MADSRDF.authoritativeLabel, Literal(subjects[1], lang=subject['lang'])))
        g.add((BNlist2, RDF.rest, RDF.nil))



    return g



