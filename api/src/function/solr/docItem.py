import pysolr 

#SOLR
solr = pysolr.Solr('http://localhost:8983/solr/collection/', timeout=10)

def DocItem(item, itemOf, id):

    instanceID = itemOf.uri.split("/")[-1]
    doc = {
        "id": id,
        "type": "Item",
        "heldBy": "Biblioteca do INPA",
        "cdd": item.cdd,
        "cutter": item.cutter,
        "year": item.year,
        "shelf": item.shelf, 
        "barcode": item.barcode,
        "itemOf": {'id': f"{id}/itemOf/{instanceID}",
                   'mainTitle': itemOf.label,
                   'uri': itemOf.uri}
        }
    instance = {
    'id': instanceID,
    'hasItem': {  "add": { 'id': f"{instanceID}/hasItem/{id}",
                          'uri': f"https://bibliokeia.com/resources/item/{id}",
                          'barcode': item.barcode }
    } }
    responseSolr = solr.add([doc, instance], commit=True)

    return responseSolr

def DeleteItemSolr(id):

    r = solr.search(q=f"id:{id}", fl="*,[child]")
    [doc] = r.docs
    itemOf = doc['itemOf']['id']
    instance = itemOf.split("/")[-1]
    hasItem = f"{instance}/hasItem/{id}"
    
    doc = {
    "id": instance,
    "hasItem": { "remove": { "id": hasItem} }
    }
    
    solr.delete(id=id, commit=True)
    solr.add([doc], commit=True)

