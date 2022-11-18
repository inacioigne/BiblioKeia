from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def ProvisionActivity(g, request, uri, BF):
    provisionActivity = BNode()
    g.add((uri, BF.provisionActivity, provisionActivity))
    g.add((provisionActivity, RDF.type, BF.ProvisionActivity))
    g.add((provisionActivity, RDF.type, BF.Publication))
    agent = BNode()
    g.add((provisionActivity, BF.agent, agent))
    g.add((agent, RDF.type, BF.Agent))
    g.add((agent, RDFS.label, Literal(request.publication)))
    g.add((provisionActivity, BF.date, Literal(request.date)))
    place = BNode()
    g.add((provisionActivity, BF.place, place))
    g.add((place, RDF.type, BF.Place))
    g.add((place, RDFS.label, Literal(request.place)))
    
    return g