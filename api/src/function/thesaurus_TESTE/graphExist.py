from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore

def GraphExist(token):
    store = SPARQLUpdateStore(update_endpoint='http://localhost:3030/thesaurus/update')
    query_endpoint = 'http://localhost:3030/thesaurus/query'
    update_endpoint = 'http://localhost:3030/thesaurus/update'
    store.open((query_endpoint, update_endpoint))

    query = "PREFIX bk: <https://bibliokeia.com/authorities/subjects/>\n \
                ASK WHERE { GRAPH bk:" + token +" { ?s ?p ?o } }"
    
    response = store.query(query)

    return response.askAnswer