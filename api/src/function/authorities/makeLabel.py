def MakeLabel(elementList):
    labels = [i.elementValue.value for i in elementList]
    label = ", ".join(labels)
    
    return label