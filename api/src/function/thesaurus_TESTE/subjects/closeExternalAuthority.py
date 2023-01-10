from rdflib import URIRef


def CloseExternalAuthority(g, uri, MADSRDF, ExternalAuthority):

    for authority in ExternalAuthority:
        g.add((uri, 
        MADSRDF.hasCloseExternalAuthority, 
        URIRef(authority)))
    
    return g


    
