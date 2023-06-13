from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
from pyfuseki import FusekiUpdate
from pysolr import Solr

prefix = """PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX work: <https://bibliokeia.com/resources/work/>
PREFIX subjects: <https://bibliokeia.com/authorities/subjects/>
PREFIX names: <https://bibliokeia.com/authorities/names/>
PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>"""

from src.schemas.settings import Settings

settings = Settings()

collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')
# collectionQuery = FusekiQuery(f'{settings.url}:3030', 'collection')

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

def EditPrimaryContribution(primaryContribution, bkID):

    up = prefix+"WITH work:"+bkID+"""
                DELETE {work:"""+bkID+""" bf:contribution ?o .
                        ?o ?p ?contribution }
                INSERT {work:"""+bkID+""" bf:contribution ?o .
                ?o rdf:type bf:Contribution .
                ?o rdf:type bflc:PrimaryContribution .
                ?o rdfs:label '"""+primaryContribution.label+"""'.
                ?o bf:role <http://id.loc.gov/vocabulary/relators/"""+primaryContribution.role+"""> .
                ?o bf:agent <"""+primaryContribution.uri+"""> .}
                WHERE {work:"""+bkID+""" bf:contribution ?o .
                        ?o ?p ?contribution }"""
       
    collectionUpdate.run_sparql(up)