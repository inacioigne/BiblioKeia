from pyfuseki import FusekiQuery


def DelMads(id, request):

    del_mads = """PREFIX topic: <https://bibliokeia.com/authorities/topic/>
                PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>

                DELETE DATA
                {{
                      GRAPH topic:{id} {{
                          topic:{id}  madsrdf:{mads} <{uri}> }} }} ; """
    
    d = request.dict()
    d['id'] = id
    upMads = del_mads.format(**d)
    
    return upMads

def PostMads(id, request):

    fuseki_query = FusekiQuery('http://localhost:3030', 'authorities')

    ask = """PREFIX topic: <https://bibliokeia.com/authorities/topic/>
                    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>

            ASK {{ graph topic:sh85017405 {{
                topic:{id} madsrdf:{mads} <{uri}> }} }} """
    
    d = request.dict()
    d['id'] = id
    askMads = ask.format(**d)
    responseAsk = fuseki_query.run_sparql(askMads)
    exist = responseAsk.convert()['boolean']

    if exist:
        return False
    else:
        post_mads = """PREFIX topic: <https://bibliokeia.com/authorities/topic/>
                PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>

                INSERT DATA
                    {{ GRAPH topic:{id} {{ 
                        topic:{id}  madsrdf:{mads} <{uri}> }} }} ; """
    
        d = request.dict()
        d['id'] = id
        upMads = post_mads.format(**d)
        
        return upMads