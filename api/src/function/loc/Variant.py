from src.routes.translate.makeTranslate import MakeTranslate

def GetVariant(authority, graph, obj):

    qVariant = f"""PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
                SELECT ?typeVariant ?typeElement ?elementValue WHERE  {{
                <{authority}> madsrdf:hasVariant ?variant .
                ?variant rdf:type ?typeVariant .
                ?variant madsrdf:elementList ?elementList .
                ?elementList rdf:rest* ?node .
                  ?node rdf:first ?e .
                  ?e madsrdf:elementValue ?elementValue .
                ?e rdf:type ?typeElement .
                FILTER ( ?typeVariant != madsrdf:Variant )
                }}"""
    r = graph.query(qVariant)
    if len(r.bindings) > 0:
        translator = MakeTranslate(
            source_language='en',
            target_language='pt',
            timeout=10
        )
        variants = list()
        for i in r.bindings:
            value = translator.translate(i.get('elementValue').value)
            variant = {
          'type': i.get('typeVariant').split("#")[1],
          'elementList': [{
              'type': i.get('typeElement').split("#")[1],
              'elementValue': {
                  'value': value.capitalize(),
                  'lang': 'pt'
              }
          }]
      }
            variants.append(variant)
        obj['hasVariant'] = variants
    return obj