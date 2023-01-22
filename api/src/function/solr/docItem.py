import pysolr 

#SOLR
solr = pysolr.Solr('http://localhost:8983/solr/acervo/', timeout=10)

def DocItem(item, instance_id):

    doc = {
        "id": item.item,
        "bibrame": "item",
        "library": item.library,
        "call": item.call,
        "shelf": item.shelf,
        "itemOf": instance_id
        }
    
    instance = { 
        "id": instance_id,
         "hasItem": {"add": [item.item]}
    }

    solr.add([doc, instance], commit=True)