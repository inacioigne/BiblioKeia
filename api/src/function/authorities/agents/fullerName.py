def FullerName(request):
    name = f"""madsrdf:fullerName [ a madsrdf:{request.fullerName.type} ; 
                rdfs:label "{request.fullerName.elementValue.value}" ] ;"""
    return name