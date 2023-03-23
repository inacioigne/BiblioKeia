from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from pyfuseki import FusekiUpdate, FusekiQuery
import pysolr 

acervoUpdate = FusekiUpdate('http://localhost:3030', 'acervo')
acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')

prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"""

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
    role = URIRef(request.primaryContributionRoleUri)
    g.add((uri, BF.contribution, contribution))
    g.add((contribution, RDF.type, BF.Contribution))
    g.add((contribution, BF.agent, agent))
    g.add((contribution, RDFS.label, Literal(request.primaryContributionAgent)))
    g.add((contribution, BF.role, role))

    UpdateContribution(request, uri)

    return g

def EditContributor(request, bkID):

    askAgent = prefix+"ASK { graph work:"+bkID+"""
                    {work:"""+bkID+""" bf:contribution ?o .
                        ?o bf:agent <"""+request.primaryContributionUri+"""> }}"""

    responseAgent = acervoQuery.run_sparql(askAgent)
    responseAgent = responseAgent.convert()

    askRole = prefix+"ASK { graph work:"+bkID+"""
                    {work:"""+bkID+""" bf:contribution ?o .
                        ?o bf:role <"""+request.primaryContributionRoleUri+"""> }}"""
    responseRole = acervoQuery.run_sparql(askRole)
    responseRole = responseRole.convert()
    responses = [responseAgent['boolean'], responseRole['boolean']]

    if False in responses:
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

def GetContribution(bkID, bkDict):

    query = "SELECT ?p ?o WHERE { graph work:"+bkID+""" {
    work:"""+bkID+"""  bf:contribution ?contribution .
        ?contribution ?p ?o 
    } }"""

    queryContribution = prefix+query
    response = acervoQuery.run_sparql(queryContribution)
    response = response.convert()
    bindings = response['results']['bindings']

    contribution = {}
    for i in bindings:
        metadadoUri = i['p']['value']
        if metadadoUri == 'http://www.w3.org/2000/01/rdf-schema#label':
            contribution['label'] = i['o']['value']
        elif metadadoUri == 'http://id.loc.gov/ontologies/bibframe/role':
            value = i['o']['value'].split('/')[-1]
            contribution['role'] = value
        elif metadadoUri == 'http://id.loc.gov/ontologies/bibframe/agent':
            value = i['o']['value']
            contribution['uri'] = value

    bkDict['primaryContribution'] = contribution

    return bkDict
    