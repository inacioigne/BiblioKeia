from src.function.authorities.agents.hasAffiliation import MakeAffiliation
from src.function.authorities.agents.birthPlace import BirthPlace
from src.function.authorities.agents.fullerName import FullerName
from src.function.authorities.makeElement import MakeElement
from src.function.authorities.makeIdentifier import MakeIdentifier
from src.function.authorities.makeLabel import MakeLabel
from src.function.authorities.makeVariant import MakeVariant
from datetime import datetime


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
    PREFIX millus: <http://id.loc.gov/vocabulary/millus/>"""

def MakeGraphAgents(request, id): 
    graph = f"""{prefix}     
    INSERT DATA {{
        GRAPH <https://bibliokeia.com/authorities/{request.type}/{id}>
        {{
        <https://bibliokeia.com/authorities/{request.type}/{id}> a madsrdf:Authority, 
            madsrdf:{request.type} ;
            identifiers:local {request.identifiersLocal} ; 
            { f'identifiers:lccn "{request.identifiersLccn}" ;' if request.identifiersLccn else ''}
            madsrdf:adminMetadata [ a bf:AdminMetadata ;
            bf:assigner <{request.adminMetadata.assigner}> ;
            bf:creationDate "{request.adminMetadata.creationDate}"^^xsd:date ;
            bf:descriptionLanguage <http://id.loc.gov/vocabulary/languages/eng> ;
            bf:descriptionModifier <{request.adminMetadata.assigner}> ; 
            bf:generationProcess [ a bf:GenerationProcess ;
                    rdfs:label "{request.adminMetadata.generationProcess}" ;
                    bf:generationDate "{datetime.now().strftime('%Y-%m-%dT%H:%M:%S')}"^^xsd:dateTime ] ;
            bf:status {request.adminMetadata.status.value} ] ; 
            madsrdf:authoritativeLabel "{MakeLabel(request.elementList)}" ;
            madsrdf:elementList ( {MakeElement(request.elementList)} ) ; 
            { FullerName(request) if request.fullerName else ''  }
            { f'madsrdf:birthDate "{request.birthDate}" ;' if request.birthDate else ''  }
            { BirthPlace(request) if request.birthPlace else ''  }
            { MakeAffiliation(request.hasAffiliation) if request.hasAffiliation else ''  }
            { f'madsrdf:deathDate "{request.deathDate}" ;' if request.deathDate else ''  }
            { f'madsrdf:occupation {", ".join([ f"<{i.value}>" for i in request.occupation])} ;' if request.occupation else ''}
            { f'madsrdf:fieldOfActivity {", ".join([ f"<{i.value}>" for i in request.fieldOfActivity])} ;' if request.fieldOfActivity else ''}
            { f'madsrdf:hasCloseExternalAuthority {", ".join([ f"<{i.value}>" for i in request.hasCloseExternalAuthority])} ;' if request.hasCloseExternalAuthority else ''}
            { f'madsrdf:hasExactExternalAuthority {", ".join([ f"<{i.value}>" for i in request.hasExactExternalAuthority])} ;' if request.hasExactExternalAuthority else ''}
            { f'madsrdf:hasVariant { MakeVariant(request.hasVariant) } ;' if request.hasVariant else ''  }
            madsrdf:isMemberOfMADSCollection <{request.isMemberOfMADSCollection}> .          
            }} 
        }}"""
    return graph