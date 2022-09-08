import httpx
import json


item_split = '?commit=true'\
            'split=/'\
                '&f=id:/controlfields/001'\
                    '&f=title:/datafields/245/subfields/a'\
                        '&f=subtitle:/datafields/245/subfields/b'\
                        '&f=responsibilities:/datafields/245/subfields/c'\
                        '&f=author:/datafields/100/subfields/a'\
                            '&f=publisher:/datafields/260/subfields/b'\
                                '&f=year:/year'\
                                    '&f=serie:/datafields/490/subfields/a'\
                                        '&f=termo_topico:/datafields/650/subfields/a'\
                                               '&f=type:/datafields/900/subfields/a'
def indexing_solr(record, item_split=item_split):
    year = record.get('datafields').get('260').get('subfields').get('c')[:4]
    if year:
        record['year'] = int(year)
    solr = httpx.post(
    f'http://localhost:8983/solr/acervo/update/json/docs{item_split}', json=record)
    print(solr, record.get('controlfields')['001'] )

r = range(1,19)
i = 0
url = f'http://localhost:8000/cataloguing/item/{i}'
for i in r:
    record = httpx.get(f'http://localhost:8000/cataloguing/item/{i}').json()
    indexing_solr(record)