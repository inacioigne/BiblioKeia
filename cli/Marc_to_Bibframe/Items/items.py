from rdflib import Graph, Namespace, URIRef, Literal, BNode, XSD
from rdflib.namespace import RDF, RDFS
from Marc_to_Bibframe.generationProcess import GenerationProcess
from Marc_to_Bibframe.identifiedBy import IdentifiedBy

def Item(BFitem, item, BFinstance, shelf):
    g = Graph()
    BF = Namespace("http://id.loc.gov/ontologies/bibframe/")
    g.bind('bf', BF)
    g.add((BFitem, RDF.type, BF.Item))
    adm = BNode()
    g.add((BFitem, BF.adminMetadata, adm))
    g.add((adm, RDF.type, BF.AdminMetadata))
    g.add((adm, BF.assigner, URIRef("http://id.loc.gov/vocabulary/organizations/brmninpa")))
    #creationDate
    g.add((adm, BF.creationDate, Literal(item.get('creationDate'), datatype=XSD.date)))
    g = GenerationProcess(g, adm, BF)
    g = IdentifiedBy(g, item.get('register'), adm, BF)
    g.add((adm, BF.status, URIRef("http://id.loc.gov/vocabulary/mstatus/c")))
    g.add((BFitem, BF.heldBy, URIRef("http://id.loc.gov/vocabulary/organizations/brmninpa")))
    g.add((BFitem, BF.itemOf, BFinstance))
    shelfMark = BNode()
    g.add((BFitem, BF.shelfMark, shelfMark))
    g.add((shelfMark, RDF.type, BF.ShelfMarkDdc))
    g.add((shelfMark, RDFS.label, Literal(item.get('callnumber'))))
    g.add((shelfMark, BF.assigner, URIRef("http://id.loc.gov/vocabulary/organizations/brmninpa")))
    localShelf = BNode()
    g.add((shelfMark, RDF.type, localShelf))
    g.add((localShelf, RDF.type, BF.Local))
    g.add((localShelf, RDFS.label, Literal(shelf)))


    return g