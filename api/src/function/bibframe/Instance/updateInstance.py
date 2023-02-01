from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
from pyfuseki import FusekiUpdate

def UpdateInstance(instance_id, item_id):
    fuseki_update = FusekiUpdate('http://localhost:3030', 'acervo')

    up = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
        INSERT DATA
            { GRAPH  <https://bibliokeia.com/resources/instance/"""+instance_id+"""> { 
                    <https://bibliokeia.com/resources/instance/"""+instance_id+""">  
                    bf:hasItem
                    <https://bibliokeia.com/resources/item/"""+item_id+"""> } }"""

    fuseki_update.run_sparql(up)