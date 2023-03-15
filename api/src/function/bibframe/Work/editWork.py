from src.function.bibframe.types import EditType
from src.function.bibframe.Work.title import EditTitle, EditSubtitle
from src.function.bibframe.Work.contributor import EditContributor
from src.function.bibframe.Work.subject import EditSubject

def EditWork(request, bkID):

    EditType(request.content, bkID )
    EditTitle(request.mainTitle, bkID)
    if request.subtitle:
        EditSubtitle(request.subtitle, request.mainTitle, bkID)
    EditContributor(request, bkID)
    for subject in request.subjects:
        EditSubject(subject, bkID)

    