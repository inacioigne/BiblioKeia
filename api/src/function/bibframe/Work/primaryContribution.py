from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore

def PrimaryContribution(g, request, work_uri, BF, BFLC):

    store = SPARQLUpdateStore(update_endpoint='http://localhost:3030/authority/update')
    query_endpoint = 'http://localhost:3030/authority/query'
    update_endpoint = 'http://localhost:3030/authority/update'
    store.open((query_endpoint, update_endpoint))

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

    up = """PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>
                INSERT DATA
                { GRAPH  <https://bibliokeia.com/authorities/names/"""+request.contributionID+"""> { 
                    <https://bibliokeia.com/authorities/names/"""+request.contributionID+"""> 
                     bflc:contributorTo 
                     <"""+str(work_uri)+"""> } }"""
    store.update(up)

    return g