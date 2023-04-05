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
        