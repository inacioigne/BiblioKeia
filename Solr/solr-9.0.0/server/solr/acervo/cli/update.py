import httpx

baseUrl = 'http://localhost:8983/solr/acervo/update'

def delete_docs(baseUrl=baseUrl):

    json_data = {"delete": {"query": "*:*"}}
    r = httpx.post(baseUrl+'?commitWithin=100', json=json_data)
    
    return r.json()

r = delete_docs(baseUrl=baseUrl)

