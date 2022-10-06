from xml.dom.minidom import parse
import xml.etree.ElementTree as etree
from Marc_to_Bibframe.Marc.marcWork import MarcWork
from Marc_to_Bibframe.Marc.marcInstance import MarcInstance
from Marc_to_Bibframe.Marc.marcItems import MarcItems
from rdflib import Graph, Namespace, URIRef
from Marc_to_Bibframe.Work.work import Work
from Marc_to_Bibframe.Instance.instance import Instance
from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore, SPARQLStore

store = SPARQLUpdateStore(update_endpoint='http://localhost:3030/bibframe/update')
query_endpoint = 'http://localhost:3030/bibframe/query'
update_endpoint = 'http://localhost:3030/bibframe/update'
store.open((query_endpoint, update_endpoint))

def Make_Graph(nt, bf, count ):
    G1 = "PREFIX bk: <http://bibliokeia.com/bibframe/"+bf+"""/>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    INSERT DATA {
        GRAPH bk:"""

    G2 = " {"

    G3 = """}
    }"""

    G = G1+str(count)+" { \n"+nt+"}}"

    return G

def UpadateJena(path_marc, count, shelf, out):
    
    marc_file = parse(path_marc)
    records = marc_file.getElementsByTagName('record')

    docs = list()
    for record in records:
        
        marcxml = etree.fromstring(record.toxml())
        workMarc = MarcWork(marcxml)
        instanceMarc = MarcInstance(marcxml)
        itemsMarc = MarcItems(marcxml) 
        print(count)
        print(workMarc.Title().get('title'))

        #JENA
        BFwork = URIRef(f"http://bibliokeia.com/bibframe/work/{count}") 
        BFinstance = URIRef(f"http://bibliokeia.com/bibframe/instance/{count}")
        #Work
        work = Work(count, workMarc, BFwork, BFinstance)
        #work.serialize(f'out/{out}/works/{count}.ttl', format='turtle')
        nt = work.serialize(format='nt')
        W = Make_Graph(nt, "work", count)
        store.update(W)
        #Instance
        instance = Instance(count, workMarc, instanceMarc, itemsMarc, BFwork, BFinstance, shelf)
        i = instance.get('instance')
        #i.serialize(f'out/{out}/instances/{count}.ttl', format='turtle')
        i_nt = i.serialize(format='nt')
        I = Make_Graph(i_nt, "instance", count)
        store.update(I)
        #Items
        items = instance.get('items')
        for item, register in items:
            #item.serialize(f'out/{out}/items/{register}.ttl', format='turtle')
            item_nt = item.serialize(format='nt')
            Item = Make_Graph(item_nt, "item", register)
            store.update(Item)

        count += 1
    return count
