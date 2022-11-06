from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def PrimaryContribution(g, request, work_uri, BF, BFLC):

    contribution = BNode()
    agent = URIRef(f"http://id.loc.gov/authorities/names/{request.contributionID}")
    role = URIRef(request.uri)
    g.add((work_uri, BF.contribution, contribution))
    g.add((contribution, RDF.type, BFLC.PrimaryContribution))
    g.add((contribution, RDF.type, BF.Contribution))
    g.add((contribution, BF.agent, agent))
    g.add((contribution, RDFS.label, Literal(request.contributionAgent)))
    g.add((contribution, BF.role, role))

    return g