def HasItem(itemOf, barcode):
    sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
        INSERT DATA
        {{ GRAPH <{itemOf}> 
        {{ <{itemOf}>  bf:hasItem  <https://bibliokeia.com/resources/item/{barcode}> }} }}"""
    return sparql