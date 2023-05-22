from pysolr import Solr

def EditVariant(request):

    variant = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>     

            WITH <{request.authority}>

            DELETE {{  <{request.authority}> madsrdf:hasVariant ?hasVariant .
                ?hasVariant rdf:type ?typeVariant .
                ?hasVariant madsrdf:elementList ?elementList .
                ?elementList rdf:first ?node .
                ?node rdf:type ?typeElement .
                ?node madsrdf:elementValue "{request.oldValue}"{f'@{request.oldLang}' if request.oldLang else ''} . 
                ?hasVariant madsrdf:variantLabel "{request.oldValue}" . }}

            INSERT {{  <{request.authority}> madsrdf:hasVariant ?hasVariant .
                ?hasVariant rdf:type ?typeVariant .
                ?hasVariant madsrdf:elementList ?elementList .
                ?elementList rdf:first ?node .
                ?node rdf:type ?typeElement .
                ?node madsrdf:elementValue "{request.newValue}"{f'@{request.newLang}' if request.newLang else ''} . 
                ?hasVariant madsrdf:variantLabel "{request.newValue}" . }}

            WHERE {{ <{request.authority}> madsrdf:hasVariant ?hasVariant .
                ?hasVariant rdf:type ?typeVariant .
                ?hasVariant madsrdf:elementList ?elementList .
                ?elementList rdf:first ?node .
                ?node rdf:type ?typeElement .
                ?node madsrdf:elementValue "{request.oldValue}"{f'@{request.oldLang}' if request.oldLang else ''} . 
                ?hasVariant madsrdf:variantLabel "{request.oldValue}" . }}"""
    
    return variant

def DeleteVariant(request):

    variant = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>     

            WITH <{request.authority}>

            DELETE {{  <{request.authority}> madsrdf:hasVariant ?hasVariant .
                ?hasVariant rdf:type ?typeVariant .
                ?hasVariant madsrdf:elementList ?elementList .
                ?elementList rdf:rest rdf:nil .
                ?elementList rdf:first ?node .
                ?node rdf:type ?typeElement .
                ?node madsrdf:elementValue "{request.value}"{f'@{request.lang}' if request.lang else ''} . 
                ?hasVariant madsrdf:variantLabel "{request.value}" . }}

            WHERE {{ <{request.authority}> madsrdf:hasVariant ?hasVariant .
                ?hasVariant rdf:type ?typeVariant .
                ?hasVariant madsrdf:elementList ?elementList .
                ?elementList rdf:rest rdf:nil .
                ?elementList rdf:first ?node .
                ?node rdf:type ?typeElement .
                ?node madsrdf:elementValue "{request.value}"{f'@{request.lang}' if request.lang else ''} . 
                ?hasVariant madsrdf:variantLabel "{request.value}" . }}"""
    
    return variant

def PostVariant(request):
    variant = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        INSERT DATA {{ 
        GRAPH <{request.authority}> {{
        <{request.authority}> madsrdf:hasVariant  [ rdf:type  madsrdf:Variant , madsrdf:{request.type} ;
                                      madsrdf:elementList   ( [ rdf:type              madsrdf:TopicElement ;
                                                                madsrdf:elementValue  "{request.value}"{f'@{request.lang}' if request.lang else ''} 
                                                              ]
                                                            ) ;
                                      madsrdf:variantLabel  "{request.value}"
                                    ]
                }}
        }}"""
    return variant

def VariantSolr(request):
    solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)
    idUri = request.authority.split("/")[-1]

    remove = {
        "id":idUri,
        "variant":{ "remove": request.oldValue}
        }
    add = {
        "id":idUri,
        "variant":{ "add": request.newValue}
        }

    responseSolr = solr.add([remove, add], commit=True)

    return responseSolr