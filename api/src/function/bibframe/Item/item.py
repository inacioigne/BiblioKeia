from rdflib import Graph, Namespace, URIRef, Literal
from rdflib.namespace import RDF, RDFS
from src.function.bibframe.Work.workAdmin import WorkAdmin
from src.function.bibframe.Item.shelfMark import ShelfMarkDdc
from src.function.bibframe.Item.sublocation import Sublocation

def BfItem(item, itemOf): 
    item_uri = URIRef(
        f"https://bibliokeia.com/resources/item/{item.item}")
    g = Graph(identifier=item_uri)

    #Prefix
    g.bind('rdf', RDF)
    g.bind('rdfs', RDFS)
    BF = Namespace("http://id.loc.gov/ontologies/bibframe/")
    g.bind('bf', BF)
    BFLC = Namespace("http://id.loc.gov/ontologies/bflc/")
    g.bind('bflc', BFLC)
    MADSRDF = Namespace("http://www.loc.gov/mads/rdf/v1#")
    g.bind('madsrdf', MADSRDF)

    g.add((item_uri, RDF.type, BF.Item)) 
 
    #AdminMetadata
    g = WorkAdmin(g, item_uri, item.item, BF) 

    heldBy = URIRef("http://id.loc.gov/vocabulary/organizations/brmninpa")
    g.add((item_uri, BF.heldBy, heldBy)) 

    #itemOf
    itemOf_uri = URIRef(f"http://bibliokeia.com/bibframe/resources/{itemOf}")
    g.add((item_uri, BF.itemOf, itemOf_uri)) 

    g = ShelfMarkDdc(g, item, item_uri, BF)

    #Sublocation
    g = Sublocation(g, item, item_uri, BF)

    return g

    







    
