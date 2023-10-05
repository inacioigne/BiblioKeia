def FullerName(request):
    name = f"""madsrdf:fullerName [ a madsrdf:PersonalName ;  
                rdfs:label "{request.fullerName}" ] ;"""
    return name