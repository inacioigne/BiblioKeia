def DeleteGraph(id):
    topic = """PREFIX topic: <https://bibliokeia.com/authorities/topic/>
            PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            
            WITH topic:{id}
            DELETE {{ ?s ?p ?o  }}
            WHERE {{ ?s ?p ?o  }}"""


    upTopic = topic.format(id="sh85017405")
    
    return upTopic