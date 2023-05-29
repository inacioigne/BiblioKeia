def MakeAffiliation(hasAffiliation):
    
    affiliationsList = list()
    for i in hasAffiliation:
        affiliation = f"""[ a madsrdf:Affiliation ;
        { f'madsrdf:affiliationStart "{i.affiliationStart}" ;' if i. affiliationStart else '' } 
           { f'madsrdf:affiliationEnd "{i.affiliationEnd}" ;' if i. affiliationEnd else '' } 
            madsrdf:organization <{i.organization.value}> ] """
        affiliationsList.append(affiliation)
    a = ", ".join(affiliationsList)
    affiliations = f"""madsrdf:hasAffiliation {a} ;"""

    return affiliations