from src.function.loc.agents.fieldOfActivity import GetFieldOfActivity
from src.schemas.authorities.agents import Agents
from src.function.loc.agents.Occuption import GetOccuption
from src.function.loc.agents.Affiliation import GetAffiliation
from src.function.loc.agents.BirthPlace import GetBirthPlace
from src.function.loc.agents.Date import GetDate
from src.function.loc.agents.Variant import GetVariant
from src.function.loc.Uri import GetUri
from src.function.loc.agents.FullerName import GetFullerName
from src.function.loc.agents.ElementList import GetElementList
from src.function.loc.getType import GetType


def ParserAgents(graph, uri):
    # Type
    tipo = GetType(graph, uri)

    # adminMetadata
    adminMetadata = {
      "assigner": "http://id.loc.gov/vocabulary/organizations/dlc", 
      "identifiedBy": [ {
         "type": "Lccn",
          "assigner": "http://id.loc.gov/vocabulary/organizations/dlc",
          "value": uri.split('/')[-1]        
      }]}
    
    obj = {
     "type": tipo,
      "adminMetadata": adminMetadata,
      "isMemberOfMADSCollection": f'http://bibliokeia.com/authorities/{tipo}/'}

    qAuthoritativeLabel = f"""PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    SELECT ?authoritativeLabel 
    WHERE  {{
    <{uri}> madsrdf:authoritativeLabel ?authoritativeLabel .
      }}"""
    r = graph.query(qAuthoritativeLabel)
    [bindings] = r.bindings
    authoritativeLabel = bindings.get('authoritativeLabel').toPython()
    obj['authoritativeLabel'] = authoritativeLabel
    
    # ElementList
    obj = GetElementList(graph, uri, obj) 
    
    # fullerName
    obj = GetFullerName(graph, uri, obj)

    # hasCloseExternaluri
    obj = GetUri(uri, graph, "hasCloseExternalAuthority", obj)

    # hasExactExternalAuthority
    obj = GetUri(uri, graph, "hasExactExternalAuthority", obj)

    # Variant
    obj = GetVariant(uri, graph, obj)

    # RWO
    token = uri.split("/")[-1]
    rwo = f'http://id.loc.gov/rwo/agents/{token}'
    # BirthDate
    obj = GetDate(rwo, 'birthDate', graph, obj)
    # deathDate
    obj = GetDate(rwo, 'deathDate', graph, obj)
    # BirthPlace
    obj = GetBirthPlace(rwo, graph, obj)
    # Affiliation
    obj = GetAffiliation(rwo, graph, obj)
    # Occuptions
    obj = GetOccuption(rwo, graph, obj)
    obj = GetFieldOfActivity(rwo, graph, obj)

    response = Agents(**obj)
    
    return response