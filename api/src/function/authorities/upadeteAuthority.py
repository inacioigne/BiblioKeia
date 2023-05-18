from pyfuseki import FusekiUpdate
from pysolr import Solr

def UpadeteAuthority(request, id):
    au_update = FusekiUpdate('http://localhost:3030', 'authorities')
    solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

    authority = f'https://bibliokeia.com/authorities/{request.type}/{id}'
    
    if request.hasBroaderAuthority:
        for i in request.hasBroaderAuthority:
            narrower = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#> 
                        INSERT DATA
                        {{ GRAPH <{i.value}> 
                        {{ <{i.value}>  madsrdf:hasNarrowerAuthority  <{authority}> }} }}"""
            idDoc = i.value.split('/')[-1]
            doc = {
                    "id": idDoc,
                    "hasNarrowerAuthority": { "set": { 
                        'id': f"{idDoc}/hasNarrowerAuthority#{id}",
                        'uri': i.value,
                        'label': i.label.value,
                        'lang': i.label.lang,
                        'base': i.base } }
                    }
            print('SOLR: ', doc)
            responseSolr = solr.add([doc], commit=True)
            r = au_update.run_sparql(narrower)
            
    if request.hasNarrowerAuthority:
        for i in request.hasNarrowerAuthority:
            broader = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#> 
                        INSERT DATA
                        {{ GRAPH <{i.value}> 
                        {{ <{i.value}>  madsrdf:hasBroaderAuthority  <{authority}> }} }}"""
            idDoc = i.value.split('/')[-1]
            doc = {
                    "id": idDoc,
                    "hasBroaderAuthority": { "set": { 
                        'id': f"{idDoc}/hasBroaderAuthority#{id}",
                        'uri': i.value,
                        'label': i.label.value,
                        'lang': i.label.lang,
                        'base': i.base } }
                    }
            responseSolr = solr.add([doc], commit=True)
            r = au_update.run_sparql(broader)

    if request.hasReciprocalAuthority:
        for i in request.hasReciprocalAuthority:
            reciprocal = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#> 
                        INSERT DATA
                        {{ GRAPH <{i.value}> 
                        {{ <{i.value}>  madsrdf:hasReciprocalAuthority  <{authority}> }} }}"""
            idDoc = i.value.split('/')[-1]
            doc = {
                    "id": idDoc,
                    "hasReciprocalAuthority": { "set": { 
                        'id': f"{idDoc}/hasReciprocalAuthority#{id}",
                        'uri': i.value,
                         'label': i.label.value,
                        'lang': i.label.lang,
                        'base': i.base  } }
                    }
            responseSolr = solr.add([doc], commit=True)
            r = au_update.run_sparql(reciprocal)
            
     