from .makeLabel import MakeLabel, ComponentLabel
from .makeElement import MakeElement, MakeComponentList
from .makeVariant import MakeVariant
from .makeAfilliation import MakeAfilliation

prefix = """PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#> 
    PREFIX owl: <http://www.w3.org/2002/07/owl#> 
    PREFIX ri: <http://id.loc.gov/ontologies/RecordInfo#> 
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/> 
    PREFIX bflc: <http://id.loc.gov/ontologies/bflc/> 
    PREFIX bkw: <https://bibliokeia.com/resources/work/> 
    PREFIX menclvl: <http://id.loc.gov/vocabulary/menclvl/>
    PREFIX mstatus: <http://id.loc.gov/vocabulary/mstatus/>
    PREFIX contentTypes: <http://id.loc.gov/vocabulary/contentTypes/>
    PREFIX relators: <http://id.loc.gov/vocabulary/relators/>
    PREFIX genreForms: <http://id.loc.gov/authorities/genreForms/>
    PREFIX msupplcont: <http://id.loc.gov/vocabulary/msupplcont/>
    PREFIX millus: <http://id.loc.gov/vocabulary/millus/>    """

def MakeGraph(request, id):
    graph = f"""{prefix}    
    INSERT DATA {{
        GRAPH <https://bibliokeia.com/authorities/{request.type}/{id}>
        {{
        <https://bibliokeia.com/authorities/{request.type}/{id}> a madsrdf:Authority, 
            madsrdf:{request.type} ;
            identifiers:local "{id}" ;
            madsrdf:adminMetadata [ a bf:AdminMetadata ;
            bf:assigner <{request.adminMetadata.assigner}> ;
            bf:creationDate "{request.adminMetadata.creationDate}"^^xsd:date ;
            bf:descriptionLanguage <http://id.loc.gov/vocabulary/languages/eng> ;
            bf:descriptionModifier <{request.adminMetadata.assigner}> ; 
            bf:generationProcess [ a bf:GenerationProcess ;
                    rdfs:label "{request.adminMetadata.generationProcess.label}" ;
                    bf:generationDate "{request.adminMetadata.generationProcess.generationDate}"^^xsd:dateTime ] ;
            bf:identifiedBy [ a bf:Local ;
                    bf:assigner <{request.adminMetadata.identifiedBy.assigner}> ;
                    rdf:value "{request.adminMetadata.identifiedBy.value}" ] ; 
            bf:status {request.adminMetadata.status.value} ] ; 
            { f'madsrdf:authoritativeLabel "{MakeLabel(request.elementList)}" ; ' if request.elementList else  f'madsrdf:authoritativeLabel "{ComponentLabel(request.componentList)}" ; '} 
            { f'madsrdf:elementList ( {MakeElement(request.elementList)} ) ; ' if request.elementList else ''} 
            { f'madsrdf:componentList ( { MakeComponentList(request.componentList) } ) ; ' if request.componentList else '' } 
            { f'madsrdf:fullerName [ a madsrdf:PersonalName ; rdfs:label "{request.fullerName.elementValue.value}" ] ;' if request.fullerName else ''}            
            { f'madsrdf:birthDate "{request.birthDate}" ; ' if request.birthDate else ''}     
            { f'madsrdf:birthPlace <{request.birthPlace.value}> ; ' if request.birthPlace else ''}
            { f'madsrdf:deathDate "{request.deathDate}" ; ' if request.deathDate else ''}   
            { f'madsrdf:hasBroaderAuthority {", ".join([ f"<{i.value}>" for i in request.hasBroaderAuthority])} ;' if request.hasBroaderAuthority else ''}
            { f'madsrdf:hasCloseExternalAuthority {", ".join([ f"<{i.value}>" for i in request.hasCloseExternalAuthority])} ;' if request.hasCloseExternalAuthority else ''}
            { f'madsrdf:hasExactExternalAuthority {", ".join([ f"<{i.value}>" for i in request.hasExactExternalAuthority])} ;' if request.hasExactExternalAuthority else ''}
            { f'madsrdf:hasVariant { MakeVariant(request.hasVariant) } ;' if request.hasVariant else ''  }
            { f'madsrdf:hasAffiliation { MakeAfilliation(request.hasAffiliation) } ;' if request.hasAffiliation else ''  }
            { f'madsrdf:occupation { ", ".join([ f"<{i.value}>" for i in request.occupation])} ;' if request.occupation else ''  }
            madsrdf:isMemberOfMADSCollection <{request.isMemberOfMADSCollection}> .          
            }} 
        }}"""
    return graph