from src.function.authorities.getUri import GetUri
from src.schemas.authorities.subject import Subject

def ParserSubject(graph, authority):
      
#   authority = 'http://id.loc.gov/authorities/subjects/sh2018002121'
  prefix = """PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>"""

  # Type
  qtype = f"""{prefix}
  SELECT ?type WHERE {{ 
      <{authority}> rdf:type ?type .
      FILTER ( ?type != madsrdf:Authority ) 
      FILTER ( ?type != skos:Concept )
       }}"""
  r = graph.query(qtype)
  tipo = r.bindings[0].get('type').split("#")[1]
  

  # adminMetadata
  adminMetadata = {
      "assigner": "http://id.loc.gov/vocabulary/organizations/dlc",
      "identifiedBy": [ {
          "assigner": "http://id.loc.gov/vocabulary/organizations/dlc",
          "value": authority.split('/')[-1]        
      }],
      
      
  }
  # ElementList
  qElementList = f"""{prefix}
  SELECT ?elementValue ?type WHERE  {{
    <{authority}> madsrdf:elementList ?o .
    ?o rdf:rest* ?node .
    ?node rdf:first ?e .
    ?e madsrdf:elementValue ?elementValue .
    ?e rdf:type ?type
    }}"""
  r = graph.query(qElementList)
  elementList = list()
  for i in r.bindings:
      element = {
            "type": i.get('type').split("#")[1],
          "elementValue": {
            "value":  i.get('elementValue').value,
            "lang": i.get('elementValue').language
          }
        }
      elementList.append(element)

  obj = {
     "type": tipo,
      "adminMetadata": adminMetadata,
      "elementList": elementList,
      "isMemberOfMADSCollection": f'http://bibliokeia.com/authorities/{tipo}/'
  }

  # Note 
  qNote = f"""{prefix}
  SELECT ?note WHERE {{ 
      <{authority}> madsrdf:note ?note .
       }}"""
  r = graph.query(qNote)
  if len(r.bindings) > 0:
     obj['note'] = r.bindings[0].get('note').value

# hasVariant
  qVariant = f"""{prefix}
  SELECT ?typeVariant ?typeElement ?elementValue WHERE  {{
	<{authority}> madsrdf:hasVariant ?variant .
  ?variant rdf:type ?typeVariant .
  ?variant madsrdf:elementList ?elementList .
  ?elementList rdf:rest* ?node .
    ?node rdf:first ?e .
    ?e madsrdf:elementValue ?elementValue .
	?e rdf:type ?typeElement .
  FILTER ( ?typeVariant != madsrdf:Variant )
  }}"""
  r = graph.query(qVariant)
  if len(r.bindings) > 0:
    variants = list()
    for i in r.bindings:
      variant = {
          'type': i.get('typeVariant').split("#")[1],
          'elementList': [{
              'type': i.get('typeElement').split("#")[1],
              'elementValue': {
                  'value': i.get('elementValue').value,
                  'lang': i.get('elementValue').language
              }
          }]
      }
      variants.append(variant)
    obj['hasVariant'] = variants

  # URIS
  metadados = ['hasBroaderAuthority', 
               'hasCloseExternalAuthority',
    'hasExactExternalAuthority',
    'hasNarrowerAuthority',
    'hasNarrowerExternalAuthority']
  for metadado in metadados:
     obj = GetUri(obj, metadado, authority, graph)
  
  response = Subject(**obj)
  return response