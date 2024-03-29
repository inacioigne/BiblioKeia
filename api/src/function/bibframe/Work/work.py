from rdflib import Graph, Namespace, URIRef, Literal, BNode
from rdflib.namespace import RDF, RDFS
from src.function.bibframe.Work.workAdmin import WorkAdmin
from src.function.bibframe.Work.title import Title
from src.function.bibframe.Work.contributor import Contributor
from src.function.bibframe.Work.primaryContribution import PrimaryContribution
from src.function.bibframe.Work.subject import UpdateSubject
from src.function.bibframe.Work.language import Language
from src.function.bibframe.Work.classification import Classification
from src.function.bibframe.Work.serie import Serie
from src.function.bibframe.Work.content import Content

def BfWork(request, work_id): 

    work_uri = URIRef(f"https://bibliokeia.com/resources/work/{work_id}") 
    g = Graph(identifier=work_uri)

    #Prefix
    g.bind('rdf', RDF)
    g.bind('rdfs', RDFS)
    BF = Namespace("http://id.loc.gov/ontologies/bibframe/")
    g.bind('bf', BF)
    BFLC = Namespace("http://id.loc.gov/ontologies/bflc/")
    g.bind('bflc', BFLC)
    MADSRDF = Namespace("http://www.loc.gov/mads/rdf/v1#")
    g.bind('madsrdf', MADSRDF)

    # Content
    g = Content(g, request.content, BF, work_uri)

    #AdminMetadata
    g = WorkAdmin(g, work_uri, work_id, BF) 

    #Classification
    g = Classification(g, request, work_uri, BF)

    #Language
    g = Language(g, request, work_uri, BF) 

    #Title
    g = Title(g, request.title, work_uri, BF)

    #PrimaryContribution
    # g = Contributor(g, request, work_uri, BF, BFLC)
    g = PrimaryContribution(g, request.primaryContribution, work_uri, BF, BFLC)

    #Subject
    for subject in request.subjects:        
        uriSubject = URIRef(subject.uri)

        g.add((work_uri, BF.subject, uriSubject))
        UpdateSubject(subject, work_uri)

    # Serie
    if request.serie:
        #print("WORK: ", request)
        g = Serie(g, request, work_uri, BF)

    return g
