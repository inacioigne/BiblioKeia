from .makeLabel import MakeLabel
def MakeElement(elementList):
        eList = list()
        for element in elementList:
                e = f"""[ a madsrdf:{element.type} ;
                madsrdf:elementValue "{element.elementValue.value}"{f'@{element.elementValue.lang}' if element.elementValue.lang else ''} ]"""
                eList.append(e)
        return " ".join(eList)

def MakeComplexElement(componentList):
    eList = list()
    for j in componentList:
        e = f"""[ a madsrdf:{j.type},
                            madsrdf:Variant ;
                        madsrdf:elementList ( [ a madsrdf:{j.elementList.type} ;
                                    madsrdf:elementValue "{j.elementList.elementValue.value}" ] ) ;
                        ] """
        eList.append(e)

    return " ".join(eList)

def MakeComponentList(componentList):
    components = list()
    for i in componentList:
        if 'label' in i.dict().keys():
            component = f"<{i.value}>"
            components.append(component)
        else:
            component = f"""[ a madsrdf:Authority,
                        madsrdf:{i.type} ;
                    madsrdf:authoritativeLabel "{MakeLabel(i.elementList)}" ;
                    madsrdf:elementList (  {MakeElement(i.elementList)} ) ]"""
            components.append(component)
    return " ".join(components)