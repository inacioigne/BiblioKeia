from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from pyfuseki import FusekiUpdate, FusekiQuery
import pysolr 

def UpdateContribution(request, work_uri):

    thesaurusUpdate = FusekiUpdate('http://localhost:3030', 'authorities') 
    
    up = """PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>
                INSERT DATA
                { GRAPH  <"""+request.primaryContributionUri+"""> { 
                    <"""+request.primaryContributionUri+"""> 
                     bflc:contributorTo 
                     <"""+str(work_uri)+"""> } }"""
    thesaurusUpdate.run_sparql(up)

    solr = pysolr.Solr('http://localhost:8983/solr/authorities/', timeout=10)
    contributionID = request.primaryContributionUri.split("/")[-1]
    doc = {
        "id": contributionID,
        "contributorTo": {"add": [work_uri]}
     }
    solr.add([doc], commit=True)

def Contributor(g, request, uri, BF, BFLC):

    contribution = BNode()
    agent = URIRef(request.primaryContributionUri)
    role = URIRef(f"http://id.loc.gov/vocabulary/relators/{request.primaryContributionRole}")
    g.add((uri, BF.contribution, contribution))
    g.add((contribution, RDF.type, BF.Contribution))
    g.add((contribution, BF.agent, agent))
    g.add((contribution, RDFS.label, Literal(request.primaryContributionAgent)))
    g.add((contribution, BF.role, role))

    UpdateContribution(request, uri)

    return g

def EditContributor(request, bkID):

    acervoUpdate = FusekiUpdate('http://localhost:3030', 'acervo')
    acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')

    prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"""

    askAgent = prefix+"ASK { graph work:"+bkID+"""
                    {work:"""+bkID+""" bf:contribution ?o .
                        ?o bf:agent <"""+request.primaryContributionUri+"""> }}"""

    response = acervoQuery.run_sparql(askAgent)
    response = response.convert()
    if not response['boolean']:
        up = prefix+"WITH work:"+bkID+"""
                DELETE {work:"""+bkID+""" bf:contribution ?o .
                        ?o ?p ?agent }
                INSERT {work:"""+bkID+""" bf:contribution ?o .
                ?o rdf:type bf:Contribution .
                ?o rdfs:label '"""+request.primaryContributionAgent+"""' .
                ?o bf:role <http://id.loc.gov/vocabulary/relators/"""+request.primaryContributionRole+"""> .
                ?o bf:agent <"""+request.primaryContributionUri+"""> }
                WHERE {work:"""+bkID+""" bf:contribution ?o .
                        ?o ?p ?agent }"""
        acervoUpdate.run_sparql(up)