from pyfuseki import FusekiUpdate
from src.function.thesaurus.subjects.editAuthority import EditAuthority

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
    
    for k, v in request:
        if v:
             if k == 'authority':
                 EditAuthority(v, subject_id)
                 