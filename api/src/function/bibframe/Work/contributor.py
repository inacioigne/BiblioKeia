from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from pyfuseki import FusekiUpdate
import pysolr 

def UpdateContribution(request, work_uri):

    thesaurusUpdate = FusekiUpdate('http://localhost:3030', 'thesaurus') 
    

    up = """PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>
                INSERT DATA
                { GRAPH  <https://bibliokeia.com/authorities/names/"""+request.contributionID+"""> { 
                    <https://bibliokeia.com/authorities/names/"""+request.contributionID+"""> 
                     bflc:contributorTo 
                     <"""+str(work_uri)+"""> } }"""
    thesaurusUpdate.run_sparql(up)

    solr = pysolr.Solr('http://localhost:8983/solr/authorities/', timeout=10)
    doc = {
        "id": request.contributionID,
        "contributorTo": {"add": [work_uri]}
     }
    solr.add([doc], commit=True)

def Contributor(g, request, work_uri, BF, BFLC):

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

    UpdateContribution(request, work_uri)

    return g