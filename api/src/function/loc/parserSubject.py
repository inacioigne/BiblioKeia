from src.function.loc.note import Note
from .ElementList import GetElementList
from .getType import GetType
from .Variant import GetVariant
from src.schemas.authorities.subject import Subject
from .graphExist import GraphExist
      
def GetInternalUri(authority, graph, metadata, obj):

    query = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            SELECT * WHERE  {{
              <{authority}> madsrdf:has{metadata}Authority ?value .
              ?value madsrdf:authoritativeLabel ?label
              }}"""
    response = graph.query(query)
    if len(response.bindings) > 0:
        external = list()
        internal = list()
        for i in response.bindings:
           url = i.get('value')
           exist = GraphExist(url)
 
           if exist:
                uri = {
                   "value": exist['uri']['value'],
                   "base": "bk",
                   "label": {
                       "value": exist['label']['value'],
                       "lang": "por" } }
                internal.append(uri)
           else:
               uri = {
                   "value": url,
                   "base": "loc",
                   "label": {
                       "value": i.get('label').value,
                       "lang": i.get('label').language } }
               external.append(uri)
        if len(internal) > 0:
            obj[f'has{metadata}Authority'] = internal
        if len(external) > 0:
            obj[f'has{metadata}ExternalAuthority'] = external
    return obj

def GetExternalUri(authority, graph, metadata, obj):

    query = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            SELECT * WHERE  {{
              <{authority}> madsrdf:has{metadata}Authority ?value .
              ?value madsrdf:authoritativeLabel ?label
              }}"""
    response = graph.query(query)
    if len(response.bindings) > 0:
        external = list()
        for i in response.bindings:
            url = i.get('value')
            base = url.split("//")[1].split("/")[0]
            uri = {
                   "value": url,
                   "base": base,
                   "label": {
                       "value": i.get('label').value,
                       "lang": i.get('label').language } }
            external.append(uri)
        return external
    else:
        return False


def ParserSubject(graph, authority): 

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
  obj = Note(graph, authority, obj)

  # hasVariant
  obj = GetVariant(authority, graph, obj)

  # URIS
  # hasReciprocalAuthority
  obj = GetInternalUri(authority, graph, "Reciprocal", obj)

  # hasBroaderAuthority
  obj = GetInternalUri(authority, graph, "Broader", obj)
  
  # Narrower Terms
  obj = GetInternalUri(authority, graph, "Narrower", obj)
  
#   hasNarrower
  hasNarrower = GetExternalUri(authority, graph, "NarrowerExternal", obj)
  if hasNarrower:
    if obj.get('hasNarrowerExternalAuthority'): 
       obj['hasNarrowerExternalAuthority'] = obj['hasNarrowerExternalAuthority']+hasNarrower
    else:
       obj['hasNarrowerExternalAuthority'] = hasNarrower
       
  
  # ExactExternal
  exactExternal = GetExternalUri(authority, graph, "ExactExternal", obj)
  if exactExternal:
    obj['hasExactExternalAuthority'] = exactExternal
  
  # CloseExternal
  closeExternal = GetExternalUri(authority, graph, "CloseExternal", obj)
  if closeExternal:
    obj['hasCloseExternalAuthority'] = closeExternal

  response = Subject(**obj)

  return response

