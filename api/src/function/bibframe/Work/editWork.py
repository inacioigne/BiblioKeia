from src.function.bibframe.bf_contribution import EditContribution
from src.function.bibframe.bf_content import EditContent
from src.function.bibframe.types import EditType
from src.function.bibframe.Work.title import EditTitle, EditSubtitle
from src.function.bibframe.Work.primaryContribution import EditPrimaryContribution
from src.function.bibframe.Work.subject import EditSubject
from src.function.bibframe.Work.language import EditLanguage
from src.function.bibframe.Work.classification import EditClassification
from pyfuseki import FusekiUpdate, FusekiQuery
from datetime import datetime

from src.schemas.settings import Settings

settings = Settings()

collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')
# collectionQuery = FusekiQuery(f'{settings.url}:3030', 'collection')

def EditWork(request, id):
    uri = f'https://bibliokeia.com/resources/work/{id}'
    for data in request.listData:
        if data.bf == 'title':
            EditTitle(uri, data)
        elif data.bf == 'type':
            EditType(uri, data)
        elif data.bf == 'classification':
            EditClassification(uri, data)
        elif data.bf == 'content': 
            EditContent(uri, data)
        elif data.bf == 'contribution':
            EditContribution(uri, data)


# def OLDER_EditWork(request, bkID):

#     prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
#             PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
#             PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
#             PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>"""
    
#     now = datetime.now()
    
#     up = prefix+"WITH work:"+bkID+"""
#                DELETE {work:"""+bkID+""" bf:adminMetadata ?obj . 
#                    ?obj bf:changeDate ?date }
#                 INSERT {work:"""+bkID+""" bf:adminMetadata ?obj . 
#                    ?obj bf:changeDate '"""+now.strftime("%Y-%m-%dT%H:%M:%S")+"""'^^xsd:dateTime }
#                 WHERE {work:"""+bkID+""" bf:adminMetadata ?obj . 
#                    ?obj bf:changeDate ?date }"""
#     collectionUpdate.run_sparql(up)

#     for k, v in request:
#         if k == 'content' and v:
#             EditType(request.content, bkID )
#         elif k == 'mainTitle' and v:
#             EditTitle(request.mainTitle, bkID)
#         elif k == 'subtitle' and v:
#             EditSubtitle(request.subtitle, request.mainTitle, bkID)
#         elif k == 'primaryContribution' and v:
#             # EditContributor(request, bkID)
#             EditPrimaryContribution(request.primaryContribution, bkID)
#         elif k == 'subjects' and v:
#             EditSubject(request.subjects, bkID)
#         elif k == 'language' and v:
#             EditLanguage(request, bkID)
#         elif k == 'cdd' and v:
#             EditClassification(request, bkID)
#         elif k == 'cutter' and v:
#             EditClassification(request, bkID)

    