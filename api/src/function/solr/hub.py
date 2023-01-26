import pysolr 

#SOLR
solr = pysolr.Solr('http://localhost:8983/solr/acervo/', timeout=10)

def DocSerie(request, resourceID):

    doc = {
        "id": resourceID,
        "bfType": "Series",
        "mainTitle": request.mainTitle,
        "subtitle": request.subtitle,
        "contributionID" : request.contributionID,
        "contribution": request.contributionAgent,
        "cdd": request.cdd,
        "issn": request.issn
        }
        
    solr.add([doc], commit=True)