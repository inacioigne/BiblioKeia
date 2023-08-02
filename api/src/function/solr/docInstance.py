import pysolr 

#SOLR
solr = pysolr.Solr('http://localhost:8983/solr/collection/', timeout=10)

def DocInstance(request, id):

    workID = request.instanceOf.uri.split("/")[-1]
    uri = f'https://bibliokeia.com/resources/instance/{id}'

    doc = {
        "id": id,
        "type": request.type,
        "mainTitle": request.title.mainTitle,
        "subtitle": request.title.subtitle,
        "carrier": [i.label for i in request.carrier],
        "dimensions": request.dimensions,
        "extent": request.extent.label if request.extent else None,
        "issuance": [i.label for i in request.issuance],
        "media": [i.label for i in request.media],
        "provisionActivityAgent": request.provisionActivity.agent,
        "provisionActivityDate": request.provisionActivity.date,
        "provisionActivityPlace": request.provisionActivity.place,      
        "serie": request.seriesStatement,
        "instanceOf": {'id': f'{id}/instanceOf/{workID}', 'uri': request.instanceOf.uri, 'label': request.instanceOf.label} 
        }
    
    work = {
        "id": workID,
         "hasInstance": {"add": {'id': f'{workID}/hasInstance/{id}', 'uri': uri, 'label': request.title.mainTitle} }
    }
    # print("hasInstance", work)

    response = solr.add([doc, work], commit=True)
    return response

def DeleteInstanceSolr(id):

    r = solr.search(q=f"id:{id}", fl="*,[child]")
    [doc] = r.docs
    instanceOf = doc['instanceOf']['id']
    work = instanceOf.split("/")[-1]
    hasInstance = f"{work}/hasInstance/{id}" 
    doc = {
    "id": work,
    "hasInstance": { "remove": { "id": hasInstance} } }
    
    solr.delete(id=id, commit=True)
    solr.add([doc], commit=True)