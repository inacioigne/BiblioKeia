
from rdflib.plugins.sparql import prepareQuery
from rdflib import Graph
from urllib.error import HTTPError
import httpx

def GetLabelLoc(uri):
    url = uri.replace('http', 'https')
    g = Graph()
    try:
        g.parse(f'{url}.madsrdf.nt', format='nt')
    except HTTPError as e:
        return uri

    q = f"""
    SELECT ?label WHERE {{
        <{uri}> madsrdf:authoritativeLabel ?label }}"""
    query = prepareQuery(q, initNs={"madsrdf": "http://www.loc.gov/mads/rdf/v1#"})
    [label] = [result.label.value for result in g.query(query)]
    return label

def Wkidata(id, uri, parent):
    url = 'https://www.wikidata.org/w/api.php'
    params = {
            'action': 'wbgetentities',
            'ids': id,
            'props': 'claims|labels',
            'languages': 'pt',
            'format': 'json'
        }
    response = httpx.get(url, params=params)
    response = response.json()
    if response.get('error'):
        return 'Wikidata'
    else:
        label = response['entities'][id]['labels']['pt']['value']
        file = response['entities'][id]['claims']['P18'][0]['mainsnak']['datavalue']['value']
        file = file.replace(" ", "_")
        image = f'http://commons.wikimedia.org/wiki/Special:FilePath/{file}'
        
        closeExternal = {
            'id': f'{parent}!{id}',
            'collection': 'wikidata',
            'label': label,
            'uri': uri,
            'image': image
            }

        return closeExternal

def Worldcat(id, uri, parent):
    g = Graph()
    try:
        g.parse(f'http://id.worldcat.org/fast/{id}.rdf.xml', format='xml')
    except HTTPError as e:
        return 'WorldCat'
    q = f"""
    SELECT ?label WHERE {{
        <http://id.worldcat.org/fast/{id}> skos:prefLabel ?label }}"""

    query = prepareQuery(q, initNs={"skos": "http://www.w3.org/2004/02/skos/core#"})
    [label] = [result.label.value for result in g.query(query)]

    closeExternal = {
    'id': f'{parent}!{id}',
    'collection': 'worldcat',
    'label': label,
    'uri': uri
    }

    return closeExternal
    
def MakeDocPersonalName(request):

    doc = request.dict()
    doc['uri'] = f'https://bibliokeia.com/authorities/name/{request.id}'

    
    if request.hasVariant:
        variant = [i.value for i in request.hasVariant]
        doc['hasVariant'] = variant

    if request.hasCloseExternalAuthority:
        hasCloseExternalAuthority = list()
        for uri in request.hasCloseExternalAuthority:
            collection = uri.split('.')[1]
            id = uri.split('/')[-1]

            if collection == 'worldcat':
                closeExternal = Worldcat(id, uri, request.id)
                hasCloseExternalAuthority.append(closeExternal)

            elif collection == 'wikidata':
                closeExternal = Wkidata(id, uri, request.id)
                hasCloseExternalAuthority.append(closeExternal)
        doc['hasCloseExternalAuthority'] = hasCloseExternalAuthority
 
    if request.hasAffiliation:
        hasAffiliation = list()
        for i in request.hasAffiliation:
            label = GetLabelLoc(i.organization)
            id = i.organization.split('/')[-1]
            affilation = {
                'id': f'{request.id}!{id}',
                'uri': i.organization,
                'label': label,
                'start': i.affiliationStart,
                'end': i.affiliationEnd            
            }
            hasAffiliation.append(affilation)
        doc['hasAffiliation'] = hasAffiliation
    
    if request.occupation:
        occupations = list()
        for i in request.occupation:
            id = i.split('/')[-1]
            label = GetLabelLoc(i)
            occupation = {
                'id': f'{request.id}!{id}',
                'uri': i,
                'collection': 'loc',
                'label': label
            }
            occupations.append(occupation)
        doc['occupation'] = occupations
        



        
            
    
    


    return doc