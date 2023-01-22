import pysolr 

#SOLR
solr = pysolr.Solr('http://localhost:8983/solr/acervo/', timeout=10)

def DocInstance(request, instance_id):

    doc = {
        "id": instance_id,
        "instanceOf": request.instanceOf,
        "bibrame": "instance",
        "contentType": request.type,
        "mainTitle": request.mainTitle,
        "subtitle": request.subtitle,
        "extent": request.extent,
        "publication": request.publication,
        "edition": request.edition,
        "place": request.place,
        "date": request.date,
        "responsibility": request.responsibility,
        "series": request.series
        }
    
    work = {
        "id": request.instanceOf,
         "hasInstance": {"add": [instance_id]}
    }

    solr.add([doc, work], commit=True)