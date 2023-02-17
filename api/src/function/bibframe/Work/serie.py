from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from pyfuseki import FusekiUpdate
import pysolr 

def UpdateSerie(serieURI, uri):

    serieUpdate = FusekiUpdate('http://localhost:3030', 'acervo') 
    
    up = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                INSERT DATA
                { GRAPH  <"""+serieURI+"""> { 
                     <"""+serieURI+""">
                     bf:seriesOf 
                     <"""+str(uri)+"""> } }"""

    serieUpdate.run_sparql(up)

    solr = pysolr.Solr('http://localhost:8983/solr/acervo/', timeout=10)
    resourceID = serieURI.split("/")[-1]
    doc = {
        "id": resourceID,
        "seriesOf": {"add": [str(uri)]}
     }
     
    solr.add([doc], commit=True)

def Serie(g, request, uri, BF):
    #print("SERIE: ", request.serieID)

    serieUri = URIRef(request.serieURI)
    g.add((uri, BF.hasSeries, serieUri))

    UpdateSerie(request.serieURI, uri)

    return g

