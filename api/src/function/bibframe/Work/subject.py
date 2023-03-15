from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
import pysolr 
from pyfuseki import FusekiUpdate, FusekiQuery

def UpdateSubject(subject, work_uri): 

    store = SPARQLUpdateStore(update_endpoint='http://localhost:3030/authorities/update')
    query_endpoint = 'http://localhost:3030/authorities/query'
    update_endpoint = 'http://localhost:3030/authorities/update'
    store.open((query_endpoint, update_endpoint))

    up = """PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>
                PREFIX bk: <https://bibliokeia.com/authorities/subjects/>
                INSERT DATA
                { GRAPH  <"""+str(subject.uri)+"""> { 
                    <"""+str(subject.uri)+">  bflc:subjectOf <"+str(work_uri)+"> } }"

    store.update(up)

    subjectID = subject.uri.split("/")[-1]

    solr = pysolr.Solr('http://localhost:8983/solr/authorities/', timeout=10)
    doc = {
        "id": subjectID,
        "subjectOf": {"add": [work_uri]}
     }
    solr.add([doc], commit=True)
    

def Subject(g, subject, work_uri, BF, MADSRDF):

    scheme = URIRef(subject['schema']) 

    BNsubject = BNode()
    g.add((work_uri, BF.subject, BNsubject))
    g.add((BNsubject, RDF.type, BF.Topic))
    if subject["type"] == "SimpleType":
        g.add((BNsubject, RDF.type, MADSRDF.Topic))
        g.add((BNsubject, RDFS.label, Literal(subject['label'])))
        g.add((BNsubject, MADSRDF.authoritativeLabel, Literal(subject['label'], lang=subject['lang'])))
        g.add((BNsubject, MADSRDF.isMemberOfMADSScheme, scheme))
    elif subject["type"] == "ComplexType":
        label = subject['label']
        subjects = label.split("--")
        g.add((BNsubject, RDF.type, MADSRDF.ComplexSubject))
        g.add((BNsubject, RDFS.label, Literal(label, lang=subject['lang'])))
        g.add((BNsubject, MADSRDF.authoritativeLabel, Literal(label, lang=subject['lang'])))
        g.add((BNsubject, MADSRDF.isMemberOfMADSScheme, scheme))
        BNlist1 = BNode()
        g.add((BNsubject, MADSRDF.componentList, BNlist1))
        BNtopic1 = BNode()
        g.add((BNlist1, RDF.first, BNtopic1))
        g.add((BNtopic1, RDF.type, MADSRDF.Topic))
        g.add((BNtopic1, MADSRDF.authoritativeLabel, Literal(subjects[0], lang=subject['lang'])))
        BNlist2 = BNode()
        BNtopic2 = BNode()
        g.add((BNlist1, RDF.rest, BNlist2))
        g.add((BNlist2, RDF.first, BNtopic2))
        g.add((BNtopic2, RDF.type, MADSRDF.Topic))
        g.add((BNtopic2, MADSRDF.authoritativeLabel, Literal(subjects[1], lang=subject['lang'])))
        g.add((BNlist2, RDF.rest, RDF.nil))


    return g

def EditSubject(subject, bkID):
    acervoUpdate = FusekiUpdate('http://localhost:3030', 'acervo')
    acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')

    prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"""

    askSubject = prefix+"ASK { graph work:"+bkID+"""
                    {work:"""+bkID+""" bf:subject <"""+subject.uri+"> . }}"
    response = acervoQuery.run_sparql(askSubject)
    response = response.convert()
    if not response['boolean']:
        pass



