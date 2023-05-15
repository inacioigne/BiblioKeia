from src.routes.translate.makeTranslate import MakeTranslate

def GetElementList(authority, graph, obj):

    translator = MakeTranslate(
            source_language='en',
            target_language='pt',
            timeout=10
        )

    qElementList = f"""PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
  SELECT ?elementValue ?type WHERE  {{
    <{authority}> madsrdf:elementList ?o .
    ?o rdf:rest* ?node .
    ?node rdf:first ?e .
    ?e madsrdf:elementValue ?elementValue .
    ?e rdf:type ?type
    }}"""
    r = graph.query(qElementList)
    elementList = list()
    
    for i in r.bindings:
        value = translator.translate(i.get('elementValue').value)
        element = {
            "type": i.get('type').split("#")[1],
          "elementValue": {
            "value":  value.capitalize(),
            "lang": 'pt'
          }
        }
        elementList.append(element)
    obj['elementList'] = elementList
    return obj