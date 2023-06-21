from rdflib import URIRef, Namespace, BNode, RDFS

bf = Namespace("http://id.loc.gov/ontologies/bibframe/")

def GetProvisionActivity(graph, uri, obj):

    u = URIRef(uri)

    # provisionActivitys = list() 
    r = graph.triples((u, bf.provisionActivity, None))
    for _, p, o in r:
        provisionActivity = graph.triples((o, None, None))
        objPA = {}
        for s, p, o in provisionActivity:
            if p == bf.agent:
                if isinstance(o, BNode):
                    agent = graph.triples((o, RDFS.label, None))
                    for _, _, label in agent:
                        objPA['agent'] = label.value
            elif p == bf.date:
                objPA['date'] = o.n3().split("^^")[0] #o.value #
            elif p == bf.place:
                place = graph.triples((o, RDFS.label, None))
                for _, _, label in place:
                    objPA['place'] = label.value
        break
        # provisionActivitys.append(objPA)
    obj['provisionActivity'] = objPA
    
    return obj