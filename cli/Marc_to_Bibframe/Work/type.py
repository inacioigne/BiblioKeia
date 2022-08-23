from rdflib import URIRef

def Type(g, work, marc, BF):
    g.add((work, BF.content, URIRef(marc.Type())))

    return g