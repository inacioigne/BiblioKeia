prefix = """PREFIX name: <https://bibliokeia.com/authorities/name/>
            PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"""

def EditAuthorityPersonalName(id, request):
    
    name = f"""{prefix}            
            WITH name:{id}
            DELETE {{ name:{id} madsrdf:authoritativeLabel ?o }}
            INSERT {{ name:{id} madsrdf:authoritativeLabel { f'"{request.value}, {request.date}" ; ' if request.date else f'"{request.value}" ;' } }}
            WHERE {{ name:{id} madsrdf:authoritativeLabel ?o }}"""
    
    elementValue = f"""{prefix}             
            WITH name:{id}
            DELETE {{ name:{id} madsrdf:elementList ?elementList .
        ?elementList rdf:first ?o .
        ?o madsrdf:elementValue ?elementValue  }}
                INSERT {{  name:{id} madsrdf:elementList ?elementList .
        ?elementList rdf:first ?o .
        ?o madsrdf:elementValue "{request.value}" . }}
                WHERE {{ name:{id} madsrdf:elementList ?elementList .
        ?elementList rdf:first ?o .
        ?o madsrdf:elementValue ?elementValue }}"""
    
    if request.date:
        date = f"""{prefix}             
            WITH name:{id}
            DELETE {{ name:{id} madsrdf:elementList ?elementList .
        ?elementList rdf:rest ?rest .
        ?rest ?first ?date .
        ?date madsrdf:elementValue ?o }}
                INSERT {{  name:{id} madsrdf:elementList ?elementList .
        ?elementList rdf:rest ?rest .
        ?rest ?first ?date .
        ?date madsrdf:elementValue "{request.date}" }}
                WHERE {{ name:{id} madsrdf:elementList ?elementList .
        ?elementList rdf:rest ?rest .
        ?rest ?first ?date .
        ?date madsrdf:elementValue ?o }}"""

        return [name, elementValue, date]
    else:
        return [name, elementValue]
    
def EditFullerName(id, request):
    name = f"""{prefix}             
                WITH name:{id}
                DELETE {{ name:{id} madsrdf:fullerName ?fullerName .
        ?fullerName rdfs:label ?o }}
                INSERT {{ name:{id} madsrdf:fullerName ?fullerName .
        ?fullerName rdfs:label "{request.value}" }}
                WHERE {{ name:{id} madsrdf:fullerName ?fullerName .
        ?fullerName rdfs:label ?o }}"""
    return name

def DeleteFullerName(id, request):
    name = f"""{prefix}             
                WITH name:{id}
                DELETE {{ name:{id} madsrdf:fullerName ?fullerName .
    ?fullerName rdf:type madsrdf:PersonalName .
    ?fullerName rdfs:label "{request.value}" }}
                
                WHERE {{ name:{id} madsrdf:fullerName ?fullerName .
    ?fullerName rdf:type madsrdf:PersonalName .
    ?fullerName rdfs:label "{request.value}"  }}"""
    return name

def PostFullerName(id, request):
    name = f"""{prefix}
        INSERT DATA {{ 
        GRAPH name:{id} {{
        name:{id} madsrdf:fullerName [ a madsrdf:PersonalName ;
            rdfs:label "{request.value}" ] ;
                }}
        }}"""
    return name