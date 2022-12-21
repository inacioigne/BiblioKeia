from rdflib import Graph, URIRef, BNode, Literal
from rdflib.namespace import RDF
from src.function.thesaurus.subjects.elementList import ElementList
#from src.function.thesaurus.componentList import ComponentList

def Variant(g, uri, MADSRDF, variants):

    # variantList = BNode()    
    # g.add((uri, MADSRDF.hasVariant, variantList))

    for variant in variants: 
        variantList = BNode()    
        g.add((uri, MADSRDF.hasVariant, variantList))
        if variant.type == "ComplexSubject":
            complexSubject = variant.value.split("--")
            label = Literal(variant.value, lang=variant.lang)
            label1 = Literal(complexSubject[0], lang=variant.lang)
            label2 = Literal(complexSubject[1], lang=variant.lang)

            g.add((variantList, RDF.type, MADSRDF.ComplexSubject))
            g.add((variantList, RDF.type, MADSRDF.Variant))
            componentList = BNode()
            g.add((variantList, MADSRDF.componentList, componentList))
            #element1
            element1 = BNode()
            g.add((componentList, RDF.first, element1))
            g.add((element1, RDF.type, MADSRDF.Topic))
            g.add((element1, RDF.type, MADSRDF.Variant))
            g = ElementList(g, element1, label1, MADSRDF)
            g.add((element1, MADSRDF.variantLabel, label1))

            element2 = BNode()
            g.add((componentList, RDF.rest, element2))
            #element2
            element22 = BNode()
            g.add((element2, RDF.first, element22))
            g.add((element22, RDF.type, MADSRDF.Topic))
            g.add((element22, RDF.type, MADSRDF.Variant))
            g = ElementList(g, element22, label2, MADSRDF)
            g.add((element22, MADSRDF.variantLabel, label2))

            g.add((element2, RDF.rest, RDF.nil))
            g.add((variantList, MADSRDF.variantLabel, label))
  
        else:
            g.add((variantList, RDF.type, MADSRDF.Topic))
            g.add((variantList, RDF.type, MADSRDF.Variant))
            label = Literal(variant.value, lang=variant.lang)
            g = ElementList(g, variantList, label, MADSRDF)
            g.add((variantList, MADSRDF.variantLabel, label))

    return g