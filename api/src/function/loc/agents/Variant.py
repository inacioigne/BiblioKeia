def GetVariant(authority, graph, obj):
     
  q = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    SELECT ?typeVariant ?elementList ?elementValue ?typeElement ?variantLabel 
    WHERE  {{      	
    <{authority}> madsrdf:hasVariant ?variant .
                    ?variant rdf:type ?typeVariant .
                    ?variant madsrdf:variantLabel ?variantLabel .
                    ?variant madsrdf:elementList ?elementList .
                    ?elementList rdf:rest* ?node .
                      ?node rdf:first ?e .
                      ?e madsrdf:elementValue ?elementValue .
                    ?e rdf:type ?typeElement .
                    FILTER ( ?typeVariant != madsrdf:Variant )
                    }}"""
  result = graph.query(q)
  if len(result.bindings) > 0:
    d = {}
    for i in result.bindings:
        bn = i.get('elementList').n3()
        typeVariant = i.get('typeVariant').split("#")[-1]
        elementValue = i.get('elementValue').toPython()
        variantLabel = i.get('variantLabel').toPython()
        tipo = i.get('typeElement').split("#")[-1]
        element = {'type': tipo, 'elementValue': {'value': elementValue}}

        if bn in d.keys():
                d[bn]['elementList'].append(element)
        else:
            d[bn] = {'type': typeVariant, 
                        'elementList': [element], 
                        'variantLabel': variantLabel
                        }
    variants = list(d.values())
    obj['hasVariant'] = variants
    return obj
  else:
     return obj