from rdflib import Graph, Namespace, URIRef, Literal, BNode
from rdflib.namespace import RDF, RDFS
from src.function.bibframe.types import TypeBF
from src.function.bibframe.Work.workAdmin import WorkAdmin
from src.function.bibframe.Work.title import Title
from src.function.bibframe.Work.contributor import Contributor
from src.function.bibframe.Work.identifiedBy import IdentifiedBy
from src.function.bibframe.Work.language import Language
from src.function.bibframe.Work.classification import Classification

def BfHub(request, hub_id): 

    hub_uri = URIRef(f"https://bibliokeia.com/resources/hub/{hub_id}") 
    g = Graph(identifier=hub_uri)

    #Prefix
    g.bind('rdf', RDF)
    g.bind('rdfs', RDFS)
    BF = Namespace("http://id.loc.gov/ontologies/bibframe/")
    g.bind('bf', BF)
    BFLC = Namespace("http://id.loc.gov/ontologies/bflc/")
    g.bind('bflc', BFLC)
    MADSRDF = Namespace("http://www.loc.gov/mads/rdf/v1#")
    g.bind('madsrdf', MADSRDF)

    bfType = TypeBF[f'{request.type}']

    
    g.add((hub_uri, RDF.type, bfType))
    g.add((hub_uri, RDF.type, BF.Work)) 
    g.add((hub_uri, RDF.type, BF.Hub)) 

    #AdminMetadata
    g = WorkAdmin(g, hub_uri, hub_id, BF) 

    #Classification
    g = Classification(g, request, hub_uri, BF)

    #PrimaryContribution
    g = Contributor(g, request, hub_uri, BF, BFLC)

    if request.subtitle: 
        label = Literal(f'{request.mainTitle}: {request.subtitle}')
    else:
        label = Literal(request.mainTitle)

    #Title
    g = Title(g, request, hub_uri, label, BF)

    g = IdentifiedBy(g, request, hub_uri, BF)

    return g

    

