from pyfuseki import FusekiUpdate

fuseki_authorities = FusekiUpdate('http://localhost:3030', 'authorities')

def SubjectOf(sujects, collection, id):

    subjectOf = """PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>

                    INSERT DATA
                        {{ GRAPH <{subject}> {{ 
                            <{subject}>  bf:subjectOf <https://bibliokeia.com/resources/{collection}/{id}> }} }} ; """
    for suject in sujects:
        up = subjectOf.format(subject=suject.value, collection=collection, id=id)
        response = fuseki_authorities.run_sparql(up)
        print(response.convert())