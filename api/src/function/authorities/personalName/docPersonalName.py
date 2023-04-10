
def MakeDocPersonalName(request):

    doc = request.dict()
    doc['uri'] = f'https://bibliokeia.com/authorities/name/{request.id}'

    
    if request.hasVariant:
        variant = [i.value for i in request.hasVariant]
        doc['hasVariant'] = variant
    if request.hasAffiliation:
        affiliation = [ i.organization for i in request.hasAffiliation]
        doc['hasAffiliation'] = affiliation


    return doc