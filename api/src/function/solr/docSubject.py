#from api.src.function.authorities.makeLabel import ComponentLabel
from src.function.authorities.makeLabel import ComponentLabel

def MakeLabel(elementList):
    labels = [i.elementValue.value for i in elementList]
    label = ", ".join(labels)
    
    return label

def MakeVariantLabel(hasVariant):
    variantes = list()
    for i in hasVariant:
        if i.type =='ComplexSubject':
            label = "--".join([j.elementList.elementValue.value for j in i.componentList])
            variantes.append(label)
        else:
            label = ", ".join([j.elementValue.value for j in i.elementList])
            variantes.append(label)

    return variantes

def MakeDoc(request, id):
    doc = {
        'id': id,
        'type': request.type,
        "creationDate": request.adminMetadata.creationDate.strftime('%Y-%m-%d'), 
        "label": f'{MakeLabel(request.elementList)}' if request.elementList else f'{ComponentLabel(request.componentList)}' ,
        "isMemberOfMADSCollection": request.isMemberOfMADSCollection
    }
    if request.fullerName:
        doc['fullerName'] = request.fullerName.elementValue.value
    if request.birthDate:
        doc['birthDate'] = request.birthDate
    if request.birthPlace:
        doc['birthPlace'] = request.birthPlace.label
    if request.deathDate:
        doc['deathDate'] = request.deathDate
    if request.occupation:
        doc['occupation'] = [i.label for i in request.occupation]
    if request.hasAffiliation:
        doc['hasAffiliation'] = [i.dict() for i in request.hasAffiliation]
    if request.hasBroaderAuthority:
        doc['hasBroaderAuthority']  = "TESTE"
    if request.hasCloseExternalAuthority:
        doc['hasCloseExternalAuthority']  = [i.dict() for i in request.hasCloseExternalAuthority]
    if request.hasExactExternalAuthority:
        doc['hasExactExternalAuthority']  = [i.dict() for i in request.hasExactExternalAuthority]
    if request.hasNarrowerAuthority:
        doc['hasNarrowerAuthority']  = [i.dict() for i in request.hasNarrowerAuthority]
    if request.hasVariant:
        doc['hasVariant'] = MakeVariantLabel(request.hasVariant)

    return doc

def MakeDocSubject(request, id):
    doc = {
            'id': id,
            'type': request.type,
            "creationDate": request.adminMetadata.creationDate.strftime('%Y-%m-%d'), 
            "label": f'{MakeLabel(request.elementList)}' ,
            "isMemberOfMADSCollection": request.isMemberOfMADSCollection
        }
    if request.hasVariant:
        variants = list()
        for i in request.hasVariant:
            label = [j.elementValue.value for j in i.elementList]
            label = "--".join(label)
            variants.append(label)
        doc['variant'] = variants
    for k, v in request:
        if v and k not in ['type', 'adminMetadata', 'elementList', 'hasVariant', 'isMemberOfMADSCollection']:
                for i in v:
                        uri = {
                                'id': f"{id}/{k}#{i.value.split('/')[-1]}",
                                'uri': i.value, 
                                'label': i.label.value, 
                                'lang': i.label.lang}
                        doc[f'{k}'] = uri
    return doc