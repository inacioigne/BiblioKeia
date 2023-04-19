from pyfuseki import FusekiUpdate

fuseki_authorities = FusekiUpdate('http://localhost:3030', 'authorities')

def ContributionOf(contributions, collection, id):

    contributionOf = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>

                    INSERT DATA
                        {{ GRAPH <{contribution}> {{ 
                            <{contribution}>  bf:contributionOf <https://bibliokeia.com/resources/{collection}/{id}> }} }} ; """
    for contribution in contributions:
        up = contributionOf.format(contribution=contribution.agent, collection=collection, id=id)
        response = fuseki_authorities.run_sparql(up)
        print(response.convert())