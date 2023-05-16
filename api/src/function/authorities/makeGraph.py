from .makeLabel import MakeLabel, ComponentLabel
from .makeElement import MakeElement, MakeComponentList
from .makeVariant import MakeVariant
# from .makeAfilliation import MakeAfilliation
from .makeIdentifier import MakeIdentifier

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

def MakeGraphSubject(request, id):
    graph = f"""{prefix}    
    INSERT DATA {{
        GRAPH <https://bibliokeia.com/authorities/{request.type}/{id}>
        {{
        <https://bibliokeia.com/authorities/{request.type}/{id}> a madsrdf:Authority, 
            madsrdf:{request.type} ;
            madsrdf:adminMetadata [ a bf:AdminMetadata ;
            bf:assigner <{request.adminMetadata.assigner}> ;
            bf:creationDate "{request.adminMetadata.creationDate}"^^xsd:date ;
            bf:descriptionLanguage <http://id.loc.gov/vocabulary/languages/eng> ;
            bf:descriptionModifier <{request.adminMetadata.assigner}> ; 
            bf:generationProcess [ a bf:GenerationProcess ;
                    rdfs:label "{request.adminMetadata.generationProcess}" ;
                    bf:generationDate "{request.adminMetadata.generationDate}"^^xsd:dateTime ] ;
            bf:identifiedBy {MakeIdentifier(request.adminMetadata.identifiedBy, id)} ; 
            bf:status {request.adminMetadata.status.value} ] ; 
            { f'madsrdf:authoritativeLabel "{MakeLabel(request.elementList)}" ; ' if request.elementList else  f'madsrdf:authoritativeLabel "{ComponentLabel(request.componentList)}" ; '} 
            { f'madsrdf:elementList ( {MakeElement(request.elementList)} ) ; ' if request.elementList else ''} 
            { f'madsrdf:hasReciprocalAuthority {", ".join([ f"<{i.value}>" for i in request.hasReciprocalAuthority])} ;' if request.hasReciprocalAuthority else ''}
            { f'madsrdf:hasReciprocalExternalAuthority {", ".join([ f"<{i.value}>" for i in request.hasReciprocalExternalAuthority])} ;' if request.hasReciprocalExternalAuthority else ''}
            { f'madsrdf:hasNarrowerAuthority {", ".join([ f"<{i.value}>" for i in request.hasNarrowerAuthority])} ;' if request.hasNarrowerAuthority else ''}
            { f'madsrdf:hasNarrowerExternalAuthority {", ".join([ f"<{i.value}>" for i in request.hasNarrowerExternalAuthority])} ;' if request.hasNarrowerExternalAuthority else ''}
            { f'madsrdf:hasBroaderAuthority {", ".join([ f"<{i.value}>" for i in request.hasBroaderAuthority])} ;' if request.hasBroaderAuthority else ''}
            { f'madsrdf:hasBroaderExternalAuthority {", ".join([ f"<{i.value}>" for i in request.hasBroaderExternalAuthority])} ;' if request.hasBroaderExternalAuthority else ''}
            { f'madsrdf:hasCloseExternalAuthority {", ".join([ f"<{i.value}>" for i in request.hasCloseExternalAuthority])} ;' if request.hasCloseExternalAuthority else ''}
            { f'madsrdf:hasExactExternalAuthority {", ".join([ f"<{i.value}>" for i in request.hasExactExternalAuthority])} ;' if request.hasExactExternalAuthority else ''}
            { f'madsrdf:hasVariant { MakeVariant(request.hasVariant) } ;' if request.hasVariant else ''  }
            madsrdf:isMemberOfMADSCollection <{request.isMemberOfMADSCollection}> .          
            }} 
        }}"""
    return graph