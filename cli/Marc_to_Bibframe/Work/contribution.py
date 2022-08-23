from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def Contributions(g, BFwork, workMarc, count, uri, BF, BFLC):
    contributions = workMarc.Contributions()
    for contribution in contributions:
        index = contributions.index(contribution)+1
        secundary = BNode()
        agent = URIRef(f"http://{uri}/{count}/Agent700-{index}") 
        g.add((BFwork, BF.contribution, secundary))
        g.add((secundary, RDF.type, BF.Contribution))
        g.add((secundary, BF.agent, agent))
        g.add((secundary, BF.role, URIRef(f"http://id.loc.gov/vocabulary/relators/ctb")))
        g.add((agent, RDF.type, BF.Agent))
        g.add((agent, RDF.type, BF.Person))
        g.add((agent, RDFS.label, Literal(contribution)))
        g.add((agent, BFLC.name00MatchKey, Literal(contribution)))
    return g

    