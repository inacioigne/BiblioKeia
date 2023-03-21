from pyfuseki import FusekiQuery
from src.function.bibframe.types import GetType
from src.function.bibframe.Work.classification import GetClassification
from src.function.bibframe.Work.contributor import GetContribution
from src.function.bibframe.Work.language import GetLanguage

acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')

prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"""

def QueryWork(bkID):

    bkDict = {}
    bkDict = GetType(bkID, bkDict)
    bkDict = GetClassification(bkID, bkDict)
    bkDict = GetContribution(bkID, bkDict)
    bkDict = GetLanguage(bkID, bkDict)

    return bkDict

    # Type
#     queryType = prefix+"""SELECT * WHERE { 
#   graph work:bk-1 {
#   work:bk-1 rdf:type ?o } }"""
#     response = acervoQuery.run_sparql(queryType)
#     response = response.convert()
#     bindings = response['results']['bindings']
#     values = list()
#     for i in bindings:
#         value = i['o']['value'].split("/")[-1]
#         values.append(value)
#     work['type'] = values

#     return work

    