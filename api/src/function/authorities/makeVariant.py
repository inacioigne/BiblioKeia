from .makeLabel import MakeLabel
from .makeElement import MakeElement, MakeComplexElement

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
    return ", ".join(vList)