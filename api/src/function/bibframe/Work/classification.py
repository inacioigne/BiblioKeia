from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF
from pyfuseki import FusekiUpdate, FusekiQuery

acervoUpdate = FusekiUpdate('http://localhost:3030', 'acervo')
acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')

prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"""

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

    askCDD = prefix+"ASK { graph work:"+bkID+"""
                    {work:"""+bkID+""" bf:classification ?obj .
                        ?obj bf:classificationPortion '"""+request.cdd+"' }} "
    responseCDD = acervoQuery.run_sparql(askCDD)
    responseCDD = responseCDD.convert()

    askCutter = prefix+"ASK { graph work:"+bkID+"""
                    {work:"""+bkID+""" bf:classification ?obj .
                        ?obj bf:itemPortion '"""+request.cutter+"' }} "
    responseCutter = acervoQuery.run_sparql(askCutter)
    responseCutter = responseCutter.convert()
    responseCutter

    responses =  [responseCDD['boolean'], responseCutter['boolean']]

    if False in responses:
        up = prefix+"WITH work:"+bkID+"""
               DELETE {work:"""+bkID+""" bf:classification ?obj . 
                   ?obj ?p ?o }
                INSERT {work:"""+bkID+""" bf:classification ?obj . 
                  ?obj rdf:type bf:ClassificationDdc .
                  ?obj bf:classificationPortion """+request.cdd+""" . 
                  ?obj bf:itemPortion '"""+request.cutter+"""'  }
                WHERE {work:"""+bkID+""" bf:classification ?obj .
                   ?obj ?p ?o }"""
        acervoUpdate.run_sparql(up)

def GetClassification(bkID, bkDict):

    query = "SELECT ?p ?o WHERE { graph work:"+bkID+""" {
    work:"""+bkID+"""  bf:classification ?classification .
        ?classification ?p ?o 
    } }"""

    queryClassfication = prefix+query
    response = acervoQuery.run_sparql(queryClassfication)
    response = response.convert()
    bindings = response['results']['bindings']
    classification = {}
    for i in bindings:
        metadadoUri = i['p']['value']
        if metadadoUri == 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type':
            value = i['o']['value'].split('/')[-1]
            classification['type'] = value
        else:
            metadado = i['p']['value'].split('/')[-1]
            value = i['o']['value'].split('/')[-1]
            classification[metadado] = value
    bkDict['classification'] = classification
    print(bkDict)
    
    return bkDict


