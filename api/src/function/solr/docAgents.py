import httpx

# from src.function.authorities.makeLabel import MakeLabel


def GetImagem(uri):
    id = uri.split('/')[-1]

    url = 'https://www.wikidata.org/w/api.php'
    params = {
                'action': 'wbgetentities',
                'ids': id,
                'props': 'claims',
                'languages': 'pt',
                'format': 'json'
            }
    response = httpx.get(url, params=params) 
    response = response.json()
    if response.get('error'):
        return False
    else:
        # file = response['entities'][id]['claims']['P18'][0]['mainsnak']['datavalue']['value']
        file = response['entities'][id]['claims'].get('P18')
        if file:
            img = file[0]['mainsnak']['datavalue']['value']
            imagem = f'http://commons.wikimedia.org/wiki/Special:FilePath/{img}'
            return imagem
        else:
            return False
        
def MakeDocAgents(request, id):

    doc = { 
            'id': id,
            'type': request.type,
            "creationDate": request.adminMetadata.creationDate.strftime('%Y-%m-%d'), 
            # "label": f'{MakeLabel(request.elementList)}' ,
            "authority": request.authoritativeLabel,
            "isMemberOfMADSCollection": request.isMemberOfMADSCollection
        }
    
    if request.fullerName:
        doc['fullerName'] = request.fullerName.elementValue.value
    if request.birthDate:
        doc['birthDate'] = request.birthDate
    if request.birthPlace:
        doc['birthPlace'] = request.birthPlace
    if request.deathDate:
        doc['deathDate'] = request.deathDate
    
    # hasAffiliation  
    if request.hasAffiliation:
        affiliations = list()
        for i in request.hasAffiliation:

            a = {
                'id': f"{id}/hasAffiliation#{i.organization.value.split('/')[-1]}",
                'organization': i.organization.label,
                'affiliationStart': i.affiliationStart,
            }
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
                    'id': f"{id}/hasCloseExternalAuthority#{i.value.split('/')[-1]}",
                    'uri': i.value, 
                    'label': i.label, 
                    'base': i.base }
            uris.append(uri)
            if i.base == 'www.wikidata.org':
                imagem = GetImagem(i.value)
                if imagem:
                    doc['imagem'] = imagem
        doc['hasCloseExternalAuthority'] = uris

    # Occupation
    if request.occupation:
        occupations = list()
        for i in request.occupation:
            uri = {
                    'id': f"{id}/occupation#{i.value.split('/')[-1]}",
                    'uri': i.value, 
                    'label': i.label, 
                    'base': i.base }
            occupations.append(uri)
        doc['hasOccupation'] = occupations
        doc['occupation']  = [i['label'] for i in occupations]


    # fieldOfActivity
    if request.fieldOfActivity:
        fields = list()
        for i in request.fieldOfActivity:
            uri = {
                    'id': f"{id}/fieldOfActivity#{i.value.split('/')[-1]}",
                    'uri': i.value, 
                    'label': i.label, 
                    'base': i.base }
            fields.append(uri)
        doc['fieldOfActivity'] = fields

    return doc
