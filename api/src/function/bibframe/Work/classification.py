from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF
from pyfuseki import FusekiUpdate, FusekiQuery

def Classification(g, request, uri, BF): 

    classification = BNode()
    g.add((uri, BF.classification, classification))
    g.add((classification, RDF.type, BF.ClassificationDdc))
    g.add((classification, BF.classificationPortion, Literal(request.cdd)))
    if request.cutter != "":
        g.add((classification, BF.itemPortion, Literal(request.cutter)))

    return g

def EditClassification(request, bkID):

    responses = list()

    acervoUpdate = FusekiUpdate('http://localhost:3030', 'acervo')
    acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')

    prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"""

    askClassification = prefix+"ASK { graph work:"+bkID+"""
                    {work:"""+bkID+""" bf:classification ?obj .
                        ?obj bf:classificationPortion """+request.cdd+" }} "
    response = acervoQuery.run_sparql(askClassification)
    response = response.convert()

    if not response['boolean']:
        up = prefix+"WITH work:"+bkID+"""
                DELETE {work:"""+bkID+""" bf:language ?o }
                INSERT {work:"""+bkID+" bf:language <http://id.loc.gov/vocabulary/languages/"+request.languageCode+"""> }
                WHERE {work:"""+bkID+""" bf:language ?o }"""
        acervoUpdate.run_sparql(up)