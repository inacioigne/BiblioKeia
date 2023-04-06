template  ="""PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#> 
PREFIX owl: <http://www.w3.org/2002/07/owl#> 
PREFIX ri: <http://id.loc.gov/ontologies/RecordInfo#> 
PREFIX topic: <https://bibliokeia.com/authorities/topic/> 
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

INSERT DATA {{
    GRAPH topic:{identifier} {{
        topic:{identifier} a madsrdf:Authority, madsrdf:Topic ;
        madsrdf:adminMetadata [ a ri:RecordInfo ; 
        ri:recordChangeDate "{recordChangeDate}"^^xsd:dateTime ;
        ri:recordContentSource <http://id.loc.gov/vocabulary/organizations/brmninpa> ;
        ri:recordStatus "new"^^xsd:string
        ] ; 
        madsrdf:authoritativeLabel "{label}"@{lang} ;
        madsrdf:elementList ( [ a madsrdf:TopicElement ;
                madsrdf:elementValue "{label}"@{lang} ] ) ;    
"""

def MakeVariant(hasVariant):
    variantTopic = """[ a madsrdf:Topic,
                        madsrdf:Variant ;
                    madsrdf:elementList ( [ a madsrdf:TopicElement ;
                                madsrdf:elementValue "{value}"@{lang} ] ) ;
                    madsrdf:variantLabel "{value}"@{lang} ]"""

    variantComplex = """[ a madsrdf:ComplexSubject,
        madsrdf:Variant ;
    madsrdf:componentList ( [ a madsrdf:Topic,
        madsrdf:Variant ;
    madsrdf:elementList ( 
        [ a madsrdf:TopicElement ;
            madsrdf:elementValue "{term1}"@{lang} ] ) ;
            madsrdf:variantLabel "{term1}"@{lang} ] 
        [ a madsrdf:Topic,
            madsrdf:Variant ;
        madsrdf:elementList ( 
            [ a madsrdf:TopicElement ;
                madsrdf:elementValue "{term2}"@{lang} ] ) ;
                madsrdf:variantLabel "{term2}"@{lang} ] ) ;
        madsrdf:variantLabel "{term1}--{term2}"@{lang} ] """
    variants = list()
    for i in hasVariant:
        if i.type == 'Topic':
            v = variantTopic.format(**i.dict())
            variants.append(v)
        elif i.type == 'ComplexSubject':
            [term1, term2] = i.value
            d = {"term1": term1, "term2":term2, "lang": i.lang}
            v = variantComplex.format(**d)
            variants.append(v)
    return variants

def MakeGraph(request):
    
    g = template.format(**request.dict())
    reciprocal = "madsrdf:hasReciprocalAuthority {} ; \n"
    broader = "madsrdf:hasBroaderAuthority {} ; \n"
    narrower = "madsrdf:hasNarrowerAuthority {} ; \n"
    closeExternal = "madsrdf:hasCloseExternalAuthority {} ; \n"
    exactExternal = "madsrdf:hasExactExternalAuthority {} ; \n"
    hasVariant = "madsrdf:hasVariant {} ; \n"

    if request.hasVariant:
        variants = MakeVariant(request.hasVariant)
        

    graph = f"{g} \
    { reciprocal.format(', '.join([ f'<{i}>' for i in request.hasReciprocalAuthority])) if request.hasReciprocalAuthority else '' } \
    { broader.format(', '.join([ f'<{i}>' for i in request.hasBroaderAuthority])) if request.hasBroaderAuthority else '' } \
    { narrower.format(', '.join([ f'<{i}>' for i in request.hasNarrowerAuthority])) if request.hasNarrowerAuthority else '' } \
    { closeExternal.format(', '.join([ f'<{i}>' for i in request.hasCloseExternalAuthority])) if request.hasCloseExternalAuthority else '' } \
    { exactExternal.format(', '.join([ f'<{i}>' for i in request.hasExactExternalAuthority])) if request.hasExactExternalAuthority else '' } \
    { hasVariant.format(', '.join(variants)) if request.hasVariant else '' } }} }}"
    
    return graph

def MakeDoc(request):

    doc = request.dict()
    doc['id'] = request.identifier
    doc['uri'] = f'https://bibliokeia.com/authorities/topic/{request.identifier}'
    
    if request.hasVariant:
        variant = ["--".join(i.value) if i.type == 'ComplexSubject' else i.value for i in request.hasVariant]
        doc['hasVariant'] = variant

    return doc