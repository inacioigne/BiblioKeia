from rdflib import URIRef

def Language(g, request, work_uri, BF):

    code = request.languageCode
    
    g.add((work_uri, BF.language, URIRef(f'http://id.loc.gov/vocabulary/languages/{code}')))

    return g