prefix = """PREFIX name: <https://bibliokeia.com/authorities/name/>
        PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"""

def editVariantPersonalName(id, request):

    variant = f"""{prefix}

        WITH name:{id}

         DELETE {{
            name:{id} madsrdf:hasVariant ?hasVariant .
    ?hasVariant rdf:type madsrdf:Variant, madsrdf:PersonalName .
    ?hasVariant madsrdf:variantLabel  { f'"{request.oldVariant.value}, {request.oldVariant.date}" .' if request.oldVariant.date else f'"{request.oldVariant.value}" .' } 
    ?hasVariant madsrdf:elementList ?elementList .
    ?elementList rdf:first ?first .
    ?first madsrdf:elementValue "{request.oldVariant.value}" .
    ?first rdf:type madsrdf:FullNameElement .   
     {  '?elementList rdf:rest ?rest .' if request.oldVariant.date else '' } 
     {  '?rest rdf:rest rdf:nil . ' if request.oldVariant.date else '' } 
     {  '?rest rdf:first ?date . ' if request.oldVariant.date else '' } 
     {  '?date rdf:type madsrdf:DateNameElement . ' if request.oldVariant.date else '' } 
     {  f'?date madsrdf:elementValue "{request.oldVariant.date}"' if request.oldVariant.date else '' }     
             }}

        INSERT {{ 
        name:{id} madsrdf:hasVariant ?hasVariant .
    ?hasVariant rdf:type madsrdf:Variant, madsrdf:PersonalName .
    ?hasVariant madsrdf:variantLabel  { f'"{request.newVariant.value}, {request.newVariant.date}" .' if request.newVariant.date else f'"{request.newVariant.value}" .' } 
    ?hasVariant madsrdf:elementList ?elementList .
    ?elementList rdf:first ?first .
    ?first madsrdf:elementValue "{request.newVariant.value}" .
    ?first rdf:type madsrdf:FullNameElement .   
     {  '?elementList rdf:rest ?rest .' if request.newVariant.date else '' } 
     {  '?rest rdf:rest rdf:nil . ' if request.newVariant.date else '' } 
     {  '?rest rdf:first ?date . ' if request.newVariant.date else '' } 
     {  '?date rdf:type madsrdf:DateNameElement . ' if request.newVariant.date else '' } 
     {  f'?date madsrdf:elementValue "{request.newVariant.date}"' if request.newVariant.date else '' }   
        }}

        WHERE {{ 
       name:{id} madsrdf:hasVariant ?hasVariant .
    ?hasVariant rdf:type madsrdf:Variant, madsrdf:PersonalName .
    ?hasVariant madsrdf:variantLabel  { f'"{request.oldVariant.value}, {request.oldVariant.date}" .' if request.oldVariant.date else f'"{request.oldVariant.value}" .' } 
    ?hasVariant madsrdf:elementList ?elementList .
    ?elementList rdf:first ?first .
    ?first madsrdf:elementValue "{request.oldVariant.value}" .
    ?first rdf:type madsrdf:FullNameElement .   
     {  '?elementList rdf:rest ?rest .' if request.oldVariant.date else '' } 
     {  '?rest rdf:rest rdf:nil . ' if request.oldVariant.date else '' } 
     {  '?rest rdf:first ?date . ' if request.oldVariant.date else '' } 
     {  '?date rdf:type madsrdf:DateNameElement . ' if request.oldVariant.date else '' } 
     {  f'?date madsrdf:elementValue "{request.oldVariant.date}"' if request.oldVariant.date else '' }     
         }}"""
    return variant

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

