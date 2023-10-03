import httpx


        
def MakeDocAgents(request, id):
    authority = request.elementList[0].elementValue.value
    authority = authority.removesuffix(',')

    doc = { 
            'id': id,
            'type': request.type,
            "creationDate": request.adminMetadata.creationDate.strftime('%Y-%m-%d'), 
            "label": request.authoritativeLabel,
            "authority": authority,
            "isMemberOfMADSCollection": "https://bibliokeia.com/authority"
        }
    if request.identifiersLccn:
        doc['identifiersLccn'] = request.identifiersLccn
        
    if request.imagem:
        doc['imagem'] = request.imagem

    if request.adminMetadata.changeDate:
        doc['changeDate'] = request.adminMetadata.changeDate.strftime("%Y-%m-%dT%H:%M:%S")
    
    if request.fullerName:
        doc['fullerName'] = request.fullerName.elementValue.value
    
    metadados = ['birthDayDate', 'birthMonthDate','birthYearDate', 'birthDate', 'birthPlace', 'deathDate', 'deathPlace',
                 'deathDayDate', 'deathMonthDate', 'deathYearDate']
    for metadado in metadados:
        value = request.model_dump().get(metadado)
        if value:
            doc[metadado] = value
    
    # hasAffiliation  
    if request.hasAffiliation:
        affiliations = list()
        for i in request.hasAffiliation:
            if i.organization.uri:
                a = {
                'id': f"{id}/hasAffiliation#{i.organization.uri.split('/')[-1]}",
                'organization': i.organization.label,
                'uri': i.organization.uri,
                'affiliationStart': i.affiliationStart }
            else:
                a = {
                'id': f"{id}/hasAffiliation#{i.organization.label}",
                'organization': i.organization.label,
                'affiliationStart': i.affiliationStart }

            if i.affiliationEnd:
                a['affiliationEnd'] = i.affiliationEnd
            affiliations.append(a)
        doc['hasAffiliation'] = affiliations
        doc['affiliation']  = [i['organization'] for i in affiliations]

    # hasVariant
    if request.hasVariant:
        variants = list()
        for i in request.hasVariant:
            label = [j.elementValue.value for j in i.elementList]
            label = " ".join(label)
            variants.append(label)
        doc['variant'] = variants

    # hasCloseExternalAuthority
    if request.hasCloseExternalAuthority:
        uris = list()
        for i in request.hasCloseExternalAuthority:
            uri = {
                    'id': f"{id}/hasCloseExternalAuthority#{i.uri.split('/')[-1]}",
                    'uri': i.uri, 
                    'label': i.label, 
                    'base': i.base }
            uris.append(uri)
        doc['hasCloseExternalAuthority'] = uris

    # Occupation
    if request.occupation:
        occupations = list()
        for i in request.occupation:
            if i.uri:
                uri = {
                    'id': f"{id}/occupation#{i.uri.split('/')[-1]}",
                    'label': i.label,
                    'uri': i.uri,
                    'base': i.base }
            else:
                uri = {
                    'id': f"{id}/occupation#{i.label}",
                    'label': i.label,
                    'base': i.base }

            occupations.append(uri)
        doc['occupation'] = occupations
        doc['occupationLabels']  = [i['label'] for i in occupations]

    # fieldOfActivity
    if request.fieldOfActivity:
        fields = list()
        for i in request.fieldOfActivity:
            uri = {
                    'id': f"{id}/fieldOfActivity#{i.uri.split('/')[-1]}",
                    'uri': i.uri, 
                    'label': i.label, 
                    'base': i.base }
            fields.append(uri)
        doc['fieldOfActivity'] = fields

    # identifiesRWO
    if request.identifiesRWO:
        fields = list()
        for i in request.identifiesRWO:
            identifier = i.split("/")
            uri = {
                    'id': f"{id}/identifiesRWO#{identifier[-1]}",
                    'uri': i, 
                    'label': i, 
                    'base': identifier[2]}
            fields.append(uri)
        doc['identifiesRWO'] = fields

    return doc
