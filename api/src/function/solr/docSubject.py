from src.schemas.authorities.subject import UriDelete
from src.function.authorities.makeLabel import ComponentLabel
from src.function.authorities.subject.uri import UpdateDeleteUri
from pysolr import Solr

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
    nMeta = ['type', 'adminMetadata', 'elementList', 'hasVariant', 'note', 'isMemberOfMADSCollection']
    doc = {
            'id': id,
            'type': request.type,
            "creationDate": request.adminMetadata.creationDate.strftime('%Y-%m-%d'), 
            "label": f'{MakeLabel(request.elementList)}' ,
            "isMemberOfMADSCollection": request.isMemberOfMADSCollection
        }
    if request.note:
        doc['note'] = request.note
    if request.hasVariant:
        variants = list()
        for i in request.hasVariant:
            label = [j.elementValue.value for j in i.elementList]
            label = "--".join(label)
            variants.append(label)
        doc['variant'] = variants
    for k, v in request:
        if v and k not in nMeta:
                uris = list()
                for i in v:
                        uri = {
                                'id': f"{id}/{k}#{i.value.split('/')[-1]}",
                                'uri': i.value, 
                                'label': i.label.value, 
                                'lang': i.label.lang,
                                'base': i.base
                                }
                        uris.append(uri)
                doc[f'{k}'] = uris
    return doc

def DeleteDoc(uriID): 
    solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)
    # uriID = uri.split("/")[-1]
    r = solr.search(q=f'id:{uriID}', **{'fl': '*,[child]'})

    nMeta = ["id",
    "type",
    "creationDate",
    "label",
    "isMemberOfMADSCollection",
    "note",
    "variant",
    "imagem",
     "birthDate",
    "_version_"]
    ids = [uriID]
    [doc] = r.docs
    for k, v in doc.items():
        if k not in nMeta:
            if type(v) == list:
                for i in v:
                    ids.append(i['id'])
            else:
                ids.append(v['id'])
    responseSolr = solr.delete(id=ids, commit=True)

    return responseSolr

def UpdateDelete(doc, response, uri):
    if doc.get('hasBroaderAuthority'):
        if type(doc.get('hasBroaderAuthority')) == list:
            for i in doc.get('hasBroaderAuthority'):
                request = {'authority': uri, 
                        'uri': i['uri'], 
                        'type': 'hasNarrowerAuthority' }
                request = UriDelete(**request)
                resposneUpdate = UpdateDeleteUri(request, "hasNarrowerAuthority")
                response.update(resposneUpdate)
        else:
            [delUri] = doc.get('hasBroaderAuthority')['uri']
            request = {'authority': uri, 
                        'uri': delUri, 
                        'type': 'hasNarrowerAuthority' }
            request = UriDelete(**request)
            resposneUpdate = UpdateDeleteUri(request, "hasNarrowerAuthority")
            response.update(resposneUpdate)

    if doc.get('hasNarrowerAuthority'):
        if type(doc.get('hasNarrowerAuthority')) == list:
            for i in doc.get('hasNarrowerAuthority'):
                request = {'authority': uri, 
                        'uri': i['uri'], 
                        'type': 'hasBroaderAuthority' }
                request = UriDelete(**request)
                resposneUpdate = UpdateDeleteUri(request, "hasBroaderAuthority")
                response.update(resposneUpdate)
        else:
            [delUri] = doc.get('hasNarrowerAuthority')['uri']
            request = {'authority': uri, 
                        'uri':delUri, 
                        'type': 'hasBroaderAuthority' }
            request = UriDelete(**request)
            resposneUpdate = UpdateDeleteUri(request, "hasBroaderAuthority")
            response.update(resposneUpdate)

    if doc.get('hasReciprocalAuthority'):
        if type(doc.get('hasReciprocalAuthority')) == list:
            for i in doc.get('hasReciprocalAuthority'):
                request = {'authority': uri, 
                        'uri': i['uri'], 
                        'type': 'hasReciprocalAuthority' }
                request = UriDelete(**request)
                resposneUpdate = UpdateDeleteUri(request, "hasReciprocalAuthority")
                response.update(resposneUpdate)
        else:
            [delUri] = doc.get('hasReciprocalAuthority')['uri']
            request = {'authority': uri, 
                        'uri': delUri, 
                        'type': 'hasReciprocalAuthority' }
            request = UriDelete(**request)
            resposneUpdate = UpdateDeleteUri(request, "hasReciprocalAuthority")
            response.update(resposneUpdate)

    return response