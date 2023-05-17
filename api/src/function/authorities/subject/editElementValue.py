def EditElementValue(request):

    elementValue = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>          
            WITH <https://bibliokeia.com/authorities/Topic/bkau-1>
            DELETE {{ <{request.authority}> madsrdf:elementList ?elementList .
                        ?elementList rdf:first ?node .
                        ?node madsrdf:elementValue ?value . 
                        <{request.authority}> madsrdf:authoritativeLabel ?label }}
            INSERT {{  <{request.authority}> madsrdf:elementList ?elementList .
                        ?elementList rdf:first ?node .
                        ?node madsrdf:elementValue "{request.value}"{f'@{request.lang}' if request.lang else ''}  .  
                        <{request.authority}> madsrdf:authoritativeLabel "{request.value}" }}
            WHERE {{ <{request.authority}> madsrdf:elementList ?elementList .
                        ?elementList rdf:first ?node .
                        ?node madsrdf:elementValue ?value . 
                        <{request.authority}> madsrdf:authoritativeLabel ?label }}"""
    return elementValue