def MakeOccupation(occupations):

    listOccupation = list()
    for i in occupations:
        if i.uri:
            occupation = f'<{i.uri}>'
            listOccupation.append(occupation)
        else:
            occupation = f"""[ a madsrdf:Occupation ;
            rdfs:label "{i.label}" ]"""
            listOccupation.append(occupation)
    elements = ", ".join(listOccupation)
    mads = f"madsrdf:occupation {elements} ;"
    print(mads)

    return mads
    




    
