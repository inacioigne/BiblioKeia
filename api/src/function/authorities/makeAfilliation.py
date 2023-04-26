def MakeAfilliation(hasAffiliation):
    aList = list()
    for i in hasAffiliation:
        a = f"""[ a madsrdf:Affiliation ;
            { f'madsrdf:affiliationEnd "{i.affiliationEnd}" ;' if i.affiliationEnd else ''}
            { f'madsrdf:affiliationStart "{i.affiliationStart}" ;' if i.affiliationStart else ''}
            madsrdf:organization <{i.organization.value}> ]"""
        aList.append(a)
    return ", ".join(aList)