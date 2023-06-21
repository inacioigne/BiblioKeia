from src.function.bibframe.Work.graphWork import MakeUri


prefix = """
PREFIX bki: <https://bibliokeia.com/resources/instance/> 
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    PREFIX bflc: <http://id.loc.gov/ontologies/bflc/>  
    PREFIX menclvl: <http://id.loc.gov/vocabulary/menclvl/>
    PREFIX mstatus: <http://id.loc.gov/vocabulary/mstatus/>
    PREFIX contentTypes: <http://id.loc.gov/vocabulary/contentTypes/>
    PREFIX relators: <http://id.loc.gov/vocabulary/relators/>
    PREFIX genreForms: <http://id.loc.gov/authorities/genreForms/>
    PREFIX msupplcont: <http://id.loc.gov/vocabulary/msupplcont/>
    PREFIX millus: <http://id.loc.gov/vocabulary/millus/>    
    """

def MakeLiteral(value):
    v = f"""bf:extent [ a <{value.type}> ;
                    rdfs:label "{value.label}" ] ;"""
    return v

def MakeGraphInstance(request, id):
    graph = f"""{prefix}    
    INSERT DATA {{
        GRAPH bki:{id}
        {{
                bki:{id} a { ", ".join([f'bf:{i}' for i in request.type]) }  ;
                bf:adminMetadata [ a bf:AdminMetadata ;
                bflc:encodingLevel {request.adminMetadata.encodingLevel} ;
                bf:assigner <{request.adminMetadata.assigner}> ;    
                bf:creationDate "{request.adminMetadata.creationDate}"^^xsd:date ;    
                bf:descriptionConventions <{request.adminMetadata.descriptionConventions}> ;
                bf:descriptionLanguage <{request.adminMetadata.descriptionLanguage}> ;
                 bf:generationProcess [ a bf:GenerationProcess ;
                    rdfs:label "{request.adminMetadata.generationProcess.label}" ;
                    bf:generationDate "{request.adminMetadata.generationProcess.generationDate}"^^xsd:dateTime ] ;
                bf:identifiedBy [ a bf:Local ;
                    bf:assigner <{request.adminMetadata.assigner}> ;
                    rdf:value "{id}" ] ;
                bf:status {request.adminMetadata.status.value} ] ;            
                bf:title [ a bf:Title ;
                bf:mainTitle "{request.title.mainTitle}" 
                { f'; bf:subtitle "{request.title.subtitle}" ' if request.title.subtitle else ''} ] ;
                { MakeUri("carrier", request.carrier) if request.carrier else "" }
                { MakeUri("copyrightDate", request.copyrightDate) if request.copyrightDate else "" }
                { f'bf:dimensions "{request.dimensions}" ; ' if request.dimensions else ""  }
                { MakeLiteral(request.extent) if request.extent else "" }
                 bf:instanceOf <{request.instanceOf.uri}> ; 
        }} }}
        """
    return graph