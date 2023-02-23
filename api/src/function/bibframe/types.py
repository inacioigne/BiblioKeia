
from rdflib import Namespace
from pyfuseki import FusekiUpdate, FusekiQuery

BF = Namespace("http://id.loc.gov/ontologies/bibframe/")

TypeBF =  {
    "Texto": BF.Text,
    "Series": BF.Series
}

def EditType(contentType, work_id):

    acervoUpdate = FusekiUpdate('http://localhost:3030', 'acervo')
    acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')

    prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
                PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"""
    where = "{work:"+work_id+" rdf:type ?o}"
                
    select = prefix+"SELECT * { graph work:bk-2 {work:"+work_id+" rdf:type ?o} }"

    response = acervoQuery.run_sparql(select)
    response = response.convert()
    bindings = response['results']['bindings']

    for binding in bindings:
        uri = binding['o']['value']
        content = uri.split("/")[-1]
        if content != 'Work' and content != contentType:
            where = "{ work:"+work_id+" rdf:type bf:"+content+" }"
            up = prefix+"WITH work:"+work_id+"""
            DELETE """+where+"""
            INSERT { work:"""+work_id+" rdf:type bf:"+contentType+""" }
            WHERE """+where
            acervoUpdate.run_sparql(up)