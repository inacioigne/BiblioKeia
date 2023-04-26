from .makeLabel import MakeLabel
from .makeElement import MakeElement
from .makeVariant import MakeVariant
from .makeAfilliation import MakeAfilliation

prefix = """PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#> 
    PREFIX owl: <http://www.w3.org/2002/07/owl#> 
    PREFIX ri: <http://id.loc.gov/ontologies/RecordInfo#> 
    PREFIX name: <https://bibliokeia.com/authorities/name/> 
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/> """

def MakeGraph(request, id):
    graph = f"""{prefix}    
    INSERT DATA {{
        GRAPH <https://bibliokeia.com/authorities/{request.type}/{id}>
        {{
        <https://bibliokeia.com/authorities/{request.type}/{id}> a madsrdf:Authority, 
            madsrdf:{request.type} ;
            identifiers:local "{id}" ;
            madsrdf:adminMetadata [ a ns1:AdminMetadata ;
            ns2:encodingLevel <http://id.loc.gov/vocabulary/menclvl/f> ;
            ns1:assigner <http://id.loc.gov/vocabulary/organizations/dlc> ;
            ns1:changeDate "2023-02-06T08:03:19"^^xsd:dateTime ;
            ns1:creationDate "{request.adminMetadata.creationDate}"^^xsd:date ;
            ns1:descriptionAuthentication <http://id.loc.gov/vocabulary/marcauthen/pcc> ;
            ns1:descriptionConventions <http://id.loc.gov/vocabulary/descriptionConventions/isbd>,
                <http://id.loc.gov/vocabulary/descriptionConventions/rda> ;
            ns1:descriptionLanguage <http://id.loc.gov/vocabulary/languages/eng> ;
            ns1:descriptionModifier <http://id.loc.gov/vocabulary/organizations/dlc> ; 
            ns1:generationProcess [ a ns1:GenerationProcess ;
                    rdfs:label "DLC marc2bibframe2 v2.2.1" ;
                    ns1:generationDate "2023-02-07T01:58:10.983465-05:00"^^xsd:dateTime ] ;
            ns1:identifiedBy [ a ns1:Local ;
                    ns1:assigner <http://id.loc.gov/vocabulary/organizations/dlc> ;
                    rdf:value "21313495" ] ;
            ns1:status <http://id.loc.gov/vocabulary/mstatus/c> ;] ; 
            madsrdf:authoritativeLabel "{MakeLabel(request.elementList)}" ;
            madsrdf:elementList ( {MakeElement(request.elementList)} ) ;
            { f'madsrdf:fullerName [ a madsrdf:PersonalName ; rdfs:label "{request.fullerName.elementValue.value}" ] ;' if request.fullerName else ''}            
            { f'madsrdf:birthDate "{request.birthDate}"' if request.birthDate else ''}     
            { f'madsrdf:birthPlace <{request.birthPlace.value}>' if request.birthPlace else ''}
            { f'madsrdf:deathDate "{request.deathDate}"' if request.deathDate else ''}   
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