from pysolr import Solr

def DeleteAuthoritySolr(id): 
    solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)

    r = solr.search(q=f'id:{id}', **{'fl': '*,[child]'})

    nMeta = ["id", "type", "creationDate", "label", "isMemberOfMADSCollection", "note", "variant",
              "imagem", "fullerName", "birthDate", "birthPlace",  "_version_"]
    ids = [id]
    [doc] = r.docs
    for k, v in doc.items():
        if k not in nMeta:
            if type(v) == list:
                for i in v:
                    ids.append(i['id'])
            else:
                ids.append(v['id'])
    responseSolr = solr.delete(id=ids, commit=True)

    return responseSolr

