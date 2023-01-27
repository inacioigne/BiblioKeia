from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
from pyfuseki import FusekiUpdate

def UpdateWork(work_id, instance_id):
    fuseki_update = FusekiUpdate('http://localhost:3030', 'acervo')

    up = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
        INSERT DATA
            { GRAPH  <https://bibliokeia.com/resources/work/"""+work_id+"""> { 
                    <https://bibliokeia.com/resources/work/"""+work_id+""">  
                    bf:hasInstance
                    <https://bibliokeia.com/resources/instance/"""+instance_id+"""> } }"""

    fuseki_update.run_sparql(up)