def BirthPlace(request):
    place = f"""madsrdf:birthPlace [ a madsrdf:Geographic ;
                rdfs:label "{request.birthPlace}" ] ;"""
    return place 