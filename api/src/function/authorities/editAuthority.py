from pyfuseki import FusekiUpdate
from pysolr import Solr

au_update = FusekiUpdate('http://localhost:3030', 'authorities')
solrAu = Solr('http://localhost:8983/solr/authorities/', timeout=10)

def DeleteDataJena(authority, request):

    if request.data.metadata == 'birthPlace':
        delete = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            WITH <{authority}> 
            DELETE {{ <{authority}>  madsrdf:{request.data.metadata}  ?birthPlace .
                ?birthPlace ?p ?o }}
            WHERE {{ <{authority}>  madsrdf:{request.data.metadata}  ?birthPlace .
                ?birthPlace ?p ?o }}"""


    delete = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
                 DELETE DATA
                {{ GRAPH <{authority}> 
                {{ <{authority}>  madsrdf:{request.data.metadata}  "{request.data.value}" }} }} ;"""
    
    response = au_update.run_sparql(delete)
    
    return response.convert()

def DeleteDataSolr(authority, request):

    id = authority.split("/")[-1] 
    doc = {'id': id,
       f'{request.data.metadata}': {'remove':request.data.value }
       }
    response = solrAu.add([doc], commit=True)

    return response