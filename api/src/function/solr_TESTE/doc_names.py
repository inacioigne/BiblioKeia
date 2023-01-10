def create_doc(g, token):
    #teste

    doc = {"id": token}

    prefix = "PREFIX lc: <http://id.loc.gov/authorities/names/>\n \
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n \
                PREFIX madsrdf:  <http://www.loc.gov/mads/rdf/v1#> \n \
                PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> \n"

    q_type = prefix + "SELECT ?type WHERE {\n \
        lc:"+token +" rdf:type ?type }"
    r_type = g.query(q_type)
    values = r_type.bindings[0].values()
    for i in values:
        tipo = i.split("#")
        doc['type'] = tipo[1]


    q_name = prefix + "SELECT ?name WHERE {\n \
        lc:"+token +" madsrdf:authoritativeLabel ?name }"
    r_name = g.query(q_name)
    for i in r_name:
        doc['name'] = i.name.value

    q_fullerName = prefix + "SELECT ?label WHERE {\n \
        lc:"+token +" madsrdf:fullerName ?o . \n \
            ?o rdfs:label ?label }"
    r_fullerName = g.query(q_fullerName)
    for i in r_fullerName:
        doc['fullerName'] = i.label.value

    q_variant = prefix + "SELECT ?label WHERE {\n \
        lc:"+token +" madsrdf:hasVariant ?o . \n \
            ?o madsrdf:variantLabel ?label }"
    r_variant = g.query(q_variant)
    variants = list()
    for i in r_variant:
        variants.append(i.label.value)
 
    doc['variants'] = variants

    return doc