
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


def ParserAgents(graph, authority):
    # Type
    tipo = GetType(graph, authority)

    # adminMetadata
    adminMetadata = {
      "assigner": "http://id.loc.gov/vocabulary/organizations/dlc",
      "identifiedBy": [ {
         "type": "Lccn",
          "assigner": "http://id.loc.gov/vocabulary/organizations/dlc",
          "value": authority.split('/')[-1]        
      }]}
    
    obj = {
     "type": tipo,
      "adminMetadata": adminMetadata,
      "isMemberOfMADSCollection": f'http://bibliokeia.com/authorities/{tipo}/'}
    
    # ElementList
    obj = GetElementList(graph, authority, obj)
    
    # fullerName
    obj = GetFullerName(graph, authority, obj)

    # hasCloseExternalAuthority
    obj = GetUri(authority, graph, "hasCloseExternalAuthority", obj)

    # hasExactExternalAuthority
    obj = GetUri(authority, graph, "hasExactExternalAuthority", obj)

    # Variant
    obj = GetVariant(authority, graph, obj)

    # RWO
    token = authority.split("/")[-1]
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

    response = Agents(**obj)
    
    return response