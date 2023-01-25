def DocName(g, token):

    doc = {"id": token}

    qType = """
PREFIX lc: <http://id.loc.gov/authorities/names/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
SELECT  ?o
WHERE { lc:"""+token+" rdf:type ?o}"

    r = g.query(qType)

    for i in r:
        tipo = i.o.split("#")[1]
        if tipo != "Authority":
            doc['type'] = tipo



    qName = """
PREFIX lc: <http://id.loc.gov/authorities/names/>
PREFIX madsrdf:  <http://www.loc.gov/mads/rdf/v1#> 
SELECT  ?o
WHERE { lc:"""+token+" madsrdf:authoritativeLabel ?o}"

    r = g.query(qName)

    for i in r:
        doc['name'] = i.o.value

    qFullerName = """
PREFIX lc: <http://id.loc.gov/authorities/names/>
PREFIX madsrdf:  <http://www.loc.gov/mads/rdf/v1#> 
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT  ?fullerName
WHERE { lc:"""+token+" madsrdf:fullerName ?o . \
?o rdfs:label ?fullerName . }"

    r = g.query(qFullerName)

    for i in r:
        doc['fullerName'] = i.fullerName.value
    
    qVariantes = """
PREFIX lc: <http://id.loc.gov/authorities/names/>
PREFIX madsrdf:  <http://www.loc.gov/mads/rdf/v1#> 
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT  ?variantLabel
WHERE { lc:"""+token+" madsrdf:hasVariant ?o . \
?o madsrdf:variantLabel ?variantLabel . }"

    r = g.query(qVariantes)

    variants = list()
    for i in r:
        variants.append(i.variantLabel.value)
    doc["variants"] = variants
    
    return doc