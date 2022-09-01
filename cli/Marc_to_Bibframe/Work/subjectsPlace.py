from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def SubjectsPlace(g, BFwork, uri, count, workMarc, BF, MADSRDF, RDFS):

    def FirstRest(g, node, assunto, first, rest):
        topico = BNode()
        g.add((node.get(first), RDF.first, topico))
        g.add((topico, RDF.type, MADSRDF.Topic))
        g.add((topico, MADSRDF.authoritativeLabel, Literal(assunto)))
        g.add((node.get(first), RDF.rest, node.get(rest)))
        return g

    for s in workMarc.SubjectsPlace():
        index = workMarc.SubjectsPlace().index(s) + 1
        topic = URIRef(f"http://{uri}/{count}/Topic651-{index}")
        g.add((BFwork, BF.subject, topic))

        g.add((topic, RDF.type, BF.Place))
        if len(s.get('sub').keys()) > 1:
            node = { 
                'a': BNode(),
                'v': BNode(),
                'z': BNode(), 
                'x': BNode(), 
                'y': BNode() }
            assuntos = list(s.get('sub').items())
            g.add((topic, MADSRDF.componentList, node.get('a')))
            for assunto in assuntos:
                index = assuntos.index(assunto)+1
                if index != len(assuntos):
                    g = FirstRest(g, node, assunto[1], assunto[0], assuntos[index][0])
                    #print(assunto[0], assuntos[index][0])  
                else:
                    lastTopic = BNode()
                    g.add((node.get(assunto[0]), RDF.first, lastTopic))
                    if assunto[0] == 'v':
                        g.add((lastTopic, RDF.type, MADSRDF.GenreForm))
                    elif assunto[0] == 'z':
                        g.add((lastTopic, RDF.type, MADSRDF.Geographic))
                    elif assunto[0] == 'y':
                        g.add((lastTopic, RDF.type, MADSRDF.Temporal))
                    else:
                        g.add((lastTopic, RDF.type, MADSRDF.Topic))
                    g.add((lastTopic, MADSRDF.authoritativeLabel, Literal(assunto[1])))
                    g.add((node.get(assunto[0]), RDF.rest, RDF.nil)) 
        else:
            g.add((topic, RDF.type, MADSRDF.Topic))
            g.add((topic, RDFS.label, Literal(s.get('label'))))
            v = s.get('sub').get('a', list(s.get('sub').values())[0])
            g.add((topic, MADSRDF.authoritativeLabel, Literal( v )))

    return g
            