import pysolr 

#SOLR
solr = pysolr.Solr('http://localhost:8983/solr/thesaurus/', timeout=10)


def DocSubject(request):

    doc = {
        "id": request.tokenLSCH,
        "type": "Topic",
        "authority": request.authority.value
        }
    
    variants = list()
    for variant in request.variant:
        variants.append(variant.value)
    doc["variants"] = variants

    broaders = list()
    for broader in request.broader:
        broaders.append(broader.value) 
    doc["broaders"] = broaders

    narrowers = list()
    for narrower in request.narrower:
        narrowers.append(narrower.value)  
    doc["narrowers"] = narrowers 

    reciprocalAuthoritys = list()
    for reciprocalAuthority in request.reciprocalAuthority:
        reciprocalAuthoritys.append(reciprocalAuthority.value) 
    doc["reciprocalAuthoritys"] = reciprocalAuthoritys 

    rs = solr.add([doc], commit=True)
    print(rs, doc)
    
    
    
