def MakeGraphItems(item, itemOf):
    graph = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    PREFIX bflc: <http://id.loc.gov/ontologies/bflc/> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX menclvl: <http://id.loc.gov/vocabulary/menclvl/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX mstatus: <http://id.loc.gov/vocabulary/mstatus/>

    INSERT DATA {{
        GRAPH <https://bibliokeia.com/resources/item/{item.barcode}>
        {{
        <https://bibliokeia.com/resources/item/{item.barcode}> a bf:Item ;
        bf:adminMetadata [ a bf:AdminMetadata ;
            bflc:encodingLevel {item.adminMetadata.encodingLevel} ;
            bf:assigner <{item.adminMetadata.assigner}> ;
            bf:creationDate "{item.adminMetadata.creationDate}"^^xsd:date ;  
            bf:descriptionConventions <{item.adminMetadata.descriptionConventions}> ;
            bf:descriptionLanguage <{item.adminMetadata.descriptionLanguage}> ;
            bf:generationProcess [ a bf:GenerationProcess ;
                    rdfs:label "{item.adminMetadata.generationProcess}" ;
                    bf:generationDate "{item.adminMetadata.generationDate}"^^xsd:dateTime ] ;
            bf:identifiedBy [ a bf:Local ;
                    bf:assigner <{item.adminMetadata.assigner}> ;
                    rdf:value "{item.barcode}" ] ;
            bf:status {item.adminMetadata.status.value} ] ;   
        bf:heldBy <{item.adminMetadata.assigner}> ;
        bf:itemOf <{itemOf.uri}> ;
        bf:shelfMark [ a bf:ShelfMarkDdc ;
            rdfs:label "{item.call}" ;
            bf:assigner <{item.adminMetadata.assigner}> ] ;
        bf:sublocation [ a bf:Sublocation ;
            rdfs:label "{item.call}" ] ;   
        }} }}
        """
    return graph