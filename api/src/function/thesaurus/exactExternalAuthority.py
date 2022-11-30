from rdflib import URIRef

def ExactExternalAuthority(g, uri, MADSRDF, ExternalAuthority):

    for authority in ExternalAuthority:
        g.add((uri, 
        MADSRDF.hasExactExternalAuthority, 
        URIRef(authority)))
    
    return g