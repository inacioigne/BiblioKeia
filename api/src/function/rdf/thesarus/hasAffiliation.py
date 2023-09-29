def MakeOrganization(organization):
    org = f"""[ a madsrdf:Organization ;
                    rdfs:label "{organization.label}" ]"""
    return org

def MakeAffiliation(hasAffiliation):
    
    affiliationsList = list()
    for i in hasAffiliation:
        affiliation = f"""[ a madsrdf:Affiliation ;
        { f'madsrdf:affiliationStart "{i.affiliationStart}" ;' if i. affiliationStart else '' } 
           { f'madsrdf:affiliationEnd "{i.affiliationEnd}" ;' if i. affiliationEnd else '' } 
            madsrdf:organization { f'<{i.organization.uri}>' if i.organization.uri else MakeOrganization(i.organization) } ] """
        affiliationsList.append(affiliation)
    a = ", ".join(affiliationsList)
    affiliations = f"""madsrdf:hasAffiliation {a} ;"""

    return affiliations