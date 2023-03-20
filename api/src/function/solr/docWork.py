import pysolr 

#SOLR
solr = pysolr.Solr('http://localhost:8983/solr/acervo/', timeout=10)

def DocWork(request, work_id):

    doc = {
        "id": work_id,
        "type": "work",
        "content": request.content,
        "mainTitle": request.mainTitle,
        "subtitle": request.subtitle,
        "primaryContributionAgent" : request.primaryContributionAgent,
        "primaryContributionUri": request.primaryContributionUri,
        "primaryContributionRole": request.primaryContributionRole,
        "language": request.language,
        "cdd": request.cdd,
        "cutter": request.cutter,
        "hasSeries": request.serie
        }  

    subjects = list()
    for subject in request.subjects:
        subjects.append(subject.label)
    doc['subjects'] = subjects

    solr.add([doc], commit=True)

