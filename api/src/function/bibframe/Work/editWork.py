from src.function.bibframe.types import EditType
from src.function.bibframe.Work.title import EditTitle, EditSubtitle
from src.function.bibframe.Work.contributor import EditContributor
from src.function.bibframe.Work.subject import EditSubject
from src.function.bibframe.Work.language import EditLanguage
from src.function.bibframe.Work.classification import EditClassification
from pyfuseki import FusekiUpdate, FusekiQuery
from datetime import datetime

acervoUpdate = FusekiUpdate('http://localhost:3030', 'acervo')
acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')

def EditWork(request, bkID):

    prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
            PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>"""
    
    now = datetime.now()
    
    up = prefix+"WITH work:"+bkID+"""
               DELETE {work:"""+bkID+""" bf:adminMetadata ?obj . 
                   ?obj bf:changeDate ?date }
                INSERT {work:"""+bkID+""" bf:adminMetadata ?obj . 
                   ?obj bf:changeDate '"""+now.strftime("%Y-%m-%dT%H:%M:%S")+"""'^^xsd:dateTime }
                WHERE {work:"""+bkID+""" bf:adminMetadata ?obj . 
                   ?obj bf:changeDate ?date }"""
    acervoUpdate.run_sparql(up)

    for k, v in request:
        if k == 'content' and v:
            EditType(request.content, bkID )
        elif k == 'mainTitle' and v:
            EditTitle(request.mainTitle, bkID)
        elif k == 'subtitle' and v:
            EditSubtitle(request.subtitle, request.mainTitle, bkID)
        elif k == 'primaryContributionAgent' and v:
            EditContributor(request, bkID)
        elif k == 'subjects' and v:
            EditSubject(request.subjects, bkID)
        elif k == 'language' and v:
            EditLanguage(request, bkID)
        elif k == 'cdd' and v:
            EditClassification(request, bkID)
        elif k == 'cutter' and v:
            EditClassification(request, bkID)

    