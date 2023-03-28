from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from pyfuseki import FusekiUpdate, FusekiQuery

acervoUpdate = FusekiUpdate('http://localhost:3030', 'acervo')
acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')

def Title(g, request, uri, BF):
    title = BNode()
    g.add((uri, BF.title, title))
    g.add((title, RDF.type, BF.Title))
    g.add((title, BF.mainTitle, Literal(request.mainTitle)))
    if request.subtitle: 
        g.add((title, BF.subtitle, Literal(request.subtitle)))
   # g.add((title, RDFS.label, label))

    # VariantTitle 
    if request.variantTitle:
        variantTitle = BNode()
        g.add((uri, BF.title, variantTitle))
        g.add((variantTitle, RDF.type, BF.VariantTitle))
        g.add((variantTitle, BF.mainTitle, Literal(request.variantTitle)))
    
    return g

def EditTitle(mainTitle, bkID):

    prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
                PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"""
        
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

def EditSubtitle(subtitle, title,  bkID):

    prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
                PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"""
    
    subtitleSame = prefix+""" ASK { graph work:"""+bkID+"""
            {work:"""+bkID+""" bf:title ?o .
            ?o bf:subtitle '"""+subtitle+"' }}"
    
    askSubtitleSame = acervoQuery.run_sparql(subtitleSame)
    askSubtitleSame = askSubtitleSame.convert()

    if not askSubtitleSame['boolean']:
        subtitleExist = prefix+""" ASK { graph work:"""+bkID+"""
            {work:"""+bkID+""" bf:title ?o .
            ?o bf:subtitle ?subtitle }}"""
        askSubtitleExist = acervoQuery.run_sparql(subtitleExist)
        askSubtitleExist = askSubtitleExist.convert()

        if askSubtitleExist['boolean']:
            up = prefix+"WITH work:"+bkID+"""
                DELETE {work:"""+bkID+""" bf:title ?o .
                        ?o ?p ?t }
                    INSERT {work:"""+bkID+""" bf:title ?o .
                    ?o rdf:type bf:Title .
                        ?o bf:mainTitle '"""+title+"""' .
                        ?o bf:subtitle '"""+subtitle+"""'
                          }
                    WHERE {work:"""+bkID+""" bf:title ?o .
                        ?o ?p ?t }"""
            acervoUpdate.run_sparql(up)
        else:
            up = prefix+"INSERT DATA { GRAPH work:"+bkID+" { work:"+bkID+"""  bf:title [
                        rdf:type bf:Title;
                        bf:mainTitle '"""+title+"""' ;
                        bf:subtitle '"""+subtitle+"""' ] . } }"""
            acervoUpdate.run_sparql(up)