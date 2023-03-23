from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
from pyfuseki import FusekiUpdate
from pysolr import Solr

def UpdateContribution(primaryContribution, work_uri):

    thesaurusUpdate = FusekiUpdate('http://localhost:3030', 'authorities') 
    
    up = """PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>
                INSERT DATA
                { GRAPH  <"""+primaryContribution.uri+"""> { 
                    <"""+primaryContribution.uri+"""> 
                     bflc:contributorTo 
                     <"""+str(work_uri)+"""> } }"""
    thesaurusUpdate.run_sparql(up)

    solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)
    contributionID = primaryContribution.uri.split("/")[-1]
    doc = {
        "id": contributionID,
        "contributorTo": {"add": [work_uri]}
     }
    solr.add([doc], commit=True)

def PrimaryContribution(g, primaryContribution, work_uri, BF, BFLC):

    contribution = BNode()
    agent = URIRef(primaryContribution.uri)
    role = URIRef(f"http://id.loc.gov/vocabulary/relators/{primaryContribution.role}")
    g.add((work_uri, BF.contribution, contribution))
    g.add((contribution, RDF.type, BFLC.PrimaryContribution))
    g.add((contribution, RDF.type, BF.Contribution))
    g.add((contribution, BF.agent, agent))
    g.add((contribution, RDFS.label, Literal(primaryContribution.label)))
    g.add((contribution, BF.role, role))

    UpdateContribution(primaryContribution, work_uri)

    return g