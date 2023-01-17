import pysolr 

#SOLR
solr = pysolr.Solr('http://localhost:8983/solr/acervo/', timeout=10)

def DocInstance(request):

    doc = {
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
        "id": f"wk_{request.instanceOf}",
         "hasInstance": {"add": [f"in_{request.instanceOf}"]}
    }

    solr.add([doc, work], commit=True)