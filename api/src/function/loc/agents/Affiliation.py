def GetAffiliation(rwo, graph, obj):

    q = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    SELECT ?organization ?labelOrg ?start ?end
    WHERE  {{      	
    <{rwo}> madsrdf:hasAffiliation ?hasAffiliation .
  ?hasAffiliation madsrdf:organization ?organization .
  ?organization madsrdf:authoritativeLabel ?labelOrg .
  OPTIONAL {{ 
  ?hasAffiliation madsrdf:affiliationStart ?start .
    ?hasAffiliation madsrdf:affiliationEnd ?end  }} }}"""
    result = graph.query(q) 
    
    if len(result.bindings) > 0:
        affiliations = list()
        for i in result.bindings:
          # organization
          orgUri = i.get('organization').toPython()
          orgBase = orgUri.split('//')[1].split("/")[0]
          organization = {'value': orgUri, 'label': i.get('labelOrg').toPython(), 'base': orgBase}
          affiliation = {'organization': organization }
          if i.get('start'):
            affiliation['affiliationStart'] = i.get('start').toPython()
          if i.get('end'):
            affiliation['affiliationEnd'] = i.get('end').toPython()  

          affiliations.append(affiliation)
        obj['hasAffiliation'] = affiliations

    return obj