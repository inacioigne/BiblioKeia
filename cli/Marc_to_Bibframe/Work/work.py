from rdflib import Graph, Namespace, URIRef
from datetime import date, datetime
from rdflib.namespace import RDF, RDFS

from Marc_to_Bibframe.Work.workAdmin import WorkAdmin
from Marc_to_Bibframe.Work.language import Language
from Marc_to_Bibframe.Work.audience import Audience
from Marc_to_Bibframe.Work.classification import Classification
from Marc_to_Bibframe.Work.chamada import Chamada
from Marc_to_Bibframe.Work.primaryContribution import PrimaryContribution
from Marc_to_Bibframe.Work.title import Title
from Marc_to_Bibframe.Work.subject import Subject
from Marc_to_Bibframe.Work.type import Type
from Marc_to_Bibframe.Work.contribution import Contributions

def Work(count, workMarc, BFwork, BFinstance):

    uri = f"http://bibliokeia.com/bibframe/work"

    g = Graph(identifier=BFwork)
    #Prefix
    g.bind('rdf', RDF)
    g.bind('rdfs', RDFS)
    BF = Namespace("http://id.loc.gov/ontologies/bibframe/")
    g.bind('bf', BF)
    BFLC = Namespace("http://id.loc.gov/ontologies/bflc/")
    g.bind('bflc', BFLC)
    MADSRDF = Namespace("http://www.loc.gov/mads/rdf/v1#")
    g.bind('madsrdf', MADSRDF)
    
    #Work
    g.add((BFwork, RDF.type, BF.Text))
    g.add((BFwork, RDF.type, BF.Work)) 
    
    #AdminMetadata

    g = WorkAdmin(g, BFwork, count, workMarc, BF)
    #Language
    g = Language(g, BFwork, workMarc, BF)
    #Audience
    if workMarc.Audience():
        g = Audience(g, BFwork, workMarc, BF)
    #Classification
    g = Classification(g, BFwork, workMarc, BF)
    #Chamada
    g = Chamada(g, BFwork, workMarc, BF)
    #PrimaryContribution
    g = PrimaryContribution(g, BFwork, workMarc, count, BF, BFLC)
    if workMarc.Contributions():
        g = Contributions(g, BFwork, workMarc, count, uri, BF, BFLC)
    #Title
    g = Title(g, BFwork, workMarc, BF)
    g = Subject(g, BFwork, uri, count, workMarc, BF, MADSRDF, RDFS)

    g = Type(g, BFwork, workMarc, BF)
    g.add((BFwork, BF.hasInstance, BFinstance))
    
    return g
