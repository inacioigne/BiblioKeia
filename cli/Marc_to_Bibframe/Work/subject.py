from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS



def Subject(g, work, uri, numberWork, workMarc, BF, MADSRDF, RDFS):

    def FirstRest(g, node, assunto, first, rest):
        topico = BNode()
        g.add((node.get(first), RDF.first, topico))
        g.add((topico, RDF.type, MADSRDF.Topic))
        g.add((topico, MADSRDF.authoritativeLabel, Literal(assunto)))
        g.add((node.get(first), RDF.rest, node.get(rest)))
        return g

    for s in workMarc.Subjects():
        index = workMarc.Subjects().index(s) + 1
        topic = URIRef(f"http://{uri}/{numberWork}/Topic650-{index}")
        g.add((work, BF.subject, topic))

        g.add((topic, RDF.type, BF.Topic))
        if len(s.get('sub').keys()) > 1:
            node = { 
                'a' : BNode(),
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
                    g.add((lastTopic, RDF.type, MADSRDF.Topic))
                    g.add((lastTopic, MADSRDF.authoritativeLabel, Literal(assunto[1])))
                    g.add((node.get(assunto[0]), RDF.rest, RDF.nil)) 
        else:
            g.add((topic, RDF.type, MADSRDF.Topic))
            g.add((topic, RDFS.label, Literal(s.get('label'))))
            g.add((topic, MADSRDF.authoritativeLabel, Literal(s.get('sub')['a'])))

    return g
            