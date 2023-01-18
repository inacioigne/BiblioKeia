from rdflib import URIRef

def InstanceOf(g, request, instance_uri, BF):

    work = URIRef(f'https://bibliokeia.com/bibframe/work/{request.instanceOf}')
    g.add((instance_uri, BF.instanceOf, work))

    return g
