from rdflib import URIRef
from pyfuseki import FusekiUpdate, FusekiQuery

acervoUpdate = FusekiUpdate('http://localhost:3030', 'acervo')
acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')

prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"""

def Language(g, request, work_uri, BF):

    code = request.languageCode
    
    g.add((work_uri, BF.language, URIRef(f'http://id.loc.gov/vocabulary/languages/{code}')))

    return g

def EditLanguage(request, bkID):

    askLanguage = prefix+"ASK { graph work:"+bkID+"""
                    {work:"""+bkID+" bf:language <http://id.loc.gov/vocabulary/languages/"+request.languageCode+"""> }} """
    response = acervoQuery.run_sparql(askLanguage)
    response = response.convert()
    if not response['boolean']:
        up = prefix+"WITH work:"+bkID+"""
                DELETE {work:"""+bkID+""" bf:language ?o }
                INSERT {work:"""+bkID+" bf:language <http://id.loc.gov/vocabulary/languages/"+request.languageCode+"""> }
                WHERE {work:"""+bkID+""" bf:language ?o }"""
        acervoUpdate.run_sparql(up)

def GetLanguage(bkID, bkDict):

    query = "SELECT * WHERE { graph work:"+bkID+""" {
            work:"""+bkID+"""  bf:language ?language 
            } }"""
    queryLanguage = prefix+query
    response = acervoQuery.run_sparql(queryLanguage)
    response = response.convert()
    bindings = response['results']['bindings']