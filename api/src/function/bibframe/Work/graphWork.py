prefix = """PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    PREFIX bflc: <http://id.loc.gov/ontologies/bflc/> 
    PREFIX bkw: <https://bibliokeia.com/resources/work/> 
    PREFIX menclvl: <http://id.loc.gov/vocabulary/menclvl/>
    PREFIX mstatus: <http://id.loc.gov/vocabulary/mstatus/>
    PREFIX contentTypes: <http://id.loc.gov/vocabulary/contentTypes/>
    PREFIX relators: <http://id.loc.gov/vocabulary/relators/>
    PREFIX genreForms: <http://id.loc.gov/authorities/genreForms/>
    PREFIX msupplcont: <http://id.loc.gov/vocabulary/msupplcont/>
    PREFIX millus: <http://id.loc.gov/vocabulary/millus/>    
    """

       


def MakeContribution(contributions): 
        listContributions = list()
        for i in contributions:
                c = f"""[ a bf:Contribution, { ", ".join( [f'<{i}>' for i in i.type]) } ;
                bf:agent <{i.agent}> ;
                bf:role <{i.role}> ]"""
                listContributions.append(c)
        contribution = ", ".join(listContributions)
        contribution = f"bf:contribution {contribution} ;"

        return contribution

def MakeSubject(subjects): 
        
        subject = f"bf:subject { ', '.join([f'<{subject.uri}>' for subject in subjects]) } ;"

        return subject

def MakeClassification(classification):
    c = f"""bf:classification 
            [ a bf:ClassificationDdc ;
                bf:classificationPortion "{classification.classificationPortion}" ;
                { f'bf:itemPortion "{classification.itemPortion}" ;' if classification.itemPortion else ''}
                bf:edition "full" ;
                ] ;"""
    return c

def MakeLanguage(languages): 
        listLanguages = list()
        for i in languages: 
                l = f"""[ a bf:Language ;
                { f'bf:part "{i.part}" ;' if i.part else '' }
                rdf:value <{i.value}> ;
                rdfs:label "{i.label}" ]"""
                listLanguages.append(l)
        language = ", ".join(listLanguages)

        return language

def MakeSummary(summary):

    s = f""" bf:summary [ a bf:Summary ;
            rdfs:label "{summary.replace('"','' )}" ] ;
    """
    return s

def MakeGenreForm(genreForm): 
        
        gF = f'bf:genreForm { ", ".join([f"<{i.uri}>" for i in genreForm ]) } ; '

        return gF

def MakeUri(metadada, elements):
       
       sparql = f'bf:{metadada} { ", ".join([f"<{i.uri}>" for i in elements ])} ;'

       return sparql
       
       

def MakeGraphWork(request, id): 
    graph = f"""{prefix}    
    INSERT DATA {{
        GRAPH bkw:{id}
        {{
                bkw:{id} a { ", ".join([f'bf:{i}' for i in request.type]) }  ;
                bf:adminMetadata [ a bf:AdminMetadata ;
                bflc:encodingLevel {request.adminMetadata.encodingLevel} ;
                bf:assigner <{request.adminMetadata.assigner}> ;    
                bf:creationDate "{request.adminMetadata.creationDate}"^^xsd:date ;    
                bf:descriptionConventions <{request.adminMetadata.descriptionConventions}> ;
                bf:descriptionLanguage <{request.adminMetadata.descriptionLanguage}> ;
                 bf:generationProcess [ a bf:GenerationProcess ;
                    rdfs:label "{request.adminMetadata.generationProcess}" ;
                    bf:generationDate "{request.adminMetadata.generationDate}"^^xsd:dateTime ] ;
                bf:identifiedBy [ a bf:Local ;
                    bf:assigner <{request.adminMetadata.assigner}> ;
                    rdf:value "{id}" ] ;
                bf:status {request.adminMetadata.status.value} ] ;
                { MakeClassification(request.classification) if request.classification  else "" }                
                bf:content { ", ".join([f'<{content.uri}>' for content in request.content]) } ;
                bf:language { ", ".join([f'<{language.uri}>' for language in request.language]) } ;
                bf:title [ a bf:Title ;
                bf:mainTitle "{request.title.mainTitle}" 
                { f'; bf:subtitle "{request.title.subtitle}" ' if request.title.subtitle else ''} ] ;
                { MakeContribution(request.contribution) if request.contribution  else "" }  
                { MakeSubject(request.subject) if request.subject  else "" }
                { MakeGenreForm(request.genreForm)if request.genreForm  else "" }         
                { f'bf:note [ a bf:Note ; rdfs:label "{request.note}" ] ; ' if request.note else '' }
                { MakeSummary(request.summary) if request.summary else "" }
                { f'bf:tableOfContents [ a bf:tableOfContents ; rdfs:label "{request.tableOfContents}" ] ; ' if request.tableOfContents else '' }
                { MakeUri("supplementaryContent", request.supplementaryContent) if request.supplementaryContent else "" }
                { MakeUri("illustrativeContent", request.illustrativeContent) if request.illustrativeContent else "" }
                { MakeUri("intendedAudience", request.intendedAudience) if request.intendedAudience else "" }
                { MakeUri("geographicCoverage", request.geographicCoverage) if request.geographicCoverage else "" }
        }} }}
        """
    return graph