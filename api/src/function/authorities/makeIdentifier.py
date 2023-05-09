def MakeIdentifier(identifiedBy, id):
    identifires = list()
    for i in identifiedBy:
        identifier = f"""[ a bf:{i.type} ;
        bf:assigner <{i.assigner}> ;
        rdf:value "{i.value}" ]"""
        identifires.append(identifier)
        
    local = f"""[ a bf:Local ;
        bf:assigner <http://id.loc.gov/vocabulary/organizations/brmninpa> ;
        rdf:value "{id}" ]"""
    identifires.append(local)
    
    identifires = ", ".join(identifires)
    return identifires