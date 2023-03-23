from pyfuseki import FusekiQuery
from src.function.bibframe.types import GetType
from src.function.bibframe.Work.classification import GetClassification
from src.function.bibframe.Work.contributor import GetContribution
from src.function.bibframe.Work.language import GetLanguage
from src.function.bibframe.Work.subject import GetSubject

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
    bkDict = GetSubject(bkID, bkDict)
    print("WORK: ", bkDict)

    return bkDict

    