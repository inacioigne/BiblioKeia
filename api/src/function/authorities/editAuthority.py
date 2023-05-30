from pyfuseki import FusekiUpdate
from pysolr import Solr

au_update = FusekiUpdate('http://localhost:3030', 'authorities')
solrAu = Solr('http://localhost:8983/solr/authorities/', timeout=10)

def DeleteDataJena(authority, request):

    # labels = ['birthPlace',   'fullerName']

    if request.data.type == 'literal':
        delete = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
                 DELETE DATA
                {{ GRAPH <{authority}> 
                {{ <{authority}>  madsrdf:{request.data.metadata}  "{request.data.label.value}" }} }} ;"""        
    else:
        delete = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
            WITH <{authority}> 
            DELETE {{ <{authority}>  madsrdf:{request.data.metadata}  ?node .
                ?node rdf:type ?type .
                ?node rdfs:label "{request.data.label.value}" }}
            WHERE {{ <{authority}>  madsrdf:{request.data.metadata}  ?node .
                ?node rdf:type ?type .
                ?node rdfs:label "{request.data.label.value}"  }}"""
        
    response = au_update.run_sparql(delete)
    
    return response.convert()

def AddDataJena(authority, request):

    # labels = ['birthPlace',   'fullerName']

    if request.data.type == 'literal':
        add = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
                INSERT DATA
                {{ GRAPH <{authority}> 
                {{ <{authority}>  madsrdf:{request.data.metadata}  "{request.data.label.value}" }} }} ;"""
        
    else:
        add = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
            INSERT DATA
            {{ GRAPH <{authority}> 
            {{ <{authority}>  madsrdf:{request.data.metadata} [ a madsrdf:{request.data.type} ;
                        rdfs:label "{request.data.label.value}" ] }} }}"""
        
    response = au_update.run_sparql(add)
    
    return response.convert()

def DeleteDataSolr(authority, request):

    id = authority.split("/")[-1] 
    doc = {'id': id,
       f'{request.data.metadata}': {'remove':request.data.label.value }
       }
    response = solrAu.add([doc], commit=True)

    return response

def AddDataSolr(authority, request):

    id = authority.split("/")[-1] 
    doc = {'id': id,
       f'{request.data.metadata}': {'set':request.data.label.value }
       }
    response = solrAu.add([doc], commit=True)

    return response