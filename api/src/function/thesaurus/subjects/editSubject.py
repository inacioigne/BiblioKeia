from pyfuseki import FusekiUpdate


fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')

prefix = """PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX work: <https://bibliokeia.com/resources/work/>
PREFIX subjects: <https://bibliokeia.com/authorities/subjects/>
PREFIX names: <https://bibliokeia.com/authorities/names/>
PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>"""



def EditSuject(request, subject_id):

    query = "WITH subjects:"+subject_id+"""
            DELETE { subjects:"""+subject_id+""" madsrdf:authoritativeLabel ?o }
            INSERT { subjects:"""+subject_id+""" madsrdf:authoritativeLabel 'Sistemas Agroflorestais'@pt  }
            WHERE { subjects:"""+subject_id+""" madsrdf:authoritativeLabel ?o }"""

    pass