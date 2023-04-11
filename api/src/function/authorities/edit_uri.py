from pyfuseki import FusekiQuery


def DelMads(request):

    del_mads = f"""PREFIX graph: <https://bibliokeia.com/authorities/{request.collection}/>
                PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>

                DELETE DATA
                {{ GRAPH graph:{request.id} {{
                          graph:{request.id}  madsrdf:{request.mads} <{request.uri}> }} }} ; """
    
    return del_mads

def PostMads(request):

    fuseki_query = FusekiQuery('http://localhost:3030', 'authorities')

    ask = f"""PREFIX graph: <https://bibliokeia.com/authorities/{request.collection}/>
                    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>

            ASK {{ graph graph:{request.id} {{
                graph:{request.id} madsrdf:{request.mads} <{request.uri}> }} }} """
    

    responseAsk = fuseki_query.run_sparql(ask)
    exist = responseAsk.convert()['boolean']

    if exist:
        return False
    else:
        post_mads = f"""PREFIX graph: <https://bibliokeia.com/authorities/{request.collection}/>
                PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>

                INSERT DATA
                    {{ GRAPH graph:{request.id} {{ 
                        graph:{request.id}  madsrdf:{request.mads} <{request.uri}> }} }} ; """
        
        return post_mads