from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from pyfuseki import FusekiUpdate, FusekiQuery

from src.schemas.settings import Settings

settings = Settings()

collectionUpdate = FusekiUpdate(f'{settings.url}:3030', 'collection')
collectionQuery = FusekiQuery(f'{settings.url}:3030', 'collection')

def Title(g, request, uri, BF):
    title = BNode()
    g.add((uri, BF.title, title))
    g.add((title, RDF.type, BF.Title))
    g.add((title, BF.mainTitle, Literal(request.mainTitle)))
    if request.subtitle: 
        g.add((title, BF.subtitle, Literal(request.subtitle)))

    # VariantTitle 
    if request.variantTitle:
        variantTitle = BNode()
        g.add((uri, BF.title, variantTitle))
        g.add((variantTitle, RDF.type, BF.VariantTitle))
        g.add((variantTitle, BF.mainTitle, Literal(request.variantTitle)))
    
    return g

def EditTitle(uri, data):
    up = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        WITH <{uri}>
        DELETE {{  <{uri}> bf:title ?o .
                        ?o ?p ?s}}
        INSERT {{ <{uri}> bf:title ?o .
                    ?o rdf:type bf:Title .
                    ?o bf:mainTitle "{data.value.get('mainTitle')}" .
                    { f'?o bf:subtitle "{data.value.get("subtitle")}"' if data.value.get('subtitle') else '' }
                      }}
        WHERE {{ <{uri}> bf:title ?o .
                        ?o ?p ?s }} """
    response = collectionUpdate.run_sparql(up)
    print(response.convert())

# def EditTitle(mainTitle, bkID):

#     prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
#                 PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
#                 PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"""
        
#     up = prefix+"WITH work:"+bkID+"""
#                     DELETE {work:"""+bkID+""" bf:title ?o .
#                         ?o bf:mainTitle ?t }
#                     INSERT {work:"""+bkID+""" bf:title ?o .
#                         ?o bf:mainTitle '"""+mainTitle+"""' }
#                     WHERE {work:"""+bkID+""" bf:title ?o .
#                         ?o bf:mainTitle ?t }"""

#     collectionUpdate.run_sparql(up)

#     label = prefix+"WITH work:"+bkID+"""
#                     DELETE {work:"""+bkID+""" bf:title ?o .
#                         ?o rdfs:label ?t }
#                     INSERT {work:"""+bkID+""" bf:title ?o .
#                         ?o rdfs:label '"""+mainTitle+"""' }
#                     WHERE {work:"""+bkID+""" bf:title ?o .
#                         ?o rdfs:label ?t }"""
#     collectionUpdate.run_sparql(label)

def EditSubtitle(subtitle, title,  bkID):

    prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
                PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"""
    
    subtitleSame = prefix+""" ASK { graph work:"""+bkID+"""
            {work:"""+bkID+""" bf:title ?o .
            ?o bf:subtitle '"""+subtitle+"' }}"
    
    askSubtitleSame = collectionQuery.run_sparql(subtitleSame)
    askSubtitleSame = askSubtitleSame.convert()

    if not askSubtitleSame['boolean']:
        subtitleExist = prefix+""" ASK { graph work:"""+bkID+"""
            {work:"""+bkID+""" bf:title ?o .
            ?o bf:subtitle ?subtitle }}"""
        askSubtitleExist = collectionQuery.run_sparql(subtitleExist)
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
            collectionUpdate.run_sparql(up)
        else:
            up = prefix+"INSERT DATA { GRAPH work:"+bkID+" { work:"+bkID+"""  bf:title [
                        rdf:type bf:Title;
                        bf:mainTitle '"""+title+"""' ;
                        bf:subtitle '"""+subtitle+"""' ] . } }"""
            collectionUpdate.run_sparql(up)