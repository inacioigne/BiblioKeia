def BirthPlace(request):
    place = f"""madsrdf:birthPlace [ a madsrdf:Geographic ;
                rdfs:label "{request.birthPlace}" ] ;"""
    return place 

def DeathPlace(deathPlace):
    place = f"""madsrdf:deathPlace [ a madsrdf:Geographic ;
                rdfs:label "{deathPlace}" ] ;"""
    return place 