
from rdflib import Graph, Namespace, URIRef, Literal
from rdflib.namespace import RDF, RDFS

from src.function.bibframe.Work.workAdmin import WorkAdmin
from src.function.bibframe.Work.title import Title
from src.function.bibframe.Work.primaryContribution import PrimaryContribution
from src.function.bibframe.Work.subject import Subject, UpdateSubject
from src.function.bibframe.Work.language import Language
from src.function.bibframe.Work.classification import Classification

import httpx
from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore

def BfWork(request, work_id): 

    work_uri = URIRef(f"https://bibliokeia.com/bibframe/work/{work_id}") 
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
   
    
    content = {
        "Texto": BF.Text
    }
    contentType =  content[request.contentType]

    #Work
    g.add((work_uri, RDF.type, contentType))
    g.add((work_uri, RDF.type, BF.Work)) 

    #AdminMetadata
    g = WorkAdmin(g, work_uri, work_id, BF) 

    #Classification
    g = Classification(g, request, work_uri, BF)


    #Language
    g = Language(g, request, work_uri, BF) 

    if request.subtitle: 
        label = Literal(f'{request.mainTitle}: {request.subtitle}')
    else:
        label = Literal(request.mainTitle)

    #Title
    g = Title(g, request, work_uri, label, BF)

    #PrimaryContribution
    g = PrimaryContribution(g, request, work_uri, BF, BFLC)

    #Subject
    for subject in request.subjects:
        
        uriSubject = URIRef(subject.uri)
        #g = Subject(g, subject, work_uri, BF, MADSRDF)
        g.add((work_uri, BF.subject, uriSubject))

        UpdateSubject(subject, work_id)

    return g
