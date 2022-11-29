from rdflib import Graph, URIRef, BNode, Literal, Namespace
from rdflib.namespace import RDF, RDFS
from src.function.thesaurus.subjectAdmin import SubjectAdmin
from src.function.thesaurus.elementList import ElementList
from src.function.thesaurus.closeExternalAuthority import CloseExternalAuthority

def CreateSubject(request):

    MADSRDF = Namespace("http://www.loc.gov/mads/rdf/v1#")
    RI = Namespace("http://id.loc.gov/ontologies/RecordInfo#")
    
    g = Graph()
    g.bind("madsrdf", MADSRDF)
    g.bind("ri", RI)
    g.bind("rdf", RDF)

    uri = URIRef(f"https://bibliokeia.com/authorities/subjects/{request.tokenLSCH}")
    g.add((uri, RDF.type, MADSRDF.Authority))
    g.add((uri, RDF.type, MADSRDF.Topic))

    g = SubjectAdmin(g, uri, MADSRDF, RI)

    #authoritativeLabel
    label = Literal(request.authority.value, lang='pt')
    g.add((uri, MADSRDF.authoritativeLabel, label))

    g = ElementList(g, uri, label, MADSRDF )

    g = CloseExternalAuthority(g, uri, MADSRDF, request.closeExternalAuthority)

    g.serialize('subject_bk.nt')

    return {'msg': request.authority.value}