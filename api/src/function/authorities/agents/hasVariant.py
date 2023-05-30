from pyfuseki import FusekiUpdate

prefix = """PREFIX name: <https://bibliokeia.com/authorities/name/>
        PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"""

fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')

def EditVariant(authority, request):

    variant = f"""{prefix}

        WITH  <{authority}>

        DELETE {{
        <{authority}> madsrdf:hasVariant ?hasVariant .
        ?hasVariant rdf:type madsrdf:{request.oldVariant.variantType} .
        ?hasVariant madsrdf:elementList ?elementList .
        ?elementList rdf:rest*/rdf:first ?element .
        ?element rdf:type madsrdf:{request.oldVariant.elementType} .
        ?element madsrdf:elementValue "{request.oldVariant.value}"
             }}

        INSERT {{ 
        <{authority}> madsrdf:hasVariant ?hasVariant .
        ?hasVariant rdf:type madsrdf:{request.newVariant.variantType} .
        ?hasVariant madsrdf:elementList ?elementList .
        ?elementList rdf:rest*/rdf:first ?element .
        ?element rdf:type madsrdf:{request.newVariant.elementType} .
        ?element madsrdf:elementValue "{request.newVariant.value}"
        }}

        WHERE {{ 
       <{authority}> madsrdf:hasVariant ?hasVariant .
        ?hasVariant rdf:type madsrdf:{request.oldVariant.variantType} .
        ?hasVariant madsrdf:elementList ?elementList .
        ?elementList rdf:rest*/rdf:first ?element .
        ?element rdf:type madsrdf:{request.oldVariant.elementType} .
        ?element madsrdf:elementValue "{request.oldVariant.value}"
         }}"""
    
    responseJena = fuseki_update.run_sparql(variant)
    
    return responseJena.convert()['message']

def deleteVariantPersonalName(id, request):
     
    variant = f"""{prefix}

        WITH name:{id}

        DELETE {{
            name:{id} madsrdf:hasVariant ?hasVariant .
    ?hasVariant rdf:type madsrdf:Variant, madsrdf:PersonalName .
    ?hasVariant madsrdf:variantLabel  { f'"{request.value}, {request.date}" .' if request.date else f'"{request.value}" .' } 
    ?hasVariant madsrdf:elementList ?elementList .
    ?elementList rdf:first ?first .
    ?first madsrdf:elementValue "{request.value}" .
    ?first rdf:type madsrdf:FullNameElement .   
     {  '?elementList rdf:rest ?rest .' if request.date else '' } 
     {  '?rest rdf:rest rdf:nil . ' if request.date else '' } 
     {  '?rest rdf:first ?date . ' if request.date else '' } 
     {  '?date rdf:type madsrdf:DateNameElement . ' if request.date else '' } 
     {  f'?date madsrdf:elementValue "{request.date}"' if request.date else '' }     
             }}

    WHERE {{ 
       name:{id} madsrdf:hasVariant ?hasVariant .
    ?hasVariant rdf:type madsrdf:Variant, madsrdf:PersonalName .
    ?hasVariant madsrdf:variantLabel  { f'"{request.value}, {request.date}" .' if request.date else f'"{request.value}" .' } 
    ?hasVariant madsrdf:elementList ?elementList .
    ?elementList rdf:first ?first .
    ?first madsrdf:elementValue "{request.value}" .
    ?first rdf:type madsrdf:FullNameElement .   
     {  '?elementList rdf:rest ?rest .' if request.date else '' } 
     {  '?rest rdf:rest rdf:nil . ' if request.date else '' } 
     {  '?rest rdf:first ?date . ' if request.date else '' } 
     {  '?date rdf:type madsrdf:DateNameElement . ' if request.date else '' } 
     {  f'?date madsrdf:elementValue "{request.date}"' if request.date else '' }     
         }}"""
     
    return variant

def addVariantPersonalName(id, request):
    
    variant = f"""{prefix} 
        INSERT DATA {{ 
        GRAPH name:{id} {{
        name:{id} madsrdf:hasVariant [ a madsrdf:PersonalName,
            madsrdf:Variant ;
            madsrdf:elementList ( [ a madsrdf:FullNameElement ;
            madsrdf:elementValue "{request.value}" ] 
            { f'[ a madsrdf:DateNameElement ; madsrdf:elementValue "{request.date}" ] ) ;' if request.date else ') ;' } 
            { f'madsrdf:variantLabel "{request.value} , {request.date}" ]' if request.date else f'madsrdf:variantLabel "{request.value}" ]' } 
                }}
        }}"""
    return variant

