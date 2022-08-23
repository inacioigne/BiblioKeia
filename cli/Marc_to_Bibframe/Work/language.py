from rdflib import URIRef

def Language(g, work, marc, BF):
    
    g.add((work, BF.language, URIRef(f'http://id.loc.gov/vocabulary/languages/{marc.Language()}')))

    return g