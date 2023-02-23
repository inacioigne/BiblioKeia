from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from pyfuseki import FusekiUpdate, FusekiQuery

def Title(g, request, uri, label, BF):
    title = BNode()
    g.add((uri, BF.title, title))
    g.add((title, RDF.type, BF.Title))
    g.add((title, BF.mainTitle, Literal(request.mainTitle)))
    if request.subtitle: 
        g.add((title, BF.subtitle, Literal(request.subtitle)))
    g.add((title, RDFS.label, label))

    # VariantTitle 
    if request.variantTitle:
        variantTitle = BNode()
        g.add((uri, BF.title, variantTitle))
        g.add((variantTitle, RDF.type, BF.VariantTitle))
        g.add((variantTitle, BF.mainTitle, Literal(request.variantTitle)))
    
    return g

def EditTitle(mainTitle, bkID):

    acervoUpdate = FusekiUpdate('http://localhost:3030', 'acervo')
    acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')

    prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
                PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"""

    ask = prefix+""" ASK { graph work:"""+bkID+"""
            {work:"""+bkID+""" bf:title ?o .
            ?o bf:mainTitle '"""+mainTitle+"' }}"""
    response = acervoQuery.run_sparql(ask)
    response = response.convert()
    
    if not response['boolean']:
        
        up = prefix+"WITH work:"+bkID+"""
                    DELETE {work:"""+bkID+""" bf:title ?o .
                        ?o bf:mainTitle ?t }
                    INSERT {work:"""+bkID+""" bf:title ?o .
                        ?o bf:mainTitle '"""+mainTitle+"""' }
                    WHERE {work:"""+bkID+""" bf:title ?o .
                        ?o bf:mainTitle ?t }"""

        acervoUpdate.run_sparql(up)

        label = prefix+"WITH work:"+bkID+"""
                    DELETE {work:"""+bkID+""" bf:title ?o .
                        ?o rdfs:label ?t }
                    INSERT {work:"""+bkID+""" bf:title ?o .
                        ?o rdfs:label '"""+mainTitle+"""' }
                    WHERE {work:"""+bkID+""" bf:title ?o .
                        ?o rdfs:label ?t }"""
        acervoUpdate.run_sparql(label)