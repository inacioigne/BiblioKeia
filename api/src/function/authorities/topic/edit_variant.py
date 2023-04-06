def editVariant(id, request):
    if request.oldVariant.type == "ComplexSubject":

        variant = f"""PREFIX topic: <https://bibliokeia.com/authorities/topic/>
        PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        WITH topic:{id}

            DELETE {{ topic:{id} madsrdf:hasVariant ?hasVariant .
   ?hasVariant madsrdf:variantLabel "{request.oldVariant.value[0]}--{request.oldVariant.value[1]}"@{request.oldVariant.lang} .
    ?hasVariant madsrdf:componentList ?componentList .
    ?componentList rdf:first ?elem1 .
    ?elem1 madsrdf:variantLabel "{request.oldVariant.value[0]}"@{request.oldVariant.lang}  .
    ?elem1 madsrdf:elementList ?elementList1 .
    ?elementList1 rdf:first ?value1 .
    ?value1 madsrdf:elementValue "{request.oldVariant.value[0]}"@{request.oldVariant.lang} .
    ?componentList rdf:rest ?rest .
    ?rest rdf:first  ?elem2 .
    ?elem2 madsrdf:variantLabel "{request.oldVariant.value[1]}"@{request.oldVariant.lang} .
    ?elem2 madsrdf:elementList ?elementList2 .
    ?elementList2 rdf:first ?value2 .
    ?value2 madsrdf:elementValue "{request.oldVariant.value[1]}"@{request.oldVariant.lang} }}

        INSERT {{ topic:{id} madsrdf:hasVariant ?hasVariant .
   ?hasVariant madsrdf:variantLabel "{request.newVariant.value[0]}--{request.newVariant.value[1]}"@{request.newVariant.lang} .
    ?hasVariant madsrdf:componentList ?componentList .
    ?componentList rdf:first ?elem1 .
    ?elem1 madsrdf:variantLabel "{request.newVariant.value[0]}"@{request.newVariant.lang}  .
    ?elem1 madsrdf:elementList ?elementList1 .
    ?elementList1 rdf:first ?value1 .
    ?value1 madsrdf:elementValue "{request.newVariant.value[0]}"@{request.newVariant.lang} .
    ?componentList rdf:rest ?rest .
    ?rest rdf:first  ?elem2 .
    ?elem2 madsrdf:variantLabel "{request.newVariant.value[1]}"@{request.newVariant.lang} .
    ?elem2 madsrdf:elementList ?elementList2 .
    ?elementList2 rdf:first ?value2 .
    ?value2 madsrdf:elementValue "{request.newVariant.value[1]}"@{request.newVariant.lang} }}

        WHERE {{ topic:{id} madsrdf:hasVariant ?hasVariant .
   ?hasVariant madsrdf:variantLabel "{request.oldVariant.value[0]}--{request.oldVariant.value[1]}"@{request.oldVariant.lang} .
    ?hasVariant madsrdf:componentList ?componentList .
    ?componentList rdf:first ?elem1 .
    ?elem1 madsrdf:variantLabel "{request.oldVariant.value[0]}"@{request.oldVariant.lang}  .
    ?elem1 madsrdf:elementList ?elementList1 .
    ?elementList1 rdf:first ?value1 .
    ?value1 madsrdf:elementValue "{request.oldVariant.value[0]}"@{request.oldVariant.lang} .
    ?componentList rdf:rest ?rest .
    ?rest rdf:first  ?elem2 .
    ?elem2 madsrdf:variantLabel "{request.oldVariant.value[1]}"@{request.oldVariant.lang} .
    ?elem2 madsrdf:elementList ?elementList2 .
    ?elementList2 rdf:first ?value2 .
    ?value2 madsrdf:elementValue "{request.oldVariant.value[1]}"@{request.oldVariant.lang} }}"""
        
        return variant
    elif request.oldVariant.type == "Topic":
        variant = f"""PREFIX topic: <https://bibliokeia.com/authorities/topic/>
            PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        WITH topic:{id}

            DELETE {{ topic:{id} madsrdf:hasVariant ?hasVariant .
    ?hasVariant madsrdf:variantLabel "{request.oldVariant.value}"@{request.oldVariant.lang} .
    ?hasVariant madsrdf:elementList ?elementList .
    ?elementList rdf:first ?first .
    ?first madsrdf:elementValue "{request.oldVariant.value}"@{request.oldVariant.lang} }}

        INSERT {{ topic:{id} madsrdf:hasVariant ?hasVariant .
    ?hasVariant madsrdf:variantLabel "{request.newVariant.value}"@{request.newVariant.lang} .
    ?hasVariant madsrdf:elementList ?elementList .
    ?elementList rdf:first ?first .
    ?first madsrdf:elementValue "{request.newVariant.value}"@{request.newVariant.lang} }}

        WHERE {{ topic:{id} madsrdf:hasVariant ?hasVariant .
    ?hasVariant madsrdf:variantLabel "{request.oldVariant.value}"@{request.oldVariant.lang} .
    ?hasVariant madsrdf:elementList ?elementList .
    ?elementList rdf:first ?first .
    ?first madsrdf:elementValue "{request.oldVariant.value}"@{request.oldVariant.lang} }}"""
        
        return variant
        
def deleteVariant(id, request):

    if request.type == 'ComplexSubject':
        
        variant = f"""PREFIX topic: <https://bibliokeia.com/authorities/topic/>
        PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        WITH topic:{id}

          DELETE {{ 
          topic:{id} madsrdf:hasVariant ?hasVariant .
   ?hasVariant madsrdf:variantLabel "{request.value[0]}--{request.value[1]}"@{request.lang} .
    ?hasVariant rdf:type madsrdf:Variant, madsrdf:ComplexSubject  .
    ?hasVariant madsrdf:componentList ?componentList .
    ?componentList rdf:first ?E1 . 
    ?E1 madsrdf:variantLabel{request.value[0]}"@{request.lang}.
    ?E1 rdf:type madsrdf:Variant, madsrdf:Topic .
    ?E1 madsrdf:elementList ?elementList1 .
    ?elementList1 rdf:first ?value1 .
    ?elementList1 rdf:rest rdf:nil .
    ?value1 madsrdf:elementValue {request.value[0]}"@{request.lang} .
    ?value1 rdf:type madsrdf:TopicElement .
    ?componentList rdf:rest ?rest .
    ?rest rdf:first  ?E2 .
    ?rest rdf:rest rdf:nil .
    ?E2 madsrdf:variantLabel{request.value[1]}"@{request.lang} .
    ?E2 madsrdf:elementList ?elementList2 .
    ?E2 rdf:type madsrdf:Variant, madsrdf:Topic .
    ?elementList2 rdf:first ?value2 .
    ?elementList2 rdf:rest rdf:nil .    
    ?value2 madsrdf:elementValue {request.value[1]}"@{request.lang} .
    ?value2 rdf:type madsrdf:TopicElement
   }}

      WHERE {{ 
       topic:{id} madsrdf:hasVariant ?hasVariant .
   ?hasVariant madsrdf:variantLabel "{request.value[0]}--{request.value[1]}"@{request.lang} .
    ?hasVariant rdf:type madsrdf:Variant, madsrdf:ComplexSubject  .
    ?hasVariant madsrdf:componentList ?componentList .
    ?componentList rdf:first ?E1 . 
    ?E1 madsrdf:variantLabel{request.value[0]}"@{request.lang}.
    ?E1 rdf:type madsrdf:Variant, madsrdf:Topic .
    ?E1 madsrdf:elementList ?elementList1 .
    ?elementList1 rdf:first ?value1 .
    ?elementList1 rdf:rest rdf:nil .
    ?value1 madsrdf:elementValue {request.value[0]}"@{request.lang} .
    ?value1 rdf:type madsrdf:TopicElement .
    ?componentList rdf:rest ?rest .
    ?rest rdf:first  ?E2 .
    ?rest rdf:rest rdf:nil .
    ?E2 madsrdf:variantLabel{request.value[1]}"@{request.lang} .
    ?E2 madsrdf:elementList ?elementList2 .
    ?E2 rdf:type madsrdf:Variant, madsrdf:Topic .
    ?elementList2 rdf:first ?value2 .
    ?elementList2 rdf:rest rdf:nil .    
    ?value2 madsrdf:elementValue {request.value[1]}"@{request.lang} .
    ?value2 rdf:type madsrdf:TopicElement
   }}"""
        return variant
        
    elif request.type == 'Topic':
        variant = f"""PREFIX topic: <https://bibliokeia.com/authorities/topic/>
PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        WITH topic:{id}

            DELETE {{ topic:{id} madsrdf:hasVariant ?hasVariant .
    ?hasVariant rdf:type madsrdf:Variant, madsrdf:Topic .
    ?hasVariant madsrdf:variantLabel "{request.value}"@{request.lang} .
    ?hasVariant madsrdf:elementList ?elementList .
    ?elementList rdf:rest rdf:nil .
    ?elementList rdf:first ?first .
    ?first rdf:type madsrdf:TopicElement .
    ?first madsrdf:elementValue  "{request.value}"@{request.lang} }}

        WHERE {{ topic:sh85017405 madsrdf:hasVariant ?hasVariant .
    ?hasVariant rdf:type madsrdf:Variant, madsrdf:Topic .
    ?hasVariant madsrdf:variantLabel  "{request.value}"@{request.lang} .
    ?hasVariant madsrdf:elementList ?elementList .
    ?elementList rdf:rest rdf:nil .
    ?elementList rdf:first ?first .
    ?first rdf:type madsrdf:TopicElement .
    ?first madsrdf:elementValue  "{request.value}"@{request.lang} }}"""
        
        return variant
    
def addVariant(id, request):

    if request.type == 'ComplexSubject':
        variant = f"""
        PREFIX topic: <https://bibliokeia.com/authorities/topic/>
        PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

                INSERT DATA {{ 
                GRAPH topic:{id}{{
                topic:{id} madsrdf:hasVariant [ a madsrdf:ComplexSubject,
                madsrdf:Variant ;
            madsrdf:componentList ( [ a madsrdf:Topic,
                madsrdf:Variant ;
            madsrdf:elementList ( 
                [ a madsrdf:TopicElement ;
                    madsrdf:elementValue "{request.value[0]}"@{request.lang} ] ) ;
                    madsrdf:variantLabel "{request.value[0]}"@{request.lang} ] 
                [ a madsrdf:Topic,
                    madsrdf:Variant ;
                madsrdf:elementList ( 
                    [ a madsrdf:TopicElement ;
                        madsrdf:elementValue "{request.value[1]}"@{request.lang} ] ) ;
                        madsrdf:variantLabel "{request.value[1]}"@{request.lang} ] ) ;
                madsrdf:variantLabel "{request.value[0]}--{request.value[1]}"@{request.lang} ]
        }} }}"""

        return variant
    
    elif request.type == 'Topic':
        variant = f"""
        PREFIX topic: <https://bibliokeia.com/authorities/topic/>
        PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

                INSERT DATA {{ 
                GRAPH topic:{id} {{
                topic:{id} madsrdf:hasVariant [ a madsrdf:Topic,
                                madsrdf:Variant ;
                            madsrdf:elementList ( [ a madsrdf:TopicElement ;
                                        madsrdf:elementValue "{request.value}"@{request.lang} ] ) ;
                            madsrdf:variantLabel "{request.value}"@{request.lang} ]
                }}
        }}"""
        return variant

