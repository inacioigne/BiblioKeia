from src.function.bibframe.types import EditType
from src.function.bibframe.Work.title import EditTitle, EditSubtitle
from src.function.bibframe.Work.contributor import EditContributor

def EditWork(request, work_id):

    EditType(request.contentType, work_id )
    EditTitle(request.mainTitle, work_id)
    if request.subtitle:
        EditSubtitle(request.subtitle, request.mainTitle, work_id)
    EditContributor(request, work_id)

    