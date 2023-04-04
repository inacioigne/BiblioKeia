def EditAuthority(id, request):

    label = """PREFIX topic: <https://bibliokeia.com/authorities/topic/>
                PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
                
                WITH topic:{id}
                DELETE {{ topic:{id} madsrdf:authoritativeLabel ?o  }}
                INSERT {{ topic:{id} madsrdf:authoritativeLabel '{value}'@{lang} }}
                WHERE {{ topic:{id} madsrdf:authoritativeLabel ?o }}"""

    elementValue = """PREFIX topic: <https://bibliokeia.com/authorities/topic/>
            PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            
            WITH topic:{id}
            DELETE {{ topic:{id} madsrdf:elementList ?elementList .
                        ?elementList rdf:rest rdf:nil .
                        ?elementList rdf:first ?element .
                        ?element rdf:type madsrdf:TopicElement .
                        ?element madsrdf:elementValue ?value  }}
            INSERT {{ topic:{id} madsrdf:elementList ?elementList .
                        ?elementList rdf:rest rdf:nil .
                        ?elementList rdf:first ?element .
                        ?element rdf:type madsrdf:TopicElement .
                        ?element madsrdf:elementValue '{value}'@{lang} }}
            WHERE {{ topic:{id} madsrdf:elementList ?elementList .
                        ?elementList rdf:rest rdf:nil .
                        ?elementList rdf:first ?element .
                        ?element rdf:type madsrdf:TopicElement .
                        ?element madsrdf:elementValue ?value }}"""

    d = request.dict()
    d['id'] = id
    upLabel = label.format(**d)
    upElementValue = elementValue.format(**d)

    return (upLabel, upElementValue)
