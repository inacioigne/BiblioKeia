from pyfuseki import FusekiUpdate
from src.schemas.settings import Settings
import pysolr  

settings = Settings()

authorityUpdate = FusekiUpdate(f'{settings.url}:3030', 'authority')
#SOLR
solr = pysolr.Solr(f'{settings.url}:8983/solr/authorities/', timeout=10)

def SubjectOf(request, collection, id):

    subjectOf = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>

                    INSERT DATA
                        {{ GRAPH <{subject}> {{ 
                            <{subject}>  bf:subjectOf <https://bibliokeia.com/resources/{collection}/{id}> }} }} ; """
 
    for subject in request.subject:
        # Jena
        up = subjectOf.format(subject=subject.uri, collection=collection, id=id)
        response = authorityUpdate.run_sparql(up)
        print("UP JENA:", response.convert())

        # Solr
        sID = subject.uri.split('/')[-1]
        doc = {
        "id": sID,
        "subjectOf": { "add" : {
            "id": f"{sID}/subjectOf/{id}",
            'label': request.title.mainTitle,
            'uri': f'https://bibliokeia.com/resources/{collection}/{id}'
        } }}    
    
        responseSolr =  solr.add([doc], commit=True)
        print("UP SOLR:", responseSolr)


        