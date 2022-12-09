from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore

def UpdateThesarus(graph, metadata, token):

    store = SPARQLUpdateStore(update_endpoint='http://localhost:3030/thesaurus/update')
    query_endpoint = 'http://localhost:3030/thesaurus/query'
    update_endpoint = 'http://localhost:3030/thesaurus/update'
    store.open((query_endpoint, update_endpoint))

    prefix = "PREFIX madsrdf:  <http://www.loc.gov/mads/rdf/v1#>\n \
        PREFIX bk: <https://bibliokeia.com/authorities/subjects/>\n \
        PREFIX lc: <http://id.loc.gov/authorities/subjects/>\n"

    q1 = prefix + "WITH bk:" + graph + "\n \
        DELETE {?s madsrdf:" + metadata + " lc:" + token + "}\n \
        INSERT { ?s madsrdf:" + metadata + " bk:" + token + "}\n \
        WHERE { ?s madsrdf:" + metadata + " lc:" + token + "}\n"
    store.update(q1)

    q2 = prefix + "WITH bk:" + graph + "\n \
                DELETE { lc:" + token + " ?p ?o }\n \
                    INSERT { bk:" + token + " ?p ?o }\n \
                        WHERE { lc:" + token + "?p ?o }"
    store.update(q2)

    q3 = prefix + "WITH bk:" + graph + "\n \
            DELETE { bk:" + token + " ?p lc:collection_LCSH_General }\n \
                INSERT { bk:" + token + " ?p bk:collection_BKSH_General}\n \
                    WHERE { bk:" + token + " ?p lc:collection_LCSH_General  }"
    store.update(q3)