from .makeLabel import MakeLabel
from .makeElement import MakeElement

def MakeVariant(variants):
    vList = list()
    for i in variants:
        v = f"""[ a madsrdf:{i.type},
                madsrdf:Variant ;
            madsrdf:elementList ( {MakeElement(i.elementList)} ) ;
            madsrdf:variantLabel "{MakeLabel(i.elementList)}" ]"""
        vList.append(v)
    return ", ".join(vList)