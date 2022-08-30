from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def PrimaryContribution(g, work, workMarc, count, BF, BFLC):

    primaryContribution = workMarc.PrimaryContribution()
    if primaryContribution == False:
        return g

    contribution = BNode()
    agent = URIRef(f"http://bibliokeia.com/bibframe/work/{count}/{primaryContribution.get('agent')}") 
    g.add((work, BF.contribution, contribution))
    g.add((contribution, RDF.type, BFLC.PrimaryContribution))
    g.add((contribution, RDF.type, BF.Contribution))
    g.add((contribution, BF.agent, agent))

    g.add((agent, RDF.type, BF.Agent))
    if primaryContribution.get('agent') == 'Agent100':
        bfAgent = BF.Person
        bflcMatchKey = BFLC.name00MatchKey
        primaryContributorMatchKey = BFLC.primaryContributorName00MatchKey
    elif primaryContribution.get('agent') == 'Agent110':
        bfAgent = BF.Organization
        bflcMatchKey = BFLC.name10MatchKey
        primaryContributorMatchKey = BFLC.primaryContributorName10MatchKey
    elif primaryContribution.get('agent') == 'Agent111':
        bfAgent = BF.Meeting
        bflcMatchKey = BFLC.name11MatchKey
        primaryContributorMatchKey = BFLC.primaryContributorName11MatchKey
    g.add((agent, RDF.type, bfAgent))
    g.add((agent, RDFS.label, Literal(primaryContribution.get('name'))))
    g.add((agent, bflcMatchKey, Literal(primaryContribution.get('name'))))
    g.add((agent, primaryContributorMatchKey, Literal(primaryContribution.get('name'))))
    g.add((contribution, BF.role, URIRef(f"http://id.loc.gov/vocabulary/relators/ctb")))

    return g