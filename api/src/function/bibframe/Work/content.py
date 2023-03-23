from rdflib.namespace import RDF

def Content(g, content, BF, work_uri):
    contentDict = {
        "Texto": BF.Text,
        "Text": BF.Text
    }
    contentType =  contentDict[content]

    g.add((work_uri, RDF.type, contentType))
    g.add((work_uri, RDF.type, BF.Work)) 

    return g
