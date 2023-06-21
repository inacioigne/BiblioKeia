from src.function.bibframe.bf_contribution import EditContribution
from src.function.bibframe.bf_content import EditContent
from src.function.bibframe.types import EditType
from src.function.bibframe.Work.title import EditTitle
from src.function.bibframe.Work.classification import EditClassification
from pyfuseki import FusekiUpdate

from src.schemas.settings import Settings

settings = Settings()

collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')

def EditInstance(request, id):
    uri = f'https://bibliokeia.com/resources/instance/{id}'
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