from rdflib import Graph, URIRef, BNode, Literal, Namespace
from rdflib.namespace import RDF, RDFS


def HasNarrowerAuthority(g, objParser, subject, MADSRDF):
    for i in objParser.get("narrowerAuthority"):
        uri = URIRef(i.get('uri'))
        value = Literal(i.get('value'), lang='pt')
        g.add((subject, MADSRDF.hasNarrowerAuthority, uri))

        g.add((uri, RDF.type, MADSRDF.Authority))
        g.add((uri, MADSRDF.authoritativeLabel, value))
    return g

def CreateSubject(objParser):

    MADSRDF = Namespace("http://www.loc.gov/mads/rdf/v1#")

    token = objParser.get("tokenLSCH")
    authority = objParser.get("authority")
    authorityLit = Literal(authority, lang='pt')
    variantlabel = objParser.get("variant")
    reciprocalAuthorityUri = URIRef(objParser.get('reciprocalAuthority').get('uri'))
    reciprocalAuthority = Literal(objParser.get('reciprocalAuthority').get('value'), lang='pt')

    g = Graph()
    g.bind("madsrdf", MADSRDF)
    g.bind("rdf", RDF)

    #authoritativeLabel
    subject = URIRef(f"https://bibliokeia.com/authorities/subjects/{token}")
    g.add((subject, RDF.type, MADSRDF.Authority))
    g.add((subject, RDF.type, MADSRDF.Topic))
    g.add((subject, MADSRDF.authoritativeLabel, authorityLit))
    elementListAuthority = BNode()
    g.add((subject, MADSRDF.elementList, elementListAuthority))
    elementAuthority = BNode()
    g.add((elementListAuthority, RDF.first, elementAuthority))
    g.add((elementAuthority, RDF.type, MADSRDF.TopicElement))
    g.add((elementAuthority, MADSRDF.elementValue, authorityLit))
    g.add((elementListAuthority, RDF.rest, RDF.nil))

    #variant
    variantBN = BNode()
    g.add((subject, MADSRDF.hasVariant, variantBN))
    g.add((variantBN, RDF.type, MADSRDF.ComplexSubject))
    g.add((variantBN, RDF.type, MADSRDF.Variant))
    g.add((variantBN, MADSRDF.variantLabel, Literal(variantlabel, lang='pt')))

    componentListBN = BNode()
    g.add((variantBN, MADSRDF.componentList, componentListBN))
    variantBN1 = BNode()
    g.add((componentListBN, RDF.first, variantBN1))
    g.add((variantBN1, RDF.type, MADSRDF.Topic))
    g.add((variantBN1, RDF.type, MADSRDF.Variant))
    #elementList
    elementListBN1 = BNode()
    g.add((variantBN1, MADSRDF.elementList, elementListBN1))
    elementBN1 = BNode()
    g.add((elementListBN1, RDF.first, elementBN1))
    g.add((elementBN1, RDF.type, MADSRDF.TopicElement))
    g.add((elementBN1, MADSRDF.elementValue, Literal("Filosofia", lang='pt')))
    g.add((elementListBN1, RDF.rest, RDF.nil))
    g.add((variantBN1, MADSRDF.variantLabel, Literal("Filosofia", lang='pt')))
    firstBN = BNode()
    g.add((componentListBN, RDF.rest, firstBN))

    variantBN2 = BNode()
    g.add((firstBN, RDF.first, variantBN2))
    g.add((variantBN2, RDF.type, MADSRDF.Topic))
    g.add((variantBN2, RDF.type, MADSRDF.Variant))

    #elementList
    elementListBN2 = BNode()
    g.add((variantBN2, MADSRDF.elementList, elementListBN2))
    elementBN2 = BNode()
    g.add((elementListBN2, RDF.first, elementBN2))
    g.add((elementBN2, RDF.type, MADSRDF.TopicElement))
    g.add((elementBN2, MADSRDF.elementValue, Literal("Metodologia", lang='pt')))
    g.add((elementListBN2, RDF.rest, RDF.nil))
    g.add((variantBN2, MADSRDF.variantLabel, Literal("Metodologia", lang='pt')))
    g.add((firstBN, RDF.rest, RDF.nil))

    #hasReciprocalAuthority
    g.add((subject, MADSRDF.hasReciprocalAuthority, reciprocalAuthorityUri))
    g.add((reciprocalAuthorityUri, RDF.type, MADSRDF.Authority))
    g.add((reciprocalAuthorityUri, MADSRDF.authoritativeLabel, reciprocalAuthority))

    #hasNarrowerAuthority
    g = HasNarrowerAuthority(g, objParser, subject, MADSRDF)

    #g.serialize('TESTE.nt')
    return g

def Make_Graph(nt, token ):
    G1 = """PREFIX bk: <https://bibliokeia.com/authorities/subjects/>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    INSERT DATA {
        GRAPH bk:"""

    G2 = " {"

    G3 = """}
    }"""

    G = G1+str(token)+" { \n"+nt+"}}"

    return G