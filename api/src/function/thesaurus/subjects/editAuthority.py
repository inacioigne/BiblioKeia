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

def EditAuthority(authority, subject_id):
  
    upLabel = prefix+"WITH subjects:"+subject_id+"""
                DELETE { subjects:"""+subject_id+""" madsrdf:authoritativeLabel ?o }
                INSERT { subjects:"""+subject_id+""" madsrdf:authoritativeLabel '"""+authority.value+"'@"+authority.lang+"""  }
                WHERE { subjects:"""+subject_id+""" madsrdf:authoritativeLabel ?o }"""
    response = fuseki_update.run_sparql(upLabel)
    
    upValue = prefix+"WITH subjects:"+subject_id+"""
            DELETE { subjects:"""+subject_id+""" madsrdf:elementList ?o .
                        ?o rdf:rest rdf:nil . 
                         ?o rdf:first ?e . 
                         ?e rdf:type madsrdf:TopicElement .
                         ?e madsrdf:elementValue ?elementValue
                        }
            INSERT { subjects:sh85002507 madsrdf:elementList ?o .
                    ?o rdf:rest rdf:nil .
                    ?o rdf:first ?e .
                    ?e rdf:type madsrdf:TopicElement .
                    ?e madsrdf:elementValue '"""+authority.value+"'@"+authority.lang+""" }
            WHERE { subjects:"""+subject_id+""" madsrdf:elementList ?o .
                        ?o rdf:rest rdf:nil . 
                         ?o rdf:first ?e . 
                         ?e rdf:type madsrdf:TopicElement .
                         ?e madsrdf:elementValue ?elementValue }"""
    response = fuseki_update.run_sparql(upValue)
    response.convert()
    