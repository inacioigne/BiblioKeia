from xml.dom.minidom import parse
import xml.etree.ElementTree as etree
from Marc_to_Bibframe.Marc.marcWork import MarcWork
from Marc_to_Bibframe.Marc.marcInstance import MarcInstance
from Marc_to_Bibframe.Marc.marcItems import MarcItems
from Marc_to_Bibframe.Work.work import Work
from Marc_to_Bibframe.Instance.instance import Instance

from rdflib import URIRef
from pyfuseki import FusekiUpdate

def CreateBF(path_marc, count, shelf):

    uri = "http://bibliokeia.com/"
    fuseki = FusekiUpdate('http://localhost:3030', 'Sedab')

    marc_file = parse(path_marc)
    records = marc_file.getElementsByTagName('record')

    for record in records:
        count += 1
        marcxml = etree.fromstring(record.toxml())
        #Marc Objects
        workMarc = MarcWork(marcxml)
        instanceMarc = MarcInstance(marcxml)
        itemsMarc = MarcItems(marcxml)
        print(workMarc.Title().get('title'))
        
        BFwork = URIRef(f"{uri}work/{count}")
        BFinstance = URIRef(f"{uri}instance/{count}")
        #Work
        work = Work(count, workMarc, BFwork, BFinstance, uri)
        #work.serialize(f'out/works/{count}.ttl', format='turtle')
        fuseki.insert_graph(work)

        #Instances
        instance = Instance(count, workMarc, instanceMarc, itemsMarc, BFwork, BFinstance, shelf, fuseki, uri)
        #instance.serialize(f'out/instances/{count}.ttl', format='turtle')
        fuseki.insert_graph(instance)
        

path_marc = r'Koha/E1P1.xml'
CreateBF(path_marc, 0, 'E1.P1')