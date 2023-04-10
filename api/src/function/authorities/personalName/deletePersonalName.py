def DeleteGraphPersonalName(id):
    name = """PREFIX name: <https://bibliokeia.com/authorities/name/>
            PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            
            WITH name:{}
            DELETE {{ ?s ?p ?o  }}
            WHERE {{ ?s ?p ?o  }}"""


    deleteName = name.format(id)
    
    return deleteName