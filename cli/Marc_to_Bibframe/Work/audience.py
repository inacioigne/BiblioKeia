from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def Audience(g, work, marc, BF):
    
    intendedAudience = BNode()
    g.add((work, BF.intendedAudience, intendedAudience))
    g.add((intendedAudience, RDF.type, BF.IntendedAudience))
    g.add((intendedAudience, BF.IntendedAudience, URIRef(f'http://id.loc.gov/vocabulary/maudience/{marc.Audience().get("code")}')))
    g.add((intendedAudience, RDFS.label, Literal(marc.Audience().get('label'))))

    return g