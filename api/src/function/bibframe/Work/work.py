
from rdflib import Graph, Namespace, URIRef
from rdflib.namespace import RDF, RDFS

from src.function.bibframe.Work.workAdmin import WorkAdmin
from src.function.bibframe.Work.title import Title
from src.function.bibframe.Work.primaryContribution import PrimaryContribution

def BfWork(request, work_id):

    work_uri = URIRef(f"http://bibliokeia.com/bibframe/work/{work_id}") 
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
        "text": BF.Text
    }
    contentType =  content[request.contentType]

    #Work
    g.add((work_uri, RDF.type, contentType))
    g.add((work_uri, RDF.type, BF.Work)) 

    #AdminMetadata
    g = WorkAdmin(g, work_uri, work_id, BF) 

    #Title
    g = Title(g, request, work_uri, BF)

    #PrimaryContribution
    g = PrimaryContribution(g, request, work_uri, BF, BFLC)


    return g
