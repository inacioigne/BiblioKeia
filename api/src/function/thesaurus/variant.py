from rdflib import Graph, URIRef, BNode, Literal
from rdflib.namespace import RDF
from src.function.thesaurus.elementList import ElementList

def Variant(g, uri, MADSRDF, variants):

    variantList = BNode()    
    g.add((uri, MADSRDF.hasVariant, variantList))

    for variant in variants:
        
        if "-" in variant.value:
            complexSubject = variant.value.split("-")
            label1 = Literal(
                complexSubject[0].rstrip(), 
                lang=variant.lang)
            label2 = Literal(
                complexSubject[1].lstrip(), 
                lang=variant.lang) 
            
            #ComplexSubject
            g.add((variantList, RDF.type, MADSRDF.ComplexSubject))
            g.add((variantList, RDF.type, MADSRDF.Variant))

            element1 = BNode()
            g.add((variantList, MADSRDF.componentList, element1))

            topic1 = BNode()
            g.add((element1, RDF.first, topic1))
            g.add((topic1, RDF.type, MADSRDF.Topic))
            g.add((topic1, RDF.type, MADSRDF.Variant))
            g = ElementList(g, topic1, label1, MADSRDF)
            g.add((topic1, MADSRDF.variantLabel, label1))


            element2 = BNode()
            g.add((element1, RDF.rest, element2))

            topic2 = BNode()
            g.add((element2, RDF.first, topic2))
            g.add((topic2, RDF.type, MADSRDF.Topic))
            g.add((topic2, RDF.type, MADSRDF.Variant))
            g = ElementList(g, topic2, label2, MADSRDF)
            g.add((topic2, MADSRDF.variantLabel, label2))

            g.add((element2, RDF.rest, RDF.nil))

            g.add((
                variantList, 
                MADSRDF.variantLabel, 
                Literal(variant.value, lang="pt")
                ))


           


            # complexSubject = variant.value.split("-")
            # label1 = Literal(
            #     complexSubject[0].rstrip(), 
            #     lang=variant.lang)
            # label2 = Literal(
            #     complexSubject[1].rstrip(), 
            #     lang=variant.lang)   

            # component1 = BNode()
            # g.add((componentList, RDF.first, component1))
            # g.add((component1, RDF.type, MADSRDF.Topic))
            # g.add((component1, RDF.type, MADSRDF.Variant))            
            # g = ElementList(g, component1, label1, MADSRDF)
            # g.add((component1, MADSRDF.variantLabel, label1)) 

            # component2 = BNode()
            # g.add((component1, RDF.rest, component2))
            # element2 = BNode()
            # g.add((component2, RDF.first, element2))
            # g.add((element2, RDF.type, MADSRDF.Topic))
            # g.add((element2, RDF.type, MADSRDF.Variant))            
            # g = ElementList(g, element2, label2, MADSRDF)
            # g.add((component2, MADSRDF.variantLabel, label2)) 
            # g.add((component2, RDF.rest, RDF.nil))


    return g