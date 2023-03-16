from src.function.bibframe.types import EditType
from src.function.bibframe.Work.title import EditTitle, EditSubtitle
from src.function.bibframe.Work.contributor import EditContributor
from src.function.bibframe.Work.subject import EditSubject
from src.function.bibframe.Work.language import EditLanguage
from src.function.bibframe.Work.classification import EditClassification

def EditWork(request, bkID):

    EditType(request.content, bkID )
    EditTitle(request.mainTitle, bkID)
    if request.subtitle:
        EditSubtitle(request.subtitle, request.mainTitle, bkID)
    EditContributor(request, bkID)
    EditSubject(request.subjects, bkID)
    EditLanguage(request, bkID)
    EditClassification(request, bkID)

    