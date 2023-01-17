from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
from pyfuseki import FusekiUpdate
from pysolr import Solr

def PrimaryContribution(g, request, work_uri, BF, BFLC):
    print("CONTRIBUTOR INSIDE: ", g)
    return g

    contribution = BNode()
    uri = f"https://bibliokeia.com/authorities/names/{request.contributionID}"
    agent = URIRef(uri)
    role = URIRef(request.contributionRoleUri)
    g.add((work_uri, BF.contribution, contribution))
    g.add((contribution, RDF.type, BFLC.PrimaryContribution))
    g.add((contribution, RDF.type, BF.Contribution))
    g.add((contribution, BF.agent, agent))
    g.add((contribution, RDFS.label, Literal(request.contributionAgent)))
    g.add((contribution, BF.role, role))

    # return g