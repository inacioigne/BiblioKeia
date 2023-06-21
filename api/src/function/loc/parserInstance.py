from src.schemas.metadata.bibframe.instance import Instance
from src.function.bibframe.bf_provisionActivity import GetProvisionActivity
from src.schemas.metadata.bibframe.work import Work
from src.function.bibframe.bf_Uri import GetUriBF
from src.function.bibframe.bf_title import GetTitle
from src.function.bibframe.bf_type import GetType

def GetValeu(graph, uri, bf, obj):
    q = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            SELECT ?value
                WHERE {{ 
                    <{uri}> bf:{bf} ?value .
                    }}"""
    response = graph.query(q)
    bindings = response.bindings
    if len(bindings) > 0:
        binding = bindings[0]
        obj[bf] = binding.get('value').toPython()
    return obj

def GetElement(graph, uri, bf, obj):
    q = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            SELECT ?type ?label
                WHERE {{ 
                    <{uri}> bf:{bf} ?uri .
                    ?uri rdfs:label ?label .
                    ?uri rdf:type ?type .
                    }}"""
    response = graph.query(q)
    bindings = response.bindings
    if len(bindings) > 0:
        binding = bindings[0]
        v = {
            "type": binding.get('type').toPython(),
            "label": binding.get('label').toPython()
        }
        obj[bf] = v
    return obj

def ParserInstance(graph, uri):
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
    # carrier
    obj = GetUriBF(graph, uri, 'carrier', obj)
    # copyrightDate
    # obj = GetValeu(graph, "copyrightDate", obj)
    # dimensions
    obj = GetValeu(graph, uri, "dimensions", obj)
    # extent
    obj = GetElement(graph, uri, "extent", obj)
    # instanceOf
    instanceOf = GetUriBF(graph, uri, 'instanceOf', {})
    instanceOf = instanceOf['instanceOf'][0]
    obj['instanceOf'] = instanceOf

    # issuance
    obj = GetUriBF(graph, uri, 'issuance', obj)
    # media
    obj = GetUriBF(graph, uri, 'media', obj)
    # ProvisionActivity
    obj = GetProvisionActivity(graph, uri, obj)
    # provisionActivityStatement
    obj = GetValeu(graph, uri, "provisionActivityStatement", obj)
    # responsibilityStatement
    obj = GetValeu(graph, uri, "responsibilityStatement", obj)
    # seriesStatement
    obj = GetValeu(graph, uri, "seriesStatement", obj)

    response = Instance(**obj)
    
    return response