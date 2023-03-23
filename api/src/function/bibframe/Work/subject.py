from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore
import pysolr 
from pyfuseki import FusekiUpdate, FusekiQuery

acervoUpdate = FusekiUpdate('http://localhost:3030', 'acervo')
acervoQuery = FusekiQuery('http://localhost:3030', 'acervo')
authorityQuery = FusekiQuery('http://localhost:3030', 'authorities')

prefix = """PREFIX work: <https://bibliokeia.com/resources/work/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX subjects: <https://bibliokeia.com/authorities/subjects/>
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>"""

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

def EditSubject(subjects, bkID):

    responses = list()
    listSubjects = list()

    

    for subject in subjects:
        s = f" bf:subject <{subject.uri}> "
        listSubjects.append(s)

    sub = "; ".join(listSubjects)
    up = prefix+"WITH work:"+bkID+"""
                DELETE {work:"""+bkID+""" bf:subject ?o }
                INSERT {work:"""+bkID+sub+""" }
                WHERE {work:"""+bkID+""" bf:subject ?o }"""
    acervoUpdate.run_sparql(up)

def GetSubject(bkID, bkDict):

    query = "SELECT * WHERE { graph work:"+bkID+""" {
  work:"""+bkID+"""  bf:subject ?subject } }"""

    querySubject = prefix+query
    response = acervoQuery.run_sparql(querySubject)
    response = response.convert()
    bindings = response['results']['bindings']
    subjects = list()
    for i in bindings:
        subjectID = i['subject']['value'].split("/")[-1]
        query = """SELECT * WHERE { graph subjects:"""+subjectID+""" {
        subjects:"""+subjectID+""" madsrdf:authoritativeLabel ?label .
        subjects:"""+subjectID+""" rdf:type ?type .
        FILTER(?type != madsrdf:Authority)
    } }"""
        querySubject = prefix+query
        response = authorityQuery.run_sparql(querySubject)
        response = response.convert()
        [response] = response['results']['bindings']
        label = response['label']['value']
        tipo = response['type']['value'].split("#")[-1]
        s = {"label": label, "type": tipo,
            "uri": f"https://bibliokeia.com/authorities/subjects/{subjectID}"}

        subjects.append(s)
    bkDict["subjects"] = subjects

    return bkDict
    



