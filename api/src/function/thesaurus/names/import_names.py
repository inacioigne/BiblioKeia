from rdflib import Graph, URIRef
from pyfuseki import FusekiUpdate, FusekiQuery
import pysolr
from src.function.thesaurus.names.makeGraph import Make_Graph
#from src.function.solr.doc_names import create_doc
from src.function.solr.docName import DocName
 

#JENA
fuseki_update = FusekiUpdate('http://localhost:3030', 'authority')

#SOLR
solr = pysolr.Solr('http://localhost:8983/solr/authorities/', timeout=10)


def Import_Authority(token):

    g = Graph()
    rdf = f'https://id.loc.gov/authorities/names/{token}.madsrdf.rdf'
    #rdf = f'https://id.loc.gov/authorities/names/{token}.rdf'
    g.parse(rdf)   
     

    #REMOVE CONTRIBUTIONS
    contributorTo = URIRef('http://id.loc.gov/ontologies/bflc/contributorTo')
    for s, p, o in g:
        if p == contributorTo:
            g.remove((o, None, None))
    g.remove((None, contributorTo, None))

    #REMOVE SUBJECTOF
    subjectOf = URIRef('http://id.loc.gov/ontologies/bflc/subjectOf')
    for s, p, o in g:
        if p == subjectOf:
            g.remove((o, None, None))
    g.remove((None, subjectOf, None))

    g.serialize("name.ttl")
    nt = g.serialize(format='nt')
    G = Make_Graph(nt, token )
    rf = fuseki_update.run_sparql(G)
    status = rf.convert()

    #REPLACE BK
    update = "PREFIX bk: <https://bibliokeia.com/authorities/names/>\n \
        PREFIX lc: <http://id.loc.gov/authorities/names/>\n \
        WITH bk:"+ token + "\n \
            DELETE { lc:"+ token + " ?p ?o }\n \
            INSERT { bk:"+ token + " ?p ?o }\n \
                WHERE { lc:"+ token + " ?p ?o }"
    fuseki_update.run_sparql(update)

    #INDEX SOLR
    doc = DocName(g, token)
    rs = solr.add([doc], commit=True)
    return status["statusCode"]