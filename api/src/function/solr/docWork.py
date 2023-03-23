import pysolr 

#SOLR
solr = pysolr.Solr('http://localhost:8983/solr/acervo/', timeout=10)

def DocWork(request, work_id):

    doc = {
        "id": work_id,
        "type": "work",
        "content": request.content,
        "mainTitle": request.title.mainTitle,
        "subtitle": request.title.subtitle,
        "primaryContribution" : request.primaryContribution.label,
        "primaryContributionUri": request.primaryContribution.uri,
        "primaryContributionRole": request.primaryContribution.role,
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

def EditDocWork(request, work_id):
    doc = {"id": work_id}
    for k, v in request:
        if v:
            if k == 'subjects':
                subs = [i.label for i in v]
                doc[k] = {"set": subs}
            else:
                doc[k] = {"set": v}

                
    solr.add([doc], commit=True)

