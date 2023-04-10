def MakeVariant(hasVariant):
    
    variants = list()
    for i in hasVariant:
        variant = f"""[ a madsrdf:PersonalName,
                madsrdf:Variant ;
            madsrdf:elementList ( [ a madsrdf:FullNameElement ;
                        madsrdf:elementValue "{i.value}" ] 
                         { '[ a madsrdf:DateNameElement ; madsrdf:elementValue "{}" ] ) ;'.format(i.date) if i.date else ') ;' }           
            { ' madsrdf:variantLabel "{}, {}" ]'.format(i.value, i.date) if i.date else 'madsrdf:variantLabel "{i.value}" ]' }"""
        variants.append(variant)
    return variants

def MakeAffiliation(hasAffiliation):

    affiliations = list()
    for i in hasAffiliation:
        affiliation = f"""[ a madsrdf:Affiliation;
            { f'madsrdf:affiliationEnd "{i.affiliationEnd}" ;' if i.affiliationEnd else "" }
            { f'madsrdf:affiliationStart "{i.affiliationStart}" ;' if i.affiliationStart else "" }
            madsrdf:organization <{i.organization}> ] """
        affiliations.append(affiliation)

    return affiliations

def MakePersonalGraph(request):

    closeExternal = "madsrdf:hasCloseExternalAuthority {} ; \n"
    exactExternal = "madsrdf:hasExactExternalAuthority {} ; \n"
    hasVariant = "madsrdf:hasVariant  {}  ; \n"
    birthPlace = """madsrdf:birthPlace [ a madsrdf:Geographic ;
                rdfs:label "{}" ] ;"""
    hasAffiliation = "madsrdf:hasAffiliation {} ;"
    occupation = "madsrdf:occupation {} ; \n"

    if request.hasVariant:
            variants = MakeVariant(request.hasVariant)
    if request.hasAffiliation:
            affiliations = MakeAffiliation(request.hasAffiliation)


    template = f"""PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#> 
    PREFIX owl: <http://www.w3.org/2002/07/owl#> 
    PREFIX ri: <http://id.loc.gov/ontologies/RecordInfo#> 
    PREFIX name: <https://bibliokeia.com/authorities/name/> 
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    INSERT DATA {{
    GRAPH name:{request.id} {{
    name:{request.id} a madsrdf:Authority, madsrdf:PersonalName ;
            madsrdf:adminMetadata [ a ri:RecordInfo ; 
            ri:recordChangeDate "{request.recordChangeDate}"^^xsd:dateTime ;
            ri:recordContentSource <http://id.loc.gov/vocabulary/organizations/brmninpa> ;
            ri:recordStatus "new"^^xsd:string
            ] ; 
            madsrdf:authoritativeLabel { f'"{request.label}, {request.date}" ; ' if request.date else f'"{request.label}" ;' }
            madsrdf:elementList ( [ a madsrdf:FullNameElement ;
                    madsrdf:elementValue "{request.label}" ] 
                    { '[ a madsrdf:DateNameElement ; madsrdf:elementValue "{}" ]'.format(request.date) if request.date else '' } ) ;
            madsrdf:fullerName [ a madsrdf:PersonalName ;
                rdfs:label "{request.fullerName}" ] ;
            { closeExternal.format(', '.join([ f'<{i}>' for i in request.hasCloseExternalAuthority])) if request.hasCloseExternalAuthority else '' }
            { exactExternal.format(', '.join([ f'<{i}>' for i in request.hasExactExternalAuthority])) if request.hasExactExternalAuthority else '' } 
            { hasVariant.format(', '.join(variants)) if request.hasVariant else '' } 
            { f'madsrdf:birthDate "{request.birthDate}" ;' if request.birthDate else '' } 
            { birthPlace.format(request.birthPlace) if request.birthPlace else '' } 
            { f'madsrdf:deathDate "{request.deathDate}" ;' if request.deathDate else '' } 
            { hasAffiliation.format(', '.join(affiliations)) if request.hasAffiliation else '' } 
            { occupation.format(', '.join([ f'<{i}>' for i in request.occupation])) if request.occupation else '' } 
    }} }}
    """
    return template