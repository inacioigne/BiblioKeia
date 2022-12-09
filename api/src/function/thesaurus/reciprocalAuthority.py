from rdflib import URIRef, Literal
from rdflib.namespace import RDF
from src.function.thesaurus.elementList import ElementList

def ReciprocalAuthority(g, uri, MADSRDF, reciprocalAuthority):

    for authority in reciprocalAuthority:
        print("AAA: ", authority)
        

        authority_uri = URIRef(authority.uri)
        label = Literal(authority.value, lang=authority.lang)
        

        g.add((uri, 
            MADSRDF.hasReciprocalAuthority, 
            authority_uri)) 
        g.add((authority_uri, RDF.type, MADSRDF.Authority))
        g.add((authority_uri, MADSRDF.authoritativeLabel, label)) 
        collection = URIRef(authority.collection)  
        #    # "http://id.loc.gov/authorities/subjects/collection_LCSH_General")
        g.add((authority_uri, MADSRDF.isMemberOfMADSCollection, collection))

    return g