from src.routes.translate.makeTranslate import MakeTranslate

def Note(graph, authority, obj):

    qNote = f"""PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
  SELECT ?note WHERE {{ 
      <{authority}> madsrdf:note ?note .
       }}"""
    
    translator = MakeTranslate(
            source_language='en',
            target_language='pt',
            timeout=10
        )
    
    r = graph.query(qNote)
    if len(r.bindings) > 0:
        value = translator.translate(r.bindings[0].get('note').value)
        
        obj['note'] = value
    return obj