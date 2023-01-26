from rdflib import Graph, Namespace, URIRef, Literal
from rdflib.namespace import RDF, RDFS
from src.function.bibframe.Work.workAdmin import WorkAdmin
from src.function.bibframe.Work.title import Title
from src.function.bibframe.Instance.extent import Extent
from src.function.bibframe.Instance.provisionActivity import ProvisionActivity
from src.function.bibframe.Instance.responsibilityStatement import ResponsibilityStatement
from src.function.bibframe.Instance.seriesStatement import SeriesStatement
from src.function.bibframe.Instance.editionStatement import Edition
from src.function.bibframe.Instance.instanceOf import InstanceOf
from src.function.bibframe.Work.updateWork import UpdateWork

def BfInstance(request, instance_id):
     
    print("INSTSANCE: ", instance_id)
    instance_uri = URIRef(
        f"https://bibliokeia.com/resources/instance/{instance_id}")
    
    g = Graph(identifier=instance_uri)

    #Prefix
    g.bind('rdf', RDF)
    g.bind('rdfs', RDFS)
    BF = Namespace("http://id.loc.gov/ontologies/bibframe/")
    g.bind('bf', BF)
    BFLC = Namespace("http://id.loc.gov/ontologies/bflc/")
    g.bind('bflc', BFLC)
    MADSRDF = Namespace("http://www.loc.gov/mads/rdf/v1#")
    g.bind('madsrdf', MADSRDF)

    if request.subtitle: 
        label = Literal(f'{request.mainTitle}: {request.subtitle}')
    else:
        label = Literal(request.mainTitle)

    g.add((instance_uri, RDF.type, BF.Instance)) 
    g.add((instance_uri, RDF.type, BF.Print)) 
    g.add((instance_uri, RDFS.label, label)) 

    # AdminMetadata
    g = WorkAdmin(g, instance_uri, request.instanceOf, BF) 

    # Title
    g = Title(g, request, instance_uri, label, BF)

    # Edition
    g = Edition(g, request, instance_uri, BF)

    # Extent
    g = Extent(g, request, instance_uri, BF)

    # ProvisionActivity
    g = ProvisionActivity(g, request, instance_uri, BF)

    # responsibilityStatement
    g = ResponsibilityStatement(g, request, instance_uri, BF)

    # seriesStatement
    g = SeriesStatement(g, request, instance_uri, BF)

    g = InstanceOf(g, request, instance_uri, BF)
    UpdateWork(request.instanceOf, instance_id)

    return g


