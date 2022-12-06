from rdflib import Graph, URIRef, BNode, Literal, Namespace
from rdflib.namespace import RDF, RDFS
from src.function.thesaurus.subjectAdmin import SubjectAdmin
from src.function.thesaurus.elementList import ElementList
from src.function.thesaurus.closeExternalAuthority import CloseExternalAuthority
from src.function.thesaurus.exactExternalAuthority import ExactExternalAuthority
from src.function.thesaurus.narrowerAuthority import NarrowerAuthority
from src.function.thesaurus.reciprocalAuthority import ReciprocalAuthority
from src.function.thesaurus.variant import Variant

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

    g = ElementList(g, uri, label, MADSRDF)

    #CloseExternalAuthority
    g = CloseExternalAuthority(g, uri, MADSRDF, request.closeExternalAuthority)

    #ExactExternalAuthority
    g = ExactExternalAuthority(g, uri, MADSRDF, request.exactExternalAuthority)

    #NarrowerAuthority
    g = NarrowerAuthority(g, uri, MADSRDF, request.narrower)

    #ReciprocalAuthority
    g = ReciprocalAuthority(g, uri, MADSRDF, request.reciprocalAuthority)

    #Variant
    g = Variant(g, uri, MADSRDF, request.variant)
    
    collection = URIRef("https://bibliokeia.com/authorities/subjects/collection_BKSH_General")
    g.add((uri, MADSRDF.isMemberOfMADSCollection, collection))

    nt = g.serialize(format='nt')
    g.serialize('subject.nt')
 
    return nt