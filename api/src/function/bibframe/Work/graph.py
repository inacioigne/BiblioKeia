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
                c = f"""[ a { ", ".join(i.type) } ;
                bf:agent <{i.agent}> ;
                bf:role {i.role} ]"""
                listContributions.append(c)
        contribution = ", ".join(listContributions)

        return contribution

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


def MakeGraph(request, id):
    graph = f"""{prefix}    
    INSERT DATA {{
        GRAPH bkw:{id}
        {{
                bkw:{id} a { ", ".join(request.type) }  ;
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
                bf:classification [ a bf:ClassificationDdc ;
                bf:assigner <{request.adminMetadata.assigner}> ;
                bf:classificationPortion "{request.classification.classificationPortion}" ;
                bf:itemPortion "{request.classification.itemPortion}" ;
                bf:source [ a bf:Source ;
                    bf:code "{request.classification.edition}" ] ] ;
                bf:content { ", ".join([content.value for content in request.content]) } ;
                bf:contribution  { MakeContribution(request.contribution) } ;
                { f'bf:genreForm { ", ".join([genreForm.value for genreForm in request.genreForm]) } ; ' if request.genreForm else ''}
                bf:language { MakeLanguage(request.language) } ;
                { f'bf:note [ a bf:Note ; rdfs:label "{request.note}" ] ; ' if request.note else '' }
                { f'bf:summary [ a bf:Summary ; rdfs:label "{request.summary}" ] ; ' if request.summary else '' }
                { f'bf:expressionOf <{request.expressionOf}> ;' if request.expressionOf else ''}
                { f'bf:hasInstance <{request.hasInstance}> ;' if request.hasInstance else ''}
                { f'bf:supplementaryContent { ", ".join([supplementaryContent.value for supplementaryContent in request.supplementaryContent ])} ;' if request.supplementaryContent else ''}
                bf:subject { ", ".join([f'<{subject.value}>' for subject in request.subject]) } ;
                bf:title [ a bf:Title ;
                bf:mainTitle "{request.title.mainTitle}" 
                { f'; bf:subtitle "{request.title.subtitle}" ' if request.title.subtitle else ''} ] .

                {request.adminMetadata.status.value} a bf:Status ;
                rdfs:label "{request.adminMetadata.status.label}" .

        
        }} 
        }}
        """
    return graph
