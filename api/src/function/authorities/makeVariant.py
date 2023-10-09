from .makeLabel import MakeLabel
from .makeElement import MakeElement, MakeComplexElement
from pyfuseki import FusekiUpdate

def MakeVariant(variants): 
    vList = list()
    for i in variants:
        if i.elementList:
            v = f"""[ a madsrdf:{i.type},
                madsrdf:Variant ;
            madsrdf:elementList ( {MakeElement(i.elementList)} ) ;
            madsrdf:variantLabel "{MakeLabel(i.elementList)}" ]"""
        else:
            v = f"""[ a madsrdf:{i.type},
                madsrdf:Variant ;
            madsrdf:componentList ( {MakeComplexElement(i.componentList)}) ;
            madsrdf:variantLabel "{"--".join([j.elementList.elementValue.value for j in i.componentList])}" ]"""
        vList.append(v)
    mads = ", ".join(vList)
    hasVariants = f"madsrdf:hasVariant {mads} ;"
    return hasVariants

def MakeSparqlVariant(authority, request):

    if len(request.elementList) == 1:
        i = request.elementList[0]
        qVariant = f"""<{authority}> madsrdf:hasVariant ?variant .
        ?variant rdf:type  madsrdf:Variant , madsrdf:{request.type} .
        ?hasVariant madsrdf:variantLabel ?variantLabel .
        ?variant madsrdf:elementList ?elementList . 
        ?elementList rdf:first ?e .
        ?e rdf:type madsrdf:{i.type} . 
        ?e madsrdf:elementValue "{i.elementValue.value}" . 
        ?elementList rdf:rest rdf:nil .
        """
        return qVariant
    else:
        elements = [
                f"""<{authority}> madsrdf:hasVariant ?variant .
                ?variant rdf:type  madsrdf:Variant , madsrdf:{request.type} .
                ?variant madsrdf:variantLabel ?variantLabel .
                ?variant madsrdf:elementList ?elementList . \n"""
            ]
        for i in request.elementList:
            index = request.elementList.index(i)
            if index == 0:
                rest = f'?rest{index+1}'
                e = f"""?elementList rdf:first ?e{index} .
            ?e{index} rdf:type madsrdf:{i.type} . 
            ?e{index} madsrdf:elementValue "{i.elementValue.value}" . 
            ?elementList rdf:rest {rest} . \n"""
                elements.append(e)
            else:
                e = f"""{rest} rdf:first ?e{index} .
            ?e{index} rdf:type madsrdf:{i.type} . 
            ?e{index} madsrdf:elementValue "{i.elementValue.value}" .\n"""
                if i == request.elementList[-1]:
                    nil = f"{rest} rdf:rest rdf:nil"
                    elements.append(e)
                    elements.append(nil)
                    break
                elements.append(e)
                rest = f'?rest{index+1}'
        qVariant = " ".join(elements)   
        return qVariant 
    
def EditVariantJena(authority, request):
    
        vOld = MakeSparqlVariant(authority, request.old)
        vNew = MakeSparqlVariant(authority, request.new)
        variant = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>    
                        WITH <{authority}> 
                        DELETE {{ {vOld} }}
                        INSERT {{ {vNew}  }}
                        WHERE {{{vOld}  }}"""

        upAuthorities = FusekiUpdate('http://localhost:3030', 'authorities')

        response = upAuthorities.run_sparql(variant)
        return response.convert()