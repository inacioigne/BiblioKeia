from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from pyfuseki import FusekiUpdate
import pysolr 

def UpdateSerie(resourceID, uri):

    serieUpdate = FusekiUpdate('http://localhost:3030', 'acervo') 
    
    up = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                INSERT DATA
                { GRAPH  <https://bibliokeia.com/resources/hub/"""+resourceID+"""> { 
                     <https://bibliokeia.com/resources/hub/"""+resourceID+""">
                     bf:seriesOf 
                     <"""+str(uri)+"""> } }"""

    serieUpdate.run_sparql(up)

    solr = pysolr.Solr('http://localhost:8983/solr/acervo/', timeout=10)
    doc = {
        "id": resourceID,
        "seriesOf": {"add": [str(uri)]}
     }
    solr.add([doc], commit=True)

def Serie(g, request, uri, BF):

    serieUri = URIRef(f"https://bibliokeia.com/resources/hub/{request.serieID}")
    g.add((uri, BF.hasSeries, serieUri))

    UpdateSerie(request.serieID, uri)

    return g

