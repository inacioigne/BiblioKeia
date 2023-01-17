from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
from pyfuseki import FusekiUpdate

def UpdateWork(token):
    fuseki_update = FusekiUpdate('http://localhost:3030', 'acervo')

    # store = SPARQLUpdateStore(update_endpoint='http://localhost:3030/thesaurus/update')
    # query_endpoint = 'http://localhost:3030/thesaurus/query'
    # update_endpoint = 'http://localhost:3030/thesaurus/update'
    # store.open((query_endpoint, update_endpoint))

    up = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
        INSERT DATA
            { GRAPH  <https://bibliokeia.com/bibframe/work/"""+token+"""> { 
                    <https://bibliokeia.com/bibframe/work/"""+token+""">  
                    bf:hasInstance
                    <https://bibliokeia.com/bibframe/instance/"""+token+"""> } }"""

    fuseki_update.run_sparql(up)