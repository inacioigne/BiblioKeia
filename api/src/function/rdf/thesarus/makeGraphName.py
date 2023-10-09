from src.function.authorities.agents.date import BirthDate, DeathDate
from src.function.authorities.makeOccupation import MakeOccupation
from src.function.rdf.thesarus.hasAffiliation import MakeAffiliation
from src.function.authorities.agents.place import BirthPlace, DeathPlace
from src.function.authorities.agents.fullerName import FullerName
from src.function.authorities.makeElement import MakeElement
from src.function.authorities.makeLabel import MakeLabel
from src.function.authorities.makeVariant import MakeVariant
from src.function.authorities.makeRWO import MakeRWO

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

def MakeGraphName(request, id):  

    graph = f"""{prefix}     
    INSERT DATA {{
        GRAPH <https://bibliokeia.com/authority/{request.type}/{id}>
        {{
        <https://bibliokeia.com/authority/{request.type}/{id}> a madsrdf:Authority, 
            madsrdf:{request.type} ;
            identifiers:local {id} ; 
            { f'identifiers:lccn "{request.identifiersLccn}" ;' if request.identifiersLccn else ''}
            madsrdf:adminMetadata [ a bf:AdminMetadata ;
            bf:assigner <{request.adminMetadata.assigner}> ;
            { f'bf:changeDate "{request.adminMetadata.changeDate}"^^xsd:dateTime ;' if request.adminMetadata.changeDate else ''  }
            bf:creationDate "{request.adminMetadata.creationDate}"^^xsd:date ;
            bf:descriptionLanguage <http://id.loc.gov/vocabulary/languages/eng> ;
            bf:descriptionModifier <{request.adminMetadata.assigner}> ; 
            bf:generationProcess [ a bf:GenerationProcess ;
                    rdfs:label "{request.adminMetadata.generationProcess}" ;
                    bf:generationDate "{datetime.now().strftime('%Y-%m-%dT%H:%M:%S')}"^^xsd:dateTime ] ;
            bf:status [ a bf:Status ;
                    rdfs:label "{request.adminMetadata.status.label}" ;
                    bf:code "{request.adminMetadata.status.value}" ] ] ;
            madsrdf:authoritativeLabel "{MakeLabel(request.elementList)}" ;
            madsrdf:elementList ( {MakeElement(request.elementList)} ) ; 
            { MakeVariant(request.hasVariant)if request.hasVariant else '' }
            { FullerName(request) if request.fullerName else ''  } 
            { BirthDate(request) }
            { BirthPlace(request) if request.birthPlace else ''  }
            { DeathDate(request) }
            { DeathPlace(request.deathPlace) if request.deathPlace else ''  }
            { MakeAffiliation(request.hasAffiliation) if request.hasAffiliation else ''  }
            { MakeOccupation(request.occupation) if request.occupation else '' }
            { f'madsrdf:fieldOfActivity {", ".join([ f"<{i.uri}>" for i in request.fieldOfActivity])} ;' if request.fieldOfActivity else ''}
            { f'madsrdf:hasCloseExternalAuthority {", ".join([ f"<{i.uri}>" for i in request.hasCloseExternalAuthority])} ;' if request.hasCloseExternalAuthority else ''}
            { f'madsrdf:hasExactExternalAuthority {", ".join([ f"<{i.uri}>" for i in request.hasExactExternalAuthority])} ;' if request.hasExactExternalAuthority else ''}
            { f'madsrdf:identifiesRWO { MakeRWO(request.identifiesRWO) } ;' if request.identifiesRWO else ''  }
             madsrdf:isMemberOfMADSCollection <https://bibliokeia.com/authority> .         
            }} 
        }}"""
    return graph