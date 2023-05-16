from pyfuseki import FusekiUpdate

def UpadeteAuthority(request, id):
    au_update = FusekiUpdate('http://localhost:3030', 'authorities')

    authority = f'https://bibliokeia.com/authorities/{request.type}/{id}'
    if request.hasBroaderAuthority:
        for i in request.hasBroaderAuthority:
            narrower = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#> 
                        INSERT DATA
                        {{ GRAPH <{i.value}> 
                        {{ <{i.value}>  madsrdf:hasNarrowerAuthority  <{authority}> }} }}"""
            r = au_update.run_sparql(narrower)
            
    if request.hasNarrowerAuthority:
        for i in request.hasNarrowerAuthority:
            broader = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#> 
                        INSERT DATA
                        {{ GRAPH <{i.value}> 
                        {{ <{i.value}>  madsrdf:hasBroaderAuthority  <{authority}> }} }}"""
            r = au_update.run_sparql(broader)

    if request.hasReciprocalAuthority:
        for i in request.hasReciprocalAuthority:
            reciprocal = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#> 
                        INSERT DATA
                        {{ GRAPH <{i.value}> 
                        {{ <{i.value}>  madsrdf:hasReciprocalAuthority  <{authority}> }} }}"""
            r = au_update.run_sparql(reciprocal)
            
            print(r.convert()  )