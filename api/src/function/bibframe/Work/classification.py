from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF
from pyfuseki import FusekiUpdate, FusekiQuery

from src.schemas.settings import Settings

settings = Settings()

collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')
collectionQuery = FusekiQuery(f'{settings.url}:3030', 'collection')

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

def EditClassification(uri, data):
    if data.action == 'edit':
        sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            WITH <{uri}>
            DELETE {{  <{uri}> bf:classification ?o .
                            ?o ?p ?s}}
            INSERT {{ <{uri}> bf:classification ?o .
                        ?o rdf:type bf:ClassificationDdc .
                        ?o bf:classificationPortion "{data.value.get('classificationPortion')}" .
                        { f'?o bf:itemPortion "{data.value.get("itemPortion")}"' if data.value.get('itemPortion') else '' }
                        }}
            WHERE {{ <{uri}> bf:classification ?o .
                            ?o ?p ?s }} """
        response = collectionUpdate.run_sparql(sparql)
        print(response.convert())
    elif data.action == 'add':
        sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            INSERT DATA
            {{ GRAPH <{uri}>
            {{ <{uri}> bf:classification [
                a bf:ClassificationDdc ;
                bf:classificationPortion "{data.value['classificationPortion']}" ;
                bf:itemPortion "{data.value['itemPortion']}"  ] }} }} ; """
        response = collectionUpdate.run_sparql(sparql)
        print(response.convert())


# def EditClassification(request, bkID):

#     responses = list()

#     askCDD = prefix+"ASK { graph work:"+bkID+"""
#                     {work:"""+bkID+""" bf:classification ?obj .
#                         ?obj bf:classificationPortion '"""+request.cdd+"' }} "
#     responseCDD = acervoQuery.run_sparql(askCDD)
#     responseCDD = responseCDD.convert()

#     askCutter = prefix+"ASK { graph work:"+bkID+"""
#                     {work:"""+bkID+""" bf:classification ?obj .
#                         ?obj bf:itemPortion '"""+request.cutter+"' }} "
#     responseCutter = acervoQuery.run_sparql(askCutter)
#     responseCutter = responseCutter.convert()
#     responseCutter

#     responses =  [responseCDD['boolean'], responseCutter['boolean']]

#     if False in responses:
#         up = prefix+"WITH work:"+bkID+"""
#                DELETE {work:"""+bkID+""" bf:classification ?obj . 
#                    ?obj ?p ?o }
#                 INSERT {work:"""+bkID+""" bf:classification ?obj . 
#                   ?obj rdf:type bf:ClassificationDdc .
#                   ?obj bf:classificationPortion """+request.cdd+""" . 
#                   ?obj bf:itemPortion '"""+request.cutter+"""'  }
#                 WHERE {work:"""+bkID+""" bf:classification ?obj .
#                    ?obj ?p ?o }"""
#         acervoUpdate.run_sparql(up)

def GetClassification(bkID, bkDict):

    query = "SELECT ?p ?o WHERE { graph work:"+bkID+""" {
    work:"""+bkID+"""  bf:classification ?classification .
        ?classification ?p ?o 
    } }"""

    queryClassfication = prefix+query
    response = collectionQuery.run_sparql(queryClassfication)
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


