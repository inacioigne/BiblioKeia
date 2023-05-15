from src.function.loc.hasReciprocal import GetHasReciprocal
from .ElementList import GetElementList
from .HasBroader import GetHasBroader
from .getType import GetType
from .HasNarrower import GetHasNarrower, GetHasNarrowerExternal
from .ExactExternal import GetExactExternal
from .CloseExternal import GetCloseExternal
from .Variant import GetVariant
from src.schemas.authorities.subject import Subject

def ParserSubject(graph, authority):
      
  prefix = """PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>"""

  # Type
  tipo = GetType(graph, authority)
  
  # adminMetadata
  adminMetadata = {
      "assigner": "http://id.loc.gov/vocabulary/organizations/dlc",
      "identifiedBy": [ {
         "type": "Lccn",
          "assigner": "http://id.loc.gov/vocabulary/organizations/dlc",
          "value": authority.split('/')[-1]        
      }]      
  }
  
  obj = {
     "type": tipo,
      "adminMetadata": adminMetadata,
      "isMemberOfMADSCollection": f'http://bibliokeia.com/authorities/{tipo}/'
  }
  
  # ElementList
  obj = GetElementList(authority, graph, obj)

  # Note 
  qNote = f"""{prefix}
  SELECT ?note WHERE {{ 
      <{authority}> madsrdf:note ?note .
       }}"""
  r = graph.query(qNote)
  if len(r.bindings) > 0:
     obj['note'] = r.bindings[0].get('note').value

  # hasVariant
  obj = GetVariant(authority, graph, obj)

  # URIS
  # hasBroaderAuthority
  obj = GetHasBroader(authority, graph, obj)
  
  # Narrower Terms
  obj = GetHasNarrower(authority, graph, obj)
  
  hasNarrower = GetHasNarrowerExternal(authority, graph, obj)
  if hasNarrower:
    obj['hasNarrowerExternalAuthority'] = obj['hasNarrowerExternalAuthority']+hasNarrower
  
  # ExactExternal
  obj = GetExactExternal(authority, graph, obj)
  
  # CloseExternal
  obj = GetCloseExternal(authority, graph, obj)
 
  # hasReciprocalAuthority
  obj = GetHasReciprocal(authority, graph, obj)
  response = Subject(**obj)

  return response