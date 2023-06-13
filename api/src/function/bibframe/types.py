
from rdflib import Namespace
from pyfuseki import FusekiUpdate, FusekiQuery

from src.schemas.settings import Settings

settings = Settings()

collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')
collectionQuery = FusekiQuery(f'{settings.url}:3030', 'collection')

BF = Namespace("http://id.loc.gov/ontologies/bibframe/")

TypeBF =  {
    "Texto": BF.Text,
    "Series": BF.Series
}

prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
                PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"""

def EditType(uri, data):

    if data.action == 'remove':
        sparql = f"""PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                DELETE DATA
                {{ GRAPH <{uri}>
                {{ <{uri}> rdf:type  bf:{data.value} }} }} ;"""
        response = collectionUpdate.run_sparql(sparql)
        print(response.convert())
    if data.action == 'add':
        sparql = f"""PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                INSERT DATA
                {{ GRAPH <{uri}>
                {{ <{uri}> rdf:type  bf:{data.value} }} }} ;"""
        response = collectionUpdate.run_sparql(sparql)
        print(response.convert())

# def EditType(contentType, work_id):

    
#     where = "{work:"+work_id+" rdf:type ?o}"
                
#     select = prefix+"SELECT * { graph work:bk-2 {work:"+work_id+" rdf:type ?o} }"

#     response = collectionQuery.run_sparql(select)
#     response = response.convert()
#     bindings = response['results']['bindings']

#     for binding in bindings:
#         uri = binding['o']['value']
#         content = uri.split("/")[-1]
#         if content != 'Work' and content != contentType:
#             where = "{ work:"+work_id+" rdf:type bf:"+content+" }"
#             up = prefix+"WITH work:"+work_id+"""
#             DELETE """+where+"""
#             INSERT { work:"""+work_id+" rdf:type bf:"+contentType+""" }
#             WHERE """+where
#             collectionUpdate.run_sparql(up)

def GetType(bkID, bkDict):

    queryType = prefix+"""SELECT * WHERE { 
                graph work:"""+bkID+" {  work:"+bkID+" rdf:type ?o } }"
    response = collectionQuery.run_sparql(queryType)
    response = response.convert()
    bindings = response['results']['bindings']
    values = list()
    for i in bindings:
        value = i['o']['value'].split("/")[-1]
        values.append(value)
    bkDict['type'] = values

    return bkDict


