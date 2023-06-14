from pyfuseki import FusekiUpdate
from src.schemas.settings import Settings
import pysolr  

settings = Settings()

authorityUpdate = FusekiUpdate(f'{settings.url}:3030', 'authority')
#SOLR
solr = pysolr.Solr(f'{settings.url}:8983/solr/authorities/', timeout=10)

def ContributionOf(request, collection, id):

    contributionOf = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>

                    INSERT DATA
                        {{ GRAPH <{contribution}> {{ 
                            <{contribution}>  bf:contributionOf <https://bibliokeia.com/resources/{collection}/{id}> }} }} ; """
    for contribution in request.contribution:
        # Jena
        up = contributionOf.format(contribution=contribution.agent, collection=collection, id=id)
        response = authorityUpdate.run_sparql(up)
        print(response.convert())

        # Solr
        cID = contribution.agent.split('/')[-1]
        doc = {
        "id": cID,
        "contributionOf": { "add" : {
            "id": f"{cID}/contributionOf/{id}",
            'label': request.title.mainTitle,
            'uri': f'https://bibliokeia.com/resources/{collection}/{id}'
        } }} 
        responseSolr =  solr.add([doc], commit=True)
        print("UP SOLR:", responseSolr)
