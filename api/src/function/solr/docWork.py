import pysolr 

#SOLR
solr = pysolr.Solr('http://localhost:8983/solr/acervo/', timeout=10)

def DocWork(request, work_id):

    doc = {
        "id": f"wk_{work_id}",
        "bibrame": "work",
        "contentType": request.contentType,
        "mainTitle": request.mainTitle,
        "contribution": request.contributionAgent,
        "language": request.language,
        "cdd": request.cdd,
        "cutter": request.cutter
        }

    subjects = list()
    for subject in request.subjects:
        subjects.append(subject.label)
    doc['subjects'] = subjects

    solr.add([doc], commit=True)
