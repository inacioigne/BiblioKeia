prefix = """PREFIX name: <https://bibliokeia.com/authorities/name/>
            PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"""

def EditDatePersonalName(id, request):
    
    date = f"""{prefix}            
            WITH name:{id}
            DELETE {{ name:{id} madsrdf:{request.type} ?o }}
            INSERT {{ name:{id} madsrdf:{request.type} "{request.value}" }}
            WHERE {{ name:{id} madsrdf:{request.type}  ?o }}"""
    
    return date

def DeleteDatePersonalName(id, request):
    
    date = f"""{prefix}            
            WITH name:{id}
            DELETE {{ name:{id} madsrdf:{request.type}  "{request.value}"  }}
            WHERE {{ name:{id} madsrdf:{request.type}   "{request.value}"  }}"""
    
    return date

def PostDatePersonalName(id, request):
    
    date = f"""{prefix}
        INSERT DATA {{ 
        GRAPH name:{id} {{
        name:{id} madsrdf:{request.type} "{request.value}" 
                }}
        }}"""
    
    return date