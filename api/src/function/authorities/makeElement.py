def MakeElement(elementList):
        eList = list()
        for i in elementList:
                e = f"""[ a madsrdf:{i.type} ;
                madsrdf:elementValue "{i.elementValue.value}"{f'@{i.elementValue.lang}' if i.elementValue.lang else ''} ]"""
                eList.append(e)
        return " ".join(eList)