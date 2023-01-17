from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
from pyfuseki import FusekiUpdate
from pysolr import Solr

def UpdateContribution(request, work_uri):

    thesaurusUpdate = FusekiUpdate('http://localhost:3030', 'thesaurus') 

    up = """PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>
                INSERT DATA
                { GRAPH  <https://bibliokeia.com/authorities/names/"""+request.contributionID+"""> { 
                    <https://bibliokeia.com/authorities/names/"""+request.contributionID+"""> 
                     bflc:contributorTo 
                     <"""+str(work_uri)+"""> } }"""

    thesaurusUpdate.run_sparql(up)
    # query = """PREFIX NamesBK: <https://bibliokeia.com/authorities/names/> 
    #             PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>
    #             SELECT  *
    #             WHERE { graph NamesBK:"""+request.contributionID+"""
    #             { NamesBK:"""+request.contributionID+""" bflc:contributorTo ?o. } }"""

# def UpdateSolr(request, work_uri):

#     doc = {
#         "id": request.contributionID,
#         "contributorTo": "contributorTo"
#     }



# def PrimaryContribution(g, request, work_uri, BF, BFLC):

#     # thesaurusUpdate = FusekiUpdate('http://localhost:3030', 'thesaurus') 

#     # store = SPARQLUpdateStore(update_endpoint='http://localhost:3030/thesaurus/update')
#     # query_endpoint = 'http://localhost:3030/thesaurus/query'
#     # update_endpoint = 'http://localhost:3030/thesaurus/update'
#     # store.open((query_endpoint, update_endpoint))

#     contribution = BNode()
#     uri = f"https://bibliokeia.com/authorities/names/{request.contributionID}"
#     agent = URIRef(uri)
#     role = URIRef(request.contributionRoleUri)
#     # g.add((work_uri, BF.contribution, contribution))
#     # g.add((contribution, RDF.type, BFLC.PrimaryContribution))
#     # g.add((contribution, RDF.type, BF.Contribution))
#     # g.add((contribution, BF.agent, agent))
#     # g.add((contribution, RDFS.label, Literal(request.contributionAgent)))
#     # g.add((contribution, BF.role, role))

#     #http://localhost:3030/thesaurus?graph=https:%2F%2Fbibliokeia.com%2Fauthorities%2Fnames%2Fn79029745

#     # up = """PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>
#     #             INSERT DATA
#     #             { GRAPH  <https://bibliokeia.com/authorities/names/"""+request.contributionID+"""> { 
#     #                 <https://bibliokeia.com/authorities/names/"""+request.contributionID+"""> 
#     #                  bflc:contributorTo 
#     #                  <"""+str(work_uri)+"""> } }"""

#     # response = thesaurusUpdate.run_sparql(up)
#     #print(response.convert())


#     # UpdateContribution(request, work_uri)

#     return g

def PrimaryContribution(g, request, work_uri, BF, BFLC):
    return g

