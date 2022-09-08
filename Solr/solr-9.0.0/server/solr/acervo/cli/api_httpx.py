import httpx

baseUrl = 'http://localhost:8983/solr/'

def create_core():
    r = httpx.get(
    baseUrl+'admin/cores?action=create&name=acervo&instanceDir=configsets/acervo')

    return r.json()

def reload_core():
    r = httpx.get(
    baseUrl+'admin/cores?action=RELOAD&core=acervo')

def get_fields(baseUrl=baseUrl):
    r = httpx.get(baseUrl+'acervo/schema/fields')
    return r.json()

def add_doc(baseUrl=baseUrl):
    json_data = {
    'add': {
        'doc': {
            'content': 'Test',
            'likes': 10,
        },
    },
}

    r = httpx.post(
    baseUrl+'acervo/update?commitWithin=100', json=json_data)

    return r.json()

def add_field(baseUrl=baseUrl):
    json_data = {
    'add-field': {
        'name': 'updated_on',
        'type': 'pdate',
        'indexed': False,
        },
    }

    r = httpx.post(
    'http://localhost:8983/api/cores/acervo/schema', json=json_data)

    return r.json()


def replace_field(baseUrl=baseUrl):
    json_data = {
    'replace-field': {
        'name': 'updated_on',
        'type': 'plong',
        'indexed': False,
        },
    }

    r = httpx.post(
    'http://localhost:8983/api/cores/acervo/schema', json=json_data)

    return r.json()

r = create_core()
