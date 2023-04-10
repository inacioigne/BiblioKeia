def EditAuthorityPersonalName(id, request):
    name = f"""PREFIX name: <https://bibliokeia.com/authorities/name/>
            PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            
            WITH name:{id}
            DELETE {{ name:{id} madsrdf:authoritativeLabel ?o }}
            INSERT {{ name:{id} madsrdf:authoritativeLabel { f'"{request.value}, {request.date}" ; ' if request.date else f'"{request.value}" ;' } }}
            WHERE {{ name:{id} madsrdf:authoritativeLabel ?o }}"""
    return name