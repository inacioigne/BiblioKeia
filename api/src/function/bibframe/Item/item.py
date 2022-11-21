from rdflib import Graph, Namespace, URIRef, Literal
from rdflib.namespace import RDF, RDFS
from src.function.bibframe.Work.workAdmin import WorkAdmin
from src.function.bibframe.Item.shelfMark import ShelfMarkDdc

def BfItem(item): 
    item_uri = URIRef(
        f"http://bibliokeia.com/bibframe/item/{item.barcode}")
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
    g = WorkAdmin(g, item_uri, item.barcode, BF) 

    heldBy = URIRef("http://id.loc.gov/vocabulary/organizations/brmninpa")
    g.add((item_uri, BF.heldBy, heldBy)) 

    #itemOf
    itemOf = URIRef(item.itemOf)
    g.add((item_uri, BF.itemOf, itemOf)) 

    g = ShelfMarkDdc(g, item, item_uri, BF)

    return g

    







    
