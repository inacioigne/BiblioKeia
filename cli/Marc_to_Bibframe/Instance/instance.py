from rdflib import Graph, Namespace, URIRef, Literal, BNode
from rdflib.namespace import RDF, RDFS
from Marc_to_Bibframe.Instance.instanceAdmin import Admin
from Marc_to_Bibframe.Instance.extent import Extent
from Marc_to_Bibframe.Instance.note import Note
from Marc_to_Bibframe.Instance.publication import Publication
from Marc_to_Bibframe.Work.title import Title
from Marc_to_Bibframe.Items.items import Item

def Instance(count, workMarc, instanceMarc, itemsMarc, BFwork, BFinstance, shelf):
    uri = 'http://bibliokeia.com/bibframe'
    g = Graph()
    g.bind('rdf', RDF)
    BF = Namespace("http://id.loc.gov/ontologies/bibframe/")
    g.bind('bf', BF)

    g.add((BFinstance, RDF.type, BF.Instance))
    g.add((BFinstance, RDF.type, BF.Print))
    g = Admin(g, count, workMarc, BFinstance, BF)
    g.add((BFinstance, BF.carrier, URIRef(f"http://id.loc.gov/vocabulary/mstatus/{instanceMarc.Form()}")))
    g = Extent(g, instanceMarc, BFinstance, BF)
    g.add((BFinstance, BF.instanceOf, BFwork))
    g.add((BFinstance, BF.issuance, URIRef(f"http://id.loc.gov/vocabulary/issuance/mono")))
    g.add((BFinstance, BF.media, URIRef(f"http://id.loc.gov/vocabulary/mediaTypes/n")))
    if instanceMarc.Note():
        g = Note(g, instanceMarc, BFinstance, BF)
    g = Publication(g, instanceMarc, BFinstance, BF)
    #Title
    title = BNode()
    g.add((BFinstance, BF.title, title))
    g.add((title, RDF.type, BF.Title))
    g.add((title, BF.mainTitle, Literal(workMarc.Title().get('title'))))
    if workMarc.Title().get('subtitle'):
        g.add((title, BF.subtitle, Literal(workMarc.Title().get('subtitle'))))
    #responsibilityStatement
    if instanceMarc.ResponsibilityStatement():
        g.add((BFinstance, BF.responsibilityStatement, Literal(instanceMarc.ResponsibilityStatement())))
    #Serie
    if instanceMarc.Serie():
        g.add((BFinstance, BF.seriesStatement, Literal(instanceMarc.Serie())))

    #Items
    items = list()
    for item in itemsMarc.Items():
        BFitem = URIRef(f"{uri}/item/{item.get('register')}")
        g.add((BFinstance, BF.hasItem, BFitem))
        gi = Item(BFitem, item, BFinstance, shelf)
        items.append((gi, item.get('register') ))
      
        #JENA
        #fuseki.insert_graph(gi)
        #gi.serialize(f'out/items/{item.get("register")}.ttl', format='turtle')

    d = {'instance': g, 'items': items}

    return d
