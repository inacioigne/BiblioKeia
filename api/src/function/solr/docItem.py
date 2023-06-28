import pysolr 

#SOLR
solr = pysolr.Solr('http://localhost:8983/solr/acervo/', timeout=10)

def DocItem(item, itemOf):

    instanceID = itemOf.uri.split("/")[-1]

    doc = {
        "id": "1",
        "type": "Item",
        "heldBy": "Biblioteca do INPA",
        "call": item.call,
        "shelf": item.shelf, 
        "barcode": item.barcode,
        "itemOf": {'id': f"1/itemOf/{instanceID}",
                   'mainTitle': itemOf.label,
                   'uri': itemOf.uri}
        }
    
    instance = {
    'id': instanceID,
    'hasItem': {  "add": { 'id': f"{instanceID}/hasItem/i",
                          'uri': "url",
                          'barcode': "barcode"    }
    } }

    responseSolr = solr.add([doc, instance], commit=True)
    return responseSolr