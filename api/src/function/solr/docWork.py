import pysolr  

#SOLR
solr = pysolr.Solr('http://localhost:8983/solr/acervo/', timeout=10)

def PostSolr(request, id):
    pass
    

def DocWork(request, id):

    doc = {
        "id": id,
        "type": request.type,
        "content": [i.label for i in request.content],
        "mainTitle": request.title.mainTitle,
        'language': [i.label for i in request.language],
        "subtitle": request.title.subtitle,
        "cdd": request.classification.classificationPortion,
        "note": request.note,
        "summary": request.summary,
        "tableOfContents": request.tableOfContents,
        "supplementaryContent": [i.label for i in request.supplementaryContent] if request.supplementaryContent else None,
        "illustrativeContent": [i.label for i in request.illustrativeContent] if request.illustrativeContent else None,
        "intendedAudience": [i.label for i in request.intendedAudience] if request.intendedAudience else None,
        "geographicCoverage": [i.label for i in request.geographicCoverage] if request.geographicCoverage else None,

        }
    # contribution
    if request.contribution:
        contributions = list()
        for i in request.contribution:
            c = { "id": f"{id}/contribution/{i.agent.split('/')[-1]}",
                "type": [i.split('/')[-1] for i in i.type],
                "agent": i.agent,
                "label": i.label,
                "role": i.role } 
            contributions.append(c)
        doc['contribution'] = contributions   
        
    # subject
    if request.subject:
        subjects = list()
        for i in request.subject:
            s = { "id": f"{id}/subject/{i.uri.split('/')[-1]}",
                    "type": [i.split('/')[-1] for i in i.type],
                    "uri": i.uri,
                    "label": i.label} 
            subjects.append(s)
        doc['subject'] = subjects

    if request.genreForm:
        pass

    responseSolr =  solr.add([doc], commit=True)

    return responseSolr 

    

def EditDocWork(request, work_id):
    doc = {"id": work_id}
    for k, v in request:
        if v:
            if k == 'subjects':
                subs = [i.label for i in v]
                doc[k] = {"set": subs}
            elif k == 'primaryContribution':
                doc['primaryContribution'] = {"set": v.label}
                doc['primaryContributionUri'] = {"set": v.uri}
                doc['primaryContributionRole'] = {"set": v.role}
            else:
                doc[k] = {"set": v}

                
    solr.add([doc], commit=True)

