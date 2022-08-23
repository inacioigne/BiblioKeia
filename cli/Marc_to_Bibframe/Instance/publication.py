from rdflib.namespace import RDF, RDFS
from rdflib import Graph, BNode, URIRef, Literal

def Publication(g, InstanceMarc, BFinstance, BF):
    provisionActivity = BNode()
    g.add((BFinstance, BF.provisionActivity, provisionActivity))
    #g.add((provisionActivity, RDF.type, BF.ProvisionActivity))
    g.add((provisionActivity, RDF.type, BF.Publication))
    place = BNode()
    g.add((provisionActivity, BF.place, place))
    g.add((place, RDF.type, BF.Place))
    g.add((place, RDFS.label, Literal(InstanceMarc.Publication().get('place'))))
    agent = BNode()
    g.add((provisionActivity, BF.agent, agent))
    g.add((agent, RDF.type, BF.Agent))
    g.add((agent, RDFS.label, Literal(InstanceMarc.Publication().get('publisher'))))
    g.add((provisionActivity, BF.date, Literal(InstanceMarc.Publication().get('year'))))

    return g