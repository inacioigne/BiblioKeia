from src.function.bibframe.types import EditType

def EditWork(request, work_id):
    EditType(request.contentType, work_id )
    pass