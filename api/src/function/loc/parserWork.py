from src.schemas.metadata.bibframe.work import Work
from src.function.bibframe.bf_classification import GetClassification
from src.function.bibframe.bf_contribution import GetContribution
from src.function.bibframe.bf_Uri import GetUriBF
from src.function.bibframe.bf_Literal import GetLiteral
from src.function.bibframe.bf_title import GetTitle
from src.function.bibframe.bf_type import GetType
from src.function.bibframe.bf_content import GetContent

def ParserWork(graph, uri):
    identifier = uri.split("/")[-1]
    types = GetType(graph, uri)
    title = GetTitle(graph, uri)

    obj = {
    'adminMetadata': {
        'generationProcess': {
            'label': 'BiblioKeia'
        },
        'identifiedBy': [ 
            {
                "type": "Local",
            "assigner": "http://id.loc.gov/vocabulary/organizations/dlc",
            "value": identifier
            }
        ]
    },
    "type": types,
    'title': title
    }
    
    # Classification
    obj = GetClassification(graph, uri, obj)
    # Content
    # obj = GetContent(graph, uri, obj)
    # Contribution
    obj = GetContribution(graph, uri, obj)
    # Content
    obj = GetUriBF(graph, uri, 'content', obj)
    # GenreForm
    obj = GetUriBF(graph, uri, 'genreForm', obj)
    # illustrativeContent
    obj = GetUriBF(graph, uri, 'illustrativeContent', obj)
    # intendedAudience
    obj = GetUriBF(graph, uri, 'intendedAudience', obj)
    # language
    obj = GetUriBF(graph, uri, 'language', obj)
    # subject
    obj = GetUriBF(graph, uri, 'subject', obj)
    # supplementaryContent
    obj = GetUriBF(graph, uri, 'supplementaryContent', obj)
    # summary
    obj = GetLiteral(graph, uri, 'summary', obj)
    # tableOfContents
    obj = GetLiteral(graph, uri, 'tableOfContents', obj)

    response = Work(**obj)
    
    return response