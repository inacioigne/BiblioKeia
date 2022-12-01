from rdflib import URIRef, Literal
from rdflib.namespace import RDF
from src.function.thesaurus.elementList import ElementList

def ReciprocalAuthority(g, uri, MADSRDF, reciprocalAuthority):

    authority = URIRef(reciprocalAuthority.uri)
    label = Literal(reciprocalAuthority.value, lang=reciprocalAuthority.lang)

    g.add((uri, 
        MADSRDF.hasReciprocalAuthority, 
        authority))
    
    g.add((authority, RDF.type, MADSRDF.Authority))
    #g.add((authority, RDF.type, MADSRDF.Topic))
    g.add((authority, MADSRDF.authoritativeLabel, label))
    #g = ElementList(g, authority, label, MADSRDF)

    return g