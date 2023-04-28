def MakeLabel(elementList):
    labels = [i.elementValue.value for i in elementList]
    label = ", ".join(labels)
    
    return label

def ComponentLabel(componentList):
    labelList = list()
    for i in componentList:     
        if 'label' in i.dict().keys():
            labelList.append(i.label)
        else:
            elementList = list()
            for j in i.elementList:
                value = j.elementValue.value
                elementList.append(value)
            labelComponent = ", ".join(elementList)
            labelList.append(labelComponent)
    label = ". ".join(labelList)   
    return label